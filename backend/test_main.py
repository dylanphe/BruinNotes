from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_view_all_users():
    response = client.get("/viewallusers")
    assert response.status_code == 200

    response_json = response.json()
    assert len(response_json) >= 0

    if (len(response_json) > 0):
        user_entry = response_json[0]
        assert "fullname" in user_entry
        assert "uid" in user_entry
        assert "email" in user_entry
        assert "key" in user_entry

def test_check_uid():
    response = client.get("/checkuid/fakeuidvalue")
    assert response.status_code == 200
    assert response.json() == True

def test_check_email():
    response = client.get("/checkemail/fakeemail@foobar.com")
    assert response.status_code == 200
    assert response.json() == True

def test_view_user():
    response = client.get("/viewuser/fakeuid")
    assert response.status_code == 404

    assert response.json() == {'detail': 'User with UID fakeuid not found'}

def test_note_requests():
    note_request = {
        "courseName": "fakecourse",
        "instructor": "fakeinstructor",
        "term": "faketerm",
        "requestMsg": "fakemsg",
        "week": 1,
        "uid": "fakeuid",
    }

    # Add note request
    response = client.post("/addnoterequest", json=note_request)
    assert response.status_code == 201

    response_json = response.json()
    item_id = str(response_json["_id"])
    assert response_json["courseName"] == "fakecourse"
    assert response_json["instructor"] == "fakeinstructor"
    assert response_json["term"] == "faketerm"
    assert response_json["requestMsg"] == "fakemsg"
    assert response_json["week"] == 1
    assert response_json["uid"] == "fakeuid"

    # Delete note request
    del_response = client.put(f"/deletenoterequest/{item_id}")
    assert del_response.status_code == 200
    assert del_response.json() == "Successfully removed note request"