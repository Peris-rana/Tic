//DOMContentLoaded fires when the DOM content is loaded without loading the images or stylesheets
window.addEventListener('DOMContentLoaded', () => {
   const tiles = Array.from(document.querySelectorAll('.tile')); ////querySelectorALl() returns all the  elements that matches a CSS selector
   const playerDisplay = document.querySelector('.display-player'); //querySelector() returns the first element that matches a CSS selector
   const resetButton = document.querySelector('#reset');
   const announcer = document.querySelector('.announcer');
   //board will be empty after reset
   let board = ['', '', '', '', '', '', '', '', ''];
   let currentPlayer = 'X'; //starting move
   let isGameActive = true;

   const PLAYERX_WON = 'PLAYERX_WON';
   const PLAYERO_WON = 'PLAYERO_WON';
   const TIE = 'TIE';

   const winningConditions = [
      // Winning conditions stored in a 2D array
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
   ];

   // Function which checks the winning conditions
   function handleResultValidation() {
      let roundWon = false;
      for (let i = 0; i <= 7; i++) {
         const winCondition = winningConditions[i];
         const a = board[winCondition[0]];
         const b = board[winCondition[1]];
         const c = board[winCondition[2]];
         if (a === '' || b === '' || c === '') {
            continue;
         }
         if (a === b && b === c) {
            roundWon = true;
            break;
         }
      }

      if (roundWon) {
         announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
         isGameActive = false;
         return;
      }

      if (!board.includes('')) announce(TIE);
   }
   // Function to announce who won the game
   const announce = (type) => {
      switch (type) {
         case PLAYERO_WON:
            announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
            break;
         case PLAYERX_WON:
            announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
            break;
         case TIE:
            announcer.innerText = 'Tie';
      }
      announcer.classList.remove('hide');
   };

   const isValidAction = (tile) => {
      if (tile.innerText === 'X' || tile.innerText === 'O') {
         return false;
      }

      return true;
   };
   // Updated the game board
   const updateBoard = (index) => {
      board[index] = currentPlayer;
   };
   //Change  the player after first move
   const changePlayer = () => {
      playerDisplay.classList.remove(`player${currentPlayer}`);
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      playerDisplay.innerText = currentPlayer;
      playerDisplay.classList.add(`player${currentPlayer}`);
   };

   const userAction = (tile, index) => {
      if (isValidAction(tile) && isGameActive) {
         tile.innerText = currentPlayer;
         tile.classList.add(`player${currentPlayer}`);
         updateBoard(index); //Updated the board
         handleResultValidation(); // Checks the winning move
         changePlayer(); // Changes the plaper after first move
      }
   };
   // Function which is used to reset the game board
   const resetBoard = () => {
      board = ['', '', '', '', '', '', '', '', ''];
      isGameActive = true;
      announcer.classList.add('hide');

      if (currentPlayer === 'O') {
         changePlayer();
      }

      tiles.forEach((tile) => {
         tile.innerText = '';
         tile.classList.remove('playerX');
         tile.classList.remove('playerO');
      });
   };

   tiles.forEach((tile, index) => {
      tile.addEventListener('click', () => userAction(tile, index));
   });

   resetButton.addEventListener('click', resetBoard);
});
