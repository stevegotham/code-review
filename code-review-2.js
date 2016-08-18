// Hand: Kh Qh 6h 2h 9h (Flush)

function pokerFace(hand) {
  let theCards = hand.split(' ');
  let returnHand = [];
  var message =
    {
      royalFlush: "Royal Flush",
      straightFlush: "Straight Flush",
      fourOfKind: "Four of a Kind",
      fullHouse: "Full House",
      flush: "Flush",
      straight: "Straight",
      threeOfKind: "Three of a Kind",
      twoPair: "Two Pair",
      pair: "Pair"
    }

  for(let i=0;i<theCards.length;i++) {
    if(!isNaN(theCards[i][1])) {
      var card = {
        value: 10,
        suit: theCards[i][2]
      }
    } else {
      var card = {
        value: theCards[i][0],
        suit : theCards[i][1]
      }
    }
    if (card.value === 'A') card.value = 14;
    if (card.value === 'K') card.value = 13;
    if (card.value === 'Q') card.value = 12;
    if (card.value === 'J') card.value = 11;
    card.value = parseInt(card.value)
    returnHand.push(card)
  }

  returnHand.sort((a,b) => {
    if (a.value > b.value) return 1
    if (a.value < b.value) return -1
  })

  function evaluate(hand) {

    let suit = hand[0].suit;
    let value = hand[0].value;
    let suitCount = 0;
    let valueCount = 0;
    let values = [];

    for(let card of hand) {
      values.push(card.value)
    }

    var counts = {};
    values.forEach(function(x) {
       counts[x] = (counts[x] || 0)+1;
    });


    for (let i=0;i<hand.length;i++) {
      if(hand[i].suit === suit) suitCount += 1;
      if(hand[i].value === value + i) valueCount += 1;
      if(suitCount === 5 && valueCount === 5 && value === 10) return "royalFlush";
      if(suitCount === 5 && valueCount === 5) return "straightFlush";

      if(Object.keys(counts).length < 3 &&
      counts[Object.keys(counts)[0]] === 1 ||
      counts[Object.keys(counts)[0]] === 4) return "fourOfKind";
      if(Object.keys(counts).length < 3 &&
      counts[Object.keys(counts)[0]] === 2 ||
      counts[Object.keys(counts)[0]] === 3) return "fullHouse";

      if(valueCount === 5) return "straight";
      if(suitCount === 5) return "flush";
    }
  }
  return message[evaluate(returnHand)];
}
