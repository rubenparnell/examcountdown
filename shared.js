export function timeUntilExam(exam) {
    const examDate = exam.date;
    const examDateParts = examDate.split(' '); // Split the date string by space
    const [day, month, year] = examDateParts[1].split('/'); // Split the day, month, and year
    const formattedDate = `20${year}-${month}-${day}`; // Construct the date string in yyyy-mm-dd format

    const examTime = exam.time === "am" ? "09:00" : "13:30"; // Set exam times as specified
    const examDateTime = new Date(`${formattedDate}T${examTime}`);
  
    const now = new Date();
  
    // Ensure exam time is in the future
    if (examDateTime <= now) {
      return "Exam already started/ finished";
    }
  
    const differenceInMilliseconds = examDateTime - now;
    const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((differenceInMilliseconds % (1000 * 60)) / (1000));
  
    return `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;
}

export function convertCamelCaseToWords(inputString) {
  if (inputString == "pe"){
      return "PE"
  } else{
      return inputString.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2').replace(/^\w/, c => c.toUpperCase());
  }
}