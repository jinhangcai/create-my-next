const fs = require('fs');

module.exports = {
    readFile (path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'UTF-8', (err, data) => {
                if (err) {
                    console.error(err)
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    },
    writeFile (path, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, data, err => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve();
                }
            })
        })
    }
}
