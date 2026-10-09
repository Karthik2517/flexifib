// Plain module (no "use client") so the server layout can inline the script.
export const CONSENT_COOKIE = "ff_consent"
export const CONSENT_BANNER_ID = "cookie-banner"

/** Runs during HTML parsing, before first paint, so returning visitors never see the banner flash. */
export const CONSENT_BANNER_SCRIPT = `(function(){try{if(document.cookie.indexOf("${CONSENT_COOKIE}=")>-1){var b=document.getElementById("${CONSENT_BANNER_ID}");if(b)b.hidden=true}}catch(e){}})()`
