function clickRandomAvailable() {
  let lbLowerArr = null;

  let LbUpperAvailableArr = getLbUpperAvailableArr();
  let LbLowerAvailableArr = getLbLowerAvailableArr();

  const randomUpper =
    LbUpperAvailableArr[Math.floor(Math.random() * LbUpperAvailableArr.length)];

  const randomLower =
    LbLowerAvailableArr[Math.floor(Math.random() * LbLowerAvailableArr.length)];

  if (LbUpperAvailableArr.length > 0) {
    randomUpper.click();
    randomLower.click();
  }
}

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

function selectUntilLeft(num) {
  console.time("selectUntilLeft");
  while (getLbLowerAvailableArr().length > num) {
    clickRandomAvailable();
  }
  console.timeEnd("selectUntilLeft");
}
