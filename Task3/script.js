const gameBoard = document.getElementById('gameBoard');
const gameStatus = document.getElementById('gameStatus');
const restartBtn = document.getElementById('restartBtn');
let cells = Array.from(document.getElementsByClassName('cell'));
let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill('');

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6]             // Diagonal
];

// Handle click on a cell
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');

        if (gameState[index] !== '' || !gameActive) return;

        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            gameStatus.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (!gameState.includes('')) {
            gameStatus.textContent = `It's a draw!`;
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            gameStatus.textContent = `Player ${currentPlayer}'s turn`;
        }
    });
});

// Check for a winner
function checkWinner() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
}

// Restart game
restartBtn.addEventListener('click', () => {
    gameState.fill('');
    cells.forEach(cell => cell.textContent = '');
    gameActive = true;
    currentPlayer = 'X';
    gameStatus.textContent = `Player X's turn`;
});
