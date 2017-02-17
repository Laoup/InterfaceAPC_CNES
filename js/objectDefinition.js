/*
** JavaScript File
** Name : objectDefinition.js
** Start by: Alban Meurice
** 13/01/2017
*/

/*
** Here is declared the object "MainProject". It's use for stock information
** about a Project.
*/

function Project(fullNameProject) {
  this.fullNameProject = fullNameProject;
  this.nameMain = null;
  this.nameVersion = null;
  this.category = null;
  this.nameSub = null;
  this.health = null;
  this.color = null;
  this.documentation = null;
  this.numberBuild = null;

  if (fullNameProject.indexOf('_') != -1)
    {
      this.category = fullNameProject.substring(0, fullNameProject.indexOf('_'));
      fullNameProject = fullNameProject.substring(project.nameProject.indexOf('_'));/*+1*/
    }
  if (fullNameProject.indexOf('_') != -1)
    {
      this.nameMain = fullNameProject.substring(0, fullNameProject.indexOf('_'));
      fullNameProject = fullNameProject.substring(project.nameProject.indexOf('_'));
    }
  this.nameVersion = fullNameProject;
}

function MainProject(project) {
  this.category = project.category;
  this.nameProject = project.nameMain;
  this.listProjects = new Array();
  this.listProjects.push(project);

  this.addChildProject = function(project) {
    this.listProjects.push(project);
  }
}

function projectHandler() {
    this.listMainProjects = new Array();

    this.addProject = function(project) {

      var i;
      var ctrl = 0;

      for (i = 0; i < this.listMainProjects.length && ctrl == 0; i++)
        if (this.listMainProjects[i].nameProject == project.nameMain)
          ctrl = 1;

      if (ctrl == 1)
        this.listMainProjects[i].addChildProject(project);
      else
        {
          var mainProject = new MainProject(project);
          this.listMainProjects.push(mainProject);
        }
    };

    this.getCategoryExist = function() {

      var i;
      var category = new Array();

      for (i = 0; i < this.listMainProjects.length; i++)
        {
          if (category.indexOf(this.listMainProjects[i].category) == -1/* &&
            typeof window.tabProjects[i].category !== 'undefined' maybe useless*/)
              category.push(this.listMainProjects[i].category);
        }
      return (category);
    }
}
