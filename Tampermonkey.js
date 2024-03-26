// ==UserScript==
// @name         Chess.com get PGN
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.chess.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chess.com
// @grant        none
// @require https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */

(function() {
	'use strict';

	$( document ).ready(function()
	{
		window.setTimeout(function ()
		{
			addButton();
		}, 3000);
	});
})();

function getPgn()
{
	var isTypeOne = $("div.game-controls-wrapper").length;

	var res = "";

	var rows = isTypeOne ? "div.vertical-move-list-notation-vertical" : "wc-vertical-move-list div.move";

	if ($(rows).length == 0)
		alert("No rows found!");

	var foundAtLeastOneRow = false;

	$(rows).each( function( index, element )
	{
		foundAtLeastOneRow = true;

		var move = isTypeOne ? index + 1 : $(element).attr("data-whole-move-number");

		if (move.length == 0)
			alert("No move found!");

		res += move + ". ";

		var moves = isTypeOne ? "span.move-text-component" : "div.node";

		if (moves.length == 0)
			alert("No moves found (1) !");

		var foundAtLeastOne = false;

		$(element).find(moves).each(function(indexInternal, elementInternal)
		{
			var figurine = "";

			if (isTypeOne)
			{
				var figurineCheck = $(elementInternal).find("span");

				if (figurineCheck.length == 0)
					alert("figurine check failed!");

				alert(figurineCheck);

				if (figurineCheck.is(".knight-black", ".knight-white"))
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