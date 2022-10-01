
const cards = document.querySelectorAll('.memory-card')
const restartBtn = document.querySelector('#restart-btn')
const timer = document.querySelector('#timer')
let counter = 0;
let memoryCounter = 5;

// For modifying cards
const makeCardsClickable = setTimeout(function(){
    cards.forEach(card=>{
        card.addEventListener('click',flipCard); // Makes cards clickable after the timer expires
        card.children[1].style.display="block"; // Hides them after the timer expires
    })
},memoryCounter*1000);

// For timing the counters
const interval = setInterval(function(){
    if(memoryCounter>0){ // Makes a check on memoryCounter and stops after 5 secs
        memoryCounter--;
        viewAllCards();
        timer.innerHTML = "<b>" + memoryCounter + "</b>"; // Changes inner HTML
    }
    else{ // Counter for timing the game
        counter++; // This counter is set to motion only when the game starts i.e when memoryCounter expires
        timer.innerHTML = "<b>" + counter + "</b>"; // Changes inner HTML
    }
  }, 1000);


// To view all cards
function viewAllCards(){
    // Cards are made viewable when memoryCounter is greater than 0
    if(memoryCounter>0){
        cards.forEach(card=>{
            card.children[1].style.display="none";
        })
    }
}


// When the game restarts all cards are made visible for 5secs
function restartGame(){
    window.location.reload();
}

const flippedCards = []
let matched=0;

function checkForMatch(){
    //if matched
    if(flippedCards[0].dataset.character===flippedCards[1].dataset.character)
    {
        //remove listener from the card to avoid clicking again
        flippedCards[0].removeEventListener('click',flipCard)
        flippedCards[1].removeEventListener('click',flipCard)
        
        matched++;
        if(matched===6)
        {
        alert("hurrah! you did it")
        clearInterval(interval)
        }
        else
        alert("woah! matched")
        
    }
    //if not matched
    else
    {
        flippedCards.forEach(flippedCard=>{
            flippedCard.children[1].style.display="block";
        })
        alert("haha! better luck next time");
    }

    flippedCards.length= 0;
}

function flipCard(e){
    const card = e.target
    flippedCards.push(card)
    card.children[1].style.display="none";

    //when we have filled two cards check for the match
    if(flippedCards.length === 2)
    {
        setTimeout(checkForMatch,0); 
    }
}
