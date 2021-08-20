# ⌨️ use-roving-index

Easily manage an active index that needs to be contained or wrap.

## Install

```bash
yarn add use-roving-index
```

```bash
npm install use-roving-index
```

## Usage

```jsx
import React from 'react'
import { useRovingIndex } from 'use-roving-index'

const items = ['Item 1', 'Item 2', 'Item 3']

function App() {
  const {
    activeIndex,
    moveActiveIndex,
    moveBackward,
    moveBackwardDisabled,
    moveForward,
    moveForwardDisabled,
  } = useRovingIndex({ maxIndex: items.length - 1 })
  return (
    <>
      <ul
        tabIndex={0}
        onKeyDown={(event) => {
          const multiplier = event.shiftKey ? 3 : 1
          switch (event.key) {
            case 'ArrowUp':
            case 'ArrowLeft':
              moveActiveIndex(-1 * multiplier)
              break
            case 'ArrowDown':
            case 'ArrowRight':
              moveActiveIndex(1 * multiplier)
              break
          }
        }}
      >
        {items.map((title, index) => (
          <li
            key={title}
            style={{ backgroundColor: index === activeIndex && 'pink' }}
          >
            {title}
          </li>
        ))}
      </ul>
      <button disabled={moveBackwardDisabled} onClick={moveBackward}>
        Previous
      </button>
      <button disabled={moveForwardDisabled} onClick={moveForward}>
        Next
      </button>
    </>
  )
}
```
