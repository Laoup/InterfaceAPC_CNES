/*
** JavaScript File
** Name : functionFillTab.js
** Start by: Alban Meurice
** 22/12/2016
*/

/**
* The function rowlCategory manage the appear of the plus and minus logo for the top level(->CategoryName).
* Her manage also the display of name of projects for the middleLevel(->ProjectsName).
* @param {HtmlObject} balise - balise is the result of the call this function by a onClick html with a param "this". It's mean arg balise is the balise html reference.
*/
/*export*/ function rowlCategory(balise) {

  var tabHtml = document.getElementById('MainTableBody');
  var childTabHtml = tabHtml.childNodes;
  var i = 0;
  var j = 0;
  while (balise.parentNode.parentNode !== childTabHtml[i])
    i = i + 1;
  var nb = 0;
  if ((nb = document.getElementsByName(childTabHtml[i].textContent).length) == 0)
    {
      balise.src = "../ressources/moins.png"
      var mainProj = window.projectsHandler.getAllCategoryProjects(childTabHtml[i].textContent);
      for (j = 0; j < mainProj.length; j++)
        {
          var img = document.createElement('img');
          //img.setAttribute("class", "center-block pull-right");
          img.setAttribute("src", "../ressources/plus.png");
          img.setAttribute("width", "25px");
          img.setAttribute("height", "25px");
          img.setAttribute("onClick", "rowlProject(this)");
          var line = tabHtml.insertRow(i);
          line.setAttribute("class", "info");
          line.setAttribute("name", childTabHtml[i].textContent);
          line.setAttribute("id", childTabHtml[i].textContent);
          var cell = line.insertCell(0);
          var textCell = document.createElement('p');
          textCell.innerHTML += mainProj[j];
          textCell.setAttribute("class", "projectName");
          cell.appendChild(textCell);
          cell.appendChild(img);
          cell = line.insertCell(1);
          cell = line.insertCell(2);
          cell = line.insertCell(3);
          cell = line.insertCell(4);
          cell = line.insertCell(5);
          cellSonar = line.insertCell(6);
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

/**
* The function rowl manage the appear of the plus and minus logo for the middle level(->ProjectName).
* Her manage also the display of information about each project version and the display of the
* projects themselves.
* @param {HtmlObject} balise - balise is the result of the call this function by a onClick html with a param "this". It's mean arg balise is the balise html reference.
*/
/*export*/ function rowlProject(balise) {

  var tabHtml = document.getElementById('MainTableBody');
  var childTabHtml = tabHtml.childNodes;
  var i = 0;
  var j = 0;
  while (balise.parentNode.parentNode !== childTabHtml[i])
    i = i + 1;
  var nb = 0;
  if (document.getElementById(childTabHtml[i].textContent) == null)
    {
      balise.src = "../ressources/moins.png"
      var projs = window.projectsHandler.getAllVersion(childTabHtml[i].textContent, childTabHtml[i].getAttribute('name'));
      for (j = 0; j < projs.length; j++)
        {
            var line = tabHtml.insertRow(i);
            line.setAttribute("class", "warning");
            line.setAttribute("name", projs[j].category);
            line.setAttribute("id", childTabHtml[i].textContent);
            var cell = line.insertCell(0);
            var linkText = document.createElement('a');
            linkText.setAttribute("href", window.addrServer + "jenkins/job/" + projs[j].fullNameProject);
            var textCell = document.createElement('p');
            textCell.innerHTML += projs[j].nameVersion;
            textCell.setAttribute("class", "projectVersion");
            linkText.appendChild(textCell);
            cell.appendChild(linkText);
            cell = line.insertCell(1);
            setImageHealth(cell, projs[j]);
            cell = line.insertCell(2);
            setImageBuildResult(cell, projs[j]);
            cell = line.insertCell(3);
            getTestResult(cell, projs[j]);
            cell = line.insertCell(4);
            getImageDocumentation(cell, projs[j]);
            cell = line.insertCell(5);
            cellSonar = line.insertCell(6);
            getRepository(projs[j], cell, cellSonar);
          }
    }
  else
    {
      balise.src = "../ressources/plus.png"
      while (document.getElementById(childTabHtml[i].textContent) != null)
        {
          tabHtml.deleteRow(i);
          nb = nb - 1;
        }
    }
}
