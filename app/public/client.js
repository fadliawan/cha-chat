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

  socket.on('new message from someone', function(data) {
    var user = '<strong>' + data.username + '</strong>';
    var msg = data.message;
    $('.messages').append(
      $('<li/>').html(user + ': ' + msg)
    );
  });
})(jQuery);