# Frontend Coding Exercise — Chat UI

## Problem

Implement a minimal chat interface using React.

You are given a function:

`simulateChatAPI(message: string): Promise<string>`

This function simulates a server request and returns a dummy response string.

---

## Requirements

### 1. Sending a Message

- The user can type a message in an input box.
- Clicking “Send” (or pressing Enter) should:
  - Add the user’s message to the chat immediately.
  - Call `simulateChatAPI` with the message.

---

### 2. Receiving a Response

- When the API resolves:
  - Display the returned response as a new message in the chat.

---

### 3. Loading State

- While waiting for the response:
  - The user must NOT be able to send another message.
  - The input and send button should be disabled.
  - (Optional) Show a loading indicator or “typing…” state.

---

### 4. Layout Requirements

- The message list should grow vertically.
- The input box and send button must always stay at the bottom of the page.
- The layout should fill the full viewport height.
- If messages overflow, the message area should scroll.

---

## Constraints

- Use React functional components.
- No external state management libraries.
- No backend.
- Keep the UI minimal unless styling is explicitly required.

---

## What Interviewers Evaluate

- Proper state management
- Correct handling of async logic
- Avoiding race conditions
- Controlled input handling
- Clean component structure
- Proper layout handling (scroll + fixed bottom input)
