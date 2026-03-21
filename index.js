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

// ✅ Button clicks (mobile + desktop)
$("#green, #red, #yellow, #blue").on("click touchstart", function () {

  let userChosenColor = $(this).attr("id");
  userPattern.push(userChosenColor);

  // sound
  let audio = new Audio("sounds/" + userChosenColor + ".mp3");
  audio.play();

  // animation
  $(this).addClass("pressed");
  setTimeout(() => $(this).removeClass("pressed"), 150);

  checkAnswer(userPattern.length - 1);
});

function checkAnswer(currentIndex) {
  if (userPattern[currentIndex] === gamePattern[currentIndex]) {

    // if user completed the sequence
    if (userPattern.length === gamePattern.length) {
      setTimeout(() => {
        level++;
        nextSequence();
      }, 800);
    }

  } else {
    // ❌ Wrong answer
    let audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);

    $("#level-title").text("Game Over! Press Start Again");

    started = false;
  }
}
