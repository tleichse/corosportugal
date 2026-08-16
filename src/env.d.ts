/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SANITY_PROJECT_ID: string;
  readonly PUBLIC_SANITY_DATASET: string;
  readonly PUBLIC_GOOGLE_FORM_COROS_URL: string;
  readonly RESEND_API_KEY: string;
  readonly CONTACT_FORM_TO_EMAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
