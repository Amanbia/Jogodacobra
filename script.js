const game = document.getElementById("game");
const scoreEl = document.getElementById("score");
const gridSize = 10;
let snake = [44]; // posição inicial (meio do grid)
let direction = 1; // começa indo para a direita
let food = null;
let score = 0;
let interval;

// cria o grid
for (let i = 0; i < 100; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  game.appendChild(cell);
}

const getCell = (index) => game.children[index];

// desenha o jogo
function draw() {
  [...game.children].forEach(cell => {
    cell.classList.remove("snake", "food");
  });
  snake.forEach(i => getCell(i).classList.add("snake"));
  if (food !== null) getCell(food).classList.add("food");
}

// cria a comida
function placeFood() {
  do {
    food = Math.floor(Math.random() * 100);
  } while (snake.includes(food));
}

// movimenta a cobra
function move() {
  const head = snake[0];
  let newHead = head + direction;

  // verifica colisões
  if (
    newHead < 0 || newHead >= 100 || // fora do grid
    (direction === 1 && head % 10 === 9) || // bateu na parede direita
    (direction === -1 && head % 10 === 0) || // bateu na parede esquerda
    snake.includes(newHead) // bateu no próprio corpo
  ) {
    clearInterval(interval);
    alert("Game Over! Recarregue a página para jogar novamente.");
    return;
  }

  snake.unshift(newHead); // adiciona nova cabeça

  if (newHead === food) {
    score += 10;
    scoreEl.textContent = `Pontuação: ${score}`;
    placeFood();
  } else {
    snake.pop(); // remove a cauda
  }

  draw();
}

// controle com teclado
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp": if (direction !== 10) direction = -10; break;
    case "ArrowDown": if (direction !== -10) direction = 10; break;
    case "ArrowLeft": if (direction !== 1) direction = -1; break;
    case "ArrowRight": if (direction !== -1) direction = 1; break;
  }
});

document.getElementById("game").style.display = "none";
document.getElementById("score").style.display = "none";

document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("game").style.display = "grid";
  document.getElementById("score").style.display = "block";

  placeFood();
  draw();
  interval = setInterval(move, 300);
});

