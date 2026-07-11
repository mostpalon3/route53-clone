import requests

api_url = "http://127.0.0.1:8000"

# 1. Login
response = requests.post(f"{api_url}/api/auth/login", json={"email": "admin@example.com", "password": "password123"})
if response.status_code != 200:
    print("Login failed:", response.text)
    exit(1)

token = response.json().get("data", {}).get("access_token")
if not token:
    print("No token:", response.json())
    exit(1)

# 2. Get zones
headers = {"Authorization": f"Bearer {token}"}
res = requests.get(f"{api_url}/api/hosted-zones", headers=headers)
zones = res.json().get("data", [])
if not zones:
    print("No zones")
    exit(1)

zone_id = zones[0]["id"]

# 3. Create record
record_payload = {
    "record_name": "test.example.com",
    "record_type": "A",
    "value": "1.1.1.1",
    "alias": False,
    "evaluate_target_health": False
}
res = requests.post(f"{api_url}/api/hosted-zones/{zone_id}/records", json=record_payload, headers=headers)
print("Create record response:", res.status_code, res.text)
