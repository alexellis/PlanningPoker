var received=[];


function postLoad() {

	var init = function init() {
		$("#gameStartForm").show();
		$("#gameInstructions").hide();
		$("#playArea").hide();
		$("#showCards").prop("disabled",true);
	};

	$("#startGame").click(function() {
		if($("#gameName").val()==""){
			alert("What's the name of the game?");
		}else {
			$("#gameStartForm").toggle();
			$("#gameInstructions").toggle();
			$("#playArea").toggle();
		}
	});

	$("#play").click(function() {
		alert("Let the game begin");
		socket.emit('command', 
                    {
                        type:'new-game',
                        story:$('#storyEdit').text()
					});

		received = [];
		$("#pointsIn").text("");
		$("#pointsInByPlayer").text("");
	});

	socket.on('command', function(data) {
		if(data['type']=='selected-card') {
			var points = data['points'];
			$('#pointsIn').append("<div class=\"card\">" + points + "</div>");
			received.push(points);

			$("#pointsInByPlayer").append("<li>"+data['name']+"</li>");
			$("#showCards").prop("disabled",null);

		} else if(data['type']=='player-joined') {
			var joinedName=data['name'];
			$("#connected-parties-list").append("<li>"+joinedName+"</li>");
			$("#connected-parties").stop().animate({left:"0px"},500);
			$("#connected-parties").removeClass("sidebar-unslid");
			$("#connected-parties").addClass("sidebar-slid");
		}
	});

	$('#showCards').click(function(){
		if(received.length == 0){
			alert("No cards received yet.");
		}else {
			socket.emit('command', 
                        {
                            type : 'show-cards',
                            cards : received
                        });
			$(this).prop("disabled",true);
		}
	});

	init();
}

