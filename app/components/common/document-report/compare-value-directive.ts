import type { Directive, DirectiveBinding } from 'vue'

export const vCompareValue: Directive<HTMLElement, string | undefined> = {
  mounted: (element: HTMLElement, binding: DirectiveBinding<string | undefined>) => {
    const { value } = binding
    let compareClass = value ?? ''

    const siblings: Element[] = Array.from(element.parentNode?.children ?? [])

    if (compareClass.length < 1) {
      const labelText = siblings
        .find((el: Element) => el.tagName === 'LABEL')?.getAttribute('for')
      compareClass = labelText ?? ''
    }

    compareClass = compareClass.replace(/[^A-Z0-9]+/ig, '')

    compareClass = 'compare_' + compareClass

    element.classList.add('compare-diff')
    element.classList.add(compareClass)
  }
}
