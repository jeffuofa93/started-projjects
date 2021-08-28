// Sound constants and variables
let clueHoldTime = 1000; //how long to hold each clue's light/sound
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback
const volume = 0.5; // volume of the sounds for each button

//Sound pattern constants
const patternSize = 8; //Size of sound pattern array
const numberOfKeys = 6; // Number of unique sounds keys displayed

// Map with keys as sound buttons and value as the image to display on mousedown
const imageMap = {
    1: '<img id="button1img" src="images/turtle.png" alt="Turtle">',
    2: '<img id="button2img" src="images/bluebird.png" alt="Bluebird">',
    3: '<img id="button3img" src="images/vulture.png" alt="Vulture">',
    4: '<img id="button4img" src="images/yellowFrog.png" alt="Frog">',
    5: '<img id="button5img" src="images/tiger.png" alt="Tiger">',
    6: '<img id="button6img" src="images/wolf.png" alt="Wolf">'
}

//Game interface variables
let mistakes = 0; // tracks wrong guesses
let pattern = generateRandomPattern(); // holds the sound pattern array
let progress = 0; // tracks how far the player is into the sound array
let gamePlaying = false; // boolean to determine if the game has started
let tonePlaying = false; // boolean to determine if sound button is actively playing its sound
let guessCounter = 0; //Used to determine which index to check in the sound patter array

// add button event listeners
addButtonEventListeners();

/**
 * Adds random numbers in range of sound buttons to pattern array. Number of additions is determined by the constant
 * patternSize
 * @return - patternArr - array containing sound pattern
 */
function generateRandomPattern() {
    let patternArr = [];
    for(let i=0; i<patternSize;i++){
        patternArr.push(Math.floor(Math.random()*numberOfKeys)+1);
    }
    return patternArr;
}

/**
 * Resets key variables at the start of the game and hides the start button and displays the stop button
 */
function startGame(){
    pattern = generateRandomPattern();
    progress = 0;
    clueHoldTime = 1000;
    mistakes = 0;
    gamePlaying = true;
    document.getElementById("startBtn").classList.add("hidden");
    document.getElementById("stopBtn").classList.remove("hidden");
}

/**
 * Stops the game on button event. Hides the stop button and displays the start button
 */
function stopGame(){
    gamePlaying = false;
    document.getElementById("startBtn").classList.remove("hidden");
    document.getElementById("stopBtn").classList.add("hidden");
}

/**
 * Adds the lit class to the button causing it to appear to light up on button press. Also adds the image to the
 * inside of the button
 * @param btn- String 1-6 representing a button in the HTML
 */
function lightButton(btn){
    document.getElementById("button"+btn).classList.add("lit");
    document.getElementById("button"+btn).innerHTML = imageMap[btn];
}

/**
 * Removes the lit class from the button and removes the inner html containing the image.
 * @param btn - String 1-6 representing a button in the HTML
 */
function clearButton(btn){
    document.getElementById("button"+btn).classList.remove("lit")
    let curButtonImg = document.getElementById("button"+btn+"img");
    curButtonImg.remove();
}

/**
 * This function is used to play the a single sound in the sound pattern for the player
 * @param btn- String 1-6 representing a button in the HTML
 */
function playSingleClue(btn){
    if(gamePlaying){
        lightButton(btn);
        playTone(btn,clueHoldTime);
        setTimeout(clearButton,clueHoldTime,btn);
    }
}

/**
 * Plays the entire sound pattern. Each iteration increases the speed by 20%
 */
function playClueSequence(){
    guessCounter = 0;
    clueHoldTime = clueHoldTime * .8; // Increase the speed by 20% each time
    let delay = nextClueWaitTime; //set delay to initial wait time
    for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
        console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
        setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
        delay += clueHoldTime
        delay += cluePauseTime;
    }
}

/**
 * Called when the user loses the game
 */
function loseGame(){
    stopGame();
    alert("Game Over. You lost.");
}

/**
 * Called when the user wins the game
 */
function winGame(){
    stopGame();
    alert("Game Over. You won!.");
}

/**
 * This function is the decision structure for the user guess at the sound pattern
 * @param btn - String 1-6 representing a button in the HTML
 */
function guess(btn){
    if(!gamePlaying)
        return;
    if(pattern[guessCounter] === btn){
        if(guessCounter === progress){
            if(progress === pattern.length - 1){
                winGame();
            }else{
                progress++;
                playClueSequence();
            }
        }else{
            guessCounter++;
        }
    }else{
        mistakes++;
        if (mistakes>2){
            loseGame();
        } else {
            alert(`Mistake! wrong key ${2 - mistakes} left`)
        }
    }
    /* My attempt at the function worked well but had some small bugs with the mistake counter
  console.log("user guessed: " + btn);
  if(!gamePlaying)
      return;
  if (btn !== pattern[guessCounter]){
      mistakes++;
      if (mistakes >2){
          loseGame();
          return;
      }
      alert(`Mistake! wrong key ${2 - mistakes} left`)
  }

  if (guessCounter !== progress) {
      guessCounter++
      return;
  }
  if (progress !== pattern.length-1){
      progress++
      playClueSequence();
      return;
  }
  winGame();

   */
}


/**
 * This is an alternative I used to adding the event listeners directly in the html text. I believe both methods work
 * identically but I wanted to display some additional javascript experience.
 *
 * Adds event listeners to the start and stop buttons for click events. Adds event listeners for all sound buttons for
 * click, mousedown and mouseup.
 */
function addButtonEventListeners(){
    let startButton = document.getElementById("startBtn")
    let stopButton = document.getElementById("stopBtn")
    startButton.addEventListener("click",function (){
        startGame();
        playClueSequence();
    });
    stopButton.addEventListener("click",function (){
        stopGame();
    });
    let buttonArr = document.querySelectorAll("div#gameButtonArea button")
    buttonArr.forEach((button,index) => {
        button.addEventListener("mouseup",function (){
            stopTone(index+1);
        });
        button.addEventListener("mousedown",function (){
            startTone(index+1);
        });
        button.addEventListener("click",function (){
            guess(index+1);
        });
    });
}


// Create a map wit keys of button ID's as numbers and values the sound frequency. The lower the number the lower/deeper
// the sound is
const freqMap = {
    1: 261.6,
    2: 329.6,
    3: 392,
    4: 466.2,
    5: 195,
    6: 532
}
// All below code is provided sound functionality

function playTone(btn,len){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
    setTimeout(function(){
        stopTone()
    },len)
}
function startTone(btn){
    if(!tonePlaying){
        console.log(btn)
        o.frequency.value = freqMap[btn]
        g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
        tonePlaying = true
        // Added
        document.getElementById("button"+btn).innerHTML = imageMap[btn]; // add image to button
    }
}
function stopTone(btn){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
    //Added
    let curButtonImg = document.getElementById("button"+btn+"img");
    curButtonImg.remove(); // remove image from button
}

var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)





