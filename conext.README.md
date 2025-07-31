# Project Context: Interactive 2D Drawing Viewer POC

This document consolidates the context for the "Interactive 2D Drawing Viewer POC" project, drawing information from various `README.md` files within the `project-context` directory.

## Overview

The project is an interactive 2D drawing viewer Proof of Concept (POC). Its primary goal is to allow users to click on specific parts of an image to highlight them and display detailed information. It consists of a main viewer application and a separate coordinate editor tool.

## Core Technologies

The project is built using standard web technologies:
-   **HTML**: For structuring the web pages.
-   **CSS**: For styling and layout.
-   **JavaScript**: For interactivity, dynamic content generation, and handling user input.
-   **SVG (Scalable Vector Graphics)**: Used as an overlay on the main image to define clickable areas and handle interactive drawing in the editor.

## Main Application (`interactive-drawing-poc/index.html`, `script.js`, `style.css`)

### `index.html`

This file provides the core HTML structure for the Interactive 2D Drawing Viewer.

**Purpose**

The purpose of this file is to lay out the essential visual elements of the application. It defines the containers for the drawing, the SVG overlay, and the details panel where information about selected parts is displayed. It also links the necessary CSS for styling and the JavaScript for interactivity.

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
    *   **`<div class="container">`:** The main flex container that holds the two primary sections of the application: the drawing and the details panel.
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
    *   **`<script src="script.js"></script>`:**
        *   This script tag, placed at the end of the `<body>`, loads and executes the JavaScript code that powers the application's interactivity.

### `script.js`

This file is the engine of the Interactive 2D Drawing Viewer. It contains all the client-side logic required to create the interactive SVG shapes, handle user clicks, and display the relevant information.

**Execution Flow**

The entire script is wrapped in a `DOMContentLoaded` event listener to ensure the HTML is loaded before the script runs. The initialization logic is now handled by the `initializeApp()` function.

**Key Sections**

1.  **Data Store (`partsData`)**
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

2.  **DOM Element References**
    *   The script gets and stores references to the main DOM elements it needs to interact with: `svgContainer`, `detailsPanel`, and `mainImage` (the `<img>` element).

3.  **Core Functions**
    *   **`initializeApp()`**: This is the new entry point for the application's logic. Its job is to ensure the coordinate system is set up correctly *before* drawing the shapes. It waits for the main image to fully load, then gets its `naturalWidth` and `naturalHeight`, displays them on the page, and dynamically sets the SVG `viewBox` attribute to match those dimensions. Only then does it proceed to call `createShape` for each part.

    *   **`createShape(part)`**: 
        *   This function's core logic is the same: it takes a `part` object, parses its `coords` string based on its `shape`, creates the corresponding SVG element, and appends it to the container.

    *   **`updateDetails(partId)`**: 
        *   This function's role is unchanged. It finds a part by its ID and updates the details panel.

    *   **`handleSvgClick(event)`**: 
        *   This function's role is unchanged. It manages the highlighting of shapes and calls `updateDetails`.

4.  **Initialization Logic**
    *   The initialization process now consists of a single call to `initializeApp()`.
    *   The `handleSvgClick` event listener is also attached to the `svgContainer`.

### `style.css`

This file contains all the CSS rules for styling the Interactive 2D Drawing Viewer. It handles the overall page layout, the critical layering of the SVG over the image, and the visual feedback for interactive elements (hover and highlight states).

**Key Styling Sections**

#### General Body and Layout

*   **`body`**: Sets up the basic page font, a light background color, and uses Flexbox (`display: flex`) to center the main content on the page.
*   **`.container`**: This is the main content block that holds both the drawing and the details panel. It uses `display: flex` to arrange its children side-by-side and `flex-wrap: wrap` to ensure responsiveness on smaller screens.

#### Drawing Container and Overlay

This is the most critical part of the CSS.

*   **`.drawing-container`**: 
    *   It is set to `position: relative`. This is the anchor for the absolute positioning of the SVG overlay.
    *   It is a flex item that takes up more space (`flex: 3`) than the details panel.
*   **`.drawing-container img`**: Ensures the image is responsive (`width: 100%`) and behaves like a block element.
*   **`.drawing-container svg`**: 
    *   This rule is essential for the core functionality. `position: absolute` lifts the SVG out of the normal document flow and places it relative to the `.drawing-container`.
    *   `top: 0` and `left: 0` align the top-left corner of the SVG with the top-left of the image.
    *   `width: 100%` and `height: 100%` stretch the SVG to perfectly cover the entire image.

#### Interactive SVG Shapes

*   **`.clickable-area`**: 
    *   This class is applied to all the interactive shapes (rectangles, polygons) within the SVG.
    *   `fill: rgba(0, 255, 0, 0.0)`: Makes the shapes transparent so the underlying image is visible.
    *   `stroke-width: 0`: Ensures there is no border by default.
    *   `cursor: pointer`: Provides visual feedback to the user that the area is clickable.
    *   `transition`: Adds a smooth animation effect when the fill or stroke changes.
*   **`.clickable-area:hover`**: 
    *   Provides immediate feedback when the user mouses over a part by applying a semi-transparent blue fill. This helps the user discover the clickable regions.
*   **`.clickable-area.highlighted`**: 
    *   This is the style for the currently selected part.
    *   It applies a semi-transparent yellow fill and a solid blue border, making the selected part stand out clearly.

#### Details Panel

*   **`.details-panel`**: 
    *   Styles the box on the right-hand side.
    *   It is a flex item (`flex: 1`) that takes up less space than the drawing.
    *   It has basic styling for background color, border, padding, and a subtle shadow to make it look like a distinct card.
*   **`.details-panel h2`**: Styles the title within the details panel.

## Coordinate Editor (`interactive-drawing-poc/editor/editor.html`, `editor.script.js`, `editor.style.css`)

### `editor/editor.html`

This file provides the HTML structure for the coordinate editor tool.

**Purpose**

The editor page is a self-contained utility for generating the `coords` strings needed for the `partsData` array in the main application. It allows a user to upload an image, draw shapes (rectangles, circles, polygons) directly on it, and get the resulting coordinates in the correct format.

**Key Components**

1.  **`<div class="navigation-buttons">`**: Contains a button (`<button>`) wrapped in an anchor tag (`<a>`) to navigate back to the main `index.html` page.
2.  **`<div class="controls">`**: This section contains the primary user inputs.
    *   **`<input type="file" id="image-loader">`**: Allows the user to select an image from their local device.
    *   **`<div id="image-dimensions">`**: A placeholder to display the loaded image's dimensions (e.g., "Dimensions: 1200px x 800px").
    *   **Shape Selector**: A group of radio buttons (`<input type="radio">`) for choosing the drawing mode (`rect`, `circle`, or `polygon`).
    *   **`<button id="finish-polygon">`**: A button that is only enabled in polygon mode to finalize the creation of a polygon.
    *   **`<button id="clear-drawing">`**: A button to clear the current shape from the SVG canvas.

2.  **`<div id="drawing-area">`**: This is the main interactive area.
    *   It contains an `<img>` tag (`#uploaded-image`) which is initially hidden. Its `src` is set by JavaScript when a user uploads a file.
    *   It also contains the `<svg id="drawing-svg">` element that serves as the drawing canvas. It is layered on top of the image.

3.  **`<div class="output-area">`**: This section displays the results.
    *   **`<textarea id="coords-output">`**: A read-only text area where the generated coordinate string is displayed.
    *   **`<button id="copy-coords">`**: A button to copy the content of the textarea to the clipboard.

4.  **`<script src="editor.script.js"></script>`**: Loads the JavaScript file that contains all the logic for the editor's functionality.

### `editor.script.js`

This file contains all the JavaScript logic for the coordinate editor tool. It handles image uploading, user input, drawing on the SVG canvas, and generating the final coordinate strings.

**Key Logic Areas**

1.  **DOM Element References**: The script starts by getting references to all the necessary HTML elements (buttons, inputs, SVG, etc.).

2.  **State Management**: Several variables track the current state of the editor:
    *   `currentShape`: Holds a reference to the SVG element currently being drawn.
    *   `drawing`: A boolean flag that is `true` when the user is actively drawing (e.g., mouse is down).
    *   `startPoint`: An object that stores the `{x, y}` coordinates of where a drawing action began.
    *   `polygonPoints`: An array that stores the sequence of `{x, y}` points for a polygon being drawn.

3.  **Image Loading**: 
    *   An event listener on the `#image-loader` input uses the `FileReader` API to read the selected image file.
    *   When the image is loaded, its data URL is set as the `src` for the `<img>` tag.
    *   Crucially, it also creates a new `Image` object in the background to get the image's `naturalWidth` and `naturalHeight`. It then uses these dimensions to set the `viewBox` of the SVG canvas and displays the dimensions on the page, ensuring a 1:1 coordinate system.

4.  **Mouse Event Handlers**: The core drawing logic is handled by `mousedown`, `mousemove`, and `mouseup` event listeners on the SVG canvas.
    *   **`mousedown`**: Sets the `drawing` flag to `true`, records the `startPoint`, and creates the initial SVG element (`<rect>` or `<circle>`).
    *   **`mousemove`**: If `drawing` is `true`, this handler continuously updates the attributes of the `currentShape`. For a rectangle, it updates `width` and `height`; for a circle, it updates the radius `r`.
    *   **`mouseup`**: Sets the `drawing` flag to `false` and calls `outputCoordinates()` to generate the final coordinate string for the completed shape.

5.  **Polygon-Specific Logic**:
    *   A `click` event listener is used for polygon drawing. Each click adds a new point to the `polygonPoints` array and redraws the polygon-in-progress.
    *   `drawPolygon()`: This function updates the `points` attribute of the polygon and also draws small circles (`.polygon-point`) at each vertex to provide visual feedback.
    *   The "Finish Polygon" button is enabled once there are at least 3 points. Clicking it calls `outputCoordinates()`.

6.  **Utility Functions**:
    *   **`getMousePosition(e)`**: A critical helper function that translates the browser's screen coordinates (e.g., `e.clientX`) into the SVG's internal coordinate system. This is what makes the drawing accurate.
    *   **`outputCoordinates(mode)`**: Based on the current drawing mode, this function reads the attributes from the `currentShape` (or the `polygonPoints` array) and formats them into the correct string required by the main application (e.g., `"x1,y1,x2,y2"` or `"cx,cy,r"`).
    *   **`clearBtn` and `copyBtn`**: Provide simple functionality for clearing the drawing and copying the output to the clipboard.

### `editor.style.css`

This file provides the styling for the coordinate editor page.

**Purpose**

This stylesheet is responsible for the layout and visual appearance of the editor, including the controls, the drawing area, and the output display. It uses CSS Grid for the main layout and provides visual feedback for the drawing process.

**Key Styling Sections**

1.  **`.editor-container`**: 
    *   Uses `display: grid` to create a three-part layout (controls, drawing area, output). 
    *   `grid-template-areas` defines the position of each of these major components.

2.  **`.controls` and `.output-area`**: 
    *   These are styled as white cards with padding, rounded corners, and a subtle box shadow to visually separate them from the background.

3.  **`.drawing-area`**: 
    *   This is a `position: relative` container, which is essential for correctly layering the SVG canvas over the uploaded image.
    *   It has a dashed border to indicate its boundary before an image is loaded.

4.  **`#drawing-svg`**: 
    *   Like in the main application, this is absolutely positioned to cover the drawing area (`position: absolute`, `top: 0`, `left: 0`, etc.).
    *   `cursor: crosshair` provides a visual cue to the user that they can draw on this surface.

5.  **Drawing Feedback Styles**: 
    *   **`.drawing-shape`**: This class is applied to the shape as it is being drawn (e.g., the expanding rectangle or circle). It has a semi-transparent fill and a dashed stroke to indicate it is a temporary shape.
    *   **`.polygon-point`**: This class styles the small circles that appear at each vertex of a polygon as it's being drawn, making it clear where the user has clicked.
