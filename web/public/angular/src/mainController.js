(function() {
    var app = angular.module('app');
    var depArr = ['$location', '$anchorScroll'];

    depArr.push(function($location,  $anchorScroll) {
        var ctrl = this;
        ctrl.scrollTo = function(id) {
           $location.hash(id);
           $anchorScroll();
        };
    });
    app.controller('mainController', depArr);
})();
