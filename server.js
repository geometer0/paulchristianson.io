const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

let server = http.createServer((req,res) => {
    const clientPath = url.parse(req.url).pathname;
    const clientExtension = path.extname(clientPath);
    console.log("Client requested path: ",clientPath)

    const extensions = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.jpg': 'image/jpg',
    }

    const publicFiles = {
        '/index.css': 'css/index.css',
        '/404.html': 'html/404.html',
        '/404.css': 'css/404.css',
        '/Albertina_DG1934_349.jpg': 'img/Albertina_DG1934_349.jpg',
    }

    let serverPath = './html/404.html';
    let status = 404;

    if (clientPath == '/' || clientPath == '/index.html') {
        console.log("Request for index detected, server path set to ./html/index.html")
        serverPath = './html/index.html'
        console.log('Server path set to ',serverPath)
        status = 200;
    } else if (clientPath in publicFiles) { //only check fs for files in publicFiles list
        console.log("Routing found in publicFiles: ",publicFiles[clientPath])
        serverPath = path.join(__dirname,publicFiles[clientPath])
        console.log("Checking server...")
        if (fs.existsSync(serverPath)) {
            console.log("File found")
            status = 200;
        } else {
            console.log("File not found")
            serverPath = '/html/404.html'
        }
    }

    res.writeHead(status, {'Content-Type': extensions[clientExtension] || 'text/html'} );
    
    fs.createReadStream(serverPath).pipe(res);
});
server.listen(8080)
