from flask import Flask

ace_editor_app = Flask(__name__)
import my_app.ace_editor.views
import my_app.ace_editor.filesys