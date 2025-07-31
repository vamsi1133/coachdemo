# Context for `script.js`

This file is the engine of the Interactive 2D Drawing Viewer. It contains all the client-side logic required to create the interactive SVG shapes, handle user clicks, and display the relevant information.

## Execution Flow

The entire script is wrapped in a `DOMContentLoaded` event listener to ensure the HTML is loaded before the script runs. The initialization logic is now handled by the `initializeApp()` function.

## Key Sections

### 1. Data Store (`partsData`)

*   **Purpose**: This is the single source of truth for all the interactive parts on the drawing. The coordinates in this section are the *base* coordinates.
*   **Structure**: An array of JavaScript objects, where each object represents one clickable part.
    *   `id`: A unique string to identify the part.
    *   `name`: The human-readable name of the part.
    *   `description`: A text description for the part.
    *   `shape`: A string (`'rect'`, `'polygon'`, `'circle'`) that determines how to interpret the `coords` string.
    *   `coords`: A string containing the geometric data. The format depends on the `shape`:
        *   For `shape: 'rect'`, the format is `"x1,y1,x2,y2"` (top-left and bottom-right corners).
        *   For `shape: 'circle'`, the format is `"cx,cy,r"` (center coordinates and radius).
        *   For `shape: 'polygon'`, the format is `"x1,y1 x2,y2 x3,y3..."` (a space-separated list of points).

### 2. DOM Element References

*   The script gets and stores references to the main DOM elements it needs to interact with: `svgContainer`, `detailsPanel`, and `mainImage` (the `<img>` element).

### 3. Core Functions

*   **`initializeApp()`**: This is the new entry point for the application's logic. Its job is to ensure the coordinate system is set up correctly *before* drawing the shapes. It waits for the main image to fully load, then gets its `naturalWidth` and `naturalHeight`, displays them on the page, and dynamically sets the SVG `viewBox` attribute to match those dimensions. Only then does it proceed to call `createShape` for each part.

*   **`createShape(part)`**: 
    *   This function's core logic is the same: it takes a `part` object, parses its `coords` string based on its `shape`, creates the corresponding SVG element, and appends it to the container.

*   **`updateDetails(partId)`**: 
    *   This function's role is unchanged. It finds a part by its ID and updates the details panel.

*   **`handleSvgClick(event)`**: 
    *   This function's role is unchanged. It manages the highlighting of shapes and calls `updateDetails`.

### 4. Initialization Logic

*   The initialization process now consists of a single call to `initializeApp()`.
*   The `handleSvgClick` event listener is also attached to the `svgContainer`.