# WardenClyffe 0.5.0 execution plan

The confirmed model is that users independently install their own WardenClyffe
stack, using their own server and domain. Enterprise-panel provisioning is not a
prerequisite. A hosted customer-instance offering is a separate decision, not
permission to deploy publicly. AI chat remains AI-only. MCPL is not complete.

Product version: [`RELEASE_VERSION`](../RELEASE_VERSION), `0.5.0`.
Development builds must remain identifiable as development builds. Release
numbers must not silently change inherited capability or posture decisions.

## Gate 1: establish the WardenClyffe foundation

[`shippinAI/wardenclyffe`](https://github.com/shippinAI/wardenclyffe) is the
authoritative product repository and owns the roadmap. NetBird is the original
baseline and an external comparison source, not WardenClyffe's product upstream.
Evaluate fixes and capabilities individually; do not blindly synchronize or
rename third-party module identities.

Reference releases checked on 2026-11-09:

- [NetBird v0.82.0](https://github.com/netbirdio/netbird/releases/tag/v0.82.0).
- [Dashboard v2.96.0](https://github.com/netbirdio/dashboard/releases/tag/v2.96.0).

This repository starts with an initial import, without an upstream ancestor or
release tags. Import date does not establish source or capability parity.

Confirmed differences requiring review before any port:

| Surface | NetBird comparison baseline | Current WardenClyffe |
| --- | --- | --- |
| HA route selection | 20ms and 20% latency margins, noise evaluation, 30s dwell | Older score selection with a 10ms margin |
| CLI peer table | `status --table`, compatible filters | No table flag in the current status command |
| Installer reverse proxy | Traefik v3.7.14 default; rejects versions below v3.7.13 for header-sanitization compatibility | Traefik v3.6 default, without the corresponding version guard |

Evidence: [upstream routing](https://github.com/netbirdio/netbird/blob/v0.82.0/client/internal/routemanager/client/client.go),
[local routing](../client/internal/routemanager/client/client.go),
[upstream status](https://github.com/netbirdio/netbird/blob/v0.82.0/client/cmd/status.go),
[local status](../client/cmd/status.go).
Reverse-proxy evidence: [upstream installer](https://github.com/netbirdio/netbird/blob/v0.82.0/infrastructure_files/getting-started.sh)
and [local installer](../infrastructure_files/getting-started.sh).
The upstream header-sanitization requirement needs assessment and an approved
dependency/configuration update, not an unreviewed version substitution.

Next: compare source and observable contracts across client, management,
signal/relay, DNS/routes, policies/posture, identity, proxy, API and dashboard.
Classify each capability as verified, missing, intentionally different, or
unverified. Separate public self-hosted features from NetBird hosted/commercial
services. Agree high-risk ports and dependency changes before implementing them.
The confirmed differences above are not a complete capability audit.

## Gate 2: self-hosted acceptance

| Acceptance | Current evidence |
| --- | --- |
| Fresh server startup and initial owner setup | Container e2e passes |
| Reject repeated initial setup | Container e2e passes |
| Owner PAT, groups and setup keys | Container e2e passes |
| Two actual peers connect directly | Packet probe and peer-reported P2P mode pass |
| Two actual peers use forced relay | Packet probe and peer-reported Relayed mode pass |
| Policy denial and restoration | Actual ICMP traffic blocks and resumes in both modes |
| Restart persistence | Owner PAT, peers, policy and traffic survive restart in both modes |
| Remote jobs | Opt-out refusal and explicit opt-in tests pass |
| Installer readiness | Rejects HTML catch-all, malformed instance JSON, wrong issuer and untrusted TLS; bounded timeout |
| Existing local account | Account volume retained; instance reports setup not required |
| Public trusted HTTPS and browser login | Not verified; local HTTP stack health reports certificate invalid |
| Clean installer run on a disposable deployment host | Not verified |
| Published installable images and client artifacts | Not established; installers still use local or inconsistent registry references |
| Backup/restore and supported upgrade path | Not verified |
| PostgreSQL account-loader parity | Not verified; raw pgx queries still contain legacy table names |
| Full platform/test/lint acceptance | Not established |

Focused repeatable commands, run from the repository root:

```shell
go test -tags 'e2e devcert' ./e2e/harness ./e2e/selfhost ./e2e/remotejobs -count=1 -timeout 25m -p 1
go test -race -tags devcert ./management/server/store -run '^TestSqlStore(PATUserUsesRuntimeTables|GroupLookupsUseRuntimeTables|UIEventsPersistAndIsolateAccounts)$' -count=1
bash infrastructure_files/tests/readiness_test.sh
```

The shell tests require Bash, curl and jq. Container e2e requires Docker and
runs networking changes only inside disposable containers. Test encryption keys
are generated per instance, persisted in its configuration, and never printed.
These tests do not prove production TLS, browser SSO or internet NAT traversal.

Fixes implemented in this execution: native Windows bind paths, Linux entrypoint
line endings/executable mode, published go-nat module identity at the unchanged
revision, canonical-table PAT/group queries, persistent test encryption
configuration, and strict installer readiness.

The version-fetch lifecycle race is fixed: stop cancels an active request and
waits for the fetch loop, repeated stop is safe, and stop-before-start prevents
a later loop. Requests have a timeout and bounded response reads. The full
version-package race suite passes.

Known broader validation failures: legacy fixture store tests fail during
pre-AutoMigrate migration on a missing `name` column; the client updater's
consumer suite reports races involving its mutable test mock. These failures
are not waived and full foundation acceptance remains incomplete.

Next: confirm deployment host/domain and customer isolation model, align
artifact publication, then prove trusted HTTPS/login, full installer operation,
backup/restore, upgrades and remaining platform coverage.

## Gate 3: MCPL and AI interaction acceptance

Already implemented: account-persisted tooltip/popup definitions and native
hover/focus/click rendering. Those do not constitute MCPL execution.

Before implementation, confirm:

1. Whether the scripted cursor is an in-app visual cursor or an OS pointer.
2. Which real operations it performs: scrolling, row selection, opening menus,
   field editing, clicks, and tool execution.
3. Action approvals, cancellation, pause/resume and interruption behavior.
4. AI representative identity, role/status, placeholders and concurrent actors.
5. MCPL ownership relative to separate AI chat, MCP connections and A2UI.
6. Table/row layouts, contextual help, keyboard equivalents, reduced motion,
   touch behavior and recovery when a target disappears.

Then implement one approved real-panel workflow with persisted definitions,
visible representative/cursor state, exact targets, accessible help and
auditable action results. Test the actual workflow, including denial and
interruption, before expanding it across screens. Do not use browser automation
as the product runtime or represent preview fixtures as operational agents.
