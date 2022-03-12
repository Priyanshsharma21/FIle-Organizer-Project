// 1. dir path is give 
// 2. go there and create -> Orgaanize file dir 
// 3. check all the files cetogaries (which file is mp3,mp4,csv,pdf,jpeg,png)
// 4. Copy file to that organize dir inside of any catogary folder


let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
        "docx",
        "doc",
        "pdf",
        "xlsx",
        "xls",
        "odt",
        "ods",
        "odp",
        "odg",
        "odf",
        "txt",
        "ps",
        "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
    pic: ["jpeg", "png", "jpg"]
};



const fs = require('fs');
const path = require('path');

function organize(dirPath) {

    let destPath;

    if (dirPath == undefined) { // if we dont pass path then it will be undefine
        destPath = process.cwd();
        return;
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            destPath = path.join(dirPath, "Organize_Files"); // Got o path and make organize folder
            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath); // if folder not exist then make it othsrwise not
            }
        } else {
            console.log("Path dont exist");
        }

    }

    organizeHelper(dirPath, destPath)
}

function organizeHelper(src, dest) {

    let childNames = fs.readdirSync(src);

    for (let i = 0; i < childNames.length; i++) {
        let childAdress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAdress).isFile();

        if (isFile) {
            let catogary = getCategory(childNames[i]);
            console.log(childNames[i] + " Belongs to----> " + catogary);

            sendFile(childAdress, dest, catogary);
        }
    }

}

function getCategory(name) {
    let exe = path.extname(name);
    exe = exe.slice(1);

    for (let type in types) {
        let cTypeArray = types[type];

        for (let i = 0; i < cTypeArray.length; i++) {
            if (exe == cTypeArray[i]) {
                return type;
            }
        }
        return "others";
    }
}


function sendFile(srcFilePath, dest, catogary) {
    let categoryPath = path.join(dest, catogary);
    if (fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }

    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath,fileName);
    fs.copyFileSync(srcFilePath,destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(fileName + " copied to "+catogary);
}



module.exports = {
    organize: organize
};