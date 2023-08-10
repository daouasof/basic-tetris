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
  let current = theTetrominoes[0][0];

  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add('tetromino');
    });
  }

  draw();
});
