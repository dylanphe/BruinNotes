from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_check_uid():
    response = client.get("/checkuid/fakeuidvalue")
    assert response.status_code == 200
    assert response.json() == True
