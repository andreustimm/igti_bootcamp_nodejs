import http from 'http';

http.createServer((req, res) => {
    res.write("Hello World!");
    res.statusCode = 200;
    res.end();
}).listen('8888');