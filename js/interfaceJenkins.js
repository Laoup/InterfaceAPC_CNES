/*
** JavaScript File
** Name : interfaceJenkins.js
** Start by: Alban Meurice
** 13/01/2017
*/


var xhrInit = new XMLHttpRequest();
window.tabProjects = new Array();
window.FuncOL = new Array();

//function waitMessage() {

  //console.log(window.addrServer);
  var loadingIconeTarget = document.getElementById("MainTableDiv");
  var loadingIcone = document.createElement("h2");
  loadingIcone.innerHTML = "Wait few seconds please. the Jenkins server information is loading";
  loadingIcone.setAttribute("id", "loadingIcone");
  loadingIcone.setAttribute("class", "text-center");
  loadingIconeTarget.appendChild(loadingIcone);
//};

//StkFunc(waitMessage);

xhrInit.open("GET", "../ressources/configFile.xml")
xhrInit.send();



xhrInit.onreadystatechange = function() {
  if (xhrInit.readyState === 4) {
    if (xhrInit.status === 200) {

      window.addrServer = xhrInit.responseXML.querySelector("Server").textContent;

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;
      xhr.open("GET", window.addrServer + "jenkins/api/xml");
      xhr.send();

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {

            var tabName = xhr.responseXML.querySelectorAll('name');
            var tabColor = xhr.responseXML.querySelectorAll('color');

            function getAllOU(tabName) {

              var i = 0;
              var j = 0;
              var tabSubBuild = new Array();

              for (i = 0; i < tabName.length; i++)
              {
                if (tabSubBuild.indexOf(tabName[i].textContent) == -1 && tabName[i].textContent != "All" && tabName[i].textContent != "Pilote")
                  {
                    var xhr2 = new XMLHttpRequest();
                    var urlProj = window.addrServer + "jenkins/job/" + tabName[i].textContent + "/api/xml";

                    xhr2.withCredentials = true;
                    xhr2.open("GET", urlProj, false);
                    xhr2.send();

                    //var check = xhr2.responseXML.querySelector("subBuild").textContent;
                    //if (check !== null)
                    if (xhr2.responseXML != null)
                      {
                        j = 0;
                        if (xhr2.responseXML.querySelector("upstreamProject") == null)
                          {
                            var tabSubJob = xhr2.responseXML.querySelectorAll("jobName");
                            while (j < tabSubJob.length)
                              {
                                if (tabSubBuild.indexOf(tabSubJob[j].textContent) == -1)
                                  {
                                    //console.log(tabSubJob[j]);
                                    tabSubBuild.push(tabSubJob[j].textContent);
                                  }
                                j = j + 1;
                              }
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
              //var category = findCategory();
              //fillTab(category);
            }
            getAllOU(tabName);

            function fillAll() {

              var category = findCategory();
              fillTab(category);
            };

            StkFunc(fillAll);

            window.onload = StkExec();
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
  console.log(document.getElementById("loadingIcone"));
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

function StkFunc(func)
{
	window.FuncOL[window.FuncOL.length] = func;
}

function StkExec()
{
  console.log("StkExec");
  for (var i = 0; i < window.FuncOL.length; i++)
    window.FuncOL[i]();
}
