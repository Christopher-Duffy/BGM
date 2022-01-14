//injected from socket.io
var socket = io();

//client event handlers here
function addSocketEvents(socket){
  // socket.on('highScores',function(data){
  //   showHighScores(data);
  // });
  socket.on('draggables',function(data){
    console.log(data);
  });
}
//add the event handlers to the client socket
addSocketEvents(socket);