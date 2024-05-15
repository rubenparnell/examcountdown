import { exams } from './examsArray.js';
import { timeUntilExam } from './shared.js';
  
  // Iterate through the exams and display the time until each exam
  for (let i = 0; i < exams.length; i++){
    let exam = exams[i]
    const timeUntil = timeUntilExam(exam);
    exams[i].timeTo = timeUntil
  }

function populateCellsWithExamData() {
  // Filter exams to include only upcoming exams
  const upcomingExams = exams.filter((exam) => exam.timeTo !== "Exam already started/ finished");

  // Sort upcoming exams by date and time (earliest first)
  upcomingExams.sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split(' ')[1].split('/'); // Extract day, month, year from date A
    const formattedDateA = `20${yearA}-${monthA}-${dayA}`; // Construct date string for A

    const [dayB, monthB, yearB] = b.date.split(' ')[1].split('/'); // Extract day, month, year from date B
    const formattedDateB = `20${yearB}-${monthB}-${dayB}`; // Construct date string for B

    if (formattedDateA < formattedDateB) return 1;
    if (formattedDateA > formattedDateB) return -1;
    return a.time.localeCompare(b.time); // Compare times if dates are equal
  });

  console.log(upcomingExams);


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
  });
}

// Call the function when the page loads
window.onload = populateCellsWithExamData;
setInterval(populateCellsWithExamData, 1000);