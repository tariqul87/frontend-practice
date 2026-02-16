# Frontend Exercise — Optimized Student Table

## Problem

You are building an admin dashboard that displays a large list of students.

You are given an array of **1,000+ students** with the following shape:

```ts
type Student = {
  id: string;
  name: string;
  age: number;
  grade: number; // 0–100
  className: string; // e.g. "Physics", "Math"
};
```

You must implement a student table with:

1. Search by name
2. Filter by class
3. Sort by grade (ascending / descending toggle)
4. Display class-level average grade summary

---

## Requirements

### 1️⃣ Search

- Input field filters students by `name`
- Filtering must be case-insensitive
- Results update immediately as the user types

### 2️⃣ Class Filter

- Dropdown containing all available classes
- Selecting a class filters students accordingly
- “All” option should reset the filter

### 3️⃣ Sorting

- Clicking the “Grade” column header toggles:
  - Ascending
  - Descending
- Sorting must apply to the currently filtered students

### 4️⃣ Summary Panel

Above the table, display:

- Total number of students currently visible
- Average grade of currently visible students (rounded to 2 decimal places)

---

## Performance Constraint

Assume:

- There are 1,000+ students
- Filtering, sorting, and averaging are non-trivial operations
- There is an unrelated input field on the page (e.g., “Admin Notes” textarea)

Typing into the “Admin Notes” field must NOT cause:

- Filtering logic to re-run
- Sorting logic to re-run
- Average grade calculation to re-run

---

## Goal

Use `useMemo` appropriately to memoize:

- Filtered students
- Sorted students
- Average grade calculation

Each memoized computation should:

- Recompute only when its relevant dependencies change
- Avoid unnecessary recalculation on unrelated state updates

---

## What Interviewers Evaluate

- Correct usage of `useMemo`
- Proper dependency array management
- Separation of concerns (filter → sort → aggregate)
- Understanding of performance trade-offs
- Avoiding premature optimization

---

## Bonus Challenge (Optional)

If time allows, extend the implementation to include:

- A “Top 10 Students” panel (based on grade)
- Group students by class with average grade per class
