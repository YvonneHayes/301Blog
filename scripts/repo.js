(function(module) {
  var repos = {};

  repos.all = [];

  // TODO: Refactor this ajax call into a get request to the proxy end point provided by server.js.
  repos.requestRepos = function(callback) {
    $.ajax({
      url: 'https://api.github.com/users/brookr/repos' +
            '?per_page=50' +
            '&sort=updated',
      type: 'GET',
      headers: { 'Authorization': 'token ' + githubToken },
      success: function(data, message, xhr) {
        repos.all = data;
      }
    }).done(callback);
  };

  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
