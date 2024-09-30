# created by: mintRaven-05
# dated: 30 sept 2024
#       This module is responsible for loading and recording
#       chat histories into the database. It has the functions
#       LoadHistory() and the RecordHistory() respectively.
#       Along with these functions, there is another function
#       GenerateHistoryStub() which will help to create a history
#       feed list for pre-loading the history.
#
# -----------------------------------------------------------------
from DB_Routines import *
from typing import Tuple, List, Dict, Union
# -----------------------------------------------------------------


def LoadHistory() -> Tuple[List[str], List[str]]:
    query_list = []
    response_list = []
    data_from_DB = readFromDB()
    for _ in data_from_DB:
        for key, value in _.items():
            if key == "question":
                query_list.append(value)
            if key == "response":
                response_list.append(value)
            else:
                continue
    return (query_list, response_list)

# -----------------------------------------------------------------


def RecordHistory(query: str, response: str) -> None:
    WriteIntoDB(query, response)


# -----------------------------------------------------------------


def GenerateHistoryStub(
    query_itr: List, response_itr: List
) -> List[Dict[str, Union[str, List[str]]]]:
    stub = [
            {
                "role":"user",
                "parts": ["you are a Gemini-powered AI learning companion. You are named pocket tutor and you job to help students study and solve their educational problems"]
            }
            {
                "role": "model",
                "parts": ["Understood, i am supposed to help students with study and solve problems related to it."]
            }
            {"role": "user", "parts": [query_itr[0]]},
            {"role": "model", "parts": [response_itr[0]]},
            {"role": "user", "parts": [query_itr[1]]},
            {"role": "model", "parts": [response_itr[1]]},
            {"role": "user", "parts": [query_itr[2]]},
            {"role": "model", "parts": [response_itr[2]]},
            {"role": "user", "parts": [query_itr[3]]},
            {"role": "model", "parts": [response_itr[3]]},
            {"role": "user", "parts": [query_itr[4]]},
            {"role": "model", "parts": [response_itr[4]]},
            {"role": "user", "parts": [query_itr[5]]},
            {"role": "model", "parts": [response_itr[5]]},
            {"role": "user", "parts": [query_itr[6]]},
            {"role": "model", "parts": [response_itr[6]]},
            {"role": "user", "parts": [query_itr[7]]},
            {"role": "model", "parts": [response_itr[7]]},
            {"role": "user", "parts": [query_itr[8]]},
            {"role": "model", "parts": [response_itr[8]]},
            {"role": "user", "parts": [query_itr[9]]},
            {"role": "model", "parts": [response_itr[9]]},
    ]

    return stub

# -----------------------------------------------------------------
