# @systemoperator/slug

URL-safe slug generator extracted from system operator's internal tooling.

## Development

- run tests: `npm test`
- build: `npm run build`
- publish dry run: `npm publish --dry-run`

## Publishing

tag-based via GitHub Actions:
1. bump version in package.json
2. commit and tag: `git tag v0.1.0`
3. push tag: `git push --tags`
4. CI runs tests, builds, publishes to npm

NPM_TOKEN secret expires on May 22, 2026.

## Code conventions

- TypeScript, ESM only
- no database dependencies - this is a pure utility package
- keep files under 500 lines
- use limax as the underlying Unicode slugifier
- transliteration follows the official Ukrainian standard
