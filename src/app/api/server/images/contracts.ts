export const COVER_MAX_BYTES=10*1024*1024;
export type CoverContext={laboratoryId:string;areaId:string};
export type CoverDto={image:{revision:number;hasImage:boolean;width?:number;height?:number};canEdit:boolean;featureEnabled:boolean};
export type UploadTicket={attemptId:string;expiresAt:string;upload:{url:string;params:Record<string,string>}};
export class CoverError extends Error {constructor(public readonly code:"INVALID_REQUEST"|"INVALID_IMAGE"|"STALE_REVISION"|"IN_PROGRESS"|"EXPIRED"|"NOT_FOUND"|"RATE_LIMITED"|"UNAVAILABLE"|"OWNERSHIP_MISMATCH"|"INTERNAL_ERROR"){super(code);}}
const uuid=(v:unknown)=>typeof v==="string"&&/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
export function closed(value:unknown,keys:string[]):Record<string,unknown>{if(!value||typeof value!=="object"||Array.isArray(value)||Object.keys(value).length!==keys.length||Object.keys(value).some(k=>!keys.includes(k)))throw new CoverError("INVALID_REQUEST");return value as Record<string,unknown>;}
export function revision(v:unknown):number{if(typeof v!=="number"||!Number.isSafeInteger(v)||v<0||v>=2147483647)throw new CoverError("INVALID_REQUEST");return v;}
export function parseUpload(value:unknown){const b=closed(value,["expectedRevision","key"]);if(!uuid(b.key))throw new CoverError("INVALID_REQUEST");return{expectedRevision:revision(b.expectedRevision),key:b.key as string};}
export function parseRemoval(value:unknown){return{expectedRevision:revision(closed(value,["expectedRevision"]).expectedRevision)};}
