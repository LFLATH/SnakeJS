var field, context;


var defaultSize = 3;
var size = defaultSize;
var body = [];
var snakeXPos = snakeYPos = 10;
var score = 0
var gridSize = tileSize = 20;
var nextX = nextY = 0;
var highscore = 0

var appleXPOS = (appleYPOS = 15);

highscorebox = document.getElementById("highscore")
scorebox = document.getElementById("score")
function updateDB(s){
  let username = document.getElementById("user.profile");
  username = username.textContent;
  console.log(username);
  console.log(s);
  $.post('/home', {username: username, highscore: s});
};

window.onload = function() {
  field = document.getElementById("game-area");
  context = field.getContext("2d");
  document.addEventListener("keydown", keyDownEvent);
  var FPS = 8;
  setInterval(draw, 1000 / FPS);
};

function keyDownEvent(element) {
    switch (element.keyCode) {
    case 37:
      nextX = -1;
      nextY = 0;
      break;
    case 38:
      nextX = 0;
      nextY = -1;
      break;
    case 39:
      nextX = 1;
      nextY = 0;
      break;
    case 40:
      nextX = 0;
      nextY = 1;
      break;
    }
  }
function draw() {
    snakeXPos += nextX;
    snakeYPos += nextY;


    if (snakeXPos <  -1) {
        nextX = 0
        nextY = 0
        snakeXPos = 10
        snakeYPos = 10
        size = defaultSize;
        alert(`Your score is ${score}`)
        highscore = Math.max(highscore, score)
        highscorebox.textContent = `HIGHSCORE: ${highscore}`
        updateDB(highscore)
        score = 0
        scorebox.textContent = `SCORE: ${score}`


    }
    if (snakeXPos > gridSize) {
        nextX = 0
        nextY = 0
        snakeXPos = 10
        snakeYPos = 10
        size = defaultSize;
        alert(`Your score is ${score}`)
        highscore = Math.max(highscore, score)
        highscorebox.textContent = `HIGHSCORE: ${highscore}`
        updateDB(highscore)

        score = 0
        scorebox.textContent = `SCORE: ${score}`




        }

    if (snakeYPos < -1) {
        nextX = 0
        nextY = 0
        snakeXPos = 10
        snakeYPos = 10
        size = defaultSize;
        alert(`Your score is ${score}`)
        highscore = Math.max(highscore, score)
        highscorebox.textContent = `HIGHSCORE: ${highscore}`
        updateDB(highscore)

        score = 0
        scorebox.textContent = `SCORE: ${score}`




    }
    if (snakeYPos > gridSize) {
        nextX = 0
        nextY = 0
        snakeXPos = 10
        snakeYPos = 10
        size = defaultSize;
        alert(`Your score is ${score}`)
        highscore = Math.max(highscore, score)
        highscorebox.textContent = `HIGHSCORE: ${highscore}`
        updateDB(highscore)

        score = 0
        scorebox.textContent = `SCORE: ${score}`




    }

    if (snakeXPos == appleXPOS && snakeYPos == appleYPOS) {
      size++;
      score++
      scorebox.textContent = `SCORE: ${score}`
      appleXPOS = Math.floor(Math.random() * gridSize);
      appleYPOS = Math.floor(Math.random() * gridSize);
    }

    context.fillStyle = "white";
    context.fillRect(0, 0, field.width, field.height);

    context.fillStyle = "black";
    for (var i = 0; i < body.length; i++) {
      context.fillRect(
        body[i].x * tileSize,
        body[i].y * tileSize,
        tileSize,
        tileSize
      );

      if (body[i].x == snakeXPos && body[i].y == snakeYPos) {
        if(nextX == 0 && nextY == 0){
            break
        }
        else{
            nextX = 0
            nextY = 0
            snakeXPos = 10
            snakeYPos = 10
            size = defaultSize;
            alert(`Your score is ${score}`)
            highscore = Math.max(highscore, score)
            highscorebox.textContent = `HIGHSCORE: ${highscore}`
            updateDB(highscore)
            score = 0
            scorebox.textContent = `SCORE: ${score}`




        }
       
      }
    }

    context.fillStyle = "red";
    context.fillRect(appleXPOS * tileSize, appleYPOS * tileSize, tileSize, tileSize);

    body.push({ x: snakeXPos, y: snakeYPos });
    while (body.length > size) {
      body.shift();
    }
  }

  highscorebox = document.getElementById("highscore")
  scorebox = document.getElementById("score")
  highscorebox.textContent = `HIGHSCORE: ${highscore}`
  scorebox.textContent = `SCORE: ${score}`