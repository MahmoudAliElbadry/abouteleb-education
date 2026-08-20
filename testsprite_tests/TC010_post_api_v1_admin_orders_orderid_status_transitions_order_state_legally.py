import requests
import uuid

BASE_URL = "http://localhost:4000"
TIMEOUT = 30

ADMIN_EMAIL = "admin@example.com"
ADMIN_PASSWORD = "AdminPass123!"

def admin_login(session):
    login_url = f"{BASE_URL}/api/v1/auth/login"
    login_data = {"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
    resp = session.post(login_url, json=login_data, timeout=TIMEOUT)
    assert resp.status_code == 200, f"Admin login failed: {resp.status_code} {resp.text}"
    # Extract CSRF token from cookies or headers if present
    csrf_token = None
    # Assuming CSRF token is set as cookie named "XSRF-TOKEN" or "csrfToken"
    for cookie_name in ["XSRF-TOKEN", "csrfToken"]:
        if cookie_name in session.cookies:
            csrf_token = session.cookies[cookie_name]
            break
    assert csrf_token, "CSRF token not found after login"
    return csrf_token

def create_order_for_admin_transition(session, csrf_token):
    # Create a new order via client flow or via admin if possible for testing transition
    # Since test case is admin transition we assume admin can query or create an order first
    # We create a dummy order with required fields via authenticated client or admin endpoint for testing

    # We assume the admin cannot create order, so fallback to create via client using fresh session
    # Since no client credentials given, generate a temporary user and order

    # For this test, we create a verified client user, login, create order, then admin transitions it

    # Helper to register, verify, login client, and create order
    client_session = requests.Session()
    email = f"testuser_{uuid.uuid4().hex[:8]}@example.com"
    password = "TestPass123!"
    fullName = "Test User"
    phoneNumber = "1234567890"
    specialization = "science"

    # Register client
    reg_resp = client_session.post(f"{BASE_URL}/api/v1/auth/register", json={
        "fullName": fullName,
        "email": email,
        "password": password,
        "consentAccepted": True
    }, timeout=TIMEOUT)
    assert reg_resp.status_code == 201, f"Client registration failed: {reg_resp.status_code} {reg_resp.text}"

    # For verifying email OTP, since we don't have actual OTP from email, assume verify endpoint can be bypassed or we skip verification
    # According to PRD, login requires verified email, so trying login before verify returns 403
    # We will simulate verification by calling verify-email with a fixed code "123456" or skip test if not possible

    verify_resp = client_session.post(f"{BASE_URL}/api/v1/auth/verify-email", json={
        "email": email,
        "code": "123456"  # assuming code '123456' valid for test environment or else test may fail
    }, timeout=TIMEOUT)
    assert verify_resp.status_code == 200, f"Email verification failed: {verify_resp.status_code} {verify_resp.text}"

    # Login client to get session and CSRF token
    login_resp = client_session.post(f"{BASE_URL}/api/v1/auth/login", json={
        "email": email,
        "password": password
    }, timeout=TIMEOUT)
    assert login_resp.status_code == 200, f"Client login failed: {login_resp.status_code} {login_resp.text}"
    client_csrf_token = None
    for c in ["XSRF-TOKEN", "csrfToken"]:
        if c in client_session.cookies:
            client_csrf_token = client_session.cookies[c]
            break
    assert client_csrf_token, "Client CSRF token not found after login"

    # Create order
    order_resp = client_session.post(f"{BASE_URL}/api/v1/orders", json={
        "fullName": fullName,
        "phoneNumber": phoneNumber,
        "specialization": specialization
    }, headers={"X-CSRF-Token": client_csrf_token}, timeout=TIMEOUT)
    assert order_resp.status_code == 201, f"Order creation failed: {order_resp.status_code} {order_resp.text}"
    order_data = order_resp.json()
    order_id = order_data.get("id") or order_data.get("orderId") or order_data.get("reference") or order_data.get("orderReference")
    assert order_id, "Order ID missing from creation response"
    return order_id

def test_post_api_v1_admin_orders_orderid_status_transitions_order_state_legally():
    session = requests.Session()
    csrf_token = admin_login(session)
    order_id = None
    try:
        order_id = create_order_for_admin_transition(session, csrf_token)
        assert order_id, "Failed to create order for admin status transition test"

        transition_url = f"{BASE_URL}/api/v1/admin/orders/{order_id}/status"

        # Legal transition test: pick a valid next state from initial known states
        # Since no states list provided, assume a legal status like 'processing'
        legal_transition_payload = {"to": "processing"}
        headers = {"X-CSRF-Token": csrf_token}

        resp = session.post(transition_url, json=legal_transition_payload, headers=headers, timeout=TIMEOUT)
        assert resp.status_code == 200, f"Legal transition failed: {resp.status_code} {resp.text}"
        resp_json = resp.json()
        assert "transitionReceipt" in resp_json or "newStatus" in resp_json or "history" in resp_json, "Transition receipt or status history not found in legal transition response"

        # Illegal transition test: attempt an illegal state transition, e.g. back to 'new' or an invalid state
        illegal_transition_payload = {"to": "new"}  # typically can't revert to initial/new state
        resp_illegal = session.post(transition_url, json=illegal_transition_payload, headers=headers, timeout=TIMEOUT)
        assert resp_illegal.status_code == 409, f"Illegal transition expected 409 but got {resp_illegal.status_code}"
        error_json = resp_illegal.json()
        assert error_json.get("code") == "INVALID_ORDER_TRANSITION", f"Expected INVALID_ORDER_TRANSITION code, got {error_json.get('code')}"

    finally:
        # Clean up: delete the created order if possible, assume admin endpoint
        if order_id:
            try:
                del_url = f"{BASE_URL}/api/v1/admin/orders/{order_id}"
                del_resp = session.delete(del_url, headers={"X-CSRF-Token": csrf_token}, timeout=TIMEOUT)
                # Deletion may not be implemented or may return 404, ignore errors on delete
            except Exception:
                pass

test_post_api_v1_admin_orders_orderid_status_transitions_order_state_legally()
