# created by: mintRaven-05
# dated: 29 sept 2024
# modified 30 sept 2024
#           This module is responsible for deploying
#           the gemini assistant over the localhost
#           using Flask. It contains routes to /chat,
#           /image, and /doc for processing normal text
#           chats, images, and documents respectively.
#
# -----------------------------------------------------------------------------------
import os
import io
import base64
import dotenv
import tempfile
from flask import Flask, request, jsonify, send_file
from chat import *
from image import *
from docs import *
from history import *
from PIL import Image
from werkzeug.utils import secure_filename
from pymongo import MongoClient, server_api

# -----------------------------------------------------------------------------------
dotenv.load_dotenv()
app = Flask(__name__)

ALLOWED_FILE_TYPES = {
    "application/pdf": ".pdf",
    "text/plain": ".txt",
}

# -----------------------------------------------------------------------------------


@app.route("/", methods=["GET"])
def index():
    return jsonify({"health": "ok", "status": "working"})


# -----------------------------------------------------------------------------------
uri = os.environ.get("MONGODB_URI")
client = MongoClient(uri, server_api=server_api.ServerApi("1"))
try:
    client.admin.command("ping")
    print("You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client["Pocket_Tutor"]


from flask import Flask, request, jsonify


@app.route("/chat", methods=["POST"])
def pchat():
    try:
        # Parse plain text from the request body
        body = request.data.decode("utf-8")

        # Assuming the body is structured as "query=Hello&username=test_user"
        params = dict(param.split("=") for param in body.split("&"))
        query_ = params.get("query")
        user_ = params.get("username")

        # Call the chat session function
        res = chat_session(query_)

        # Handle chat history logic (same as before)
        question_history = db["chat_histories"]
        length = question_history.count_documents({})

        if length >= 10:
            record_to_delete = question_history.find().sort("_id", 1).limit(1)
            question_history.insert_one(
                {"username": user_, "question": query_, "response": res}
            )
            for record in record_to_delete:
                question_history.delete_one({"_id": record["_id"]})
        else:
            question_history.insert_one(
                {"username": user_, "question": query_, "response": res}
            )

        return jsonify({"response": res})

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# -----------------------------------------------------------------------------------


@app.route("/doc", methods=["POST"])
def pdoc():
    temp_file_path = None

    try:
        # Check if the request contains a file part
        if "doc" not in request.files:
            return jsonify({"error": "No file part in the request."}), 400

        doc = request.files["doc"]

        # Check if the file has been uploaded
        if doc.filename == "":
            return jsonify({"error": "No selected file."}), 400

        print("Received MIME type:", doc.content_type)

        # Validate the file type
        if doc.content_type not in ALLOWED_FILE_TYPES:
            return jsonify(
                {"error": "Invalid file type! Only PDF and TXT files are allowed."}
            ), 400

        # Create a temporary file
        suffix = ALLOWED_FILE_TYPES[doc.content_type]
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_file:
            temp_file.write(doc.read())
            temp_file_path = temp_file.name
            print(f"File saved to temporary path: {temp_file_path}")

        # Prepare to send the file and query to the Gemini API
        query = request.form.get("query")
        if not query:
            return jsonify({"error": "No query parameter provided."}), 400

        # Replace 'GEMINI_API_URL' with the actual Gemini API endpoint
        gemini_api_url = "https://api.gemini.com/your_endpoint"

        # Prepare the files and data to be sent to the Gemini API
        with open(temp_file_path, "rb") as f:
            files = {"doc": (os.path.basename(temp_file_path), f)}
            data = {"query": query}

            # Send the request to the Gemini API
            response = requests.post(gemini_api_url, files=files, data=data)

        # Check if the request was successful
        if response.status_code != 200:
            return jsonify(
                {"error": "Error from Gemini API: " + response.text}
            ), response.status_code

        # Return the response from Gemini API
        return jsonify({"response": response.json()})

    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500

    finally:
        # Cleanup: Remove the temporary file if it exists
        if temp_file_path and os.path.exists(temp_file_path):
            print(f"Cleaning up: Removing temporary file at {temp_file_path}")
            os.remove(temp_file_path)


# -----------------------------------------------------------------------------------

if __name__ == "__main__":
    app.run(debug=True)
