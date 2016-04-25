(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('main > section').hide();
    $('#about').fadeIn();
  };

  module.aboutController = aboutController;
})(window);
