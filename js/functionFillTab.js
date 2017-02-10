/*
** JavaScript File
** Name : functionFillTab.js
** Start by: Alban Meurice
** 22/12/2016
*/

/*
** The function rowl manage the appear of the plus and minus logo.
** Her manage also the display of information about each project and the display of the
** projects themselves.
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
      balise.src = "../ressources/moins.png"
      for (var j = 0; j < window.tabProjects.length; j++)
        {
          if (window.tabProjects[j].category == childTabHtml[i].textContent)
            {
              var line = tabHtml.insertRow(i);
              line.setAttribute("class", "info");
              line.setAttribute("name", childTabHtml[i].textContent);
              var cell = line.insertCell(0);
              cell.innerHTML += window.tabProjects[j].nameProject;
              cell = line.insertCell(1);
              setImageHealth(cell, tabProjects[j]);
              cell = line.insertCell(2);
              setImageBuildResult(cell, tabProjects[j]);
              cell = line.insertCell(3);
              getTestResult(cell, tabProjects[j]);
              cell = line.insertCell(4);
              getImageDocumentation(cell, tabProjects[j]);
              cell = line.insertCell(5);
              cellSonar = line.insertCell(6);
              getRepository(tabProjects[j], cell, cellSonar);
            }
        }
    }
  else
    {
      balise.src = "../ressources/plus.png"
      while (nb != 0)
        {
          tabHtml.deleteRow(i);
          nb = nb - 1;
        }
    }
}
