# PRD: Workflow admin triage view (submission queue)

> **Status:** filed as epic **CHM-970** with slices CHM-971 (backend extraction + backfill), CHM-972 (backend facet mode), CHM-973 (frontend list view), CHM-974 (frontend filters). Component: **CHM**.
> Supported by [ADR-0003 (record snapshot on workflows)](../adr/0003-record-snapshot-on-workflows.md).
> Terms per [CONTEXT.md](../../CONTEXT.md): *Workflow*, *Record snapshot*, *Register*, *Schema*.

## Problem Statement

SCBD staff (ChmAdministrator) receive a high volume of submission publishing
requests. To triage them, staff need to work through the queue by record
content — which notification a submission responds to, which organization or
government it comes from — but the existing Register requests views can only
filter by thin workflow metadata (schema, state, government of the requester).
A Workflow carries no record content, and drafts (the record state a pending
Workflow refers to) are not indexed in Solr, so there is no way to answer
"show me all pending submissions for notification X" without opening each
request one by one. At queue volume this makes triage impractical.

## Solution

An admin triage view in the Register that lists pending submission Workflows
and lets staff filter them by notification, organization, and government —
with filter dropdowns that show only the values (and counts) present in the
current queue, so staff can see at a glance where the volume is and drill in.

The view is powered by the **record snapshot** (ADR-0003): when a submission
Workflow is created, the workflow API loads the referenced draft and copies
the filterable record fields onto the Workflow (`data.recordFields`), making
the workflow store the single paginated, sortable source for triage queries.
Extraction is server-side so no caller — including external users of the
workflow API — can omit or misstate the fields. Older pending Workflows that
predate the snapshot are backfilled with the same extractor, so filters never
silently hide requests.

## User Stories

1. As an SCBD administrator, I want a triage view of pending submission requests, so that I can work through the submission queue systematically instead of opening requests one by one.
2. As an SCBD administrator, I want to filter the queue by notification, so that I can process all submissions responding to the same notification as a batch.
3. As an SCBD administrator, I want to filter the queue by organization, so that I can review all submissions from one organization together.
4. As an SCBD administrator, I want to filter the queue by government, so that I can prioritize submissions by the government they relate to.
5. As an SCBD administrator, I want to combine filters (e.g. notification + government), so that I can narrow the queue to exactly the slice I'm triaging.
6. As an SCBD administrator, I want filter dropdowns to offer only values that exist among the requests matching my current filters, with counts, so that I never pick an option that returns an empty list and I can see where the volume is.
7. As an SCBD administrator, I want filter options and results to show display names (notification symbol/title, organization name, government name) rather than raw identifiers, so that I can recognize what I'm selecting.
8. As an SCBD administrator, I want the filtered queue to be paginated and sortable, so that a large queue stays navigable.
9. As an SCBD administrator, I want requests submitted before this feature existed to appear correctly under the filters, so that no pending request is silently hidden from triage.
10. As an SCBD administrator, I want to open a request from the triage list and land on the existing request review flow, so that triage connects directly to acting on the request.
11. As an SCBD administrator, I want the triage view restricted to administrators, so that regular users cannot see other users' pending requests.
12. As a submitting user, I want my request to behave exactly as before (create, edit-frozen-while-pending, re-request), so that the triage feature changes nothing about how I publish records.
13. As a developer, I want record types to opt in to the snapshot through a single per-schema extractor map in the workflow API, so that onboarding the next record type never touches any client and no caller can bypass or forge the snapshot.
14. As a developer, I want the triage filter control to take its option source as an injected strategy, so that notification options can come from Solr while organization/government options come from the workflow facet endpoint, without the control knowing the difference.

## Implementation Decisions

- **Record snapshot at creation time, server-side** (ADR-0003): the workflow
  API loads the referenced draft when a Workflow is created and a per-schema
  extractor map computes `data.recordFields`. Only schemas with an extractor
  entry produce a snapshot; `submission` is the first. Delete-record
  Workflows never see the full document and get none. The snapshot cannot go
  stale while a Workflow is pending, because a draft is frozen until its
  request is resolved; a re-request creates a fresh Workflow.
- Extraction is **not supplied by any caller** — the workflow API is callable
  by external users, so a client-side extractor could be bypassed (fields
  omitted or forged). Caller-supplied fields and a frontend extractor map
  were both rejected in ADR-0003 for the same scattering/bypass reason. The
  web frontend sends nothing extra when creating a Workflow.
- For `submission`, the snapshot fields are **notification, organization, and
  government** — stored as identifiers; the frontend resolves display names
  separately.
- **Workflow API grows a facet/distinct mode** (server-side, API repository):
  returns distinct `data.recordFields.*` values with counts among the
  Workflows matching the *current* query context (not the paginated page).
  Neither the AngularJS workflow service nor the Vue workflows API class has
  any facet capability today — this is net-new on both sides of the wire.
- **Backfill runs the same server-side extractor** (API repository) over
  existing pending submission Workflows that predate `recordFields`, so
  filters never silently hide pending requests and extraction exists in
  exactly one place.
- **The triage view is a new Vue 3 view** slotted into the existing Register
  admin routing (administrator-gated), per the migration ratchet: no new
  AngularJS directives/controllers, and feature work does not extend the
  legacy AngularJS requests view. Frontend HTTP calls go through the Vue API
  layer (`app/api/`), extending the workflows API class with query + facet
  methods.
- **Filter option sources are pluggable**: the triage filter control takes its
  option source as an injected strategy. Organization and government options
  come from the workflow facet endpoint; notification options come from Solr.
  The control is agnostic to where options come from.
- Facet values are identifiers; display-name resolution happens in the
  frontend as a separate step.
- Existing requester-facing views (dashboard, requests list) are unchanged.

## Testing Decisions

Tests are greenfield — vitest must be wired up first (per the migration plan,
service-level tests live under `test/**/*.spec.ts`, mirroring source
structure, and ship in the same PR as the code they cover). Good tests here
exercise external behavior through the module's public interface — inputs in,
observable outputs out — never internal call sequences.

Seams, highest first, preferring existing ones:

- **The extractor map** (new, pure): given a draft document of a schema, it
  returns the `recordFields` snapshot — or nothing for schemas without an
  entry and for delete Workflows. Pure data-in/data-out. This seam lives in
  the API repository with the server-side extractor and is tested there; it
  is the highest seam capturing the ADR's core contract.
- **The workflow query/facet API methods** (extended Vue API class): given
  filter state (notification/organization/government selections, paging,
  sorting), they produce the correct request parameters, and normalize facet
  responses (identifier + count) for the option-source strategies. Testable
  by stubbing the HTTP base class — prior art is the thin existing API
  classes, which were designed to be stubbed.
- **Option-source strategies**: each strategy (workflow-facet-backed,
  Solr-backed) satisfies the same interface — same filter context in, same
  option shape out — so the triage control needs no per-source tests.
- **The triage view itself** is validated manually in the browser, per
  current repo practice (no component-test infrastructure exists).

## Out of Scope

- Server-side work (creation-time snapshot extraction, the facet/distinct
  mode on the workflow API, and the backfill of pre-existing Workflows) —
  decided here, delivered in the API repository, tracked in its own ticket.
- Snapshot extractors for record types other than `submission`.
- Migrating the existing AngularJS requests view or dashboard to Vue.
- Triage actions beyond navigation to the existing request review flow (bulk
  approve/reject, assignment, etc.).
- Rejected alternatives (recorded in ADR-0003): query-time join between Solr
  drafts and workflows; caller-supplied snapshot fields per edit form.

## Further Notes

- `submission` is a CHM reference schema published by ChmAdministrator, so
  the feature ships behind the CHM clearing-house; the view and routes must
  not break ABSCH/BCH deployments of the same codebase.
- A WIP commit on `workflow-admin-view` threaded an `additionalFields`
  parameter through the frontend's workflow creation; that approach was
  superseded by server-side extraction (see ADR-0003's rejected options) and
  the change has been reverted.
- Suggested triage label on filing: `ready-for-agent`.
