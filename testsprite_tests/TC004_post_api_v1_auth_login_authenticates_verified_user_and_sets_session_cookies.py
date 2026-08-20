import requests

BASE_URL = "http://localhost:4000"
LOGIN_URL = f"{BASE_URL}/api/v1/auth/login"
REGISTER_URL = f"{BASE_URL}/api/v1/auth/register"
VERIFY_EMAIL_URL = f"{BASE_URL}/api/v1/auth/verify-email"

# Test users data
verified_user = {
    "fullName": "Test Verified User",
    "email": "verified.user@example.com",
    "password": "ValidPass123!",
    "consentAccepted": True
}

unverified_user = {
    "fullName": "Test Unverified User",
    "email": "unverified.user@example.com",
    "password": "ValidPass123!",
    "consentAccepted": True
}

def test_post_api_v1_auth_login_authenticates_verified_user_and_sets_session_cookies():
    session = requests.Session()
    timeout = 30

    # Helper function to register a user
    def register_user(user_data):
        resp = session.post(REGISTER_URL, json={
            "fullName": user_data["fullName"],
            "email": user_data["email"],
            "password": user_data["password"],
            "consentAccepted": user_data["consentAccepted"]
        }, timeout=timeout)
        return resp

    # Helper function to verify email using a mocked 6-digit code "123456"
    def verify_email(email):
        resp = session.post(VERIFY_EMAIL_URL, json={
            "email": email,
            "code": "123456"
        }, timeout=timeout)
        return resp

    try:
        # Register and verify verified user
        resp = register_user(verified_user)
        # If user exists already, allow proceeding; else expect 201 Created
        assert resp.status_code in (201, 409)
        if resp.status_code == 201:
            verify_resp = verify_email(verified_user["email"])
            assert verify_resp.status_code == 200
        # Register unverified user (only if doesn't already exist)
        resp2 = register_user(unverified_user)
        if resp2.status_code == 201:
            # No verify_email call for unverified user intentionally
            pass
        else:
            assert resp2.status_code == 409

        # 1) Login with verified user should return 200 with user object and session/CSRF cookies
        login_resp = session.post(LOGIN_URL, json={
            "email": verified_user["email"],
            "password": verified_user["password"]
        }, timeout=timeout)
        assert login_resp.status_code == 200
        login_json = login_resp.json()
        assert isinstance(login_json, dict)
        assert "email" in login_json and login_json["email"] == verified_user["email"]
        # Cookies must include session and CSRF cookies
        cookies = session.cookies
        assert any("session" in cname.lower() for cname in cookies.keys())
        assert any("csrf" in cname.lower() for cname in cookies.keys())

        # 2) Login with invalid password returns 401 INVALID_LOGIN
        login_invalid_pass_resp = session.post(LOGIN_URL, json={
            "email": verified_user["email"],
            "password": "WrongPassword!"
        }, timeout=timeout)
        assert login_invalid_pass_resp.status_code == 401
        err_json = login_invalid_pass_resp.json()
        assert "code" in err_json and err_json["code"] == "INVALID_LOGIN"

        # 3) Login with unverified user returns 403 EMAIL_NOT_VERIFIED
        login_unverified_resp = session.post(LOGIN_URL, json={
            "email": unverified_user["email"],
            "password": unverified_user["password"]
        }, timeout=timeout)
        assert login_unverified_resp.status_code == 403
        err2_json = login_unverified_resp.json()
        assert "code" in err2_json and err2_json["code"] == "EMAIL_NOT_VERIFIED"

    finally:
        # Cleanup is not done because these users might be reused or deletion not supported via API
        pass

test_post_api_v1_auth_login_authenticates_verified_user_and_sets_session_cookies()
