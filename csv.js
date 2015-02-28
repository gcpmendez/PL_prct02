// See http://en.wikipedia.org/wiki/Comma-separated_values
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

$(document).ready(function() {
   $("button").click(function() {
     calculate();
   });
 });// utiliza un objeto de jquery para gestionar el click y la llamada a la funcion del javascript

function calculate() {
  var result;
  var original = document.getElementById("original");
  var temp = original.value;
  var regexp = /\s*"((?:[^"\\]|\\.)*)"\s*,?|\s*([^,]+),?|\s*,/g;   // Expresion regular que analizar� nuestro string de entrada al programa
  var lines = temp.split(/\n+\s*/);
  var commonLength = NaN; // la longitud de la linea ( longitud comun ) 
  var r = [];
  
  if (typeof(Storage !== "undefined"))
    if (window.localStorage) localStorage.original  = temp;
  
  for(var t in lines) {
    var temp = lines[t];
    var m = temp.match(regexp);
    var result = [];
    var error = false;
    
    if (m) {
      if (commonLength && (commonLength != m.length)) {
        //alert('ERROR! row <'+temp+'> has '+m.length+' items!');
        error = true;
      }
      else {
        commonLength = m.length;
        error = false;
      }
      for(var i in m) {
        var removecomma = m[i].replace(/,\s*$/,'');
        var remove1stquote = removecomma.replace(/^\s*"/,'');
        var removelastquote = remove1stquote.replace(/"\s*$/,'');
        var removeescapedquotes = removelastquote.replace(/\\"/,'"');   // Nos deja el string sin impurezas
        result.push(removeescapedquotes);
      }
      var tr = error? '<tr class="error">' : '<tr>';
      r.push(tr+_.template(tm.innerHTML, {items : result})+"</tr>");
    }
    else {
      alert("ERROR! \nAlguna de las lineas del string introducido no es valido.");
      error = true;
    }
  }
  r.unshift('<p>\n<table class="center" id="result">');
  r.push('</table>');
  //alert(r.join('\n')); // debug
  resultado.innerHTML = r.join('\n');
  
  if(error == true)
    mal.innerHTML = "";
}

if (typeof(Storage !== "undefined")){
  window.onload = function() {
    // If the browser supports localStorage and we have some stored data
    if (window.localStorage && localStorage.original)
      document.getElementById("original").value = localStorage.original;
  }; // Introducimos el valor que habiamos puesto antiguamente en el elemento de entrada
};