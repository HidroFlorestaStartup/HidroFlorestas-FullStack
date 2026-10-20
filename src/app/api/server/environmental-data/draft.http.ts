import type { requireAuth } from "../middlewares/auth.middleware";
import { AuthBoundaryError } from "../middlewares/auth.middleware";
import { AreaAccessError } from "../areas/area.authorization";
import { checkAccountCsrf } from "../accounts/http";
import { AccountError } from "../accounts/contracts";
import { DraftError } from "@/types/environmental-draft";
import type { EnvironmentalDraftService } from "./draft.service";
import type { EnvironmentalContext } from "@/types/environmental-data.type";
import { matchesEnvironmentalInitiatorProof } from "./environmental-initiation";
type Context={params:Promise<EnvironmentalContext>};
function assertInitialPrincipal(request:Request,userId:string){
 const proof=request.headers.get("X-Environmental-Initiator-Proof");
 if(proof!==null&&!matchesEnvironmentalInitiatorProof(proof,userId))throw new DraftError("FORBIDDEN");
}
const json=(value:unknown,status=200)=>Response.json(value,{status,headers:{"Cache-Control":"private, no-store"}});
async function body(request:Request):Promise<unknown> {
  if(request.headers.get("content-type")?.split(";")[0].trim().toLowerCase()!=="application/json") throw new DraftError("INVALID_REQUEST");
  const reader=request.body?.getReader();if(!reader)throw new DraftError("INVALID_REQUEST");
  let size=0;const chunks:Uint8Array[]=[];
  try {
    for(;;){const chunk=await reader.read();if(chunk.done)break;size+=chunk.value.length;if(size>32768){await reader.cancel();throw new DraftError("INVALID_REQUEST");}chunks.push(chunk.value);}
    const result=new Uint8Array(size);let offset=0;for(const chunk of chunks){result.set(chunk,offset);offset+=chunk.length;}
    return JSON.parse(new TextDecoder("utf-8",{fatal:true}).decode(result));
  }catch{throw new DraftError("INVALID_REQUEST");}finally{reader.releaseLock();}
}
function failure(error:unknown) {
  let code="INTERNAL_ERROR",status=500;
  if(error instanceof AuthBoundaryError){code="UNAUTHENTICATED";status=401;}
  else if(error instanceof AccountError){code="FORBIDDEN";status=403;}
  else if(error instanceof AreaAccessError || error instanceof DraftError){code=error.code;status=({INVALID_REQUEST:400,STALE_REVISION:409,CONFLICT:409,READ_ONLY:409,NOT_FOUND:404,FORBIDDEN:403,UNAUTHENTICATED:401,INVALID_INPUT:400,INTERNAL_ERROR:500} as Record<string,number>)[code]??500;}
  const message=code==="STALE_REVISION"?"O rascunho mudou em outra sessão. Recarregue antes de tentar novamente.":code==="READ_ONLY"?"Laboratório em modo somente leitura.":code==="CONFLICT"?"Já existem medições confirmadas para esta coleta.":code==="INVALID_REQUEST"?"Rascunho inválido ou excessivo.":"Não foi possível concluir esta operação.";
  return json({error:{code,message}},status);
}
export function createDraftHandlers(deps:{requireAuth:typeof requireAuth;service:Pick<EnvironmentalDraftService,"detail"|"save"|"discard">;environment?:Record<string,string|undefined>}) {
  return {
    GET:async(request:Request,context:Context)=>{try{const actor=await deps.requireAuth();assertInitialPrincipal(request,actor.id);return json({draft:await deps.service.detail(actor.id,await context.params)});}catch(error){return failure(error);}},
    PUT:async(request:Request,context:Context)=>{try{checkAccountCsrf(request,deps.environment);const actor=await deps.requireAuth();assertInitialPrincipal(request,actor.id);return json({draft:await deps.service.save(actor.id,await context.params,await body(request))});}catch(error){return failure(error);}},
    DELETE:async(request:Request,context:Context)=>{try{checkAccountCsrf(request,deps.environment);const actor=await deps.requireAuth();assertInitialPrincipal(request,actor.id);await deps.service.discard(actor.id,await context.params,await body(request));return new Response(null,{status:204,headers:{"Cache-Control":"private, no-store"}});}catch(error){return failure(error);}},
  };
}
