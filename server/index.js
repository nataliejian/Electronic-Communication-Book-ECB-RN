var express = require('express');
var http = require('http')
var socketio = require('socket.io');
var mongojs = require('mongojs');
var date = new Date().toLocaleString();
var ObjectID = mongojs.ObjectID;
var db = mongojs(process.env.MONGO_URL || 'mongodb://input mongodb');
var app = express();
var server = http.Server(app);
var websocket = socketio(server);
server.listen(3000, () => console.log('listening on *:3000'));

// Mapping objects to easily map sockets and users.
var clients = {};
var users = {};
 
// This represents a unique chatroom.
// For this example purpose, there is only one chatroom;
var chatId = 1;

websocket.on('connection', (socket) => {
    clients[socket.id] = socket;
    socket.on('userJoined', (userId) => onUserJoined(userId, socket));
    socket.on('getPreMessages_personal', (userId, othersId) => personal_sendExistingMessages(userId, othersId, socket));
    socket.on('getPreMessages_class', (userId, chatId) => class_sendExistingMessages(userId, chatId, socket));
    // socket.on('message', (message) => onMessageReceived(message, socket));
    socket.on('class_message', (message) => class_sendAndSaveMessage(message, socket));
    socket.on('personal_message', (message) => personal_sendAndSaveMessage(message, socket));
});

// Event listeners.
// When a user joins the chatroom.
// function onUserJoined(userId, socket) {
//   try {
//     // The userId is null for new users.
//     if (!userId) {
//       var user = db.collection('users').insert({}, (err, user) => {
//         socket.emit('userJoined', user._id);
//         users[socket.id] = user._id;
//         _sendExistingMessages(socket,userId);
//       });
//     } else {
//       users[socket.id] = userId;
//       _sendExistingMessages(socket);
//     }
//   } catch(err) {
//     console.err(err);
//   }
// }

// When a user sends a message in the chatroom.
// function onMessageReceived(message, senderSocket) {
//   // console.log(senderSocket)
//   // var userId = users[senderSocket.id];
//   // // Safety check.
//   // if (!userId) return;

//   _sendAndSaveMessage(message, senderSocket);
// }

// Helper functions.
// Send the pre-existing messages to the user that just joined.
function personal_sendExistingMessages(userId, othersId, socket) {
  console.log(date);
  console.log(userId);
  console.log(othersId);
  var messages = db.collection('messages')
    // .find({ $ro:["user.name":userId ,"user.others":othersId}}])
    .find( { $or: [ { "user.name":userId, "user.others":othersId }, { "user.name":othersId, "user.others":userId} ] } )
    .sort({ createdAt: 1 })
    .toArray((err, messages) => {
      // If there aren't any messages, then return.
      if (!messages.length) return;
      socket.emit('message', messages.reverse());
  });
}

function class_sendExistingMessages(userId, chatId, socket) {
  console.log(date);
  console.log('userId: '+userId);
  console.log('chatId: '+chatId);
  var messages = db.collection('messages')
    .find({ "user.chatId":chatId})
    .sort({ createdAt: 1 })
    .toArray((err, messages) => {
      // If there aren't any messages, then return.
      if (!messages.length) return;
      socket.emit('message', messages.reverse());
  });
}

// Save the message to the db and send all sockets but the sender.
function personal_sendAndSaveMessage(message, socket, fromServer) {
  console.log(date);
  console.log('message-name:　'+message.user.name)
  console.log('message-others: '+message.user.others)
  var messageData = {
    text: message.text,
    user: message.user,
    createdAt: new Date(message.createdAt),
    chatId: chatId
  };

  db.collection('messages').insert(messageData, (err, message) => {
    // If the message is from the server, then send to everyone.
    var emitter = fromServer ? websocket : socket.broadcast;
    var str = 'message'
    var name = message.user.name;
    var others = message.user.others;
    var socket1 = str+'/'+name+'/'+others;
    var socket2 = str+'/'+others+'/'+name;
    // console.log(socket1)
    // console.log(socket2)
    emitter.emit(socket1, [message]);
    emitter.emit(socket2, [message]);
  });
}

function class_sendAndSaveMessage(message, socket, fromServer) {
  console.log(date);
  console.log('message-name:　'+message.user.name)
  console.log('message-others: '+message.user.chatId)
  var messageData = {
    text: message.text,
    user: message.user,
    createdAt: new Date(message.createdAt),
    chatId: chatId
  };

  db.collection('messages').insert(messageData, (err, message) => {
    // If the message is from the server, then send to everyone.
    var emitter = fromServer ? websocket : socket.broadcast;
    console.log(emitter)
    var chatId = message.user.chatId;
    emitter.emit('message/'+chatId, [message]);
  });
}
// Allow the server to participate in the chatroom through stdin.
var stdin = process.openStdin();
stdin.addListener('data', function(d) {
  _sendAndSaveMessage({
    text: d.toString().trim(),
    createdAt: new Date(),
    user: { _id: 'robot' }
  }, null /* no socket */, true /* send from server */);
});
