## What and why

<!-- One or two sentences. Link the issue: "Closes #12" closes it on merge. -->

Closes #

## Screenshots

<!-- For visual changes: mobile (390) and desktop (1440), before and after.
     npm run screenshots -- --route / --selector '#section' -->

## Checklist

- [ ] Targets `develop` (only release PRs target `master`)
- [ ] `npm run lint`, `npm run format:check` and `npm run build` pass
- [ ] Visual changes checked at 390 / 768 / 1440 with no horizontal scroll
- [ ] New or changed text exists in both `no.json` and `en.json`
- [ ] Touches backend, auth, guest data, dependencies or workflows → ran the `security-reviewer` agent and fixed blockers
- [ ] No secrets, `.env` files or real guest data committed
