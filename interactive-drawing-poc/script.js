document.addEventListener('DOMContentLoaded', () => {
    // --- Data Store ---
    const partsData = [
        {
            id: 'part-window-1',
            name: 'Passenger Window 1',
            description: 'Standard passenger viewing window, double-paned for insulation.',
            shape: 'rect',
            coords: '200,110,249,138',
            workingHours: 2,
            price: 150,
            subParts: ['Glass Pane', 'Sealant', 'Frame']
        },
        {
            id: 'part-window-2',
            name: 'Passenger Window 2',
            description: 'Standard passenger viewing window, double-paned for insulation.',
            shape: 'rect',
            coords: '260,111,308,139',
            workingHours: 2,
            price: 150,
            subParts: ['Glass Pane', 'Sealant', 'Frame']
        },
        {
            id: 'part-window-3',
            name: 'Passenger Window 3',
            description: 'Standard passenger viewing window, double-paned for insulation.',
            shape: 'rect',
            coords: '320,109,371,140',
            workingHours: 2,
            price: 150,
            subParts: ['Glass Pane', 'Sealant', 'Frame']
        },
        {
            id: 'part-window-4',
            name: 'Passenger Window 4',
            description: 'Standard passenger viewing window, double-paned for insulation.',
            shape: 'rect',
            coords: '380,110,430,138',
            workingHours: 2,
            price: 150,
            subParts: ['Glass Pane', 'Sealant', 'Frame']
        },
        {
            id: 'wheel-1',
            name: 'Front Wheel Assembly',
            description: 'The front wheel of the train coach, essential for movement.',
            shape: 'circle',
            coords: '288,220,17',
            workingHours: 8,
            price: 1200,
            subParts: ['Wheel', 'Axle', 'Brake System', 'Bearings']
        },
    ];

    const svgNS = "http://www.w3.org/2000/svg";
    const svgContainer = document.getElementById('drawing-svg');
    const detailsPanel = document.getElementById('details-panel');
    const mainImage = document.getElementById('main-drawing-image');
    const jobsTableBody = document.querySelector('#jobs-table tbody');
    const togglePartsSwitch = document.getElementById('toggle-parts-switch');

    let jobs = [];

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
            const subPartsList = part.subParts.map(subPart => `<li>${subPart}</li>`).join('');
            detailsPanel.innerHTML = `
                <h2>${part.name}</h2>
                <p>${part.description}</p>
                <p><strong>Working Hours:</strong> ${part.workingHours}</p>
                <p><strong>Price:</strong> $${part.price}</p>
                <p><strong>Sub-Parts:</strong></p>
                <ul>${subPartsList}</ul>
                <button id="add-job-btn" data-part-id="${part.id}">Add Job</button>
            `;
            document.getElementById('add-job-btn').addEventListener('click', () => addJobToList(part));
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

    /**
     * Adds a job to the list and updates the table.
     * @param {object} part - The part data object.
     */
    function addJobToList(part) {
        const jobExists = jobs.some(job => job.id === part.id);
        if (jobExists) {
            alert('This job is already in the list.');
            return;
        }
        const job = {
            id: part.id,
            name: part.name,
            workingHours: part.workingHours,
            price: part.price,
            subParts: part.subParts
        };
        jobs.push(job);
        renderJobsTable();
    }

    /**
     * Removes a job from the list and updates the table.
     * @param {string} partId - The ID of the part to remove.
     */
    function removeJob(partId) {
        jobs = jobs.filter(job => job.id !== partId);
        renderJobsTable();
    }

    /**
     * Renders the jobs table.
     */
    function renderJobsTable() {
        jobsTableBody.innerHTML = '';
        jobs.forEach(job => {
            const subPartsList = job.subParts.map(subPart => `<li>${subPart}</li>`).join('');
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${job.name}</td>
                <td>${job.workingHours}</td>
                <td>$${job.price}</td>
                <td><ul>${subPartsList}</ul></td>
                <td><button class="cancel-job-btn" data-part-id="${job.id}">Cancel</button></td>
            `;
            jobsTableBody.appendChild(row);
        });

        document.querySelectorAll('.cancel-job-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                removeJob(e.target.dataset.partId);
            });
        });
    }

    // --- Initialization ---
    initializeApp();
    svgContainer.addEventListener('click', handleSvgClick);
    togglePartsSwitch.addEventListener('change', () => {
        svgContainer.classList.toggle('show-parts', togglePartsSwitch.checked);
    });
});
