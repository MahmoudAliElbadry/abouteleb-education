import requests
import uuid

BASE_URL = "http://localhost:4000"

ADMIN_EMAIL = "admin@example.com"
ADMIN_PASSWORD = "AdminPass123!"

TIMEOUT = 30

def admin_login():
    """Authenticate as admin and return session cookies and CSRF token."""
    login_url = f"{BASE_URL}/api/v1/auth/login"
    resp = requests.post(
        login_url,
        json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
        timeout=TIMEOUT
    )
    assert resp.status_code == 200, f"Admin login failed: {resp.text}"
    cookies = resp.cookies
    csrf_token = resp.cookies.get("X-CSRF-Token") or resp.headers.get("x-csrf-token") or resp.cookies.get("csrf_token")
    if not csrf_token:
        # Sometimes CSRF token is returned in response body or headers
        try:
            csrf_token = resp.json().get("csrfToken")
        except Exception:
            pass
    assert csrf_token, "CSRF token not found in login response"
    return cookies, csrf_token

def create_order_as_admin(cookies, csrf_token):
    """Create a new order using admin privileges to get an orderId for testing."""
    # Admin can't create orders per spec, so instead create order as a client then get admin session.
    # But no client credentials given. Instead, get an existing order from admin orders list.
    # If no order is present, this test cannot proceed.
    orders_url = f"{BASE_URL}/api/v1/admin/orders"
    resp = requests.get(orders_url, cookies=cookies, timeout=TIMEOUT)
    assert resp.status_code == 200, f"Failed to get admin orders list: {resp.text}"
    orders = resp.json().get("orders")
    if not orders:
        raise Exception("No existing orders found to assign for testing.")
    return orders[0]["id"]

def test_patch_api_v1_admin_orders_orderid_assignment():
    cookies, csrf_token = admin_login()

    order_id = create_order_as_admin(cookies, csrf_token)

    headers = {
        "X-CSRF-Token": csrf_token,
        "Content-Type": "application/json"
    }

    url = f"{BASE_URL}/api/v1/admin/orders/{order_id}/assignment"

    # First test valid assignment: assign an active admin id (using admin's own id here)
    # Get admin's own user data to get their id
    session_url = f"{BASE_URL}/api/v1/auth/session"
    resp_session = requests.get(session_url, cookies=cookies, timeout=TIMEOUT)
    assert resp_session.status_code == 200, "Failed to get admin session info"
    admin_id = resp_session.json().get("id")
    assert admin_id, "Admin user id not found in session info"

    # Assign admin
    valid_payload = {"assignedAdminId": admin_id}
    resp_assign = requests.patch(url, json=valid_payload, cookies=cookies, headers=headers, timeout=TIMEOUT)
    assert resp_assign.status_code == 200, f"Valid assignment failed: {resp_assign.text}"
    result = resp_assign.json()
    assigned_admin = result.get("assignedAdminId")
    assert assigned_admin == admin_id, f"AssignedAdminId in response mismatch, expected {admin_id}, got {assigned_admin}"

    # Test unassigning admin by sending assignedAdminId null
    unassign_payload = {"assignedAdminId": None}
    resp_unassign = requests.patch(url, json=unassign_payload, cookies=cookies, headers=headers, timeout=TIMEOUT)
    assert resp_unassign.status_code == 200, f"Unassigning admin failed: {resp_unassign.text}"
    result_unassign = resp_unassign.json()
    # Expect assignedAdminId to be null or missing
    assigned_admin_unassign = result_unassign.get("assignedAdminId")
    assert assigned_admin_unassign is None, f"Expected assignedAdminId to be None after unassign, got {assigned_admin_unassign}"

    # Test invalid assignment with assignedAdminId invalid datatype (string instead of expected id)
    invalid_payload = {"assignedAdminId": "invalid-admin-id"}
    resp_invalid = requests.patch(url, json=invalid_payload, cookies=cookies, headers=headers, timeout=TIMEOUT)
    assert resp_invalid.status_code == 400, f"Invalid assignment did not return 400: {resp_invalid.text}"
    err = resp_invalid.json()
    assert err.get("code") == "INVALID_ASSIGNMENT", f"Expected error code INVALID_ASSIGNMENT, got {err.get('code')}"

test_patch_api_v1_admin_orders_orderid_assignment()