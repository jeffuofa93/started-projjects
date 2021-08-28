// This program creates a rock paper scissors game

// return the move
function getRndInteger(max) {
    return Math.floor((Math.random() * max)+1);
  }
function computerPlay(){
    let moveArr = ["rock","paper","scissors"];
    let num = getRndInteger(2);
    return moveArr[num];
}


function playRound(playerSelection,computerSelection,counter=0){
    if (playerSelection === computerSelection) {
        nextMove = computerPlay();
        playerselection = prompt("It's a tie enter rock paper or scissors to continue this round: ");
        return playRound(playerSelection,nextMove,counter++);
    } else if ((computerSelection === "rock" && playerSelection ==="scissors")||
        (computerSelection ==="paper" && playerSelection ==="rock")||
        (computerSelection==="scissors" && playerSelection ==="paper")){
            //console.log("You Lose! " + computerSelection+ " beats " + playerSelection);
            //console.log("end of inner function \n");
            return `You Lose! ${computerSelection} beats ${playerSelection}`
    }
    else {
        //console.log(`You Win! ${playerSelection} beats ${computerSelection}`);
        //console.log("end of inner function \n");
        return `You Win! ${playerSelection} beats ${computerSelection}`
    }
    
}

function game(){
    let displayString;

    for (i=0; i<5; i++){
        let playerSelection = prompt("Enter rock paper or scissors: ");
        let computerSelection = computerPlay();
        displayString = playRound(playerSelection,computerSelection);
        console.log(displayString);
    }
}

game();

// 

// EOF comment
