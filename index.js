let userPattern = [];
let gamePattern = [];
let colors = ["green", "red", "yellow", "blue"];
let started = false;
let level = 1;

// ✅ Start button (mobile + desktop)
$("#startBtn").on("click touchstart", function () {
  if (!started) {
    started = true;
    level = 1;
    gamePattern = [];
    nextSequence();
  }
});

function nextSequence() {
  userPattern = [];

  let randomIndex = Math.floor(Math.random() * 4);
  let chosenColor = colors[randomIndex];
  gamePattern.push(chosenColor);

  $("#level-title").text("Level " + level);

  let btn = $("#" + chosenColor);
  btn.addClass("pressed");
  setTimeout(() => btn.removeClass("pressed"), 150);

  let audio = new Audio("sounds/" + chosenColor + ".mp3");
  audio.play();
}

// ✅ Button clicks (already mobile friendly)
$("#green, #red, #yellow, #blue").on("click touchstart", function () {

  if (!started) return;

  let btn = $(this);
  let clickedColor = btn.attr("id");

  btn.addClass("pressed");
  setTimeout(() => btn.removeClass("pressed"), 150);

  let audio = new Audio("sounds/" + clickedColor + ".mp3");
  audio.play();

  userPattern.push(clickedColor);

  checkAnswer(userPattern.length - 1);
});

function checkAnswer(currentIndex) {

  if (gamePattern[currentIndex] === userPattern[currentIndex]) {

    if (userPattern.length === gamePattern.length) {
      setTimeout(() => {
        level++;
        nextSequence();
      }, 500);
    }

  } else {

    $("#level-title").text("Game Over 😅 Tap Start to Retry");

    let audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);

    started = false;
    gamePattern = [];
    userPattern = [];
    level = 1;
  }
}
