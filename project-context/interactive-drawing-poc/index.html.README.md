### `index.html`

This file provides the core HTML structure for the Interactive 2D Drawing Viewer.

**Purpose**

The purpose of this file is to lay out the essential visual elements of the application. It defines the containers for the drawing, the SVG overlay, the details panel, and the jobs list. It also links the necessary CSS for styling and the JavaScript for interactivity.

**Key Components**

1.  **`<!DOCTYPE html>` and `<head>`:**
    *   Standard HTML5 boilerplate.
    *   Sets the character set to `UTF-8` and configures the viewport for responsive behavior.
    *   The `<title>` is set to "Interactive Drawing POC".
    *   Crucially, it links to the `style.css` stylesheet using `<link rel="stylesheet" href="style.css">`.

2.  **`<body>`:**
    *   **`<h1>`:** A main heading for the page.
    *   **`<div class="navigation-buttons">`**: Contains a button (`<button>`) wrapped in an anchor tag (`<a>`) to navigate to the `editor.html` page.
    *   **`<div id="image-dimensions-main">`**: A placeholder element where `script.js` will display the dimensions of the loaded drawing.
    *   **`<div class="container">`:** The main container that holds the drawing container and the details panel.
    *   **`<div class="drawing-container">`:**
        *   This is a relatively positioned container, which is essential for correctly layering the SVG on top of the image.
        *   **`<img id="main-drawing-image" ...>`:** The base image for the 2D drawing. It now has an `id` so that `script.js` can access it to read its dimensions.
        *   **`<svg id="drawing-svg" ...>`:** This is the most critical element for interactivity.
            *   It is layered directly on top of the image.
            *   **Important:** It no longer has a hardcoded `viewBox` attribute. The `viewBox` is now set dynamically by `script.js` to match the exact dimensions of the loaded image. This ensures that the coordinate system is always consistent.
            *   Initially, it is empty. The clickable shapes are generated and injected into this SVG by `script.js`.
    *   **`<div id="details-panel" ...>`:**
        *   This `div` acts as a placeholder for displaying information about the currently selected part.
        *   Its content is dynamically updated by `script.js`.
    *   **`<div id="jobs-container" ...>`:**
        *   This `div` contains a table that displays the list of jobs added by the user.
    *   **`<script src="script.js"></script>`:**
        *   This script tag, placed at the end of the `<body>`, loads and executes the JavaScript code that powers the application's interactivity.