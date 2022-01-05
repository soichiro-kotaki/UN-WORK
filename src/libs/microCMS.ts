import { createClient } from "microcms-js-sdk";

export const client = createClient({
    serviceDomain: "un-work",
    apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY,
});
