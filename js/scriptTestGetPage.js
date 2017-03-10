/*
** JavaScript File
** Name : scriptTestGetPage.js
** Start by: Alban Meurice
** 23/12/2016
*/


/*
** The Function getDocumentation is use for get an eventual documentation attach with the project.
** If a documentation is disponible she create and insert an image in the page.
** After if the user click on the image, he is redirected on the documentation page.
*/

function getDocumentation(projectName, cell) {

  console.log("YOOOOOOOOOOOOLLLLLLLLLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!!!");
  console.log("If tou don't see me it's because i'm useless");
  var xhr2 = new XMLHttpRequest();

  xhr2.onreadystatechange = function() {
    if (xhr2.readyState === 4) {

      var img = document.createElement('img');

      if (xhr2.status === 200) {

        var XMLText = stringToXml(xhr2.responseText);
        window.myArray = XMLText.querySelectorAll('a');
        img.setAttribute("class", "center-block");
        img.setAttribute("src", "../ressources/file.svg");
        img.setAttribute("width", "25px");
        img.setAttribute("height", "25px");
        var link = "location.href=\'" + urlDoc + "\'";
        img.setAttribute("onclick", link);
      }
      else if (xhr2.status === 404) {

        img.setAttribute("class", "center-block");
        img.setAttribute("src", "../ressources/RedX.ico");
        img.setAttribute("width", "25px");
        img.setAttribute("height", "25px");
      }
      cell.appendChild(img);

    }
  };

  var urlDoc = window.addrServeur + "jenkins/job/";
  urlDoc += projectName + '/' + 'doxygen' + '/';

  xhr2.open("GET", urlDoc);
  xhr2.send();
}

/*
** The function stringToXml convert a text document in XML document.
*/

function stringToXml(textToParse) {
    return (new DOMParser()).parseFromString(textToParse, "text/xml");
}
