function restartGame() {
  window.location.reload();
}
//Mute audio functionality
var audioState = true;
function toggleSound() {
  audioState = !audioState;
}

// Wrapping entire code in anonymous function and calling it, so that user doesn't have access to cardImageSrcs
(() => {

    let noOfCards = 0;
    let cardArray;
    const popup_box = document.getElementById("model");
    const timer = document.querySelector("#timer");
    
    //  game level difficulty function
  document.querySelectorAll(".level-btn").forEach((level, idx) => {
    level.addEventListener("click", () => {
      let level;
      if (idx == 0) level = 1;
      else if (idx == 1) level = 2;
      else level = 3;
      noOfCards = level == 1 ? 12 : level == 2 ? 20 : 24;
      for (let i = 0; i < noOfCards; i++) {
        var newCard = document.createElement("div");
        newCard.classList.add("memory-card");
        var img1 = document.createElement("img");
        img1.classList.add("front-face");
        img1.src = "#";
        img1.alt = "card front face";
        var img2 = document.createElement("img");
        img2.classList.add("back-face");
        img2.src = "images/cover.png";
        img2.alt = "card cover";

        newCard.appendChild(img1);
        newCard.appendChild(img2);

        document.querySelector(".memory-game").appendChild(newCard);
      }
      //generate the card array from the image sources
      cardArray = cardImageSrcs.slice(0, noOfCards / 2);
      cardArray.push(...cardArray);
      document.querySelectorAll(".memory-card").forEach((card, i) => {
        card.addEventListener("click", (e) => flipCard(e, i)); // Passing index of card when calling flipCard
      });
      // popup_box.classList.remove("popupBox");
      popup_box.style.transform = "scale(0)";
      setTimer();
    });
  });

  //increasing the counter
  let counter = 0;
  function counterIncrease() {
    counter++;
    console.log();
    timer.innerHTML = "<b>" + counter + "</b>";
  }

  let interval;
  function setTimer() {
    interval = setInterval(counterIncrease, 1000);
  }

  // open popup model let you choose
  document.getElementById("start-btn").addEventListener("click", function () {
    removeChild();
    counter = 0;
    clearInterval(interval);
    timer.innerHTML = "<b>" + 0 + "</b>";
    popup_box.style.transform = "scale(1)";
  });

  // closing the popup model on clicking fontawesome fa-fa cross icon
  document.querySelector(".fa-times").addEventListener("click", () => {
   popup_box.style.transform = "scale(0)";
  });

  // everytime remove childs of  memory-game card when user choose level again
  function removeChild() {
    const myNode = document.querySelector(".memory-game");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }
  }

  const cards = document.querySelectorAll(".memory-card");
  const bestTimer = document.querySelector("#best--timer");
  //retrieve best score from the local storage
  let bestScore = localStorage.getItem("memory-game-best-score");
  // audio variables
  var audioSuccess = new Audio("./audios/Success.mp3");
  var audioFail = new Audio("./audios/Fail.mp3");
  var audioWin = new Audio("./audios/Win.mp3");
  function audioPause() {
    audioSuccess.pause();
    audioSuccess.currentTime = 0;
    audioFail.pause();
    audioFail.currentTime = 0;
  }
  //initialise with the best score
  bestTimer.innerHTML = "<b>" + (bestScore == null ? "-" : bestScore) + "</b>";
  // let counter = 0;
  // //increasing the counter
  // const interval = setInterval(function(){
  //     counter++;
  //     timer.innerHTML = "<b>" + counter + "</b>";
  // }, 1000);

  //if the modal close button is clicked, change the display of modal to none
  document.querySelector("#modal--close").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "none";
  });

  // Storing image sources for list of cards
  const cardImageSrcs = [
    //need upto 12 cards for level 1
    "images/cards/rengoku.png",
    "images/cards/zenitsu.png",
    "images/cards/inosuke.png",
    "images/cards/nezuko.png",
    "images/cards/mask.png",
    "images/cards/tanjiro.png",
    //need upto 20 cards for level 2
    "images/cards/inosuke2.png",
    "images/cards/kanao.png",
    "images/cards/kimetsu.png",
    "images/cards/nezuko2.png",
    //need upto 24 cards for level 3
    "images/cards/tokito.png",
    "images/cards/genya.png",
  ];

  const flippedCards = [];
  let matched = 0;

  function shuffle(array) {
    let currentIndex = noOfCards,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  // Shuffling cards
  shuffle(cardArray);

  function checkForMatch() {
    //if matched
    if (flippedCards[0].children[0].src === flippedCards[1].children[0].src) {
      // Checking if the flipped cards have same src i.e are matching
      matched++;
      if (matched === noOfCards / 2) {
        if (audioState) {
          audioPause();
          audioWin.play(); // Win.mp3 plays if the game is complete
        }
        //print the updated best score on the page
        if (bestScore == null) bestScore = counter;
        else {
          bestScore = Math.min(bestScore, counter);
        }
        //store the best score on the local storage
        localStorage.setItem("memory-game-best-score", bestScore);
        bestTimer.innerHTML = "<b>" + bestScore + "</b>";
        document.querySelector("#modal--time").innerHTML = counter + " seconds";
        clearInterval(interval);
        document.querySelector(".modal").style.display = "flex";
      } else {
        if (audioState) {
          audioPause();
          audioSuccess.play(); // Success.mp3 plays if correct match
        }
      }
    }
    //if not matched
    else {
      flippedCards.forEach((flippedCard) => {
        flippedCard.children[0].src = "#"; // Removing image src so that it isn't visible through HTML
        flippedCard.children[0].alt = "card front face"; // Removing image alt so that it isn't visible through HTML
        flippedCard.children[1].style.display = "block";
      });
      if (audioState) {
        audioPause();
        audioFail.play(); // Fail.mp3 plays if not correct match
      }
    }

    flippedCards.length = 0;
  }

  function flipCard(e, i) {
    const card = e.target;

    // This means that card is already flipped currently, so we exit out of function
    if (card.children[0].src !== window.location.href + "#") return;

    flippedCards.push(card);
    card.children[0].src = cardArray[i]; // Setting image source for flipped front face
    card.children[0].alt = cardArray[i]
      .split("/")
      .slice(-1)[0]
      .split(".")
      .slice(0, -1)
      .join("."); // Setting image file name as alt text for flipped front face
    card.children[1].style.display = "none";

    //when we have filled two cards check for the match
    if (flippedCards.length === 2) {
      setTimeout(checkForMatch, 100); // Adding a small delay, so that card gets enough time to render updated src before alert pops up
    }
  }
})();
