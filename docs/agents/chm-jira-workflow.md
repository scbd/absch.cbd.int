# CHM Jira workflow — transition map

The CHM Jira project (scbd.atlassian.net) has its own custom workflow, distinct
from the SCBD/DEV flow that the `scbd/agents` suite assumes
(`IN PROGRESS → PEER REVIEW → Completed` does **not** match CHM).

Enumerated 2026-07-24 via `getTransitionsForJiraIssue` against one live ticket
per status. This is a snapshot — admins can edit the workflow, so **always
verify with `getTransitionsForJiraIssue` before transitioning** and use this map
to sanity-check the result.

## Happy path for a feature ticket

```
Draft → In Review → Selected for Development → In Progress → Peer Review
      → Ready for Testing → QA Passed → Code Review → Released → Closed
```

## Full transition map

Format: transition id "name" → target status.

| From status | Transitions |
|---|---|
| Draft | 121 "Draft To Review" → In Review |
| In Review | 171 "Accepted for Development" → Selected for Development; 131 "Review To Closed" → Closed; 181 "Declined" → Declined |
| Selected for Development | 111 "Review To Progress" → In Progress |
| In Progress | 141 "Code Review" → Peer Review; 101 "Progress To QA" → Ready for Testing; 201 "revert to draft" → Draft |
| Peer Review | 151 "Code Review To QA" → Ready for Testing; 211 "Address PR comments" → In Progress |
| Ready for Testing | 61 "QA Passed" → QA Passed; 71 "QA Failed" → Reopened |
| QA Passed | 191 "QA_Passed-Done" → Closed; 231 "Code Review (PR)" → Code Review; 221 "Code Review" → In Progress |
| Code Review | 91 "Production Release" → Released (has a screen — may require field input) |
| Reopened | 81 "QA Failed" → In Progress; 241 "RepopenToTesting" → Ready for Testing |
| Released | 161 "Request Closed" → Closed |
| Closed | (terminal — no transitions) |
| Declined | (not sampled; presumed terminal) |

## Gotchas

- **Transition names don't match target statuses** — the transition named
  "Code Review" from In Progress lands on **Peer Review**. Match on the `to`
  status, not the transition name.
- **"QA Failed" names two different transitions**: from Ready for Testing
  (id 71 → Reopened) and from Reopened (id 81 → In Progress). Transition ids
  only make sense relative to the current status.
- **"Production Release" has a screen** (`hasScreen: true`) and may fail if
  fired blindly via the API without the fields it asks for.
