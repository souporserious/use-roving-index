import { renderHook, act } from '@testing-library/react-hooks'
import { useRovingIndex } from './index'

test('index stays contained', () => {
  const maxIndex = 3
  const { result } = renderHook(() => useRovingIndex({ maxIndex }))

  act(() => {
    result.current.setActiveIndex(5)
  })

  expect(result.current.activeIndex).toBe(maxIndex)

  act(() => {
    result.current.setActiveIndex(-5)
  })

  expect(result.current.activeIndex).toBe(0)
})

test('index wraps properly', () => {
  const { result } = renderHook(() =>
    useRovingIndex({
      maxIndex: 5,
      wrap: true,
    })
  )

  act(() => {
    result.current.moveActiveIndex(-3)
  })

  expect(result.current.activeIndex).toBe(2)
})

test('disables moving backwards', () => {
  const { result } = renderHook(() => useRovingIndex({ maxIndex: 3 }))

  expect(result.current.moveBackwardDisabled).toBe(true)

  act(() => {
    result.current.moveActiveIndex(1)
  })

  expect(result.current.moveBackwardDisabled).toBe(false)
})

test('disables moving forwards', () => {
  const { result } = renderHook(() => useRovingIndex({ maxIndex: 3 }))

  expect(result.current.moveForwardDisabled).toBe(false)

  act(() => {
    result.current.setActiveIndex(3)
  })

  expect(result.current.moveForwardDisabled).toBe(true)
})
