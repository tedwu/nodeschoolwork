var hapi = require('hapi');
var server = new hapi.Server();

server.connection({
    host: "localhost",
    port: Number(process.argv[2] || "8080")
})

server.route({
    path: "/",
    method: "GET",
    handler: rootHandler
});

function rootHandler(req, res){
    res("Hello Hapi");
}

server.start();
