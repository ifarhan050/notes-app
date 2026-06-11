---
description: Add a dark/light mode toggle to the Notes App, with preference saved to localStorage and automatic system preference detection.
---

Add dark mode to the Notes App at `index.html`.

## Design tokens to introduce

Convert the existing hard-coded colors to CSS custom properties on `:root` and override them under `[data-theme="dark"]`:

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#f0f2f5` | `#0f0f17` |
| `--card` | `#ffffff` | `#1c1c2e` |
| `--text` | `#1a1a2e` | `#e2e8f0` |
| `--text-muted` | `#6b7280` | `#94a3b8` |
| `--border` | `#e5e7eb` | `#2d2d44` |
| `--input-bg` | `#ffffff` | `#16162a` |
| `--shadow` | `rgba(0,0,0,0.08)` | `rgba(0,0,0,0.4)` |

## Toggle button

Add a small toggle button (moon/sun icon using HTML entities `☀` / `☽`) in the top-right of `<header>`. On click:
```js
function toggleTheme() {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('notes-theme', next);
}
```

## On page load

Detect saved preference first, then fall back to `prefers-color-scheme`:
```js
const saved = localStorage.getItem('notes-theme');
const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
document.documentElement.dataset.theme = saved ?? preferred;
```

## Process

1. Read `index.html` first.
2. Replace all hard-coded color values in `<style>` with the CSS custom properties above.
3. Add the `[data-theme="dark"]` overrides.
4. Add the toggle button HTML to the header.
5. Add the `toggleTheme()` function and page-load initialization to `<script>`.
6. Verify the note-card `border-left` accent color (`#6366f1`) still reads well in dark mode — if not, lighten it slightly to `#818cf8` under dark theme.
