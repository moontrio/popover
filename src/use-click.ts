import type { Ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

interface UseClickProps {
  referenceRef: Ref<HTMLElement | undefined>
  floatingRef: Ref<HTMLElement | undefined>
  toggle: () => void
  doClose: () => void
}

export function useClick({
  doClose,
  toggle,
  referenceRef,
  floatingRef,
}: UseClickProps) {
  onClickOutside(floatingRef, doClose, { ignore: [referenceRef] })

  return {
    reference: { onclick: toggle },
    floating: {},
  }
}
