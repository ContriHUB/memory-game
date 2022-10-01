
const cards = document.querySelectorAll('.memory-card')
const restartBtn = document.querySelector('#restart-btn')
const timer = document.querySelector('#timer')
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

// Storing image sources for list of cards
const cardImageSrcs = [
    'images/cards/inosuke.png',
    'images/cards/nezuko.png',
    'images/cards/rengoku.png',
    'images/cards/mask.png',
    'images/cards/tanjiro.png',
    'images/cards/zenitsu.png',
    'images/cards/inosuke.png',
    'images/cards/nezuko.png',
    'images/cards/rengoku.png',
    'images/cards/mask.png',
    'images/cards/tanjiro.png',
    'images/cards/zenitsu.png',
];
const flippedCards = []
let matched=0;

function checkForMatch(){
    //if matched
    if(flippedCards[0].children[0].src===flippedCards[1].children[0].src) // Checking if the flipped cards have same src i.e are matching
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
            flippedCard.children[0].src="#"; // Removing image src so that it isn't visible through HTML
            flippedCard.children[1].style.display="block";
        })
        alert("haha! better luck next time");
    }

    flippedCards.length= 0;
}

function flipCard(e, i){
    const card = e.target
    flippedCards.push(card)
    card.children[0].src=cardImageSrcs[i]; // Setting image source for flipped front face
    card.children[1].style.display="none";

    //when we have filled two cards check for the match
    if(flippedCards.length === 2)
    {
        setTimeout(checkForMatch,100); // Adding a small delay, so that card gets enough time to render updated src before alert pops up
    }
}

cards.forEach((card, i)=>{
    card.addEventListener('click',e=>flipCard(e, i)); // Passing index of card when calling flipCard
})


