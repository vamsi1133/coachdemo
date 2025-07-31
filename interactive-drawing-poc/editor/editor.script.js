document.addEventListener('DOMContentLoaded', () => {
    const imageLoader = document.getElementById('image-loader');
    const uploadedImage = document.getElementById('uploaded-image');
    const drawingArea = document.getElementById('drawing-area');
    const svg = document.getElementById('drawing-svg');
    const coordsOutput = document.getElementById('coords-output');
    const copyBtn = document.getElementById('copy-coords');
    const finishPolygonBtn = document.getElementById('finish-polygon');
    const clearBtn = document.getElementById('clear-drawing');

    let currentShape = null;
    let drawing = false;
    let startPoint = {};
    let polygonPoints = [];

    const svgNS = "http://www.w3.org/2000/svg";

    // --- Image Loading ---
    imageLoader.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                uploadedImage.src = event.target.result;
                uploadedImage.style.display = 'block';
                drawingArea.querySelector('p').style.display = 'none';
                const img = new Image();
                img.onload = () => {
                    // Set viewBox to match the image's natural dimensions
                    // The editor's viewBox is always 0 0 naturalWidth naturalHeight
                    // because the editor's purpose is to get raw coordinates.
                    svg.setAttribute('viewBox', `0 0 ${img.width} ${img.height}`);
                    document.getElementById('image-dimensions').textContent = `Dimensions: ${img.width}px x ${img.height}px`;
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // --- Drawing Logic ---
    svg.addEventListener('mousedown', (e) => {
        if (!uploadedImage.src) return;
        drawing = true;
        startPoint = getMousePosition(e);
        const mode = document.querySelector('input[name="shape-mode"]:checked').value;

        if (mode !== 'polygon') {
            currentShape = document.createElementNS(svgNS, mode);
            currentShape.setAttribute('class', 'drawing-shape');
            svg.appendChild(currentShape);
        }
    });

    svg.addEventListener('mousemove', (e) => {
        if (!drawing || !currentShape) return;
        const currentPoint = getMousePosition(e);
        const mode = document.querySelector('input[name="shape-mode"]:checked').value;

        if (mode === 'rect') {
            const width = Math.abs(currentPoint.x - startPoint.x);
            const height = Math.abs(currentPoint.y - startPoint.y);
            const x = Math.min(startPoint.x, currentPoint.x);
            const y = Math.min(startPoint.y, currentPoint.y);
            currentShape.setAttribute('x', x);
            currentShape.setAttribute('y', y);
            currentShape.setAttribute('width', width);
            currentShape.setAttribute('height', height);
        } else if (mode === 'circle') {
            const r = Math.sqrt(Math.pow(currentPoint.x - startPoint.x, 2) + Math.pow(currentPoint.y - startPoint.y, 2));
            currentShape.setAttribute('cx', startPoint.x);
            currentShape.setAttribute('cy', startPoint.y);
            currentShape.setAttribute('r', r);
        }
    });

    svg.addEventListener('mouseup', (e) => {
        if (!uploadedImage.src) return;
        drawing = false;
        const mode = document.querySelector('input[name="shape-mode"]:checked').value;
        if (mode !== 'polygon') {
            outputCoordinates(mode);
        }
    });

    svg.addEventListener('click', (e) => {
        if (!uploadedImage.src) return;
        const mode = document.querySelector('input[name="shape-mode"]:checked').value;
        if (mode === 'polygon') {
            const point = getMousePosition(e);
            polygonPoints.push(point);
            drawPolygon();
        }
    });

    // --- Polygon Specific --- 
    function drawPolygon() {
        if (currentShape) {
            svg.removeChild(currentShape);
        }
        currentShape = document.createElementNS(svgNS, 'polygon');
        currentShape.setAttribute('class', 'drawing-shape');
        const pointsStr = polygonPoints.map(p => `${p.x},${p.y}`).join(' ');
        currentShape.setAttribute('points', pointsStr);
        svg.appendChild(currentShape);

        // Draw points
        svg.querySelectorAll('.polygon-point').forEach(p => p.remove());
        polygonPoints.forEach(p => {
            const circle = document.createElementNS(svgNS, 'circle');
            circle.setAttribute('class', 'polygon-point');
            circle.setAttribute('cx', p.x);
            circle.setAttribute('cy', p.y);
            circle.setAttribute('r', 3);
            svg.appendChild(circle);
        });
        finishPolygonBtn.disabled = polygonPoints.length < 3;
    }

    finishPolygonBtn.addEventListener('click', () => {
        if (polygonPoints.length > 2) {
            outputCoordinates('polygon');
            drawing = false;
        }
    });

    // --- Utility Functions ---
    function getMousePosition(e) {
        const CTM = svg.getScreenCTM();
        const x = Math.round((e.clientX - CTM.e) / CTM.a);
        const y = Math.round((e.clientY - CTM.f) / CTM.d);
        return {
            x: x,
            y: y
        };
    }

    function outputCoordinates(mode) {
        let coordsStr = '';
        if (mode === 'rect') {
            const x1 = parseInt(currentShape.getAttribute('x'));
            const y1 = parseInt(currentShape.getAttribute('y'));
            const width = parseInt(currentShape.getAttribute('width'));
            const height = parseInt(currentShape.getAttribute('height'));
            const x2 = x1 + width;
            const y2 = y1 + height;
            coordsStr = `${x1},${y1},${x2},${y2}`;
        } else if (mode === 'circle') {
            const cx = parseInt(currentShape.getAttribute('cx'));
            const cy = parseInt(currentShape.getAttribute('cy'));
            const r = Math.round(parseFloat(currentShape.getAttribute('r')));
            coordsStr = `${cx},${cy},${r}`;
        } else if (mode === 'polygon') {
            coordsStr = polygonPoints.map(p => `${p.x},${p.y}`).join(' ');
        }
        coordsOutput.value = coordsStr;
    }

    clearBtn.addEventListener('click', () => {
        if (currentShape) {
            svg.removeChild(currentShape);
            currentShape = null;
        }
        svg.querySelectorAll('.polygon-point').forEach(p => p.remove());
        polygonPoints = [];
        coordsOutput.value = '';
        finishPolygonBtn.disabled = true;
    });

    copyBtn.addEventListener('click', () => {
        coordsOutput.select();
        document.execCommand('copy');
    });

    // Handle mode change
    document.querySelectorAll('input[name="shape-mode"]').forEach(radio => {
        radio.addEventListener('change', () => {
            clearBtn.click(); // Clear drawing when mode changes
            finishPolygonBtn.disabled = radio.value !== 'polygon';
        });
    });
});
