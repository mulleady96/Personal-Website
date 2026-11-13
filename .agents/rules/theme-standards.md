---
trigger: always_on
description: Angular Material Sass and M3 theme variable standards for light and dark mode
---

# Theme Standards

When styling components in SCSS, ALWAYS adhere to the following Angular Material theme standards because this repository supports both Light Mode and Dark Mode (`.dark-theme`):

1. **Always Use Angular Material Sass/Theme Variables**: Use Angular Material M3 Sass APIs (`@use "@angular/material" as mat;` with `$light-theme` / `$dark-theme` from `src/app/styles/m3-theme.scss`) and Material M3 theme tokens (`var(--mat-sys-on-surface)`, `var(--mat-sys-on-surface-variant)`, `var(--mat-sys-surface)`, `var(--mat-sys-surface-container)`, `var(--mat-sys-outline-variant)`, `var(--mat-sys-primary)`, `var(--mat-app-text-color)`).
2. **Never Hardcode Font or Surface Colors**: Never set hardcoded colors such as `color: black`, `color: white`, `#000`, `#fff`, `#9ba1a6`, or raw `rgba(...)` for text, backgrounds, or borders. Setting font color to black or any static value breaks automatic light/dark mode adjustment.
3. **Let the Theme Control Contrast**: Rely on Angular Material's theme tokens so components, cards, and overlay dialogs automatically adjust text and surface contrast in both light and dark modes.
