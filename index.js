const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');

const server = http.createServer((req, res) => {
    fs.readFile('./index.html', (error, content) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    });
});

const io = socketio(server);

io.on('connection', function(client) {
    client.on('message', message => client.emit('message', message));

    client.emit('time', Date.now());
    setInterval(() => client.emit('time', Date.now()), 1000);
    
    client.on('disconnect', () => {});
});

server.listen(1337);
