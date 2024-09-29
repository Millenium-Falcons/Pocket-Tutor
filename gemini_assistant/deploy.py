from fastapi import FastAPI, File, Form, UploadFile, HTTPException
import os
import tempfile

app = FastAPI()


@app.get("/")
def index():
    return {"health": "ok", "status": "working"}


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
