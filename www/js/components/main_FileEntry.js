import { OPENFS, SAVEFS, sendData } from "../app.js";
import { writeFile } from "./File_System/writeFile.js";
import { readFile } from "./File_System/readFile.js";
import { editor } from "../index.js";
import { modeChoice } from "../app.js";
import { entryIcon } from "./File_System/fileSysUi.js";
import { FILES_NOT_ALLOWED } from "./configs.js";


export async function onDeviceReady() {
    /*@@param {Promise} reads-directory-recursively Read the local storage and fill the sidebar with files in it
     **/

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
                                entries[i].onclick = "getUrls(this)"
                                entryIcon(entries[i])
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
        $("#fileList").treeview({ data: getTree(), showBorder: false });
    }, 3000)
    /**
     * @@param {url} logsUrls description
     * 
     **/


    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
        function(fs) {
            /**
             *@param {HTML ELEMENT OBJECT } getUrls gets the 
             * full path of the files and checks whether files 
             * is good for working with.
             **/
            function getUrls(filElm) {
                
                let fileUrl = filElm.getAttribute('fullPath');
                console.log(fileUrl);
                let fileTruePath = fileUrl.slice(1)
                console.log(fileTruePath);
                let fileUrlSplit = fileTruePath.split("/")
                let filename = fileUrlSplit[fileUrlSplit.length - 1]
                let pattern = /\.[a-z]{1,4}/
                let extension = filename.match(pattern).toString();
                let checkValidity = FILES_NOT_ALLOWED.find(function(v) {
                    return v == extension
                })
                console.log(checkValidity)
                if (checkValidity == undefined) {
                    console.log("now edit");
                    workWithFile(fileTruePath);
                } else {
                    alert(`file ${filename} is not valid`)
                }
            }
            window.getUrls = getUrls

            function workWithFile(filePath) {
                fs.root.getFile(filePath, { create: true, exclusive: false }, function(fileEntry) {
                    OPENFS.addEventListener('click', readF)

                    function readF() {
                        readFile(fileEntry);
                    }
                    //SAVE FILE when saveFs btn is clicked
                    SAVEFS.addEventListener('click', saveFile);

                    function saveFile() { writeFile(fileEntry, null); }

                }, () => { console.log('failed to save file'); });
            }
        }, () => { console.log('failed to load file system'); });

}