import type { Ref } from 'vue'
import { computed, readonly, ref, unref } from 'vue'
import type { Middleware, Placement, Strategy } from '@floating-ui/dom'
import { autoUpdate, flip, offset } from '@floating-ui/dom'

import { useFloating } from '@floating-ui/vue'

enum PopoverState {
  Open,
  Closed,
}

interface UsePopoverProps {
  placement?: Ref<Placement>
  strategy?: Ref<Strategy>
  offset?: Ref<number>
}

export function usePopover({
  placement,
  strategy,
  offset: offsetRef,
}: UsePopoverProps) {
  const referenceRef = ref<HTMLElement>()
  const floatingRef = ref<HTMLElement>()

  const { floatingStyles } = useFloating(referenceRef, floatingRef, {
    placement,
    strategy,
    middleware: computed<Middleware[]>(() => {
      return [
        offset(unref(offsetRef)),
        flip(),
      ]
    }),
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
