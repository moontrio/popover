import type { InjectionKey } from 'vue'
import { defineComponent, h, inject, provide } from 'vue'
import type { UsePopoverReturn } from './use-popover'
import { usePopover } from './use-popover'

type PopoverContext = UsePopoverReturn

const PopoverInjectionKey = Symbol('PopoverInjectionKey') as InjectionKey<PopoverContext>

function usePopoverContext(component: string) {
  const context = inject(PopoverInjectionKey)

  if (!context)
    throw new Error(`<${component} /> must be wrapped in <Popover />`)

  return context
}

export const Popover = defineComponent({
  name: 'Popover',
  props: {},
  setup(_, { slots }) {
    const api = usePopover()

    provide(PopoverInjectionKey, api)

    return () => slots.default?.({
      open: api.open,
      onClose: api.onClose,
    })
  },
})

export const PopoverReference = defineComponent({
  name: 'PopoverReference',
  props: {},
  setup(_, { slots }) {
    const api = usePopoverContext('PopoverReference')

    return () => {
      return h(
        'span',
        {
          ref: api.referenceRef,
          onClick: api.toggle,
        },
        slots.default?.({
          open: api.open,
        }),
      )
    }
  },
})

export const PopoverContent = defineComponent({
  name: 'PopoverContent',
  props: {},
  setup(_, { slots }) {
    const api = usePopoverContext('PopoverContent')

    return () => {
      if (!api.open.value)
        return null

      return h(
        'div',
        {
          ref: api.floatingRef,
          style: api.floatingStyles.value,
        },
        slots.default?.({
          open: api.open,
          onClose: api.onClose,
        }),
      )
    }
  },
})
