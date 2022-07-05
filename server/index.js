const io = require('socket.io');

module.exports = function (http) {
    const socket = new io.Server(http);
    socket.on('connection', (client) => {
        console.log(client.id);
    });
}