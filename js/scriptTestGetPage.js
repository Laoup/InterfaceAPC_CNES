/*
** JavaScript File
** Name : interfaceJenkins.js
** Start by: Alban Meurice
** 23/12/2016
*/


function getDocumentation(projectName) {

  //alert(projectName);
  var xhr2 = new XMLHttpRequest();
  //window.finish = false;

  xhr2.onreadystatechange = function() {
    if (xhr2.readyState === 4) {
      if (xhr2.status === 200) {

        var XMLText = stringToXml(xhr2.responseText);
        window.myArray = XMLText.querySelectorAll('a');
        //window.finish = true;
        //window.finish = createImgDoc();
      }
    }
  };

  var urlDoc = "https://apceuclidjks2.in2p3.fr/jenkins/job/";
  urlDoc += projectName + '/';

  xhr2.open("GET", urlDoc);
  xhr2.send();
  return (createImgDoc());

  function createImgDoc() {

  var check = false;
  for (var i = 0; i < window.myArray.length && check === false; i++)
    {
      if (myArray[i].firstChild == "DoxyGen HTML")
        check = true;
    }
  var img = document.createElement('img');
  //alert(img);
  if (check == true)
    {
      //alert('1');
      img.setAttribute("class", "center-block");
      img.setAttribute("src", "../ressources/file.svg");
      img.setAttribute("width", "25px");
      img.setAttribute("height", "25px");
      img.setAttribute("href", myArray[i].href);
    }
  else
    {
      //alert('2');
      img.setAttribute("class", "center-block");
      img.setAttribute("src", "../ressources/RedX.png");
      img.setAttribute("width", "25px");
      img.setAttribute("height", "25px");
    }
  //alert(img);
  return (img);
  }
}

function stringToXml(textToParse) {
    return (new DOMParser()).parseFromString(textToParse, "text/xml");
}
