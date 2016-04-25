(function(module){
  var routes = {};

  routes.setRouteMappings = function() {
    page.base('/');

    page('/', articlesController.index);
    page('about', aboutController.index);
    page('admin', adminController.index);
    page('new', newArticleController.index);

    page();
  };

  routes.setRouteMappings();

  module.routes = routes; //making it global

})(window);
