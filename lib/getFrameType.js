const inqurier = require('inquirer');
const gitClone = require('download-git-repo');
const fs = require('fs');
// 颜色显示工具
const chalk = require("chalk");
const exec = require('child_process').exec;
const shell = require('shelljs');
const reWriteHtml = require('../lib/reWriteHtml');
const reWriteNavBar = require('../lib/reWriteTitle');
const ora = require('ora');

function inqurierPromise (options) {
    return new Promise((resolve, reject) => {
        inqurier.prompt({
            ...options
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err);
        })
    })
}

function gitClonePromise(url, localPath){
    return new Promise((resolve, reject) => {
        const spiner = ora("开始下载...").start();
        setTimeout(() => {
            spiner.color = "yellow";
            spiner.text = `正在下载..... ${chalk.yellow(url)} `;
        }, 1000)
        gitClone(url, localPath, function (err) {
            if(err){
                spiner.color = "red";
                spiner.text = "下载失败";
                spiner.fail();
                reject(err)
                return
            }
            spiner.color = "green";
            spiner.text = `下载成功 `;
            spiner.stop();
            resolve();
        })
    })
}

async function getFrameType (dirname) {
    try {
        let downloadUrl = '';
        const step1 = await inqurierPromise(
            {
                message: "What is your project name",
                name: 'projectName',
                default: 'test',
                type: 'string'
            }
        )
        // const step1 = await inqurierPromise(
        //     {
        //         message: "需要vue还是react  1.vue 2.react",
        //         name: 'needFrame',
        //         default: 1,
        //         type: 'number'
        //     }
        // )
        console.log('fdasfasdfads')
        await gitClonePromise('jinhangcai/MarkNext', process.cwd() + "/" + step1.projectName);
        // if(step1.needFrame == 1){
        //     const step2 = await inqurierPromise({
        //         message: "需要一个空模板还是后台模板？  1.空模板 2. 后台模板",
        //         name: 'needTemplate',
        //         default: 1,
        //         type: 'number'
        //     })
        //     if(step2.needTemplate == 1){
        //
        //     } else if(step2.needTemplate == 2){
        //         await gitClonePromise('jinhangcai/MarkNext', process.cwd() + "/" + dirname);
        //         // await reWriteHtml(dirname, `${process.cwd()}/${dirname}/index.html`);
        //         // await reWriteNavBar(dirname, `${process.cwd()}/${dirname}/src/views/layout/components/Navbar.vue`)
        //         // const data = fs.readFileSync(`${process.cwd()}/${dirname}/package.json`);
        //         // let pkg = JSON.parse(data);
        //         // console.log('pkg', pkg)
        //         // pkg.devDependencies['jquery'] = '^3.5.1'
        //         // fs.writeFileSync(`${process.cwd()}/${dirname}/package.json`, JSON.stringify(pkg, null, 2));
        //         // const cmdStr = 'npm i --save-dev jquery';
        //         // exec(cmdStr, (err, stdout, stderr) => {
        //         //     if (err){
        //         //         console.log(err);
        //         //         console.warn(new Date(),' API文档编译命令执行失败');
        //         //     } else {
        //         //         console.log(stdout);
        //         //         console.warn(new Date(),' API文档编译命令执行成功');
        //         //     }
        //         // });
        //     }
        // } else if(step1.needFrame == 2) {
        //
        // }
    } catch(err){
        console.log('err', err);
    }

}

module.exports = getFrameType;
