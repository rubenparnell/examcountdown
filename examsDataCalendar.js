import { exams } from './examsArray.js' ;

function formatExams(exams) {
  const formattedExams = exams.map(exam => {
    const startDate = new Date(exam.date);
    const startTime = exam.time === 'am' ? '09:00' : '13:30';
    const startDateTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), parseInt(startTime.split(':')[0]), parseInt(startTime.split(':')[1]));

    const durationHours = Math.floor(exam.durationMins / 60);
    const durationMinutes = exam.durationMins % 60;

    const endDateTime = new Date(startDateTime.getTime() + (durationHours * 60 + durationMinutes) * 60000);

    const formattedEndTime = endDateTime.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit', second: '2-digit'});
    const formattedStartDate = startDate.toLocaleDateString('en-GB');
    const formattedSubject = exam.subject.replace(/\b\w/g, function(char) {
        return char.toUpperCase();
    }).replace(/([A-Z])/g, ' $1') + " | " + exam.unitTitle;
      
      return {
        "Subject": formattedSubject,
        "Start date": formattedStartDate,
        "Start time": startTime,
        "End time": formattedEndTime,
        "Description": exam.unitCode
      };
  });

  return formattedExams;
}

export const formattedExams = formatExams(exams);