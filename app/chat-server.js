(function() {

  'use strict';

  var express = require('express');
  var app = express();
  var http = require('http').Server(app);
  var io = require('socket.io')(http);

  var models = require('./models');
  var Message = models.Message;

  app.use(express.static('app/public'));

  app.get('/', function(req, res) {
    res.send('Hello world!');
  });

  // Chat page
  app.get('/chat', function(req, res) {
    new Message().fetchAll().then(function(messages) {
      console.log(messages.toJSON());
    }, function() {
      console.log('Error loading messages.');
    });
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
      new Message({
        username: data.username,
        message: data.message,
        sent_at: +new Date()
      })
      .save()
      .then(function() {
        io.emit('new message from someone', data);
      }, function() {
        console.log('There was an error saving the message.');
      });
    });
  });

  http.listen(3000, function() {
    console.log('listening on port 3000');
  });

})();
