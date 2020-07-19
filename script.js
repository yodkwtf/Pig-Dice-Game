var scores, roundScore, activePlayer, gamePlay, prevDice;

newGame();



/* 
=========================
clicking on roll dice
=========================
*/

document.querySelector('.btn-roll').addEventListener('click', function() {
  
  if (gamePlay) {
    // 1 - load random number
      var dice1 = Math.floor(Math.random() * 6) + 1;
      var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2 - display the result using dice
      document.getElementById('dice1').style.display = 'block';
      document.getElementById('dice2').style.display = 'block';
      document.getElementById('dice1').src = 'dice-' + dice1 + '.png';
      document.getElementById('dice2').src = 'dice-' + dice2 + '.png';
  
        if (dice1 !== 1 && dice2 !== 1) {
        // (if yes) -> add score
        roundScore = roundScore + dice1 + dice2;
        document.getElementById('player-current-score-' + activePlayer).textContent = roundScore;

        // (if no) -> switch activeplayer
      } else {
        changePlayer();
      }

  }
  
})



/*
=========================
clicking on hold btn
=========================
*/

document.querySelector('.btn-hold').addEventListener('click', function () {
  
  var input = document.getElementById("form-control").value;
  // if a value is provided - input exits -> true
  if (input) {
    winningScore = input; /* entered winning score*/
  } else {
    // if no value is value provided - input doesn't exit -> false
    winningScore = 100; /* default winning score*/
  }


  if (gamePlay) {
    // 1 - add roundscore to score
    scores[activePlayer] += roundScore;
    

    // 2 - display the score 
    document.querySelector('#player-score-' + activePlayer).textContent = scores[activePlayer];
    

    // 3 - CHECKING IF PLAYER WON

    if (scores[activePlayer] >= winningScore) {

      // change player name to winner
      document.querySelector('#player-name-' + activePlayer).textContent = 'WINNER!';

      // hide the dice
      hideDice();

      // add winner class from css
      document.querySelector('.player-block-' + activePlayer).classList.add('winner');

      // remove active class from css
      document.querySelector('.player-block-' + activePlayer).classList.remove('active');

      // stop gameplay
      gamePlay = false;

    } else {

      // switch activeplayer
      changePlayer();

    }
  }
})



/*
=========================
clicking on new game
=========================
*/

document.querySelector('.btn-new').addEventListener('click', newGame);



/*
=========================
functions
=========================
*/


// ---------------------NEW GAME function

function newGame() {

  // initializing all scores
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlay = true;

  // hiding the dice on initial load 
  hideDice();

  // setting the scores to 0
  document.getElementById('player-score-0').textContent = '0';
  document.getElementById('player-current-score-0').textContent = '0';
  document.getElementById('player-score-1').textContent = '0';
  document.getElementById('player-current-score-1').textContent = '0';

  // change player names
  document.getElementById('player-name-0').textContent = 'Player 1';
  document.getElementById('player-name-1').textContent = 'Player 2';

  // remove the winner class
  document.querySelector('.player-block-0').classList.remove('winner');
  document.querySelector('.player-block-1').classList.remove('winner');
  
  // adding the active class
  document.querySelector('.player-block-0').classList.add('active');

}



// ---------------------CHANGING PLAYER function

function changePlayer() {

  // switch activeplayer
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  document.querySelector('.player-block-0').classList.toggle('active');
  document.querySelector('.player-block-1').classList.toggle('active');

  // make roundscore 0
  roundScore = 0;

  // make current score of both 0
  document.getElementById('player-current-score-0').textContent = '0';
  document.getElementById('player-current-score-1').textContent = '0';

  // hide the dice
  hideDice();

}



// ---------------------HIDING DICE function

function hideDice() {
  document.getElementById('dice1').style.display = 'none';
  document.getElementById('dice2').style.display = 'none';
}