let gearE = document.getElementsByClassName("settings")[0];
let minutesE = document.querySelector(".minutes > input");
let secondsE = document.querySelector(".seconds > input");
let startE = document.querySelector(".start");
minutesE.re = /^[0-6][0-9]/;
secondsE.re = /^[0-5][0-9]/;
let countDownIntv;
let state = "init";

function toggleState() {
  if (state == "stopped" || state == "init") {
    setStateRunning();
  } else if (state == "running") {
    setStateStopped();
  }
}

function setStateRunning() {
  gearE.disabled = true;
  minutesE.disabled = true;
  secondsE.disabled = true;
  countDown();
  startE.textContent = "PAUSE";
  state = "running";
  console.log(state);
}

function setStateStopped() {
  clearInterval(countDownIntv);
  gearE.disabled = false;
  startE.textContent = "START";
  state = "stopped";
  console.log(state);
}

function setStateDone() {
  gearE.disabled = false;
  startE.textContent = "START";
  state = "init";
  console.log(state);
}

function getSecondsCountDown() {
  minutesE = parseInt(minutesE);
  secondsE = parseInt(secondsE);
  secondsCountDown = minutesE * 60 + secondsE;
  return secondsCountDown;
}

function validate(e) {
  //console.log(e.target);
  let val = e.target.value;
  console.log(val);
  if (!e.target.re.test(val)) {
    if (val.length > 2) {
      val = val.slice(0, 2);
    } else if (val.length == 1) {
      val = "0" + val;
    }

    if (/^\D\d/.test(val)) {
      val = "0" + val.slice(1, 2);
    } else if (/^\d\D/.test(val)) {
      val = "0" + val.slice(0, 1);
    }

    if (!e.target.re.test(val)) {
      e.target.value = "00";
    } else {
      e.target.value = val;
    }
  }
}

function stripInput(e) {
  let val = e.target.value;
  if (val.length > 2) {
    val = val.slice(val.length - 2, val.length);
    console.log(val);
    e.target.value = val;
  }
}

function countDown() {
  let secondsCountDown =
    parseInt(minutesE.value) * 60 + parseInt(secondsE.value);
  let now = new Date();
  let countDownTo = new Date();
  countDownTo.setSeconds(now.getSeconds() + secondsCountDown);
  let countDownTo_ms = countDownTo.getTime();

  console.log(now, countDownTo, now.getTime(), countDownTo_ms);

  function innerCountDown() {
    let now_ms = new Date().getTime();
    let remains = countDownTo_ms - now_ms;

    let seconds = Math.floor((remains % (1000 * 60)) / 1000);
    let minutes = Math.floor((remains % (1000 * 60 * 60)) / (1000 * 60));
    seconds = String(seconds).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");

    if (remains < 0) {
      clearInterval(countDownIntv);
      setStateDone();
    } else {
      console.log(remains, minutes, seconds);
      secondsE.value = seconds;
      minutesE.value = minutes;
    }
  }
  
  //innerCountDown(); // run immediately
  setTimeout(innerCountDown, 1); // run almost immediately, so be sure one second lower is dispalyed
  
  countDownIntv = setInterval(innerCountDown, 1000);
}

startE.addEventListener("click", toggleState);
minutesE.addEventListener("focusout", validate);
secondsE.addEventListener("focusout", validate);

gearE.addEventListener("click", (e) => {
  minutesE.disabled = false;
  secondsE.disabled = false;
});



// console.log(state)
