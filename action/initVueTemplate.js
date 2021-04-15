const program = require("commander");
const fsPromise = require('../lib/fsPromise');
const path = require('path');

program
    .usage("dy init vue-template [file-name]")
    .version("1.1.4", '-v, --version')
    .description("初始化用，省去每个脚手架去除默认文件的繁琐")
    .parse(process.argv);

program
    .command("<template> <file-name>")
    .action(async function (template, filename) {
        console.log(template);
        console.log(filename);
        // let data = await fsPromise.readFile(path.resolve(__dirname, '../lib/template.vue'));
        // data.replace()
    });
program.parse(process.argv);
