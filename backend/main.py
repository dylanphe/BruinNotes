import os
import motor.motor_asyncio
import random

from bson import ObjectId
from fastapi import FastAPI, Body, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from verify_email import verify_email_async
import bcrypt

client = motor.motor_asyncio.AsyncIOMotorClient("mongodb+srv://bruinnotes_admin:CS130Fall2022@cluster0.kpbsyjm.mongodb.net/?retryWrites=true&w=majority")
db = client.cluster0

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Source: https://www.mongodb.com/developer/languages/python/python-quickstart-fastapi/
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("ObjectId is invalid.")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

class UserModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    fullname: str
    uid: str
    email: str
    key: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class UpdateUserModel(BaseModel):
    firstname: Optional[str]
    lastname: Optional[str]
    email: Optional[str]

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class CommentModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    username: str
    comment: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class NoteModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    courseName: str
    instructor: str
    term: str
    url: str
    author: str
    role: str
    title: str
    date: str
    week: int
    commentList: List[CommentModel]
    likes: int
    dislikes: int

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class NoteRequestModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    courseName: str
    instructor: str
    term: str
    requestMsg: str
    week: int
    uid: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class CourseModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    courseName: str
    instructor: str
    term: str
    colorCode: int

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class CourseNameModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    courseName: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

### START ACCOUNT SYSTEM API ###
# Add a new database item
@app.post("/adduser", response_description="Add new user")
async def add_user(userInfo: dict):
    """
    Creates a new user and adds it to the database.
    
    Args:
        userInfo (dict): A dict containing the user's information.

    Returns:
        JSON object with created user and 201 status.
    """
    fullname = userInfo['fullname']
    uid = userInfo['uid']
    email = userInfo['email']
    password = userInfo['password']

    salt = bcrypt.gensalt()
    key = bcrypt.hashpw(password.encode('utf-8'), salt)
    user = UserModel(fullname=fullname, uid=uid, email=email, key=key)
    new_user = jsonable_encoder(user)
    inserted_user = await db["users"].insert_one(new_user)
    created_user = await db["users"].find_one({"_id": inserted_user.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_user)

# View all database items
@app.get("/viewallusers", response_description="View all users")
async def view_all_users():
    """
    View all users currently in the database.

    Returns:
        A list containing the database's users.
    """
    users = await db["users"].find().to_list(1000)
    return users

@app.get("/checkuid/{uid}", response_description="Check that a user with a given UID does not already exist")
async def check_uid(uid: str):
    """
    Check that a user with a given UID does not already exist.

    Args:
        uid (str): A string containing the UID to be checked.

    Returns:
        True if the UID is unique, False if it already exists.
    """
    user = await db["users"].find_one({"uid": uid})
    if user is not None:
        return False
    return True

@app.get("/checkemail/{email}", response_description="Check that an email exists and a user with a given email does not already exist")
async def check_email(email: str):
    """
    Check that a user with a given email does not already exist and the email exists.

    Args:
        email (str): A string containing the email to be checked.

    Returns:
        True if the email is unique and exists, False if either condition fails.
    """
    user = await db["users"].find_one({"email": email})
    if user is not None:
        return False
    
    #return (await verify_email_async(email))

# View a specific database item
@app.get("/viewuser/{uid}", response_description="View user with given username")
async def view_user(uid: str):
    """
    View a specific user in the database.

    Args:
        uid (str): A string containing the requested user's UID.

    Returns:
        The requested user's information.
    """
    matching_users = []
    if (user := await db["users"].find_one({"uid": uid})) is not None:
        matching_users.append(user)
    if len(matching_users) == 0:
        raise HTTPException(status_code=404, detail=f"User with UID {uid} not found")
    return matching_users

@app.post("/checkpassword", response_description="Check if password is correct.")
async def check_password(userInfo: dict):
    """
    Checks if the password is correct for the given user.
    
    Args:
        userInfo (dict): A dict containing the user's information.

    Returns:
        True if the password matches, and False if it does not.
    """
    uid = userInfo['uid']
    password = userInfo['password']
    user = await db["users"].find_one({"uid": uid})

    key = user['key']
    if bcrypt.checkpw(password.encode('utf-8'), key.encode('utf-8')):
        return True
    return False

# Update a database item
# TODO: Change to a PUT request, and pass in changed info.
@app.get("/updateuser/{uid}", response_description="Update user with given uid")
async def update_user(uid: str):
    """
    Update the user with the given UID.

    Args:
        uid (str): A string containing the user's UID.

    Returns:
        The updated user information.
    """
    new_random_uid = "new_uid_" + str(random.randint(1,100))
    updated_user_info = UpdateUserModel(uid=new_random_uid)
    # Don't want to update empty fields, only grab the fields with values.
    updated_fields = {k: v for k, v in updated_user_info.dict().items() if v is not None}

    if len(updated_fields) >= 1:
        update_result = await db["users"].update_one({"uid": uid}, {"$set": updated_fields})
        if update_result.modified_count == 1:
            if (updated_user := await db["users"].find_one({"uid": new_random_uid})) is not None:
                return updated_user
        
    if (existing_user := await db["users"].find_one({"uid": uid})) is not None:
        return existing_user

### END ACCOUNT SYSTEM API ###


### START COURSES API ###
@app.post("/addcoursename", response_description="Add a new course name")
async def add_course(courseInfo: dict):
    """
    Adds a new course name to the database.
    
    Args:
        courseInfo (dict): A dict containing the course's name.

    Returns:
        JSON object with created course name and 201 status.
    """
    courseName = courseInfo['courseName']

    courseExists = await db["courseNames"].find_one({"courseName": courseName})
    if courseExists is not None:
        return JSONResponse(status_code=status.HTTP_409_CONFLICT, content="A course with this name already exists.")

    course = CourseNameModel(courseName=courseName)
    new_course = jsonable_encoder(course)
    inserted_course = await db["courseNames"].insert_one(new_course)
    created_course = await db["courseNames"].find_one({"_id": inserted_course.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_course)

@app.get("/searchcoursenames/{courseName}", response_description="View matching course names")
async def search_course_names(courseName: str):
    """
    View all matching course names in the database.

    Args:
        courseName (str): A string containing the requested course name.

    Returns:
        The requested courses with matching names.
    """
    query = {"courseName": {"$regex": courseName, "$options": "i"}}
    courses = await db["courseNames"].find(query).to_list(1000)
    return courses

@app.post("/addcourse", response_description="Add new course")
async def add_course(courseInfo: dict):
    """
    Creates a new course and adds it to the database.
    
    Args:
        courseInfo (dict): A dict containing the course's information.

    Returns:
        JSON object with created course and 201 status.
    """
    courseName = courseInfo['courseName']
    instructor = courseInfo['instructor']
    quarter = courseInfo['quarter']
    year = courseInfo['year']
    colorCode = courseInfo['colorCode']

    term = str(quarter) + " " + str(year)

    courseExists = await db["courses"].find_one({"courseName": courseName, "instructor": instructor, "term": term, "colorCode": colorCode})
    if courseExists is not None:
        return JSONResponse(status_code=status.HTTP_409_CONFLICT, content="A course with this information already exists.")

    course = CourseModel(courseName=courseName, instructor=instructor, term=term, colorCode=colorCode, notes=[], noteRequests=[])
    new_course = jsonable_encoder(course)
    inserted_course = await db["courses"].insert_one(new_course)
    created_course = await db["courses"].find_one({"_id": inserted_course.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_course)

@app.get("/searchcourses/{courseName}", response_description="View courses with matching names")
async def search_courses(courseName: str):
    """
    View all courses matching the courseName in the database.

    Args:
        courseName (str): A string containing the requested course name.

    Returns:
        The requested courses.
    """
    query = {"courseName": {"$regex": courseName, "$options": "i"}}
    # courses = await db["courseNames"].find(query).to_list(1000)
    courses = await db["courses"].find(query).to_list(1000)
    return courses
### END COURSES API ###


### START COMMENTS API ###
@app.post("/addcomment", response_description="Add new comment")
async def add_comment(noteInfo: dict, commentInfo: dict):
    """
    Creates a new comment and adds it to a note in the database.
    
    Args:
        commentInfo (dict): A dict containing the comment's information.

    Returns:
        JSON object with created comment and 201 status.
    """
    name = commentInfo['username']
    content = commentInfo['comment']
    
    comment = CommentModel(username=name, comment=content)
    new_comment = jsonable_encoder(comment)
    
    noteId = noteInfo["_id"]
    note = await db["notes"].find_one({"_id": noteId})
    
    currentCommentList = note['commentList']
    currentCommentList.append(new_comment)
    
    updated_note = await db["notes"].update_one({"_id": noteId}, {"$set": {"commentList":currentCommentList}})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=updated_note)
    
### END COMMENTS PAGE API ###


### START NOTES API ###
@app.post("/addnote", response_description="Add new note")
async def add_note(noteInfo: dict):
    """
    Creates a new note and adds it to a course in the database.
    
    Args:
        noteInfo (dict): A dict containing the note's information.

    Returns:
        JSON object with created note and 201 status.
    """
    courseName = noteInfo['courseName']
    instructor = noteInfo['instructor']
    term = noteInfo['term']
    url = noteInfo['url']
    author = noteInfo['author']
    role = noteInfo['role']
    title = noteInfo['title']
    date = noteInfo['date']
    week = noteInfo['week']

    note = NoteModel(courseName=courseName, instructor=instructor, term=term, url=url, author=author,role=role,title=title,date=date,week=week,commentList=[],likes=0, dislikes=0)
    new_note = jsonable_encoder(note)
    inserted_note = await db["notes"].insert_one(new_note)
    created_note = await db["notes"].find_one({"_id": inserted_note.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_note)

@app.post("/addnoterequest", response_description="Add new note request")
async def add_note_request(noteRequestInfo: dict):
    """
    Creates a new note request and adds it to a course in the database.
    
    Args:
        noteInfo (dict): A dict containing the note's information.

    Returns:
        JSON object with created note request and 201 status.
    """
    courseName = noteRequestInfo['courseName']
    instructor = noteRequestInfo['instructor']
    term = noteRequestInfo['term']
    requestMsg = noteRequestInfo['requestMsg']
    week = noteRequestInfo['week']
    uid = noteRequestInfo['uid']
    
    noteRequest = NoteRequestModel(courseName=courseName, instructor=instructor, term=term, requestMsg=requestMsg, week=week, uid=uid)
    new_noteRequest = jsonable_encoder(noteRequest)
    inserted_noteRequest = await db['noteRequests'].insert_one(new_noteRequest)
    created_noteRequest = await db['noteRequests'].find_one({"_id": inserted_noteRequest.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_noteRequest)

# TODO: (possibly) add in way to delete note requests
@app.put("/deletenoterequest/{id}", response_description="Delete note request from database")
async def delete_note_request(id):
    """
    Remove note request from the database.

    Returns:
        HTTP 200 OK upon success
        HTTP 404 NOT FOUND if id isn't valid
    """
    note = await db['noteRequests'].find_one({"_id": id})
    if note:
        await db['noteRequests'].delete_one({'_id': id})
        msg = "Successfully removed note request"
        return JSONResponse(status_code=status.HTTP_200_OK, content=msg)
    else: 
        msg = "note request with ID not found"
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content=msg)

@app.put("/increaselikes/{id}", response_description="Increase likes on a note")
async def increase_likes(id):
    """
    Increases the like count on a note.

    Returns:
        Updated like count on the note.
    """
    note = await db['notes'].find_one({"_id": id})
    if note:
        likes = note['likes']
        updated_note = await db['notes'].update_one({'_id': id}, {'$inc': {'likes':1}})
        if updated_note:
            return JSONResponse(status_code=status.HTTP_200_OK, content=likes+1)
    return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content=id)

@app.put("/increasedislikes/{id}", response_description="Increase dislikes on a note")
async def increase_dislikes(id):
    """
    Increases the dislike count on a note.

    Returns:
        Updated dislike count on the note.
    """
    note = await db['notes'].find_one({"_id": id})
    if note:
        dislikes = note['dislikes']
        updated_note = await db['notes'].update_one({'_id': id}, {'$inc': {'dislikes':1}})
        if updated_note:
            return JSONResponse(status_code=status.HTTP_200_OK, content=dislikes+1)
    return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content=id)\
        
@app.get("/searchnote/{courseName}/{instructor}/{term}", response_description="Search for notes that match courseName, professor, and quarter")
async def search_note_by_fields(courseName, instructor, term):
    """
    Search note by string fields
    
    Returns:
        A list of all notes that match these fields
    """
    
    query =  {'$and': 
            [
                {"courseName": {"$regex": courseName, "$options": "i"}},
                {"instructor": {"$regex": instructor, "$options": "i"}},
                {"term": {"$regex": term, "$options": "i"}}
            ]
            }
        
    matchingNotes = await db['notes'].find(query).sort([("week", 1),("role", 1)]).to_list(1000)
    return matchingNotes

@app.get("/searchnoterequest/{courseName}/{instructor}/{term}", response_description="Search for note requests that match courseName, professor, and quarter")
async def search_note_requests_by_fields(courseName, instructor, term):
    """
    Search note requests by string fields
    
    Returns:
        A list of all note requests that match these fields
    """

    query =  {'$and': 
            [
                {"courseName": {"$regex": courseName, "$options": "i"}},
                {"instructor": {"$regex": instructor, "$options": "i"}},
                {"term": {"$regex": term, "$options": "i"}}
            ]
            }

    matchingNoteRequests = await db['noteRequests'].find(query).sort([("week", 1),("role", 1)]).to_list(1000)
    return matchingNoteRequests
 
### END NOTES API ###