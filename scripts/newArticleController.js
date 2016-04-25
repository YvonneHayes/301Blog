(function(module) {
  var newArticleController = {};

  $('#article-json').on('focus', function(){
    this.select();
  });
  $('#new-form').on('change', 'input, textarea', articleView.create);

  newArticleController.index = function() {
    $('main > section').hide();
    $('#new-article').fadeIn();
    $('#export-field').hide();

  };

  module.newArticleController = newArticleController;
})(window);
