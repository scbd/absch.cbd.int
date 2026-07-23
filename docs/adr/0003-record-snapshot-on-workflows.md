# Snapshot record fields onto workflows for triage filtering

Register triage views need to filter workflow requests by record content
(first case: SCBD staff triaging the high-volume submission queue by
notification, organization, and government). Workflows carry only thin
metadata, and drafts — the record state a pending workflow refers to — are
not indexed in Solr, so there is no queryable store that joins workflow
state with record data. We copy the filterable fields onto the workflow at
creation time: a per-schema extractor in `editFormUtility` writes them to
`data.recordFields` (the **record snapshot**, see CONTEXT.md), making the
workflow store the single paginated, sortable source for triage queries.
The snapshot cannot go stale while a workflow is pending, because a draft is
frozen until its request is resolved; a re-request creates a fresh workflow.

Only schemas with an extractor entry produce a snapshot (`submission` is the
first); delete-record workflows never see the full document and get none.
Workflows created before an extractor existed lack the fields and are
backfilled server-side, so filters never silently hide pending requests.

## Considered Options

- Join at query time (filter drafts in Solr, intersect with workflows by
  identifier) — rejected: drafts are not in Solr, and even if they were,
  pagination and sorting across two stores degrade at triage volume.
- Caller-supplied fields (each edit form passes its own extra fields to
  `publishRequest`) — rejected: scatters the contract across dozens of
  forms and lets the shape drift per record type; the extractor map keeps
  it in one file, and onboarding a record type never touches its form.

## Consequences

Because the snapshot store (workflows) is now the source of truth for triage
filtering, the workflow API must grow beyond returning documents:

- **Backfill** — existing pending submission workflows predate `recordFields`
  and are backfilled server-side, so filters never silently hide them.
- **Contextual facets** — triage filter dropdowns are populated from the
  distinct `data.recordFields.*` values (with counts) among the workflows
  matching the *current* query context, not the paginated result page. This
  requires a facet/distinct mode on the workflow API that honors the same
  query filters as the results request. Facet values are identifiers; the
  frontend resolves display names separately. Filter option sources are
  otherwise pluggable — e.g. notifications populate from Solr, not the
  workflow facet — so the triage control takes its option source as an
  injected strategy and is agnostic to where options come from.
