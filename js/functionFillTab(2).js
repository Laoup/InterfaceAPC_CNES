/*
** JavaScript File
** Name : functionFillTab.js
** Start by: Alban Meurice
** 22/12/2016
*/


function rowl(balise) {

  var tabHtml = document.getElementById('MainTableBody');
  var childTabHtml = tabHtml.childNodes;
  var i = 0;
  while (balise.parentNode.parentNode !== childTabHtml[i])
    i = i + 1;
  var nb = 0;
  if ((nb = document.getElementsByName(childTabHtml[i].textContent).length) == 0)
    {
      for (var j = 0; j < window.tabProjects.length; j++)
        {
          if (window.tabProjects[j].category == childTabHtml[i].textContent)
            {
              var line = tabHtml.insertRow(i);
              line.setAttribute("class", "info");
              line.setAttribute("name", childTabHtml[i].textContent);
              var cell = line.insertCell(0);
              cell.innerHTML += window.tabProjects[j].nameProject;
              var nImage = document.createElement('img');
              nImage.setAttribute("class", "center-block pull-right");
              nImage.setAttribute("width", "25px");
              nImage.setAttribute("height", "25px");
              nImage.setAttribute("onClick", "rowl(this)");
              cell.appendChild(nImage);
              cell = line.insertCell(1);
              setImageHealth(cell, tabProjects[j]);nImage.setAttribute("src", "../ressources/down-arrow.png")
              cell = line.insertCell(2);
              setImageTestResult(cell, tabProjects[j]);
              cell = line.insertCell(3);
              getImageDocumentation(cell, tabProjects[j]);
              cell = line.insertCell(4);
              cellSonar = line.insertCell(5);
              getRepository(tabProjects[j], cell, cellSonar);
            }
        }
    }
  else
    {
      while (nb != 0)
        {
          tabHtml.deleteRow(i);
          nb = nb - 1;
        }
    }
}
