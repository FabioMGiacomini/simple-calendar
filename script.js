let d = new Date();
let giorno = d.getDate(); // data di oggi da 1 a 31
let mese = d.getMonth(); // mese corrente da 0 a 11
let anno = d.getFullYear(); // anno corrente
let giornoSettimana = d.getDay(); // giorno della settimana in numeri, 0 è domenica

// In JavaScript, the first day of the week (day 0) is Sunday.
// In JavaScript, January is month number 0, February is number 1, ...
// Finally, December is month number 11.

const Mese = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];

const Settimana = [
  "Domenica",
  "Lunedì",
  "Martedì",
  "Mercoledì",
  "Giovedì",
  "Venerdì",
  "Sabato",
];

let annoSelezionato = document.getElementById("anno");
let meseSelezionato = document.getElementById("mese");
let annoPrima = document.querySelector("a.annoprima");
let annoDurante = document.querySelector("span.annodurante");
let annoDopo = document.querySelector("a.annodopo");
let mesePrima = document.querySelector("a.meseprima");
let meseDurante = document.querySelector(".mesecorrente");
let meseDopo = document.querySelector("a.mesedopo");
let tableGiorni = document.querySelector("table.giorni");

annoDurante.innerHTML = "&nbsp;" + anno + "&nbsp;";
meseDurante.innerHTML = "&nbsp;" + Mese[mese] + "&nbsp;";
/*
 ** il mese corrente è sempre inferiore di 1
 ** perché il mese di gennaio è uguale a zero in js e dicembre è 11
 ** per avere il mese giusto devo quindi sommare 1 a Mese[index]
 */

if(annoPrima){
    annoPrima.addEventListener("click", function (ev) {
  /* al clic su < diminuisco anno di uno
   ** e lo reinizializzo col nuovo contenuto (annoDurante.textContent)
   ** altrimenti funziona una volta sola poi dà NaN
   **/
  ev.preventDefault();
  annoDurante.innerHTML = "&nbsp;" + (anno - 1) + "&nbsp;";
  anno = new Date(annoDurante.textContent).getFullYear();
  giorniTabella()
    });
}

if(annoDopo) {annoDopo.addEventListener("click", function (ev) {
  ev.preventDefault();
  /* al clic su > aumento anno di uno e lo reinizializzo col nuovo contenuto
   ** e lo reinizializzo col nuovo contenuto (annoDurante.textContent)
   ** altrimenti funziona una volta sola poi dà NaN
   **/
  annoDurante.innerHTML = "&nbsp;" + (anno + 1) + "&nbsp;";
  anno = new Date(annoDurante.textContent).getFullYear();
  giorniTabella()
});
}

mesePrima.addEventListener("click", function (ev) {
  ev.preventDefault();
  /**
   * se mese è gennaio che ha indice 0 (mese === 0) visualizzo gennaio
   * e reinizializzo mese con 12
   * al clic dopo la if viene ignorate (mese è 12)
   * visualizzo il mese di dicembre sottraendo 1 e decremento in loop
   * */
  if (mese === 0) {
    meseDurante.innerHTML = "&nbsp;" + Mese[mese] + "&nbsp;";
    mese = 12;
    // a gennaio aggiorno l'anno
    annoDurante.innerHTML = "&nbsp;" + (anno - 1) + "&nbsp;";
    anno = new Date(annoDurante.textContent).getFullYear();
  }
  /**
   * per andare indietro massimo di due mesi devo fare un check per vedere
   * qual è il mese corrente quindi lo creo con getmonth() e gli tolgo uno
   * poi lo confronto col mese visualizzato, se sono identici
   * fermo la funzione
   */
  let mpNY = new Date()
  let mpNM = mpNY.getMonth()-1
  if(mese === mpNM){
    mese += 1 
  }

  meseDurante.innerHTML = "&nbsp;" + Mese[mese - 1] + "&nbsp;";
  mese -= 1;
  giorniTabella();
});

meseDopo.addEventListener("click", function (ev) {
  ev.preventDefault();
  /**
   * se mese è dicembre (indice 11) visualizzo il mese di dicembre e metto mese a -1.
   * al clic successivo la if viene ignorata perché mese è -1 visualizzo quindi gennaio
   * ovvero Mese[-1+1], quindi Mese[0], quindi gennaio, poi incremento di 1
   */
  if (mese === 11) {
    meseDurante.innerHTML = "&nbsp;" + Mese[mese] + "&nbsp;";     
    mese = -1;  
    // se il mese è dicembre al prossimo clic aggiorno l'anno
    annoDurante.innerHTML = "&nbsp;" + (anno + 1) + "&nbsp;";
    anno = new Date(annoDurante.textContent, 0).getFullYear();
  }

   /**
   * per andare avanti massimo di due mesi devo fare un check per vedere
   * qual è il mese corrente quindi lo creo con getmonth() e gli sommo uno
   * poi lo confronto col mese visualizzato, se sono identici
   * fermo la funzione togliendo uno al mese
   */
   let mpNY = new Date()
   let mpNM = mpNY.getMonth()+1
   if(mese === mpNM){
     mese -= 1 
   }

  meseDurante.innerHTML = "&nbsp;" + Mese[mese + 1] + "&nbsp;";
  mese += 1;
  giorniTabella();
});

/** 
 * let giorniMese = new Date(2024, 10, 0).getDate() 
 * con lo zero 10 è ottobre e il numero inserito in giorniMese 
 * è 31;
 * se invece inserisco un numero nel giorno al posto dello zero, 
 * tipo new Date(2024, 10, 4).getDate() il risultato inserito in giorniMese è 4 
 * ovvero il giorno messo da me
*/

/**
 * se invece uso getDay in questo modo new Date(2024, 4, 3).getDay()
 * il mese inserito parte da zero quindi nell'esemnpio 4 non è aprile ma maggio
 * l'output è 5 ovvero mi dice che il 3 MAGGIO era venerdì
 * getDay() infatti ritorna il giorno della settimana partendo da 0 che è domenica
 */

// inserisco i giorni in tabella
function giorniTabella() {
  let giorniMese = new Date(anno, mese + 1, 0).getDate(); 
  // quanti giorni ci sono nel mese in oggetto
  
  let y = new Date(anno, mese, 1).getDay(); 
  // output [0, 1, 2, 3, 4, 5, 6] quale giorno della settimana - 0 domenica

  let corpoTabella = tableGiorni.querySelectorAll("tbody td");
  // inserisco in un array i td della tabella esclusi quelli in thead

  // azzero i giorni. quando cambio mese con le frecce
  // rimarrebbero i giorni dei mesi prima o dopo
  corpoTabella.forEach((element) => {
    element.innerHTML = "";
  });

  for (let i = 0; i < giorniMese ; i++) {
    /**
     * devo inserire i giorni contenuti nel mese (giorniMese, ad esempio da 1 a 31)
     * 
     * la posizione per far partire l'inserimento viene decisa da y
     * che corrisponde al giorno della settimana (0 è domenica)
     * devo sommare quindi i che è zero a y e sottrarre 1 perché la tabella
     * parte da zero. il valore che inserisco è sempre i+1
     * altrimenti inserisce anche lo zero
     * se y = 0 ovvero il giorno è domenica alcuni mesi non vengono visualizzati perché
     * [i+y-1] quando i = 0 diventa -1 e si genera un errore
     * per ovviare nel caso di y=0 trasformo y in 7
     */
    if (y===0){
        y=7
    }
    corpoTabella[i+y-1].innerHTML = i+1;
  } 
}
giorniTabella();
