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
    password: str

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
    user = UserModel(fullname=fullname, uid=uid, email=email, password=password)
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
    
    email_valid = await verify_email_async(email)
    
    return email_valid

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
    
    if password == user["password"]:
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


### START SEARCH PAGE API ###
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

    course = CourseModel(courseName=courseName, instructor=instructor, term=term, colorCode=colorCode)
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
    courses = await db["courses"].find(query).to_list(1000)
    return courses
### END SEARCH PAGE API ###


### START COURSE PAGE API ###

### END COURSE PAGE API ###