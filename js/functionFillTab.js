/*
** JavaScript File
** Name : interfaceJenkins.js
** Start by: Alban Meurice
** 08/12/2016
*/


/*
** The function rowl is call when a user click on the arrow at the right side of the initial letters(for a category)
** If them project for the category not appear yet the function print all the projects for the category.
** If projects appear when a click is detected the function hide all the projects.
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
      var projectSelected = selectProjectCat(childTabHtml[i].textContent)
      for (var j = 0; j < projectSelected.length; j++)
        {
          var line = tabHtml.insertRow(i);
          line.setAttribute("class", "info");
          line.setAttribute("name", childTabHtml[i].textContent);
          var cell = line.insertCell(0);
          cell.innerHTML += projectSelected[j];
          cell = line.insertCell(1);
          cell = line.insertCell(2);
          cell = line.insertCell(3);
          cell = line.insertCell(4);
          cell = line.insertCell(5);
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

/*
** The next Function is use for get all the projects with their name start with the initial letters precise with "headIdentity"
*/

function selectProjectCat(headIdentity) {

  var projects = new Array();
  for (var i = 0; i < window.tabName.length; i++)
  {
    var project = window.tabName[i].textContent.substring(0, window.tabName[i].textContent.indexOf('_'));
    if (project == headIdentity)
      projects.push(window.tabName[i].textContent);
  }
  return projects;
}
