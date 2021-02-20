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



function selectUntilLeft(num) {
  console.time("selectUntilLeft");
  while (getLbLowerAvailableArr().length > num) {
    clickRandomAvailable();
  }
  console.timeEnd("selectUntilLeft");
}
