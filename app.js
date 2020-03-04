var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var n=0;

app.use("/", express.static(__dirname + "/public"));
app.use("/bower_components", express.static(__dirname + "/bower_components"));
var port=8000;
http.listen(port, function(){
  console.log("Listening on port "+port+", http://localhost:"+port+"/");
});

io.on('connection',function (socket) {
    socket.emit('client connected', { });
    var client_ip_address = socket.request.connection.remoteAddress;
    console.log('A user connected ' + client_ip_address);

    socket.on('disconnect', function(){
        var client_ip_address = socket.request.connection.remoteAddress;
        console.log(  client_ip_address + ' has disconnected.');
    });

socket.on('command',
	function (data){
		console.log(data);
        var commandType = data['type'];
		if(commandType == 'new-game') {
			n=n+1;
			io.emit('command', 
                    {
                    type: 'game-started',
                    counter: n,
                    story: data['story']
                    });
		}
		else if(commandType == 'selected-card' || commandType == 'show-cards' || commandType == 'player-joined') {
			io.emit('command', data);	
		}
	});
});

