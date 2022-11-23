BruinNotes - CS130project
=========================
##### GitHub repo for UCLA CS130 LAB1A Group Project.

NOTE: Python 3.8 or lower is required to run this program. 

## Developers
1. Yunfan Zhong, 
2. Dylan Phe, 
3. Smayra Ramesh, 
4. Jack Zhao, 
5. Jinwoo Baik, 
6. Aiqi You
## Motivations

For students, having good notes to work and study off of is an extremely important part of being successful in classes. However, there is currently no centralized location for students to compare notes with each other, find notes from their TAs and professors, or share study guides easily. Although Bruinlearn allows professors to post their lesson notes online, students often have to sift through many unrelated videos, supplementary materials, and assignments to find the notes that they are looking for. Additionally, not all professors consistently post their notes, and Bruinlearn does not support students sharing their notes with other students in the class. This means that students who miss class due to sickness or an emergency have to reach out to the professor, or have friends in the class they can ask for notes.

BruinNotes will solve all the above issues and more by providing a website that acts as a centralized platform for UCLA students to share, find, and work on notes with their classmates. After creating an account, a user can search for and add UCLA courses, and have a place to request and share notes. Users will also be able to like notes that they find helpful, and also leave comments or questions underneath them. On top of it being a space of sharing, it will also serve as an archive of digital notes for all UCLA courses. Ultimately, BruinNotes aims to provide a simple but featureful experience for its users, and to give students the tools they need to be successful. Sharing is caring.

## Feature Descriptions
### Proposed Features
After creating an account on BruinNotes, users can search for and add their classes to the site. Then, they are able to share, like and dislike, comment on, and request notes. Each feature adds a unique and vital function to BruinNotes. 

### 2.1.1 Account System
Each user of BruinNotes is associated with an account. An account is required to access classes and notes on BruinNotes. A first-time user can create an account with a UCLA email address, full name, username, and password. User accounts are associated with their notes, likes, and comments. 
### 2.1.2 Courses
Notes are located within each course page. In BruinNotes, a course can be searched by the abbreviated course catalog number such as “MATH 131A”. Since a course may be offered across several terms and professors, each course consists of a list of course offerings distinguished by terms and professors. Users can then select a particular class offering to view its notes. Because each professor has their own teaching style, and different quarters can have different content, viewing notes in their own class offering ensures students get accurate information about their class. 

If a class is not found on the search page, users can then create the class with the abbreviated catalog name. Similarly, if a class offering from a particular professor and quarter is not listed, users can add that quarter to the class page. 
### 2.1.3 Sharing and Requesting Notes 
A major feature of BurinNotes is note-sharing. Users share their notes by providing a hyperlink to the notes, such as a link to a Google Doc, a file located in a cloud drive, etc. They will also come up with a name for their link at this time. Additionally, users would need to select an author type, indicating whether they are a student, TA, or professor. This allows the course page to be organized in such a way that can be easily understood and navigated. For example, students who are searching for discussion notes on week 3 can look for the notes published by a TA and having “week 3” in the title. 

Students may sometimes need a specific set of notes that haven’t been uploaded, and other times they might forget to upload a promised note during a hectic week. This is where the “Request Note” feature comes in. Users can leave a request message, and after the requested notes are uploaded, the message can then be resolved. A usage scenario for this feature is if a student misses the discussion on solving midterm practice problems, and there are no notes available yet. The student can then use the request feature to get these notes from their classmates on BruinNotes. When the other students see the request message, they can upload the notes immediately. 
### 2.1.4 Likes, Dislikes, Comments and Reports
Unlike shared cloud storage products such as Google Drive, BruinNotes enables users to interact with notes through likes, dislikes, and comments. These interactions are shown under the note link. Like and dislike counts help students find good notes among several notes. Comments can be made for questions about the notes, clarifications, and expressing gratitude for a helpful note. A usage scenario is if a student uploads their notes that were taken when they sat in the back of the classroom. Later, a comment points out there is an error in an equation in the note that would lead to serious mistakes in an upcoming homework assignment. 

As all users are permitted to upload notes and indicate their roles in the class, unwanted mistakes may occur. The report feature enables users to notify potentially incorrect or suspicious information. Upon receiving a report, the BruinNotes team will review the classes and notes in question and act on them if necessary.

## Running the Application

Clone the Repository:

##### `git clone https://github.com/dylanphe/BruinNotes.git`

##### `cd BruinNotes`

##### `npm install`

### To run the Frontend (React):

##### `cd client`

##### `npm install`

##### `npm start`

The app should be accessible at
[http://localhost:3000](http://localhost:3000) so you can view it in the browser.

### To setup the Backend:

##### Open a second command line to run the backend server.

##### `cd backend`

##### Create a .env file in the backend folder. Add your mongodb uri to the .env file (which can be created at https://cloud.mongodb.com/) like the following:
`MONGO_DB_URI=<YOUR_MONGO_DB_URI_HERE>`

##### Replace <YOUR_MONGO_DB_URI_HERE> with the MONGO_DB_URI you obtained from the database you created at https://cloud.mongodb.com/

### Afterwards, to run the backend (uvicorn and MongoDB):

##### You must have python installed on your machine along with Python uvicorn, fastAPI, Motor, Typing, Pydantic, PyMongo, etc., installed.

### Install necessary packages by using:

`pip install -r requirements.txt`

### To start the server

##### `uvicorn main:app --reload`

This will run the backend on [http://localhost:8000](http://localhost:8000) by default.

Once both the front end and backend are running, the application will be fully useable.

### Running Tests
#### Backend tests

1. Navigate to `/tests/api`
2. If necessary, give permissions using `chmod +x run_tests.sh`
3. Run `./run_tests.sh`