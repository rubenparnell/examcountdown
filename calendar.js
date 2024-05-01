import { formattedExams as lessonsData } from './examsDataCalendar.js' ;

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
  // const uniqueLessons = Array.from(new Set(lessonsData.map(item => item.Lesson)));
  const tbody = document.querySelector("#lessonTable tbody");
  tbody.innerHTML = "";

  // console.log(uniqueLessons)

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

    console.log(uniqueLessons)

    if (uniqueLessons=="englishLanguage" || uniqueLessons=="englishLiterature" || uniqueLessons=="maths"){
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
  const headers = "Subject,Start date,Start time,End time,Description\n"; // Add headers
  
  const selectedLessons = Array.from(document.querySelectorAll('input[name="lessonCheckbox"]:checked'))
      .map(checkbox => checkbox.value);

  const filteredLessons = lessonsData.filter(item => selectedLessons.includes(item.Lesson));

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
