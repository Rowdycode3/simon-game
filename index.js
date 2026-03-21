let userPattern = [];
let gamePattern = [];
let colors = ["green", "red", "yellow", "blue"];
let started = false;
let level = 1;

$(document).keypress(function () {
  if (!started) {
    started = true;
    nextSequence();
  }
});

function nextSequence() {
  userPattern = []; // new round → reset user input

  let randomIndex = Math.floor(Math.random() * 4);
  let chosenColor = colors[randomIndex];
  gamePattern.push(chosenColor);
  console.log(gamePattern);

  $("h1").text("Level " + level);

  let btn = $("#" + chosenColor);
  btn.addClass("pressed");
  setTimeout(() => {
    btn.removeClass("pressed");
  }, 150);

  let audio = new Audio("sounds/" + chosenColor + ".mp3");
  audio.play();
}

$("#green, #red, #yellow, #blue").click(function () {
  let btn = $(this);
  let clickedColor = btn.attr("id");
  // feedback
  btn.addClass("pressed");
  setTimeout(() => {
    btn.removeClass("pressed");
  }, 150);

  let audio = new Audio("sounds/" + clickedColor + ".mp3");
  audio.play();

  // store
  userPattern.push(clickedColor);

  console.log(userPattern);

  // trigger check
  checkAnswer(userPattern.length - 1);
});

function checkAnswer(currentIndex) {
  if (gamePattern[currentIndex] === userPattern[currentIndex]) {
    // correct so far
    if (userPattern.length === gamePattern.length) {
      // full sequence correct → next round
      setTimeout(() => {
        level++;
        nextSequence();
      }, 500);
    }
  } else {
    // wrong → game over
    $("h1").text("Game Over ra thamudu 😅… okka key nokku, malli try cheddam!");

    let audio = new Audio("sounds/wrong.mp3");
    audio.play();

    // reset everything
    started = false;
    gamePattern = [];
    userPattern = [];
    level = 1;
  }
}
