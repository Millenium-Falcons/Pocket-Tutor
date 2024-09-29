# ----------------imports------------------
import os
import platform
from sys import exception
from globals.history import *
import google.generativeai as genai

# -----------------------------------------
if platform.architecture()[1] == "ELF":
    os.environ["GRPC_VERBOSITY"] = "ERROR"
    os.environ["GLOG_minloglevel"] = "2"
# ------------------------------------------


def init_model(model_name: str, API: str) -> genai.GenerativeModel:
    genai.configure(api_key=API)
    model = genai.GenerativeModel(model_name)
    return model


def chat_session(query: str) -> str:
    model = init_model("gemini-1.5-flash", "AIzaSyB7zH-31mzF9BUjBVUYbO5any0UM4RasIE")
    prompts, responses = LoadHistory()
    session = model.start_chat(history=history.GenerateHistoryStub(prompts, responses))
    try:
        response = session.send_message(query)
        return response.text
    except Exception as e:
        print(f"error: {e}")
