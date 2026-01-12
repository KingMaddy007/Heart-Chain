from pymongo import MongoClient
import pprint
import datetime

def json_serial(obj):
    if isinstance(obj, (datetime.datetime, datetime.date)):
        return obj.isoformat()
    return str(obj)

try:
    client = MongoClient("mongodb://localhost:27017")
    db = client["heartchain_db"]
    collection = db["campaigns"]

    count = collection.count_documents({})
    print(f"Total Documents: {count}")

    for doc in collection.find():
        print("--- Document ---")
        # Convert ObjectId to string for printing
        if '_id' in doc:
            doc['_id'] = str(doc['_id'])
        pprint.pprint(doc)

except Exception as e:
    print(f"Error: {e}")
