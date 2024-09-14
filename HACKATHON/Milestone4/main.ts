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
    const addEducationToResumeBtn = document.getElementById('addEducationToResume') as HTMLButtonElement;
    const addExperienceToResumeBtn = document.getElementById('addExperienceToResume') as HTMLButtonElement;

    addEducationBtn.addEventListener('click', () => addFieldToForm('education'));
    addExperienceBtn.addEventListener('click', () => addFieldToForm('experience'));
    addEducationToResumeBtn.addEventListener('click', () => addEntryToResume('education'));
    addExperienceToResumeBtn.addEventListener('click', () => addEntryToResume('experience'));

    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        const formData = new FormData(form);
        const resumeData = processFormData(formData);
        generateResume(resumeData);
        resumeOutput.style.display = 'block';
        setupEditableResume();
    });
});

function addFieldToForm(type: 'education' | 'experience'): void {
    const container = document.getElementById(`${type}Fields`) as HTMLDivElement;
    const newField = document.createElement('div');
    newField.className = `${type}-entry`;
    
    if (type === 'education') {
        newField.innerHTML = `
            <input type="text" name="degree[]" placeholder="Degree" required>
            <input type="text" name="school[]" placeholder="School/University" required>
            <input type="number" name="graduationYear[]" placeholder="Graduation Year" required>
        `;
    } else {
        newField.innerHTML = `
            <input type="text" name="jobTitle[]" placeholder="Job Title" required>
            <input type="text" name="company[]" placeholder="Company" required>
            <textarea name="jobDescription[]" placeholder="Job Description" required></textarea>
        `;
    }
    
    container.appendChild(newField);
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
    const resumeName = document.getElementById('resumeName') as HTMLHeadingElement;
    const resumeContact = document.getElementById('resumeContact') as HTMLParagraphElement;
    const resumeEducation = document.getElementById('resumeEducation') as HTMLDivElement;
    const resumeExperience = document.getElementById('resumeExperience') as HTMLDivElement;
    const resumeSkills = document.getElementById('resumeSkills') as HTMLUListElement;

    resumeName.textContent = data.name;
    resumeContact.textContent = `${data.email} | ${data.phone}`;

    resumeEducation.innerHTML = data.education.map(edu => `
        <div class="education-item">
            <h3 contenteditable="true">${edu.degree}</h3>
            <p contenteditable="true">${edu.school}, ${edu.graduationYear}</p>
        </div>
    `).join('');

    resumeExperience.innerHTML = data.experience.map(exp => `
        <div class="experience-item">
            <h3 contenteditable="true">${exp.jobTitle}</h3>
            <p contenteditable="true">${exp.company}</p>
            <p contenteditable="true">${exp.jobDescription}</p>
        </div>
    `).join('');

    resumeSkills.innerHTML = data.skills.map(skill => `<li>${skill}</li>`).join('');
}

function setupEditableResume(): void {
    const editableElements = document.querySelectorAll('[contenteditable="true"]');
    editableElements.forEach(element => {
        element.addEventListener('blur', () => {
            console.log('Content edited:', element.textContent);
            // You can add logic here to save changes if needed
        });
    });
}

function addEntryToResume(type: 'education' | 'experience'): void {
    const container = document.getElementById(`resume${type.charAt(0).toUpperCase() + type.slice(1)}`) as HTMLDivElement;
    const newEntry = document.createElement('div');
    newEntry.className = `${type}-item`;
    
    if (type === 'education') {
        newEntry.innerHTML = `
            <h3 contenteditable="true">New Degree</h3>
            <p contenteditable="true">New School, Year</p>
        `;
    } else {
        newEntry.innerHTML = `
            <h3 contenteditable="true">New Job Title</h3>
            <p contenteditable="true">New Company</p>
            <p contenteditable="true">Job Description</p>
        `;
    }
    
    container.appendChild(newEntry);
    setupEditableResume();
}