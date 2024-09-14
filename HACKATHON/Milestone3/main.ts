interface Education {
    degree: string;
    school: string;
    graduationYear: string;
}

interface Experience {
    jobTitle: string;
    company: string;
    jobDescription: string;
}

interface ResumeData {
    name: string;
    email: string;
    phone: string;
    education: Education[];
    experience: Experience[];
    skills: string[];
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm') as HTMLFormElement;
    const addEducationBtn = document.getElementById('addEducation') as HTMLButtonElement;
    const addExperienceBtn = document.getElementById('addExperience') as HTMLButtonElement;
    const resumeOutput = document.getElementById('resumeOutput') as HTMLDivElement;
    const resumeContent = document.getElementById('resumeContent') as HTMLDivElement;

    addEducationBtn.addEventListener('click', addEducationField);
    addExperienceBtn.addEventListener('click', addExperienceField);

    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        const formData = new FormData(form);
        const resumeData = processFormData(formData);
        generateResume(resumeData);
        resumeOutput.style.display = 'block';
    });
});

function addEducationField(): void {
    const educationFields = document.getElementById('educationFields') as HTMLDivElement;
    const newField = document.createElement('div');
    newField.className = 'education-entry';
    newField.innerHTML = `
        <input type="text" name="degree[]" placeholder="Degree" required>
        <input type="text" name="school[]" placeholder="School/University" required>
        <input type="number" name="graduationYear[]" placeholder="Graduation Year" required>
    `;
    educationFields.appendChild(newField);
}

function addExperienceField(): void {
    const experienceFields = document.getElementById('experienceFields') as HTMLDivElement;
    const newField = document.createElement('div');
    newField.className = 'experience-entry';
    newField.innerHTML = `
        <input type="text" name="jobTitle[]" placeholder="Job Title" required>
        <input type="text" name="company[]" placeholder="Company" required>
        <textarea name="jobDescription[]" placeholder="Job Description" required></textarea>
    `;
    experienceFields.appendChild(newField);
}

function processFormData(formData: FormData): ResumeData {
    const degrees = formData.getAll('degree[]') as string[];
    const schools = formData.getAll('school[]') as string[];
    const graduationYears = formData.getAll('graduationYear[]') as string[];
    const jobTitles = formData.getAll('jobTitle[]') as string[];
    const companies = formData.getAll('company[]') as string[];
    const jobDescriptions = formData.getAll('jobDescription[]') as string[];

    return {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
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
        skills: (formData.get('skills') as string).split(',').map(skill => skill.trim()),
    };
}

function generateResume(data: ResumeData): void {
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

    const resumeContent = document.getElementById('resumeContent') as HTMLDivElement;
    resumeContent.innerHTML = resumeHTML;
}