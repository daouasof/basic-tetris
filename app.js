document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const width = 10;
  const scoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-button');

  const lTetromino = [
    [1, width + 1, 2 * width + 1, 2],
    [width, width + 1, width + 2, 2 * width + 2],
    [1, width + 1, 2 * width + 1, 2 * width],
    [width, 2 * width, 2 * width + 1, 2 * width + 2],
  ];
  const zTetromino = [
    [2 * width, 2 * width + 1, width + 1, width + 2],
    [0, width, width + 1, 2 * width + 1],
    [2 * width, 2 * width + 1, width + 1, width + 2],
    [0, width, width + 1, 2 * width + 1],
  ];
  const tTetromino = [
    [width, width + 1, 1, width + 2],
    [1, width + 1, 2 * width + 1, width + 2],
    [width, width + 1, width + 2, 2 * width + 1],
    [1, width + 1, 2 * width + 1, width],
  ];
  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];
  const iTetromino = [
    [1, width + 1, 2 * width + 1, 3 * width + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, 2 * width + 1, 3 * width + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const theTetrominoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
  ];

  let currentPosition = 4;
  let currentRotation = 0;

  let random = Math.floor(Math.random() * theTetrominoes.length);
  let current = theTetrominoes[random][currentRotation];

  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add('tetromino');
    });
  }

  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove('tetromino');
    });
  }

  //Make the Tetrominos move down every second
  timerID = setInterval(moveDown, 1000);

  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 40) {
      // moveDown()
    }
  }

  document.addEventListener('keyup', control);

  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  function freeze() {
    if (
      current.some((index) =>
        squares[currentPosition + index + width].classList.contains('taken'),
      )
    ) {
      current.forEach((index) =>
        squares[currentPosition + index].classList.add('taken'),
      );
      random = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
    }
  }

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

  function rotate() {
    undraw();
    currentRotation =
      currentRotation === current.length - 1 ? 0 : currentRotation + 1;
    console.log(currentRotation);
    current = theTetrominoes[random][currentRotation];
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains('taken'),
      )
    ) {
      currentRotation =
        currentRotation === 0 ? current.length - 1 : currentRotation - 1;
      current = theTetrominoes[random][currentRotation];
    }
    draw();
  }
});
