var btnColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userArray = [];

var started = false;
var lvl = 0;

// starts game
$(document).keypress(function(){
    if (!started){
        $("#level-title").text("Level " + lvl);
        nextSeq();
        started = true;
    }
});

// User inputs
$(".btn").click(function(){

    // adds to userArray
    var userChoice = $(this).attr("id");
    userArray.push(userChoice);
    // console.log(userChoice);

    // plays sound
    playSound(userChoice);
    animatePress(userChoice);

    // checks answer
    checkAnswer(userArray.length - 1)
});


function nextSeq(){
    // resets userArray
    userArray = [];

    // increse lvl
    lvl++;
    $("#level-title").text("Level "+lvl);

    // generates random number
    var nextNum = Math.floor(Math.random() * 4);

    // adds to gamePattern Array
    var randomClr = btnColors[nextNum];
    gamePattern.push(randomClr);
    // console.log(gamePattern);

    // animates button
    $("#"+randomClr).fadeIn(200).fadeOut(100).fadeIn(100);

    // plays sound 
    playSound(randomClr);
}


function playSound(name){
    var audio = new Audio ("sounds/"+ name + ".mp3");
    audio.play();
}

function animatePress(currentClr){
    $("#"+currentClr).addClass("pressed");

    setTimeout(function(){
        $("#"+currentClr).removeClass("pressed");
    }, 100);
}

function checkAnswer(currLvl){
    if (userArray[currLvl] === gamePattern[currLvl]) {
        // console.log("success");

        if (userArray.length === gamePattern.length){
            setTimeout(function(){
                nextSeq();
            }, 500);
        }
    }   else{
        // console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        }, 400);
        var over = new Audio("sounds/wrong.mp3");
        $("#level-title").text("Game Over!! Restart-press any key Your Score is: " + lvl);
        startAgain();
    }
}

function startAgain(){
    gamePattern = [];
    userArray = [];
    lvl = 0;
    started = false;
}