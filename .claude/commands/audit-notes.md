---
description: Run a full QA + security + accessibility audit on the Notes App and get a prioritized findings report.
---

Delegate to the `notes-qa` agent to audit the Notes App.

Read `index.html` in full, then produce a findings report with three clearly labelled sections:

## 1. Bugs & Edge Cases
Test these scenarios mentally:
- Empty title with non-empty body (and vice versa)
- Editing a note then immediately deleting it
- Search with special characters (`<`, `"`, `&`, emoji)
- Very long titles or bodies
- localStorage filled to capacity

## 2. Security
- Is every user-supplied string run through `escHtml()` before `innerHTML` assignment?
- Is loaded localStorage data validated before use?
- Any `eval`, unsafe `innerHTML`, or `javascript:` patterns?

## 3. Accessibility
- All interactive elements keyboard-reachable?
- Button labels meaningful out of context?
- WCAG AA color contrast met?
- Dynamic content announced via `aria-live`?

## Output format

For each finding:
```
[HIGH|MEDIUM|LOW] Title
Location: function/element
Issue: one sentence
Fix: one sentence
```

Report only — do not implement fixes.
