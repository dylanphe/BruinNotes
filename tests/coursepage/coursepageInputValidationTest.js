import {validateAddCourseInput} from "../../client/src/components/class_system/validateInput.js";

let inputs = [
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

inputs.map(input => console.log(input, validateAddCourseInput(input)));