const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

let server = http.createServer((req,res) => {
    let clientPath = url.parse(req.url).pathname;
    let status = 404;
    let serverPath = './html/404.html';
    console.log("Client requested: ",clientPath) 
    if (clientPath == '/') {
        status = 200;
        serverPath = './html/index.html'
    }
    res.writeHead(status, {'Content-Type': 'text/html'});
    fs.createReadStream(serverPath).pipe(res);
});
server.listen(8080)
