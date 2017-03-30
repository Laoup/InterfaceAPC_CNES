/*
** JavaScript File
** Name : scriptHealth.js
** Start by: Alban Meurice
** 02/03/2017
*/

/**
* The three next function manage the div who appear when the mouse in on weather icon.
*
*/
export function changeInHoverClass(balise) {

  balise.setAttribute("class", "center-block healthReportHover");
  return (true);
}

function changeInHideClass(balise) {

  balise.setAttribute("class", "center-block healthReportHide");
  return (true);
}

/**
* This Function is call by the function setImageHealth for create a table with information about the health of project and his build information.
* This table is only visible when the mouse is above the icone in the column health.
* @param {Object} project - It's the Object he represent the project. This object have the information about the health and the build stability of the project.
* 
*/
function createDescriptHealth(project, img_src) {

  var hiddenDiv = document.createElement('div');
  hiddenDiv.setAttribute("class", "hiddenDiv");
  var para = document.createElement('table');
  para.setAttribute("class", "table");
  var paraHead = document.createElement('thead');
  var localLine = paraHead.insertRow(-1);
  localLine.setAttribute("class", "tableHead");
  var cellLocalLine = localLine.insertCell(0);
  cellLocalLine.innerHTML += "W";
  cellLocalLine = localLine.insertCell(1);
  cellLocalLine.innerHTML += "Description";
  cellLocalLine = localLine.insertCell(2);
  cellLocalLine.innerHTML += "%";
  var paraBody = document.createElement('tbody');
  localLine = paraBody.insertRow(-1);
  localLine.setAttribute("class", "tableLine");
  cellLocalLine = localLine.insertCell(0);
  var localImg = document.createElement("img");
  localImg.setAttribute("src", ".." + img_src.substring(img_src.indexOf("/ressources")));
  localImg.setAttribute("class", "center-block");
  localImg.setAttribute("width", "15px");
  localImg.setAttribute("height", "15px");
  cellLocalLine.appendChild(localImg);
  cellLocalLine = localLine.insertCell(1);
  cellLocalLine.innerHTML += project.healthDescription;
  cellLocalLine = localLine.insertCell(2);
  cellLocalLine.innerHTML += project.health;
  if (project.buildStability != null)
    {
      localLine = paraBody.insertRow(-1);
      localLine.setAttribute("class", "tableLine");
      cellLocalLine = localLine.insertCell(0);
      var localImg2 = document.createElement("img");
      if (project.buildStability != null)
        {
          if (project.buildStability > 80)
            localImg2.setAttribute("src", "../ressources/veryGoodHealth.png");
          else if (project.buildStability > 60 && project.buildStability <= 80)
            localImg2.setAttribute("src", "../ressources/goodHealth.png");
          else if (project.buildStability > 40 && project.buildStability <= 60)
            localImg2.setAttribute("src", "../ressources/mediumHealth.png");
          else if (project.buildStability > 20 && project.buildStability <= 40)
            localImg2.setAttribute("src", "../ressources/badHealth.png");
          else if (project.buildStability <= 20)
            localImg2.setAttribute("src", "../ressources/veryBadHealth.png");
        }
      else
        localImg2.setAttribute("src", "../ressources/veryGoodHealth.png");
      localImg2.setAttribute("class", "center-block");
      localImg2.setAttribute("width", "15px");
      localImg2.setAttribute("height", "15px");
      cellLocalLine.appendChild(localImg2);
      cellLocalLine = localLine.insertCell(1);
      cellLocalLine.innerHTML += project.buildStabilityDescription;
      cellLocalLine = localLine.insertCell(2);
      cellLocalLine.innerHTML += project.buildStability;
    }

  para.appendChild(paraHead);
  para.appendChild(paraBody);
  hiddenDiv.appendChild(para);
  return (hiddenDiv);
}
