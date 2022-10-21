import os
import motor.motor_asyncio

from bson import ObjectId
from fastapi import FastAPI, Body, HTTPException, status
from fastapi.responses import Response, JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List

client = motor.motor_asyncio.AsyncIOMotorClient("mongodb+srv://bruinnotes_admin:CS130Fall2022@cluster0.kpbsyjm.mongodb.net/?retryWrites=true&w=majority")
db = client.cluster0

app = FastAPI()

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
    name: Optional[str]

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

@app.get("/adduser")
async def add_user():
    user = UserModel(username="test_user_name")
    new_user = jsonable_encoder(user)
    inserted_user = await db["users"].insert_one(new_user)
    created_user = await db["users"].find_one({"_id": inserted_user.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_user)

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