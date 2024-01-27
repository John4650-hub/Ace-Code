from flask import request
from my_app import ace_editor_app
import json
import os

conColor = " text-primary"
result = []


def entryIcon(entry):
    ftype = entry["text"].split(".")
    ext = ftype[-1]
    match ext.lower():
        case "py":
            entry["icon"] = "fab fa-python" + conColor
            return 0
        case "java":
            entry["icon"] = "fab fa-java" + conColor
            return 0
        case "html":
            entry["icon"] = "fab fa-html5" + conColor
            return 0
        case "css":
            entry["icon"] = "fab fa-css3" + conColor
            return 0
        case "js":
            entry["icon"] = "fab fa-js" + conColor
            return 0
        case "c":
            entry["icon"] = "fab fa-cuttlefish" + conColor
            return 0
        case _:
            entry["icon"] = "fa fa-file" + conColor
            return 0


def listDir(url="", result=[]):
    if url == "":
        path = os.path.expanduser("~")
    else:
        path = url + "/"
    try:
        entries = os.listdir(path)
        for entry in entries:
            entry = {"text": entry, "nativeURL": os.path.join(path, entry)}
            if os.path.isdir(entry["nativeURL"]):
                entry["state"] = {
                    "checked": False,
                    "expanded": False,
                    "selected": False,
                }
                entry["nodes"] = []
                result.append(entry)
                listDir(entry["nativeURL"], entry["nodes"])
            else:
                entry["onclick"] = "getUrls(this)"
                entryIcon(entry)
                result.append(entry)
    except OSError as e:
        return e
    return json.dumps(result, indent=2)


# LOADS THE FILES TO THE LIST
@ace_editor_app.route("/load_fs", methods=["GET"])
def loadFs():
    result_ = []
    return listDir(url="/storage/emulated/0", result=result_)


@ace_editor_app.route("/read_fs", methods=["POST"])
def readFile():
    path_to_file = request.get_data()
    file_txt_data = {}
    with open(path_to_file.decode(), "r") as fh:
        file_txt_data["text"] = fh.read()
    return json.dumps(file_txt_data)


@ace_editor_app.route("/write_to_fs", methods=["POST"])
def saveFile():
    codeObj = request.get_json()
    path_to_file = codeObj.get("path")
    code_txt = codeObj.get("code")
    with open(path_to_file, "w") as fh:
        fh.write(code_txt)
    return "File saved!"


@ace_editor_app.route("/settings", methods=["POST", "GET"])
def saveSettings():
    if request.method == "POST":
        setigsObj = request.get_json()
        with open("settings.json", "w") as fh:
            json.dump(setigsObj, fh, indent=2)
        return "settings were saved successfully"
    elif request.method == "GET":
        with open("settings.json", "r") as fh:
            data = json.load(fh)
        return data

@ace_editor_app.route("/lang_data", methods=["GET"])
def lang_data():
    with open('Db/compilers.json','r') as fh:
      data = json.load(fh)
    return data