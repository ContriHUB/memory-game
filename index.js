
const cards = document.querySelectorAll('.memory-card')
const restartBtn = document.querySelector('#restart-btn')
const timer = document.querySelector('#timer')
let counter = 0;
let memoryCounter = 5;

// Timing the counters
const decreaseTimer = setInterval(function(){
    if(memoryCounter>0){
        memoryCounter--;
        viewAllCards();
        console.log()
        timer.innerHTML = "<b>" + memoryCounter + "</b>";
    }
    else{
        if(counter==0){
            cards.forEach(card=>{
                card.addEventListener('click',flipCard);
            })
        }
        counter++;
        console.log()
        timer.innerHTML = "<b>" + counter + "</b>";
    }
  }, 1000);


// To view all cards
function viewAllCards(){
    if(memoryCounter>0){
        cards.forEach(card=>{
            card.children[1].style.display="none";
        })
    }
    else{
        cards.forEach(card=>{
            card.children[1].style.display="block";
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
        clearInterval(decreaseTimer)
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
