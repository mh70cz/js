// obsah Step communication log do validniho xml
let elem = document.getElementById("obsahStr");
let text_raw = elem.innerText;
 
let text_proc =  text_raw.replace(/^\s*/gm, "");
text_proc =  text_proc.replace(/^-</gm, "<");

text_proc =  text_proc.replace(" Report in new window", "");
text_proc =  text_proc.replace(/<ResidualValueMatrix.*>/g, "<ResidualValueMatrix>");

text_proc =  text_proc.replace(/TypeName="="Rozsah/gm, 'TypeName="Rozsah');

copy(text_proc);