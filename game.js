
var userClickedPattern = []; // Tạo mảng do người dùng click

var gamePattern = []; // tạo mảng ngẫu nhiên;

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

// hàm lấy 1 màu ngẫu nhiên rồi đẩy vào mảng gamePattern
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  //console.log(randomChosenColour);

  // đẩy 1 màu ngẫu nhiên vào mảng gamePattern
  gamePattern.push(randomChosenColour);
  //console.log(gamePattern.push(randomChosenColour));

  var idButton = "#" + randomChosenColour; // lấy id của màu
  //console.log($(idButton));

  // animate flash tương ứng với màu
  $(idButton).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  // truyền vào hàm play sound tham số màu ngẫu nhiên
  playSound(randomChosenColour);

  // tăng level lên 1 và thay đổi tiêu đề h1 mỗi khi tăng level
  level++;
  $("#level-title").text("level " + level);

}

$(".btn").click(function handler() {

  var userChosenColour = $(this).attr("id"); //lấy thuộc tính id của button tương ứng
  //console.log(userChosenColour);

  userClickedPattern.push(userChosenColour); //đẩy button mà user click vào mảng userClickedPattern
  //console.log(userClickedPattern);

  playSound(userChosenColour); //play sound tương ứng với màu

  animatePress(userChosenColour); // hàm thêm và xóa class animation cho button

  checkAnswer(userClickedPattern.length - 1); // truyền vào hàm checkAnswer index of last answer
  //console.log(checkAnswer(userClickedPattern.length-1));
});

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColour) {
  var activeButton = $("." + currentColour);
  activeButton.addClass("pressed");

  // sau 100 millisecond thì xóa class
  setTimeout(function() {
    activeButton.removeClass("pressed");
  }, 100);
}

/* tạo biên started là false và gọi keydown() để xem user đã click vào keyboard
chưa, nếu user clicked thì gọi hàm nextSequence() và chuyển started = true để khi user ấn vào bàn phím sẽ
không gọi hàm nextSequence() nữa. */
var started = false;
$(document).keydown(function() {
  if (started == false) {
    started = true;
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel] /* kiểm tra index cuối cùng của 2 mảng */ ) {
    if (userClickedPattern.length == gamePattern.length) { // kiểm tra length của mảng

      // gọi hàm nextSequence và reset mảng userClickedPattern thành empty,
      // và sau 1000 millisecond sẽ lại gọi hàm nextSequence() và reset mảng userClickedPattern
      setTimeout(function() {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {

    // play sound wrong
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    // thêm class game-over và xóa class game-over sau 200 millisecond
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // thay đổi h1
    $("#level-title").text("Game Over, Press Any Key to Restart");

    //gọi hàm startOver khi user game over
    startOver();
  }
}

function startOver() {
  level = 0; //reset level về 0
  gamePattern = []; // reset mảng gamePattern thành empty
  started = false; //reset started thành false
  userClickedPattern = []; // reset mảng userClickedPattern thành empty
}
