/*
** JavaScript File
** Name : interfaceJenkins.js
** Start by: Alban Meurice
** 08/12/2016
*/


var xhr = new XMLHttpRequest();
window.tabName = null;

/*
** This next functions supervise the status of the XMLHttpRequest.
** When the status of the request is equal at 200 (Finish and Ok) the functions get
** the name of all project register in Jenkins and they set the table with the
** initial letters for each sections ex: CT, EXT, PF..etc.
*/

xhr.onreadystatechange = function() {
  console.log("Changed state current state = "+xhr.readyState);
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {

      window.tabName = xhr.responseXML.querySelectorAll('name');

      /*
      ** The function fillTab get the array with all the initial letters and
      ** put them in the html table.
      */

      function fillTab(categorie) {
        var tabHtml = document.getElementById('MainTableBody');

        for (var l = 0; l < categorie.length; l++)
          {
            var lineCat = tabHtml.insertRow(-1);
            var cellLineCat = lineCat.insertCell(0);
            var nImage = document.createElement('img');
            nImage.setAttribute("class", "center-block pull-right");
            nImage.setAttribute("src", "../ressources/down-arrow.png")
            nImage.setAttribute("width", "25px");
            nImage.setAttribute("height", "25px");
            nImage.setAttribute("onClick", "rowl(this)");
            cellLineCat.innerHTML += categorie[l];
            cellLineCat.appendChild(nImage);
            cellLineCat = lineCat.insertCell(1);
            cellLineCat = lineCat.insertCell(2);
            cellLineCat = lineCat.insertCell(3);
            cellLineCat = lineCat.insertCell(4);
            cellLineCat = lineCat.insertCell(5);
            }
          }

      /*
      ** The function findCategory get the name of all projects and put in array all
      ** the initial letters.
      */

      function findCategory() {

          var categorie = new Array();

          for (var i = 0; i < tabName.length; i++)
          {
            if (window.tabName[i].textContent.indexOf('_') != -1)
              {
                var cat = window.tabName[i].textContent.substring(0, window.tabName[i].textContent.indexOf('_'));
                if (categorie.indexOf(cat) == -1)
                  categorie.push(cat);
              }
          }
          return categorie;
        }

      window.onload = function manageTab() {
          var categorie = findCategory();
          fillTab(categorie);
       }
      }
    else {
      alert("Failure loading xml element since Jenkins API..");
    }
  }
};

xhr.open("GET","https://apceuclidjks2.in2p3.fr/jenkins/api/xml");
xhr.send();
