var localMessageStore = [];
var date = new Date();
var name = prompt('Hello, what is your name?');
var socket = io.connect('http://localhost:61994');
socket.emit('username', name);
$('.chatHeader h1').text(name);

$('.minimize').on('click', function() {
  $('.chat_body').toggle();
});

var html;
var height = 0;
var dateString = '';
var chatInput = '';
var chatMessage = '';
var i = 0;


function createMessage (content) {
  html = '<div class="avatar"></div><div class="chat_message messageID_' + i + '"><div class="message_details">' + content.username + '<span class="message_date">&bull; ' + content.date + '</span></div><div class="message_content">' + content.message + '</div></div>';
  $('.chat_content').append(html);
  height += $('.messageID_'+i+'').height()*2;
  $('.chat_content').scrollTop(height);
}

function sendMessage () {
  date = new Date();
  chatInput = $('#chat_input');
  dateString = '';
  dateString += date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  chatMessage = {"messageID":Sha1.hash(dateString + chatInput.val()) ,"date":dateString,"username": name, "message": chatInput.val()};
  socket.emit('chat_message', chatMessage);
  localMessageStore.push(chatMessage);
  createMessage(chatMessage);
  chatInput.val('');
  chatInput.focus();
}


socket.on('chat_message', function (data) {
  console.log(data);
  createMessage(data);
  localMessageStore.push(data);
  console.log(localMessageStore);
});


$('#in_use .chatroom').on('click', function() {
  if(!$(this).hasClass('active_room')) {
    $('.active_room').removeClass('active_room');
    $(this).addClass('active_room');
  }
});

// $('.chatroom').on('click', function() {
//   if($(this).hasClass('active_room')) {
//     socket.emit('chat_room', {action:'leave', room:$(this).attr('id')});
//     $(this).removeClass('active_room');
//     console.log('Leaving ' + $(this).attr('id'));
//   } else {
//     socket.emit('chat_room', {action:'join', room:$(this).attr('id')});
//     $(this).addClass('active_room');
//     console.log('Joining ' + $(this).attr('id'));
//   }
// });

$('#send').on('click', function() {
  sendMessage();
});

$('#old_messages').on('click', function() {
  socket.emit('control_message', 'load old');
  alert('Requesting old messages');
});

$('#chat_input').keypress(function(e) {
  if(e.which == 13) {
    sendMessage();
  }
});