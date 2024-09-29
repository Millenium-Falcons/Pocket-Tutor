# ------------------imports-----------------
import os
import platform
import google.generativeai as genai

# ------------------------------------------
if platform.architecture()[1] == "ELF":
    os.environ["GRPC_VERBOSITY"] = "ERROR"
    os.environ["GLOG_minloglevel"] = "2"
# ------------------------------------------
