var line = ""; // string view on the output of the calculator
var state = 0;
var ope;
var num1 = 0, num2 = 0;

/* load the functions while the page is loaded */
$(document).ready(function () {
  $("button").click(function () {
    line = $("input").val(); // get line

    if (state >= 0) {
      switch (state) {
        case 0:
          if ($.isNumeric($(this).text())) {
            state = 0;
            AddNum($(this).text());
          } else if (checkOpe($(this).text())) { // check if button is: + or − or × or ÷.
            state = 1;
            ope = $(this).text();
            num1 = line;
          } else if ($(this).text() == 'C') {
            state = 0;
            C(); // canc precedente numero
          } else if ($(this).text() == "AC") {
            AC(); // clear all (num e ope) and set state = 0
          } else {
            state = -1;
          }
          break;

        case 1:
          if ($.isNumeric($(this).text())) {
            state = 1;
            if (num2 == 0) {
              line = ""; // dopo la scrittura dell'operatore, la riga si svuota per il secondo numero
              num2 = $(this).text(); // uso num2 come flag
            }
            AddNum($(this).text());
            num2 = line;
          } else if (checkOpe($(this).text())) {
            state = 2;
            // esegui operazione tra i 2 valori in memeoria (precente e nuovo)
            num1 = calculate(ope, num1, num2);
            ope = $(this).text();
            line = num1;
            num2 = 0;
          } else if ($(this).text() == '=') {
            state = 3;
            line = calculate(ope, num1, num2);
          } else if ($(this).text() == 'C') {
            state = 1;
            C();
          } else if ($(this).text() == "AC") {
            AC();
          } else {
            state = -1;
          }
          break;

        case 2:
          if ($.isNumeric($(this).text())) {
            state = 2;
            if (num2 == 0) {
              line = ""; // dopo la scrittura dell'operatore, la riga si svuota per il secondo numero
              num2 = $(this).text(); // uso num2 come flag
            }
            AddNum($(this).text());
            num2 = line;
          } else if (checkOpe($(this).text())) {
            state = 1;
            // esegui operazione tra i 2 valori in memeoria (precente e nuovo)
            num1 = calculate(ope, num1, num2);
            ope = $(this).text();
            line = num1;
            num2 = 0;
          } else if ($(this).text() == '=') {
            state = 3;
            line = calculate(ope, num1, num2);
          } else if ($(this).text() == 'C') {
            state = 2;
            C();
          } else if ($(this).text() == "AC") {
            AC();
          } else {
            state = -1;
          }
          break;

        case 3:
          if (checkOpe($(this).text())) {
            state = 1;
            // esegui operazione tra i 2 valori in memeoria (precente e nuovo)
            num1 = calculate(ope, num1, num2);
            ope = $(this).text();
            line = num1;
            num2 = 0;
          } else if ($(this).text() == 'C') {
            state = 1;
            C();
          } else if ($(this).text() == "AC") {
            AC();
          } else {
            state = -1;
          }
          break;
      } // end-switch(state)

      $("input").attr("value", line); // Apporta modifiche visibili, sulla calcoaltrice post switch
    } else {
      alert("Fatal Error! Please,REBOOT the page");
    }
  })
});

/* Add number to the line */
function AddNum(input) {
  line += input;
}

/* Canc last inserted number */
function C() {
  line = line.substring(0, line.length - 1); // restituisce la stringa da 0 a n-1 (dell'array di char)
}

/* Clear All */
function AC() {
  state = 0;

  line = ""; // reset the line

  // reset other data
  num1 = 0;
  num2 = 0;
  ope = "";
}

/* Check sign */
function checkOpe(o) {
  if (o == '+' || o == '−' || o == "×" || o == "÷")
    return true;
  else
    return false;
}

function calculate(ope, num1, num2) {
  switch (ope) {
    case '+':
      // parseInt serve per imporre l'ope di somma e non concatenazione di stringhe
      return parseInt(num1) + parseInt(num2);
      break;

    case '−':
      return num1 - num2;
      break;

    case '×':
      return num1 * num2;
      break;

    case '÷':
      return num1 / num2;
      break;
  }
}