# Context for `editor/editor.script.js`

This file contains all the JavaScript logic for the coordinate editor tool. It handles image uploading, user input, drawing on the SVG canvas, and generating the final coordinate strings.

## Key Logic Areas

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
