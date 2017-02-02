/*
** JavaScript File
** Name : scriptHealth.js
** Start by: Alban Meurice
** 06/01/2017
*/


/*
** The function getHealth get the state of health for a project and
** she create an insert an image for illustrate the state of health of project.
*/

function gethealthMain(xhr) {

  var healthInfo = xhr.responseXML.querySelector("score") !== null;
  if (healthInfo == true)
    {
      var healthInfo = xhr.responseXML.querySelector("score").textContent;
      return (healthInfo);
    }
}

function setImageHealth(cell, project)
{
  var img = document.createElement('img');

  if (project.health != null)
  {
      if (project.health > 80)
      img.setAttribute("src", "../ressources/veryGoodHealth.png");
      else if (project.health > 60 && project.health <= 80)
      img.setAttribute("src", "../ressources/goodHealth.png");
      else if (project.health > 40 && project.health <= 60)
      img.setAttribute("src", "../ressources/mediumHealth.png");
      else if (project.health > 20 && project.health <= 40)
      img.setAttribute("src", "../ressources/badHealth.png");
      else if (project.health <= 20)
      img.setAttribute("src", "../ressources/veryBadHealth.png");
    }
  else
    img.setAttribute("src", "../ressources/veryGoodHealth.png");
  img.setAttribute("class", "center-block");
  img.setAttribute("width", "25px");
  img.setAttribute("height", "25px");
  cell.appendChild(img);
}

function setImageBuildResult(cell, project)
{
  var img = document.createElement('img');
  if (project.color == "blue")
    img.setAttribute('src', '../ressources/blue.png');
  else if (project.color == "red")
    img.setAttribute('src', '../ressources/red.png');
  else
    img.setAttribute('src', '../ressources/grey.png');
  img.setAttribute('class', 'center-block');
  img.setAttribute('width', '25px');
  img.setAttribute('height', '25px');
  cell.appendChild(img);
}

function getImageDocumentation(cell, project)
{
  var xhr3 = new XMLHttpRequest();

  xhr3.onreadystatechange = function() {
    if (xhr3.readyState === 4) {

      var img = document.createElement('img');
      var linkA = document.createElement('a');

      if (xhr3.status === 200) {

        var XMLText = stringToXml(xhr3.responseText);
        window.myArray = XMLText.querySelectorAll('a');//what ?
        img.setAttribute("class", "center-block");
        img.setAttribute("src", "../ressources/file.svg");
        img.setAttribute("width", "25px");
        img.setAttribute("height", "25px");
        linkA.setAttribute("href", urlDoc);
        linkA.appendChild(img);
        project.documentation = urlDoc;
        cell.appendChild(linkA);
      }
      else if (xhr3.status === 404) {

        img.setAttribute("class", "center-block");
        img.setAttribute("src", "../ressources/RedX.ico");
        img.setAttribute("width", "25px");
        img.setAttribute("height", "25px");
        cell.appendChild(img);
      }

    }
  };

  //var urlDoc = window.addrServeur + "jenkins/job/";
  var urlDoc = window.addrServer + "jenkins/job/";
  urlDoc += project.nameProject + '/doxygen/';
  //console.log("for : " + project.nameProject + " url is : " + urlDoc);

  xhr3.withCredentials = true;
  xhr3.open("GET", urlDoc);
  xhr3.send();
}

function getRepository(project, cell, cellSonar) {

  var xhr4 = new XMLHttpRequest();

  if (project.numberBuild != null)
    {
      //var urlBuildProject = window.addrServeur + "jenkins/job/";
      var urlBuildProject = window.addrServer + "jenkins/job/";
      urlBuildProject += project.nameProject + "/" + project.numberBuild + "/api/xml";
      xhr4.withCredentials = true;
      xhr4.open("GET", urlBuildProject);
      xhr4.send();
    }

    xhr4.onreadystatechange = function() {
      if (xhr4.readyState === 4) {
        if (xhr4.status === 200) {

          var typeRepo = xhr4.responseXML.querySelector("kind");
          var img = document.createElement('img');
          var linkA = document.createElement('a');
          if (typeRepo != null)
            {
              var urlRepo = xhr4.responseXML.querySelector("module");
              /*var img = document.createElement('img');
              var linkA = document.createElement('a');*/
              if (urlRepo != null)
                {
                  if (typeRepo.textContent == "svn")
                    img.setAttribute("src", "../ressources/svn.png");
                  else if (typeRepo.textContent == "git")
                    img.setAttribute("src", "../ressources/github-logo.svg");
                  img.setAttribute("class", "center-block");
                  img.setAttribute("width", "25px");
                  img.setAttribute("height", "25px");
                  linkA.setAttribute("href", urlRepo.textContent);
                  linkA.appendChild(img);
                  cell.appendChild(linkA);
                }
            }
          sonarResult = xhr4.responseXML.querySelector("sonarqubeDashboardUrl");
          if (sonarResult != null)
            {
              img.setAttribute("src", "../ressources/SonarQube.png");
              img.setAttribute("class", "center-block");
              img.setAttribute("width", "25px");
              img.setAttribute("height", "25px");
              //var link = "location.href=\'" + sonarResult.textContent + "\'";
              //img.setAttribute("onclick", link);
              linkA.setAttribute("href", sonarResult.textContent);
              linkA.appendChild(img);
              cellSonar.appendChild(linkA);
            }
        }
      }
    };
  }

function getNumberBuild(xhr) {

  var number = xhr.responseXML.querySelector("number") !== null;
  if (number == true)
    {
      var number = xhr.responseXML.querySelector("number").textContent;
      return (number);
    }
}

function getTestResult(cell, project) {

  var xhr5 = new XMLHttpRequest();

  var urlTest = window.addrServer + "jenkins/job/";
  urlTest += project.nameProject + "/" + project.numberBuild + "/testReport/api/xml";
  xhr5.withCredentials = true;
  xhr5.open("GET", urlTest);
  xhr5.send();

  xhr5.onreadystatechange = function() {
    if (xhr5.readyState === 4) {
      if (xhr5.status === 200) {

        var baliseImg = document.createElement("img");
        var baliseRef = document.createElement("a");
        baliseImg.setAttribute("src", "../ressources/Report.jpg");
        baliseImg.setAttribute("class", "center-block");
        baliseImg.setAttribute("width", "25px");
        baliseImg.setAttribute("height", "25px");
        urlTest = urlTest.replace("/api/xml", "");
        baliseRef.setAttribute("href", urlTest);
        baliseRef.appendChild(baliseImg);
        cell.appendChild(baliseRef);
      }
    }
  };

}

/*
** The function stringToXml convert a text document in XML document.
*/

function stringToXml(textToParse) {
    return (new DOMParser()).parseFromString(textToParse, "text/xml");
}
