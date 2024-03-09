import { exams } from './examsArray.js';
import { timeUntilExam } from './shared.js';
  
  // Iterate through the exams and display the time until each exam
  for (let i = 0; i < exams.length; i++){
    let exam = exams[i]
    const timeUntil = timeUntilExam(exam);
    console.log(`${exam.subject} ${exam.unitTitle}: ${timeUntil}`)
    exams[i].timeTo = timeUntil
  }

console.log(exams)

function populateCellsWithExamData() {
// Filter exams to include only upcoming exams
const upcomingExams = exams.filter((exam) => exam.timeTo !== "Exam has already started or finished");

// Sort upcoming exams by date and time (earliest first)
upcomingExams.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return a.time.localeCompare(b.time); // Compare times if dates are equal
});

// Iterate through the upcoming exams and populate table cells
upcomingExams.forEach((exam) => {
    exam.timeTo = timeUntilExam(exam);
    const subject = exam.subject; // Ensure consistent formatting for ID

    const unitTitleId = `unitTitle-${subject}`;
    const durationId = `duration-${subject}`;
    const dateId = `date-${subject}`;
    const countdownId = `countdown-${subject}`;

    const unitTitleCell = document.getElementById(unitTitleId);
    const durationCell = document.getElementById(durationId);
    const dateCell = document.getElementById(dateId);
    const countdownCell = document.getElementById(countdownId);

    if (countdownCell) {
        unitTitleCell.textContent = exam.unitTitle
        durationCell.textContent = exam.durationMins
        dateCell.textContent = exam.date
        countdownCell.textContent = exam.timeTo;
    }

    // Add code here to populate other cells as needed, using IDs like "unitCode-subject", "duration-subject", etc.
});
}

// Call the function when the page loads
window.onload = populateCellsWithExamData;
setInterval(populateCellsWithExamData, 1000);