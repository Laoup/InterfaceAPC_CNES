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

      window.addrServer = xhrInit.responseXML.querySelector("Server").textContent;

    }
  }
};

window.onload = function() {

  var elemParent = document.getElementById("informationArea");
  var newElem = document.createElement("h4");

  newElem.innerHTML = "For access to the website you need to log in at " + window.addrServer;
  newElem.setAttribute("class", "text-center");
  elemParent.insertBefore(newElem, elemParent.firstChild);

}

function connectionIsOk() {

  var xhrPing = new XMLHttpRequest();
  xhrPing.withCredentials = true;
  var check = 0;

  xhrPing.onreadystatechange = function() {
    if (xhrPing.readyState === 4) {
      if (xhrPing.status === 200) {

        window.location = "../html/main_page.html";

      }
      else if (xhrPing.status === 403)
        {

          var elem = document.getElementById("informationArea");
          elem.firstChild.innerHTML = "You don't have access to the " + window.addrServer + "server.";
          elem.firstChild.innerHTML += "\nMaybe you are not connected to CAS or you need to reconnect."

        }
      else
      {

        var elem = document.getElementById("informationArea");
        elem.firstChild.innerHTML = "It's impossible to join the server";

      }
    }
  };

  xhrPing.open("GET", window.addrServer + "jenkins/");
  xhrPing.send();
}
