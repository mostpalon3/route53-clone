import requests

# 1. Signup
res = requests.post("http://127.0.0.1:8000/api/auth/signup", json={
    "username": "testuser",
    "email": "test@test.com",
    "password": "password"
})
print("Signup:", res.status_code, res.text)

token = res.json().get("data", {}).get("access_token")

# 2. Get Hosted Zones
res2 = requests.get("http://127.0.0.1:8000/api/hosted-zones", headers={
    "Authorization": f"Bearer {token}"
})
print("Get Zones:", res2.status_code, res2.text)
