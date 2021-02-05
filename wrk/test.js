
// prettier-ignore
let extraLetters = ["a", "b", "d",  "e", "f", "g", "h", "i", "j", "l", "m", "n", "q", "r", "t"];
let word = [..."bagr"];

function get_nExtraLetters(word) {
  let wl = word.length;
  if (wl > 10) {
    return 0;
  } else if (wl > 8) {
    return 1;
  } else if (wl > 6) {
    return 2;
  }else if (wl > 5) {
    return 3;
  } else {return 4}
};




//let difference = arr1.filter(x => !arr2.includes(x));

let diffExtraLetters = extraLetters.filter(x => !word.includes(x));

console.log(diffExtraLetters);

for (let index = 0; index < 10; index++) {
    let nExtraLetters = get_nExtraLetters(word);

    let wordRnd = shuffle(word).concat(shuffle(diffExtraLetters).slice(0,nExtraLetters));
    
    console.log(nExtraLetters, wordRnd);
    
}



function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }