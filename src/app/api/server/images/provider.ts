import type { UploadTicket } from "./contracts";
export type ResourceType="image"|"video"|"raw";
export type CoverAsset={assetId:string;publicId:string;version:number;resourceType:ResourceType;type:string;format:string;bytes:number;width:number;height:number;context:Record<string,string>};
export type ProviderAttempt={id:string;stagingPublicId:string;finalPublicId:string;issuedAt:Date;expiresAt:Date;presetHash:string};
export interface CoverProvider {
 preset():Promise<string>;
 ticket(attempt:ProviderAttempt):UploadTicket;
 inspect(publicId:string,resourceType:ResourceType):Promise<CoverAsset|null>;
 download(asset:CoverAsset):Promise<Buffer>;
 uploadFinal(attempt:ProviderAttempt,bytes:Buffer):Promise<CoverAsset>;
 destroy(asset:CoverAsset):Promise<void>;
}
