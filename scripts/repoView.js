//This is the start of the iife. As explained before this allows us to keep everything inside in local scope.
(function(module) {
//Here we create the new repoView object.
  var repoView = {};
//the function ui is declared. It does not take any arguments.(that sounds funny, doesn't it? lol)
  var ui = function() {
//the JQuery #about is cached in the variable $about so it can be used easily later on
    var $about = $('#about');
//This finds the unorderd list in about (the one we just cached) and empties it/removes all child elements.
    $about.find('ul').empty();
//shows the #about section and hides all its sibling elements
    $about.show().siblings().hide();
  };
//Declares a function named render that takes one parameter called repo
  var render = function(repo) {
//A list item li is created/returned
    return $('<li>')
//the li element we just created will get a tag with the the URL of a repo
      .html('<a href="' + repo.html_url + '">' + repo.full_name + '</a>');
  };
// We're creating a method on the repoView object called index. It takes no arguments.
  repoView.index = function() {
//That function we just created calls the ui function.
    ui();
//The unordered list in #about is appended to......
    $('#about ul').append(
//.....a filtered data-set (repos that have any amount of forks higher than 0) and creats a li element for each.
      repos.with('forks_count').map(render)
    );
  };
//This makes the repoView object available in the window scope
  module.repoView = repoView;
//the iife is closed
})(window);
