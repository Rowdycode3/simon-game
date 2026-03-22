let userPattern = [];
let gamePattern = [];
let colors = ["green", "red", "yellow", "blue"];
let started = false;
let level = 1;

$("#start").click(function () {
  let btn = $(this);
  btn.fadeOut(100).fadeIn(100);
  btn.text(`Level ${level}`);
  nextsequence();
});

function nextsequence() {
  userPattern = [];

  let index = Math.floor(Math.random() * 4);
  let randomColor = colors[index];

  gamePattern.push(randomColor);

  $("#" + randomColor)
    .fadeOut(180)
    .fadeIn(180);

  let audio = new Audio(`sounds/${randomColor}.mp3`);
  audio.play();
}

$("#green, #red, #yellow, #blue").click(function () {
  let btn = $(this);
  let clicked = btn.attr("id");

  userPattern.push(clicked);

  btn.addClass("pressed");
  setTimeout(() => {
    btn.removeClass("pressed");
  }, 180);

  let audio = new Audio(`sounds/${clicked}.mp3`);
  audio.play();

  checkList(userPattern.length - 1);
});

function checkList(currentIndex) {
  if (gamePattern[currentIndex] === userPattern[currentIndex]) {
    if (gamePattern.length === userPattern.length) {
      level++;

      setTimeout(() => {
        $("#start").text(`Level ${level}`);
        nextsequence();
      }, 500);
    }
  } else {
    let audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("#start").text("Game ovar! Click This Button To Restart.");

    level = 1;
    gamePattern = [];
  }
}
