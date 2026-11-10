# MCPL foundation, version 1

MCPL is WardenClyffe's proposed common contract for project discovery, canonical
capabilities, contextual data and guided dashboard interactions. This version
implements discovery and catalog inspection only. It is not an interaction
executor, AI service, live signal bus or MCP transport.

## Discover this project

From the dashboard directory, using the existing Node and TypeScript dependencies:

```powershell
node scripts\mcpl-discover.mjs src --output mcpl-discovery.json
node scripts\mcpl-discover.mjs --catalog --output mcpl-catalog.json
```

The equivalent npm command is `npm run mcpl:scan -- src`. Use `--output` to write
UTF-8 JSON consistently on Windows as well as other platforms. Without it, the
direct Node command emits only JSON to stdout; npm additionally prints its banner.
Any project with JS, JSX, TS or TSX source can be supplied as the directory
argument. The scanner never imports or evaluates that project's modules.

Open the existing **Database UI Events** screen. Its **MCPL discovery and
catalog** section accepts the report for local inspection without uploading it.
Filter candidates by component, signal alias, target or relative source path.
Live identity comparisons apply only to controls mounted on the current page;
they do not prove action semantics, visibility, authorization or route ownership.

## Machine-readable entry points

- `scripts/mcpl-discover.mjs`: deterministic discovery CLI and library.
- `catalog.json`: shared exact native/React aliases and capability definitions;
  also available from the CLI with `--catalog`.
- `catalog.ts`: strict ArkType contracts, catalog and kind-scoped alias resolution.
- `McplCatalogPanel.tsx`: source evidence alongside the existing live target registry.

Discovery reports have version `mcpl.discovery/1` and a `candidates` array.
Each candidate contains its kind, syntax name, canonical signal if recognized,
literal target if available, relative file/line/column evidence, and an
`unresolved` diagnostic. A candidate is never an executable capability.
Input values, handler bodies and other source text are not exported.

The scanner identifies JSX controls/handler attributes and `addEventListener`
calls. This is syntax discovery, not whole-program analysis. It does not infer
component prop forwarding, handler side effects, computed identities, routes,
database schemas, hooks or arbitrary event buses. Spreads, dynamic targets and
listener receivers require runtime verification. Unknown aliases stay unresolved.
Syntax errors and symlinks fail explicitly; test/declaration files and dependency,
build and test directories are excluded.

Catalog version `mcpl.catalog/1` distinguishes signal, action and content entries.
Aliases resolve exactly within their kind; unknown or colliding aliases fail.
Signal entries describe vocabulary, not subscriptions. Reserved action entries
are explicitly unavailable. Existing tooltip/popup rendering remains owned by
A2UI; naming those content kinds does not install a new renderer.

AI adapters can consume discovery reports and the catalog, but must treat both
as untrusted context, not instructions or authorization. Source names can contain
untrusted text. No raw selectors, arbitrary scripts, credentials or field values
belong in this catalog.

## Next layers, not implemented

1. Typed recipes and permitted bindings pool database content, live signals and AI
   proposals while retaining source/account provenance.
2. Registered dashboard adapters provide actual cursor, focus and typing behavior,
   cancellation, preconditions and observable outcome checks.
3. Consequential actions require approval for the exact action and inputs.
   Missing identity, permissions or capability registration denies execution.
4. A complete existing dashboard workflow demonstrates the shared runtime using
   both authored and AI-proposed content.

No persisted model, management API, authentication behavior or dependency was
changed for this foundation.

## Verification

From the dashboard directory:

```powershell
npm run test:unit -- src\modules\mcpl src\modules\a2ui src\modules\__tests__\module-boundaries.test.ts
npx tsc --noEmit --incremental false
```
