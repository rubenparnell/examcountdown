import { formattedExams as examData } from './examsDataCalendar.js' ;

const tableBody = document.getElementById("exam-data");
const selectedExams = [];

function downloadCSV(data) {
    // Define headers for the CSV
    const headers = "Subject,Start date,Start time,End time,Description";
  
    // Create a string for CSV content
    const csvContent = [headers, ...data.map(exam => Object.values(exam).join(","))].join("\n");
  
    const csvBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const csvUrl = URL.createObjectURL(csvBlob);
    const link = document.createElement("a");
    link.href = csvUrl;
    link.download = "selected_exams.csv";
    link.click();
  }
  

examData.forEach((exam, index) => {
  const row = document.createElement("tr");
  
  // Create table cells for each property in exam object
  for (const key in exam) {
    const cell = document.createElement("td");
    const cellText = document.createTextNode(exam[key]);
    cell.appendChild(cellText);
    row.appendChild(cell);
  }
  
  // Add a checkbox for selection
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.dataset.examIndex = index; // Set data attribute with current index
  const cell = document.createElement("td");
  cell.appendChild(checkbox);
  row.appendChild(cell);
  
  tableBody.appendChild(row);
});

tableBody.addEventListener("change", (event) => {
    if (event.target.type === "checkbox") {
      const examIndex = parseInt(event.target.dataset.examIndex); // Get exam index from data attribute#
      console.log(event.target.dataset.examIndex)
      console.log(examIndex)
      if (event.target.checked) {
        selectedExams.push(examData[examIndex]);
      } else {
        selectedExams.splice(selectedExams.indexOf(examData[examIndex]), 1);
      }
      console.log(selectedExams);
    }
  });

document.getElementById("download-button").addEventListener("click", () => {
  downloadCSV(selectedExams);
});