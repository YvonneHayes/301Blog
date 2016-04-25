(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('main > section').hide();
    $('#about').fadeIn();
    $('.admin-function').hide();  // hides New Article in menu
  };

  module.aboutController = aboutController;
})(window);
