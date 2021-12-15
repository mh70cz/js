let secondsCountDown = 16;
let now = new Date();
let countDownTo = new Date();
countDownTo.setSeconds(now.getSeconds() + secondsCountDown);
let countDownTo_ms = countDownTo.getTime();
let delay = 1000;

console.log(now, countDownTo, now.getTime(), countDownTo_ms);



let cnt = 0;
(function foo() {
  cnt++;
  if (cnt > 20) {
    return;
  } // break condition before the rest of the function is executed

  let now_ms = new Date().getTime();
  let remains = countDownTo_ms - now_ms;

  let seconds = Math.floor((remains % (1000 * 60)) / 1000);
  let minutes = Math.floor((remains % (1000 * 60 * 60)) / (1000 * 60));
  seconds = String(seconds).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");

  if (remains < 0) {
    return;
  } else {
    console.log(remains, minutes, seconds);
  }

  setTimeout(foo, delay);
})(); // IEFE - run once immediatelly, than after delay
// https://stackoverflow.com/questions/6685396/execute-the-setinterval-function-without-delay-the-first-time
