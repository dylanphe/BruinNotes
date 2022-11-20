
// Validate year format "yyyy"
function validateYear(year) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
  const yearPattern = '^[1-2][0-9]{3}$';
  return (year.match(yearPattern) !== null);
}


/* Validate input for Add Professor or Quarter 
  para:   Object
  return: {"isInstructorValid": bool, "isQuarterValid": bool, "isYearValid": bool, 
            "instructorValidateMessage": String, "quarterValidateMessage": String, "yearValidateMessage": String, }

Expected input format:
{ "instructor": "...", "quarter": "Fall"/"Winter"/"Spring"/"Summer", "year": "1000" to "2999" }
the instructor field is required. quarter and year should be both exist or both nonexist

This function has redudant logic, but it prevents bugs 
*/
function validateAddCourseInput(input) {
  // The instructor field is required 
  let result = {};

  // Validate instructor
  result["isInstructorValid"] = (input.instructor !== undefined && input.instructor !== "");
  result["instructorValidateMessage"] = (result["isInstructorValid"] ? "" : "Name is required"); 
  
  // Validate quarter and year
  // quarter is valid exactly when (quarter and year are both undefined) or ((quarter and year are both defined) and (quarter is either "Fall" or "Winter" or "Spring" or "Summer"))
  if (input.quarter === undefined && input.year === undefined) {
    result["isQuarterValid"] = true; 
    result["isYearValid"] = true;
    result["quarterValidateMessage"] = "";
    result["yearValidateMessage"] = "";
  } 
  else if (input.quarter !== undefined && input.year !== undefined) {
    result["isQuarterValid"] = true; // The input format is asserted by the form =)
    result["quarterValidateMessage"] = "";
    result["isYearValid"] = validateYear(input.year);
    result["yearValidateMessage"] = ( result["isYearValid"] ? "" : "format: yyyy");
  } 
  else if (input.quarter !== undefined && input.year === undefined) {
    result["isQuarterValid"] = true; // The input format is asserted by the form =)
    result["quarterValidateMessage"] = "";
    result["isYearValid"] = false;
    result["yearValidateMessage"] = "year is required for the corresponding quarter";
  } 
  else if (input.quarter === undefined && input.year !== undefined) {
    result["isQuarterValid"] = false; 
    result["quarterValidateMessage"] = "quarter is required for the corresponding year";
    result["isYearValid"] = validateYear(input.year);
    result["yearValidateMessage"] = ( result["isYearValid"] ? "" : "format: yyyy");
  } 
  else {
    console.error("Hey the logic is wrong");
    return {};
  }

  // console.log(result);
  const fields = ["isInstructorValid", "isQuarterValid", "isYearValid", 
  "instructorValidateMessage", "quarterValidateMessage", "yearValidateMessage"];

  const fieldCheck = fields.every(field => Object.hasOwn(result, field));
  if (!fieldCheck) {
    console.error("Missing field(s) in result");
    return {};
  }

  return result;
}

export default validateAddCourseInput;
