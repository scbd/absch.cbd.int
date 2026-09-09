# Snapshot record fields onto workflows for triage filtering

Register triage views need to filter workflow requests by record content
(first case: SCBD staff triaging the high-volume submission queue by
notification, organization, and government). Workflows carry only thin
metadata, and drafts — the record state a pending workflow refers to — are
not indexed in Solr, so there is no queryable store that joins workflow
state with record data. We copy the filterable fields onto the workflow at
creation time as `data.recordFields` (the **record snapshot**, see
CONTEXT.md), stored on the workflow document in Mongo, making the workflow
store the single paginated, sortable source for triage queries.

The snapshot is assembled by the workflow API from two sources, merged at
creation time:

1. **Caller-supplied fields** — the create-workflow request may pass
   `recordFields`. The backend validates them against the referenced
   draft's data (supplied fields must exist in the draft; whether custom
   fields with no draft counterpart are allowed is an open implementation
   question).
2. **Realm schema configuration** — if the realm configuration defines
   `recordFields` for the workflow's schema, the API loads the referenced
   draft and extracts those fields, filling in any field the caller did
   not supply. Caller-supplied values take precedence.

Realm configuration is the opt-in point: onboarding a record type to the
snapshot is a configuration change, not an API code change (`submission`
is the first, with notification, organization, and government). Delete-record
workflows never see the full document and get no extracted snapshot.
The snapshot cannot go stale while a workflow is pending, because a draft is
frozen until its request is resolved; a re-request creates a fresh workflow.

Workflows created before the snapshot existed lack the fields and are
backfilled server-side with the same realm-config-driven extraction, so
filters never silently hide pending requests.

> **Revision (2026-08-04):** the original decision rejected caller-supplied
> fields outright and hardcoded a per-schema extractor map in the API. It
> was revised before implementation: callers may now supply validated
> `recordFields`, and the field definitions moved from a code-level
> extractor map to realm schema configuration, with server-side extraction
> kept as the baseline for fields the caller omits.

## Considered Options

- Join at query time (filter drafts in Solr, intersect with workflows by
  identifier) — rejected: drafts are not in Solr, and even if they were,
  pagination and sorting across two stores degrade at triage volume.
- Server-only extraction via a hardcoded per-schema extractor map, with
  caller-supplied fields rejected (the original decision here) — revised:
  it kept extraction in exactly one place, but onboarding each record type
  required an API code change, and callers had no way to enrich the
  snapshot. Moving field definitions to realm configuration keeps a single
  server-side extraction path while making onboarding a config change;
  validated caller-supplied fields are accepted on top.
- Frontend extractor (per-schema map in `editFormUtility`, the original
  choice before that) — rejected: from the API's perspective the web
  frontend is just one caller, so external API users would create
  workflows with no snapshot at all, and the backfill already requires a
  server-side implementation of the same extraction, which would then
  exist twice and drift. Realm-config extraction guarantees a baseline
  snapshot for every caller.

## Consequences

Because the snapshot store (workflows) is now the source of truth for triage
filtering, the workflow API must grow beyond returning documents:

- **Validation and merge** — the workflow service, which previously treated
  `data` as opaque, now validates caller-supplied `recordFields` against
  the referenced draft and merges them with realm-config-driven extraction.
  The coupling is accepted: the facet endpoint already makes the API aware
  of `recordFields`, and server-side extraction is the only way to
  guarantee a baseline snapshot for every caller.
- **Backfill** — existing pending submission workflows predate `recordFields`
  and are backfilled server-side by running the same realm-config-driven
  extraction over them, so filters never silently hide them and extraction
  exists in exactly one place.
- **Contextual facets** — triage filter dropdowns are populated from the
  distinct `data.recordFields.*` values (with counts) among the workflows
  matching the *current* query context, not the paginated result page. This
  requires a facet/distinct mode on the workflow API that honors the same
  query filters as the results request. Facet values are identifiers; the
  frontend resolves display names separately. Filter option sources are
  otherwise pluggable — e.g. notifications populate from Solr, not the
  workflow facet — so the triage control takes its option source as an
  injected strategy and is agnostic to where options come from.
