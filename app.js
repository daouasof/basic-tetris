document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const width = 10;
  const scoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-button');
  let timerID;
  let score = 0;
  let nextRandom = 0;
  let timeInterval = 500;
  const colors = ['##734E95', '#FF6663', '#EFCB68', '#00CECB', '#CFBCDF'];

  function lTetromino(width) {
    return [
      [1, width + 1, 2 * width + 1, 2],
      [width, width + 1, width + 2, 2 * width + 2],
      [1, width + 1, 2 * width + 1, 2 * width],
      [width, 2 * width, 2 * width + 1, 2 * width + 2],
    ];
  }
  function zTetromino(width) {
    return [
      [2 * width, 2 * width + 1, width + 1, width + 2],
      [0, width, width + 1, 2 * width + 1],
      [2 * width, 2 * width + 1, width + 1, width + 2],
      [0, width, width + 1, 2 * width + 1],
    ];
  }
  function tTetromino(width) {
    return [
      [width, width + 1, 1, width + 2],
      [1, width + 1, 2 * width + 1, width + 2],
      [width, width + 1, width + 2, 2 * width + 1],
      [1, width + 1, 2 * width + 1, width],
    ];
  }
  function oTetromino(width) {
    return [
      [0, 1, width, width + 1],
      [0, 1, width, width + 1],
      [0, 1, width, width + 1],
      [0, 1, width, width + 1],
    ];
  }
  function iTetromino(width) {
    return [
      [1, width + 1, 2 * width + 1, 3 * width + 1],
      [width, width + 1, width + 2, width + 3],
      [1, width + 1, 2 * width + 1, 3 * width + 1],
      [width, width + 1, width + 2, width + 3],
    ];
  }

  function theTetrominoes(width) {
    return [
      lTetromino(width),
      zTetromino(width),
      tTetromino(width),
      oTetromino(width),
      iTetromino(width),
    ];
  }

  let currentPosition = 4;
  let currentRotation = 0;

  //Randomly select a Tetromino
  let random = Math.floor(Math.random() * theTetrominoes(width).length);
  let current = theTetrominoes(width)[random][currentRotation];

  //draw the Tetromino
  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add('tetromino');
      squares[currentPosition + index].style.backgroundColor = colors[random];
    });
  }

  //undraw the Tetromino
  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove('tetromino');
      squares[currentPosition + index].style.backgroundColor = '';
    });
  }

  // assign functions to the keyCodes
  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  }
  document.addEventListener('keyup', control);

  // move down function
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  // freeze function
  function freeze() {
    if (
      current.some((index) =>
        squares[currentPosition + index + width].classList.contains('taken'),
      )
    ) {
      current.forEach((index) =>
        squares[currentPosition + index].classList.add('taken'),
      );
      // Start a new Tetromino Falling
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * theTetrominoes(width).length);
      current = theTetrominoes(width)[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
      addScore();
      gameOver();
      console.log(timeInterval);
    }
  }

  //move the tetromino left, unless is at the edge or there is a blockage
  function moveLeft() {
    undraw();
    const isAtLeft = current.some(
      (index) => (currentPosition + index) % width === 0,
    );
    if (!isAtLeft) {
      currentPosition -= 1;
    }
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains('taken'),
      )
    ) {
      currentPosition += 1;
    }
    draw();
  }

  //move the tetromino right, unless is at the edge or there is a blockage
  function moveRight() {
    undraw();
    const isAtRight = current.some(
      (index) => (currentPosition + index) % width === width - 1,
    );
    if (!isAtRight) {
      currentPosition += 1;
    }
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains('taken'),
      )
    ) {
      currentPosition -= 1;
    }
    draw();
  }

  // movee down tetromino
  function moveFast() {
    freeze();
  }

  // rotate the teromino
  function rotate() {
    undraw();
    currentRotation =
      currentRotation === current.length - 1 ? 0 : currentRotation + 1;
    current = theTetrominoes(width)[random][currentRotation];
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains('taken'),
      ) ||
      (current.some((index) => (currentPosition + index) % width === 0) &&
        current.some(
          (index) => (currentPosition + index) % width === width - 1,
        ))
    ) {
      currentRotation =
        currentRotation === 0 ? current.length - 1 : currentRotation - 1;
      current = theTetrominoes(width)[random][currentRotation];
    }
    draw();
  }

  //displaying the next Tetromino in mini-grod
  const displayWidth = 4;
  const upNextTetrominoes = [
    lTetromino(displayWidth)[0],
    zTetromino(displayWidth)[0],
    tTetromino(displayWidth)[0],
    oTetromino(displayWidth)[0],
    iTetromino(displayWidth)[0],
  ];

  const displaySquares = Array.from(
    document.querySelectorAll('.mini-grid div'),
  );

  function displayShape() {
    displaySquares.forEach((square) => {
      square.classList.remove('tetromino');
      square.style.backgroundColor = '';
    });

    upNextTetrominoes[nextRandom].forEach((index) => {
      displaySquares[index].classList.add('tetromino');
      displaySquares[index].style.backgroundColor = colors[nextRandom];
    });
  }

  // add functionality to the button start
  startBtn.addEventListener('click', () => {
    if (timerID) {
      clearInterval(timerID);
      timerID = null;
    } else {
      draw();
      timerID = setInterval(moveDown, timeInterval);
      if (!nextRandom) {
        nextRandom = Math.floor(Math.random() * theTetrominoes(width).length);
      }
      displayShape();
    }
  });

  // add score
  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9,
      ];
      if (row.every((index) => squares[index].classList.contains('taken'))) {
        score += 10;
        if (score % 50 === 0 && timeInterval > 100) {
          timeInterval -= 50;
          clearInterval(timerID);
          timerID = setInterval(moveDown, timeInterval);
        }
        scoreDisplay.innerHTML = score;
        row.forEach((index) => {
          squares[index].classList.remove('taken');
          squares[index].classList.remove('tetromino');
          squares[index].style.backgroundColor = '';
        });
        const squaresRemoved = squares.splice(i, width);
        squares = squaresRemoved.concat(squares);
        squares.forEach((cell) => grid.appendChild(cell));
      }
    }
  }

  // Gameover
  function gameOver() {
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains('taken'),
      )
    ) {
      document.querySelector('.game-over').classList.remove('hidden');
      clearInterval(timerID);
    }
  }
});
