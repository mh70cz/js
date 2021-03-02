// data zadosti do validniho xml CZ
var elem = document.getElementById("writtenXml");
var text_raw = elem.innerText;

var text_proc = text_raw.replace(/^\s*/gm, "");
var text_proc = text_proc.replace(/^-</gm, "<");

//  e.g. <Tana.Dolakova@dolak.cz>
var text_proc = text_proc.replace(/<.*@*\.cz>/gm, "");

//ns2:getIsirWsCuzkDataResponse
var text_proc = text_proc.replace(
  /ns2:getIsirWsCuzkDataResponse/gm,
  "getIsirWsCuzkDataResponse"
);

copy(text_proc);
