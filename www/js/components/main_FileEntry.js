import { OPENFS, SAVEFS, sendData, SETFILE } from "../app.js";
import { writeFile } from "./File_System/writeFile.js";
import { readFile } from "./File_System/readFile.js";
import { editor } from "../index.js";
import { modeChoice } from "../app.js"


export async function onDeviceReady() {
    /*@@param {Promise} reads-directory-recursively Read the local storage and fill the sidebar with files in it
     **/
let conColor=" text-primary"
    function listDir(url = '', result = []) {
        return new Promise(function(res, rej) {
            let path;
            if (url == '') {
                path = cordova.file.externalRootDirectory
            } else {
                path = url + '/';
            }
            window.resolveLocalFileSystemURL(path,
                function(fs) {
                    const reader = fs.createReader();
                    reader.readEntries(function(entries) {
                        for (let i = 0; i < entries.length; i++) {
                            entries[i].text = entries[i].name
                            if (entries[i].isDirectory == true) {
                                entries[i].state = {
                                    checked: false,
                                    expanded: false,
                                    selected: false
                                }
                                entries[i].nodes = []
                                result.push(entries[i])
                                listDir(entries[i].nativeURL, entries[i].nodes)
                            } else {
                                let ftype = entries[i].name.split('.');
                                let ext = ftype.length - 1;
                                switch (ftype[ext].toLowerCase()) {
                                    case 'py':
                                        entries[i].icon = "fab fa-python"+conColor;
                                        break
                                    case 'java':
                                        entries[i].icon = "fab fa-java"+conColor;
                                        break
                                    case 'html':
                                        entries[i].icon = "fab fa-html5"+conColor;
                                        break
                                    case 'css':
                                        entries[i].icon = "fab fa-css3"+conColor;
                                        break
                                    case 'js':
                                        entries[i].icon = "fab fa-js"+conColor;
                                        break
                                    case 'c':
                                        entries[i].icon = "fab fa-cuttlefish"+conColor;
                                        break
                                    default:
                                        entries[i].icon = "fa fa-file"+conColor;
                                        
                                }
                                result.push(entries[i]);
                            }
                        }
                    }, (rej) => { return rej });
                }, (rej) => { return rej });
            res(result)
        })
    }

    let files = await listDir();

    function getTree() {
        let data = files;
        return data;
    }
    setTimeout(() => {
        $("#fileList").treeview({ data: getTree() });
    }, 3000)

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
        function(fs) {
            SETFILE.addEventListener('click', doThis)

            function doThis() {
                if (modeChoice == 'python') {
                    console.log('editing python file');
                    workWithFile("PYTHON/main.py");
                }

                if (modeChoice == 'c_cpp') {
                    console.log('editing C file');
                    workWithFile("C/main.c");
                }
            }

            function workWithFile(fileName) {
                fs.root.getFile(fileName, { create: true, exclusive: false }, function(fileEntry) {
                    OPENFS.addEventListener('click', readF)

                    function readF() {
                        readFile(fileEntry);
                    }
                    //SAVE FILE when saveFs btn is clicked
                    SAVEFS.addEventListener('click', saveFileC);

                    function saveFileC() { writeFile(fileEntry, null); }

                }, () => { console.log('failed to save file'); });
            }
        }, () => { console.log('failed to load file system'); });

}