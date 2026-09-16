# Starting a feature ticket with the SCBD agent suite

| Step | Jira status before the step | Transition to fire → resulting status | Command |
|---|---|---|---|
| 0 — Design | Draft | 121 "Draft To Review" → In Review | `/grilling` |
| 1 — Plan | In Review | 171 "Accepted for Development" → Selected for Development | `/scbd-agent-plan ticket=CHM-XXX` |
| 2 — Implement | Selected for Development | 111 "Review To Progress" → In Progress | `/scbd-agent-implement ticket=CHM-XXX` |
| 3 — Ship (PR open) | In Progress | 141 "Code Review" → Peer Review | `/scbd-agent-github ticket=CHM-XXX action=prepare-branch`<br>`/scbd-agent-github ticket=CHM-XXX action=open-pr`<br>`/scbd-agent-jira ticket=CHM-XXX action=peer-review` |
| 0-3 — One-shot (all steps) | wherever the ticket currently is | runs the transitions above end-to-end | `/scbd-agent-workflow CHM-XXX component=CHM` |

Full transition map, including the gotchas about transition names not
matching target statuses: [chm-jira-workflow.md](chm-jira-workflow.md).
`/scbd-agent-plan` is Jira-read-only and `/scbd-agent-implement` touches
nothing external, so they never move the ticket themselves — fire the
transition at each step boundary via `/scbd-agent-jira` (or manually in
Jira). Always verify the available transitions first with
`getTransitionsForJiraIssue`.

## How to take a ticket from request to PR

How to take a user-raised Jira ticket from request to PR using the skills in this
repo, from lightest to most automated. See [AGENTS.md](../../AGENTS.md) for the
rules that back this flow ("a human decides before code exists").

**Feature and bug tickets follow the exact same steps below** — a bug report
still needs Step 0's review before work begins; it doesn't skip straight to
`Selected for Development`. The only difference is the branch type in Step 3
(`feat` vs `bug`), which just matches the ticket's Jira issue type.

No ticket yet — just an idea for a feature? Start with
[feature-from-idea.md](feature-from-idea.md) instead (bugs are filed directly
as bug reports, not grilled from an idea).

### Step 0 — Design first (human-driven)

For any non-trivial feature, grill the design before code exists. If the ticket is
vague — user-raised tickets often are — stress-test the requirements first:

```
/grilling
```

**Jira:** move the ticket `Draft → In Review` (121 "Draft To Review") when the
design review starts.

### Step 1 — Plan

```
/scbd-agent-plan ticket=CHM-XXX
```

Reads the Jira ticket, git history, and GitHub context (read-only) and writes an
uncommitted plan under `docs/plans/`. Review and approve the plan before any code
exists.

**Jira:** move the ticket `In Review → Selected for Development`
(171 "Accepted for Development") when the design is accepted and planning begins.

### Step 2 — Implement

```
/scbd-agent-implement ticket=CHM-XXX
```

Implements the ticket (using the plan if one exists), leaving changes
**uncommitted** and touching nothing external. Review the diff.

**Jira:** move the ticket `Selected for Development → In Progress`
(111 "Review To Progress") when implementation starts.

### Step 3 — Ship

- `/scbd-agent-github` — branch (`<username>/<type>/CHM-XXX-short-desc` off
  `origin/master`, where `<type>` matches the ticket's Jira issue type — `feat`
  for a feature, `bug` for a bug), commit, and PR.
- `/scbd-agent-jira` — ticket transitions: move the ticket
  `In Progress → Peer Review` (141 "Code Review") when the PR opens. It looks up
  the real transitions first; CHM uses custom ones, not the SCBD/DEV default
  flow — see the full map in [chm-jira-workflow.md](chm-jira-workflow.md).
- `/scbd-agent-review` — PR feedback cycles later.

## One-shot version

```
/scbd-agent-workflow CHM-XXX component=CHM
```

Runs one full iteration end-to-end — workspace, plan, implement, verify, evidence,
Jira/GitHub state, handoff. More automated, less checkpoint-by-checkpoint control.

Component is ticket-scoped: pass `component=<ABSCH|BCH|CHM>` to match the ticket.

## Which to pick

Go step-by-step (grill → plan → approve → implement) for new features from user
requests. Use the one-shot workflow once tickets are well-specified.
