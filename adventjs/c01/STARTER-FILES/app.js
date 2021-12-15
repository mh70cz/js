
let secondsCountDown = 16;
let now = new Date();
let countDownTo = new Date();
countDownTo.setSeconds(now.getSeconds() + secondsCountDown);
let countDownTo_ms = countDownTo.getTime();
let countDownInterval;
let delay = 1000;


console.log(now, countDownTo, now.getTime(), countDownTo_ms);


function countDown(){
    let now_ms = new Date().getTime();
    let remains = countDownTo_ms - now_ms;


    let seconds = Math.floor(remains /  1000);
    let minutes = Math.floor((remains % (1000 * 60 * 60)) / (1000 * 60 ));    
    seconds = String(seconds).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    
    if (remains < 0){
        clearInterval(countDownInterval);
    } else {
        console.log(remains, minutes, seconds);        
    }
}

countDown() // run immeditely
countDownInterval = setInterval (countDown, delay);

// setInterval behaves differently in nodejs and browser
// https://stackoverflow.com/questions/47550561/difference-between-setinterval-function-in-node-js-and-browser