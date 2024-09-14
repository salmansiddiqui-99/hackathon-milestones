"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm');
    const addEducationBtn = document.getElementById('addEducation');
    const addExperienceBtn = document.getElementById('addExperience');
    const resumeOutput = document.getElementById('resumeOutput');
    const resumeContent = document.getElementById('resumeContent');
    addEducationBtn.addEventListener('click', addEducationField);
    addExperienceBtn.addEventListener('click', addExperienceField);
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const resumeData = processFormData(formData);
        generateResume(resumeData);
        resumeOutput.style.display = 'block';
    });
});
function addEducationField() {
    const educationFields = document.getElementById('educationFields');
    const newField = document.createElement('div');
    newField.className = 'education-entry';
    newField.innerHTML = `
        <input type="text" name="degree[]" placeholder="Degree" required>
        <input type="text" name="school[]" placeholder="School/University" required>
        <input type="number" name="graduationYear[]" placeholder="Graduation Year" required>
    `;
    educationFields.appendChild(newField);
}
function addExperienceField() {
    const experienceFields = document.getElementById('experienceFields');
    const newField = document.createElement('div');
    newField.className = 'experience-entry';
    newField.innerHTML = `
        <input type="text" name="jobTitle[]" placeholder="Job Title" required>
        <input type="text" name="company[]" placeholder="Company" required>
        <textarea name="jobDescription[]" placeholder="Job Description" required></textarea>
    `;
    experienceFields.appendChild(newField);
}
function processFormData(formData) {
    const degrees = formData.getAll('degree[]');
    const schools = formData.getAll('school[]');
    const graduationYears = formData.getAll('graduationYear[]');
    const jobTitles = formData.getAll('jobTitle[]');
    const companies = formData.getAll('company[]');
    const jobDescriptions = formData.getAll('jobDescription[]');
    return {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        education: degrees.map((degree, index) => ({
            degree,
            school: schools[index],
            graduationYear: graduationYears[index]
        })),
        experience: jobTitles.map((jobTitle, index) => ({
            jobTitle,
            company: companies[index],
            jobDescription: jobDescriptions[index]
        })),
        skills: formData.get('skills').split(',').map(skill => skill.trim()),
    };
}
function generateResume(data) {
    const resumeHTML = `
        <h1>${data.name}</h1>
        <p>${data.email} | ${data.phone}</p>
        
        <h2>Education</h2>
        ${data.education.map(edu => `
            <div>
                <h3>${edu.degree}</h3>
                <p>${edu.school}, ${edu.graduationYear}</p>
            </div>
        `).join('')}
        
        <h2>Work Experience</h2>
        ${data.experience.map(exp => `
            <div>
                <h3>${exp.jobTitle}</h3>
                <p>${exp.company}</p>
                <p>${exp.jobDescription}</p>
            </div>
        `).join('')}
        
        <h2>Skills</h2>
        <ul>
            ${data.skills.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
    `;
    const resumeContent = document.getElementById('resumeContent');
    resumeContent.innerHTML = resumeHTML;
}
