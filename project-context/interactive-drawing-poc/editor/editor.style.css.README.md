# Context for `editor/editor.style.css`

This file provides the styling for the coordinate editor page.

## Purpose

This stylesheet is responsible for the layout and visual appearance of the editor, including the controls, the drawing area, and the output display. It uses CSS Grid for the main layout and provides visual feedback for the drawing process.

## Key Styling Sections

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
