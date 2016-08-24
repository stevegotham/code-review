// exapmle input:  'Kh Qh 6h 2h 9h' (Flush)
function pokerFace(hand) {
  let theCards = hand.split(' ');
  if(theCards.length < 5) return "Invalid input format";
  let returnHand = [];
  // convert each card into an object and push into returnHand
  for(let i=0;i<theCards.length;i++) {
    // check for value of 10
    if(!isNaN(theCards[i][1])) {
      var card = {
        value: 10,
        suit: theCards[i][2].toLowerCase()
      }
    } else {
      var card = {
        value: theCards[i][0],
        suit : theCards[i][1].toLowerCase()
      }
    }
    // convert face card to a number value to determine straights
    if (card.value === 'A' || card.value === 'a') card.value = 14;
    if (card.value === 'K' || card.value === 'k') card.value = 13;
    if (card.value === 'Q' || card.value === 'q') card.value = 12;
    if (card.value === 'J' || card.value === 'j') card.value = 11;
    // otherwise convert string value to a number
    card.value = parseInt(card.value)
    returnHand.push(card)
  }
  // order cards from lowest to highest
  returnHand.sort((a,b) => {
    if (a.value > b.value) return 1
    if (a.value < b.value) return -1
  })
  let highCard = returnHand[4];
  function evaluate(hand) {
    // set initial suit and value for flush and straigt comparison
    let suit = hand[0].suit;
    let value = hand[0].value;
    let suitCount = 0;
    let valueCount = 0;
    let values = [];
    // populate array of values
    for(let card of hand) {
      values.push(card.value)
    }
    // get a count of values for pair/ two pair/ three of a kind/ four of a kind/ full house comparison
    let counts = {};
    values.forEach( (val) => {
       counts[val] = (counts[val] || 0) +1;
    });
    // increment suit and value for flush and straight comparison
    for (let i=0;i<hand.length;i++) {
      if(hand[i].suit === suit) suitCount += 1;
      if(hand[i].value === value + i) valueCount += 1;
    }
      if(suitCount === 5 && valueCount === 5 && value === 10) return "Royal flush";
      if(suitCount === 5 && valueCount === 5) return "Straight flush";
      if(Object.keys(counts).length === 2 &&
      counts[Object.keys(counts)[0]] === 1 ||
      counts[Object.keys(counts)[0]] === 4) return "Four of a kind";
      if(Object.keys(counts).length === 2) return "Full house";
      if(suitCount === 5) return "Flush";
      if(valueCount === 5) return "Straight";
      if(Object.keys(counts).length === 3 &&
      counts[Object.keys(counts)[0]] === 3 ||
      counts[Object.keys(counts)[1]] === 3 ||
      counts[Object.keys(counts)[2]] === 3) return "Three of a kind";
      if(Object.keys(counts).length === 3) return "Two pair";
      if(Object.keys(counts).length === 4) return "Pair";
      else {
        // convert values back into face cards
        if(highCard.value === 11) highCard.value = "J";
        if(highCard.value === 12) highCard.value = "Q";
        if(highCard.value === 13) highCard.value = "K";
        if(highCard.value === 14) highCard.value = "A";
        return highCard.value + highCard.suit;
      }
  }
  return evaluate(returnHand);
}
pokerFace('Kh Qh 6h 2h 9h');
