/*
** JavaScript File
** Name : functionFillTab.js
** Start by: Alban Meurice
** 22/12/2016
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
//  alert(tabHtml.childNodes);
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
          getHealth(projectSelected[j], cell);
          cell = line.insertCell(2);
          getTestResult(projectSelected[j], cell);
          cell = line.insertCell(3);
          getDocumentation(projectSelected[j], cell);
          cell = line.insertCell(4);
          var cellSonar = line.insertCell(5);
          getRepository(projectSelected[j], cell, cellSonar);
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
** The next Function is use for get all the projects with their name start with the initial letter precise with "headIdentity"
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

function getTestResult(nameProject, cell) {

  var i = 0;
  var img = document.createElement('img');
  while (window.tabName[i].textContent != nameProject)
    i++;
  if (window.tabColor[i].textContent == "blue")
    img.setAttribute('src', '../ressources/blue.png');
  if (window.tabColor[i].textContent == "red")
    img.setAttribute('src', '../ressources/red.png');
  if (window.tabColor[i].textContent == "notbuilt")
    img.setAttribute('src', '../ressources/grey.png');
  img.setAttribute('class', 'center-block');
  img.setAttribute('width', '25px');
  img.setAttribute('height', '25px');
  cell.appendChild(img);
}
