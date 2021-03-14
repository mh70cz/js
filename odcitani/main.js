const TOP_TOP = 0;
const MID_TOP = 125;
const BOT_TOP = 250;

let firstMainOperand = null;
let secondMainOperand = null;

let mb = document.getElementById("moving-box");

let cont = document.getElementsByClassName("container")[0];
let contLeft = cont.getBoundingClientRect().left + 5;
let contTop = cont.getBoundingClientRect().top + 5;

let topRow = document.getElementById("top-row");
let mi1Row = document.getElementById("mi1-row");
let mi2Row = document.getElementById("mi2-row");
let botRow = document.getElementById("bot-row");

const taskArr = genTaskArr();

setTask();

function setTask() {
  const rndIdx = Math.floor(Math.random() * taskArr.length);

  firstMainOperand = taskArr[rndIdx][0];
  secondMainOperand = taskArr[rndIdx][1];

  topRow.innerHTML = `
  <div class="operand">${firstMainOperand}</div>            
  <div class="operator">-</div>
  <div class="operand">${secondMainOperand}</div>
  <div class="operator">=</div>
  <div class="result hdn">&nbsp;</div>
  <div class="btn hdn">
    <button onclick="checkZeroInp()">✓</button>
  </div>`;

  mi1Row.innerHTML = "";
  mi2Row.innerHTML = "";
  botRow.innerHTML = "";

  setTimeout(() => {
    move_0();
    setTimeout(move_1, 2000);
  }, 2000);
}

function genTaskArr() {
  let taskArr = [];
  for (let outer_index = 11; outer_index < 19; outer_index++) {
    for (let inner_index = outer_index - 9; inner_index < 10; inner_index++) {
      //console.log(outer_index, inner_index);
      taskArr.push([outer_index, inner_index]);
    }
  }
  return taskArr;
}

function setMovingBox(top_pos, left_pos, txt = null) {
  //let mb = document.getElementById("moving-box");

  if (txt) {
    mb.innerHTML = txt;
  }
  mb.style.top = top_pos.toString() + "px";
  mb.style.left = left_pos.toString() + "px";
  mb.style.visibility = "visible";
}

function moveMovingBox(div, txt, vis = "visible", setValueDiv = true) {
  if (txt !== null) {
    mb.innerHTML = txt;
  }

  mb.style.visibility = vis;

  let top_pos = div.getBoundingClientRect().top - contTop;
  let left_pos = div.getBoundingClientRect().left - contLeft;

  if (vis === "hidden") {
    // zvyrazni cilovy div
    div.classList.add("mark");
    console.log(div);

    setTimeout(() => {
      div.classList.remove("mark");
    }, 1600);
  }

  mb.style.top = top_pos.toString() + "px";
  mb.style.left = left_pos.toString() + "px";

  setTimeout(() => {
    if (setValueDiv) {
      div.innerHTML = mb.innerHTML;
    }
    mb.style.visibility = "hidden";
  }, 2000);
}

function move_0() {
  console.log("move 0 MovingBox on top-row 1st operand");
  mi1Row.innerHTML = `
    <div class="operand">&nbsp;</div>
    <div class="operator">-</div>
    <div class="operand">&nbsp;</div>
    <div class="operator">=</div>
    <div class="inp hdn">
        <input type="text" id="first-inp" value="" style="width: 20px;">
    </div>
    <div class="btn hdn">
        <button onclick="checkFirstInp()">✓</button>
    </div>
  `;

  let topRow = document.getElementById("top-row");
  let topRow1operand = topRow.children[0];
  let txt = topRow1operand.innerHTML;

  moveMovingBox(topRow1operand, txt, (vis = "hidden"));
}

function move_1() {
  console.log("move 1 MovingBox on mi1-row 1st operand");

  let mi1Row1operand = mi1Row.children[0];

  moveMovingBox(mi1Row1operand, (txt = null), (vis = "visible"));

  mi1Row2operand = mi1Row.children[2];
  mi1Row2operand.innerHTML = Math.floor(firstMainOperand / 10) * 10;

  setTimeout(() => {
    let inpDiv = mi1Row.getElementsByClassName("inp")[0];
    inpDiv.classList.remove("hdn");
    inpDiv.children[0].focus();

    mi1Row.getElementsByClassName("btn")[0].classList.remove("hdn");
  }, 2000);
}

function move_2() {
  console.log("move 2 MovingBox on top-row 2nd operand");
  mi2Row.innerHTML = `
  <div class="operand">&nbsp;</div>
  <div class="operator">-</div>
  <div class="operand">&nbsp;</div>
  <div class="operator">=</div>
  <div class="inp hdn">
      <input type="text" id="second-inp" value="" style="width: 20px;">
  </div>
  <div class="btn hdn">
      <button onclick="checkSecondInp()">✓</button>
  </div>
  `;

  let topRow2operand = topRow.children[2];
  let txt = topRow2operand.innerHTML;

  moveMovingBox(topRow2operand, txt, (vis = "hidden"), (setValueDiv = false));
}

function move_3() {
  console.log("move 3 MovingBox on mi2-row 1st operand");

  let mi2Row1operand = mi2Row.children[0];

  moveMovingBox(mi2Row1operand, (txt = null), (vis = "visible"));
}

function move_4() {
  console.log("move 4 MovingBox on first result");
  let resDiv = mi1Row.getElementsByClassName("result")[0];

  let txt = resDiv.innerHTML;

  moveMovingBox(resDiv, txt, (vis = "hidden"), (setValueDiv = false));
}

function move_5() {
  console.log("move 5 MovingBox on mi2-row 2nd operand");

  let mi2Row1operand = mi2Row.children[2];

  moveMovingBox(mi2Row1operand, (txt = null), (vis = "visible"));
  setTimeout(() => {
    let inpDiv = mi2Row.getElementsByClassName("inp")[0];
    inpDiv.classList.remove("hdn");
    inpDiv.children[0].focus();

    mi2Row.getElementsByClassName("btn")[0].classList.remove("hdn");
  }, 2000);
}

function move_5a() {
  console.log("move 5a MovingBox on top-row 1st operand");
  botRow.innerHTML = `
  <div class="operand">&nbsp;</div>
  <div class="operator">-</div>
  <div class="operand">&nbsp;</div>
  <div class="operator">-</div>
  <div class="operand">&nbsp;</div>
  <div class="operator">=</div>
  <div class="inp hdn">
      <input type="text" id="third-inp" value="" style="width: 20px;">
  </div>
  <div class="btn hdn">
      <button onclick="checkThirdInp()">✓</button>
  </div>
  `;

  let topRow = document.getElementById("top-row");
  let topRow1operand = topRow.children[0];
  let txt = topRow1operand.innerHTML;

  moveMovingBox(topRow1operand, txt, (vis = "hidden"));
}

function move_5b() {
  console.log("move 5b MovingBox on bot-row 1st operand");

  let botRow1operand = botRow.children[0];

  moveMovingBox(botRow1operand, (txt = null), (vis = "visible"));
}

function move_6() {
  console.log("move 6 MovingBox on first result");

  let resDiv = mi1Row.getElementsByClassName("result")[0];

  let txt = resDiv.innerHTML;

  moveMovingBox(resDiv, txt, (vis = "hidden"), (setValueDiv = false));
}

function move_7() {
  console.log("move 7 MovingBox on bot-row 2nd operand");

  let botRow2operand = botRow.children[2];

  moveMovingBox(botRow2operand, (txt = null), (vis = "visible"));
}

function move_8() {
  console.log("move 8 MovingBox on second result");
  let resDiv = mi2Row.getElementsByClassName("result")[0];

  let txt = resDiv.innerHTML;

  moveMovingBox(resDiv, txt, (vis = "hidden"), (setValueDiv = false));
}

function move_9() {
  console.log("move 9 MovingBox on bot-row 3rd operand");

  let botRow3operand = botRow.children[4];

  moveMovingBox(botRow3operand, (txt = null), (vis = "visible"));
  setTimeout(() => {
    let inpDiv = botRow.getElementsByClassName("inp")[0];
    inpDiv.classList.remove("hdn");
    inpDiv.children[0].focus();
    botRow.getElementsByClassName("btn")[0].classList.remove("hdn");
  }, 2000);
}

function createZeroInp() {
  let zeroInp = topRow.getElementsByClassName("result")[0];
  zeroInp.classList.remove("hdn");
  zeroInp.innerHTML =
    '<input type="text" id="zero-inp" value="" style="width: 20px;" />';

  zeroInp.children[0].focus();
  let btnDiv = topRow.getElementsByClassName("btn")[0];
  btnDiv.classList.remove("hdn");
}

function checkFirstInp() {
  let firstInp = document.getElementById("first-inp");
  let val = parseInt(firstInp.value);
  let firstInpDiv = firstInp.parentElement;
  let btnDiv = mi1Row.getElementsByClassName("btn")[0];
  if (val === firstMainOperand - Math.floor(firstMainOperand / 10) * 10) {
    firstInpDiv.innerHTML = val;
    firstInpDiv.classList.remove("inp");
    firstInpDiv.classList.add("result");
    btnDiv.innerHTML = "✓";
    btnDiv.classList.add("check-success");
    move_2();
    setTimeout(() => {
      move_3();
      setTimeout(() => {
        move_4();
        setTimeout(move_5, 2000);
      }, 2000);
    }, 2000);
  } else {
    btnDiv.innerHTML = "X";
    btnDiv.classList.add("check-fail");
    setTimeout(() => {
      firstInp.value = "";
      btnDiv.classList.remove("check-fail");
      btnDiv.innerHTML = '<button onclick="checkFirstInp()">✓</button>';
      btnDiv.classList.add("btn");
    }, 1000);
  }
}

function checkSecondInp() {
  let secondInp = document.getElementById("second-inp");
  let val = parseInt(secondInp.value);
  let resFirst = parseInt(mi1Row.getElementsByClassName("result")[0].innerHTML);
  let secondInpDiv = secondInp.parentElement;
  let btnDiv = mi2Row.getElementsByClassName("btn")[0];
  if (val === secondMainOperand - resFirst) {
    secondInpDiv.innerHTML = val;
    secondInpDiv.classList.remove("inp");
    secondInpDiv.classList.add("result");
    btnDiv.innerHTML = "✓";
    btnDiv.classList.add("check-success");

    move_5a();
    setTimeout(() => {
      move_5b();
      setTimeout(() => {
        move_6();
        setTimeout(() => {
          move_7();
          setTimeout(() => {
            move_8();
            setTimeout(move_9, 2000);
          }, 2000);
        }, 2000);
      }, 2000);
    }, 2000);
  } else {
    btnDiv.innerHTML = "X";
    btnDiv.classList.add("check-fail");
    setTimeout(() => {
      secondInp.value = "";
      btnDiv.classList.remove("check-fail");
      btnDiv.innerHTML = '<button onclick="checkSecondInp()">✓</button>';
      btnDiv.classList.add("btn");
    }, 1000);
  }
}

function checkThirdInp() {
  let thirdInp = document.getElementById("third-inp");
  let val = parseInt(thirdInp.value);
  let thirdInpDiv = thirdInp.parentElement;
  let btnDiv = botRow.getElementsByClassName("btn")[0];

  if (val === firstMainOperand - secondMainOperand) {
    thirdInpDiv.innerHTML = val;
    thirdInpDiv.classList.remove("inp");
    thirdInpDiv.classList.add("result");
    btnDiv.innerHTML = "✓";
    btnDiv.classList.add("check-success");
    createZeroInp();
  } else {
    btnDiv.innerHTML = "X";
    btnDiv.classList.add("check-fail");
    setTimeout(() => {
      thirdInp.value = "";
      btnDiv.classList.remove("check-fail");
      btnDiv.innerHTML = '<button onclick="checkThirdInp()">✓</button>';
      btnDiv.classList.add("btn");
    }, 1000);
  }
}

function checkZeroInp() {
  let zeroInp = document.getElementById("zero-inp");
  let val = parseInt(zeroInp.value);
  let zeroInpDiv = zeroInp.parentElement;
  let btnDiv = topRow.getElementsByClassName("btn")[0];

  if (val === firstMainOperand - secondMainOperand) {
    zeroInpDiv.innerHTML = val;
    zeroInpDiv.classList.remove("inp");
    zeroInpDiv.classList.add("result");
    btnDiv.innerHTML = "✓";
    btnDiv.classList.add("check-success");
    setTimeout(setTask, 2000);
  } else {
    btnDiv.innerHTML = "X";
    btnDiv.classList.add("check-fail");
    setTimeout(() => {
      zeroInp.value = "";
      btnDiv.classList.remove("check-fail");
      btnDiv.innerHTML = '<button onclick="checkZeroInp()">✓</button>';
      btnDiv.classList.add("btn");
    }, 1000);
  }
}

/*     window.scrollY + document.querySelector('#elementId').getBoundingClientRect().top // Y
  
      window.scrollX + document.querySelector('#elementId').getBoundingClientRect().left // X 
*/
