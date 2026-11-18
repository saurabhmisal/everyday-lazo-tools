# Lazo Everyday Firebase Hosting cutover

**Stage only.** This PR changes no production DNS, does not create a Firebase project/site, does not change repository visibility or billing, and does not activate an obsolete standalone desktop product. It preserves the published marketing website until the migration is verified.

The static site currently lives on GitHub Pages via `everyday.lazo.tools` and a public `everyday-lazo-tools` repository. To comply with the owner policy (only Power Chords public), serve the marketing page or a planned redirect through Firebase Hosting **first**, then privatize the repository after cutover.

## Deployment

1. Reuse the existing approved Spark Firebase marketing project `lazo-tools` rather than buying new hosting.
2. In the authorized Firebase account, create a separate Hosting site ID for Everyday and apply a named `everyday` target:
   `firebase hosting:sites:create <EXACT_SITE_ID> --project lazo-tools`
   `firebase target:apply hosting everyday <EXACT_SITE_ID> --project lazo-tools`
3. From the site checkout, run `node scripts/prepare-hosting.mjs` and inspect the staged `.firebase-dist` tree and all outbound links.
4. Deploy to a **preview** first. Review browser rendering, accessibility, favicon/fonts, account signup link destination and prohibited asset paths such as `/.git/config`, `/README.md` and `/CNAME`.
5. Only after preview passes, deploy `firebase deploy --only hosting:everyday --project lazo-tools` (no Cloud Functions or Blaze upgrade).
6. Add and validate `everyday.lazo.tools` in Firebase Hosting, including provider-supplied TXT/CNAME/A records and HTTPS certificate. Preserve the GitHub Pages DNS and working host until the exact cutover gate.
7. Once Firebase custom-domain responses match approved assets, remove old Pages DNS and publish settings, then change `saurabhmisal/everyday-lazo-tools` to **private**. GitHub Pages on Free can be unpublished by privacy changes; never reverse this order.
8. Keep a rollback reference for the old GitHub Pages content, with approved DNS and the last known Firebase Hosting release ID.

This static site does not require Firebase Auth/Firestore, a paid API, a payment method, Cloud Storage or a backend. The legacy Everyday native app is retired into Pencil and remains private.
