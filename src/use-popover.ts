import type { Ref } from 'vue'
import { computed, readonly, ref, unref } from 'vue'
import type { Middleware, Placement, Strategy } from '@floating-ui/dom'
import { autoUpdate, flip, offset } from '@floating-ui/dom'
import { useFloating } from '@floating-ui/vue'

import { useHover } from './use-hover'
import { useClick } from './use-click'

enum PopoverState {
  Open,
  Closed,
}

export type Trigger = 'click' | 'hover'

interface UsePopoverProps {
  placement?: Ref<Placement>
  strategy?: Ref<Strategy>
  offset?: Ref<number>
  trigger?: Ref<Trigger>
}

export function usePopover({
  placement,
  strategy,
  offset: offsetRef,
  trigger,
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

  function doOpen() {
    popoverState.value = PopoverState.Open
  }

  function doClose() {
    popoverState.value = PopoverState.Closed
  }

  const interactions = computed(() => {
    if (unref(trigger) === 'hover')
      return useHover({ doOpen, doClose })

    return useClick({
      referenceRef,
      floatingRef,
      toggle,
      doClose,
    })
  })

  return {
    referenceRef,
    floatingRef,
    floatingStyles,
    open,
    toggle,
    doOpen,
    doClose,
    interactions,
  }
}

export type UsePopoverReturn = ReturnType<typeof usePopover>
