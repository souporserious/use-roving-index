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
 *
 * @param {{
 *   maxIndex: number,
 *   defaultIndex?: number,
 *   wrap?: boolean
 * }} [options]
 * @returns {{
 *   activeIndex: number,
 *   moveActiveIndex: (amountToMove: number) => void,
 *   setActiveIndex: (nextIndex: number) => void,
 *   moveBackwardDisabled: boolean,
 *   moveForwardDisabled: boolean,
 * }}
 */
export function useRovingIndex({ maxIndex, defaultIndex = 0, wrap = false }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)
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
  return {
    activeIndex,
    moveActiveIndex: useCallback(
      (amountToMove) => {
        setActiveIndex((currentIndex) =>
          getWrappedIndex(currentIndex + amountToMove)
        )
      },
      [getWrappedIndex]
    ),
    setActiveIndex: useCallback(
      (nextIndex) => {
        setActiveIndex(getWrappedIndex(nextIndex))
      },
      [getWrappedIndex]
    ),
    moveBackwardDisabled: activeIndex <= 0,
    moveForwardDisabled: activeIndex >= maxIndex,
  }
}
