import { exams } from './examsArray.js';
import { timeUntilExam } from './shared.js';
// import { updateSubjectVisibility } from './menu.js';

function convertCamelCaseToWords(inputString) {
    return inputString.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2').replace(/^\w/, c => c.toUpperCase());
}

function updateTable() {
    exams.forEach(exam => {
        const subject = exam.subject;
        const lowerSubject = subject.toLowerCase();
        const row = document.createElement('tr');
        const convertedSubject = convertCamelCaseToWords(subject);
        const countdown = timeUntilExam(exam);
        row.setAttribute('id', subject);

        // let sectionID = ""; // Declare it outside the if-else statements

        // if (lowerSubject.includes("maths")) {
        //     sectionID = "maths";
        // } else if (lowerSubject.includes("english")) {
        //     sectionID = "english";
        // } else if (lowerSubject.includes("biology") || lowerSubject.includes("chemistry") || lowerSubject.includes("physics")) {
        //     sectionID = "science";
        // } else if (lowerSubject.includes("german") || lowerSubject.includes("french")) {
        //     sectionID = "languages";
        // } else if (lowerSubject.includes("history") || lowerSubject.includes("geography") || lowerSubject.includes("religious")) {
        //     sectionID = "humanities";
        // } else if (lowerSubject.includes("design") || lowerSubject.includes("engineering") || lowerSubject.includes("food")) {
        //     sectionID = "dt";
        // } else if (lowerSubject.includes("drama") || lowerSubject.includes("music")) {
        //     sectionID = "arts";
        // } else if (lowerSubject.includes("pe") || lowerSubject.includes("child") || lowerSubject.includes("media") || lowerSubject.includes("computer") || lowerSubject.includes("business")) {
        //     sectionID = "other";
        // }

        // row.setAttribute('data-section-id', sectionID);

        row.innerHTML = `
            <td>${exam.date}</td>
            <td>${exam.time}</td>
            <td>${exam.board}</td>
            <td>${convertedSubject}</td>
            <td>${exam.unitCode}</td>
            <td>${exam.unitTitle}</td>
            <td>${exam.durationMins}</td>
            <td>${countdown}</td>
        `;
        document.getElementById('examsTableBody').appendChild(row);
    });
}

// Initial table update
updateTable();

// Update the table every second
setInterval(() => {
    // Clear existing table rows
    document.getElementById('examsTableBody').innerHTML = '';
    // Update the table with new data
    updateTable();
    // updateSubjectVisibility();
}, 1000);
