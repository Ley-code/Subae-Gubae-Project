import { getRequestConfig } from "next-intl/server";

// Amharic-only for phase 1 — no locale segment in the URL yet. Keeping the
// next-intl provider in place now (rather than hardcoding strings inline)
// means adding an English toggle later is a config change, not a rewrite.
export default getRequestConfig(async () => {
  const locale = "am";
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
