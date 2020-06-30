// obsah Step communication log do validniho xml
var elem = document.getElementById("obsahStr");
var text_raw = elem.innerText;
 
var text_proc =  text_raw.replace(/^\s*/gm, "");
var text_proc =  text_proc.replace(/^-</gm, "<");

var text_proc =  text_proc.replace(" Report in new window", "");
var text_proc =  text_proc.replace(/<ResidualValueMatrix.*>/g, "<ResidualValueMatrix>");

copy(text_proc);