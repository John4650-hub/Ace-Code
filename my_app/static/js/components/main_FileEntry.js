import { FILES_NOT_ALLOWED, FILE_EXTENSIONS } from "./configs.js";

//LOADS DATA FROM THE FOLE SYSTEM
export function startApp() {
  function loadFs() {
    fetch("/load_fs", { method: "GET" })
      .then((fs) => fs.json())
      .then(function (dt) {
        $("#fileList").treeview({ data: dt, showBorder: true });
      });
  }

  window.readFs = function (fileEntryPath) {
    sessionStorage.setItem("current_file_path", fileEntryPath);
    fetch("/read_fs", { method: "POST", body: fileEntryPath })
      .then((file_data) => file_data.json())
      .then(function (data) {
        window.aceEditor.setValue(data.text);
      });
  };
  let file_path_to_save;
  let codeObj;
  window.writeToFs = function () {
    file_path_to_save = sessionStorage.getItem("current_file_path");

    if (file_path_to_save == null) {
      console.log(
        "No open file to save, please open a file in the editor to save "
      );
    } else if (file_path_to_save != null) {
      codeObj = {};
      codeObj["code"] = window.aceEditor.getValue();
      codeObj["path"] = file_path_to_save;
      fetch("/write_to_fs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(codeObj),
      })
        .then((response) => response.text())
        .then(function (msg) {
          alert_(msg, "success");
        });
    }
  };
  let extension;
  window.getUrls = function (filElm) {
    let fileUrl = filElm.getAttribute("nativeURL");
    let fileUrlSplit = fileUrl.split("/");
    let filename = fileUrlSplit[fileUrlSplit.length - 1];
    if (filename.includes(".")) {
      extension = filename.substring(filename.lastIndexOf(".") + 1);
    } else {
      extension = "txt";
    }
    let checkValidity = FILES_NOT_ALLOWED.find(function (v) {
      return extension == v;
    });
    if (checkValidity == undefined) {
      workWithFile(fileUrl);
      sessionStorage.setItem("extension", extension);
      addRecentlyOpenedFile(
        filename,
        fileUrl,
        FILE_EXTENSIONS[extension],
        false
      );
      window.aceEditor.session.setMode(
        `ace/mode/${FILE_EXTENSIONS[extension]}`
      );
    } else {
      myFilesOffCanvas.toggle();
      alert_(`file ${filename} is not valid`, "danger", 3000);
    }
  };

  let recents = [];
  let recent_files_obj;

  function addRecentlyOpenedFile(name, url, ext, isRecent = false) {
    recent_files_obj = {};
    recent_files_obj["name"] = name;
    recent_files_obj["url"] = url;

    let openedFile = makeElm("li");
    let fPath = makeElm("p");
    insertAttr(["class=fs-6 fw-light text-white fst-italic mb-0"], fPath);
    let fpath_txt = url.split("/");
    if (fpath_txt.length > 3) {
      fpath_txt = fpath_txt.splice(fpath_txt.length - 2, fpath_txt.length - 1);
    }
    fpath_txt = fpath_txt.join("/");
    fPath.innerText = ".../" + fpath_txt;

    let row = makeElm("div");
    insertAttr(["class=row border-bottom border-white", `id=${url}`], row);
    insertAttr(
      ["class=col-10 bg-dark text-white list-group-item border-0 mh-25"],
      openedFile
    );
    let closeBtn = makeElm("button");
    closeBtn.innerHTML = '<i class="fa fa-minus-circle text-danger"></i>';

    insertAttr(
      [
        "class=btn btn-dark col-2 fs-2 h-25 align-middle",
        "type=button",
        `id=${url}row`,
      ],
      closeBtn
    );
    closeBtn.addEventListener("click", function () {
      let rid = this.getAttribute("id");
      let ridlen = rid.length;
      let i_d = rid.slice(0, ridlen - 3);
      let recentElmId = recents.indexOf(i_d);
      let myRow = document.getElementById(i_d);
      myRow.remove();
      this.remove();
      recents.splice(recentElmId, 1);
    });
    openedFile.innerText = name;
    if (isRecent) {
      insertAttr(["ext=" + ext], openedFile);
    } else {
      insertAttr(["ext=" + sessionStorage.getItem("extension")], openedFile);
    }
    openedFile.addEventListener("click", function () {
      workWithFile(url);
      if (isRecent) {
        window.aceEditor.session.setMode(`ace/mode/${FILE_EXTENSIONS[ext]}`);
      } else {
        window.aceEditor.session.setMode(`ace/mode/${ext}`);
      }
      sessionStorage.setItem("extension", this.getAttribute("ext"));
    });
    let foundMatch = false;
    for (let i = 0; i < recents.length; i++) {
      if (recents[i]["url"] == url) {
        console.log("match");
        foundMatch = true;
        break;
      } else {
        foundMatch = false;
      }
    }
    if (foundMatch == false) {
      $("#recent_file").append(row);
      row.appendChild(openedFile);
      row.appendChild(closeBtn);
      openedFile.appendChild(fPath);
      recents.push(recent_files_obj);
      localStorage.setItem("recentlyOpenedFiles", JSON.stringify(recents));
    }
  }

  function restoreRecentlyOpenedFiles() {
    if (localStorage.getItem("recentlyOpenedFiles") != null) {
      //fro -> files recently opened
      let fro = localStorage.getItem("recentlyOpenedFiles");
      for (let file of JSON.parse(fro)) {
        let { name, url } = file;
        //destructuring assignment
        let ext = name.split(".").reverse()[0];
        addRecentlyOpenedFile(name, url, ext, true);
      }
      recents = JSON.parse(fro);
    }
  }

  loadFs();
  window.workWithFile = function (filePath) {
    readFs(filePath);
  };
  aceEditor.commands.addCommand({
    name: "save_file",
    bindKey: {
      win: "Ctrl-S",
    },
    exec: function (editor) {
      writeToFs();
    },
    readOnly: true, // false if this command should not apply in readOnly mode
  });
  $("#saveFs").click(writeToFs);
  sessionStorage.clear();
  restoreRecentlyOpenedFiles();
}
