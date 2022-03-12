const fs = require('fs');
const path = require('path');

function tree(dirPath){

    if (dirPath == undefined) { // if we dont pass path then it will be undefine
        treeHelper(process.cwd(),"");
        return;
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            treeHelper(dirPath,"");
        } else {
            console.log("Path dont exist");
            return;
        }

    }

}


function treeHelper(dirPath,indent){
    let isFile = fs.lstatSync(dirPath).isFile();
    if(isFile==true){
        let fileName = path.basename(dirPath); // if we have file like ./c/downlode/index.js -> then it give us index.js
        console.log(indent + "|-----------"+fileName)

    }else{

        let dirName = path.basename(dirPath);
        console.log(indent + "|__________"+dirName);

        let childrens = fs.readdirSync(dirPath);
        for(let i=0; i<childrens.length; i++){
            let childrenPath = path.join(dirPath,childrens[i]);
            treeHelper(childrenPath,indent + "\t");
        }
    }
}










module.exports = {
    tree : tree
}