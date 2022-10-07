// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.chess.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chess.com
// @grant        none
// @require https://code.jquery.com/jquery-3.6.0.min.js
// @require file://d:\VCProjects\ChessDotComeExtensions\getpgn.js
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */

(function() {
	'use strict';

	$( document ).ready(function()
	{
		window.setTimeout(function ()
		{
			var isTypeOne = $("div.game-controls-wrapper").length;

			var panel = isTypeOne ? $("div.game-controls-wrapper") : $("vertical-move-list");

            var button = $("<button type='button' style='width:100%'>GET PGN & ANALYSE IN LICHESS</button>");
			panel.before(button);

            button.click(function()
			{
				var res = getPgn();

				alert(res);

				window.open("https://lichess.org/analysis/pgn/" + res, '_blank');

			}); // click handler
		}, 3000); // setTime
    }); // document.ready
})();