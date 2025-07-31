# Interactive 2D Drawing Viewer - Proof of Concept (POC)

This project is a proof-of-concept demonstrating how to create an interactive 2D drawing viewer using standard web technologies. Users can click on specific parts of a static image to see them highlighted and view details about that part.

This POC was developed by the Gemini CLI assistant.

## Project Goal

The primary goal is to provide a simple and effective way to overlay interactive elements on a static image (like a technical drawing or a map) directly in the browser, without requiring external libraries or frameworks.

## Technology Stack

*   **HTML:** For the basic structure of the web page.
*   **CSS:** For styling the layout, image, SVG overlays, and highlight effects.
*   **JavaScript (Vanilla):** For handling user interactions, managing part data, and dynamically updating the page.

## How It Works

The core of this application is an SVG element layered directly on top of a standard `<img>` element. 

1.  The `<img>` displays the base 2D drawing.
2.  The `<svg>` contains transparent, clickable shapes (rectangles, polygons, etc.) that are precisely positioned over the components of the drawing image.
3.  JavaScript listens for clicks on these SVG shapes.
4.  When a shape is clicked, its appearance is changed via a CSS class to "highlight" it, and its corresponding details (stored in a JavaScript array) is displayed in a panel.

## Project Structure

```
/interactive-drawing-poc
├── README.md          # This file - project context and documentation
├── index.html         # The main page structure
├── style.css          # For all styling
├── script.js          # For all interactivity
└── images/
    └── coach.jpeg     # The base drawing image
```

## How to Run the POC

1.  Clone or download the files to your local machine.
2.  Open the `index.html` file in any modern web browser.
3.  To access the Coordinate Editor, click the "Go to Editor" button on the main page, or directly open `editor/editor.html`.

## Navigation

*   **Main Page to Editor**: Click the "Go to Editor" button on the main `index.html` page.
*   **Editor to Main Page**: Click the "Go to Main Page" button on the `editor/editor.html` page.

## How to Customize and Add New Parts

All the interactive parts are defined and managed in the `script.js` file.

1.  **Open `script.js`**.
2.  **Locate the `partsData` array** at the top of the file.
3.  **To add a new part**, add a new object to the array with the following properties:
    *   `id`: A unique identifier for the part (e.g., 'part-wheel-1').
    *   `name`: The display name of the part (e.g., "Front Wheel Assembly").
    *   `description`: A short description of the part.
    *   `shape`: The type of SVG shape. Currently supports `'rect'` and `'polygon'`.
    *   `coords` (for `rect`): An object with `x`, `y`, `width`, and `height`.
    *   `points` (for `polygon`): A string of x,y coordinate pairs (e.g., "10,20 30,40 50,60").

### Finding Coordinates

*   **For simple rectangles:** You can use any image editor (like GIMP, Photoshop, or even MS Paint) to find the top-left (x, y) coordinates and the width/height of the area you want to make clickable.
*   **For complex shapes (polygons):** The best method is to use a free vector graphics editor like **Inkscape** or an online tool like [SVG Path Editor](https://yqnn.github.io/svg-path-editor/). You can import the `coach.jpeg` image, draw a shape over the desired part, and then copy the resulting SVG `points` data.
