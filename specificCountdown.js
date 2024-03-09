import { exams } from './examsArray.js';
import { timeUntilExam } from './shared.js';

function getSubjectFromUrl() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get("subject");
  }

function createSubjectTable(subject) {
  const table = document.createElement("table");
  table.classList.add("centre");

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

  document.getElementById("exam-table").appendChild(table);
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