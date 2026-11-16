/** Generates a private, create-only SQL plan. Does not connect to a database or upload covers. */
import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, relative, isAbsolute } from "node:path";
import bcrypt from "bcrypt";
import { parseEnvironmentalInput, hashPayload } from "../src/app/api/server/environmental-data/environmental-data.contracts";
import { evaluateIHFR } from "../src/app/api/server/ihfr-diagnosis/evaluator";
import { loadActiveIHFRManifest, hashCanonicalIHFRValue } from "../src/app/api/server/ihfr-diagnosis/manifest-loader";
import { IHFR_CONTRACT } from "../src/app/api/server/ihfr-diagnosis/ihfr-diagnosis.constants";
import { projectPublicDiagnosis, hashIHFRDiagnosisRequest, parseIHFRDiagnosisRequest } from "../src/app/api/server/ihfr-diagnosis/ihfr-diagnosis.contracts";
import { validateNewPassword } from "../src/app/api/server/accounts/contracts";

const prefix = "hidroflorestas-hifro-20261116";
function id(name: string) {
  const hex = createHash("sha256").update(`${prefix}:${name}`).digest("hex").slice(0, 32).split("");
  hex[12] = "4"; hex[16] = "8";
  return [hex.slice(0, 8),hex.slice(8,12),hex.slice(12,16),hex.slice(16,20),hex.slice(20)].map(p=>p.join("")).join("-");
}
const q = (value: unknown): string => value === null ? "NULL" : typeof value === "boolean" ? String(value) : typeof value === "number" ? (()=>{if(!Number.isFinite(value))throw Error("NON_FINITE");return String(value);})() : `'${String(value).replaceAll("'", "''")}'`;
const sql: string[] = [];
function insert(table: string, row: Record<string, unknown>) {
  sql.push(`INSERT INTO "${table}" (${Object.keys(row).map(k=>`"${k}"`).join(",")}) VALUES (${Object.values(row).map(v=>q(v !== null && typeof v === "object" ? JSON.stringify(v) : v)).join(",")});`);
}
const users = [
  { key:"hifro",firstName:"Hifro",lastName:"HidroFlorestas",role:"OWNER" },
  { key:"ana",firstName:"Ana",lastName:"Primavesi",role:"ADMIN" },
  { key:"bertha",firstName:"Bertha",lastName:"Lutz",role:"ADMIN" },
  { key:"josue",firstName:"Josué",lastName:"de Castro",role:"MEMBER" },
  { key:"aziz",firstName:"Aziz",lastName:"Ab'Sáber",role:"MEMBER" },
].map(u=>({...u,id:id(`user-${u.key}`),email:`${u.key}@hf.example`}));
const lab = { id:id("laboratory"),name:"Laboratório Hifro" };
const note = "Cenário ilustrativo de apresentação. Medições e coordenadas fictícias; não representam levantamentos reais nesta localidade.";
const areas = [
  {key:"aviacao",name:"Área verde da Aviação",latitude:-3.388100,longitude:-44.356700,landType:"URBAN" as const,description:`Acompanhamento de cobertura vegetal e infiltração na região do bairro Aviação. ${note}`},
  {key:"leite",name:"Quintal agroflorestal do Leite",latitude:-3.471200,longitude:-44.361800,landType:"AGROFORESTRY" as const,description:`Observação de solo, água e vegetação inspirada no povoado Leite. ${note}`},
  {key:"trizidela",name:"Margem verde da Trizidela",latitude:-3.397500,longitude:-44.371000,landType:"FOREST" as const,description:`Acompanhamento de vegetação e condições da água na região da Trizidela. ${note}`},
].map(a=>({...a,id:id(`area-${a.key}`)}));
const dates=["2026-11-02","2026-11-07","2026-11-11","2026-11-14"];
async function main() {
  const out=resolve(process.argv[2]??""),secretPath=process.env.HIFRO_PASSWORD_FILE;
  const rel=relative(process.cwd(),out);
  if(!process.argv[2]||!secretPath||!(isAbsolute(rel)||rel.startsWith("..")))throw Error("PRIVATE_OUTPUT_OUTSIDE_REPOSITORY_REQUIRED");
  const password=(await readFile(secretPath,"utf8")).trim();validateNewPassword(password);
  const codePath=process.env.HIFRO_ACCESS_CODE_FILE;if(!codePath)throw Error("PRIVATE_ACCESS_CODE_REQUIRED");
  const labAccessCode=(await readFile(codePath,"utf8")).trim();if(!/^[A-Z0-9]{8,12}$/.test(labAccessCode))throw Error("INVALID_ACCESS_CODE");
  const passwordHash=await bcrypt.hash(password,10),now=new Date().toISOString(),owner=users[0].id;
  const emails=users.map(u=>q(u.email)).join(",");
  sql.push(`SELECT pg_advisory_xact_lock(hashtext(${q(prefix)}));`);
  sql.push(`DO $guard$ BEGIN IF current_database()<>'hf_ui038_test' THEN RAISE EXCEPTION 'WRONG_DATABASE'; END IF; IF EXISTS(SELECT 1 FROM "User" WHERE lower(email) IN (${emails})) OR EXISTS(SELECT 1 FROM "LaboratoryRoom" WHERE id=${q(lab.id)} OR "accessCode"=${q(labAccessCode)}) THEN RAISE EXCEPTION 'PRESENTATION_EXISTS_INSPECT_BEFORE_REUSE'; END IF; END $guard$;`);
  for(const u of users)insert("User",{id:u.id,email:u.email,emailCanonical:u.email,firstName:u.firstName,lastName:u.lastName,password:passwordHash,role:"USER",status:"ACTIVE",image:"",createdAt:now,updatedAt:now,revision:0,credentialVersion:0,emailVerifiedAt:now,verificationRequired:true});
  insert("LaboratoryRoom",{...lab,accessCode:labAccessCode,userId:owner,imageBanner:"",isActive:true,createdAt:now,updatedAt:now});
  for(const u of users)insert("ResearchersLinked",{id:id(`membership-${u.key}`),userId:u.id,laboratoryRoomId:lab.id,role:u.role});
  for(const a of areas)insert("CollectionArea",{id:a.id,name:a.name,userId:owner,laboratoryRoomId:lab.id,latitude:a.latitude,longitude:a.longitude,municipality:"Itapecuru-Mirim",state:"MA",cep:null,landType:a.landType,descriptionLandType:a.description,image:null,isActive:true,createdAt:now,updatedAt:now});
  const collections: Array<Record<string,unknown>>=[];
  for(const [ai,a]of areas.entries())for(let visit=0;visit<4;visit++){
    const key=`${a.key}-${visit+1}`,collectionId=id(`collection-${key}`),actor=users[(ai+visit)%users.length].id;
    const observedAt=`${dates[visit]}T${String(8+ai).padStart(2,"0")}:30:00-03:00`;
    const noMeasurement=ai===2&&visit===3;
    const noDiagnosis=noMeasurement||(ai===1&&visit===3)||(ai===2&&visit===2);
    const text=ai===0?["Registro inicial de solo exposto e cobertura vegetal.","Acompanhamento após organização dos canteiros e cobertura do solo.","Observação da infiltração e proteção do solo.","Revisita para acompanhar a evolução da cobertura vegetal."][visit]:ai===1?["Caracterização inicial do quintal agroflorestal.","Acompanhamento da cobertura de folhas e diversidade vegetal.","Observação da disponibilidade de água e proteção do solo.","Medições confirmadas; o cálculo do IHFR fica disponível para apresentação."][visit]:["Leitura inicial da margem e da vegetação ciliar.","Revisita para acompanhar água, solo e vegetação.","Medições disponíveis para uma nova leitura do IHFR.","Registro de acompanhamento; dados ambientais serão preenchidos na próxima etapa."][visit];
    insert("CollectionData",{id:collectionId,collectionAreaId:a.id,laboratoryRoomId:lab.id,userId:actor,observations:`${text} Dados ilustrativos para apresentação pública.`,occurredAt:observedAt,occurrenceOffset:"-03:00",confirmedAt:now,confirmationKey:id(`confirmation-${key}`),createdAt:now,updatedAt:now});
    const entry:Record<string,unknown>={id:collectionId,areaId:a.id,observedAt,authorId:actor,hasMeasurements:!noMeasurement,hasDiagnosis:!noDiagnosis};collections.push(entry);
    if(noMeasurement)continue;
    const payload=parseEnvironmentalInput({
      water:{waterSourceType:ai===1?"SHALLOW_WELL":"RIVER_STREAM",hasSpring:false,wellDepthMeters:ai===1?18:null,waterAvailability:"PERMANENT",salinityIndicator:"NONE"},
      soil:{soilTexture:ai===0?"CLAYEY":"MEDIUM",infiltrationRateMmPerHour:(ai===0?12:ai===1?30:45)+visit*3,compactionLevel:ai===0?"MEDIUM":"LOW",erosionSigns:ai===0&&visit===0?"LAMINAR":"NONE",soilExposedPercent:(ai===0?42:ai===1?24:12)-visit*3},
      vegetation:{vegetationCoverPercent:(ai===0?40:ai===1?62:80)+visit*5,fragmentationLevel:ai===0?"MEDIUM":"LOW",hasRiparianApp:ai===2,landscapeDegradation:ai===0?"MEDIUM":"LOW"},
      terrain:{drainageDensityKmPerKm2:ai===2?1.8:1.1,elevationMeters:ai===0?28:ai===1?42:18,slopePercent:ai===0?5:ai===1?4:2}
    });
    const measurementId=id(`measurement-${key}`);
    insert("EnvironmentalMeasurementSet",{id:measurementId,collectionDataId:collectionId,userId:actor,measurementContractVersion:IHFR_CONTRACT.measurementVersion,payload,payloadHash:hashPayload(payload),confirmationKey:id(`measurement-confirmation-${key}`),confirmedAt:now,createdAt:now});
    if(noDiagnosis)continue;
    const evaluation=evaluateIHFR(loadActiveIHFRManifest(),{environmental:payload,landUseType:a.landType});
    if(evaluation.outcome!=="SUFFICIENT")throw Error(`INSUFFICIENT_${key}`);
    const supplementId=id(`supplement-${key}`),diagnosisId=id(`diagnosis-${key}`),operationId=id(`operation-${key}`);
    const supplement={inputContractVersion:IHFR_CONTRACT.inputVersion,landUseType:a.landType,provenance:{kind:"AUTHORIZED_RECORD",observedAt}};
    const context={laboratoryId:lab.id,areaId:a.id,collectionId};
    const request=parseIHFRDiagnosisRequest({mode:"CREATE",expectedCurrentDiagnosisId:null,supplement,versions:{measurementContractVersion:IHFR_CONTRACT.measurementVersion,mathContractVersion:IHFR_CONTRACT.activeMathVersion,algorithmVersion:IHFR_CONTRACT.algorithmVersion,contractHash:IHFR_CONTRACT.contractHash}});
    const publicDiagnosis=projectPublicDiagnosis({...evaluation,id:diagnosisId,collectionDataId:collectionId,environmentalMeasurementSetId:measurementId,inputSupplementId:supplementId,calculatedAt:now,validFrom:now,transitionedAt:null,scientificState:"EXPERIMENTAL",current:true,terminalEvent:null},context,IHFR_CONTRACT.labels);
    insert("ExperimentalIHFRInputSupplement",{id:supplementId,collectionDataId:collectionId,environmentalMeasurementSetId:measurementId,createdByUserId:owner,inputContractVersion:supplement.inputContractVersion,landUseType:a.landType,provenance:supplement.provenance,payloadHash:hashCanonicalIHFRValue({collectionDataId:collectionId,environmentalMeasurementSetId:measurementId,supplement:request.supplement}),confirmedAt:now,createdAt:now});
    insert("ExperimentalIHFRDiagnosis",{id:diagnosisId,collectionDataId:collectionId,environmentalMeasurementSetId:measurementId,inputSupplementId:supplementId,rawScore:evaluation.rawScore,displayScore:evaluation.displayScore,ihfrClass:evaluation.ihfrClass,dataQuality:evaluation.dataQuality,componentScores:evaluation.componentScores,decomposition:evaluation.decomposition,drivers:evaluation.drivers,explanation:evaluation.explanation,measurementContractVersion:evaluation.measurementContractVersion,inputContractVersion:evaluation.inputContractVersion,mathContractVersion:evaluation.mathContractVersion,algorithmVersion:evaluation.algorithmVersion,contractHash:evaluation.contractHash,calculatedAt:now,scientificState:"EXPERIMENTAL",createdAt:now});
    insert("IHFRDiagnosisOperation",{id:operationId,laboratoryRoomId:lab.id,collectionAreaId:a.id,collectionDataId:collectionId,actorUserId:owner,idempotencyKey:id(`ihfr-key-${key}`),requestHash:hashIHFRDiagnosisRequest(context,request),operationType:"CREATE_OR_REPLACE",outcome:"SUCCEEDED",diagnosisId,responseSnapshot:{outcome:"SUCCEEDED",diagnosis:publicDiagnosis,insufficiencyReasons:[]},createdAt:now,completedAt:now});
    insert("CurrentExperimentalIHFRDiagnosis",{collectionDataId:collectionId,diagnosisId,validFrom:now,operationId});
    insert("IHFRDiagnosisLifecycleEvent",{id:id(`event-${key}`),collectionDataId:collectionId,diagnosisId,eventType:"CREATED_CURRENT",replacementDiagnosisId:null,actorUserId:owner,operationId,reason:null,occurredAt:now,evidence:{measurementId,contractHash:evaluation.contractHash,presentation:prefix}});
    Object.assign(entry,{measurementId,diagnosisId,ihfr:evaluation.displayScore,ihfrClass:evaluation.ihfrClass});
  }
  sql.push(`SELECT (SELECT count(*) FROM "ResearchersLinked" WHERE "laboratoryRoomId"=${q(lab.id)}) AS memberships,(SELECT count(*) FROM "CollectionArea" WHERE "laboratoryRoomId"=${q(lab.id)}) AS areas,(SELECT count(*) FROM "CollectionData" WHERE "laboratoryRoomId"=${q(lab.id)}) AS collections;`);
  await mkdir(out,{recursive:true,mode:0o700});
  await writeFile(resolve(out,"plan.json"),JSON.stringify({target:{projectId:"hidden-art-76143033",branchId:"br-green-firefly-b65qnqxd",databaseName:"hf_ui038_test"},sql_statements:sql},null,2),{mode:0o600});
  await writeFile("docs/demonstracao-hifro/inventario.json",JSON.stringify({namespace:prefix,preparedAt:now,base:"c007f17759f9936ab3139d2ac77192050ae2534c",laboratory:lab,users,areas,collections},null,2)+"\n");
  console.log(JSON.stringify({statements:sql.length,users:users.length,areas:areas.length,collections:collections.length,measurements:collections.filter(x=>x.hasMeasurements).length,diagnoses:collections.filter(x=>x.hasDiagnosis).length,results:collections.filter(x=>x.ihfr).map(x=>({ihfr:x.ihfr,class:x.ihfrClass})),privatePlan:resolve(out,"plan.json")}));
}
main().catch(error=>{console.error(error instanceof Error?error.message:"PREPARATION_FAILED");process.exitCode=1;});
