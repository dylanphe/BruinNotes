// import dataToCourses from "./datatocourse";
// For some reason the import statement is not working for {"test": "jest"} 
// and {"test": "react-scripts test"} is not working 


function compareTerms(term1, term2) { 
  function compareQuarter(q1, q2) { 
    const qToInt = {'Winter': 0, 'Spring': 1, 'Summer': 2, 'Fall': 3};
    const q1int = qToInt[q1], q2int = qToInt[q2];
    return q1int - q2int;
  }
  // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split 
  // ASSUME a "quarter year" string. (ASSUME input validation)
  const [qtr1, yr1] = term1.split(' ');
  const [qtr2, yr2] = term2.split(' ');
  if (yr1 !== yr2) {
    return yr1 - yr2;
  } else {
    return compareQuarter(qtr1, qtr2);
  }
}

const dataToCourses = (data, compareTerms) => {
  if (!data.length) {return [];}
  // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  const courses = {}; // intermediate data structure: {"John Doe": {"terms": [], "colorCode": 3}}
  const courseList = [];
  data.forEach(element => {
    if (element.instructor !== undefined) {
      const currentInstructor = element.instructor;
      if (courses[currentInstructor] === undefined) {  // If the current instructor is not in the courses object, initialize it
        courses[currentInstructor] = {"terms": (element["term"] === "" ? [] : [element["term"]]), "colorCode": element["colorCode"]};
      } else {  // If the current instructor is already initialized, then just update the terms (since we assumed the colorCode is unchanged)
        if (element["term"] !== "") {
          courses[currentInstructor]["terms"].push(element["term"]);
        }
      }
    }
  });
  // Sort the terms 
  for (const instructor in courses) {
    courses[instructor]["terms"].sort(compareTerms);
    courses[instructor]["terms"].reverse();
    const courseListElem = {"instructor": instructor, ...(courses[instructor])};
    courseList.push(courseListElem);
  }

  // console.log(courses);
  return courseList;
}

test('convert db data to course list', () => {
  const data1 = [{
    "courseName": "COM SCI 130",
    "instructor": "Kim, Miryung",
    "term": "Fall 2020",
    "colorCode": 1,
  }, {
    "courseName": "COM SCI 130",
    "instructor": "DJ, JAYS",
    "term": "Fall 2022", 
    "colorCode": 2,
  }, {
    "courseName": "COM SCI 130",
    "instructor": "Kim, Miryung",
    "term": "Fall 2021",
    "colorCode": 1,
  }, {
    "courseName": "COM SCI 130",
    "instructor": "DJ, JAYS",
    "term": "Spring 2022",
    "colorCode": 2,
  }];
  const result1 = [{
    "instructor": "Kim, Miryung",
    "terms": ["Fall 2021", "Fall 2020"], 
    "colorCode": 1
  }, {
    "instructor": "DJ, JAYS",
    "terms": ["Fall 2022", "Spring 2022"],
    "colorCode": 2
  }];

  const data2 = [{
    "courseName": "CS130", 
    "instructor": "Jane Doe", 
    "term": "",
    "colorCode": 1
  }];
  const result2 = [{
    "instructor": "Jane Doe",
    "terms": [],
    "colorCode": 1
  }];

  const data3 = data1.concat([{
    "courseName": "CS130",
    "instructor": "DJ, JAYS",
    "term": "Winter 2022",
    "colorCode": 2
  }, {
    "courseName": "CS130",
    "instructor": "DJ, JAYS",
    "term": "Summer 2022",
    "colorCode": 2
  }]);

  const result3 = [{
    "instructor": "Kim, Miryung",
    "terms": ["Fall 2021", "Fall 2020"], 
    "colorCode": 1
  }, {
    "instructor": "DJ, JAYS",
    "terms": ["Fall 2022", "Summer 2022", "Spring 2022","Winter 2022"],
    "colorCode": 2
  }];

  expect(dataToCourses(data1, compareTerms)).toEqual(result1);
  expect(dataToCourses(data2, compareTerms)).toEqual(result2);
  expect(dataToCourses(data3, compareTerms)).toEqual(result3);
});

test('convert db data to course list, failure due to unexpected input', () => {
  // Note that this input cannot exist in the database because the backend API checks the existence of all fields
  const data2 = [{
    "courseName": "CS130", 
    "instructor": "Jane Doe", 
    // "term": "",
    "colorCode": 1
  }];
  const result2 = [{
    "instructor": "Jane Doe",
    "terms": [undefined],
    "colorCode": 1
  }];
  expect(dataToCourses(data2, compareTerms)).toEqual(result2);
});


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

  // All fields required 

  // Validate instructor
  result["isInstructorValid"] = (input.instructor !== undefined && input.instructor !== "");
  result["instructorValidateMessage"] = (result["isInstructorValid"] ? "" : "Name is required"); 
  
  // Validate quarter 
  if (input.quarter === undefined) {
    result["isQuarterValid"] = false; 
    result["quarterValidateMessage"] = "Quarter is required";
  } 
  else {
    result["isQuarterValid"] = true; // The input format is asserted by the form =)
    result["quarterValidateMessage"] = "";
  } 

  // Validate year
  if (input.year === undefined) {
    result["isYearValid"] = false;
    result["yearValidateMessage"] = "Year is required";
  } 
  else {
    result["isYearValid"] = validateYear(input.year);
    result["yearValidateMessage"] = ( result["isYearValid"] ? "" : "Year format: yyyy");
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

test('validate course page user input', () => {
  const inputs = [
    {}, // f
    {"instructor": ""}, // f
    {"instructor": "ABC"},  // f
    {"instructor": "ABC", "quarter": "Spring"}, // f
    {"instructor": "ABC", "quarter": "Spring", "year": "2000"}, // t
    {"instructor": "ABC", "year": "2000"}, // f
    {"instructor": "ABC", "quarter": "Spring", "year": "200"}, // f
    {"instructor": "ABC", "year": "200"}, //f
    {"year": "2000"}, // f
    {"year": "200"}, // f
    {"quarter": "Fall"}, // f
    {"quarter": "Fall", "year": "2000"}, // f
    {"quarter": "Fall", "year": "200"}, // f
  ];
  const results = inputs.map(input => validateAddCourseInput(input));
  
  expect(results[1].isInstructorValid || results[1].isQuarterValid || results[1].isYearValid).toEqual(false);
  expect(!results[2].isInstructorValid || results[2].isQuarterValid || results[2].isYearValid).toEqual(false);
  expect(results[3].isInstructorValid && results[3].isQuarterValid && results[3].isYearValid).toEqual(false);
  expect(results[4].isInstructorValid && results[4].isQuarterValid && results[4].isYearValid).toEqual(true);
  expect(results[6].isYearValid).toEqual(false);
});