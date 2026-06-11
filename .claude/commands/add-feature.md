---
description: Add a new feature to the Notes App. Describe what you want (e.g. "tags", "dark mode", "pin notes", "markdown preview", "export to JSON").
argument-hint: <feature description>
---

You are adding a feature to the Notes App at `index.html`. The app is a single-file vanilla HTML/CSS/JS application — no framework, no build step.

## Feature request

$ARGUMENTS

## Process

1. Read `index.html` in full to understand the current state before touching anything.
2. Use the `notes-developer` agent context: follow the existing coding conventions, data model, and render loop pattern.
3. If the feature requires a new data field on notes, add a safe default so existing localStorage data is not broken.
4. Make the minimal change that delivers the feature — no surrounding refactors.
5. After editing, confirm what was changed and describe how to test it in the browser.

## Quality checklist (verify before finishing)

- [ ] `escHtml()` is used on any new user content rendered into innerHTML
- [ ] `persist()` is called after any state mutation
- [ ] `renderNotes()` is called after any state change that affects the UI
- [ ] The feature works when the notes list is empty
- [ ] The feature does not break add / edit / delete / search
