from fastapi import FastAPI

app = FastAPI()

@app.get("/", tags=["root"])
async def read_root():
    print("read_root")
    return {"message": "Hello World"}

@app.get("/login")
async def test():
    print("/login")
    return {'login' : "hello world"}

@app.get("/Signup")
async def signup_test():
    print("/Signup")
    return {'Singup' : 'Hello World!'}