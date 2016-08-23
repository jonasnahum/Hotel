(function() {
    var app = angular.module('app');
    var depArr = ['$location', '$anchorScroll'];
    depArr.push(function($location,  $anchorScroll) {
        var ctrl = this;
        ctrl.area = "bienvenida";
        ctrl.scrollTo = function(id) {
           $location.hash(id);
           ctrl.area = id;
           $anchorScroll();
        };
        ctrl.isActive = function(texto) {
           if(ctrl.area === texto)
            return true;
           return false;
        };
    });
    app.controller('mainController', depArr);
})();
