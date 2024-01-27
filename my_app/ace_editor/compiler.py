from flask import request
import requests
from my_app import ace_editor_app

@ace_editor_app.route("/run_code", methods=["POST"])
def runC():
  with open("Db/token",'r') as tkn:
    rapid_key=tkn.read()
  url="https://online-code-compiler.p.rapidapi.com/v1/"
  payload = request.get_json()
  headers = {
      "content-type": "application/json",
      "X-RapidAPI-Key":rapid_key,
      "-RapidAPI-Host": "online-code-compiler.p.rapidapi.com"
      }
  response = requests.post(url, json=payload, headers=headers)
  return response.json()