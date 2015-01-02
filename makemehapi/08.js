var hapi = require("hapi");
var server = new hapi.Server();

var path = require("path");
var fs = require("fs");

var rot13 = require("rot13-transform");

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || '8080')
});

server.route({
    path: '/',
    method: 'GET',
    handler: function(request, reply){
        var readStream = fs.createReadStream('file').pipe(rot13());
        reply(readStream);
    }
});


server.start();
