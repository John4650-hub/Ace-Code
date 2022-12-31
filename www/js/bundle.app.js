/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/(() => {
  // webpackBootstrap
  /******/
  "use strict";

  /******/
  var __webpack_modules__ = {
    /***/"../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/app.js":
    /*!**********************************************************************************************!*\
      !*** ../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/app.js ***!
      \**********************************************************************************************/
    /***/
    (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FILE_PANEL\": () => (/* binding */ FILE_PANEL),\n/* harmony export */   \"OPENFS\": () => (/* binding */ OPENFS),\n/* harmony export */   \"SAVEFS\": () => (/* binding */ SAVEFS),\n/* harmony export */   \"SETFILE\": () => (/* binding */ SETFILE),\n/* harmony export */   \"modeChoice\": () => (/* binding */ modeChoice),\n/* harmony export */   \"sendData\": () => (/* binding */ sendData)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/index.js\");\n/* harmony import */ var _components_main_FileEntry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/main_FileEntry.js */ \"../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/components/main_FileEntry.js\");\n\n\n\ndocument.addEventListener('deviceready', _components_main_FileEntry_js__WEBPACK_IMPORTED_MODULE_1__.onDeviceReady, false);\n\nlet modeChoice = '';\n\nconst selectElm = document.getElementById('modes');\nconst dropdownElms = selectElm.children\n/*\nadded event listener to call when dropdown item is clicked\n*/\nfor (let i = 0; i < dropdownElms.length; i++) {\n  dropdownElms[i].addEventListener('click', () => { modeChoice = dropdownElms[i].getAttribute('value') });\n}\n\n\nfunction sendData() {\n  return _index_js__WEBPACK_IMPORTED_MODULE_0__.editor.getValue()\n}\n\nconst SAVEFS = document.getElementById('saveFs');\nconst OPENFS = document.getElementById('openFs');\nconst SETFILE = document.getElementById('setFile');\nlet FILE_PANEL= $(\"#fileList\");\n\n\n//# sourceURL=webpack://ace-code/../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/app.js?");

      /***/
    },

    /***/"../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/components/File_System/readFile.js":
    /*!**************************************************************************************************************************!*\
      !*** ../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/components/File_System/readFile.js ***!
      \**************************************************************************************************************************/
    /***/
    (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"readFile\": () => (/* binding */ readFile)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../index.js */ \"../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/index.js\");\n\n\n\nfunction readFile(fileEntry) {\n\n  fileEntry.file(function(file) {\n    var reader = new FileReader();\n\n    reader.onloadend = function() {\n      _index_js__WEBPACK_IMPORTED_MODULE_0__.editor.setValue(this.result);\n    \n    };\n\n    reader.readAsText(file);\n\n  }, (err)=>{console.log(err);});\n}\n\n\n//# sourceURL=webpack://ace-code/../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/components/File_System/readFile.js?");

      /***/
    },

    /***/"../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/components/File_System/writeFile.js":
    /*!***************************************************************************************************************************!*\
      !*** ../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/components/File_System/writeFile.js ***!
      \***************************************************************************************************************************/
    /***/
    (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"writeFile\": () => (/* binding */ writeFile)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../index.js */ \"../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/index.js\");\n\n\nfunction writeFile(fileEntry, dataObj) {\n  // Create a FileWriter object for our FileEntry (log.txt).\n  fileEntry.createWriter(function(fileWriter) {\n\n    fileWriter.onwriteend = function() {\n      console.log(\"Successful file write...\");\n      // readFile(fileEntry);\n    };\n\n    fileWriter.onerror = function(e) {\n      console.log(\"Failed file write: \" + e.toString());\n    };\n\n    // If data object is not passed in,\n    // create a new Blob instead.\n    if (!dataObj) {\n      dataObj = new Blob([_index_js__WEBPACK_IMPORTED_MODULE_0__.editor.getValue()], { type: 'text/plain' });\n    }\n\n    fileWriter.write(dataObj);\n  });\n}\n\n//# sourceURL=webpack://ace-code/../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/components/File_System/writeFile.js?");

      /***/
    },

    /***/"../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/components/configs.js":
    /*!*************************************************************************************************************!*\
      !*** ../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/components/configs.js ***!
      \*************************************************************************************************************/
    /***/
    (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EDITOR_CONFIG\": () => (/* binding */ EDITOR_CONFIG),\n/* harmony export */   \"FILE_EXTENSIONS\": () => (/* binding */ FILE_EXTENSIONS)\n/* harmony export */ });\nconst EDITOR_CONFIG = {\n  wrap:true,\n  enableBasicAutocompletion: true,\n  enableSnippets: true,\n  enableLiveAutocompletion: true,\n  highlightGutterLine: true,\n  highlightActiveLine: true,\n  showPrintMargin: true,\n  showInvisibles: true,\n  fontSize: \"10px\",\n  tabSize: 2,\n  mode: \"ace/mode/python\",\n  keyboardHandler:'ace/keyboard/vim',\n  theme:\"ace/theme/dracula\"\n}\n\nconst FILE_EXTENSIONS = {\n  \"Python\":\"py\",\n  \"C\":\"c\",\n  \"Java\":\"java\"\n}\n\n//# sourceURL=webpack://ace-code/../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/components/configs.js?");

      /***/
    },

    /***/"../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/components/main_FileEntry.js":
    /*!********************************************************************************************************************!*\
      !*** ../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/components/main_FileEntry.js ***!
      \********************************************************************************************************************/
    /***/
    (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"onDeviceReady\": () => (/* binding */ onDeviceReady)\n/* harmony export */ });\n/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.js */ \"../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/app.js\");\n/* harmony import */ var _File_System_writeFile_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./File_System/writeFile.js */ \"../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/components/File_System/writeFile.js\");\n/* harmony import */ var _File_System_readFile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./File_System/readFile.js */ \"../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/components/File_System/readFile.js\");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../index.js */ \"../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/index.js\");\n\n\n\n\n\n\n\nfunction onDeviceReady() {\n  /**\n   * Read the local storage and fill the sidebar with files in it\n   **/\n  function listDir(url) {\n    let List = []\n    let promise = new Promise(function(res, reject) {\n      window.resolveLocalFileSystemURL(url,\n        function(fs) {\n          const reader = fs.createReader();\n          reader.readEntries(function(entries) {\n            res(entries)\n          }, (rej) => { return rej });\n        }, (rej) => { return rej });\n    });\n    promise.then((val) => { val.forEach((v) => { List.push(v) }) })\n    return List\n  }\n\n  const FILES = \"\";\n\n  let filesList = listDir(cordova.file.externalRootDirectory);\n  function fillFilePanel() {\n    for (let i = 0; i < filesList.length; i++) {\n      let entries = filesList[i]\n      if (entries.isDirectory == true) {\n        _app_js__WEBPACK_IMPORTED_MODULE_0__.FILE_PANEL.append(`<button type=\"button\" class=\"list-group-item list-group-item-action\" data-toggle=\"#${entries.name}Group\">${entries.name}</button>\n        <ul class=\"list-group\" id=\"f${entries.name}Group\"></ul>\n        `)\n        showSubFolder(entries);\n      }\n      else {\n        _app_js__WEBPACK_IMPORTED_MODULE_0__.FILE_PANEL.append(`<button type=\"button\" class=\"list-group-item list-group-item-action\">${entries.name}</button>`);\n      }\n    }\n  }\n  setTimeout(fillFilePanel, 1000);\n\n  function showSubFolder(parentDir) {\n    for (let x = 0; x < listDir(`${parentDir.nativeURL}`).length; x++) {\n    console.log(x);\n      let subFiles = listDir(`${parentDir.nativeURL}`)[x]\n      $(`#f${parentDir}Group`).append(`<button type=\"button\" class=\"list-group-item list-group-item-action\">${subFiles.name}</button>`)\n    }\n  }\n\n\n\n  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,\n    function(fs) {\n      _app_js__WEBPACK_IMPORTED_MODULE_0__.SETFILE.addEventListener('click', doThis)\n\n      function doThis() {\n        if (_app_js__WEBPACK_IMPORTED_MODULE_0__.modeChoice == 'python') {\n          console.log('editing python file');\n          workWithFile(\"PYTHON/main.py\");\n        }\n\n        if (_app_js__WEBPACK_IMPORTED_MODULE_0__.modeChoice == 'c_cpp') {\n          console.log('editing C file');\n          workWithFile(\"C/main.c\");\n        }\n      }\n\n      function workWithFile(fileName) {\n        fs.root.getFile(fileName, { create: true, exclusive: false }, function(fileEntry) {\n          _app_js__WEBPACK_IMPORTED_MODULE_0__.OPENFS.addEventListener('click', readF)\n\n          function readF() {\n            ;(0,_File_System_readFile_js__WEBPACK_IMPORTED_MODULE_2__.readFile)(fileEntry);\n          }\n          //SAVE FILE when saveFs btn is clicked\n          _app_js__WEBPACK_IMPORTED_MODULE_0__.SAVEFS.addEventListener('click', saveFileC);\n\n          function saveFileC() { (0,_File_System_writeFile_js__WEBPACK_IMPORTED_MODULE_1__.writeFile)(fileEntry, null); }\n\n        }, () => { console.log('failed to save file'); });\n      }\n    }, () => { console.log('failed to load file system'); });\n\n}\n\n//# sourceURL=webpack://ace-code/../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/components/main_FileEntry.js?");

      /***/
    },

    /***/"../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/index.js":
    /*!************************************************************************************************!*\
      !*** ../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/index.js ***!
      \************************************************************************************************/
    /***/
    (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"editor\": () => (/* binding */ editor)\n/* harmony export */ });\n/* harmony import */ var _components_configs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/configs.js */ \"../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/components/configs.js\");\n/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.js */ \"../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/app.js\");\n\n\n\n\nace.require(\"ace/ext/language_tools\");\nconst editor = ace.edit('editor');\neditor.setOptions(_components_configs_js__WEBPACK_IMPORTED_MODULE_0__.EDITOR_CONFIG);\n\neditor.commands.addCommand({\n  name: 'confirm language',\n  bindKey: { win: 'Ctrl-N', mac: 'Command-N' },\n  exec: function(editor) {\n    editor.session.setMode(`ace/mode/${_app_js__WEBPACK_IMPORTED_MODULE_1__.modeChoice}`);\n  }\n});\n\n//\n\n\n//# sourceURL=webpack://ace-code/../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/index.js?");

      /***/
    }

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/
  var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/
  function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/var cachedModule = __webpack_module_cache__[moduleId];
    /******/
    if (cachedModule !== undefined) {
      /******/return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/
    var module = __webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/exports: {}
      /******/
    };
    /******/
    /******/ // Execute the module function
    /******/
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/
    /******/ // Return the exports of the module
    /******/
    return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/
  (() => {
    /******/ // define getter functions for harmony exports
    /******/__webpack_require__.d = (exports, definition) => {
      /******/for (var key in definition) {
        /******/if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          /******/Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key]
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/
  (() => {
    /******/__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/
  (() => {
    /******/ // define __esModule on exports
    /******/__webpack_require__.r = exports => {
      /******/if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });
        /******/
      }
      /******/
      Object.defineProperty(exports, '__esModule', {
        value: true
      });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module is referenced by other modules so it can't be inlined
  /******/
  var __webpack_exports__ = __webpack_require__("../../../../../../storage/emulated/0/Android/data/io.spck/files/Ace-Code/www/js/app.js");
  /******/
  /******/
})();