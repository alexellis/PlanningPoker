var socket;
var totalCards = 10;

$(document).ready( function(){
	socket = io();

	socket.on('client connected', function(data){
		console.log("Client connected to server.");
	});
	if(postLoad){
		postLoad();
	}

});
