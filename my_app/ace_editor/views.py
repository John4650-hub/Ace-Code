from flask import render_template, request
from my_app import ace_editor_app
import json

@ace_editor_app.route('/')
@ace_editor_app.route('/ace_editor')
def index():
  return render_template('index.html')

# @streaker_app.route('/get-streak-data', methods=['GET'])
# def send_json():
#   with open('Db/data.json','r') as file:
#     data = json.load(file)
#   return json.dumps(data)
