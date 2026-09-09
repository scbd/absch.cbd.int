import { Tooltip } from 'bootstrap'

// Mirrors app/components/reports/abs/nr1-analysis.vue's tooltip init: dispose
// any stale instance (title text may have just changed) before re-binding.
export function initTooltips (container: ParentNode = document): void {
  const tooltipTriggerList = container.querySelectorAll('[data-bs-toggle="tooltip"]')
  Array.from(tooltipTriggerList).forEach((tooltipTriggerEl) => {
    Tooltip.getInstance(tooltipTriggerEl)?.dispose()
    void new Tooltip(tooltipTriggerEl, { container: 'body', boundary: document.body, trigger: 'hover' })
  })
}

// Call before removing a tooltip-triggering element from the DOM (e.g. a
// dismiss button inside the trigger). The popup is appended to <body>
// (container: 'body' above), so if the trigger is yanked out mid-hover
// without this, the popup is orphaned on screen with nothing left to hide it.
export function disposeTooltip (element: Element | null | undefined): void {
  if (element === null || element === undefined) return
  Tooltip.getInstance(element)?.dispose()
}
