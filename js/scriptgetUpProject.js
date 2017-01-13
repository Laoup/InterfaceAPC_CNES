/*
** JavaScript File
** Name : scriptgetUpProject.js
** Start by: Alban Meurice
** 12/01/2017
*/


function getUpProject(/*objProject, */index, cell) {

  var xhr6 = new XMLHttpRequest();

  xhr6.onreadystatechange = function() {
    if (xhr6.readyState === 4) {
      if (xhr6.status === 200) {
        if (xhr6.responseXML.querySelector("subBuild") != null)
          {
            var numberBuild = xhr6.responseXML.querySelector("number");
            /*objProject.*/var nameProject = xhr6.responseXML.querySelector("name").textContent;
            //alert(objProject.nameProject);
            fillObjProject(numberBuild, nameProject);
          }
      }
    }
  }

    var urlBuildProject = "https://apceuclidjks2.in2p3.fr/jenkins/job/";
    urlBuildProject += window.tabName[index].textContent + "/api/xml";
    xhr6.open("GET", urlBuildProject);
    xhr6.send();

    function fillObjProject(numberBuild, nameProject) {

      var xhr7 = new XMLHttpRequest();

      xhr7.onreadystatechange = function() {
        if (xhr7.readyState === 4) {
          if (xhr7.status === 200) {

            //var subProjects = xhr7.responseXML.querySelectorAll("jobName");
            //objProject.dependencies = subProjects;
            console.log('A');
            if (xhr7.responseXML.querySelectorAll("jobName") != null)
              {
                console.log('B');
                cell.innerHTML += nameProject + index;
              }
          }
        }
      }

      urlBuildProject = "https://apceuclidjks2.in2p3.fr/jenkins/job/";
      urlBuildProject += window.tabName[index].textContent + "/" + numberBuild.textContent + "/api/xml"
      xhr7.open("GET", urlBuildProject);
      xhr7.send();
    }
}
