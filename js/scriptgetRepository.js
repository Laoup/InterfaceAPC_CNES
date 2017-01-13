/*
** JavaScript File
** Name : scriptHealth.js
** Start by: Alban Meurice
** 06/01/2017
*/


function getRepository(projectName, cell, cellSonar) {

  var xhr4 = new XMLHttpRequest();

  xhr4.onreadystatechange = function() {
    if (xhr4.readyState === 4) {
      if (xhr4.status === 200) {

        var numberBuild = xhr4.responseXML.querySelector("number");
        getNameRepository(numberBuild);
      }
    }
  };

  var urlDoc = window.addrServeur + "jenkins/job/";
  urlDoc += projectName + "/api/xml";
  xhr4.open("GET", urlDoc);
  xhr4.send();

  function getNameRepository(numberBuild) {

    var xhr5 = new XMLHttpRequest();

    xhr5.onreadystatechange = function() {
      if (xhr5.readyState === 4) {
        if (xhr5.status === 200) {

          var typeRepo = xhr5.responseXML.querySelector("kind");
          if (typeRepo != null)
            {
              var urlRepo = xhr5.responseXML.querySelector("module");
              var img = document.createElement('img');
              if (typeRepo.textContent == "svn")
                img.setAttribute("src", "../ressources/svn.png");
              else if (typeRepo.textContent == "git")
                img.setAttribute("src", "../ressources/github-logo.svg");
              img.setAttribute("class", "center-block");
              img.setAttribute("width", "25px");
              img.setAttribute("height", "25px");
              var link = "location.href=\'" + urlRepo.textContent + "\'";
              img.setAttribute("onclick", link);
              cell.appendChild(img);
            }
          sonarResult = xhr5.responseXML.querySelector("sonarqubeDashboardUrl");
          if (sonarResult != null)
            {
              img.setAttribute("src", "../ressources/SonarQube.png");
              img.setAttribute("class", "center-block");
              img.setAttribute("width", "25px");
              img.setAttribute("height", "25px");
              var link = "location.href=\'" + sonarResult.textContent + "\'";
              img.setAttribute("onclick", link);
              cellSonar.appendChild(img);
            }
        }
      }
    }

    if (numberBuild != null)
      {
        var urlBuildProject = window.addrServeur + "jenkins/job/";
        urlBuildProject += projectName + "/" + numberBuild.textContent + "/api/xml";
        xhr5.open("GET", urlBuildProject);
        xhr5.send();
      }

  }
}
