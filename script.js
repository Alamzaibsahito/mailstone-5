// get reference to the form and dispaly area
var form = document.getElementById('Resumeform');
var resumeDispalyElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareablelinkcontainer');
var shareableLinkElement = document.getElementById('shareablelink');
var downloadPdfButton = document.getElementById('downloadpdf');
// handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault();
    // collect input values
    var username = document.getElementById('Username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var Phone = document.getElementById('phonenumber').value;
    var education = document.getElementById('Education').value;
    var experience = document.getElementById('Experience').value;
    var skills = document.getElementById('Skills').value;
    var resumeData = {
        name: name,
        email: email,
        Phone: Phone,
        education: education,
        experience: experience,
        skills: skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData));
    var resumeHTML = "\n   <h2><b>EditableResume</b></h2>\n   <h3>Personal Infromation</h3>\n   <p><b>name:</b><span contenteditable=\"true\">".concat(name, "</span></p>\n   <p><b>email:</b><span contenteditable=\"true\">").concat(email, "</span></p>\n   <p><b>Phonenumber:</b span contenteditable=\"true\">").concat(Phone, "</span</p>\n\n   <h3>Education</h3>\n   <p contenteditable=\"true\">").concat(education, "</p>\n\n   <h3>Experience</h3>\n   <p contenteditable=\"true\">").concat(experience, "</p>\n\n   <h3>Skills</h3>\n   <p contenteditable=\"true\">").concat(skills, "</p>\n\n\n   ");
    if (resumeDispalyElement) {
        resumeDispalyElement.innerHTML = resumeHTML;
    }
    else {
        console.error('The Resume Dispaly Element is missing!');
    }
    // Generate a shareable URL with the username only
    var shareableURL = "{window,location,origin},Username=".concat(encodeURIComponent(username));
    // Display the shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
// Handle PDF download
downloadPdfButton.addEventListener('click', function () {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('Username');
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('Username').value =
                username;
            document.getElementById('name').value =
                resumeData.name;
            document.getElementById('email').value =
                resumeData.email;
            document.getElementById('phone').value =
                resumeData.phone;
            document.getElementById('education').value =
                resumeData.education;
            document.getElementById('experience').value
                = resumeData.experience;
            document.getElementById('skills').value =
                resumeData.skills;
        }
    }
});
