import sharp from "sharp";
import { COVER_MAX_BYTES,CoverError } from "./contracts";
export async function sanitizeCover(bytes:Buffer){
 try{
  if(bytes.length===0||bytes.length>COVER_MAX_BYTES)throw Error();
  const metadata=await sharp(bytes,{limitInputPixels:4096*4096,failOn:"warning"}).metadata();
  if(!["jpeg","png","webp"].includes(metadata.format??"")||!metadata.width||!metadata.height||metadata.width>4096||metadata.height>4096||(metadata.pages??1)>1)throw Error();
  const result=await sharp(bytes,{limitInputPixels:4096*4096,failOn:"warning"}).rotate().webp({quality:90}).toBuffer({resolveWithObject:true});
  if(result.data.length>COVER_MAX_BYTES)throw Error();
  return{bytes:result.data,width:result.info.width,height:result.info.height,format:"webp" as const};
 }catch{throw new CoverError("INVALID_IMAGE");}
}
export async function previewCover(bytes:Buffer){const original=await sanitizeCover(bytes);const result=await sharp(original.bytes).resize({width:1200,height:1200,fit:"inside",withoutEnlargement:true}).webp({quality:75}).toBuffer();if(result.length>4*1024*1024)throw new CoverError("INVALID_IMAGE");return result;}
