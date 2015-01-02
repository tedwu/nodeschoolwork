var hapi = require("hapi");
var server = new hapi.Server();

var path = require("path");

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || '8080')
});

server.route({
    path: '/foo/bar/baz/{name}',
    method: 'GET',
    handler: {
        directory: {path: path.join(__dirname, 'public')}
    }
});


server.start();
