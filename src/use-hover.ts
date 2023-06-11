interface UseHoverProps {
  doOpen: () => void
  doClose: () => void
}

export function useHover({ doOpen, doClose }: UseHoverProps) {
  // timeout id for delayed close
  let closeTimeoutId: number | undefined

  // close with delay
  function close() {
    clearTimeout(closeTimeoutId)

    closeTimeoutId = setTimeout(doClose, 100)
  }

  // open immediately
  function open() {
    clearTimeout(closeTimeoutId)

    doOpen()
  }

  return {
    reference: {
      onmouseenter: open,
      onmouseleave: close,
    },
    floating: {
      onmouseenter: open,
      onmouseleave: close,
    },
  }
}
