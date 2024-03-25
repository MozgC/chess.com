**This project allows you to open live chess.com games (against a human or AI) in lichess.org. This allows you to use lichess to visualize the game from the current position, get engine's suggestions or see who is winning in the engine's opinion.**

I use Tampermonkey to add the custom javascript to Chrome:
https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo

After the custom javascript is executed, a button will appear at the top of the panel with the moves. Pressing this button will show a PGN for the current game (in case you want to import the game somewhere else) and then will open the current board in lichess.org.

Also, I use Chrome for debugging, so I allowed Chrome to load local files with a custom argument, see launch.json
