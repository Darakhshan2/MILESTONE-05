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
var _a, _b;
// Function to encode resume data into a query string
var encodeData = function (data) {
    var params = new URLSearchParams();
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            params.append(key, data[key]);
        }
    }
    return params.toString();
};
// Function to decode resume data from a query string
var decodeData = function (queryString) {
    var params = new URLSearchParams(queryString);
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
var updateShareableLink = function (name) {
    var shareableLink = "".concat(window.location.origin, "?name=").concat(encodeURIComponent(name));
    var shareableLinkElement = document.getElementById('shareable-link');
    if (shareableLinkElement) {
        shareableLinkElement.href = shareableLink;
        shareableLinkElement.innerText = shareableLink;
    }
    else {
        console.error('Shareable link element not found.');
    }
};
// Function to get resume data from the form
var getResumeData = function () {
    var _a;
    return {
        name: document.getElementById('name-input').value,
        fatherName: document.getElementById('father-name-input').value,
        about: document.getElementById('about-input').value,
        education: document.getElementById('education-input').value,
        skills: ((_a = document.querySelector('.skills-input')) === null || _a === void 0 ? void 0 : _a.value) || '',
        github: document.getElementById('github-input').value,
        linkedin: document.getElementById('linkedin').value
    };
};
// Function to save resume data to local storage using the name as the key
var saveResumeData = function (name, data) {
    localStorage.setItem(name, JSON.stringify(data));
};
// Function to load resume data from local storage using the name as the key
var loadResumeData = function (name) {
    var resumeDataString = localStorage.getItem(name);
    if (resumeDataString) {
        var resumeData = JSON.parse(resumeDataString);
        document.getElementById('name-input').value = resumeData.name;
        document.getElementById('father-name-input').value = resumeData.fatherName;
        document.getElementById('about-input').value = resumeData.about;
        document.getElementById('education-input').value = resumeData.education;
        document.querySelector('.skills-input').value = resumeData.skills;
        document.getElementById('github-input').value = resumeData.github;
        document.getElementById('linkedin').value = resumeData.linkedin;
        generateResumeOutput(); // Optionally generate the resume on load
    }
    else {
        console.error('No resume data found for this user.');
    }
};
// Function to generate and display the resume output
var generateResumeOutput = function () {
    var resumeData = getResumeData();
    // Constructing HTML for the resume
    var resumeHTML = "\n        <h1>".concat(resumeData.name, "</h1>\n        <h2>Father's Name: ").concat(resumeData.fatherName, "</h2>\n        <p><strong>Objective:</strong> ").concat(resumeData.about, "</p>\n        <p><strong>Education:</strong> ").concat(resumeData.education, "</p>\n        <p><strong>Skills:</strong> ").concat(resumeData.skills, "</p>\n        <p><strong>Github:</strong> <a href=\"").concat(resumeData.github, "\" target=\"_blank\">").concat(resumeData.github, "</a></p>\n        <p><strong>LinkedIn:</strong> <a href=\"").concat(resumeData.linkedin, "\" target=\"_blank\">").concat(resumeData.linkedin, "</a></p>\n    ");
    var resumeOutputElement = document.getElementById('resume-output');
    if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeHTML;
    }
    else {
        console.error('Resume output element not found.');
    }
};
// Function to generate and download the resume as a PDF
var downloadPDF = function () {
    var element = document.getElementById('resume-output');
    if (element) {
        html2pdf().from(element).save('resume.pdf');
    }
    else {
        console.error('Resume output element not found.');
    }
};
// Event listener for the "Generate Resume" button
(_a = document.getElementById('button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var resumeData = getResumeData();
    var name = resumeData.name;
    if (name) {
        saveResumeData(name, resumeData);
        updateShareableLink(name);
        generateResumeOutput(); // Call this function to generate and display the resume
        console.log('Generated resume data:', resumeData);
        console.log('Shareable link:', "".concat(window.location.origin, "?name=").concat(encodeURIComponent(name)));
    }
    else {
        console.error('Name is required to generate the shareable link.');
    }
});
// Event listener for the "Download PDF" button
(_b = document.getElementById('download-pdf')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', downloadPDF);
// Load resume data from URL query string on page load
window.addEventListener('load', function () {
    var queryString = window.location.search.substring(1);
    var params = new URLSearchParams(queryString);
    var name = params.get('name');
    if (name) {
        loadResumeData(name);
    }
});
