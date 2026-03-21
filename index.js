let userPattern = [];
let gamePattern = [];
let colors = ["green", "red", "yellow", "blue"];
let started = false;
let level = 1;

// ✅ Detect device (mobile vs desktop)
let eventType = "ontouchstart" in document.documentElement ? "touchstart" : "click";

// ✅ Start button
$("#startBtn").on(eventType, function () {
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

  animatePress(chosenColor);
  playSound(chosenColor);
}

// ✅ Button clicks
$("#green, #red, #yellow, #blue").on(eventType, function () {

  if (!started) return; // prevent clicking before game starts

  let userChosenColor = $(this).attr("id");
  userPattern.push(userChosenColor);

  animatePress(userChosenColor);
  playSound(userChosenColor);

  checkAnswer(userPattern.length - 1);
});

// ✅ Check answer
function checkAnswer(currentIndex) {

  if (userPattern[currentIndex] === gamePattern[currentIndex]) {

    // ✅ If sequence complete → next level
    if (userPattern.length === gamePattern.length) {
      setTimeout(() => {
        level++;
        nextSequence();
      }, 800);
    }

  } else {
    // ❌ Wrong answer
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);

    $("#level-title").text("Game Over! Press Start Again");

    started = false;
  }
}

// ✅ Sound function
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// ✅ Animation function
function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(() => $("#" + color).removeClass("pressed"), 150);
}
