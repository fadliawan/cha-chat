(function() {

  'use strict';

  var express = require('express');
  var app = express();
  var http = require('http').Server(app);
  var io = require('socket.io')(http);

  app.use(express.static('app/public'));

  app.get('/', function(req, res) {
    res.send('Hello world!');
  });

  // Chat page
  app.get('/chat', function(req, res) {
    res.sendFile(__dirname + '/chat.html');
  });

  // IO connection
  io.on('connection', function(socket) {
    // User
    socket.on('new user', function(user) {
      console.log(user + ' has joined');
    });

    // Chat
    socket.on('incoming message', function(data) {
      io.emit('new message from someone', data);
    });
  });

  http.listen(3000, function() {
    console.log('listening on port 3000');
  });

})();
