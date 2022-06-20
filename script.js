let hero = {
  x: 675,
  y: 500,
};

let enemies = [
  { x: 855, y: -105, type: "enemy1" },
  { x: 678, y: -205, type: "enemy2" },
  { x: 555, y: -305, type: "enemy3" },
  { x: 490, y: -405, type: "enemy2" },
  { x: 539, y: -505, type: "enemy3" },
  { x: 537, y: -605, type: "enemy1" },
  { x: 756, y: -705, type: "enemy2" },
];

let bullets = [];

let score = 0;

//helpers
function generateRandom(min, max) {
  //The maximum is inclusive and the minimum is inclusive
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.onkeydown = (e) => {
  console.log(e);
  if (e.keyCode == 40) {
    //DOWN
    if (hero.y < 480) hero.y += 10;
  } else if (e.keyCode == 38) {
    //UP
    if (hero.y > 20) hero.y -= 10;
  } else if (e.keyCode == 39) {
    //RIGHT
    if (hero.x < 855) hero.x += 10;
  } else if (e.keyCode == 37) {
    //LEFT
    if (hero.x > 490) hero.x -= 10;
  } else if (e.keyCode == 32) {
    //SPACE
    bullets.push({ x: hero.x + 8, y: hero.y - 10 });
    let gun = new Audio("./gun.mp3");
    gun.volume = 0.05;
    gun.play();
  } else if (e.keyCode == 13) {
    backgroundMusic.play();
  }
};

const displayEnemies = () => {
  let output = "";
  for (let i = 0; i < enemies.length; i++) {
    output +=
      `<div class="${enemies[i].type}" style="top: ` +
      enemies[i].y +
      "px; left: " +
      enemies[i].x +
      'px"></div>';
  }

  document.getElementById("enemies").innerHTML = output;
};

const moveEnemies = () => {
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].y > 535) {
      enemies[i].y = -5;
      enemies[i].x = generateRandom(490, 855);
    } else {
      enemies[i].y += 10;
    }
  }
};

const displayBullets = () => {
  output = "";
  for (let i = 0; i < bullets.length; i++) {
    output +=
      '<div class="bullet" style="top: ' +
      bullets[i].y +
      "px; left: " +
      bullets[i].x +
      'px"></div>';
  }

  document.getElementById("bullets").innerHTML = output;
};

const moveBullets = () => {
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].y -= 10;

    if (bullets[i].y < 0) {
      bullets[i] = bullets[bullets.length - 1];
      bullets.pop();
    }
  }
};

const displayHero = () => {
  document.getElementById("hero").style.top = hero.y + "px";
  document.getElementById("hero").style.left = hero.x + "px";
};

const displayScore = () => {
  document.getElementById("score").innerHTML = "Score<br> <br>" + score;
};

const checkGameOver = () => {
  if (score < 0) {
    document.getElementById("gameover").style.display = "flex";
    document.getElementById("explosion").style.display = "block";
    document.getElementById("explosion").innerHTML =
      `<div class="explode" style="top: ` +
      hero.y +
      "px; left: " +
      hero.x +
      'px"></div>';

    hero.x = 0;
    hero.y = 0;
    document.getElementById("explosion").style.display = "none";
    document.getElementById("hero").style.display = "none";
    score = 0;

    document.getElementById("again").addEventListener("click", () => {
      location.reload();
    });
  }
};

const checkCollision = () => {
  for (let i = 0; i < enemies.length; i++) {
    for (let j = 0; j < bullets.length; j++) {
      if (
        Math.abs(enemies[i].y - bullets[j].y) <= 5 &&
        Math.abs(enemies[i].x - bullets[j].x) <= 10
      ) {
        document.getElementById("explosion").style.display = "block";
        document.getElementById("explosion").innerHTML =
          `<div class="explode" style="top: ` +
          enemies[i].y +
          "px; left: " +
          enemies[i].x +
          'px"></div>';

        score += 10;

        let explosion = new Audio("./explosion.mp3");
        explosion.volume = 0.03;
        explosion.play();

        setTimeout(() => {
          document.getElementById("explosion").style.display = "none";
        }, 1000);
        enemies[i].y = -enemies[i].y + generateRandom(20, 100);
      }
    }

    //collision of hero and enemy
    if (
      Math.abs(enemies[i].y - hero.y) <= 5 &&
      Math.abs(enemies[i].x - hero.x) <= 10
    ) {
      score -= 500;
    }
  }
};

const gameLoop = () => {
  displayHero();
  displayEnemies();
  moveEnemies();
  displayBullets();
  moveBullets();
  checkCollision();
  displayScore();
  checkGameOver();
};

//to actually start the game
document.getElementById("start").addEventListener("click", () => {
  document.querySelector(".play").style.display = "none";
  let backgroundMusic = new Audio("./bgmusic1.mp3");
  backgroundMusic.volume = 0.05;
  backgroundMusic.loop = true;
  backgroundMusic.play();
  setInterval(gameLoop, 100);
  document.getElementById("container").style.backgroundImage = "url(./gg.jpg)";
  document.getElementById("hero").style.display = "block";
  document.getElementById("score").style.display = "block";
});
