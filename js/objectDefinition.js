/*
** JavaScript File
** Name : objectDefinition.js
** Start by: Alban Meurice
** 13/01/2017
*/

/*
** Here is declared the object "MainProject", "Project". It's use for stock information
** about a Project.
** Another object "projectHandler" is the manager for add project or get information about him.
*/

/*
** Here the constructor of the "Project" category. During the construction he fill one part of this object
** with infomation about the project.
*/

function Project(fullNameProject) {
  this.fullNameProject = fullNameProject;
  this.nameMain = null;
  this.nameVersion = null;
  this.category = null;
  this.nameSub = null;
  this.health = null;
  this.healthDescription = null;
  this.buildStability = null;
  this.buildStabilityDescription = null;
  this.color = null;
  this.documentation = null;
  this.numberBuild = null;

  if (fullNameProject.indexOf('_') != -1)
    {
      this.category = fullNameProject.substring(0, fullNameProject.indexOf('_'));
      fullNameProject = fullNameProject.substring(fullNameProject.indexOf('_') + 1);
    }
  if (fullNameProject.indexOf('_') != -1)
    {
      if (fullNameProject.indexOf("BR") != -1)
        {
          this.nameMain = fullNameProject.substring(0, fullNameProject.indexOf("BR") - 1);
          fullNameProject = fullNameProject.substring(fullNameProject.lastIndexOf("BR") + 3)

        }
      else
        {
          this.nameMain = fullNameProject.substring(0, fullNameProject.lastIndexOf('_'));
          fullNameProject = fullNameProject.substring(fullNameProject.lastIndexOf('_') + 1);
        }
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
    this.listMainProjects = [];

    this.affAllMainProjects = function () {

      var i = 0;

      console.log("Debug: Number of MainProjects is : " + this.listMainProjects.length);
      for (i = 0; i < this.listMainProjects.length; i++)
        {
          console.log("Debug: The MainProject number " + i + " is : " + this.listMainProjects[i].nameProject);
        }
    };

    this.addProject = function(project) { /* maybe this function don't work correctly */

      var i = 0;
      var ctrl = 0;

      for (i = 0; i < this.listMainProjects.length && ctrl == 0; i++)
        if (this.listMainProjects[i].nameProject == project.nameMain && this.listMainProjects[i].category == project.category)
          {
            ctrl = 1;
          }

      if (ctrl == 1)
        {
          this.listMainProjects[i-1].addChildProject(project);
        }
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
    };

    this.getAllCategoryProjects = function(category) {

      var i;
      var namesMainProjects = new Array();

      for (i = 0; i < this.listMainProjects.length; i++)
        {
          if (this.listMainProjects[i].category == category)
            namesMainProjects.push(this.listMainProjects[i].nameProject);
        }
      return (namesMainProjects);
    };

    this.getAllVersion = function(nameMain, category) {

      var i = 0;
      var tableVersion = [];

      for (i = 0; i < this.listMainProjects.length; i++)
        {
          if (this.listMainProjects[i].nameProject == nameMain && this.listMainProjects[i].category == category)
            tableVersion = this.listMainProjects[i].listProjects;
        }
      return (tableVersion);
    }

}
