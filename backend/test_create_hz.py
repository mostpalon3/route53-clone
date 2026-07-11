import requests

# 1. Login
res = requests.post("http://127.0.0.1:8000/api/auth/login", json={
    "email": "test@test.com",
    "password": "password"
})
token = res.json().get("data", {}).get("access_token")

# 2. Create Hosted Zone
res2 = requests.post("http://127.0.0.1:8000/api/hosted-zones", headers={
    "Authorization": f"Bearer {token}"
}, json={
    "domain_name": "example.com",
    "description": "",
    "zone_type": "PUBLIC"
})
print("Create Zone:", res2.status_code, res2.text)
