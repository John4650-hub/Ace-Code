from flask import request
import requests
from my_app import ace_editor_app

@ace_editor_app.route("/run_code", methods=["POST"])
def runC():
  with open("Db/token",'r') as tkn:
    rapid_key=tkn.read()
  url="https://judge0-extra-ce.p.rapidapi.com/submissions"
  querystring = {"base64_encoded":"false","wait":"false","fields":"*"}
  payload = request.get_json()
  headers = {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key":rapid_key,
      "X-RapidAPI-Host": "judge0-extra-ce.p.rapidapi.com"
      }
  response = requests.post(url, json=payload, headers=headers, params=querystring)
  url="https://judge0-extra-ce.p.rapidapi.com/submissions/"+response.json()['token']
  headers = {
  	"X-RapidAPI-Key": rapid_key,
  	"X-RapidAPI-Host": "judge0-extra-ce.p.rapidapi.com"
  }
  querystring = {"fields":"*"}

  output = requests.get(url, headers=headers, params=querystring)
  return output.json()