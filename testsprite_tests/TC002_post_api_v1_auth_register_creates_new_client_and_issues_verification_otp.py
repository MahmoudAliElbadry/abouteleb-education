import requests
import uuid

BASE_URL = "http://localhost:4000"
REGISTER_ENDPOINT = "/api/v1/auth/register"
TIMEOUT = 30

def test_post_api_v1_auth_register_creates_new_client_and_issues_verification_otp():
    # Generate unique email to avoid conflict with existing accounts
    unique_email = f"testuser_{uuid.uuid4().hex[:8]}@example.com"
    payload = {
        "fullName": "Test User",
        "email": unique_email,
        "password": "StrongP@ssw0rd!",
        "consentAccepted": True
    }
    headers = {
        "Content-Type": "application/json"
    }

    response = None
    try:
        response = requests.post(
            f"{BASE_URL}{REGISTER_ENDPOINT}",
            json=payload,
            headers=headers,
            timeout=TIMEOUT
        )
        assert response.status_code == 201, f"Expected status code 201 but got {response.status_code}"
        json_resp = response.json()
        # Validate that public user data and verification message exist
        assert isinstance(json_resp, dict), "Response is not a JSON object"
        # Expecting keys like public user data and a verification message
        # Based on PRD it's not explicit, but generally expect user info and message
        assert "user" in json_resp or "publicUser" in json_resp, "Response missing public user data"
        assert "message" in json_resp, "Response missing verification message"
        # Validate fields in user data if present
        user_data = json_resp.get("user") or json_resp.get("publicUser")
        if user_data:
            # Typical fields checking
            assert "id" in user_data, "User data missing id"
            assert user_data.get("email") == unique_email, "Returned email mismatch"
            assert "fullName" in user_data, "User data missing fullName"
            # Password or sensitive info should not be returned
            assert "password" not in user_data, "User data contains password"
    finally:
        # Cleanup not required or not specified as user deletion endpoint not in PRD
        pass

test_post_api_v1_auth_register_creates_new_client_and_issues_verification_otp()
