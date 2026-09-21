# Theme Standards

When styling components, ALWAYS adhere to the following Angular and CSS theme standards:

1. **Avoid Hardcoded Colors**: Do not use hardcoded colors (e.g., `color: white;`, `background: black;`, `#FFFFFF`, `rgba(0,0,0,0.5)`) for text, backgrounds, or borders.
2. **Let the Theme Decide**: Rely on the application's underlying theme (such as Angular Material's light/dark themes) to determine the correct text and background colors naturally. 
3. **Use Theme Variables**: If you must specify a color, always use the application's established CSS variables or SCSS theme variables rather than raw color values. 
4. **Contrast and Accessibility**: By letting the theme control the colors, it ensures that elements will have the correct contrast and visibility in both light and dark modes automatically.
