const http = require("http");
// const _ = require("Underscore");

http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write("<h1>Hello, world</h1>");
    res.end();
}).listen(3001);
