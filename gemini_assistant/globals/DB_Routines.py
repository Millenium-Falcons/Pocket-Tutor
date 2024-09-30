# Created by: mintRaven-05
# dated: 30 sept 2024
#       The module is responsible for maintaining and handling
#       chat history sessions via the database. It consists of
#       the read function for extracting all the data from the
#       DB and also a write function, which at max can let only
#       10 chats to enter. It behaves like a queue.
#
# --------------------------------------------------------------------------
from typing import List, Dict
from pymongo import write_concern
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
# --------------------------------------------------------------------------

uri = ""
client = MongoClient(uri, server_api=ServerApi("1"))

# --------------------------------------------------------------------------
try:
    client.admin.command("ping")
    print("You successfully connected to MongoDB!")
except Exception as e:
    print(e)
# --------------------------------------------------------------------------
db = client["Pocket_Tutor"]
collection = db["signup_infos"]


# --------------------------------------------------------------------------
def readFromDB() -> List[Dict[str, str]]:
    results = []
    data = collection.find({})
    for i in data:
        db_data = {}
        for j in i:
            db_data[j] = i[j]
        results.append(db_data)
    return results


# --------------------------------------------------------------------------
def WriteIntoDB(query: str, response: str) -> None:
    data = readFromDB()
    length = len(data)
    if length >= 10:
        to_del = collection.find().sort("_id", 1).limit(1)
        collection.insert_one({"question": question, "response": response})
        for i in to_del:
            for j in i:
                if j == "_id":
                    collection.delete_one({"_id": i[j]})
    else:
        collection.insert_one({"question": question, "response": response})


# --------------------------------------------------------------------------
