var hapi = require("hapi");
var server = new hapi.Server();

var joi = require("joi");

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || '8080')
});

server.route({
    path: '/set-cookie',
    method: 'GET',
    handler: function(request, reply){
        var session = request.state.session;
        if(!session){
            session = {key: 'makemehapi'}
        }
        reply(session).state('session', session);
    }
});

server.route({
    path: '/check-cookie',
    method: 'GET',
    handler: function(request, reply){
        var session = request.state.session;
        if(!session){
            reply(Hapi.error.unauthorized('No Seesion Exist'));
        }else{
            reply({user: 'hapi'});
        }
    }
});

server.state('session', {
    path: '/{path*}',
    encoding: 'base64json',
    ttl: 10,
    domain: 'localhost'
});

server.start();
