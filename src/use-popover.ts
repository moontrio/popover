import { computed, readonly, ref } from 'vue'
import { autoUpdate } from '@floating-ui/dom'

import { useFloating } from '@floating-ui/vue'

enum PopoverState {
  Open,
  Closed,
}

export function usePopover() {
  const referenceRef = ref<HTMLElement>()
  const floatingRef = ref<HTMLElement>()

  const { floatingStyles } = useFloating(referenceRef, floatingRef, {
    whileElementsMounted: autoUpdate,
  })

  const popoverState = ref<PopoverState>(PopoverState.Closed)

  const open = readonly(computed(() => popoverState.value === PopoverState.Open))

  function toggle() {
    popoverState.value
      = popoverState.value === PopoverState.Open
        ? PopoverState.Closed
        : PopoverState.Open
  }

  function onOpen() {
    popoverState.value = PopoverState.Open
  }

  function onClose() {
    popoverState.value = PopoverState.Closed
  }

  return {
    referenceRef,
    floatingRef,
    floatingStyles,
    open,
    toggle,
    onOpen,
    onClose,
  }
}

export type UsePopoverReturn = ReturnType<typeof usePopover>
