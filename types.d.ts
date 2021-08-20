declare module 'use-roving-index' {
  export function useRovingIndex(options: {
    maxIndex: number
    defaultIndex?: number
    wrap?: boolean
  }): {
    activeIndex: number
    moveActiveIndex: (amountToMove: number) => void
    setActiveIndex: (nextIndex: number) => void
    moveBackwardDisabled: boolean
    moveForwardDisabled: boolean
  }
}
