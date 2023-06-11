import type { InjectionKey, PropType } from 'vue'
import { defineComponent, h, inject, provide, toRefs } from 'vue'
import type { Placement, Strategy } from '@floating-ui/dom'
import type { Trigger, UsePopoverReturn } from './use-popover'
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
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom',
    },
    strategy: {
      type: String as PropType<Strategy>,
      default: 'absolute',
    },
    offset: {
      type: Number,
      default: 0,
    },
    trigger: {
      type: String as PropType<Trigger>,
      default: 'hover',
    },
  },
  setup(props, { slots }) {
    const { placement, strategy, offset, trigger } = toRefs(props)
    const api = usePopover({ placement, strategy, offset, trigger })

    provide(PopoverInjectionKey, api)

    return () => slots.default?.({
      open: api.open,
      doClose: api.doClose,
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
          ...api.interactions.value.reference,
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
          ...api.interactions.value.floating,
        },
        slots.default?.({
          open: api.open,
          doClose: api.doClose,
        }),
      )
    }
  },
})
