// FISHER-YATES SHUFFLE
export function shuffle(array) {
  var m = array.length, t, i;

  while (m) {

    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

export function suit(suit) {
    if (suit === "spades") {return "\u2660"}
    else if (suit === "clubs") {return "\u2663"}
    else if (suit === "hearts") {return "\u2665"}
    else {return "\u2666"}
}

export function pointTally(hand) {
    hand.sort((a, _) => {
        if (a.value === "A") {return 1}
      })
    let points = 0
    let alt = 0
    for (let i = 0; i < hand.length; i++) {
        if (hand[i].value === "A") {alt = points + 11
        points += 1} else if (hand[i].value === "J" || hand[i].value === "Q" || hand[i].value === "K") {
            points += 10
        } else {points += Number(hand[i].value)}
    } if (alt > points && alt < 22) {return alt}
    return points
}