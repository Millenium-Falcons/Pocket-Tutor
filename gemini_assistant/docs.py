# created by: mintRaven-05
# dated: 29 sept 2024
#       This module is responsible for processing documents
#       using the API of Google Gemini. With its document
#       processing abilities, it can process the following
#       MIME types
#               -> application/pdf: .pdf
#               -> text/plain:      .txt
#               -> text/csv:        .csv
#               -> text/html:       .html
#       We will be using only the first 2 MIME types for This
#       prototype.
# ---------------------------------------------------------------
import os
import platform
from chat import init_model
import google.generativeai as genai
# ---------------------------------------------------------------

if platform.architecture()[1] == "ELF":
    os.environ["GRPC_VERBOSITY"] = "ERROR"
    os.environ["GLOG_minloglevel"] = "2"

# ---------------------------------------------------------------


def process_doc(doc, query):
    model = init_model("gemini-1.5-flash", "")
    doc_file = genai.upload_file(doc)
    result = model.generate_content([doc_file, "\n\n", query])
    return result.text


# ---------------------------------------------------------------
