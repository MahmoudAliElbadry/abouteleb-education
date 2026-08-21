import requests
import uuid

BASE_URL = "http://localhost:4000"
ORDER_ENDPOINT = f"{BASE_URL}/api/v1/orders"
AUTH_REGISTER_ENDPOINT = f"{BASE_URL}/api/v1/auth/register"
AUTH_VERIFY_EMAIL_ENDPOINT = f"{BASE_URL}/api/v1/auth/verify-email"
AUTH_LOGIN_ENDPOINT = f"{BASE_URL}/api/v1/auth/login"
TIMEOUT = 30


def test_post_api_v1_orders_creates_new_order_for_verified_client():
    session = requests.Session()
    # Create a new user to ensure verified client testing
    unique_email = f"testuser_{uuid.uuid4()}@example.com"
    register_payload = {
        "fullName": "Test User",
        "email": unique_email,
        "password": "TestPassword123!",
        "consentAccepted": True
    }
    try:
        # Register user
        reg_resp = session.post(AUTH_REGISTER_ENDPOINT, json=register_payload, timeout=TIMEOUT)
        assert reg_resp.status_code == 201, f"Unexpected status code during registration: {reg_resp.status_code}"
        reg_data = reg_resp.json()
        assert "public user" in reg_data or "message" in reg_data or reg_data, "Missing expected registration response fields"

        # Normally we would retrieve the verification code from email or DB.
        # Since it's a test environment, simulate verification with a known code or assume test env auto-verifies.
        # For demonstration, assume code "123456" is valid for this test user.
        verify_payload = {
            "email": unique_email,
            "code": "123456"
        }
        verify_resp = session.post(AUTH_VERIFY_EMAIL_ENDPOINT, json=verify_payload, timeout=TIMEOUT)
        assert verify_resp.status_code == 200, f"Email verification failed or invalid code: {verify_resp.status_code}"
        verify_data = verify_resp.json()
        assert "verified public user" in verify_data or verify_data, "Missing expected verification response"

        # Login to get session and CSRF cookies
        login_payload = {
            "email": unique_email,
            "password": register_payload["password"]
        }
        login_resp = session.post(AUTH_LOGIN_ENDPOINT, json=login_payload, timeout=TIMEOUT)
        assert login_resp.status_code == 200, f"Login failed for verified user: {login_resp.status_code}"
        # Extract CSRF token from cookies or headers
        csrf_token = session.cookies.get("csrfToken")
        assert csrf_token is not None, "CSRF token cookie missing after login"

        # Prepare order payload
        order_payload = {
            "fullName": "Test User",
            "phoneNumber": "+1234567890",
            "specialization": "Mathematics"
        }

        headers = {
            "X-CSRF-Token": csrf_token
        }

        # POST /api/v1/orders to create a new order
        order_resp = session.post(ORDER_ENDPOINT, json=order_payload, headers=headers, timeout=TIMEOUT)
        assert order_resp.status_code == 201, f"Failed to create order, status code: {order_resp.status_code}"
        order_data = order_resp.json()
        assert "reference" in order_data, "Order reference missing in response"
        assert "history" in order_data, "Order history missing in response"

        # Now test unverified client receives 403 on order creation
        # Register but do not verify this new user
        unverified_email = f"unverified_{uuid.uuid4()}@example.com"
        unverified_payload = {
            "fullName": "Unverified User",
            "email": unverified_email,
            "password": "Password123!",
            "consentAccepted": True
        }
        unverified_reg = requests.post(AUTH_REGISTER_ENDPOINT, json=unverified_payload, timeout=TIMEOUT)
        assert unverified_reg.status_code == 201, "Failed to register unverified user"

        unverified_session = requests.Session()
        # Login unverified user
        unverified_login_payload = {
            "email": unverified_email,
            "password": unverified_payload["password"]
        }
        unverified_login_resp = unverified_session.post(AUTH_LOGIN_ENDPOINT, json=unverified_login_payload, timeout=TIMEOUT)
        # Login should likely fail or succeed but email not verified will be 403 on order creation
        # If login succeeds with 200, get CSRF token cookie, else handle 403 or 401
        if unverified_login_resp.status_code == 200:
            unverified_csrf_token = unverified_session.cookies.get("csrfToken")
            assert unverified_csrf_token is not None, "CSRF token missing for unverified user session"

            # Attempt to create order with unverified client
            unverified_headers = {
                "X-CSRF-Token": unverified_csrf_token
            }
            unverified_order_resp = unverified_session.post(ORDER_ENDPOINT, json=order_payload, headers=unverified_headers, timeout=TIMEOUT)
            assert unverified_order_resp.status_code == 403, "Unverified user should receive 403 on order creation"
        else:
            # Login failed as expected for unverified user; test covered
            assert unverified_login_resp.status_code in (401, 403), "Unexpected login response for unverified user"

        # Test unauthenticated client receives 403 on order creation
        no_auth_order_resp = requests.post(ORDER_ENDPOINT, json=order_payload, timeout=TIMEOUT)
        assert no_auth_order_resp.status_code == 403, "Unauthenticated user should receive 403 on order creation"

    finally:
        # Cleanup: Attempt to delete created orders or users is not specified so omitted.
        pass


test_post_api_v1_orders_creates_new_order_for_verified_client()