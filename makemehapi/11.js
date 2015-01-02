var hapi = require("hapi");
var server = new hapi.Server();

var joi = require("joi");

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || '8080')
});

server.route({
    path: '/upload',
    method: 'POST',
    handler: function(request, reply){
        var result = {};
        var body = "";
        request.payload.file.on('data', function(data){
            body = body + data;
        });
        request.payload.file.on('end', function(data){
            result.description = request.payload.description;
            result.file = {};
            result.file.data = body;
            result.file.filename = request.payload.file.hapi.filename;
            result.file.headers = request.payload.file.hapi.headers;
            reply(result);
        });
    },
    config: {
        payload: {
            output: 'stream',
            allow: 'multipart/form-data',
            parse: true
        }
    }
});


server.start();
