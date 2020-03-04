var clicked = 0;
var cardLayed = false;
var myNameValue;

function postLoad() {

    var init = function init() {
		$("#gamePlay").hide();
		$("#waitingStart").hide();
	};
	init();

	var removeClasses = function (clearAll) {
		for(var i = 1; i < totalCards; i++) {
			if(clearAll || i != clicked)
			{
				$("#card"+i).removeClass("hover-card");
			}
		}
	};

	var joinGame = function(name) {
		socket.emit('command',
	        {
	            type : 'player-joined',
	            name: name
	        });
	};

	$("#join").click(function() {
		var val = $("#myName").val();
		if(val == "") {
			alert("Enter a valid name");
		} else {
			myNameValue = val;
			$("#enterName").hide();
			$("#waitingStart").show();
			joinGame(myNameValue);
		}
	});

	socket.on('command', function(data) {
        var commandType = data['type'];
		if(commandType == 'game-started') {
			$("#cards").show();
			alert('Dealer just started a new game.');
			$("#gamePlay").css('display', 'inline');
			$("#waitingStart").hide();
			removeClasses(true);
			clicked = 0;
			cardLayed=false;
			$("#cardResults").text("");
			$("#storyName").text(data["story"]);
			$("#layCard").attr("value", "Lay card");
		}
		else if(commandType == 'show-cards')
		{
			var cards = data['cards'];
			$("#cardResults").text("");
			for (var i = 0; i < cards.length; i++) {
				$("#cardResults").append("<div class='card' id='result"+i+"'>" + cards[i] + "</div>");
			};
		}
	});

	
	$("#layCard").click(function() {
		if(cardLayed) {
			alert('Your card is layed, wait until everyone has taken their turn.');
		}
		else if(clicked!=0) {
			cardLayed=true;
			socket.emit('command',
                        {
                            type : 'selected-card',
                            points: $("#card"+clicked).text(),
                            name: myNameValue
                        });
			$("#layCard").attr("value", "Wait..");
		}
		else {
			alert("Click a card");
		}
	});

	for(var i=1;i<totalCards;i++) {
		var v = function() {
		var index = i;

		$("#card"+index).click(function() {
			if(!cardLayed) {
                clicked = index;
                removeClasses(false);
		  }
		});
		$("#card"+index).hover(
			function() {
				if(!cardLayed)
				{
					$(this).addClass("hover-card");
				}
			},
			function() {
				if(!cardLayed) {
					if(index!=clicked)
					{
						$(this).removeClass("hover-card");
					}
			}
			});
		}();
	}
}
