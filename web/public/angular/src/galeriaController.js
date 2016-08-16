(function() {
    var app = angular.module('app');

    app.controller('GaleriaController', ["$scope", function($scope) {

        var ctrl = this;
        $(function() {
          $('ul.first').bsPhotoGallery({
             "classes" : "col-lg-2 col-md-4 col-sm-3 col-xs-4 col-xxs-12",
             "hasModal" : true
          });
        });

    }]);

})();
