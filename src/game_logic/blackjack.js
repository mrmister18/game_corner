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