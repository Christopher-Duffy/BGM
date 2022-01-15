//node module includes
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
let express = require('express');
var app = require('express')();
var http = require('http').Server(app);
let io = require('socket.io')(http);
const request = require('request');

//custom includes
var components = require('./components.js');
//express client files
app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//components.Draggable();

//io.emit("name",dataobject);
var draggables = [];

io.on('connection', function(socket){
  console.log('A user connected.');
  
  socket.on('newDraggable', function(data){
    var draggable = new components.Draggable(draggables.length,data.x,data.y,data.image);
    draggables.push(draggable);
    broadcast();
  });
  
  socket.on('moveDraggable', function(data){
    console.log(data);
    for(var i=0;i<draggables.length;i++){
      if(draggables[i].eleID==data.eleID){
        console.log('element id found');
        draggables[i].x=data.x;
        draggables[i].y=data.y;
      }
    }
    broadcast();
  });
});



function broadcast(){
  io.emit("draggables",draggables);
}


http.listen(process.env.PORT || 3000, function(){});