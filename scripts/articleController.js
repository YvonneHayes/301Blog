(function(module) {
  var articlesController = {};

  Article.createTable();
  Article.fetchAll(articleView.initIndexPage);

  articlesController.index = function() {

    $('main > section').hide();
    $('#articles').fadeIn();
    $('.admin-function').hide();  // hides New Article in menu
  };

  module.articlesController = articlesController;
})(window);
