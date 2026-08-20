import requests

def test_get_api_v1_health_returns_service_status_ok():
    base_url = "http://localhost:4000"
    url = f"{base_url}/api/v1/health"
    try:
        response = requests.get(url, timeout=30)
        # Validate response status code
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
        json_response = response.json()
        # Validate response content indicates service status is ok
        # Based on PRD, the response is "status ok and service api"
        # We expect a JSON response with appropriate keys and values
        # Example expected response could be: {"status": "ok", "service": "api"}
        assert "status" in json_response and json_response["status"] == "ok", \
            f"Expected status 'ok' in response, got {json_response.get('status')}"
        # If service key is provided, verify it equals "api"
        if "service" in json_response:
            assert json_response["service"] == "api", \
                f"Expected service 'api' in response, got {json_response.get('service')}"
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

test_get_api_v1_health_returns_service_status_ok()