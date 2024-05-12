from flask import render_template, request, send_from_directory
from my_app import ace_editor_app
import json
import os

@ace_editor_app.route("/")
@ace_editor_app.route("/ace_editor")
def index():
    return render_template("index.html")

@ace_editor_app.route('/deps/<path:filename>')
def custom_static(filename):
    return send_from_directory('/storage/emulated/0/.Apps/deps', filename)

