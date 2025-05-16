# Migration Guide

This document outlines the steps to update the Qurʾān-reader UI.

## Steps

1.  Install new dependencies:
    ```bash
    npm i @fontsource/amiri-quran canvas-confetti @types/canvas-confetti
    ```

2.  Rebuild Tailwind CSS for the new theme classes:
    ```bash
    npm run build:css
    # or
    npx tailwindcss -i ./styles/global.css -o ./public/build/tailwind.css
    ```

3.  Import the font and theme in your global CSS or layout file:
    ```javascript
    // In app/layout.js (or equivalent)
    import '@fontsource/amiri-quran';
    import '../styles/themes.css';
    ```

4.  **(Placeholder for Tailwind purge command)** 