var hapi = require("hapi");
var server = new hapi.Server();

var joi = require("joi");

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || '8080')
});

server.route({
    path: '/login',
    method: 'POST',
    handler: function(request, reply){
        reply('login successful');
    },
    config: {
        validate: {
            payload: joi.object({
                password: joi.string().alphanum(),
                accessToken: joi.string().alphanum(),
                isGuest: joi.boolean().required(),
                username: joi.when('isGuest', {is: false, then: joi.required()})
            })
            .options({allowUnknow: true})
            .without('password', 'accessToken')
        }
    }
});


server.start();
