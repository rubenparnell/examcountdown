import { exams } from './examsArray.js' ;

function formatExams(exams) {
  const lessonsData = exams.map(exam => {
    const [day, month, year] = exam.date.split(' ')[1].split('/'); // Extract day, month, year from date B
    const startDate = new Date(`20${year}-${month}-${day}`); // Construct date string for B

    const amTime = document.getElementById("amTime").value;
    const pmTime = document.getElementById("pmTime").value;  

    const startTime = exam.time === 'am' ? amTime : pmTime;
    const startDateTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), parseInt(startTime.split(':')[0]), parseInt(startTime.split(':')[1]));

    const durationHours = Math.floor(exam.durationMins / 60);
    const durationMinutes = exam.durationMins % 60;

    const endDateTime = new Date(startDateTime.getTime() + (durationHours * 60 + durationMinutes) * 60000);

    const formattedEndTime = endDateTime.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit', second: '2-digit'});
    const formattedStartDate = startDate.toLocaleDateString('en-GB');
    const formattedSubject = exam.subject.replace(/\b\w/g, function(char) {
        return char.toUpperCase();
    }).replace(/([A-Z])/g, ' $1').trim().replace('Pe', 'PE') + " | " + exam.unitTitle;
      
      return {
        "Subject": formattedSubject,
        "Start date": formattedStartDate,
        "Start time": startTime,
        "End time": formattedEndTime,
        "Description": exam.unitCode,
        "Lesson": exam.subject
      };
  });

  return lessonsData;
}


// Function to format lesson names for display in the table
function formatLessonName(lesson) {
  // Add spaces between camelCase or PascalCase words
  let spacedLesson = lesson.replace(/([a-z])([A-Z])/g, '$1 $2');
  // Capitalize each word in the lesson name
  let capitalizedLesson = spacedLesson.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  // Replace "Pe" with "PE"
  capitalizedLesson = capitalizedLesson.replace("Pe", "PE");
  return capitalizedLesson;
}

// Function to create the lesson selection table
export function createLessonTable() {
  const tbody = document.querySelector("#lessonTable tbody");
  tbody.innerHTML = "";

  const uniqueLessons = [
    "englishLanguage",
    "englishLiterature",
    "maths",
    "furtherMaths",
    "combinedBiology",
    "biology",
    "combinedChemistry",
    "chemistry",
    "combinedPhysics",
    "physics",
    "french",
    "german",
    "history",
    "geography",
    "religiousStudies",
    "designTechnology",
    "engineering",
    "food",
    "drama",
    "music",
    "business",
    "computerScience",
    "mediaStudies",
    "childDevelopment",
    "pe"
  ]

  uniqueLessons.forEach(lesson => {
    const row = document.createElement("tr");

    if (lesson=="englishLanguage" || lesson=="englishLiterature" || lesson=="maths"){
      row.innerHTML = `
      <td>${formatLessonName(lesson)}</td>
      <td><input type="checkbox" name="lessonCheckbox" value="${lesson}" checked></td>
    `;
    } else {
      row.innerHTML = `
      <td>${formatLessonName(lesson)}</td>
      <td><input type="checkbox" name="lessonCheckbox" value="${lesson}"></td>
    `;
    }
    
    tbody.appendChild(row);
  });
}


// Function to download selected lessons as CSV
export function downloadCSV() {
  let lessonsData = formatExams(exams)

  const headers = "Subject,Start date,Start time,End time,Description\n"; // Add headers
  
  const selectedLessons = Array.from(document.querySelectorAll('input[name="lessonCheckbox"]:checked'))
      .map(checkbox => checkbox.value);

  const filteredLessons = lessonsData.filter(item => selectedLessons.includes(item.Lesson));

  // console.log(filteredLessons)

  // Convert selected lessons to CSV format with headers
  const csvContent = "data:text/csv;charset=utf-8," + headers + filteredLessons.map(item => Object.values(item).join(',')).join('\n');

  // Create a link element and trigger download
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "selected_exams.csv");
  document.body.appendChild(link);
  link.click();
}

document.getElementById("download-button").addEventListener("click", () => {
  downloadCSV();
});
