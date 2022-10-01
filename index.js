
const cards = document.querySelectorAll('.memory-card')
const restartBtn = document.querySelector('#restart-btn')
const timer = document.querySelector('#timer')
const bestTimer = document.querySelector('#best--timer');
//retrieve best score from the local storage
let bestScore = localStorage.getItem("memory-game-best-score");
//initialise with the best score
bestTimer.innerHTML = "<b>" + (bestScore == null ? "-" : bestScore) + "</b>";
let counter = 0;
//increasing the counter

const interval = setInterval(function(){
    counter++;
    console.log()
    timer.innerHTML = "<b>" + counter + "</b>";
  }, 1000);

function restartGame(){
    window.location.reload()
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
            //print the updated best score on the page
            if(bestScore == null) 
                bestScore = counter;
            else{
                bestScore = Math.min(bestScore, counter);
            }
            //store the best score on the local storage
            localStorage.setItem("memory-game-best-score", bestScore);
            bestTimer.innerHTML = "<b>" + bestScore + "</b>";
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
            flippedCard.classList.remove('flip')
        })
        alert("haha! better luck next time");
    }

    flippedCards.length= 0;
}

function flipCard(e){
    const card = e.target
    flippedCards.push(card)
    card.children[1].style.display="none";
    card.classList.add('flip')
    //when we have filled two cards check for the match
    if(flippedCards.length === 2)
    {
        setTimeout(checkForMatch,0); 
    }
}

cards.forEach(card=>{
    card.addEventListener('click',flipCard);
})


