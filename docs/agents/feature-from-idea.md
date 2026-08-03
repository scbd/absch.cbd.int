# Starting a feature from an idea

How to take a feature that exists only in your head to a Jira ticket ready for
the agent suite. This is the entry point *before*
[feature-workflow.md](feature-workflow.md), which assumes the ticket already
exists. See [AGENTS.md](../../AGENTS.md) for the rules that back this flow
("a human decides before code exists"; every non-trivial PR links a Jira
ticket that existed before the branch).

## The two entry points

| You have… | Start with |
|---|---|
| A Jira ticket (user-raised or filed) | [feature-workflow.md](feature-workflow.md) |
| An idea, no ticket yet | this document |

## Step A — Grill the design, capture the docs

```
/grill-with-docs
```

Describe the feature and get interrogated — scope, edge cases, alternatives —
while changing your mind is free. As decisions solidify they are written down
*in the same session*:

- architectural decisions → an ADR in [docs/adr/](../adr/)
- new domain terms → glossary entries in [CONTEXT.md](../../CONTEXT.md)

New features are where new terms and decisions get minted, so prefer this over
plain `/grilling` (which only stress-tests, without producing docs). The skill
is user-invoke-only — the agent cannot fire it for you.

## Step B — File the PRD

```
/to-prd
```

Turns the grilled context into a PRD and files it in Jira with the
`ready-for-agent` label. The PRD holds the *what/why* (problem, user stories,
acceptance criteria); the ADRs from Step A hold the *how/why-this-way*. The
ticket must exist **before any branch is created** — that ordering is a repo
rule, not a preference.

To draft locally first, ask for a local PRD (it goes under `docs/prd/`) and
file it to Jira when ready.

**Jira:** the new ticket is born in `Draft`. Since the design review already
happened in Step A, walk it forward once the PRD is accepted:
`Draft → In Review` (121 "Draft To Review"), then
`In Review → Selected for Development` (171 "Accepted for Development").
Verify transitions first with `getTransitionsForJiraIssue` — CHM uses custom
ones (full map: [chm-jira-workflow.md](chm-jira-workflow.md)).

## Step C — Hand off to the ticket flow

Continue at [feature-workflow.md](feature-workflow.md) **Step 1 — Plan**
(`/scbd-agent-plan ticket=CHM-XXX`); Step 0 (design) is already done. Remember
component is ticket-scoped — pass `component=<ABSCH|BCH|CHM>` to match where
the feature ships.
