let words = shuffle(tasks);

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
// prettier-ignore
let extraLetters = ["a", "b", "d",  "e", "f", "g", "h", "i", "j", "l", "m", "n", "q", "r", "t"];

document.getElementById("btnHlp").addEventListener("click", btnToggle);
let unlock = unlockCreate();
unlock(false);
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
    let word = strArrCH(wordStr);
    let nExtraLetters = get_nExtraLetters(word);

    // extra pismena z arr extraLetters, ktera nejsou obsazena v arr word
    // delka arr extraLetters musi byt dostatecne velka - viz get_nExtraLetters()
    let diffExtraLetters = extraLetters.filter((x) => !word.includes(x));
    let wordRnd = shuffle(
      word.concat(shuffle(diffExtraLetters).slice(0, nExtraLetters))
    );

    console.log(word, wordRnd);
    drawLetterBlocks(word, wordRnd);

    if (assertLetterBlocksClass() === false) {
      resDiv.innerHTML = " !!! assertion error !!!";
      throw " !!! assertion error !!!";
    }
    unlock(true);
  } else {
    resDiv.innerHTML = " ****   KONEC   ***** ";
  }
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
function get_nExtraLetters(word) {
  let wl = word.length;
  if (wl > 10) {
    return 0;
  } else if (wl > 8) {
    return 1;
  } else if (wl > 6) {
    return 2;
  } else if (wl > 5) {
    return 3;
  } else if (wl > 4) {
    return 4;
  } else {
    return 5;
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

function btnToggle(e) {
  if (e.target) {
    let btn = e.target;
    if (btn.firstChild.nodeValue == "NÁPOVĚDA") {
      btn.innerHTML = "SKRYJ NÁPOVĚDU";
      document.getElementById("hlp").classList.remove("hide");
    } else {
      btn.innerHTML = "NÁPOVĚDA";
      document.getElementById("hlp").classList.add("hide");
    }
  }
}

function lettersMatched() {
  resDiv.innerHTML = "matched";

  cntLettersOk++;
  cntPoints++;

  let wDivs = wRow.childNodes;
  wDivs.forEach((el) => {
    if (el.classList.contains("selected")) {
      el.classList.remove("selected");
      el.classList.add("matched", "justmatched");
      el.innerHTML = selectedLetterWrk;
    }
  });

  let lcDivs = lcRow.childNodes;
  lcDivs.forEach((el) => {
    if (el.classList.contains("selected")) {
      el.classList.remove("selected");
      el.classList.add("used", "justmatched");
    }
  });

  setTimeout(() => {
    wDivs.forEach((el) => {
      if (el.classList.contains("justmatched")) {
        el.classList.remove("justmatched");
      }
    });

    lcDivs.forEach((el) => {
      if (el.classList.contains("justmatched")) {
        el.classList.remove("justmatched");
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

      {
        let letterBlock = document.createElement("DIV");
        letterBlock.classList.add("letterBlock", "taskdone");
        letterBlock.innerHTML = "&check;";
        wRow.appendChild(letterBlock);
      }

      setTimeout(() => {
        generateTask();
      }, 1000);
    } else {
      unlock(true);
    }
  }, 500);
}

function lettersNotMatched() {
  resDiv.innerHTML = "not matched";

  cntLettersKo++;
  cntPoints -= 2;

  let wDivs = wRow.childNodes;
  wDivs.forEach((el) => {
    if (el.classList.contains("selected")) {
      el.classList.remove("selected");
      el.classList.add("available", "notmatched");
    }
  });

  let lcDivs = lcRow.childNodes;
  lcDivs.forEach((el) => {
    if (el.classList.contains("selected")) {
      el.classList.remove("selected");
      el.classList.add("available", "notmatched");
    }
  });

  setTimeout(() => {
    wDivs.forEach((el) => {
      if (el.classList.contains("notmatched")) {
        el.classList.remove("notmatched");
      }
    });

    lcDivs.forEach((el) => {
      if (el.classList.contains("notmatched")) {
        el.classList.remove("notmatched");
      }
    });

    unlock(true);
  }, 500);
}

function matchLetterBoxes() {
  if (assertLetterBlocksClass() === false) {
    resDiv.innerHTML = " !!! assertion error !!!";
    throw " !!! assertion error !!!";
  }

  let selectedLowRowDiv = document
    .getElementById("lcr")
    .getElementsByClassName("selected")[0];

  if (typeof selectedLowRowDiv === "undefined") {
    //console.log"selectedLowRowDiv is undefined");
    selectedLetterLow = null;
  } else {
    selectedLetterLow = selectedLowRowDiv.getAttribute("l");
  }
  //console.logselectedLetterLow);

  let selectedWrkRowDiv = document
    .getElementById("wr")
    .getElementsByClassName("selected")[0];

  if (typeof selectedWrkRowDiv === "undefined") {
    //console.log"selectedWrkRowDiv is undefined");
    selectedLetterWrk = null;
  } else {
    selectedLetterWrk = selectedWrkRowDiv.getAttribute("l");
  }
  //console.logselectedLetterWrk);

  if (selectedLetterWrk === null || selectedLetterLow === null) {
    resDiv.innerHTML = "pair not selected";
    unlock(true);
  } else if (selectedLetterWrk === selectedLetterLow) {
    lettersMatched();
  } else {
    lettersNotMatched();
  }
  updateCounters();
}

function selectLetterBlockWrk(e) {
  if (e.target && unlock()) {
    unlock(false);
    resDiv.innerHTML = "";
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
      matchLetterBoxes();
    } else {
      unlock(true);
    }
  }
}

function selectLetterBlockLow(e) {
  if (e.target && unlock()) {
    unlock(false);
    resDiv.innerHTML = "";
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
      matchLetterBoxes();
    } else {
      unlock(true);
    }
  }
}

function drawLetterBlocks(word, wordRnd) {
  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    if (letter == " ") {
      {
        let letterBlock = document.createElement("DIV");
        letterBlock.classList.add("letterBlock", "space");
        ucRow.appendChild(letterBlock);
      }
      {
        let letterBlock = document.createElement("DIV");
        letterBlock.classList.add("letterBlock", "space", "matched");
        letterBlock.innerHTML = "&nbsp;";
        wRow.appendChild(letterBlock);
      }
    } else {
      {
        let letterBlock = document.createElement("DIV");
        letterBlock.className = "letterBlock";
        if (cntWords % 2 == 0) {
          letterBlock.innerHTML = letter.toUpperCase();
        } else {
          letterBlock.innerHTML = letter;
        }
        ucRow.appendChild(letterBlock);
      }

      // wrk row
      {
        let letterBlock = document.createElement("DIV");
        letterBlock.setAttribute("l", letter);
        letterBlock.classList.add("letterBlock", "available");
        letterBlock.innerHTML = "&nbsp;";
        letterBlock.addEventListener("click", selectLetterBlockWrk);
        wRow.appendChild(letterBlock);
      }
    }

    //console.logletter);
  }

  for (let i = 0; i < wordRnd.length; i++) {
    const letter = wordRnd[i];

    if (letter != " ") {
      let letterBlock = document.createElement("DIV");
      letterBlock.setAttribute("l", letter);
      letterBlock.classList.add("letterBlock", "available");
      if (cntWords % 2 == 0) {
        letterBlock.innerHTML = letter;
      } else {
        letterBlock.innerHTML = letter.toUpperCase();
      }

      letterBlock.addEventListener("click", selectLetterBlockLow);
      lcRow.appendChild(letterBlock);
    }
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

function assertLetterBlocksClass() {
  // letter box has one and only one class from a set

  //class space jen pro format
  const classSet_w = ["available", "selected", "matched"];
  const classSet_lc = ["available", "selected", "used"];

  const oneAndOnlyOneArr_w = [...wRow.children].map(
    (el) => [...el.classList].filter((x) => classSet_w.includes(x)).length === 1
  );

  const oneAndOnlyOneArr_lc = [...lcRow.children].map(
    (el) =>
      [...el.classList].filter((x) => classSet_lc.includes(x)).length === 1
  );

  if (
    oneAndOnlyOneArr_w.every((x) => x === true) &&
    oneAndOnlyOneArr_lc.every((x) => x === true)
  ) {
    return true;
  } else {
    //console.log"oneAndOnlyOneArr_w: " + oneAndOnlyOneArr_w);
    //console.log"oneAndOnlyOneArr_lc: " + oneAndOnlyOneArr_lc);
    return false;
  }
}

function unlockCreate() {
  let unlocked = null;
  function inner(unlockedNew = null) {
    if (unlockedNew === null) {
      return unlocked;
    }
    if (unlockedNew === false) {
      // aktivity k zamknuti
      wRow.style.pointerEvents = "none";
      lcRow.style.pointerEvents = "none";

      unlocked = false;
      return unlocked;
    }
    if (unlockedNew === true) {
      // aktivity k odemknuti

      wRow.style.pointerEvents = "auto";
      lcRow.style.pointerEvents = "auto";
      unlocked = true;
      return unlocked;
    }
    throw "invalid unlock request";
  }
  return inner;
}
