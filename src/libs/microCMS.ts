import { createClient } from "microcms-js-sdk";

export const client = createClient({
    serviceDomain: process.env.SERVICE_DOMAIN || "",
    apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY || "",
});
