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

function getHealth(projectName, cell) {

  var xhr3 = new XMLHttpRequest();

  xhr3.onreadystatechange = function() {
    if (xhr3.readyState === 4) {
      if (xhr3.status === 200) {

        var img = document.createElement('img');
        //console.log(window.numberBuild.textContent + ": " + projectName);
        var healthInfo = xhr3.responseXML.querySelector("score") !== null;
        //alert(healthInfo);
        if (healthInfo == true)
          {
            var healthInfo = xhr3.responseXML.querySelector("score").textContent;
            if (healthInfo > 80)
              img.setAttribute("src", "../ressources/veryGoodHealt.png");
            else if (healthInfo > 60 && healthInfo <= 80)
              img.setAttribute("src", "../ressources/goodHealth.png");
            else if (healthInfo > 40 && healthInfo <= 60)
              img.setAttribute("src", "../ressources/mediumHealth.png");
            else if (healthInfo > 20 && healthInfo <= 40)
              img.setAttribute("src", "../ressources/badHealth.png");
            else if (healthInfo <= 20)
              img.setAttribute("src", "../ressources/veryBadHealth.png");
        }
        else
          img.setAttribute("src", "../ressources/veryGoodHealth.png");
        img.setAttribute("class", "center-block");
        img.setAttribute("width", "25px");
        img.setAttribute("height", "25px");
        cell.appendChild(img);
      }
    }
  };

  var urlDoc = "https://apceuclidjks2.in2p3.fr/jenkins/job/";
  urlDoc += projectName + "/api/xml";
  xhr3.open("GET", urlDoc);
  xhr3.send();
}
