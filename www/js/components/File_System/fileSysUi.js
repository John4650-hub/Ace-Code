let conColor = " text-primary";

 export function entryIcon(entry) {
     let ftype = entry.name.split('.');
     let ext = ftype.length - 1;
     switch (ftype[ext].toLowerCase()) {
         case 'py':
             entry.icon = "fab fa-python" + conColor;
             break
         case 'java':
             entry.icon = "fab fa-java" + conColor;
             break
         case 'html':
             entry.icon = "fab fa-html5" + conColor;
             break
         case 'css':
             entry.icon = "fab fa-css3" + conColor;
             break
         case 'js':
             entry.icon = "fab fa-js" + conColor;
             break
         case 'c':
             entry.icon = "fab fa-cuttlefish" + conColor;
             break
         default:
             entry.icon = "fa fa-file" + conColor;
     }
 }