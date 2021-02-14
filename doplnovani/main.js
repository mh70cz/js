let cntPoints = 0;
let cntHints = 0;
let cntLettersOk = 0;
let cntLettersKo = 0;
let cntTasks = 0;

phrases = {
  north: "sever",
  east: "východ",
  south: "jih",
  west: "západ",
};

drawLetterBoxes(phrases);
updateCounters();

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
      letterBlock.classList.add("letter-block", "space");
    } else {
      letterBlock.classList.add("letter-block", "available");
      letterBlock.setAttribute("l", letter);
      letterBlock.addEventListener("click", selectUpperLetterBlock);
    }
    letterBlock.innerHTML = "&nbsp;";
    destDiv.appendChild(letterBlock);
  }
}

function drawLowerLetterBoxes(phraseArr, fontCase = "lower") {
  let destDiv = document.getElementById("lower-section");

  for (const letter of phraseArr) {
    let letterBlock = document.createElement("DIV");

    if (letter !== " ") {
      letterBlock.classList.add("letter-block", "available");
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

    if (!e.target.classList.contains("matched")) {
      let upperRowDiv = document.getElementById("upper-section");
      let letterBlocksDivs = upperRowDiv.childNodes;
      for (const letterBlocksDiv of letterBlocksDivs) {
        let letterBlocks = letterBlocksDiv.childNodes;
        letterBlocks.forEach((el) => {
          if (el.classList.contains("selected")) {
            el.classList.remove("selected");
            el.classList.add("available");
          }
        });
      }

      if (e.target.classList.contains("available")) {
        e.target.classList.remove("available");
        e.target.classList.add("selected");
      }
      //some activity with the letter box
      matchLetterBoxes();
    }
  } else {
  }
}

function selectLowerLetterBlock(e) {
  if (e.target) {
    console.log(e.target);

    if (!e.target.classList.contains("used")) {
      let letterBlocksDiv = e.target.parentElement;
      let letterBlocks = letterBlocksDiv.childNodes;
      letterBlocks.forEach((el) => {
        if (el.classList.contains("selected")) {
          el.classList.remove("selected");
          el.classList.add("available");
        }
      });
      if (e.target.classList.contains("available")) {
        e.target.classList.remove("available");
        e.target.classList.add("selected");
      }
      //some activity with the letter box
      matchLetterBoxes();
    }
  } else {
  }
}

function matchLetterBoxes() {
  let selectedLBUpperSection = (() => {
    let upperSectionDiv = document.getElementById("upper-section");
    let letterBlocksDivs = upperSectionDiv.childNodes;
    for (const letterBlocksDiv of letterBlocksDivs) {
      let letterBlocks = letterBlocksDiv.childNodes;
      for (const el of letterBlocks) {
        if (el.classList.contains("selected")) {
          return el;
        }
      }
    }
    return null;
  })();

  let selectedLBLowerSection = (() => {
    let lowerSectionDiv = document.getElementById("lower-section");
    let letterBlocks = lowerSectionDiv.childNodes;
    for (const el of letterBlocks) {
      if (el.classList.contains("selected")) {
        return el;
      }
    }
    return null;
  })();

  let resultBox = document.getElementById("res");
  if (selectedLBUpperSection && selectedLBLowerSection) {
    // match results
    if (
      selectedLBUpperSection.getAttribute("l") ===
      selectedLBLowerSection.getAttribute("l")
    ) {
      matched(selectedLBUpperSection, selectedLBLowerSection, resultBox);
    } else {
      notMatched(selectedLBUpperSection, selectedLBLowerSection, resultBox);
    }
  } else {
    resultBox.innerText = "Not selected";
  }
}

function matched(selectedLBUpperSection, selectedLBLowerSection, resultBox) {
  resultBox.innerText = "Matched";

  selectedLBUpperSection.classList.remove("selected");
  selectedLBUpperSection.classList.add("matched");
  selectedLBLowerSection.classList.remove("selected");
  selectedLBLowerSection.classList.add("used");

  selectedLBUpperSection.innerText = selectedLBUpperSection.getAttribute("l");

  cntPoints += 1;
  cntLettersOk += 1;
  updateCounters();
}

function notMatched(selectedLBUpperSection, selectedLBLowerSection, resultBox) {
  resultBox.innerText = "NOT Matched";

  selectedLBUpperSection.classList.remove("selected");
  selectedLBUpperSection.classList.add("available");
  selectedLBLowerSection.classList.remove("selected");
  selectedLBLowerSection.classList.add("available");

  cntPoints -= 4;
  cntLettersKo += 1;
  updateCounters();
}

function updateCounters() {
  document.getElementById("cnt-tasks").innerText = cntTasks;
  document.getElementById("cnt-letters-ok").innerText = cntLettersOk;
  document.getElementById("cnt-letters-ko").innerText = cntLettersKo;
  document.getElementById("cnt-hints").innerText = cntHints;
  document.getElementById("cnt-points").innerText = cntPoints;
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
