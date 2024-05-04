// homework2.js
//
// Loaded by homework2.html.

let chosen = [];
let checking = false; //can't click while checking if it's a math

function init() {
  console.log("Initializing");

  //set up starting over
  document
    .getElementById("playAgainButton")
    .addEventListener("click", function () {
      document.getElementById("gameOverMessage").style.display = "none";
      init(); //start game over
    });
  //reset chosen and checking
  chosen = [];
  checking = false; //can't click while checking

  //clear the board
  const gameCards = document.querySelector(".game"); //To edit whole board
  gameCards.innerHTML = ""; //Clear the board

  //add each card type twice
  const cardTypes = [];
  for (let i = 0; i < 6; i++) {
    cardTypes.push(i, i);
  }

  //shuffle cards
  for (let i = cardTypes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardTypes[i], cardTypes[j]] = [cardTypes[j], cardTypes[i]];
  }

  //data attribute - create cards and display them
  for (let i = 0; i < cardTypes.length; i++) {
    let card = document.createElement("div");
    card.className = "eachCard hidden"; //all cards start hidden
    card.setAttribute("data-card", cardTypes[i]);

    //flipping functionality with click handler
    card.addEventListener("click", function () {
      if (!this.classList.contains("hidden") || checking) return; //check if card is being checked or revealed
      this.classList.remove("hidden");
      this.classList.add("chosen");
      this.textContent = this.getAttribute("data-card"); //show the value
      chosen.push(this);

      //user has selected two cards
      if (chosen.length === 2) {
        checking = true;
        checkMatch();
      }
    });
    gameCards.appendChild(card);
  }
}

//implement the rules of the game, check if there is a match
function checkMatch() {
  if (
    chosen[0].getAttribute("data-card") === chosen[1].getAttribute("data-card")
  ) {
    chosen.forEach((card) => {
      card.classList.remove("chosen");
      card.classList.add("revealed");
    });
  }
  //if they don't match
  else {
    setTimeout(() => {
      chosen.forEach((card) => {
        card.classList.add("hidden");
        card.classList.remove("chosen");
      });
      chosen = []; //reset selected cards
      checking = false; //reset checking to let the user click again
    }, 2000); //wait 2 seconds
    return;
  }
  chosen = []; //reset selected cards
  checking = false; //let the user click

  //check if game is over
  if (document.querySelectorAll(".eachCard.hidden").length === 0) {
    document.getElementById("gameOverMessage").style.display = "block";
  }
}

window.onload = init;
