from fastapi import FastAPI, File, Form, UploadFile, HTTPException
import os
import tempfile  # To create a temporary file

app = FastAPI()


@app.get("/")
def index():
    return {"health": "ok", "status": "working"}


@app.post("/doc")
async def pdoc(doc: UploadFile = File(...), query: str = Form(...)):
    try:
        # Create a temporary file to store the uploaded document
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(await doc.read())  # Write the file content to the temp file
            temp_file_path = temp_file.name  # Get the path of the temp file

        # Process the document using its path
        res = process_doc(temp_file_path, query)

        # Return the response
        return {"response": res}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        # Delete the temporary file after processing
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)
