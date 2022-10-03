function restartGame(){
    window.location.reload()
}

// Wrapping entire code in anonymous function and calling it, so that user doesn't have access to cardImageSrcs
(() => {
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

    // Storing image sources for list of cards
    // Storing it as a list and not a matrix to make it a bit difficult to map list to the 3x4 grid
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

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
    
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
    
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
    
        return array;
    }
    // Shuffling cards
    shuffle(cardImageSrcs);

    function checkForMatch(){
        //if matched
        if(flippedCards[0].children[0].src===flippedCards[1].children[0].src) // Checking if the flipped cards have same src i.e are matching
        {        
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
                flippedCard.children[0].src="#"; // Removing image src so that it isn't visible through HTML
                flippedCard.children[0].alt="card front face"; // Removing image alt so that it isn't visible through HTML
                flippedCard.children[1].style.display="block";
            })
            alert("haha! better luck next time");
        }

        flippedCards.length= 0;
    }

    function flipCard(e, i){
        const card = e.target

        // This means that card is already flipped currently, so we exit out of function
        if (card.children[0].src!==window.location.href+"#")
            return;

        flippedCards.push(card)
        card.children[0].src=cardImageSrcs[i]; // Setting image source for flipped front face
        card.children[0].alt=cardImageSrcs[i].split('/').slice(-1)[0].split('.').slice(0, -1).join('.'); // Setting image file name as alt text for flipped front face
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
})();
const modal = document.getElementById("modal");
const shadow = document.getElementById("shadow");

window.onclick = (e) => {
  if (e.target === shadow) {
    closeModal();
  }
};

function closeModal() {
  modal.classList.remove("active");
  shadow.classList.remove("active");
}

function openModal() {
  modal.classList.add("active");
  shadow.classList.add("active");
}



