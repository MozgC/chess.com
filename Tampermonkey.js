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
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */

(function() {
    'use strict';

    $( document ).ready(function() {
        window.setTimeout(function () {
            var isTypeOne = $("div.game-controls-wrapper").length;

            var panel = isTypeOne ? $("div.game-controls-wrapper") : $("vertical-move-list");

            panel.prepend("<button type='button'>GET PGN</button>").click(function() {
        var res = "";


                var rows = isTypeOne ? "div.vertical-move-list-notation-vertical" : "vertical-move-list div.move";

        $(rows).each( function( index, element )
        {
            var move = isTypeOne ? index + 1 : $(element).attr("data-whole-move-number");
            res += move + ". ";

            var moves = isTypeOne ? "span.move-text-component" : "div";

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

        alert(res);

                window.open("https://lichess.org/analysis/pgn/" + res, '_blank');

            });
        }, 3000);

    });
})();