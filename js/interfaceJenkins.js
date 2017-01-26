/*
** JavaScript File
** Name : interfaceJenkins.js
** Start by: Alban Meurice
** 13/01/2017
*/


var xhrInit = new XMLHttpRequest();
window.tabProjects = new Array();

xhrInit.open("GET", "../ressources/configFile.xml")
xhrInit.send();

xhrInit.open("GET", "../ressources/configFile.xml")
xhrInit.send();

xhrInit.onreadystatechange = function() {
  if (xhrInit.readyState === 4) {
    if (xhrInit.status === 200) {

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;
      xhr.open("GET", "https://apceuclidjks2.in2p3.fr/jenkins/api/xml");
      xhr.send();

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {

            var tabName = xhr.responseXML.querySelectorAll('name');
            var tabColor = xhr.responseXML.querySelectorAll('color');

            var loadingIconeTarget = document.getElementById("MainTableDiv");
            var loadingIcone = document.createElement("img");
            loadingIcone.setAttribute("id", "loadingIcone");
            loadingIcone.setAttribute("class", "center-block");
            loadingIcone.setAttribute("src", "../ressources/ajax-loader.gif");
            loadingIcone.setAttribute("width", "50px");
            loadingIcone.setAttribute("height", "50px");
            loadingIconeTarget.appendChild(loadingIcone);

            getAllOU(tabName);

            function getAllOU(tabName) {

              var i = 0;

              for (i = 0; i < tabName.length; i++)
                {
                  var xhr2 = new XMLHttpRequest();
                  var urlProj = "https://apceuclidjks2.in2p3.fr/jenkins/job/" + tabName[i].textContent + "/api/xml";

                  xhr2.withCredentials = true;
                  xhr2.open("GET", urlProj, false);
                  xhr2.send();

                  //var check = xhr2.responseXML.querySelector("subBuild").textContent;
                  //if (check !== null)
                  if (xhr2.responseXML != null)
                    {
                      if (xhr2.responseXML.querySelector("upstreamProject") == null)
                      {
                        //var project = new MainProject(xhr2.responseXML.querySelector("name").textContent);
                        var project = new MainProject(tabName[i].textContent);
                        project.category = identifyCategory(project);
                        project.health = gethealthMain(xhr2);
                        project.numberBuild = getNumberBuild(xhr2);
                        project.color = tabColor[i].textContent;
                        window.tabProjects.push(project);
                      }
                    }
                }
            }

            //window.onload = function() {

              var category = findCategory();
              fillTab(category);
            //}
          }
        }
      };
    }
  }
};

function identifyCategory(project) {

  if (project.nameProject.indexOf('_') != -1)
    return project.nameProject.substring(0, project.nameProject.indexOf('_'));
}

function findCategory() {

  var category = new Array();
  var i;

  for (i = 0; i < window.tabProjects.length; i++)
    {
      if (category.indexOf(window.tabProjects[i].category) == -1 &&
        typeof window.tabProjects[i].category !== 'undefined')
          category.push(window.tabProjects[i].category);
    }
  return (category);
}

function fillTab(category) {

  var tabHtml = document.getElementById('MainTableBody');
  var loadingIcone = document.getElementById("loadingIcone");
  loadingIcone.parentNode.removeChild(loadingIcone);

  for (var l = 0; l < category.length; l++)
    {
      var lineCat = tabHtml.insertRow(-1);
      var cellLineCat = lineCat.insertCell(0);
      var nImage = document.createElement('img');
      nImage.setAttribute("class", "center-block pull-right");
      nImage.setAttribute("src", "../ressources/plus.png")
      nImage.setAttribute("width", "25px");
      nImage.setAttribute("height", "25px");
      nImage.setAttribute("onClick", "rowl(this)");
      cellLineCat.innerHTML += category[l];
      cellLineCat.appendChild(nImage);
      cellLineCat = lineCat.insertCell(1);
      cellLineCat = lineCat.insertCell(2);
      cellLineCat = lineCat.insertCell(3);
      cellLineCat = lineCat.insertCell(4);
      cellLineCat = lineCat.insertCell(5);
      cellLineCat = lineCat.insertCell(6);
    }
}
