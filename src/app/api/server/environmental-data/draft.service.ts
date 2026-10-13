import { createHash, randomUUID } from "node:crypto";
import type { PrismaClient, Prisma, EnvironmentalDraft } from "@/generated/prisma";
import { prisma } from "../lib/prisma";
import { authorizeLaboratoryAccess, AreaAccessError, validResourceId } from "../areas/area.authorization";
import { DRAFT_VERSION, DraftError, parseDraftSave, parseDraftReference, parseDraftFields, type EnvironmentalDraftDto } from "@/types/environmental-draft";
import type { EnvironmentalContext } from "@/types/environmental-data.type";

export class EnvironmentalDraftService {
  constructor(private readonly db: PrismaClient = prisma) {}
  private async transaction<T>(run: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
    for (let attempt=0; attempt<3; attempt++) {
      try { return await this.db.$transaction(run, {isolationLevel:"Serializable",maxWait:15000,timeout:30000}); }
      catch(error) {
        if (error instanceof AreaAccessError || error instanceof DraftError) throw error;
        if (error && typeof error==="object" && "code" in error && ["P2002","P2034"].includes(String(error.code)) && attempt<2) continue;
        throw new DraftError("INTERNAL_ERROR");
      }
    }
    throw new DraftError("INTERNAL_ERROR");
  }
  private async context(tx: Prisma.TransactionClient,userId:string,ids:EnvironmentalContext,write:boolean) {
    await authorizeLaboratoryAccess({id:userId},ids.laboratoryId,write?"CREATE_ENVIRONMENTAL_DATA":"READ_ENVIRONMENTAL_DATA",tx,write);
    if (![ids.areaId,ids.collectionId].every(validResourceId) || !await tx.collectionData.findFirst({where:{id:ids.collectionId,collectionAreaId:ids.areaId,laboratoryRoomId:ids.laboratoryId,confirmedAt:{not:null},occurredAt:{not:null},occurrenceOffset:{not:null},confirmationKey:{not:null}},select:{id:true}})) throw new AreaAccessError("NOT_FOUND");
  }
  async detail(userId:string,ids:EnvironmentalContext):Promise<EnvironmentalDraftDto|null> {
    return this.transaction(async tx=>{await this.context(tx,userId,ids,false);const row=await tx.environmentalDraft.findUnique({where:{userId_collectionDataId:{userId,collectionDataId:ids.collectionId}}});return row?project(row):null;});
  }
  async save(userId:string,ids:EnvironmentalContext,input:unknown):Promise<EnvironmentalDraftDto> {
    const command=parseDraftSave(input);
    const hash=createHash("sha256").update(JSON.stringify({formVersion:command.formVersion,fields:command.fields})).digest("hex");
    return this.transaction(async tx=>{
      await this.context(tx,userId,ids,true);
      const where={userId_collectionDataId:{userId,collectionDataId:ids.collectionId}};
      const row=await tx.environmentalDraft.findUnique({where});
      if (row?.lastSaveKey===command.saveKey) {
        if (row.lastSaveHash!==hash || (command.draftId!==null && command.draftId!==row.id) || row.revision!==command.expectedRevision+1) throw new DraftError("STALE_REVISION");
        return project(row);
      }
      if (await tx.environmentalMeasurementSet.findUnique({where:{collectionDataId:ids.collectionId},select:{id:true}})) throw new DraftError("CONFLICT");
      if (row ? row.id!==command.draftId || row.revision!==command.expectedRevision : command.draftId!==null) throw new DraftError("STALE_REVISION");
      const data={formVersion:command.formVersion,fields:command.fields as Prisma.InputJsonValue,lastSaveKey:command.saveKey,lastSaveHash:hash};
      if (!row) return project(await tx.environmentalDraft.create({data:{...data,id:randomUUID(),userId,collectionDataId:ids.collectionId}}));
      const changed=await tx.environmentalDraft.updateMany({where:{id:row.id,userId,revision:command.expectedRevision},data:{...data,revision:{increment:1}}});
      if(changed.count!==1) throw new DraftError("STALE_REVISION");
      return project(await tx.environmentalDraft.findUniqueOrThrow({where}));
    });
  }
  async discard(userId:string,ids:EnvironmentalContext,input:unknown):Promise<void> {
    const command=parseDraftReference(input);
    return this.transaction(async tx=>{
      await this.context(tx,userId,ids,true);
      const row=await tx.environmentalDraft.findUnique({where:{userId_collectionDataId:{userId,collectionDataId:ids.collectionId}}});
      if(!row) return;
      if(row.id!==command.draftId || row.revision!==command.expectedRevision) throw new DraftError("STALE_REVISION");
      const result=await tx.environmentalDraft.deleteMany({where:{id:row.id,userId,revision:command.expectedRevision}});
      if(result.count!==1) throw new DraftError("STALE_REVISION");
    });
  }
}
function project(row:EnvironmentalDraft):EnvironmentalDraftDto {
  if(row.formVersion!==DRAFT_VERSION) throw new DraftError("INTERNAL_ERROR");
  return {id:row.id,revision:row.revision,formVersion:DRAFT_VERSION,fields:parseDraftFields(row.fields),updatedAt:row.updatedAt.toISOString()};
}
export const environmentalDraftService=new EnvironmentalDraftService();
