import { prisma } from "../src/app/api/server/lib/prisma";
import { AreaCoverService } from "../src/app/api/server/images/service";
import { cloudinarySettings } from "../src/app/api/server/images/cloudinary";
async function main(){
 const args=process.argv.slice(2);if(args.some(x=>!/^--(?:execute|limit=\d+|cloud-confirmation=[-\w]+)$/.test(x)))throw Error();
 const limit=Number(args.find(x=>x.startsWith("--limit="))?.split("=")[1]??20);if(!Number.isInteger(limit)||limit<1||limit>100)throw Error();
 if(!args.includes("--execute")){const now=new Date();const eligible=await prisma.coverCleanupJob.count({where:{notBefore:{lte:now},nextAttemptAt:{lte:now},state:{not:"BLOCKED"}}});console.log(JSON.stringify({mode:"DRY_RUN",eligible,limit,providerCalls:0}));return;}
 const config=cloudinarySettings(process.env);if(args.find(x=>x.startsWith("--cloud-confirmation="))?.split("=")[1]!==config.cloudName)throw Error();
 await new (await import("../src/app/api/server/images/cloudinary")).CloudinaryCoverProvider(config).preset();
 const result=await new AreaCoverService().cleanup(limit);console.log(JSON.stringify({mode:"EXECUTE",...result}));
}
main().catch(()=>{console.error("Cleanup não concluído. Confira configuração, destino e runbook; nenhum segredo foi registrado.");process.exitCode=1;}).finally(()=>prisma.$disconnect());
