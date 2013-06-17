var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    messagecount = 0,
    clientcount = 0,
    connectedUsers = [],
    chatMessages = [];


app.listen(61995);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  console.log('Client ' + socket.id + ' connected.');
  clientcount +=1;
  console.log(clientcount + ' clients connected.');
  socket.join('global_chat');

  socket.on('disconnect', function() {
    clientcount -=1;
    console.log('Client Disconnected');
  });

  socket.on('update', function (data) {
    socket.broadcast.emit('update', data);
    messagecount +=1;
    console.log(messagecount + ' Messages sent');
  });

  socket.on('chat_message', function (data) {
    socket.broadcast.emit('chat_message', data);
    messagecount +=1;
    chatMessages.push(data);
    console.log(messagecount + ' Messages sent');
  });

  socket.on('control_message', function(data){
    console.log(data);
    if (data === 'load old') {
      for (var i = 0; i < chatMessages.length; i++) {
        socket.emit('chat_message', chatMessages[i]);
      }
    }
  });

  socket.on('username', function(data) {
    console.log('User ' + data + ' with id ' + socket.id + ' connected.');
    connectedUsers.push({username: data, id: socket.id, channels: ['global_chat']});
  });

});
