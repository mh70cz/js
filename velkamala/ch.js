let wordStr = "chrochro chro hroch cho dci "; //"hroch"; //"chocholouš";
let wordArr = [];

let i = 0;
while (i < wordStr.length) {
  //   if (wordStr[i] != "c") {
  //     wordArr.push(wordStr[i]);
  //     i++;
  //     continue;
  //   }

  //posledni znak
  if (i + 1 == wordStr.length) {
    wordArr.push(wordStr[i]);
    i++;
    continue;
  }

  if ((wordStr[i] == "c" && wordStr[i + 1] == "h")) {
    wordArr.push("ch");
    i += 2;
    continue;
  } else {
    wordArr.push(wordStr[i]);
    i++;
    continue;
  }
}

console.log(wordArr);
