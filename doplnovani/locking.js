function unlockCreate() {
    let unlocked = null;
    function inner(unlockedNew = null) {

     let upperSection = document.getElementById("upper-section");
     let lowerSection = document.getElementById("lower-section");
     let btnHint = document.getElementById("btn-hint");

      if (unlockedNew === null) {
        return unlocked;
      }
      if (unlockedNew === false) {
        // aktivity k zamknuti
        upperSection.style.pointerEvents = "none";
        lowerSection.style.pointerEvents = "none";
        btnHint.style.pointerEvents = "none";
  
        unlocked = false;
        return unlocked;
      }
      if (unlockedNew === true) {
        // aktivity k odemknuti
  
        upperSection.style.pointerEvents = "auto";
        lowerSection.style.pointerEvents = "auto";
        btnHint.style.pointerEvents = "auto";
        unlocked = true;
        return unlocked;
      }
      throw "invalid unlock request";
    }
    return inner;
  }