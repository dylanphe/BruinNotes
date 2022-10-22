import os
import motor.motor_asyncio
import random

from bson import ObjectId
from fastapi import FastAPI, Body, HTTPException, status
from fastapi.responses import Response, JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List

client = motor.motor_asyncio.AsyncIOMotorClient("mongodb+srv://bruinnotes_admin:CS130Fall2022@cluster0.kpbsyjm.mongodb.net/?retryWrites=true&w=majority")
db = client.cluster0

app = FastAPI()

# START MONGODB SKELETON CODE
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
    username: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class UpdateUserModel(BaseModel):
    username: Optional[str]

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

# Add a new database item
# TODO: Change to a POST request, and pass in user's info.
@app.get("/adduser", response_description="Add new user")
async def add_user():
    random_username="test_user_" + str(random.randint(1,100))
    user = UserModel(username=random_username)
    new_user = jsonable_encoder(user)
    inserted_user = await db["users"].insert_one(new_user)
    created_user = await db["users"].find_one({"_id": inserted_user.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_user)

# View all database items
@app.get("/viewallusers", response_description="View all users")
async def view_all_users():
    users = await db["users"].find().to_list(1000)
    return users

# View a specific database item
@app.get("/viewuser/{username}", response_description="View user with given username")
async def view_user(username: str):
    matching_users = []
    if (user := await db["users"].find_one({"username": username})) is not None:
        matching_users.append(user)
    if len(matching_users) == 0:
        raise HTTPException(status_code=404, detail=f"User with username {username} not found")
    return matching_users

# # Update a database item
# # TODO: Change to a PUT request, and pass in changed info.
@app.get("/updateuser/{username}", response_description="Update user with given username")
async def update_user(username: str):
    new_random_username = "new_username_" + str(random.randint(1,100))
    updated_user_info = UpdateUserModel(username=new_random_username)
    # Don't want to update empty fields, only grab the fields with values.
    print(updated_user_info)
    print(updated_user_info.dict())
    print(updated_user_info.dict().items())
    updated_fields = {k: v for k, v in updated_user_info.dict().items() if v is not None}
    print(updated_fields)

    if len(updated_fields) >= 1:
        update_result = await db["users"].update_one({"username": username}, {"$set": updated_fields})
        if update_result.modified_count == 1:
            if (updated_user := await db["users"].find_one({"username": new_random_username})) is not None:
                return updated_user
        
    if (existing_user := await db["users"].find_one({"username": username})) is not None:
        return existing_user

# Delete a database item
# TODO: Change to a DELETE request, and pass in username to be deleted.
@app.get("/deleteuser/{username}", response_description="Delete a user")
async def delete_user(username: str):
    delete_result = await db["users"].delete_one({"username": username})
    if delete_result.deleted_count >= 1:
        return f"Successfully deleted user {username}"
    return f"User {username} does not exist"

# END MONGODB SKELETON CODE

@app.get("/", tags=["root"])
async def read_root():
    print("read_root")
    return {"message": "Hello World :)"}

@app.get("/login")
async def test():
    print("/login")
    return {'login' : "hello world"}

@app.get("/signup")
async def signup_test():
    print("/signup")
    return {'Signup' : 'Hello World!'}