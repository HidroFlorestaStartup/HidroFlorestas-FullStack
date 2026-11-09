import { CoverError } from "./contracts";

export type Settings={cloudName:string;apiKey:string;apiSecret:string;preset:string;presetHash:string};

// Pure validation shared by offline availability and the server-only provider.
// No settings object is projected into a client DTO.
export function cloudinarySettings(environment:Record<string,string|undefined>):Settings{
 const {CLOUDINARY_IMAGE_ENABLED:enabled,CLOUDINARY_CLOUD_NAME:cloudName,CLOUDINARY_API_KEY:apiKey,CLOUDINARY_API_SECRET:apiSecret,CLOUDINARY_COVER_PRESET:preset,CLOUDINARY_COVER_PRESET_SHA256:presetHash}=environment;
 if(enabled!=="1"||!cloudName||!apiKey||!apiSecret||!preset||!presetHash||!/^[-a-z0-9_]+$/i.test(cloudName)||!/^\d+$/.test(apiKey)||!/^hfr-cover-v\d+[-a-z0-9_]*$/i.test(preset)||! /^[0-9a-f]{64}$/.test(presetHash))throw new CoverError("UNAVAILABLE");
 return{cloudName,apiKey,apiSecret,preset,presetHash};
}

export function coverFeatureEnabled(environment:Record<string,string|undefined>=process.env):boolean{
 try{cloudinarySettings(environment);return true;}catch{return false;}
}
