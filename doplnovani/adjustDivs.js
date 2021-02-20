
function positionAdjust(){
let northDiv = document.getElementById("north");
let westDiv = document.getElementById("west");
let eastDiv = document.getElementById("east");
let southDiv = document.getElementById("south");
let imgMain = document.getElementById("imgMain");
let divMain = document.getElementById("divMain");

let northWidth = northDiv.offsetWidth;
let westWidth = westDiv.offsetWidth;
let eastWidth = eastDiv.offsetWidth;
let southWidth = southDiv.offsetWidth;
let imgMainWidth = imgMain.offsetWidth;
let imgMainHeight = imgMain.offsetHeight;

let vOffSet = 70;
divMain.style.height = (vOffSet + 80 + imgMainHeight).toString() + "px";




let imgMainPos = (westWidth + 2).toString() + "px";
let northDivPos =
  Math.floor(westWidth + 2 + imgMainWidth / 2 - northWidth / 2).toString() +
  "px";
let eastDivPos = (westWidth + imgMainWidth + 4).toString() + "px";
let southDivPos =
  Math.floor(westWidth + 2 + imgMainWidth / 2 - southWidth / 2).toString() +
  "px";

imgMain.style.left = imgMainPos;
northDiv.style.left = northDivPos;
eastDiv.style.left = eastDivPos;
southDiv.style.left = southDivPos;

let imgMainVPos = vOffSet.toString() + "px";
let eastWestVPos = Math.floor(vOffSet - 25 + imgMainHeight / 2).toString() + "px";
let southVPos = (vOffSet + 10 + imgMainHeight).toString() + "px";
imgMain.style.top = imgMainVPos;
eastDiv.style.top = eastWestVPos;
westDiv.style.top = eastWestVPos;
southDiv.style.top = southVPos;
}