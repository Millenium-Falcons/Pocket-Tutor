import os
import io
import base64
import tempfile
from chat import *
from image import *
from docs import *
from PIL import Image
from pydantic import BaseModel
from fastapi import FastAPI, File, Form, UploadFile, HTTPException, status

app = FastAPI()


class ImageReq(BaseModel):
    image: str


@app.get("/")
def index():
    return {"health": "ok", "status": "working"}


@app.post("/image")
def pimage(request: ImageReq, query: str = Form(...)):
    try:
        b = base64.b64decode(request.image.split(",")[1])
        img = Image.open(io.BytesIO(b))
        res = process_image(img, query)
        return {"response": res}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/doc")
async def pdoc(doc: UploadFile = File(...), query: str = Form(...)):
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(await doc.read())
            temp_file_path = temp_file.name

        res = process_doc(temp_file_path, query)
        return {"response": res}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)
