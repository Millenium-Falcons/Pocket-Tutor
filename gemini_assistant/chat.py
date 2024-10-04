# created by: mintRaven-05
# dated: 29 sept 2024
#       This module is responsible for generating text based
#       responses using the API of Google Gemini. Chat session with
#       pre-loaded history...history of last 10 chats with
#       Google Gemini.
# -----------------------------------------------------------------------------------
import os
import dotenv
import platform
from sys import exception

from history import *
import google.generativeai as genai
# -----------------------------------------------------------------------------------

dotenv.load_dotenv()

api_key = os.environ.get("API_KEY")
mongodb_uri = os.environ.get("MONGODB_URI")

if platform.architecture()[1] == "ELF":
    os.environ["GRPC_VERBOSITY"] = "ERROR"
    os.environ["GLOG_minloglevel"] = "2"

# -----------------------------------------------------------------------------------


def init_model(model_name: str, API: str) -> genai.GenerativeModel:
    genai.configure(api_key=API)
    model = genai.GenerativeModel(model_name)
    return model


# -----------------------------------------------------------------------------------


def chat_session(query: str) -> str:
    model = init_model("gemini-1.5-flash", api_key)
    prompts, responses = LoadHistory()
    session = model.start_chat(history=GenerateHistoryStub(prompts, responses))
    try:
        response = session.send_message(query)
        return response.text
    except Exception as e:
        print(f"error: {e}")


# -----------------------------------------------------------------------------------
