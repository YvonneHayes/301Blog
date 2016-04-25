(function(module) {
  var articlesController = {};

  Article.createTable();
  Article.fetchAll(articleView.initIndexPage);
  
  articlesController.index = function() {

    $('main > section').hide();
    $('#articles').fadeIn();
  };

  module.articlesController = articlesController;
})(window);
