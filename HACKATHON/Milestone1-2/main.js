"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleSkills');
    const skillsSection = document.getElementById('skills');
    toggleButton.addEventListener('click', () => {
        if (skillsSection.style.display === 'none') {
            skillsSection.style.display = 'block';
            toggleButton.textContent = 'Hide Skills';
        }
        else {
            skillsSection.style.display = 'none';
            toggleButton.textContent = 'Show Skills';
        }
    });
});
