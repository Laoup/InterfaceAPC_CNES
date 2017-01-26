/*
** JavaScript File
** Name : interfaceJenkins.js
** Start by: Alban Meurice
** 08/12/2016
*/


var xhrInit = new XMLHttpRequest();
//var xhrInit2 = new XMLHttpRequest();
window.tabName = null;

//xhrInit2.open("POST", "https://cas.cosmos.esa.int/cas/login?service=http%3A%2F%2Fcodeen.euclid-ec.org%2Fjenkins%2FsecurityRealm%2FfinishLogin", false);
//xhrInit2.send();
xhrInit.open("GET", "../ressources/configFile.xml")
xhrInit.send();

/*xhrInit2.onreadystatechange = function() {
  console.log(xhrInit2.readyState);
  if (xhrInit2.readyState === 4)
    console.log(xhrInit2.status);
}*/

xhrInit.onreadystatechange = function() {
  if (xhrInit.readyState === 4) {
    if (xhrInit.status === 200) {

      window.addrServeur = xhrInit.responseXML.querySelector('Serveur').textContent;
      var xhr = new XMLHttpRequest();

      /*
      ** This next functions supervise the status of the XMLHttpRequest.
      ** When the status of the request is equal at 200 (Finish and Ok) the functions get
      ** initial letters for each sections ex: CT, EXT, PF..etc.
      ** the name of all project register in Jenkins and they set the table with the
      */

      xhr.onreadystatechange = function() {
        console.log("Changed state current state = "+xhr.readyState);
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {

            window.tabName = xhr.responseXML.querySelectorAll('name');
            window.tabColor = xhr.responseXML.querySelectorAll('color');
            var categorie = findCategory();
            fillTab(categorie);

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
                alert("Failure loading xml element since Jenkins API.." + xhr.status);
              }
            }
          };

          xhr.open("GET",window.addrServeur + "jenkins/api/xml");
          //xhr.open("GET", "https://apceucliddev.in2p3.fr/jenkins/api/xml", true, "mdetourn", "Y1EFww1PpSNbY");
          //xhr.open("POST", "https://apceucliddev.in2p3.fr/jenkins/api/xml", true, "mdetourn", );
          console.log(window.addrServeur + "jenkins/api/xml");
          xhr.send();
        }
      }
};
