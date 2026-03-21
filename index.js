let userPattern = [];
let gamePattern = [];
let colors = ["green", "red", "yellow", "blue"];
let started = false;
let level = 1;

// 😄 Funny LEVEL messages (used only after Level 1)
let levelMessages = [
  "😎 You're doing great! Level ",
  "🔥 You're on fire! Level ",
  "🚀 Going strong! Level ",
  "🧠 Brain working! Level ",
  "🎯 Sharp memory! Level ",
  "💪 Beast mode! Level ",
  "😏 Easy for you! Level ",
  "⚡ Speed + memory! Level "
];

// 😂 Funny GAME OVER messages
let gameOverMessages = [
  "😂 Ayyoo! Brain hang ayindi!",
  "🤯 Memory full… restart needed!",
  "🐒 Monkey mode activated!",
  "💀 You had ONE job!",
  "🤡 Clown moment! Try again!",
  "😴 Sleeping aa? Wrong click!",
  "😜 Almost! But not really!",
  "🧠 Brain.exe stopped working",
  "🎯 Missed it! Try again!"
];

// ✅ Detect device (mobile or desktop)
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

  // ✅ Level text logic
  if (level === 1) {
    $("#level-title").text("Level 1");
  } else {
    let msg = levelMessages[Math.floor(Math.random() * levelMessages.length)];
    $("#level-title").text(msg + level);
  }

  animatePress(chosenColor);
  playSound(chosenColor);
}

// ✅ Button clicks
$("#green, #red, #yellow, #blue").on(eventType, function () {

  if (!started) return;

  let userChosenColor = $(this).attr("id");
  userPattern.push(userChosenColor);

  animatePress(userChosenColor);
  playSound(userChosenColor);

  checkAnswer(userPattern.length - 1);
});

// ✅ Check answer
function checkAnswer(currentIndex) {

  if (userPattern[currentIndex] === gamePattern[currentIndex]) {

    if (userPattern.length === gamePattern.length) {
      setTimeout(() => {
        level++;
        nextSequence();
      }, 800);
    }

  } else {
    // 😂 Random game over message
    let msg = gameOverMessages[Math.floor(Math.random() * gameOverMessages.length)];
    $("#level-title").text(msg + "Game Over!");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);

    started = false;
  }
}

// 🔊 Sound function
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// 🎨 Animation function
function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(() => $("#" + color).removeClass("pressed"), 150);
}
