# created by: mintRaven-05
# dated: 29 sept 2024
# modified 30 sept 2024
#           This module is responsible for deploying
#           the gemini assistant over the localhost
#           using FastAPI. I contains route to /chat
#           /image and /doc for processing normal text
#           chats, images and documents respectively.
#
# -----------------------------------------------------------------------------------
import os
import io
import base64
import tempfile
from chat import *
from image import *
from docs import *
from history import *
from PIL import Image
from pydantic import BaseModel
from fastapi import FastAPI, File, Form, UploadFile, HTTPException, Request, status
# -----------------------------------------------------------------------------------

app = FastAPI()

ALLOWED_FILE_TYPES = {
    "application/pdf": ".pdf",
    "text/plain": ".txt",
}


class ImageReq(BaseModel):
    image: str


# -----------------------------------------------------------------------------------


@app.get("/")
def index():
    return {"health": "ok", "status": "working"}


# -----------------------------------------------------------------------------------

uri = ""
client = MongoClient(uri, server_api=ServerApi("1"))
try:
    client.admin.command("ping")
    print("You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client["AgriShield"]

@app.post("/chat")
async def pchat(request: Request):
    try:
        query = await request.body()
        query_str = query.decode("utf-8")
        res = chat_session(query_str)
        question_history = db["chat_histories"]
        chats = question_history.find({})
        length = 0
        count = 0
        for i in chats:
            length += 1
        if length >= 10:
            record_to_delete = question_history.find().sort("_id", 1).limit(1)
            question_history.insert_one({"question": query_str, "response": res})
            for i in record_to_delete:
                for j in i:
                    if j == "_id":
                        question_history.delete_one({"_id": i[j]})
        else:
            question_history.insert_one({"question": query_str, "response": res})
        return {"response": res}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# -----------------------------------------------------------------------------------


@app.post("/doc")
async def pdoc(doc: UploadFile = File(...), query: str = Form(...)):
    temp_file_path = None

    try:
        print("Received MIME type:", doc.content_type)

        if doc.content_type not in ALLOWED_FILE_TYPES:
            raise HTTPException(
                status_code=400,
                detail="Invalid file type! Only PDF and TXT files are allowed.",
            )

        with tempfile.NamedTemporaryFile(
            delete=False, suffix=ALLOWED_FILE_TYPES[doc.content_type]
        ) as temp_file:
            temp_file.write(await doc.read())
            temp_file_path = temp_file.name

        res = process_doc(temp_file_path, query)
        return {"response": res}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if temp_file_path and os.path.exists(temp_file_path):
            os.remove(temp_file_path)


# -----------------------------------------------------------------------------------
