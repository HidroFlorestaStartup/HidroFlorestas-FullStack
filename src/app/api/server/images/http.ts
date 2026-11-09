import type { requireAuth } from "../middlewares/auth.middleware";
import { AuthBoundaryError } from "../middlewares/auth.middleware";
import { AreaAccessError } from "../areas/area.authorization";
import { checkAccountCsrf } from "../accounts/http";
import { AccountError } from "../accounts/contracts";
import { CoverError,closed,type CoverContext } from "./contracts";
import type { AreaCoverService } from "./service";
type Context={params:Promise<CoverContext&{attemptId?:string}>};
const headers={"Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff"};
const json=(value:unknown,status=200)=>Response.json(value,{status,headers});
async function body(request:Request){
 if(request.headers.get("content-type")?.split(";")[0].trim().toLowerCase()!=="application/json")throw new CoverError("INVALID_REQUEST");
 const reader=request.body?.getReader();if(!reader)throw new CoverError("INVALID_REQUEST");let size=0;const chunks:Uint8Array[]=[];
 try{for(;;){const r=await reader.read();if(r.done)break;size+=r.value.length;if(size>16384){await reader.cancel();throw Error();}chunks.push(r.value);}const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}return JSON.parse(new TextDecoder("utf-8",{fatal:true}).decode(bytes)) as unknown;}catch{throw new CoverError("INVALID_REQUEST");}finally{reader.releaseLock();}
}
export function coverFailure(error:unknown){
 let code="INTERNAL_ERROR",status=500;
 if(error instanceof AuthBoundaryError){code="UNAUTHENTICATED";status=401;}
 else if(error instanceof AccountError){code="FORBIDDEN";status=403;}
 else if(error instanceof CoverError||error instanceof AreaAccessError){code=error.code;status=({INVALID_REQUEST:400,INVALID_INPUT:400,INVALID_IMAGE:400,STALE_REVISION:409,IN_PROGRESS:409,CONFLICT:409,EXPIRED:410,NOT_FOUND:404,RATE_LIMITED:429,UNAVAILABLE:503,OWNERSHIP_MISMATCH:503,FORBIDDEN:403,READ_ONLY:409,UNAUTHENTICATED:401} as Record<string,number>)[code]??500;}
 const message=({INVALID_IMAGE:"Imagem inválida. Use JPEG, PNG ou WebP até 10 MiB e 4096 pixels por lado.",STALE_REVISION:"A capa mudou em outra sessão. Recarregue antes de tentar novamente.",IN_PROGRESS:"Envio em processamento. Tente novamente em instantes.",EXPIRED:"O envio expirou. Selecione a imagem novamente.",RATE_LIMITED:"Limite temporário de envios. Aguarde antes de tentar novamente.",UNAVAILABLE:"O serviço de imagens está indisponível. A capa anterior foi preservada.",READ_ONLY:"Laboratório em modo somente leitura."} as Record<string,string>)[code]??"Não foi possível concluir esta operação.";
 return json({error:{code,message}},status);
}
export function createCoverHandlers(deps:{requireAuth:typeof requireAuth;service:Pick<AreaCoverService,"detail"|"initiate"|"confirm"|"remove"|"content">;environment?:Record<string,string|undefined>}){
 return{
  GET:async(_request:Request,c:Context)=>{try{const actor=await deps.requireAuth();return json(await deps.service.detail(actor.id,await c.params));}catch(e){return coverFailure(e);}},
  UPLOAD:async(request:Request,c:Context)=>{try{checkAccountCsrf(request,deps.environment);const actor=await deps.requireAuth();return json(await deps.service.initiate(actor.id,await c.params,await body(request)));}catch(e){return coverFailure(e);}},
  CONFIRM:async(request:Request,c:Context)=>{try{checkAccountCsrf(request,deps.environment);const actor=await deps.requireAuth(),ids=await c.params;closed(await body(request),[]);return json(await deps.service.confirm(actor.id,ids,ids.attemptId??""));}catch(e){return coverFailure(e);}},
  DELETE:async(request:Request,c:Context)=>{try{checkAccountCsrf(request,deps.environment);const actor=await deps.requireAuth();await deps.service.remove(actor.id,await c.params,await body(request));return new Response(null,{status:204,headers});}catch(e){return coverFailure(e);}},
  CONTENT:async(_request:Request,c:Context)=>{try{const actor=await deps.requireAuth(),bytes=await deps.service.content(actor.id,await c.params);return new Response(new Uint8Array(bytes),{headers:{...headers,"Content-Type":"image/webp","Content-Length":String(bytes.length)}});}catch(e){return coverFailure(e);}},
 };
}
