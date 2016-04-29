// Here we open an iife with module as a parameter. This allows us to keep everything inside in local
// scope.
(function(module) {
//Here we create an empty object to the repos variable. It will be filled in later and exported
  var repos = {};
//Creating an empty array to repos.all. This will be filled with all the objects we get from json query.
  repos.all = [];
//a method on repos object creating a function with a callback.
  repos.requestRepos = function(callback) {
//Here we have a AJAX get request with the URL that leads to the github repos and extra info on how to diplay the info once we got it
    $.get('/github/user/repos' + '?per_page=100' + '&sort=updated')
//If get request is both complete and successful the received data is sent to the empty array (repos.all).
    .done(function(data, message, xhr) { repos.all = data; })
//If the avove step was successful and has been finished the callback function is executed (the one from repos.requestRepos)
    .done(callback);
  };
//This makes a method on repos that takes attr as a parameter
  repos.with = function(attr) {
//This returns a filtered version of the repos.all array
    return repos.all.filter(function(repo) { return repo[attr]; });
  };
//This makes the repos object available in the window scope
  module.repos = repos;
//Closing of iife function with window as argument  
})(window);
