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


//        QUESTIONS:      //

// Q: How does $.get() differ from $.getJSON() and $.ajax()?
// A: $.get() and $.getJSON() are simplified variations of $.ajax(). $.ajax() allows for the most customizable xhr request. $.getJSON is a request only for JSON data.  $.get() only alows GET requests (not posts, etc).

//Q: What happens due to the two chained $.done() functions?
//A: They will both be invoked. Of course not at the same time, but in the order they appear in the file/the order they are chained in.

//Q: How many .done() callbacks run?
//A: Depends on whether the request returns data or not. If it does not the second one never runs. If it does, then both run.

//Q: If no callbacks run, why not?
//A: Because the request did not return data (see question above)

//Q: If one runs, which one runs, and what determines that?
//A: If only one were to run, it would be the first one. The second one only runs if the first is complete and the data was retrieved.(see answers above)

//Q: If both callbacks run, what order do they run in? Does that order ever change - if so, under what conditions?
//A: They are run in the order that they are chained. It all depends on whether the first one is successful. First the data is assigned to repos.all (1st done) then the callback (2nd done).

//Q: Describe how repos.with() works:

  //Q: What is repos.all?
  //A: repos.all is an array of objects. It contains all the repos from github.

  //Q: What does .filter() do in general, and what does it do specifically in this code?
  //A: In general it filters the items in an array according to whatever specifications the user tells it to. The result gets put into a new array. It does not mess with the original array. That one stays intact. In this code the filter() method creates the new array and puts in it all objects that fit the attr key.

  //Q: What is the anonymous function's param repo?
  //A: It's an object that's a repo on github.

  //Q: What is repo[attr]?
  //A: It's a key in the repos object.

  //Q: What does repos.all.filter return?
  //A: This returns a new array filled with all the objects that passed the filter test.
