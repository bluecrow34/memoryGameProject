const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let card1 = null;
let card2 = null;
let count = 0;


window.onload = function(){
  shuffle();
}

function flipCard(e) {
  const counter = document.getElementById('flip-counter');

  if(lockBoard) return;
  if(this === card1) return;

  //Increase Count
  count++;
  counter.textContent = count;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click

    hasFlippedCard = true;
    card1 = this;
    return;
  }

  card2 = this;
 

  checkForMatch();

}

function checkForMatch(){
  if (card1.dataset.framework === card2.dataset.framework){
    disableCards();
  return;
  }
  unflipCards();
}

function disableCards(){
card1.removeEventListener('click', flipCard);
card2.removeEventListener('click', flipCard);

resetBoard();
}

function unflipCards(){
  lockBoard = true;

  setTimeout(() => {
    card1.classList.remove('flip');
    card2.classList.remove('flip');

   resetBoard();

  }, 500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [card1, card2] = [null, null];
}


function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
};

cards.forEach(card => card.addEventListener('click', flipCard));

