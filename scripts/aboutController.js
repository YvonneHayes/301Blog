// Here we again open an iife with module as a parameter. This allows us to keep everything inside in local
// scope.
(function(module) {
//An empty object named aboutController is created.
  var aboutController = {};
//the method index is called on aboutController. This is the function we called in routes.js earlier inside every page call
  aboutController.index = function() {
//Here Ajax asks for the github data. repoView index is a callback.
    repos.requestRepos(repoView.index);
  };
//This makes the aboutController object available in the window scope
  module.aboutController = aboutController;
//This ends the iife function. It also ends this exercise. Bye now! :)
})(window);
