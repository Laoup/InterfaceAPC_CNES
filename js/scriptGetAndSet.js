/*
** JavaScript File
** Name : scriptHealth.js
** Start by: Alban Meurice
** 06/01/2017
*/


/**
* The function getHealthMain get the score and the description of health for a project.
* @param {XMLHttpRequest} xhr - The XMLHttpRequest where the data is stock.
* @param {Object} project - The Project who receive the information about score and description.
*/
/*export */function gethealthMain(xhr, project) {

  var healthInfo = xhr.responseXML.querySelectorAll("score") !== null;
  if (healthInfo == true)
    {
      var healthInfo = xhr.responseXML.querySelectorAll("score");
      if (healthInfo[0] != null)
        project.health = healthInfo[0].textContent;
      if (healthInfo[1] != null)
        project.buildStability = healthInfo[1].textContent;
    }
  var descriptionInfo = xhr.responseXML.querySelectorAll("description") !== null;
  if (descriptionInfo == true)
    {
      descriptionInfo = xhr.responseXML.querySelectorAll("description");
      if (descriptionInfo[0] != null)
        project.healthDescription = descriptionInfo[0].textContent;
      if (descriptionInfo[1] != null)
        project.buildStabilityDescription = descriptionInfo[1].textContent;
    }
}

/**
* The function setImageHealth get the state of health for a project and
* she create an insert an image for illustrate the state of health of project.
* @param {HtmlObject} cell - It's the cellule of the html tab where the function set the image.
* @param {Object} project - It's the Object he represent the project. This object have the information about the health of the project.
*/
/*export*/ function setImageHealth(cell, project)
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
  img.setAttribute("class", "center-block healthReportHide");
  img.setAttribute("width", "25px");
  img.setAttribute("height", "25px");
  img.setAttribute("onmouseover", "changeInHoverClass(this)");
  img.setAttribute("onmouseout", "changeInHideClass(this)");

  cell.appendChild(img);
  cell.appendChild(createDescriptHealth(project, img.src));
}

/**
* The next Function set a image with different color in terms of the status of build.
* @param {HtmlObject} cell - It's the cellule of the html tab where the function set the image.
* @param {Object} project - It's the Object he represent the project. This object have the information about the build result of the project.
*/
/*export*/ function setImageBuildResult(cell, project)
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

/**
* The next function test if a documentation exist for the Project.
* If a Documentation exist the function create an image with link to the documentation for the project.
* @param {HtmlObject} cell - It's the cellule of the html tab where the function set the image.
* @param {Object} project - It's the Object he represent the project. This object have the information about the documentation of the project.
*/
/*export*/ function getImageDocumentation(cell, project)
{
  var xhr3 = new XMLHttpRequest();

  xhr3.onreadystatechange = function() {
    if (xhr3.readyState === 4) {

      var img = document.createElement('img');
      var linkA = document.createElement('a');

      if (xhr3.status === 200) {

        var XMLText = stringToXml(xhr3.responseText);
        /*window.myArray = XMLText.querySelectorAll('a');//what ?*/
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

  var urlDoc = window.addrServer + "jenkins/job/";
  urlDoc += project.fullNameProject + '/doxygen/';

  xhr3.withCredentials = true;
  xhr3.open("GET", urlDoc);
  xhr3.send();
}

/**
* The next function test if a Repository or/and SonarQube exist for the Project.
* If repository or/and SonarQube exist the function create an image for each of them with the link for go to the page.
* @param {HtmlObject} cell - It's the cellule of the html tab where the function set the image.
* @param {HtmlObject} cellSonar - It's the cellule of the html tab where the function set the image and the link if a SonarQube exist for the current project.
* @param {Object} project - It's the Object he represent the project. This object have the information about the SonarQube of the project.
*/
/*export*/ function getRepository(project, cell, cellSonar) {

  var xhr4 = new XMLHttpRequest();

  if (project.numberBuild != null)
    {
      var urlBuildProject = window.addrServer + "jenkins/job/";
      urlBuildProject += project.fullNameProject + "/" + project.numberBuild + "/api/xml";
      xhr4.withCredentials = true;
      xhr4.open("GET", urlBuildProject);
      xhr4.send();
    }

    xhr4.onreadystatechange = function() {
      if (xhr4.readyState === 4) {
        if (xhr4.status === 200) {

          var typeRepo = xhr4.responseXML.querySelector("kind");
          var imgA = document.createElement('img');
          var imgB = document.createElement('img');
          var linkA = document.createElement('a');
          var linkB = document.createElement('a');
          if (typeRepo != null)
            {
              var urlRepo;
              if (typeRepo.textContent == "svn")
                urlRepo = xhr4.responseXML.querySelector("module");
              else if (typeRepo.textContent == "git")
                urlRepo = xhr4.responseXML.querySelector("remoteUrl");
              if (urlRepo != null)
                {
                  if (typeRepo.textContent == "svn")
                    imgA.setAttribute("src", "../ressources/svn.png");
                  else if (typeRepo.textContent == "git")
                    imgA.setAttribute("src", "../ressources/github-logo.svg");
                  imgA.setAttribute("class", "center-block");
                  imgA.setAttribute("width", "25px");
                  imgA.setAttribute("height", "25px");
                  linkA.setAttribute("href", urlRepo.textContent.substr(0, (urlRepo.textContent.length - 4)));
                  linkA.appendChild(imgA);
                  cell.appendChild(linkA);
                }
            }
          sonarResult = xhr4.responseXML.querySelector("sonarqubeDashboardUrl");
          if (sonarResult != null)
            {
              imgB.setAttribute("src", "../ressources/SonarQube.png");
              imgB.setAttribute("class", "center-block");
              imgB.setAttribute("width", "25px");
              imgB.setAttribute("height", "25px");
              linkB.setAttribute("href", sonarResult.textContent);
              linkB.appendChild(imgB);
              cellSonar.appendChild(linkB);
            }
        }
      }
    };
  }


/**
* This function get the number of the build for a project
* @param {XMLHttpRequest} xhr - The xhr variable is the variable where the data receive by the XMLHttpRequest is save.
*/
/*export*/ function getNumberBuild(xhr) {

  var number = xhr.responseXML.querySelector("number") !== null;
  if (number == true)
    {
      var number = xhr.responseXML.querySelector("number").textContent;
      return (number);
    }
}

/**
* This function get the Test result page for a project if the Tests result page exist.
* If a Page with the result of test exist the function create an image with the link of the page for the project.
* @param {HtmlObject} cell - It's the cellule of the html tab where the function set the image and the link for acces at the documentation.
* @param {Object} project - It's the Object he represent the project. This object have the information about the documentation of the project.
*/
/*export*/ function getTestResult(cell, project) {

  var xhr5 = new XMLHttpRequest();

  var urlTest = window.addrServer + "jenkins/job/";
  urlTest += project.fullNameProject + "/" + project.numberBuild + "/testReport/api/xml";
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

/**
* The function stringToXml convert a text document in XML document.
* @param {String} textToParse - This argument is the text you want transform in XML document.
*/
/*export*/ function stringToXml(textToParse) {
    return (new DOMParser()).parseFromString(textToParse, "text/xml");
}
