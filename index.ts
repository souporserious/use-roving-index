import { useCallback, useState } from 'react'

/**
 * Manage an active index that needs to be contained or wrap.
 *
 * @example
 *
 * const {
 *   activeIndex,
 *   moveActiveIndex,
 * } = useRovingIndex({ maxIndex: items.length - 1 })
 */
export function useRovingIndex({
  contain = true,
  defaultIndex = 0,
  maxIndex = Infinity,
  wrap = false,
}: {
  /** The default index used when first mounting. */
  defaultIndex?: number

  /** The max index used to know when to contain or wrap. */
  contain?: boolean

  /** The max index used to know when to contain or wrap. */
  maxIndex?: number

  /** Wrap index when navigating outside the first or last index. */
  wrap?: boolean
}): {
  /** The active index. */
  activeIndex: number

  /** Whether the active index can be moved backward. */
  moveBackwardDisabled: boolean

  /** Whether the active index can be moved forward. */
  moveForwardDisabled: boolean

  /** Move the index backwards. */
  moveBackward: () => void

  /** Move the index forwards. */
  moveForward: () => void

  /** Move the active index by a positive or negative amount. */
  moveActiveIndex: (amount: number) => void

  /** Set any active index. */
  setActiveIndex: (nextIndex: number) => void
} {
  const [activeIndex, setLocalActiveIndex] = useState(defaultIndex)
  const getNextIndex = useCallback(
    (nextIndex) => {
      if (wrap) {
        return ((nextIndex % maxIndex) + maxIndex) % maxIndex
      }
      if (contain) {
        return nextIndex > maxIndex ? maxIndex : nextIndex < 0 ? 0 : nextIndex
      }
      return nextIndex
    },
    [maxIndex, wrap]
  )
  const moveActiveIndex = useCallback(
    (amountToMove) => {
      setLocalActiveIndex((currentIndex) =>
        getNextIndex(currentIndex + amountToMove)
      )
    },
    [getNextIndex]
  )
  const setActiveIndex = useCallback(
    (nextIndex) => {
      setLocalActiveIndex(getNextIndex(nextIndex))
    },
    [getNextIndex]
  )
  const moveBackward = useCallback(() => moveActiveIndex(-1), [moveActiveIndex])
  const moveForward = useCallback(() => moveActiveIndex(1), [moveActiveIndex])
  return {
    activeIndex,
    moveActiveIndex,
    setActiveIndex,
    moveBackward,
    moveForward,
    moveBackwardDisabled: activeIndex <= 0,
    moveForwardDisabled: activeIndex >= maxIndex,
  }
}
