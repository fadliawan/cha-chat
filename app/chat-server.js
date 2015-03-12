(function() {

  'use strict';

  var CHAT_PORT = 3000;

  var express = require('express');
  var app = express();
  var http = require('http').Server(app);
  var io = require('socket.io')(http);

  var models = require('./models');
  var Message = models.Message;

  app.use(express.static('app/public'));
  app.set('view engine', 'ejs');
  app.set('views', __dirname+'/views');

  app.get('/', function(req, res) {
    res.send('Hello world!');
  });

  // Chat page
  app.get('/chat', function(req, res) {
    new Message().fetchAll().then(function(messages) {
      res.render('chat', { messages: messages.toJSON() });
    }, function() {
      console.log('Error loading messages.');
    });
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
      .then(function(message) {
        io.emit('new message from someone', message);
      }, function() {
        console.log('There was an error saving the message.');
      });
    });
  });

  http.listen(CHAT_PORT, function() {
    var os = require('os');
    var interfaces = os.networkInterfaces();
    var thisMachinesIP = interfaces.en0[1].address;

    console.log('Listening on', [thisMachinesIP, CHAT_PORT].join(':'));
  });

})();
