const wordStr = "letadlo";
const word = wordStr; // ToDo: mezery a ch
const wordRnd = word; // ToDo: randomize order

let ucRow = document.getElementById("ucr");
let wRow = document.getElementById("wr");
let lcRow = document.getElementById("lcr");
let selectedLetterL = null;
let selectedLetterW = null;

drawLetterBoxes();

function selectLBL(e) {
  if (e.target) {
    let divs = lcRow.childNodes;
    divs.forEach((e) => {
      if (e.classList.contains("selected")) {
        e.classList.remove("selected");  
        e.classList.add("available");
      }
    });

    if (e.target.classList.contains("available")) {
      e.target.classList.remove("available");
      e.target.classList.add("selected");
    }
  }
}

function drawLetterBoxes() {
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
      letterBlock.className = "letterBlock";
      letterBlock.innerHTML = "&nbsp;";
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
    letterBlock.addEventListener("click", selectLBL);
    lcRow.appendChild(letterBlock);
    // let elem = lcRow.lastElementChild;
    // elem.addEventListener("click", selectLBL);
  }
}
