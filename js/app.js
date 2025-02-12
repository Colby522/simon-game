let sequence = [];
let humanSequence = [];
let level = 0;

const startButton = document.querySelector('.start-button');
const info = document.querySelector('.info');
const heading = document.querySelector('.heading');
const tileContainer = document.querySelector('.container');

const resetGame = (text) => {
  heading.textContent = text
  sequence = [];
  humanSequence = [];
  level = 0;
  startButton.classList.remove('hidden');
  info.classList.add('hidden');
  tileContainer.classList.add('unclickable');
}

const humanTurn = (level) => {
  tileContainer.classList.remove('unclickable');
  info.textContent = `Your turn: ${level} Tap`;
}

const activateTile = (color) => {
  const tile = document.querySelector(`[data-tile='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);

  tile.classList.add('activated');
  sound.play();

  setTimeout(() => {
    tile.classList.remove('activated');
  }, 300);
}

const playRound = (nextSequence) => {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, (index + 1) * 600);
  });
}

const nextStep = () => {
  const tiles = ['red', 'green', 'blue', 'yellow'];
  const random = tiles[Math.floor(Math.random() * tiles.length)];

  return random;
}

const nextRound = () => {
  level += 1;

  tileContainer.classList.add('unclickable');
  info.textContent = 'Wait for the computer';
  heading.textContent = `Level ${level} of 20`;

  const nextSequence = [...sequence];
  nextSequence.push(nextStep());
  playRound(nextSequence);

  sequence = [...nextSequence];
  setTimeout(() => {
    humanTurn(level);
  }, level * 600 + 1000);
}

const handleClick = (tile) => {
  const index = humanSequence.push(tile) - 1;
  const sound = document.querySelector(`[data-sound='${tile}']`);
  sound.play();

  const remainingTaps = sequence.length - humanSequence.length;

  if (humanSequence[index] !== sequence[index]) {
    return resetGame('Game Over. Press Start to Try Again');
  }

  if (humanSequence.length === sequence.length) {
    if (humanSequence.length === 20) {
      return resetGame('Congratulations! You beat all 20 Levels!');
    }

    humanSequence = [];
    info.textContent = 'Great Job!';
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }

  info.textContent = `Your turn: ${remainingTaps} Tap${
    remainingTaps > 1 ? 's' : ''
  }`;
}

const startGame = () => {
  startButton.classList.add('hidden');
  info.classList.remove('hidden');
  tileContainer.classList.remove('unclickable');
  nextRound();
}

startButton.addEventListener('click', startGame);
tileContainer.addEventListener('click', event => {
  const { tile } = event.target.dataset;

  if (tile) handleClick(tile);
});


