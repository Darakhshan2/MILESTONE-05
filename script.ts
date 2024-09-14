// // TypeScript type definitions for resume data
// interface ResumeData {
//     name: string;
//     fatherName: string;
//     about: string;
//     education: string;
//     skills: string;
//     github: string;
//     linkedin: string;
// }

// // Function to generate a unique hash for the URL
// const generateHash = (): string => {
//     return Date.now().toString(36);
// };

// // Function to update the shareable link
// const updateShareableLink = (hash: string): void => {
//     const shareableLink = `${window.location.origin}/resume.html#${hash}`;
//     const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
//     if (shareableLinkElement) {
//         shareableLinkElement.href = shareableLink;
//         shareableLinkElement.innerText = shareableLink;
//     } else {
//         console.error('Shareable link element not found.');
//     }
// };

// // Function to get resume data from the form
// const getResumeData = (): ResumeData => {
//     return {
//         name: (document.getElementById('name-input') as HTMLInputElement).value,
//         fatherName: (document.getElementById('father-name-input') as HTMLInputElement).value,
//         about: (document.getElementById('about-input') as HTMLInputElement).value,
//         education: (document.getElementById('education-input') as HTMLInputElement).value,
//         skills: (document.querySelector('.skills-input') as HTMLInputElement)?.value || '',
//         github: (document.getElementById('github-input') as HTMLInputElement).value,
//         linkedin: (document.getElementById('linkedin') as HTMLInputElement).value
//     };
// };

// // Function to save resume data to local storage
// const saveResumeData = (hash: string, data: ResumeData): void => {
//     localStorage.setItem(hash, JSON.stringify(data));
// };

// // Function to load resume data from local storage
// const loadResumeData = (hash: string): void => {
//     const resumeDataString = localStorage.getItem(hash);
//     if (resumeDataString) {
//         const resumeData: ResumeData = JSON.parse(resumeDataString);
//         (document.getElementById('name-input') as HTMLInputElement).value = resumeData.name;
//         (document.getElementById('father-name-input') as HTMLInputElement).value = resumeData.fatherName;
//         (document.getElementById('about-input') as HTMLInputElement).value = resumeData.about;
//         (document.getElementById('education-input') as HTMLInputElement).value = resumeData.education;
//         (document.querySelector('.skills-input') as HTMLInputElement).value = resumeData.skills;
//         (document.getElementById('github-input') as HTMLInputElement).value = resumeData.github;
//         (document.getElementById('linkedin') as HTMLInputElement).value = resumeData.linkedin;
//     }
// };

// // Function to generate and display the resume output
// const generateResumeOutput = (): void => {
//     const resumeData = getResumeData();
    
//     // Constructing HTML for the resume
//     const resumeHTML = `
//         <h1>${resumeData.name}</h1>
//         <h2>Father's Name: ${resumeData.fatherName}</h2>
//         <p><strong>Objective:</strong> ${resumeData.about}</p>
//         <p><strong>Education:</strong> ${resumeData.education}</p>
//         <p><strong>Skills:</strong> ${resumeData.skills}</p>
//         <p><strong>Github:</strong> <a href="${resumeData.github}" target="_blank">${resumeData.github}</a></p>
//         <p><strong>LinkedIn:</strong> <a href="${resumeData.linkedin}" target="_blank">${resumeData.linkedin}</a></p>
//     `;

//     const resumeOutputElement = document.getElementById('resume-output');
//     if (resumeOutputElement) {
//         resumeOutputElement.innerHTML = resumeHTML;
//     } else {
//         console.error('Resume output element not found.');
//     }
// };

// // Function to generate and download the resume as a PDF
// const downloadPDF = (): void => {
//     const element = document.getElementById('resume-output');
//     if (element) {
//         html2pdf().from(element).save('resume.pdf');
//     } else {
//         console.error('Resume output element not found.');
//     }
// };

// // Event listener for the "Generate Resume" button
// document.getElementById('button')?.addEventListener('click', () => {
//     const resumeData = getResumeData();
//     const hash = generateHash();
//     updateShareableLink(hash);
//     saveResumeData(hash, resumeData);
//     generateResumeOutput(); // Call this function to generate and display the resume
//     console.log('Generated resume data:', resumeData);
//     console.log('Shareable link:', `${window.name.toUpperCase()}/resume.html#${hash}`);
// });

// // Event listener for the "Download PDF" button
// document.getElementById('download-pdf')?.addEventListener('click', downloadPDF);

// // Load resume data from URL hash on page load
// window.addEventListener('load', () => {
//     const hash = window.location.hash.substring(1);
//     if (hash) {
//         loadResumeData(hash);
//     }
// });


// TypeScript type definitions for resume data
interface ResumeData {
    name: string;
    fatherName: string;
    about: string;
    education: string;
    skills: string;
    github: string;
    linkedin: string;
}

// Function to encode resume data into a query string
const encodeData = (data: ResumeData): string => {
    const params = new URLSearchParams();
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            params.append(key, data[key]);
        }
    }
    return params.toString();
};

// Function to decode resume data from a query string
const decodeData = (queryString: string): ResumeData => {
    const params = new URLSearchParams(queryString);
    return {
        name: params.get('name') || '',
        fatherName: params.get('fatherName') || '',
        about: params.get('about') || '',
        education: params.get('education') || '',
        skills: params.get('skills') || '',
        github: params.get('github') || '',
        linkedin: params.get('linkedin') || ''
    };
};

// Function to generate a unique shareable link based on user's name
const updateShareableLink = (name: string): void => {
    const shareableLink = `${window.location.origin}?name=${encodeURIComponent(name)}`;
    const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
    if (shareableLinkElement) {
        shareableLinkElement.href = shareableLink;
        shareableLinkElement.innerText = shareableLink;
    } else {
        console.error('Shareable link element not found.');
    }
};

// Function to get resume data from the form
const getResumeData = (): ResumeData => {
    return {
        name: (document.getElementById('name-input') as HTMLInputElement).value,
        fatherName: (document.getElementById('father-name-input') as HTMLInputElement).value,
        about: (document.getElementById('about-input') as HTMLInputElement).value,
        education: (document.getElementById('education-input') as HTMLInputElement).value,
        skills: (document.querySelector('.skills-input') as HTMLInputElement)?.value || '',
        github: (document.getElementById('github-input') as HTMLInputElement).value,
        linkedin: (document.getElementById('linkedin') as HTMLInputElement).value
    };
};

// Function to save resume data to local storage using the name as the key
const saveResumeData = (name: string, data: ResumeData): void => {
    localStorage.setItem(name, JSON.stringify(data));
};

// Function to load resume data from local storage using the name as the key
const loadResumeData = (name: string): void => {
    const resumeDataString = localStorage.getItem(name);
    if (resumeDataString) {
        const resumeData: ResumeData = JSON.parse(resumeDataString);
        (document.getElementById('name-input') as HTMLInputElement).value = resumeData.name;
        (document.getElementById('father-name-input') as HTMLInputElement).value = resumeData.fatherName;
        (document.getElementById('about-input') as HTMLInputElement).value = resumeData.about;
        (document.getElementById('education-input') as HTMLInputElement).value = resumeData.education;
        (document.querySelector('.skills-input') as HTMLInputElement).value = resumeData.skills;
        (document.getElementById('github-input') as HTMLInputElement).value = resumeData.github;
        (document.getElementById('linkedin') as HTMLInputElement).value = resumeData.linkedin;
        generateResumeOutput(); // Optionally generate the resume on load
    } else {
        console.error('No resume data found for this user.');
    }
};

// Function to generate and display the resume output
const generateResumeOutput = (): void => {
    const resumeData = getResumeData();
    
    // Constructing HTML for the resume
    const resumeHTML = `
        <h1>${resumeData.name}</h1>
        <h2>Father's Name: ${resumeData.fatherName}</h2>
        <p><strong>Objective:</strong> ${resumeData.about}</p>
        <p><strong>Education:</strong> ${resumeData.education}</p>
        <p><strong>Skills:</strong> ${resumeData.skills}</p>
        <p><strong>Github:</strong> <a href="${resumeData.github}" target="_blank">${resumeData.github}</a></p>
        <p><strong>LinkedIn:</strong> <a href="${resumeData.linkedin}" target="_blank">${resumeData.linkedin}</a></p>
    `;

    const resumeOutputElement = document.getElementById('resume-output');
    if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeHTML;
    } else {
        console.error('Resume output element not found.');
    }
};

// Function to generate and download the resume as a PDF
const downloadPDF = (): void => {
    const element = document.getElementById('resume-output');
    if (element) {
        html2pdf().from(element).save('resume.pdf');
    } else {
        console.error('Resume output element not found.');
    }
};

// Event listener for the "Generate Resume" button
document.getElementById('button')?.addEventListener('click', () => {
    const resumeData = getResumeData();
    const name = resumeData.name;
    if (name) {
        saveResumeData(name, resumeData);
        updateShareableLink(name);
        generateResumeOutput(); // Call this function to generate and display the resume
        console.log('Generated resume data:', resumeData);
        console.log('Shareable link:', `${window.location.origin}?name=${encodeURIComponent(name)}`);
    } else {
        console.error('Name is required to generate the shareable link.');
    }
});

// Event listener for the "Download PDF" button
document.getElementById('download-pdf')?.addEventListener('click', downloadPDF);

// Load resume data from URL query string on page load
window.addEventListener('load', () => {
    const queryString = window.location.search.substring(1);
    const params = new URLSearchParams(queryString);
    const name = params.get('name');
    if (name) {
        loadResumeData(name);
    }
});
