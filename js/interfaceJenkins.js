/*
** JavaScript File
** Name : interfaceJenkins.js
** Start by: Alban Meurice
** 13/01/2017
*/


/*
** The following code is not put into a function is use for put the wait message during the loading
** of the page. It's also use for get the config parameters like the name of the Jenkins server.
*/

var xhrInit = new XMLHttpRequest();
/*window.tabProjects = new Array();*/
window.projectsHandler = new projectHandler();
window.FuncOL = new Array();


var loadingIconeTarget = document.getElementById("MainTableDiv");
var loadingIcone = document.createElement("h2");
loadingIcone.innerHTML = "Wait few seconds please. the Jenkins server information is loading";
loadingIcone.setAttribute("id", "loadingIcone");
loadingIcone.setAttribute("class", "text-center");
loadingIconeTarget.appendChild(loadingIcone);

xhrInit.open("GET", "../ressources/configFile.xml")
xhrInit.send();

/*
** The following code is use for prepare and use the request needed for get the Jenkins information.
** The function getALLOU is use for put the projects into a table of MainProject and get information
** about their status.
*/

xhrInit.onreadystatechange = function() {
  if (xhrInit.readyState === 4) {
    if (xhrInit.status === 200) {

      window.addrServer = xhrInit.responseXML.querySelector("Server").textContent;

      var xhr = new XMLHttpRequest();

      xhr.withCredentials = true;
      xhr.open("GET", window.addrServer + "jenkins/api/xml?tree=jobs[name,color]");
      xhr.send();

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {

            var tabName = xhr.responseXML.querySelectorAll('name');
            var tabColor = xhr.responseXML.querySelectorAll('color');

            function getAllOU(/*tabName*/) {

              var i = 0;
              var j = 0;
              var tabSubBuild = new Array();
              var tabProjectsBranch = new Array();

              for (i = 0; i < tabName.length; i++)
              {
                if (tabSubBuild.indexOf(tabName[i].textContent) == -1 && tabName[i].textContent != "All" && tabName[i].textContent != "Pilote")
                  {
                    var xhr2 = new XMLHttpRequest();
                    var urlProj = window.addrServer + "jenkins/job/" + tabName[i].textContent + "/api/xml?tree=builds[subBuilds[jobName],number]{0},healthReport[score]{0}";

                    xhr2.withCredentials = true;
                    xhr2.open("GET", urlProj, false);
                    xhr2.send();

                    if (xhr2.responseXML != null)
                      {
                        j = 0;
                        //if (xhr2.responseXML.querySelector("upstreamProject") == null)
                        if (xhr2.responseXML.querySelector("subBuild") != null)
                          {
                            var tabSubJob = xhr2.responseXML.querySelectorAll("jobName");
                            while (j < tabSubJob.length)
                              {
                                if (tabSubBuild.indexOf(tabSubJob[j].textContent) == -1)
                                  {
                                    tabSubBuild.push(tabSubJob[j].textContent);
                                  }
                                j = j + 1;
                              }
                            var project = new Project(tabName[i].textContent);
                            /*console.log("STOP !");
                            console.log("------------------------------");
                            console.log("Full name is : " + project.fullNameProject);
                            console.log("nameMain is : " + project.nameMain);
                            console.log("Category is : " + project.category);
                            console.log("The version name is : " + project.nameVersion);
                            console.log("------------------------------");*/
                            //project.category = identifyCategory(project);
                            project.health = gethealthMain(xhr2);
                            project.numberBuild = getNumberBuild(xhr2);
                            project.color = tabColor[i].textContent;
                            window.projectsHandler.addProject(project);
                            //tabProjectsBranch.push(project);
                          }
                      }
                    }

                  }
              }
            getAllOU(tabName);

            function fillAll() {

              //var category = findCategory();
              var category = projectsHandler.getCategoryExist();
              //projectsHandler.affAllMainProjects();
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

/*
** The next Function is used for determine the category of one project.
*/

function identifyCategory(project) {

  if (project.nameProject.indexOf('_') != -1)
    return project.nameProject.substring(0, project.nameProject.indexOf('_'));
}

/*
** The next function is used for find the different categories present in the dashboard.
*/

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
  //console.log(document.getElementById("loadingIcone"));
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
      nImage.setAttribute("onClick", "rowlCategory(this)");
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

/*
** The two next functions is used for remplace the utiisation of window.onload
** more information at "http://babylon-design.com/eviter-conflit-javascript-window-onload/"
*/

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
