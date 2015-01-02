var hapi = require("hapi");
var server = new hapi.Server();

var joi = require("joi");

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || '8080')
});

server.route({
    path: '/checkens/{breed}',
    method: '*',
    handler: function(request, reply){
        reply('Hello ' + request.params.breed);
    },
    config: {
        validate: {
            params: {
                breed: joi.string().required()
            }
        }
    }
});


server.start();
