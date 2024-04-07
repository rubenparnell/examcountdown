const csvData = `
09/05/2024,am,AQA,Religious Studies,8062/1,Paper 1,105,9:00,10:45:00,Religious Studies | Paper 1,09/05/2024
09/05/2024,am,OCR,Engineering,R038,Engineering Design,75,9:00,10:15:00,Engineering | Engineering Design,09/05/2024
09/05/2024,pm,Edexcel,Drama,1DR0 03,Theatre Makers in Practice,105,13:30,15:15:00,Drama | Theatre Makers in Practice,09/05/2024
10/05/2024,am,AQA,Combined Biology,8464/B/1F/H,Paper 1 Tier F/H,75,9:00,10:15:00,Combined Biology | Paper 1 Tier F/H,10/05/2024
10/05/2024,am,AQA,Biology,8461/1F/H,Paper 1 Tier F/H,105,9:00,10:45:00,Biology | Paper 1 Tier F/H,10/05/2024
10/05/2024,pm,Edexcel,German,1GN0 1F/H,Listening & Understanding,35,13:30,14:05:00,German | Listening & Understanding,10/05/2024
10/05/2024,pm,Edexcel,German,1GN0 3F/H,Reading & Understanding,45,13:30,14:15:00,German | Reading & Understanding,10/05/2024
13/05/2024,am,AQA,English Literature,8702/1M,Paper 1,105,9:00,10:45:00,English Literature | Paper 1,13/05/2024
13/05/2024,pm,WJEC,Media Studies,C680U10-1,Component 1 (EDUQAS),90,13:30,15:00:00,Media Studies | Component 1 (EDUQAS),13/05/2024
14/05/2024,am,Edexcel,French,1FR0 1F/H,Listening & Understanding,35,9:00,09:35:00,French | Listening & Understanding,14/05/2024
14/05/2024,am,Edexcel,French,1FR0 3F/H,Reading & Understanding,45,9:00,09:45:00,French | Reading & Understanding,14/05/2024
14/05/2024,pm,Edexcel,Business,1BS0 01,Investigating Small Business,105,13:30,15:15:00,Business | Investigating Small Business,14/05/2024
15/05/2024,am,AQA,History,8145/1B,Paper 1,120,9:00,11:00:00,History | Paper 1,15/05/2024
15/05/2024,pm,AQA,Computer Science,8525/1B,Paper 1,120,13:30,15:30:00,Computer Science | Paper 1,15/05/2024
16/05/2024,am,Edexcel,Maths,1MA1 1F/H,Paper 1 - Non-Calculator,90,9:00,10:30:00,Maths | Paper 1 - Non-Calculator,16/05/2024
16/05/2024,pm,AQA,Religious Studies,8062/2,Paper 2,105,13:30,15:15:00,Religious Studies | Paper 2,16/05/2024
17/05/2024,am,AQA,Combined Chemistry,8464/C/1F/H,Paper 1 Tier F/H,75,9:00,10:15:00,Combined Chemistry | Paper 1 Tier F/H,17/05/2024
17/05/2024,am,AQA,Chemistry,8462/1F/H,Paper 1 Tier F/H,105,9:00,10:45:00,Chemistry | Paper 1 Tier F/H,17/05/2024
17/05/2024,pm,AQA,Geography,8035/1,Paper 1,90,13:30,15:00:00,Geography | Paper 1,17/05/2024
20/05/2024,am,AQA,English Literature,8702/2,Paper 2,135,9:00,11:15:00,English Literature | Paper 2,20/05/2024
20/05/2024,pm,WJEC,Media Studies,C680U10-1,Component 2 (EDUQAS),90,13:30,15:00:00,Media Studies | Component 2 (EDUQAS),20/05/2024
21/05/2024,am,Edexcel,German,1GN0 4F/H,Writing,75,9:00,10:15:00,German | Writing,21/05/2024
21/05/2024,pm,AQA,Computer Science,8520/2,Paper 2,105,13:30,15:15:00,Computer Science | Paper 2,21/05/2024
21/05/2024,pm,OCR,Child Development,R057,Health & Wellbeing in Child Dev,75,13:30,14:45:00,Child Development | Health & Wellbeing in Child Dev,21/05/2024
22/05/2024,am,AQA,Combined Physics,8464/P/1F/H,Paper 1 Tier F/H,75,9:00,10:15:00,Combined Physics | Paper 1 Tier F/H,22/05/2024
22/05/2024,am,AQA,Physics,8463/1F/H,Paper 1 Tier F/H,105,9:00,10:45:00,Physics | Paper 1 Tier F/H,22/05/2024
22/05/2024,pm,AQA,PE,8582/1,Paper 1,75,13:30,14:45:00,PE | Paper 1,22/05/2024
23/05/2024,am,AQA,English Language,8700/1,Paper 1,105,9:00,10:45:00,English Language | Paper 1,23/05/2024
24/05/2024,am,Edexcel,French,1FR0 4F/H,Writing,75,9:00,10:15:00,French | Writing,24/05/2024
03/06/2024,am,Edexcel,Maths,1MA1 2F/H,Paper 2 - Calculator,90,9:00,10:30:00,Maths | Paper 2 - Calculator,03/06/2024
03/06/2024,pm,AQA,PE,8582/2,Paper 2,75,13:30,14:45:00,PE | Paper 2,03/06/2024
04/06/2024,am,AQA,History,8145/2A,Paper 2,120,9:00,11:00:00,History | Paper 2,04/06/2024
05/06/2024,am,AQA,Geography,8035/2,Paper 2,90,9:00,10:30:00,Geography | Paper 2,05/06/2024
05/06/2024,pm,Edexcel,Business,1BS0 02,Building a Business,105,13:30,15:15:00,Business | Building a Business,05/06/2024
06/06/2024,am,AQA,English Language,8700/2,Paper 2,105,9:00,10:45:00,English Language | Paper 2,06/06/2024
07/06/2024,am,AQA,Combined Biology,8464/B/2F/H,Paper 2 Tier F/H,75,9:00,10:15:00,Combined Biology | Paper 2 Tier F/H,07/06/2024
07/06/2024,am,AQA,Biology,8461/2F/H,Paper 2 Tier F/H,105,9:00,10:45:00,Biology | Paper 2 Tier F/H,07/06/2024
10/06/2024,am,Edexcel,Maths,1MA1 3F/H,Paper 3 - Calculator,90,9:00,10:30:00,Maths | Paper 3 - Calculator,10/06/2024
11/06/2024,am,AQA,Combined Chemistry,8464/C/2F/H,Paper 2 Tier F/H,75,9:00,10:15:00,Combined Chemistry | Paper 2 Tier F/H,11/06/2024
11/06/2024,am,AQA,Chemistry,8462/2F/H,Paper 2 Tier F/H,105,9:00,10:45:00,Chemistry | Paper 2 Tier F/H,11/06/2024
11/06/2024,pm,AQA,Further Maths,8365/1,Paper 1,105,13:30,15:15:00,Further Maths | Paper 1,11/06/2024
14/06/2024,am,AQA,Geography,8035/3,Paper 3,75,9:00,10:15:00,Geography | Paper 3,14/06/2024
14/06/2024,pm,AQA,Combined Physics,8464/P/2F/H,Paper 2 Tier F/H,75,13:30,14:45:00,Combined Physics | Paper 2 Tier F/H,14/06/2024
14/06/2024,pm,AQA,Physics,8463/2F/H,Paper 2 Tier F/H,105,13:30,15:15:00,Physics | Paper 2 Tier F/H,14/06/2024
17/06/2024,pm,Edexcel,Music,1MU0 03,Appraising,105,13:30,15:15:00,Music | Appraising,17/06/2024
18/06/2024,am,AQA,Design Technology,8552/W,Written Paper,120,9:00,11:00:00,Design Technology | Written Paper,18/06/2024
19/06/2024,am,AQA,Food,8585,Food Preparation and Nutrition,105,9:00,10:45:00,Food | Food Preparation and Nutrition,19/06/2024
19/06/2024,am,AQA,Further Maths,8365/2,Paper 2,105,9:00,10:45:00,Further Maths | Paper 2,19/06/2024
`;


  // Function to parse a single CSV row
  function parseCSVRow(row) {
    // Check if the row is empty (only whitespace)
    if (!row.trim()) {
      return null; // Skip empty rows
    }
    const [date, time, board, exam, unitCode, unitTitle, durationMins, startTime, endTime, subject, startDate] = row.split(",");
    return {
      date,
      time,
      board,
      exam,
      unitCode,
      unitTitle,
      durationMins: parseInt(durationMins),
      "Start time": startTime,
      "End time": endTime,
      Subject: subject,
      "Start date": startDate,
    };
  }
  
  // Parse all CSV rows, filtering out empty ones
  const allExams = csvData.split("\n").slice(1).map(parseCSVRow).filter(Boolean); // Skip header (empty row) and filter nulls
  
  // Extract unique subjects
  const uniqueSubjects = [...new Set(allExams.map((exam) => exam.Subject))];
  
  // Convert subjects to desired format
  export const subjectData = uniqueSubjects.map((subject) => {
    const firstExam = allExams.find((exam) => exam.Subject === subject);
    return {
      ...firstExam, // Include all properties from the first exam object
    };
  });  
  

console.log(subjectData); // This will display all subjects in the desired format
