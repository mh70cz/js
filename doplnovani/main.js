phrases = {
  north: "sever",
  east: "východ",
  south: "jih",
  west: "západ",
};

drawLetterBoxes(phrases);

function drawLetterBoxes(phrases) {
  let phraseLongArr = [];
  let phraseArr;
  for (const key in phrases) {
    const phrase = phrases[key];
    phraseArr = strArrCH(phrase);
    drawUpperLetterBoxes(key, phraseArr);
    phraseLongArr = phraseLongArr.concat(phraseArr);

    console.log(key, phrase);
  }

  drawLowerLetterBoxes(shuffle(phraseLongArr), (fontCase = "lower"));
}

function drawUpperLetterBoxes(destinantionId, phraseArr) {
  let destDiv = document.getElementById(destinantionId);

  for (const letter of phraseArr) {
    let letterBlock = document.createElement("DIV");

    if (letter === " ") {
      letterBlock.classList.add("letterBlock", "space");
    } else {
      letterBlock.classList.add("letterBlock", "available");
      letterBlock.setAttribute("l", letter);
      letterBlock.addEventListener("click", selectUpperLetterBlock);
    }
    letterBlock.innerText = " ";
    destDiv.appendChild(letterBlock);
  }
}

function drawLowerLetterBoxes(phraseArr, fontCase = "lower") {
  let destDiv = document.getElementById("lower-row");

  for (const letter of phraseArr) {
    let letterBlock = document.createElement("DIV");

    if (letter !== " ") {
      letterBlock.classList.add("letterBlock", "available");
      letterBlock.setAttribute("l", letter);
      if (fontCase === "upper") {
        letterBlock.innerText = letter.toUpperCase();
      } else {
        letterBlock.innerText = letter;
      }
      letterBlock.addEventListener("click", selectLowerLetterBlock);
    }
    destDiv.appendChild(letterBlock);
  }
}

function selectUpperLetterBlock(e) {
  if (e.target) {
    console.log(e.target);
  } else {
  }
}

function selectLowerLetterBlock(e) {
  if (e.target) {
    console.log(e.target);
  } else {
  }
}

function strArrCH(s) {
  //string do pole se zachovanim ch
  let sArr = [];

  let i = 0;
  while (i < s.length) {
    //   if (wordStr[i] != "c") {
    //     wordArr.push(wordStr[i]);
    //     i++;
    //     continue;
    //   }

    //posledni znak
    if (i + 1 == s.length) {
      sArr.push(s[i]);
      i++;
      continue;
    }

    if (s[i] == "c" && s[i + 1] == "h") {
      sArr.push("ch");
      i += 2;
      continue;
    } else {
      sArr.push(s[i]);
      i++;
      continue;
    }
  }
  return sArr;
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
