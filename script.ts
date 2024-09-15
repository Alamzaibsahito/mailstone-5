// get reference to the form and dispaly area
const form = document.getElementById('Resumeform') as HTMLFormElement;
const resumeDispalyElement = document.getElementById('resume-display') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareablelinkcontainer') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareablelink') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('downloadpdf') as HTMLButtonElement;

// handle form submission

form.addEventListener('submit', (event:Event)=>{
   event.preventDefault();

   // collect input values
   const username = (document.getElementById('Username') as HTMLInputElement).value;
   const name = (document.getElementById('name') as HTMLInputElement).value
   const email = (document.getElementById('email') as HTMLInputElement).value
   const Phone = (document.getElementById('phonenumber') as HTMLInputElement).value
   const education = (document.getElementById('Education') as HTMLTextAreaElement).value
   const experience = (document.getElementById('Experience') as HTMLTextAreaElement).value
   const skills = (document.getElementById('Skills') as HTMLTextAreaElement).value


   const resumeData = {
      name,
      email,
      Phone,
      education,
      experience,
      skills
      };
      localStorage.setItem(username, JSON.stringify(resumeData));

   const resumeHTML = `
   <h2><b>EditableResume</b></h2>
   <h3>Personal Infromation</h3>
   <p><b>name:</b><span contenteditable="true">${name}</span></p>
   <p><b>email:</b><span contenteditable="true">${email}</span></p>
   <p><b>Phonenumber:</b span contenteditable="true">${Phone}</span</p>

   <h3>Education</h3>
   <p contenteditable="true">${education}</p>

   <h3>Experience</h3>
   <p contenteditable="true">${experience}</p>

   <h3>Skills</h3>
   <p contenteditable="true">${skills}</p>


   `;
   
if(resumeDispalyElement){
   resumeDispalyElement.innerHTML =  resumeHTML;
} else{
   console.error('The Resume Dispaly Element is missing!')
}



// Generate a shareable URL with the username only
const shareableURL =
`{window,location,origin},Username=${encodeURIComponent(username)}`
// Display the shareable link
shareableLinkContainer.style.display = 'block';
shareableLinkElement.href = shareableURL;
shareableLinkElement.textContent = shareableURL;
});
// Handle PDF download
downloadPdfButton.addEventListener('click', () => {
window.print(); // This will open the print dialog and allow the user to save as PDF
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('Username');
if (username) {

// Autofill form if data is found in localStorage
const savedResumeData = localStorage.getItem(username);
if (savedResumeData) {
const resumeData = JSON.parse(savedResumeData);
(document.getElementById('Username') as HTMLInputElement).value =
username;
(document.getElementById('name') as HTMLInputElement).value =
resumeData.name;
(document.getElementById('email') as HTMLInputElement).value =
resumeData.email;
(document.getElementById('phone') as HTMLInputElement).value =
resumeData.phone;
(document.getElementById('education') as HTMLTextAreaElement).value =
resumeData.education;
(document.getElementById('experience') as HTMLTextAreaElement).value
= resumeData.experience;
(document.getElementById('skills') as HTMLTextAreaElement).value =
resumeData.skills;
}
}
});