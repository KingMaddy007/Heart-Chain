import requests
import json

try:
    response = requests.get("http://localhost:8000/campaigns/")
    print(f"Status: {response.status_code}")
    print(f"Count: {len(response.json())}")
    print(json.dumps(response.json(), indent=2))
except Exception as e:
    print(f"Error: {e}")
