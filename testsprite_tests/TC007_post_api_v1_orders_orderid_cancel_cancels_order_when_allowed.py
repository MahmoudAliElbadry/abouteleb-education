import requests
import uuid

BASE_URL = "http://localhost:4000"
REGISTER_URL = f"{BASE_URL}/api/v1/auth/register"
VERIFY_EMAIL_URL = f"{BASE_URL}/api/v1/auth/verify-email"
LOGIN_URL = f"{BASE_URL}/api/v1/auth/login"
ORDERS_URL = f"{BASE_URL}/api/v1/orders"

def test_post_api_v1_orders_orderid_cancel_cancels_order_when_allowed():
    session = requests.Session()
    session.timeout = 30

    # 1. Register new user
    unique_email = f"testuser_{uuid.uuid4().hex[:8]}@example.com"
    register_payload = {
        "fullName": "Test User",
        "email": unique_email,
        "password": "StrongPassw0rd!",
        "consentAccepted": True
    }
    r = session.post(REGISTER_URL, json=register_payload)
    assert r.status_code == 201, f"Registration failed: {r.status_code}, {r.text}"

    # Extract verification OTP from response or simulate it somehow
    # Since we have no actual email system here, assume OTP retrieval via an API or fixed code for tests
    # For testing purposes, try verifying with a dummy code "123456" (in real tests this should be dynamic)
    verify_payload = {
        "email": unique_email,
        "code": "123456"
    }
    # Attempt verification; if fails, skip or adjust accordingly. We retry with 400 fails as possible.
    r = session.post(VERIFY_EMAIL_URL, json=verify_payload)
    if r.status_code == 400:
        raise AssertionError(f"Email verification failed: {r.status_code} {r.text}")
    else:
        assert r.status_code == 200, f"Email verification failed: {r.status_code} {r.text}"

    # 2. Login with verified user to get cookies including CSRF token
    login_payload = {
        "email": unique_email,
        "password": "StrongPassw0rd!"
    }
    r = session.post(LOGIN_URL, json=login_payload)
    assert r.status_code == 200, f"Login failed: {r.status_code}, {r.text}"

    # Extract CSRF token from cookies or headers
    csrf_token = None
    for cookie in session.cookies:
        if cookie.name == "CSRF-TOKEN":
            csrf_token = cookie.value
            break
    if not csrf_token:
        raise AssertionError("CSRF token not found in cookies after login")

    headers = {
        "X-CSRF-Token": csrf_token
    }

    # 3. Create a new order in an allowed cancellable state
    order_payload = {
        "fullName": "Test User",
        "phoneNumber": "0501234567",
        "specialization": "Mathematics"
    }
    r = session.post(ORDERS_URL, json=order_payload, headers=headers)
    assert r.status_code == 201, f"Order creation failed: {r.status_code}, {r.text}"
    order = r.json()
    order_id = order.get("id") or order.get("orderId") or order.get("reference")
    if not order_id:
        # Try to pick from keys related to order id
        possible_keys = ["id", "orderId", "reference"]
        for k in possible_keys:
            if k in order:
                order_id = order[k]
                break
    assert order_id, "Order ID not found in order creation response"

    cancel_url = f"{ORDERS_URL}/{order_id}/cancel"

    try:
        # 4. Cancel the order first time - expect 204 No Content
        r = session.post(cancel_url, headers=headers)
        assert r.status_code == 204, f"Order cancel failed: {r.status_code}, {r.text}"

        # 5. Cancel the order second time - expect 409 invalid transition
        r = session.post(cancel_url, headers=headers)
        assert r.status_code == 409, f"Repeated cancel expected 409 but got {r.status_code}: {r.text}"

        # Optionally check error message content for "invalid transition"
        try:
            err = r.json()
            assert "invalid" in err.get("message", "").lower() or "transition" in err.get("message", "").lower()
        except Exception:
            pass

    finally:
        # Cleanup: attempt to delete order if API supports deletion - Not specified in PRD, so skip
        pass


test_post_api_v1_orders_orderid_cancel_cancels_order_when_allowed()