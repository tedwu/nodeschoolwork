var hapi = require("hapi");
var server = new hapi.Server();

var path = require("path");

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || '8080')
});

server.route({
    path: '/',
    method: 'GET',
    handler: {
        view: 'index_helper.html'
    }
});

server.views({
    engines: {
       html: require('handlebars') 
    },
    path: path.join(__dirname, 'templates'),
    helpersPath: path.join(__dirname, 'helpers')
});

server.start();
