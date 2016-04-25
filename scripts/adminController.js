(function(module) {
  var adminController = {};

  adminController.index = function() {
    $('main > section').hide();
    $('#admin').fadeIn();
    $('.admin-function').attr("style", "display: inline !important"); // show New Article in menu
    articleView.initAdminPage();
  };

  module.adminController = adminController;
})(window);
