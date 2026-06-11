---
description: Add a tagging system to the Notes App — create tags while composing, filter notes by tag, and display colored tag chips on each card.
---

Add a tags feature to the Notes App at `index.html`.

## Data model change

Extend each note with `tags: string[]` (default `[]`). Existing notes must not break — add `note.tags = note.tags ?? []` in the load/migrate path.

## UI changes

### Compose area
Add a tags input below the body textarea:
```html
<input id="tagsInput" type="text" placeholder="Tags (comma-separated, e.g. work, ideas)" />
```
Parse on save: `tagsInput.value.split(',').map(t => t.trim().toLowerCase()).filter(Boolean)`

### Note card
Render tags as small chips above the date:
```html
<div class="note-tags">
  ${note.tags.map(t => `<span class="tag">${escHtml(t)}</span>`).join('')}
</div>
```

### Filter bar
Add a tag filter dropdown or inline tag pills below the toolbar. Clicking a tag filters the notes list to only notes containing that tag. Clicking again clears the filter.

## Suggested styles

```css
.note-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; }
.tag {
  background: #eef2ff; color: #4338ca;
  border-radius: 999px; padding: 0.1rem 0.55rem;
  font-size: 0.72rem; font-weight: 600; cursor: pointer;
}
.tag:hover { background: #e0e7ff; }
.tag.active { background: #6366f1; color: #fff; }
```

## Process

1. Read `index.html` first.
2. Update the data model with a safe default.
3. Add the tags input to the compose section and parse it in `saveNote()`.
4. Clear the tags input when the compose form is cleared.
5. Update `renderNotes()` to display tag chips and apply any active tag filter.
6. Add tag filter UI to the toolbar area.
7. Clicking a tag chip on a card should set that tag as the active filter.
