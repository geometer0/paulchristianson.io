const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

let server = http.createServer((req,res) => {
    const clientPath = url.parse(req.url).pathname;
    const clientExtension = path.extname(clientPath);
    const clientFile = path.basename(clientPath);
    console.log("Client requested: ",clientPath)

    const extensions = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.jpg': 'image/jpg',
    }

    const dirs = {
        '.html': 'html',
        '.css': 'css',
        '.jpg': 'img',
    }

    let serverPath = './html/404.html';
    let status = 404;

    if (clientPath == '/') {
        serverPath = './html/index.html'
        status = 200;
    } else if (clientExtension in dirs) {
        console.log("Hi, you've reached clientExtension in dirs")
        console.log("directory found: ",dirs[clientExtension])
        serverPath = path.join(__dirname, dirs[clientExtension], clientFile)
        if (fs.existsSync(serverPath)) {
            console.log("Serverpath set to ",serverPath)
            status = 200;
        }
    }

    res.writeHead(status, {'Content-Type': extensions[clientExtension] || 'text/html'} );
    
    fs.createReadStream(serverPath).pipe(res);
});
server.listen(8080)
