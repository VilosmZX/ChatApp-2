const io = require('socket.io');

module.exports = function (http) {
    const socket = new io.Server(http);
    socket.on('connection', (client) => {
        client.on('disconnect', (reason) => {
            console.log(`${client.id} is disconnected.`);
        })
        client.on('incoming_chat', (name, msg) => {
            client.broadcast.emit('incoming_chat', name, msg);
        })
        client.on('change_name', (oldName, newName) => {
            socket.emit('change_name', oldName, newName);
        })
        client.on('new_user', (name) => {
            socket.emit('new_user', name);
        })
    });
    
}