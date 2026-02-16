# React Exercise: Optimising Re-renders in a Minefield Grid

## Overview

You need to build a React UI that displays a large grid of cards representing a minefield.

Each card can either be a **mine** or **clear**.

The main goal of this exercise is **not just correctness**, but **performance optimisation** — specifically ensuring that when one card updates, the rest of the cards do not unnecessarily re-render.

---

## Requirements

### 1. Grid

- Render **1000 cards** in a grid layout
- Each card has:
  - `id` (unique identifier)
  - `type` (`"mine"` or `"clear"`)

---

### 2. Card Behaviour

Each card should display:

If type is `"clear"`:

This field is okay

If type is `"mine"`:

This is a mine field
[Clear Button]

---

### 3. Interaction

When the **Clear button** is clicked:

- Only that specific card’s type should change from `"mine"` → `"clear"`
- The UI should update accordingly

---

## Performance Requirement (Important)

The key requirement is:

> When one card changes, **ONLY that card should re-render**

The other **999 cards must NOT re-render**

---

## Constraints

- Use **React Functional Components**
- Use **React Hooks**
- Optimise rendering performance
- The solution should scale efficiently

---

## What is Being Evaluated

This exercise evaluates your understanding of:

- React rendering model
- Component re-rendering
- Memoisation
- Referential equality
- List rendering performance

You may use techniques such as:

- `React.memo`
- `useCallback`
- Proper state updates

---

## Testing Your Solution

You may add a log inside the card component:

```js
console.log("Rendered:", id);
```

## Expected behaviour:

Clicking one card logs only that card

Other cards should not log

Expected Result Summary
Action Expected Re-renders
Initial render 1000
Click one card 1
Click another card 1
Goal

Build a performant React grid where updates are efficient and limited to only the affected component.

If you want, I can also generate a **perfect interview starter template version (with intentional performance bug)** — which is exactly how companies like Meta and xAI ask this.
