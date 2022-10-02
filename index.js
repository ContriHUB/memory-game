const cards = document.querySelectorAll('.memory-card')
const restartBtn = document.querySelector('#restart-btn')
const timer = document.querySelector('#timer')
const modal = document.querySelector('.modal')
const timer_box = document.querySelector('.timer-box')
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
        //show pop-up when game finished
        clearInterval(interval)
        modal.style.cssText = "display : block;";
        timer_box.innerHTML = "<b>" + counter + "Secs</br>"
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

cards.forEach(card=>{
    card.addEventListener('click',flipCard);
})


