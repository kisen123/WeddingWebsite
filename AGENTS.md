# Kaja & Kristian — wedding website

Wedding site for 28 August 2027 in Elgå, Norway. Norwegian (`no`) is the
primary language; English (`en`) is secondary. Live at https://kajaogkristian.no
(GitHub Pages, deployed from `master`).

## Repo map

| Path                                  | What                                                                                           |
| ------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `frontend/`                           | React 19 + TypeScript + Vite + SCSS + i18next                                                  |
| `frontend/src/App.tsx`                | `/` → full site (Header + MainPage), `/save-the-date` → original save-the-date card (lazy)     |
| `frontend/src/components/<Name>/`     | One folder per component: `<Name>.tsx` + `<Name>.scss`                                         |
| `frontend/src/pages/`                 | Thin wrappers rendered as sections in `MainPage` (`#home #program #rsvp #contact #qa`)         |
| `frontend/src/i18n/locales/*.json`    | UI strings, `no.json` and `en.json` must have the same keys                                    |
| `frontend/src/content/qa/{no,en}/*.md`| Q&A answers as Markdown; registered in `src/helpers/qaContent.ts`; missing `en` falls back to `no` |
| `frontend/src/constants/wedding.ts`   | Wedding date and place, single source of truth                                                 |
| `frontend/src/api.ts`                 | Calls to the backend (`VITE_API_BASE_URL`, default `http://localhost:5050`)                    |
| `frontend/scripts/screenshots.mjs`    | Playwright screenshots at the standard viewports (see below)                                   |
| `backend/api/`                        | .NET 9 minimal API + EF Core + Postgres for RSVPs, see `backend/AGENTS.md`                     |
| `docker-compose.yml`                  | frontend + backend + Postgres for local full-stack dev                                         |
| `.github/workflows/`                  | `deploy.yml` (Pages, on push to `master`), `ci.yml` (checks on PRs)                            |
| `.claude/`                            | Claude Code settings, skills, subagents, hooks                                                 |

## Commands

Run from `frontend/` unless noted.

```bash
npm ci                     # install (needed once per worktree)
npm run dev                # Vite dev server, default :5173 (auto-picks next free port)
npm run build              # type-check + production build (+ 404.html SPA fallback)
npm run lint               # ESLint (incl. simple-import-sort)
npm run format:check       # Prettier
npm run screenshots        # PNGs of "/" at mobile/tablet/desktop → test-results/screenshots/<branch>/
npm run screenshots -- --route /save-the-date --selector '#rsvp' --viewport mobile
docker compose up --watch  # (repo root) full stack: frontend :5173, API :5050, Postgres :5432
dotnet build bryllup-nettside.sln   # (repo root)
```

The screenshot script starts its own Vite server on a free port, so it is
safe to run from several worktrees at once. It exits with code 2 and reports
`horizontalOverflow: true` if any page scrolls sideways.

## Branches and releases

- `master`: **production**. Every merge deploys to kajaogkristian.no.
- `develop`: integration branch. All work lands here first.
- Both are protected on GitHub. Changes arrive **only through pull requests** with
  green CI (`frontend`, `backend`, `security`). Never merge locally into
  `develop`/`master` and never push to them.
- Work starts from a GitHub issue (templates: feature, bug, design, content,
  tech). Branch `feature/<issue#>-<name>`, `fix/…` or `chore/…` from `develop`, and
  open a PR to `develop` whose body says `Closes #<issue#>`.
- Merge method: feature PRs into `develop` may be squashed. **Release PRs
  `develop → master` must use "Create a merge commit"**; squashing them makes
  the branches diverge. See the `release` skill.
- Dependabot opens weekly dependency PRs against `develop`.

### Repository settings (configured on GitHub, not in code)

- Branch protection on `develop` and `master`: PR required, checks `frontend`,
  `backend`, `security` must pass, conversations resolved, no force-push or
  deletion. **It applies to admins too.**
- Merge methods: merge commit and squash allowed, rebase disabled. Branches are
  deleted after merge. Commit title and message = PR title and body.
- Private vulnerability reporting is on (linked from the issue chooser).
- Labels: `enhancement`, `bug`, `design`, `content`, `chore`, `security`,
  `dependencies`, `admin`, `dotnet` (.NET-specific; revisit if the backend changes).
- If you change any of these in the GitHub UI, update this list.

## Parallel work with git worktrees

Each feature gets its own worktree under `.claude/worktrees/<name>` (gitignored),
with its own branch, `node_modules` and dev-server port. Start one with the
`new-feature` skill or `claude --worktree <name>`. Never use bare
`git stash`, since the stash is shared between worktrees; make a WIP commit instead.

## Conventions

- TypeScript strict; function components; named exports for components
  (`export function Header()`), except lazily loaded route components (default export).
- Every user-facing string goes through `t('…')` with keys in **both** locale
  files. Norwegian copy is written first.
- SCSS sits next to its component, BEM-ish class names (`block__element--modifier`).
- Prettier (single quotes, semicolons, trailing commas) and ESLint
  import sorting are enforced; run `npm run lint:fix && npm run format`.
- Images that components import go in `src/assets/`; files referenced by URL from
  Markdown go in `public/`.

## Design rules

- Match a provided reference image or sketch closely.
- Responsive CSS Grid/Flex and fluid typography (`clamp()`); do not solve
  responsiveness by uniformly shrinking the page.
- Verify at **390×844, 768×1024 and 1440×1000** with `npm run screenshots`
  after every visual change, and look at the images.
- No horizontal scrolling, ever.
- Semantic, accessible HTML: landmarks, headings in order, labelled form
  fields, `alt` text, sufficient contrast, decorative SVG `aria-hidden`.
- Decorative borders/ornaments are inline SVG, generated from parameters
  rather than hand-edited path coordinates (see the `svg-design` skill).
- Keep content inside the inner safe region of any decorative border.
- The site is light-only (`color-scheme: only light`); don't add dark mode
  unless asked.
