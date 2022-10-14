import { renderHook, act } from '@testing-library/react'
import { useRovingIndex } from './dist'

test('index contains by default', () => {
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

test('index overflows properly', () => {
  const { result } = renderHook(() => useRovingIndex({ type: 'none' }))

  act(() => {
    result.current.moveActiveIndex(-3)
  })

  expect(result.current.activeIndex).toBe(-3)
})

test('index wraps properly', () => {
  const { result } = renderHook(() =>
    useRovingIndex({ maxIndex: 5, type: 'wrap' })
  )

  act(() => {
    result.current.moveActiveIndex(-3)
  })

  expect(result.current.activeIndex).toBe(5)
})

test('index moves forward', () => {
  const { result } = renderHook(() => useRovingIndex({ maxIndex: 5 }))

  act(() => {
    result.current.moveForward()
  })

  expect(result.current.activeIndex).toBe(1)
})

test('index moves backward', () => {
  const { result } = renderHook(() =>
    useRovingIndex({ maxIndex: 5, type: 'wrap' })
  )

  act(() => {
    result.current.moveBackward()
  })

  expect(result.current.activeIndex).toBe(5)
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
