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
}) {
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
