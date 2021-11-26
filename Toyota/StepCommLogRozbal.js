// Step communication log  rozbal elementy + konvertuj obsah do validniho xml + vysledek do clipboardu

let elemsToOpen = querySelectorHasText("a", "+");

// console.log(elemsToOpen);
elemsToOpen.forEach((element) => element.click());

console.log("opened");

setTimeout(replaceAndCopy(), 2000); // staci i min nez 2000

function querySelectorHasText(selector, text) {
  return Array.from(document.querySelectorAll(selector)).filter(
    (el) => el.textContent == text
  ); // verze has -> includes .filter(el => el.textContent.includes(text));
}

function replaceAndCopy() {
  let elem = document.getElementById("obsahStr");
  let text_raw = elem.innerText;

  let text_proc = text_raw.replace(/^\s*/gm, "");

  text_proc = text_proc.replace(/^-</gm, "<");

  text_proc = text_proc.replace(" Report in new window", "");

  text_proc = text_proc.replace(
    /<ResidualValueMatrix.*>/g,
    "<ResidualValueMatrix>"
  );

  text_proc = text_proc.replace(/TypeName="="Rozsah/gm, 'TypeName="Rozsah');

  copy(text_proc);

  console.log("copied");
}
