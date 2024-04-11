let gameSeq = [];
let userSeq = [];
let btns = ["yellow","red","purple","green"];
let matchScores = [];

let started = false; // this variable tells us whether the game started 
let level = 0;
let h3 = document.querySelector('h3')

document.addEventListener("keypress", function () {
    if(started==false){
        console.log("started");
        started= true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 250);
}
function levelUp(){
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;
    //random button choose
    let randomIdx = Math.floor(Math.random()*3);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);
   gameSeq.push(randomColor);
   console.log(gameSeq)
  
    gameFlash(randomBtn);
}
function checkAns(idx){
    console.log("Game Sequence:", gameSeq);
    console.log("User Sequence:", userSeq);
    console.log("Current level is : ",level);
   
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 250)
        }
    }
    else{
        h3.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        matchScores.push(level)
        console.log(matchScores)
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
          document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
        let highestScore=calculateHighestScore(matchScores);
        let h4= document.createElement('h4');
        h4.innerText = `Highest score is : ${highestScore}`;
        h4.style.color = "yellow";
        h4.style.backgroundColor = "Black"
        document.querySelector("h3").append(h4)
      }
    }

function btnPress(){
    console.log(this);
   let btn = this;
   userFlash(btn);
   userColor = btn.getAttribute("id");
   console.log(userColor);
   userSeq.push(userColor);

   checkAns(userSeq.length-1);     // size of gameSeq & userSeq will be equal to current level
}
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress)
}
function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
function calculateHighestScore() {
    // Check if there are any match scores
    if (matchScores.length === 0) {
        return "No matches played yet";
    }

    // Use Math.max() to find the highest score
    let highestScore = Math.max(...matchScores);
    return highestScore;
}
//add new feature