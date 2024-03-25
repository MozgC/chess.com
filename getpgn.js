function getPgn()
{
	var isTypeOne = $("div.game-controls-wrapper").length;

	var res = "";

	var rows = isTypeOne ? "div.vertical-move-list-notation-vertical" : "vertical-move-list div.move";

	$(rows).each( function( index, element )
	{
		var move = isTypeOne ? index + 1 : $(element).attr("data-whole-move-number");
		res += move + ". ";

		var moves = isTypeOne ? "span.move-text-component" : "div.node";

		$(element).find(moves).each(function(indexInternal, elementInternal)
		{
			var figurine = "";

			if (isTypeOne)
			{
				var figurineCheck = $(elementInternal).find("span");

				if (figurineCheck.is(".knight-black", "knight-white"))
					figurine = "N";
				else if (figurineCheck.is(".bishop-black", ".bishop-white"))
					figurine = "B";
				else if (figurineCheck.is(".rook-black", ".rook-white"))
					figurine = "R";
				else if (figurineCheck.is(".king-black", ".king-white"))
					figurine = "K";
				else if (figurineCheck.is(".queen-black", ".queen-white"))
					figurine = "Q";
			}
			else
				figurine = $(elementInternal).find("span.icon-font-chess").attr("data-figurine") ?? "";

			res += figurine + $(elementInternal).text().trim() + " ";
		});

	});

	return res.trim();
}

function addButton()
{
	var isTypeOne = $("div.game-controls-wrapper").length;

	var panel = isTypeOne ? $("div.game-controls-wrapper") : $("wc-vertical-move-list");
	
	// check if they updated their html
	if (panel.length == 0)
		alert("No panel found!");

	var button = $("<button type='button' style='width:100%'>GET PGN & ANALYSE IN LICHESS</button>");
	panel.before(button);

	button.click(function()
	{
		var res = getPgn();

		alert("PGN: " + res);

		window.open("https://lichess.org/analysis/pgn/" + res, '_blank');

	});
}