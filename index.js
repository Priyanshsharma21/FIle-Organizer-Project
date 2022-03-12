#!/usr/bin/env node

const fs = require('fs');
let args = process.argv.slice(2);
let help = require('./commands/help')
let organize = require('./commands/organize');
let tree = require("./commands/tree");


let command = args[0];
let dirName = args[1];

switch (command) {

    case "tree":
        tree.tree(dirName);
        break;
    case "organize":
        organize.organize(dirName);
        break;
    case "help":
        help.help();
        break;

    default:
        console.log("Please enter right command🙏");
}



