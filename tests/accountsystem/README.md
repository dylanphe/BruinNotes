# Account System Unit Test

## Testsuite 1 - Validating User Inputs

Check whether the user input validation is working correctly on their edge cases

### Testcase1 - Full Name Validation

**Objective**: To check whether the validation of user's full name through regex correctly identified when the user enter Invalid Name without a first or last name.

**Code**:
```json 
  function validateFullName() {
        var namePattern = new RegExp("[A-Za-z]+ [A-Za-z]+");
        if (!fullname.match(namePattern)) {
            return false;
        }
        return true;
    }
```

**Possible Path**: 2

**Path Conditions**: Does the inputted fullname have both First and Last Name?
```json 
(match(namePattern)) OR (!match(namePattern))
```

**Expected Outcome**: 
```json 
(fullname.match(namePattern) AND return true) OR (!fullname.match(namePattern) AND return false)
```

**Test Input**: 
```json
validateFullName("Jane") -> false
validateFullName("Jane Doe") -> true
```

**Statements Coverage**: 100% (All statements are executed)

**Branches Coverage**: 100% (The only branch is exercised by both test cases)

**Paths Coverage**: 100% (Both Paths are exercised)

<br>

### Testcase2 - UID Validation

**Objective**: To check whether the validation of user's UID through regex correctly identified when the user enter Invalid Name without a first or last name.

**Code**:
```json 
  function validateUID() {
      var uidPattern = new RegExp("^\\d{9}$");
      if (!uid.match(uidPattern)) {
          return false;
      }
      return true;
  }
```

**Possible Paths**: 2

**Path Conditions**: does the inputted UID have 9 digits?
```json 
(uid.match(uidPattern)) OR (!uid.match(uidPattern))
```

**Expected Outcome**: 
```json 
(uid.match(namePattern) AND return true) OR (!uid.match(namePattern) AND return false)
```

**Test Input**: 
```json
validateUID("12345678") -> false
validateUID("123456789") -> Expected true
```

**Statements Coverage**: 100% (All statements are executed)

**Branches Coverage**: 100% (The only branch is exercised by both test cases)

**Paths Coverage**: 100% (Both Paths are exercised)

<br>

### Testcase3 - Email Validation

**Objective**: To check whether the validation of user's Email through regex correctly identified when the user enter Invalid Name without a first or last name.

**Code**:
```json 
  function validateEmail() {
      var emailPattern = new RegExp("^[\\w-._]+@([\\w-]+.)+ucla.edu$");
      if (!email.match(emailPattern)) {
          return false;
      }
      return true;
  }
```

**Possible Paths**: 2

**Path Conditions**: Does the inputted email have the suffix ".ucla.edu"?
```json 
(email.match(emailPattern)) OR (!email.match(uidPattern))
```

**Expected Outcome**: 
```json 
(email.match(emailPattern) AND return true) OR (!email.match(emailPattern) AND return false)
```

**Test Input**: 
```json
validateEmail(jane@gmail.com), validateEmail(jane@ucla.edu) -> false
validateEmail(jane@g.ucla.edu), validateEmail(jane@cs.ucla.edu) -> true
```

**Statements Coverage**: 100% (All statements are executed)

**Branches Coverage**: 100% (The only branch is exercised by both test cases)

**Paths Coverage**: 100% (Both Paths are exercised)

<br>

### Testcase4 - Password Validation

**Objective**: To check whether the validation of user's Email through regex correctly identified when the user enter Invalid Name without a first or last name.

**Code**:
```json 
  function validatePassword() {
      var passwordPattern = new RegExp("^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*[a-zA-Z0-9!@#$%^&*]{6,16}$");
      if (!password.match(passwordPattern)) {
          return false;
      }
      return true;
  }
```

**Possible Paths**: 2

**Path Conditions**: Does the inputted Password satisfy the conditions listed?
(Password should contain at least 6 characters consist of one uppercase letter, one digit, and one special symbols (!@#$%^&*))
```json 
(password.match(passwordPattern)) OR (!password.match(passwordPattern))
```

**Expected Outcome**: 
```json 
(password.match(passwordPattern) AND return true) OR (!password.match(passwordPattern) AND return false)
```

**Test Input**: 
```json 
validatePassword("12345678") -> false,
validatePassword("Mypasswordis123!") -> true
```

**Statements Coverage**: 100% (All statements are executed)

**Branches Coverage**: 100% (The only branch is exercised by both test cases)

**Paths Coverage**: 100% (Both Paths are exercised)

<br>

### Testsuite 1

**Objective**: To check whether the all of the testcases above work correctly.

**Code**:
```json 
  function handleSignupValidation() {
      //if users left any fields empty upon hitting signup
      if(!fullname || !uid || !email || !password) {
          alert('Please enter all fields.');
          return false;
      }
      else {
          if(!validateFullName()) {
              alert('Please enter both FRIST NAME and LAST NAME.');
              return false;
          } else if (!validateUID()) {
              alert('Please enter a valid UID.');
              return false;
          } else if (!validateEmail()) {
              alert('Please enter a valid UCLA Email Address.');
              return false;
          } else if (!validatePassword()){
              alert('Please enter a valid password.');
              return false;
          } else {
              return true;
          }
      }
  }
```

**Possible Paths**: 33 

**Path Conditions**: Does the user input satifies all test cases above?
```json 
(!fullname || !uid || !email || !password) OR 

((fullname && uid && email && password) AND (validateFullName OR !validateFullName) AND (validateUID OR !validateUID) AND (validateEmail OR !validateEmail) AND (validatePassword OR !validatePassword))
```

**Expected Outcome**: 
```json 
((!fullname || !uid || !email || !password) AND return false) OR

((fullname && uid && email && password) AND (!validateFullName OR !validateUID OR !validateEmail OR !validatePassword) AND return false) OR 

((fullname && uid && email && password) AND (validateFullName && validateUID && validateEmail && validatePassword) AND return true)
```

**Test Input**: 
```json 
[Jane, 12345678, janedoe@gmail.com, khjdkj] -> false
[Jane, 123456789, janedoe@g.ucla.com, Mypasswordis123!] -> false
[Jane Doe, 12345678, janedoe@g.ucla.com, Mypasswordis123!] -> false
[Jane Doe, 123456789, janedoe@gmail.com, Mypasswordis123!] -> false
[Jane Doe, 123456789, janedoe@g.ucla.com, Mypasswordis123] -> false
[Jane Doe, 123456789, janedoe@g.ucla.com, Mypasswordis123!] -> true
```

**Statements Coverage**: 100% (All statements are executed)

**Branches Coverage**: 100% (All branches are exercised by the test inputs above)

**Paths Coverage**: 18.18% or (6/33) (Both Paths are exercised)

<br>

## Testsuite 1 - Invalidating User Inputs

Check whether the user input validation is working correctly on their edge cases

### Testcase1 - Full Name Validation

**Objective**: To check whether the validation of user's full name through regex correctly identified when the user enter Invalid Name without a first or last name.

**Code**:
```json 
  function validateFullName() {
        var namePattern = new RegExp("[A-Za-z]+ [A-Za-z]+");
        if (!fullname.match(namePattern)) {
            return false;
        }
        return true;
    }
```

**Possible Path**: 2

**Path Conditions**: Does fthe inputted fullname have both First and Last Name?
```json 
(match(namePattern)) OR (!match(namePattern))
```

**Expected Outcome**: 
```json 
(fullname.match(namePattern) AND return true) OR (!fullname.match(namePattern) AND return false)
```

**Test Input**: 
```json
validateFullName("Jane") -> false
validateFullName("Jane Doe") -> true
```

**Statements Coverage**: 100% (All statements are executed)

**Branches Coverage**: 100% (The only branch is exercised by both test cases)

**Paths Coverage**: 100% (Both Paths are exercised)

<br>

### Testcase2 - UID Validation

**Objective**: To check whether the validation of user's UID through regex correctly identified when the user enter Invalid Name without a first or last name.

**Code**:
```json 
  function validateUID() {
      var uidPattern = new RegExp("^\\d{9}$");
      if (!uid.match(uidPattern)) {
          return false;
      }
      return true;
  }
```

**Possible Paths**: 2

**Path Conditions**: does the inputted UID have 9 digits?
```json 
(uid.match(uidPattern)) OR (!uid.match(uidPattern))
```

**Expected Outcome**: 
```json 
(uid.match(namePattern) AND return true) OR (!uid.match(namePattern) AND return false)
```

**Test Input**: 
```json
validateUID("12345678") -> false
validateUID("123456789") -> Expected true
```

**Statements Coverage**: 100% (All statements are executed)

**Branches Coverage**: 100% (The only branch is exercised by both test cases)

**Paths Coverage**: 100% (Both Paths are exercised)

<br>

### Testcase3 - Email Validation

**Objective**: To check whether the validation of user's Email through regex correctly identified when the user enter Invalid Name without a first or last name.

**Code**:
```json 
  function validateEmail() {
      var emailPattern = new RegExp("^[\\w-._]+@([\\w-]+.)+ucla.edu$");
      if (!email.match(emailPattern)) {
          return false;
      }
      return true;
  }
```

**Possible Paths**: 2

**Path Conditions**: Does the inputted email have the suffix ".ucla.edu"?
```json 
(email.match(emailPattern)) OR (!email.match(uidPattern))
```

**Expected Outcome**: 
```json 
(email.match(emailPattern) AND return true) OR (!email.match(emailPattern) AND return false)
```

**Test Input**: 
```json
validateEmail(jane@gmail.com), validateEmail(jane@ucla.edu) -> false
validateEmail(jane@g.ucla.edu), validateEmail(jane@cs.ucla.edu) -> true
```

**Statements Coverage**: 100% (All statements are executed)

**Branches Coverage**: 100% (The only branch is exercised by both test cases)

**Paths Coverage**: 100% (Both Paths are exercised)

<br>

### Testcase4 - Password Validation

**Objective**: To check whether the validation of user's Email through regex correctly identified when the user enter Invalid Name without a first or last name.

**Code**:
```json 
  function validatePassword() {
      var passwordPattern = new RegExp("^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*[a-zA-Z0-9!@#$%^&*]{6,16}$");
      if (!password.match(passwordPattern)) {
          return false;
      }
      return true;
  }
```

**Possible Paths**: 2

**Path Conditions**: Does the inputted Password satisfy the conditions listed?
(Password should contain at least 6 characters consist of one uppercase letter, one digit, and one special symbols (!@#$%^&*))
```json 
(password.match(passwordPattern)) OR (!password.match(passwordPattern))
```

**Expected Outcome**: 
```json 
(password.match(passwordPattern) AND return true) OR (!password.match(passwordPattern) AND return false)
```

**Test Input**: 
```json 
validatePassword("12345678") -> false,
validatePassword("Mypasswordis123!") -> true
```

**Statements Coverage**: 100% (All statements are executed)

**Branches Coverage**: 100% (The only branch is exercised by both test cases)

**Paths Coverage**: 100% (Both Paths are exercised)

<br>

### Testsuite

**Objective**: To check whether all of the testcases above work correctly.

**Code**:
```json 
  function handleSignupValidation() {
      //if users left any fields empty upon hitting signup
      if(!fullname || !uid || !email || !password) {
          alert('Please enter all fields.');
          return false;
      }
      else {
          if(!validateFullName()) {
              alert('Please enter both FRIST NAME and LAST NAME.');
              return false;
          } else if (!validateUID()) {
              alert('Please enter a valid UID.');
              return false;
          } else if (!validateEmail()) {
              alert('Please enter a valid UCLA Email Address.');
              return false;
          } else if (!validatePassword()){
              alert('Please enter a valid password.');
              return false;
          } else {
              return true;
          }
      }
  }
```

**Possible Paths**: 33 

**Path Conditions**: Does the user input satifies all test cases above?
```json 
(!fullname || !uid || !email || !password) OR 

((fullname && uid && email && password) AND (validateFullName OR !validateFullName) AND (validateUID OR !validateUID) AND (validateEmail OR !validateEmail) AND (validatePassword OR !validatePassword))
```

**Expected Outcome**: 
```json 
((!fullname || !uid || !email || !password) AND return false) OR

((fullname && uid && email && password) AND (!validateFullName OR !validateUID OR !validateEmail OR !validatePassword) AND return false) OR 

((fullname && uid && email && password) AND (validateFullName && validateUID && validateEmail && validatePassword) AND return true)
```

**Test Input**: 
```json 
[Jane, 12345678, janedoe@gmail.com, khjdkj] -> false
[Jane, 123456789, janedoe@g.ucla.com, Mypasswordis123!] -> false
[Jane Doe, 12345678, janedoe@g.ucla.com, Mypasswordis123!] -> false
[Jane Doe, 123456789, janedoe@gmail.com, Mypasswordis123!] -> false
[Jane Doe, 123456789, janedoe@g.ucla.com, Mypasswordis123] -> false
[Jane Doe, 123456789, janedoe@g.ucla.com, Mypasswordis123!] -> true
```

**Statements Coverage**: 100% (All statements are executed)

**Branches Coverage**: 100% (All branches are exercised by the test inputs above)

**Paths Coverage**: 18.18% or (6/33) (Both Paths are exercised)

<br>

## Testsuite 2 - Unique UID and Email

Check whether the UID and Email inputted by the user are unique in database.

### Testcase1 - Unique UID

**Objective**: To check whether the inputted UID is unique. It'll send a request to the backend to check in the database using API get(PATH/checkuid/"uid").

**Code**:
```json 
      async function uniqueUID() {
        const getUnique = async() => {
            let unique;
            unique = await axios.get('http://127.0.0.1:8000/checkuid/'+uid);
            return unique.data;
        };
        
        const globalUnique = await getUnique();
        if ((await globalUnique) === false) {
            alert("UID already exist.")
            return false;
        }
        else {
            return true;
        }
    }
```

**Possible Path**: 2

**Path Conditions**: Is the inputted UID unique (doesn't exist in the database)?
```json 
((await globalUnique == false)) OR ((await globalUnique == true))
```

**Expected Outcome**: 
```json 
((await globalUnique == false) AND alert() AND return false) OR ((await globalUnique == false) AND return true)
```

**Test Input**: Assume UID = 123456789 is already existed in the database. 
```json
uniqueUID("123456789") -> false
uniqueUID("123456781") -> true
```

**Statements Coverage**: 100% (All statements are executed)

**Branches Coverage**: 100% (The only branch is exercised by both test cases)

**Paths Coverage**: 100% (Both Paths are exercised)

<br>

### Testcase2 - Unique Email

**Objective**: To check whether the inputted UID is unique. It'll send a request to the backend to check in the database using API get(PATH/checkemail/"email").

**Code**:
```json 
  async function uniqueEmail() {
      const getUnique = async() => {
          let unique;
          unique = await axios.get('http://127.0.0.1:8000/checkemail/'+email);
          return unique.data;
      };
      
      const globalUnique = await getUnique();
      if ((await globalUnique) === false) {
          alert("Email already exist.")
          return false;
      }
      else {
          return true;
      }
  }
```

**Possible Paths**: 2

**Path Conditions**: Is the inputted email unique? 
```json 
((await globalUnique == false)) OR ((await globalUnique == true))
```

**Expected Outcome**: Assume janedoe@g.ucla.edu exists in the database,
```json 
((await globalUnique == false) AND alert() AND return false) OR ((await globalUnique == false) AND return true)
```

**Test Input**: 
```json
uniqueEmail("janedoe@g.ucla.edu") -> false
uniqueUID("johndoe@g.ucla.edu") -> true
```

**Statements Coverage**: 100% (All statements are executed)

**Branches Coverage**: 100% (The only branch is exercised by both test cases)

**Paths Coverage**: 100% (Both Paths are exercised)

<br>

### Testsuite

**Objective**: To check whether the all of the testcases above work correctly.

**Code**:
```json 
  async function handleAllValidation() {
        let resValidation = handleSignupValidation();
        let resUniqueID = await uniqueUID();
        let resUniqueEmail = await uniqueEmail();
        //console.log(resValidation);
        //console.log(resUniqueID);
        //console.log(resUniqueEmail);
        return (Boolean(resValidation) && Boolean(resUniqueID) && Boolean(resUniqueEmail));
    }
```

**Possible Paths**: 33 x 4 = 132

**Path Conditions**: Does the user input satifies all test cases above (regex tests and unique tests)?
```json 
((!fullname || !uid || !email || !password) OR ((fullname && uid && email && password) AND (validateFullName OR !validateFullName) AND (validateUID OR !validateUID) AND (validateEmail OR !validateEmail) AND (validatePassword OR !validatePassword))) AND 

((await globalUIDUnique == false)) OR ((await globalUIDUnique == true)) AND 

((await globalEmailUnique == false)) OR ((await globalEmailUnique == true))
```

**Expected Outcome**: 
```json 
((!fullname || !uid || !email || !password) AND (await globalUIDUnique == false) AND (await globalEmailUnique == false)) AND (return false)

((fullname && uid && email && password) AND (validateFullName AND validateUID AND validateEmail AND validatePassword) AND return true) (await globalUIDUnique == true) AND (await globalEmailUnique == true)) AND (return true)

((fullname && uid && email && password) AND (!validateFullName OR !validateUID OR !validateEmail OR !validatePassword) AND return false) (await globalUIDUnique == true) AND (await globalEmailUnique == true)) AND (return false)

((fullname && uid && email && password) AND (validateFullName AND validateUID AND validateEmail AND validatePassword) AND return true) (await globalUIDUnique == false) AND (await globalEmailUnique == true)) AND (return false)

((fullname && uid && email && password) AND (validateFullName AND validateUID AND validateEmail AND validatePassword) AND return true) (await globalUIDUnique == false) AND (await globalEmailUnique == true)) AND (return true)
```

**Test Input**: Assume janedoe@g.ucla.edu and 123456789 exist in the database
```json 
[Jane, 12345678, janedoe@gmail.com, khjdkj] -> false
[Jane, 123456789, janedoe@g.ucla.com, Mypasswordis123!] -> false
[Jane Doe, 12345678, janedoe@g.ucla.com, Mypasswordis123!] -> false
[Jane Doe, 123456789, janedoe@gmail.com, Mypasswordis123!] -> false
[Jane Doe, 123456789, janedoe@g.ucla.com, Mypasswordis123] -> false
[John Doe, 123456784, johndoe@g.ucla.com, Mypasswordis123!] -> true
```

**Statements Coverage**: 

**Branches Coverage**: 

**Paths Coverage**: 

<br>