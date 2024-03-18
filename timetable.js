import { exams } from './examsArray.js';
import { timeUntilExam } from './shared.js';
import { convertCamelCaseToWords } from './shared.js';

// MENU:
document.getElementById('open-menu-btn').addEventListener('click', function() {
    const sideMenu = document.getElementById('side-menu');

    // Toggle the 'open' class to control visibility and animation
    sideMenu.classList.toggle('open');

    // Toggle the left position and margin of the main content
    if (sideMenu.classList.contains('open')) {
        sideMenu.style.left = '20px';
        sideMenu.style.height = "90vh";
        sideMenu.style.width = '225px';
    } else {
        sideMenu.style.height = "39px";
        sideMenu.style.width = '39px';
    }
});

document.addEventListener('click', function(event) {
    const sideMenu = document.getElementById('side-menu');
    const openMenuBtn = document.getElementById('open-menu-btn');

    // Close the menu if the click is outside the menu and the button
    if (!sideMenu.contains(event.target) && !openMenuBtn.contains(event.target)) {
        sideMenu.classList.remove('open');
        sideMenu.style.height = "39px";
        sideMenu.style.width = '39px';
    }
});

document.getElementById('mathsCheckbox').addEventListener('change', function() {
    updateSubjectVisibility('maths', 'mathsCheckbox');
});

document.getElementById('furtherMathsCheckbox').addEventListener('change', function() {
    updateSubjectVisibility('furtherMaths', 'furtherMathsCheckbox');
});

document.getElementById('englishLiteratureCheckbox').addEventListener('change', function() {
    updateSubjectVisibility('englishLiterature', 'englishLiteratureCheckbox');
});

document.getElementById('englishLanguageCheckbox').addEventListener('change', function() {
    updateSubjectVisibility('englishLanguage', 'englishLanguageCheckbox');
});

document.getElementById('biologyCheckbox').addEventListener('change', function() {
    updateSubjectVisibility('biology', 'biologyCheckbox');
});

document.getElementById('chemistryCheckbox').addEventListener('change', function() {
    updateSubjectVisibility('chemistry', 'chemistryCheckbox');
});

document.getElementById('physicsCheckbox').addEventListener('change', function() {
    updateSubjectVisibility('physics', 'physicsCheckbox');
});

document.getElementById('combinedBiologyCheckbox').addEventListener('change', function() {
    updateSubjectVisibility('combinedBiology', 'combinedBiologyCheckbox');
});

document.getElementById('combinedChemistryCheckbox').addEventListener('change', function() {
    updateSubjectVisibility('combinedChemistry', 'combinedChemistryCheckbox');
});

document.getElementById('combinedPhysicsCheckbox').addEventListener('change', function() {
    updateSubjectVisibility('combinedPhysics', 'combinedPhysicsCheckbox');
});

document.getElementById('germanCheckbox').addEventListener('change', function() {
    updateSubjectVisibility('german', 'germanCheckbox');
});

document.getElementById('frenchCheckbox').addEventListener('change', function() {
    updateSubjectVisibility('french', 'frenchCheckbox');
});

document.getElementById('historyCheckbox').addEventListener('change', function() {
    updateSubjectVisibility('history', 'historyCheckbox');
});

document.getElementById('geographyCheckbox').addEventListener('change', function() {
    updateSubjectVisibility('geography', 'geographyCheckbox');
});

document.getElementById('religiousStudiesCheckbox').addEventListener('change', function() {
    updateSubjectVisibility('religiousStudies', 'religiousStudiesCheckbox');
});

document.getElementById('designTechCheckbox').addEventListener('change', function() {
    updateSubjectVisibility('designTech', 'designTechCheckbox');
});

document.getElementById('engineeringCheckbox').addEventListener('change', function() {
    updateSubjectVisibility('engineering', 'engineeringCheckbox');
});

document.getElementById('foodCheckbox').addEventListener('change', function() {
    updateSubjectVisibility('food', 'foodCheckbox');
});

document.getElementById('dramaCheckbox').addEventListener('change', function() {
    updateSubjectVisibility('drama', 'dramaCheckbox');
});

document.getElementById('musicCheckbox').addEventListener('change', function() {
    updateSubjectVisibility('music', 'musicCheckbox');
});

document.getElementById('peCheckbox').addEventListener('change', function() {
    updateSubjectVisibility('pe', 'peCheckbox');
});

document.getElementById('childDevCheckbox').addEventListener('change', function() {
    updateSubjectVisibility('childDev', 'childDevCheckbox');
});

document.getElementById('mediaStudiesCheckbox').addEventListener('change', function() {
    updateSubjectVisibility('mediaStudies', 'mediaStudiesCheckbox');
});

document.getElementById('computerScienceCheckbox').addEventListener('change', function() {
    updateSubjectVisibility('computerScience', 'computerScienceCheckbox');
});

document.getElementById('businessCheckbox').addEventListener('change', function() {
    updateSubjectVisibility('business', 'businessCheckbox');
});


document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('#side-menu input[type="checkbox"]');
  
    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener('change', function () {
        saveCheckboxState(checkbox.id, checkbox.checked);
        updateSubjectVisibility();
      });
    });
  
    // Load saved checkbox states on page load
    let savedStates = loadSavedCheckboxStates();
  
    // // Initial update of subject visibility
    // updateSubjectVisibility();
});
  
function saveCheckboxState(checkboxId, isChecked) {
// Use localStorage to store checkbox states
const savedStates = JSON.parse(localStorage.getItem('checkboxStates')) || {};
savedStates[checkboxId] = isChecked;
localStorage.setItem('checkboxStates', JSON.stringify(savedStates));
}

function loadSavedCheckboxStates() {
    const savedStates = JSON.parse(localStorage.getItem('checkboxStates')) || {};
    
    // Apply saved checkbox states
    for (const checkboxId in savedStates) {
        const checkbox = document.getElementById(checkboxId);
        if (checkbox) {
        checkbox.checked = savedStates[checkboxId];
        }
    }
    return savedStates
    }


// TABLE:
function updateSubjectVisibility() {
    const checkboxes = document.querySelectorAll('#side-menu input[type="checkbox"]');

    checkboxes.forEach(function (checkbox, index) {
        // Get the corresponding row id from the checkbox
        const subjectId = checkbox.id.replace('Checkbox', ''); // Remove 'Checkbox' from the checkbox id
        const subjectRow = document.getElementById(subjectId);

        // Show or hide the row based on checkbox state
        if (subjectRow) {
            subjectRow.style.display = checkbox.checked ? 'table-row' : 'none';
        }
    });
}

function updateTable() {
    let savedStates = loadSavedCheckboxStates();
    exams.forEach(exam => {
        const subject = exam.subject;
        if (savedStates[subject+"Checkbox"] == true){
            const row = document.createElement('tr');
            const convertedSubject = convertCamelCaseToWords(subject);
            const countdown = timeUntilExam(exam);
            row.setAttribute('id', subject);

            row.innerHTML = `
                <td>${countdown}</td>
                <td>${exam.date}</td>
                <td>${exam.time}</td>
                <td>${convertedSubject}</td>
                <td>${exam.unitCode}</td>
                <td>${exam.unitTitle}</td>
                <td>${exam.board}</td>
                <td>${exam.durationMins}</td>
            `;
            document.getElementById('examsTableBody').appendChild(row);
        }
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
}, 1000);
