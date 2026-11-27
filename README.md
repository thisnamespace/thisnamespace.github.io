# thisnamespace.com

Michael Day's site: one page about what he cares about in building software. It is a presence, not a CV.

## Stack

- Bun, React 19, TypeScript, Vite
- One hand-written stylesheet, `src/styles/site.css`. No UI library.
- Pages are built to plain HTML ahead of time, then React attaches in the browser
- Served by `serve`, hosted on Railway, with Cloudflare in front
- Vitest for unit tests, Playwright with axe for browser and accessibility tests, Storybook for components

## Commands

```bash
bun install
bun dev                 # development server on :5173
bun run build           # type check, build, pre-build the pages, write the server config
bun run start           # serve the built site, as production does

bun run type-check
bun run lint
bun run test:unit
bun run test:e2e                      # against the dev server
PW_PRODUCTION=1 bun run test:e2e      # against the built site, as CI does
bun run storybook
```

## Where things are

| What                                                   | Where                                                     |
| ------------------------------------------------------ | --------------------------------------------------------- |
| All copy                                               | `src/data/content.ts`                                     |
| Styles and colour variables                            | `src/styles/site.css`                                     |
| Fonts, trimmed to the characters in use                | `src/assets/fonts/`, rebuilt by `scripts/subset-fonts.py` |
| Pre-building the pages and the Content-Security-Policy | `scripts/prerender.mjs`                                   |
| Response headers, redirects, caching                   | `serve.config.json`                                       |
| Writing rules for copy, commits and docs               | `.claude/skills/humanise/SKILL.md`                        |

## Notes

- If you add a character the fonts don't have (an accent, a new symbol), a unit test fails. Add it to `src/assets/fonts/charset.json` and run the subset script.
- The Content-Security-Policy allows inline scripts by hash. The build works the hash out, so there is nothing to update by hand.
- CI runs on every push and pull request: audit of production dependencies, type check, lint, unit tests, and Playwright on desktop and mobile Chrome. Firefox and Safari run in a second job that does not block.

See `CONTRIBUTING.md` for commit conventions and `TESTING.md` for the test set-up.
