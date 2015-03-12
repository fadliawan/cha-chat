(function() {

  'use strict';

  var $ = require('jquery');
  var socket = require('socket.io-client')();

  var currentUsername = null;

  // Who?
  $('.name-form').on('submit', function() {
    currentUsername = $('.name-input').val();

    if (!currentUsername) {
      alert('Please enter a username!');
      return false;
    }

    socket.emit('new user', currentUsername);

    $(this).hide();
    $('.thread').show();

    return false;
  });

  // Start chatting
  $('.message-form').on('submit', function() {
    var $msgInput = $('.message-input');
    var msg = $msgInput.val();
    socket.emit('incoming message', { username: currentUsername, message: msg });
    $msgInput.val('');

    return false;
  });

  socket.on('new message', function(message) {
    var user = '<strong>' + message.username + ':</strong>';
    var msg = message.message;
    var time = ' <span>' + new Date(message.sent_at).toLocaleTimeString() + '</span>';
    $('.messages').append(
      $('<li/>').html(user + ' ' + msg + time)
    );
  });

})();