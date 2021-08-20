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
export function useRovingIndex({ maxIndex, defaultIndex = 0, wrap = false }) {
  const [activeIndex, setLocalActiveIndex] = useState(defaultIndex)
  const getWrappedIndex = useCallback(
    (nextIndex) => {
      return wrap
        ? ((nextIndex % maxIndex) + maxIndex) % maxIndex
        : nextIndex > maxIndex
        ? maxIndex
        : nextIndex < 0
        ? 0
        : nextIndex
    },
    [maxIndex, wrap]
  )
  const moveActiveIndex = useCallback(
    (amountToMove) => {
      setLocalActiveIndex((currentIndex) =>
        getWrappedIndex(currentIndex + amountToMove)
      )
    },
    [getWrappedIndex]
  )
  const setActiveIndex = useCallback(
    (nextIndex) => {
      setLocalActiveIndex(getWrappedIndex(nextIndex))
    },
    [getWrappedIndex]
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
