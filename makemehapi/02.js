var hapi = require("hapi");
var server = new hapi.Server();

server.connection({
    host: "localhost",
    port: Number(process.argv[2] || "8080")
});

server.route({
    path: "/{name}",
    method: "GET",
    handler: function(request, response){
        response("Hello " + request.params.name);
    }
});

server.start();
