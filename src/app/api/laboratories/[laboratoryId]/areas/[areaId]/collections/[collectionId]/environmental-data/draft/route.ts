import { requireAuth } from "@/app/api/server/middlewares/auth.middleware";
import { environmentalDraftService } from "@/app/api/server/environmental-data/draft.service";
import { createDraftHandlers } from "@/app/api/server/environmental-data/draft.http";
const handlers=createDraftHandlers({requireAuth,service:environmentalDraftService});
export const GET=handlers.GET;
export const PUT=handlers.PUT;
export const DELETE=handlers.DELETE;
