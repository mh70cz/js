
function getLbUpperAvailableArr() {
    let lbUpperAvailableArr = [];
    let upperDivs = document.getElementById("upper-section").childNodes;
    for (const divs of upperDivs) {
      for (const div of divs.childNodes) {
        if (div.classList.contains("available")) {
          lbUpperAvailableArr.push(div);
        }
      }
    }
    return lbUpperAvailableArr;
  }
  
  function getLbLowerAvailableArr() {
    let lbLowerAvailableArr = [];
    let lowerLbDivs = document.getElementById("lower-section").childNodes;
    for (const div of lowerLbDivs) {
      if (div.classList.contains("available")) {
        lbLowerAvailableArr.push(div);
      }
    }
    return lbLowerAvailableArr;
  }

function getSelectedLBUpperSection() {
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
}

function getSelectedLBLowerSection() {
  let lowerSectionDiv = document.getElementById("lower-section");
  let letterBlocks = lowerSectionDiv.childNodes;
  for (const el of letterBlocks) {
    if (el.classList.contains("selected")) {
      return el;
    }
  }
  return null;
}

function findFirstLB(arr, letter) {
  console.log(arr, letter);

  for (const el of arr) {
    console.log(el);
    if (el.getAttribute("l") === letter) {
      return el;
    }
  }
  return null;
}

function hint() {
  function hintCnt() {
    cntHints += 1;
    cntPoints -= 2;
  }

  let selectedLBUpperSection = getSelectedLBUpperSection();
  let selectedLBLowerSection = getSelectedLBLowerSection();

  const LbUpperAvailableArr = getLbUpperAvailableArr();
  const LbLowerAvailableArr = getLbLowerAvailableArr();

  if (selectedLBUpperSection !== null) {
    const el = findFirstLB(
      LbLowerAvailableArr,
      selectedLBUpperSection.getAttribute("l")
    );
    if (el) {
      hintCnt();
      el.click();
    } else {
      console.error("error in hint firstUpper");
    }
  } else if (selectedLBLowerSection !== null) {
    const el = findFirstLB(
      LbUpperAvailableArr,
      selectedLBLowerSection.getAttribute("l")
    );
    if (el) {
      hintCnt();
      el.click();
    } else {
      console.error("error in hint firstLower");
    }
  } else {
    const randomLower =
      LbLowerAvailableArr[
        Math.floor(Math.random() * LbLowerAvailableArr.length)
      ];

    const firstUpper = findFirstLB(
      LbUpperAvailableArr,
      randomLower.getAttribute("l")
    );

    if (randomLower && firstUpper) {
      hintCnt();
      randomLower.click();
      firstUpper.click();
    } else {
      console.error("error in hint randomLower && firstUpper");
    }
  }
}
