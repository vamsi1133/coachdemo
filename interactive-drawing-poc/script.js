document.addEventListener('DOMContentLoaded', () => {
    // --- Data Store ---
    const partsData = [
        {
            id: 'part-window-1',
            name: 'Passenger Window 1',
            description: 'Standard passenger viewing window, double-paned for insulation.',
            shape: 'rect',
            coords: '200,110,249,138'
        },
        {
            id: 'part-window-2',
            name: 'Passenger Window 2',
            description: 'Standard passenger viewing window, double-paned for insulation.',
            shape: 'rect',
            coords: '260,111,308,139'
        },
        {
            id: 'part-window-3',
            name: 'Passenger Window 3',
            description: 'Standard passenger viewing window, double-paned for insulation.',
            shape: 'rect',
            coords: '320,109,371,140'
        },
        {
            id: 'part-window-4',
            name: 'Passenger Window 4',
            description: 'Standard passenger viewing window, double-paned for insulation.',
            shape: 'rect',
            coords: '380,110,430,138'
        },
        {
            id: 'wheel-1',
            name: 'Front Wheel',
            description: 'The front wheel of the train coach, essential for movement.',
            shape: 'circle',
            coords: '289,203,16'
        },
    ];

    const svgNS = "http://www.w3.org/2000/svg";
    const svgContainer = document.getElementById('drawing-svg');
    const detailsPanel = document.getElementById('details-panel');
    const mainImage = document.getElementById('main-drawing-image');

    /**
     * Sets the SVG viewBox to match the image dimensions and then populates the shapes.
     */
    function initializeApp() {
        const setViewBoxAndCreateShapes = () => {
            const naturalWidth = mainImage.naturalWidth;
            const naturalHeight = mainImage.naturalHeight;

            // Set the viewBox to the natural dimensions for consistent coordinate system
            svgContainer.setAttribute('viewBox', `0 0 ${naturalWidth} ${naturalHeight}`);

            document.getElementById('image-dimensions-main').textContent = `Image Dimensions: ${naturalWidth}px x ${naturalHeight}px`;

            // Now that the viewBox is correctly set, create the shapes
            partsData.forEach(createShape);
        };

        // If the image is already loaded (e.g., from cache), run immediately.
        if (mainImage.complete) {
            setViewBoxAndCreateShapes();
        } else {
            // Otherwise, wait for the image to load.
            mainImage.onload = setViewBoxAndCreateShapes;
        }
    }

    /**
     * Creates and appends an SVG shape to the container based on the part data.
     * Coordinates are now relative to the image content's top-left (0,0).
     * @param {object} part - The part data object.
     */
    function createShape(part) {
        let shape;
        const coords = part.coords.split(/[ ,]+/);

        if (part.shape === 'rect') {
            shape = document.createElementNS(svgNS, 'rect');
            const x1 = parseInt(coords[0], 10);
            const y1 = parseInt(coords[1], 10);
            const x2 = parseInt(coords[2], 10);
            const y2 = parseInt(coords[3], 10);
            shape.setAttribute('x', Math.min(x1, x2));
            shape.setAttribute('y', Math.min(y1, y2));
            shape.setAttribute('width', Math.abs(x2 - x1));
            shape.setAttribute('height', Math.abs(y2 - y1));

        } else if (part.shape === 'circle') {
            shape = document.createElementNS(svgNS, 'circle');
            shape.setAttribute('cx', parseInt(coords[0], 10));
            shape.setAttribute('cy', parseInt(coords[1], 10));
            shape.setAttribute('r', parseInt(coords[2], 10));

        } else if (part.shape === 'polygon') {
            shape = document.createElementNS(svgNS, 'polygon');
            shape.setAttribute('points', part.coords);
        }

        if (shape) {
            shape.setAttribute('id', part.id);
            shape.setAttribute('class', 'clickable-area');
            svgContainer.appendChild(shape);
        }
    }

    /**
     * Updates the details panel with information for the selected part.
     * @param {string} partId - The ID of the selected part.
     */
    function updateDetails(partId) {
        const part = partsData.find(p => p.id === partId);
        if (part) {
            detailsPanel.innerHTML = `
                <h2>${part.name}</h2>
                <p>${part.description}</p>
            `;
        } else {
            detailsPanel.innerHTML = '<p>Click on a part to see its details.</p>';
        }
    }

    /**
     * Handles click events on the SVG container.
     * @param {Event} event - The click event.
     */
    function handleSvgClick(event) {
        const clickedId = event.target.id;

        svgContainer.querySelectorAll('.clickable-area').forEach(area => {
            area.classList.remove('highlighted');
        });

        if (clickedId && event.target.classList.contains('clickable-area')) {
            event.target.classList.add('highlighted');
            updateDetails(clickedId);
        } else {
            updateDetails(null);
        }
    }

    // --- Initialization ---
    initializeApp();
    svgContainer.addEventListener('click', handleSvgClick);
});