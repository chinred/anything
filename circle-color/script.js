// script.js
document.addEventListener('DOMContentLoaded', () => {
    const circle = document.getElementById('circle');
    const colorFan = document.getElementById('colorFan');
    let isExpanded = false;

    circle.addEventListener('click', () => {
        if (isExpanded) {
            colorFan.style.transform = 'translate(-50%, -50%) scale(0)'; // Collapse the fan effect
        } else {
            colorFan.style.transform = 'translate(-50%, -50%) scale(1)'; // Expand the fan effect
        }
        isExpanded = !isExpanded;
    });
});