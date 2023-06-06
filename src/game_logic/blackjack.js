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

export function deal(hand) {
    let idx = Math.floor(Math.random() * deck.length)
    hand.push(deck[idx])
    deck.splice(idx, 1)
    return hand
  }

export function suit(suit) {
    if (suit === "spades") {return "\u2660"}
    else if (suit === "clubs") {return "\u2663"}
    else if (suit === "hearts") {return "\u2665"}
    else {return "\u2666"}
}