import {readFile} from "node:fs/promises";
import {presetFingerprint} from "../src/app/api/server/images/cloudinary";
async function main(){const [path,...extra]=process.argv.slice(2);if(!path||extra.length)throw Error();const value=JSON.parse(await readFile(path,"utf8")) as unknown;if(!value||typeof value!=="object"||!("name"in value)||typeof value.name!=="string"||!/^hfr-cover-v\d+[-a-z0-9_]*$/i.test(value.name))throw Error();console.log(JSON.stringify({preset:value.name,sha256:presetFingerprint(value,value.name),providerCalls:0}));}
main().catch(()=>{console.error("Preset inválido. Forneça JSON revisado do Admin API, sem segredos; nenhum dado bruto foi registrado.");process.exitCode=1;});
