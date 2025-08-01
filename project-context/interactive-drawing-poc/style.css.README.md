### `style.css`

This file contains all the CSS rules for styling the Interactive 2D Drawing Viewer. It handles the overall page layout, the critical layering of the SVG over the image, and the visual feedback for interactive elements (hover and highlight states).

**Key Styling Sections**

#### General Body and Layout

*   **`body`**: Sets up the basic page font, a light background color, and uses Flexbox (`display: flex`) to center the main content on the page.
*   **`.container`**: This is the main content block that holds the drawing container and the details panel. It uses `display: flex` and `flex-direction: column` to stack the items vertically.

#### Drawing Container and Overlay

This is the most critical part of the CSS.

*   **`.drawing-container`**: 
    *   It is set to `position: relative`. This is the anchor for the absolute positioning of the SVG overlay.
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
    *   Styles the box that displays the details of the selected part.
    *   It has basic styling for background color, border, padding, and a subtle shadow to make it look like a distinct card.
*   **`.details-panel h2`**: Styles the title within the details panel.

#### Jobs Container

*   **`.jobs-container`**: 
    *   Styles the container for the jobs list table.
*   **`#jobs-table`**: 
    *   Styles the jobs list table.