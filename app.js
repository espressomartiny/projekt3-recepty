/*
Co je za úkol v tomto projektu:

1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html.

2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
by se měl seznam receptů vyfiltrovat podle hledaného slova.

3) Doplň filtrovanání receptů podle kategorie.

4) Doplň řazení receptů podle hodnocení.

5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
recept-hodnoceni, recept-nazev, recept-popis.

6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.
*/

//1)

vygenerujSeznamReceptu(recepty);

function vygenerujSeznamReceptu(poleReceptu) {
  poleReceptu.forEach((recept, index) => {
    let receptDiv = document.createElement("div");
    receptDiv.className = "recept";
    let obrazekReceptu = document.createElement("div");
    obrazekReceptu.className = "recept-obrazek";
    let obrazek = document.createElement("img");
    obrazek.src = recept.img;
    obrazek.alt = "obrázek pokrmu";
    let nazevReceptu = document.createElement("div");
    nazevReceptu.className = "recept-info";
    nazev = document.createElement("h3");
    nazev.innerText = recept.nadpis;
    document.getElementById("recepty").appendChild(receptDiv);
    receptDiv.appendChild(obrazekReceptu);
    receptDiv.appendChild(nazevReceptu);
    obrazekReceptu.appendChild(obrazek);
    nazevReceptu.appendChild(nazev);

    receptDiv.addEventListener("click", () => zobrazDetail(index));

    if (
      !(localStorage.rozvareno === null && localStorage.rozvareno === undefined)
    ) {
      let dovar = localStorage.getItem("rozvareno");
      zobrazDetail(dovar);
    }
  });
}

//2)

function hledej() {
  let vstup = document.getElementById("hledat").value;
  let nalezeneRecepty = recepty.filter((value) => {
    return value.nadpis.toLowerCase().includes(vstup.toLowerCase());
  });
  console.log(nalezeneRecepty);
  document.getElementById("recepty").innerText = "";
  vygenerujSeznamReceptu(nalezeneRecepty);
}

//3)

function filtruj() {
  document.getElementById("recepty").innerText = "";
  let chod = document.getElementById("kategorie");
  if (chod.value === "Snídaně") {
    vygenerujSeznamReceptu(recepty.filter(snidej));
  } else if (chod.value === "Hlavní jídlo") {
    vygenerujSeznamReceptu(recepty.filter(obedvej));
  } else if (chod.value === "Dezert") {
    vygenerujSeznamReceptu(recepty.filter(dezertuj));
  }
}

function snidej(jidlo) {
  return jidlo.kategorie === "Snídaně";
}
function obedvej(jidlo) {
  return jidlo.kategorie === "Hlavní jídlo";
}
function dezertuj(jidlo) {
  return jidlo.kategorie === "Dezert";
}

//4)

function serad() {
  document.getElementById("recepty").innerText = "";
  let rada = document.getElementById("razeni");
  if (rada.value === "2") {
    vygenerujSeznamReceptu(recepty.sort(odNejhorsich));
  } else if (rada.value === "1") {
    vygenerujSeznamReceptu(recepty.sort(odNejlepsich));
  }
}

function odNejhorsich(a, b) {
  if (a.hodnoceni > b.hodnoceni) {
    return 1;
  } else {
    return -1;
  }
}
function odNejlepsich(a, b) {
  if (a.hodnoceni < b.hodnoceni) {
    return 1;
  } else {
    return -1;
  }
}

//5)
function zobrazDetail(index) {
  document.querySelector("#recept-foto").src = recepty[index].img;
  document.querySelector("#recept-kategorie").textContent =
    recepty[index].kategorie;
  document.querySelector("#recept-hodnoceni").textContent =
    recepty[index].hodnoceni;
  document.querySelector("#recept-nazev").textContent = recepty[index].nadpis;
  document.querySelector("#recept-popis").textContent = recepty[index].popis;
  localStorage.clear();
  localStorage.setItem("rozvareno", index);
}

//6)
