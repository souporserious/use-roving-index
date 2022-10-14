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
  defaultIndex = 0,
  maxIndex = Infinity,
  type = 'contain',
}: {
  /** The default index used when first mounting. */
  defaultIndex?: number

  /** Whether or not to contain the index. */
  contain?: boolean

  /** The max index used to know when to contain or wrap. */
  maxIndex?: number

  /** How to handle navigation when exceeding minimum and maximum indexes. */
  type?: 'contain' | 'wrap' | 'none'
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
    (incomingIndex) => {
      const exceedsMax = incomingIndex > maxIndex
      const exceedsMin = incomingIndex < 0

      switch (type) {
        case 'contain':
          return exceedsMax ? maxIndex : exceedsMin ? 0 : incomingIndex
        case 'wrap':
          return exceedsMax ? 0 : exceedsMin ? maxIndex : incomingIndex
        default:
          return incomingIndex
      }
    },
    [maxIndex, type]
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
