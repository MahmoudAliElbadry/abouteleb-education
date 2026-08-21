import requests

BASE_URL = "http://localhost:4000"
ADMIN_EMAIL = "admin@example.com"
ADMIN_PASSWORD = "AdminPass123!"
USER_EMAIL = "user@example.com"
USER_PASSWORD = "UserPass123!"
TIMEOUT = 30

def login_get_auth_cookies_and_csrf(email, password):
    login_url = f"{BASE_URL}/api/v1/auth/login"
    resp = requests.post(login_url, json={"email": email, "password": password}, timeout=TIMEOUT)
    resp.raise_for_status()
    # Extract cookies and CSRF token from cookies
    cookies = resp.cookies
    csrf_token = cookies.get("csrf-token") or cookies.get("XSRF-TOKEN")
    if not csrf_token:
        # Sometimes CSRF might be in headers
        csrf_token = resp.headers.get("x-csrf-token")
    return cookies, csrf_token

def test_get_admin_orders_metrics():
    admin_cookies = None
    user_cookies = None
    try:
        # Admin login
        admin_cookies, admin_csrf_token = login_get_auth_cookies_and_csrf(ADMIN_EMAIL, ADMIN_PASSWORD)
        headers_admin = {"X-CSRF-Token": admin_csrf_token} if admin_csrf_token else {}

        # Admin request - expect 200 and counts of orders by workflow status
        admin_metrics_url = f"{BASE_URL}/api/v1/admin/orders/metrics"
        admin_resp = requests.get(admin_metrics_url, cookies=admin_cookies, headers=headers_admin, timeout=TIMEOUT)
        assert admin_resp.status_code == 200, f"Admin metrics request failed: {admin_resp.status_code}"
        data = admin_resp.json()
        assert isinstance(data, dict), "Response is not a JSON object"
        # Check that keys for counts exist (no exact schema was given, so check some keys)
        assert "total" in data or any(k for k in data.keys()), "Response missing order counts or total"

        # Non-admin login
        user_cookies, user_csrf_token = login_get_auth_cookies_and_csrf(USER_EMAIL, USER_PASSWORD)
        headers_user = {"X-CSRF-Token": user_csrf_token} if user_csrf_token else {}

        # Non-admin request - expect 403 Forbidden
        user_resp = requests.get(admin_metrics_url, cookies=user_cookies, headers=headers_user, timeout=TIMEOUT)
        assert user_resp.status_code == 403, f"Non-admin metrics request did not return 403 but {user_resp.status_code}"
        err_json = user_resp.json()
        assert "message" in err_json or "code" in err_json, "Error response missing message or code"
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"
    except AssertionError:
        raise
    except Exception as e:
        assert False, f"Unexpected error: {e}"

test_get_admin_orders_metrics()