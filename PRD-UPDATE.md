# Qurʾān-reader UI Update: PRD

## New UX Touches

- **Elegant Themes**
  - Implemented consistent light/dark themes based on the DUSON color palette
  - Added glass morphism effects for a modern, tranquil aesthetic
  - Soft color transitions between UI states for a calm reading experience

- **Enhanced Navigation**
  - Reading progress indicator with percentage at the top of the screen
  - Smooth page transitions with animation options (slide, curl, none)
  - Persistent localStorage tracking of last read position in each surah
  - Enhanced keyboard navigation for accessibility

- **Reader Experience**
  - Amiri Quran font integration for beautiful Arabic typography
  - Gentle celebration feedback (confetti) upon surah completion
  - Customizable font size with persistent user preference
  - Responsive design with accessibility improvements
  - Reduced motion support based on user preferences

- **Settings Modal**
  - Global access to font size, theme, and animation controls
  - Theme options: Light, Dark, System, Auto-sunset
  - Transition options: None, Slide, Curl (automatically disabled for users with reduced motion preference)
  - Clean, tab-focused UI for keyboard navigation

## Implemented Features

- **Theming System**
  - Created `styles/themes.css` defining CSS custom properties
  - Added `.theme-light` and `.theme-dark` utility classes
  - Migrated all hard-coded colors to Tailwind's theme-aware utilities

- **Reader Components**
  - Redesigned the reader toolbar with collapsible controls
  - Added reading progress indicator with percentage
  - Implemented smooth page transitions with prefers-reduced-motion support

- **Settings Integration**
  - Created comprehensive Settings modal with font-size, theme, and transition controls
  - Integrated with localStorage for persistent user preferences
  - Added support for OS-level reduced motion preferences

- **Animations & Effects**
  - Implemented page-slide and page-curl transition variants
  - Added gentle confetti effect on surah completion
  - All animations respect the user's motion preferences

## Acceptance Criteria

- ✅ **Builds with `npm run build` and passes all tests**
  - All components render correctly in development and production
  - Passes font-size persistence and theme switch unit tests
  - No console errors during normal operation

- ✅ **CLS < 0.1 when switching font size**
  - Font size changes applied through CSS variables to minimize layout shift
  - Fixed element dimensions where possible to prevent reflow

- ✅ **Reader remembers last surah & ayah in `localStorage`**
  - Auto-scrolls to last read position when returning to a surah
  - Persists between sessions and browser restarts

- ✅ **"Reduce motion" disables curl & confetti automatically**
  - Detects `prefers-reduced-motion` media query
  - Falls back to subtle fade transitions
  - No confetti animation when reduced motion is preferred

- ✅ **Lighthouse a11y ≥ 95**
  - ARIA attributes on all interactive elements
  - Sufficient color contrast ratios
  - Keyboard navigable interface
  - Semantic HTML structure

## Future Enhancements

- Audio recitation with synchronized highlighting
- Additional theme color options
- Dark mode detection based on sunset/sunrise for location
- Offline support with ServiceWorker
- Additional font choices for translations 