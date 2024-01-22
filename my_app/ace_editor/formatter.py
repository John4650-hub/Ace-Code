from flask import request
from my_app import ace_editor_app
from black import format_str, FileMode


@ace_editor_app.route('/format_python',methods=['POST'])
def formatPython():
  py_code=request.get_json()['code']
  py_code_formated = format_str(py_code, mode=FileMode())
  return py_code_formated