# ------------------imports-----------------
import os
import platform
from chat import init_model
import google.generativeai as genai

# ------------------------------------------
if platform.architecture()[1] == "ELF":
    os.environ["GRPC_VERBOSITY"] = "ERROR"
    os.environ["GLOG_minloglevel"] = "2"
# ------------------------------------------


def process_image(image, query: str) -> str:
    model = init_model("gemini-1.5-flash", "")
    img_file = genai.upload_file(image)
    result = model.generate_content([img_file, "\n\n", query])
    return result.text
