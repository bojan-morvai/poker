# Poker Browser App
depository for poker browser app
Simple Poker single page app that you play in browser, compatable with mobile devices. 
It consists of two parts:
  1) Poker game, that plays like standard five card poker.
  2) Second game, that you can choose to play to increase winnings from first Poker game, in which you need to guess is next card going to be higher or lower than one already dealt.
    
# Files
Application is made using vanilla JS, Jquery, Node, Express and Bootstrap library for CSS.

There is main app.js file, made with node, express and javascript, ejs file in views directory, css file in public/stylesheets, and few
js files in public/scripts

# Database
Users can use MongoDB to save, update, or load their progress by entering choosen username and password

# Version
There is version without DB on branch called 'without_db'

# Features
- Made using OOP (card, deck of cards)
- Increasing difficulity after every ten games
- Increasing winnings accordingly
- Second game to increase winnings or lose it,
- of guessing higher or lower cards
- Both games done on one page without reloading
- Messages that tracks your winnings
- Multiple ways of selecting cards (click on button, card, or by keyboard)
- Possibility of saving current game in database by entering username and password *
- Database used is MongoDB Atlas *
- Possibility to load previous saved game by logging in (entering username and password) *
- When player is logged in, he can update his saved game with current state *
-Logout *

*not possible in version "without_db"
