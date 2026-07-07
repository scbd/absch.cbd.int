# Header prototype — PROTOTYPE, throwaway

**Question:** what should the single realm-config-driven Vue header (built at the CHM
Flip, per MIGRATION-PLAN Phase 3) look like, and does a `[data-realm]` CSS-token model
(`--ch-*` custom properties feeding Bootstrap 5.3 `--bs-*`) cover all three
clearing-house themes plus dark mode without per-selector overrides?

**Run:** `open prototype/header-prototype.html` · variants `?variant=A|B|C` · ← → keys ·
realm + dark toggles in the floating bar.

- **A — Banner**: modernized version of today's layout (brand banner + nav row).
- **B — App bar**: one slim sticky row, inline search, realm color as the bar.
- **C — Utility split**: thin utility bar + neutral brand row + centered search, realm
  color only as accent.

**Verdict:** _(fill in: winning variant, or which pieces from which; then delete this
folder or fold the winner into the Flip's app shell)_
