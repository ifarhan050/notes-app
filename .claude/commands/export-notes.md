---
description: Add export functionality to the Notes App. Supports JSON, Markdown, and plain text formats with a download button in the toolbar.
---

Add an export feature to the Notes App at `index.html`.

## What to build

Add an "Export" dropdown button to the `.toolbar` div (next to the search input) with three options:
- **JSON** — downloads `notes.json`, the raw array from localStorage
- **Markdown** — downloads `notes.md`, each note formatted as `## Title\n\nbody\n\n---`
- **Plain Text** — downloads `notes.txt`, each note as `TITLE\n\nbody\n\n---`

## Implementation notes

Use the `<a download>` trick to trigger downloads without a server:
```js
function downloadFile(filename, content, mimeType) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], { type: mimeType }));
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}
```

The dropdown should be a `<select>` or a simple `<details>`/`<summary>` element — no JS framework menus.

## Process

1. Read `index.html` first.
2. Add the export UI to the toolbar HTML.
3. Add `downloadFile()` and three format functions (`exportJSON`, `exportMarkdown`, `exportText`) to the script block.
4. Test mentally: empty notes list should export an empty structure gracefully, not crash.
5. Style the export button consistently with `.btn` and `.btn-primary` classes.
