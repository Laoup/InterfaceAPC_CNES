/*
** JavaScript File
** Name : scriptHealth.js
** Start by: Alban Meurice
** 27/01/2017
*/


var xhrInit = new XMLHttpRequest();

xhrInit.open("GET", "../ressources/configFile.xml")
xhrInit.send();

xhrInit.onreadystatechange = function() {
  if (xhrInit.readyState === 4) {
    if (xhrInit.status === 200) {

      window.addrServeur = xhrInit.responseXML.querySelector("server")

    }
  }
};

window.onload = function() {

  var elemParent = document.getElementById("informationArea");
  var newElem = document.createElement("h4");

  newElem.innerHTML = "For access to the website you need to log in at " + window.addrServeur;
  elemParent.insertBefore(newElem, elemParent.firstChild());

}
