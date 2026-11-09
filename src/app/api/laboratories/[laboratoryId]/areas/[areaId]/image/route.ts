import { requireAuth } from "@/app/api/server/middlewares/auth.middleware";
import { areaCoverService } from "@/app/api/server/images/service";
import { createCoverHandlers } from "@/app/api/server/images/http";
export const runtime="nodejs";
const handlers=createCoverHandlers({requireAuth,service:areaCoverService});
export const GET=handlers.GET;
export const DELETE=handlers.DELETE;
