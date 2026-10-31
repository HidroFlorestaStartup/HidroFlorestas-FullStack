import { requireAuth } from "@/app/api/server/middlewares/auth.middleware";
import { createReverseGeocodingHandler } from "./route.handlers";

export const GET = createReverseGeocodingHandler({
  authorize: requireAuth,
  endpoint: () => process.env.HF_REVERSE_GEOCODER_URL,
  fetcher: fetch,
});
