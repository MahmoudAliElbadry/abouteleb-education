import requests
import string
import random

BASE_URL = "http://localhost:4000"
VERIFY_EMAIL_ENDPOINT = "/api/v1/auth/verify-email"
REGISTER_ENDPOINT = "/api/v1/auth/register"


def random_email():
    return "test+" + "".join(random.choices(string.ascii_lowercase + string.digits, k=8)) + "@example.com"


def random_password():
    return "Pwd!23456"


def random_full_name():
    return "Test User"


def test_post_api_v1_auth_verify_email_valid_and_invalid_otp():
    # Step 1: Register a new user to get a valid email and have a valid OTP generated
    email = random_email()
    password = random_password()
    full_name = random_full_name()

    register_payload = {
        "fullName": full_name,
        "email": email,
        "password": password,
        "consentAccepted": True
    }

    session = requests.Session()
    try:
        register_resp = session.post(
            BASE_URL + REGISTER_ENDPOINT,
            json=register_payload,
            timeout=30
        )
        assert register_resp.status_code == 201, f"Expected 201 on register, got {register_resp.status_code}"
        register_data = register_resp.json()
        assert "email" in register_data and register_data["email"].lower() == email.lower()
        # The verification OTP should be sent by email provider or mocked; here, we simulate retrieving it.
        # Since we lack a real email retrieval, we cannot get the actual OTP to confirm a successful verification here.
        # We will use an invalid OTP to confirm error handling.

        # Step 2: Test POST /api/v1/auth/verify-email with INVALID OTP -> expect 400 with INVALID_VERIFICATION
        invalid_verify_payload = {
            "email": email,
            "code": "000000"  # clearly invalid
        }
        invalid_resp = session.post(
            BASE_URL + VERIFY_EMAIL_ENDPOINT,
            json=invalid_verify_payload,
            timeout=30
        )
        assert invalid_resp.status_code == 400, f"Expected 400 for invalid OTP, got {invalid_resp.status_code}"
        error_data = invalid_resp.json()
        assert "code" in error_data and error_data["code"] == "INVALID_VERIFICATION"

    finally:
        # No resource deletion endpoint for users described in PRD; cleanup not performed.
        pass


test_post_api_v1_auth_verify_email_valid_and_invalid_otp()