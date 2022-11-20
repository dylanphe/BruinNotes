
/* Covert the input format to the output format 
    para:   data: Object 
            compareTerms: (string, string) --> bool
    return: courseList: Array */
// input format as follows: 
const data =  [{
    "courseName": "COM SCI 130",
    "instructor": "Kim, Miryung",
    "term": "Fall 2022",
    "colorCode": 1,
    "notes": [/*...*/],
  }, {
    "courseName": "COM SCI 130",
    "instructor": "Kim, Miryung",
    "term": "Fall 2021",
    "colorCode": 1,
    "notes": [/*...*/],
  }, {
    "courseName": "COM SCI 130",
    "instructor": "DJ, JAYS",
    "term": "Spring 2022",
    "colorCode": 2,
    "notes": [/*...*/],
  }, {
    "courseName": "COM SCI 130",
    "instructor": "DJ, JAYS",
    "term": "Spring 2021", 
    "colorCode": 2,
    "notes": [/*...*/],
  }, {
    "courseName": "COM SCI 130",
    "instructor": "John Doe", 
    "term": "",
    "colorCode": 3,
    "notes": [/*...*/],
}, {
  "courseName": "COM SCI 130",
  "instructor": "John Doe", 
  "term": "Fall 2000",
  "colorCode": 3,
  "notes": [/*...*/],
}, {
  "courseName": "COM SCI 130",
  "instructor": "Jane Doe", 
  "term": "",
  "colorCode": 3,
  "notes": [/*...*/],
}, {
  "courseName": "COM SCI 130",
  "instructor": "John Doe", 
  "term": "Winter 2001",
  "colorCode": 3,
  "notes": [/*...*/],
}, {
  "courseName": "COM SCI 130",
  "instructor": "John Doe", 
  "term": "Spring 2024",
  "colorCode": 3,
  "notes": [/*...*/],
}, {
  "courseName": "COM SCI 130",
  "instructor": "John Doe", 
  "term": "Summer 2000",
  "colorCode": 3,
  "notes": [/*...*/],
}];

// output format as follows: 
const courses =  [{
    "instructor": "Kim, Miryung",
    "terms": ["Fall 2022", "Fall 2021"],
    "colorCode": 1,
  }, {
    "instructor": "DJ, JAYS",
    "terms": ["Spring 2022", "Fall 2022"],
    "colorCode": 2,
  }, {
    "instructor": "John Doe", 
    "terms": [],
    "colorCode": 3,
}]
// Assume one instructor has only one unique colorCode 
// Assume the fields "instructor", "term", "colorCode" exists for each element in `data`
// Further improvement (if we have time) is performing binary search when inserting to the term array using the comparator. 
const dataToCourses = (data, compareTerms) => {
  if (!data.length) {return [];}
  // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  const courses = {}; // intermediate data structure: {"John Doe": {"terms": [], "colorCode": 3}}
  const courseList = [];
  data.forEach(element => {
    const currentInstructor = element.instructor;
    if (courses[currentInstructor] === undefined) {  // If the current instructor is not in the courses object, initialize it
      courses[currentInstructor] = {"terms": (element["term"] === "" ? [] : [element["term"]]), "colorCode": element["colorCode"]};
    } else {  // If the current instructor is already initialized, then just update the terms (since we assumed the colorCode is unchanged)
      if (element["term"] !== "") {
        courses[currentInstructor]["terms"].push(element["term"]);
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

export default dataToCourses;