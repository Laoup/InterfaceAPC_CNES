/*
** JavaScript File
** Name : interfaceJenkins.js
** Start by: Alban Meurice
** 08/12/2016
*/


var xhr2 = new XMLHttpRequest();

xhr2.onreadystatechange = function() {
  if (xhr2.readyState === 4) {
    if (xhr2.status === 200) {

      var XMLText = stringToXml(xhr2.responseText);
      var myArray = XMLText.querySelectorAll('a');

    }
  }
};

xhr2.open("GET","https://apceuclidjks2.in2p3.fr/jenkins/job/CT_Background_trunk/");
xhr2.send();

function stringToXml(textToParse) {
    return (new DOMParser()).parseFromString(textToParse, "text/xml");
}
