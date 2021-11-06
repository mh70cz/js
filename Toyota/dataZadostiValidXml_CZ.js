// data zadosti do validniho xml CZ
let elem = document.getElementById("writtenXml");
let text_raw = elem.innerText;

let text_proc = text_raw.replace(/^\s*/gm, "");
text_proc = text_proc.replace(/^-</gm, "<");

//  e.g. <Tana.Dolakova@dolak.cz>
text_proc = text_proc.replace(/<.*@.*\.cz>/gm, "");

//ns2:getIsirWsCuzkDataResponse
text_proc = text_proc.replace(
  /ns2:getIsirWsCuzkDataResponse/gm,
  "getIsirWsCuzkDataResponse"
);

text_proc = text_proc.replace(/"="Rozsah/gm,'"Rozsah');

text_proc = text_proc.replace(/"0" km./gm,"0 km.");

let addXmlns = function (inStr) {
    nsToAdd = 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"';
  
    inStr = inStr.replace("\n", " ");
  
    let reRquElem = /<request RequestID.*>/gm;
    let arrRe = reRquElem.exec(inStr);
  
    // console.log(arr);
  
    let rquElem = arrRe[0];
  
    // console.log(rquElem);
  
    if (!rquElem.includes("xmlns:xsi")) {
      // console.log("neobsahuje xmlns:xsi");
      rquElem = rquElem.replace(">", nsToAdd + " >");
      let outStr = inStr.replace(reRquElem, rquElem);
      console.log("added xmlns:xsi");
      // console.log(outStr);
      return outStr;
    } else {
      // console.log("uz obsahuje xmlns:xsi - neni co resit");
      return inStr;
    }
  };

text_proc = addXmlns(text_proc);

copy(text_proc);
