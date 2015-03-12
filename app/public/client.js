(function($) {

  'use strict';

  var socket = io();
  var currentUsername = null;

  // Who?
  $('.name-form').on('submit', function() {
    currentUsername = $('.name-input').val();
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

  socket.on('new message from someone', function(message) {
    var user = '<strong>' + message.username + ':</strong>';
    var msg = message.message;
    var time = ' <span>' + new Date(message.sent_at).toLocaleTimeString() + '</span>';
    $('.messages').append(
      $('<li/>').html(user + ' ' + msg + time)
    );
  });
})(jQuery);