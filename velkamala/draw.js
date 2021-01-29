let words = shuffle([
  "chodec",
  "chocholouš",
  "procházka",
//   "letadlo",
//   "raketa",
//   "buldozer",
//   "morče",
//   "hrom",
//   "blesk",
//   "bouřka",
//   "lego",
//   "bagr",
//   "fazole",
//   "bodlák",
//   "ježek",
//   "bublifuk",
//   "praha",
//   "barrandov",
//   "střelec",
//   "pěšec",
//   "gorila",
//   "jupiter",
//   "ponožky",
//   "dub",
//   "kedluben",
//   "brambora",
//   "medvěd",
//   "telefon",
//   "jinovatka",
//   "velikonoce",
]);
// const wordStr = "letadlo";
// const word = [...wordStr]; // ToDo: mezery a ch
// const wordRnd = shuffle([...wordStr]);

let ucRow = document.getElementById("ucr");
let wRow = document.getElementById("wr");
let lcRow = document.getElementById("lcr");
let resDiv = document.getElementById("res");
let selectedLetterLow = null;
let selectedLetterWrk = null;
let cntWords = 0;
let cntLettersOk = 0;
let cntLettersKo = 0;
let cntPoints = 0;
//let wordFinished = false;

generateTask();

function generateTask() {
  //Clear letterBlocks
  ucRow.innerHTML = "";
  wRow.innerHTML = "";
  lcRow.innerHTML = "";
  resDiv.innerHTML = "";

  updateCounters();

  if (cntWords < words.length) {
    let wordStr = words[cntWords];
    word = strArrCH(wordStr);
    wordRnd = shuffle(strArrCH(wordStr));
    drawLetterBlocks();
  } else {
    resDiv.innerHTML = " ****   KONEC   ***** ";
  }
}

function updateCounters() {
  document.getElementById("cntWords").innerHTML = cntWords;
  document.getElementById("cntLettersOk").innerHTML = cntLettersOk;
  document.getElementById("cntLettersKo").innerHTML = cntLettersKo;
  document.getElementById("cntPoints").innerHTML = cntPoints;
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

function lettersMatched() {
  resDiv.innerHTML = "matched";

  cntLettersOk++;
  cntPoints++;

  let wDivs = wRow.childNodes;
  wDivs.forEach((el) => {
    if (el.classList.contains("selected")) {
      el.classList.remove("selected");
      el.classList.add("matched");
      el.innerHTML = selectedLetterWrk;
    }
  });

  let lcDivs = lcRow.childNodes;
  lcDivs.forEach((el) => {
    if (el.classList.contains("selected")) {
      el.classList.remove("selected");
      el.classList.add("used");
    }
  });

  let wDivsArr = Array.from(wDivs);
  if (
    wDivsArr.every((el) => {
      return el.classList.contains("matched");
    })
  ) {
    resDiv.innerHTML = "ALL matched";
    cntWords++;
    generateTask();
  }
}

function lettersNotMatched() {
  resDiv.innerHTML = "not matched";

  cntLettersKo++;
  cntPoints -= 2;

  let wDivs = wRow.childNodes;
  wDivs.forEach((el) => {
    if (el.classList.contains("selected")) {
      el.classList.remove("selected");
      el.classList.add("available");
    }
  });

  let lcDivs = lcRow.childNodes;
  lcDivs.forEach((el) => {
    if (el.classList.contains("selected")) {
      el.classList.remove("selected");
      el.classList.add("available");
    }
  });
}

function matchLetterBoxes() {
  let selectedLowRowDiv = document
    .getElementById("lcr")
    .getElementsByClassName("selected")[0];

  if (typeof selectedLowRowDiv === "undefined") {
    console.log("selectedLowRowDiv is undefined");
    selectedLetterLow = null;
  } else {
    selectedLetterLow = selectedLowRowDiv.getAttribute("l");
  }
  console.log(selectedLetterLow);

  let selectedWrkRowDiv = document
    .getElementById("wr")
    .getElementsByClassName("selected")[0];

  if (typeof selectedWrkRowDiv === "undefined") {
    console.log("selectedWrkRowDiv is undefined");
    selectedLetterWrk = null;
  } else {
    selectedLetterWrk = selectedWrkRowDiv.getAttribute("l");
  }
  console.log(selectedLetterWrk);

  if (selectedLetterWrk === null || selectedLetterLow === null) {
    resDiv.innerHTML = "not selected";
  } else if (selectedLetterWrk === selectedLetterLow) {
    lettersMatched();
  } else {
    lettersNotMatched();
  }
  updateCounters();
}

function selectLetterBlockWrk(e) {
  if (e.target) {
    if (!e.target.classList.contains("matched")) {
      let divs = wRow.childNodes;
      divs.forEach((el) => {
        if (el.classList.contains("selected")) {
          el.classList.remove("selected");
          el.classList.add("available");
        }
      });

      if (e.target.classList.contains("available")) {
        e.target.classList.remove("available");
        e.target.classList.add("selected");
      }
    }
    matchLetterBoxes();
  }
}

function selectLetterBlockLow(e) {
  if (e.target) {
    if (!e.target.classList.contains("used")) {
      let divs = lcRow.childNodes;
      divs.forEach((el) => {
        if (el.classList.contains("selected")) {
          el.classList.remove("selected");
          el.classList.add("available");
        }
      });

      if (e.target.classList.contains("available")) {
        e.target.classList.remove("available");
        e.target.classList.add("selected");
      }
    }
    matchLetterBoxes();
  }
}

function drawLetterBlocks() {
  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    {
      let letterBlock = document.createElement("DIV");
      letterBlock.className = "letterBlock";
      letterBlock.innerHTML = letter.toUpperCase();
      ucRow.appendChild(letterBlock);
    }
    {
      let letterBlock = document.createElement("DIV");
      letterBlock.setAttribute("l", letter);
      letterBlock.classList.add("letterBlock", "available");
      letterBlock.innerHTML = "&nbsp;";
      letterBlock.addEventListener("click", selectLetterBlockWrk);
      wRow.appendChild(letterBlock);
    }
    console.log(letter);
  }

  for (let i = 0; i < wordRnd.length; i++) {
    const letter = wordRnd[i];

    let letterBlock = document.createElement("DIV");
    letterBlock.setAttribute("l", letter);
    letterBlock.classList.add("letterBlock", "available");
    letterBlock.innerHTML = letter;
    letterBlock.addEventListener("click", selectLetterBlockLow);
    lcRow.appendChild(letterBlock);
  }
}

function strArrCH(s) {
  //string do pole se zachovanim ch  
  let wordArr = [];

  let i = 0;
  while (i < s.length) {
    //   if (wordStr[i] != "c") {
    //     wordArr.push(wordStr[i]);
    //     i++;
    //     continue;
    //   }

    //posledni znak
    if (i + 1 == s.length) {
      wordArr.push(s[i]);
      i++;
      continue;
    }

    if (s[i] == "c" && s[i + 1] == "h") {
      wordArr.push("ch");
      i += 2;
      continue;
    } else {
      wordArr.push(s[i]);
      i++;
      continue;
    }
  }
  return wordArr;
}
