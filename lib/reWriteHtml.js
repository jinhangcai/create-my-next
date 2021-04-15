const fs = require('fs');

module.exports = function reWriteHtml(title, localPath){
    return new Promise((resolve, reject) => {
        const template = `<!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1.0">
            <title>${title}</title>
          </head>
          <body>
            <div id="app"></div>
            <!-- built files will be auto injected -->
          </body>
        </html>
`
        fs.writeFile(localPath, template, function (err) {
            if(err){
                console.log(err)
                reject(err)
            }
            resolve();
        })
    })
}

