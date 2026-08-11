import { NextResponse } from "next/server";
import { currentVersion } from "@/content/changelog";
import { persistentQuotaConfigured, persistentQuotaRequired } from "@/lib/ai/persistentQuota";

export const dynamic = "force-dynamic";

export async function GET() {
  const headers = { "Cache-Control": "no-store" };
  return NextResponse.json({
    status: "ok",
    service: "coresolutions-technical-explainer",
    version: currentVersion,
    ai: {
      enabled: process.env.AI_ENDPOINT_ENABLED !== "false",
      providerConfigured: Boolean(process.env.OPENAI_API_KEY),
      quotaMode: persistentQuotaConfigured() ? (persistentQuotaRequired() ? "shared-redis-required" : "shared-redis") : "process-local",
      signedIdentityConfigured: Boolean(process.env.AI_IDENTITY_SIGNING_SECRET && process.env.AI_IDENTITY_SIGNING_SECRET.trim().length >= 16),
    },
  }, { headers });
}
