// obsah Step communication log do validniho xml
let elem = document.getElementById("obsahStr");
let text_raw = elem.innerText;
 
let text_proc =  text_raw.replace(/^\s*/gm, "");
text_proc =  text_proc.replace(/^-</gm, "<");

text_proc =  text_proc.replace(" Report in new window", "");
text_proc =  text_proc.replace(/<ResidualValueMatrix.*>/g, "<ResidualValueMatrix>");

text_proc =  text_proc.replace(/TypeName="="Rozsah/gm, 'TypeName="Rozsah');

text_proc = text_proc.replace(/C & K, a.s./gm, 'C a K, a.s.');

text_proc = text_proc.replace(/ "[ZH]P_BASE" Insure/gm, ' ZP_BASE Insure');
//text_proc = text_proc.replace(/(?<=^<Filter.*) "[ZH]P_BASE" Insure/gm, ' ZP_BASE Insure'); //mene agresivni, ale pomale

copy(text_proc);