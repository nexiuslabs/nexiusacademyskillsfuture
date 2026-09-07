# Academy conversion fixes — 7 September 2026

Owner task: `fix them one by one starting with the most urgent ones`, following the Academy conversion audit in the same Codex task. Base: `13d5291b3faa14f8b0a0f8340afb326640135619`.

## Maintenance contract

- Foundation next-intake summaries and modal options use `SCHEDULES` in `constants.tsx`. Closed intakes must not appear as the next cohort or in enquiry options. Interest-only cohorts remain enquiries, never confirmed registration. Preserve the official registration destination and capture-before-handoff behaviour.
- The Foundation calculator and lead modal share `services/foundationFees.ts` and `FoundationFeeEstimator`. Do not reintroduce an age-only Foundation estimate or assume visitors qualify for a subsidised tier. Rates are the existing published rates, not a new funding-policy determination. Eligibility selections persist in memory for the current page session; no new tracking storage is added.
- `Check Subsidy` for Foundation opens the calculator before any contact form. Visitors opt into an advisor follow-up. A free calculation must not create a lead or send an email.
- `App.tsx` owns the single advisor widget. Course pages must not render a duplicate. Mobile positioning leaves the bottom registration rail unobstructed.
- Keep the homepage's primary course action, next Foundation intake and comparison details visible and sourced from course schedules.
- Both private-class routes and shared private pricing use the existing 15-person offer. The corporate form has one role/designation field and an optional training brief (team size, preferred timing, goals). For the private-company course only, this free-form requested cohort brief is sent in the existing `preferredIntake` field and stored as `preferred_intake`; it is not a confirmed public cohort. No schema migration or new CRM field is introduced.
- Keep enquiry language distinct from confirmed enrolment. The schedule CTA saves the lead before its existing official registration handoff; hero/rail interest CTAs request assisted registration. Do not claim registration is complete merely because capture succeeded.

## Verification and release

Run `npm run test:functions` and `npm run build`. The regression suite includes all published Foundation residency/age/SME combinations and shared profile continuity.

The isolated browser audit covers widths 375, 390, 599, 768, 1024 and 1440; first-screen homepage CTA; advisor overlap and horizontal overflow; calculator-first flow; fee continuity; Escape/focus return; closed September exclusion; failure recovery; mocked lead capture with UTM preservation; mocked official handoff; and corporate brief payload. Browser requests to external services are intercepted. No real lead or email is created by these checks.

Release only through `/usr/local/share/nexius/RELEASE_COORDINATION.md` and the existing Academy `nexius-devctl` controller. Preserve the last production snapshot for rollback. Do not modify database, email, analytics configuration or the paused course rebuild as part of this UI release.

Conversion improvement remains a hypothesis until measured. Existing analytics and UTM capture remain in place; this change does not claim an uplift or install new instrumentation.
