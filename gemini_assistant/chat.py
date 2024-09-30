# created by: mintRaven-05
# dated: 29 sept 2024
#       This module is responsible for generating text based
#       responses using the API of Google Gemini. Chat session with
#       pre-loaded history...history of last 10 chats with
#       Google Gemini.
#
# -----------------------------------------------------------------------------------
import os
import platform
from sys import exception
from globals.history import *
import google.generativeai as genai
# -----------------------------------------------------------------------------------

if platform.architecture()[1] == "ELF":
    os.environ["GRPC_VERBOSITY"] = "ERROR"
    os.environ["GLOG_minloglevel"] = "2"

# -----------------------------------------------------------------------------------


def init_model(model_name: str, API: str) -> genai.GenerativeModel:
    with open(".env", "r") as file:
        api = file.readlines()
        file.close()

    API = api[0]
    print(API)
    print(type(API))
    genai.configure(api_key=API)
    model = genai.GenerativeModel(model_name)
    return model


# -----------------------------------------------------------------------------------


def chat_session(query: str) -> str:
    model = init_model("gemini-1.5-flash", "")
    prompts, responses = LoadHistory()
    session = model.start_chat(history=GenerateHistoryStub(prompts, responses))
    try:
        response = session.send_message(query)
        return response.text
    except Exception as e:
        print(f"error: {e}")


# -----------------------------------------------------------------------------------
