import requests

BASE_URL = "http://localhost:4000"
REGISTER_URL = f"{BASE_URL}/api/v1/auth/register"
VERIFY_EMAIL_URL = f"{BASE_URL}/api/v1/auth/verify-email"
LOGIN_URL = f"{BASE_URL}/api/v1/auth/login"
LOGOUT_URL = f"{BASE_URL}/api/v1/auth/logout"
SESSION_URL = f"{BASE_URL}/api/v1/auth/session"

def test_post_api_v1_auth_logout_revokes_session_with_valid_csrf_token():
    timeout = 30
    test_email = "test_logout_user@example.com"
    test_password = "TestPassword123!"
    test_name = "Logout Test User"

    headers = {
        "Content-Type": "application/json"
    }

    session = requests.Session()

    # Register user
    register_payload = {
        "fullName": test_name,
        "email": test_email,
        "password": test_password,
        "consentAccepted": True
    }
    try:
        resp = session.post(REGISTER_URL, json=register_payload, headers=headers, timeout=timeout)
        assert resp.status_code == 201, f"Register failed: {resp.status_code} {resp.text}"

        # Normally, we would get the verification code via email.
        # Since this is a test environment, assume verification code is retrievable or mocked.
        # For demonstration, try a fixed valid code "123456" or simulate fetch.
        verification_code = "123456"

        verify_payload = {
            "email": test_email,
            "code": verification_code
        }
        resp_verify = session.post(VERIFY_EMAIL_URL, json=verify_payload, headers=headers, timeout=timeout)
        if resp_verify.status_code == 400:
            # Possibly invalid code, fail test
            assert False, f"Email verification failed: {resp_verify.status_code} {resp_verify.text}"
        else:
            assert resp_verify.status_code == 200, f"Email verification failed: {resp_verify.status_code} {resp_verify.text}"

        # Login user
        login_payload = {
            "email": test_email,
            "password": test_password
        }
        resp_login = session.post(LOGIN_URL, json=login_payload, headers=headers, timeout=timeout)
        assert resp_login.status_code == 200, f"Login failed: {resp_login.status_code} {resp_login.text}"

        # After login, cookies for session and csrf token should be set
        # Extract CSRF token from cookies or response headers
        csrf_token = None
        # Try cookie named 'XSRF-TOKEN' or similar according to common practice
        if 'XSRF-TOKEN' in session.cookies:
            csrf_token = session.cookies['XSRF-TOKEN']
        else:
            # fallback to header?
            csrf_token = resp_login.headers.get('X-CSRF-Token')

        assert csrf_token, "CSRF token not found after login"

        # Use valid CSRF token to logout
        logout_headers = {
            "X-CSRF-Token": csrf_token
        }
        resp_logout = session.post(LOGOUT_URL, headers=logout_headers, timeout=timeout)
        assert resp_logout.status_code == 204, f"Logout failed: {resp_logout.status_code} {resp_logout.text}"

        # Verify session is revoked: session request should return 401
        resp_session = session.get(SESSION_URL, timeout=timeout)
        assert resp_session.status_code == 401, "Session not revoked after logout"

        # Now test logout with missing CSRF token - expect 403 INVALID_CSRF
        # Login again to get session and cookies
        resp_login_2 = session.post(LOGIN_URL, json=login_payload, headers=headers, timeout=timeout)
        assert resp_login_2.status_code == 200, f"Second login failed: {resp_login_2.status_code} {resp_login_2.text}"

        # Extract CSRF token again
        csrf_token_2 = None
        if 'XSRF-TOKEN' in session.cookies:
            csrf_token_2 = session.cookies['XSRF-TOKEN']
        else:
            csrf_token_2 = resp_login_2.headers.get('X-CSRF-Token')
        assert csrf_token_2, "CSRF token not found after second login"

        # Attempt logout with missing CSRF token header
        resp_logout_missing_csrf = session.post(LOGOUT_URL, headers={}, timeout=timeout)
        assert resp_logout_missing_csrf.status_code == 403, (
            f"Logout without CSRF token did not fail as expected: {resp_logout_missing_csrf.status_code} {resp_logout_missing_csrf.text}"
        )
        try:
            json_resp = resp_logout_missing_csrf.json()
            assert json_resp.get("code") == "INVALID_CSRF", "Expected INVALID_CSRF error code for missing CSRF token"
        except Exception:
            assert False, "Response to missing CSRF token logout is not JSON or missing code field"

        # Attempt logout with invalid CSRF token header
        invalid_headers = {
            "X-CSRF-Token": "invalid-token"
        }
        resp_logout_invalid_csrf = session.post(LOGOUT_URL, headers=invalid_headers, timeout=timeout)
        assert resp_logout_invalid_csrf.status_code == 403, (
            f"Logout with invalid CSRF token did not fail as expected: {resp_logout_invalid_csrf.status_code} {resp_logout_invalid_csrf.text}"
        )
        try:
            json_resp_invalid = resp_logout_invalid_csrf.json()
            assert json_resp_invalid.get("code") == "INVALID_CSRF", "Expected INVALID_CSRF error code for invalid CSRF token"
        except Exception:
            assert False, "Response to invalid CSRF token logout is not JSON or missing code field"

    finally:
        # Cleanup: no direct user deletion endpoint mentioned.
        # Cleanup database may be required outside of API scope.
        pass

test_post_api_v1_auth_logout_revokes_session_with_valid_csrf_token()