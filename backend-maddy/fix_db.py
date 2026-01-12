from pymongo import MongoClient

try:
    client = MongoClient("mongodb://localhost:27017")
    db = client["heartchain_db"]
    collection = db["campaigns"]

    # Delete campaigns missing the required 'campaign_type' field
    result = collection.delete_many({"campaign_type": {"$exists": False}})
    print(f"Deleted {result.deleted_count} invalid campaigns (missing campaign_type).")
    
except Exception as e:
    print(f"Error: {e}")
