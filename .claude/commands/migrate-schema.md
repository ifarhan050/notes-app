---
description: Write a localStorage migration function for the Notes App when the data schema has changed. Describe the old and new schema, or just describe what fields were added/removed.
argument-hint: <describe the schema change, e.g. "added tags array and pinned boolean">
---

Write a safe localStorage migration for the Notes App at `index.html`.

## Schema change requested

$ARGUMENTS

## Process

1. Read `index.html` to understand the current schema and any existing migration logic.
2. Use the `notes-data-migrator` agent conventions:
   - Write a `migrateStorage()` function that runs at startup before `renderNotes()`.
   - Add safe defaults for all new fields so existing data loads without error.
   - Wrap in try/catch — corrupt data must not crash the app.
   - Keep it idempotent (safe to run multiple times).
3. If the change is destructive or irreversible, bump the storage key (e.g. `simple-notes-v1` → `simple-notes-v2`) and copy data across.
4. Output the exact code to add and exactly where in the file to insert it.
5. State clearly what the migration does and what it cannot undo.
