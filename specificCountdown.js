import { exams } from './examsArray.js';

function getSubjectFromUrl() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get("subject");
  }
  
function timeUntilExam(exam) {
    const examDate = exam.date;
    const examTime = exam.time === "am" ? "09:00" : "13:30"; // Set exam times as specified
    const examDateTime = new Date(`${examDate}T${examTime}`);
  
    const now = new Date();
  
    // Ensure exam time is in the future
    if (examDateTime <= now) {
      return "Exam has already started or finished";
    }
  
    const differenceInMilliseconds = examDateTime - now;
    const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((differenceInMilliseconds % (1000 * 60)) / (1000));
  
    return `${days} Days, ${hours} Hrs, ${minutes} Mins, ${seconds} Secs`;
}

function updateTable() {
  const subject = getSubjectFromUrl();
  const table = document.getElementById("exam-tables");

  // Remove existing table if any
  while (table.firstChild) {
      table.removeChild(table.firstChild);
  }

  createSubjectTable(subject);
}

function createSubjectTable(subject) {
  const table = document.createElement("table");
  table.classList.add("exam-table");

  // Create table headers
  const headerRow = table.insertRow();
  headerRow.appendChild(document.createElement("th")).textContent = "Date";
  headerRow.appendChild(document.createElement("th")).textContent = "Time";
  headerRow.appendChild(document.createElement("th")).textContent = "Board";
  headerRow.appendChild(document.createElement("th")).textContent = "Unit Code";
  headerRow.appendChild(document.createElement("th")).textContent = "Unit Title";
  headerRow.appendChild(document.createElement("th")).textContent = "Duration";
  headerRow.appendChild(document.createElement("th")).textContent = "Time Until";

  // Filter exams for the given subject and create table rows
  exams
      .filter((exam) => exam.subject === subject)
      .forEach((exam) => {
          const row = table.insertRow();
          row.insertCell().textContent = exam.date;
          row.insertCell().textContent = exam.time;
          row.insertCell().textContent = exam.board;
          row.insertCell().textContent = exam.unitCode;
          row.insertCell().textContent = exam.unitTitle;
          row.insertCell().textContent = `${exam.durationMins} minutes`;

          // Create a cell for time until exam
          const timeUntilCell = row.insertCell();
          updateCellTimeUntil(timeUntilCell, exam);

          // Schedule the update of time until exam every second
          setInterval(() => {
              updateCellTimeUntil(timeUntilCell, exam);
          }, 1000);
      });

  document.getElementById("exam-tables").appendChild(table);
}

function updateCellTimeUntil(cell, exam) {
  const timeLeft = timeUntilExam(exam);
  cell.textContent = `${timeLeft}`;
}

const subject = getSubjectFromUrl();

createSubjectTable(subject);

// Nice looking subject name:
function convertCamelCaseToWords(inputString) {
  return inputString.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2').replace(/^\w/, c => c.toUpperCase());
}

let convertedSubject = convertCamelCaseToWords(subject);

const h1Element = document.querySelector("h1");
h1Element.textContent = `Exams for ${convertedSubject}:`;

const titleElement = document.querySelector("title");
titleElement.textContent = `${convertedSubject} Exams`;