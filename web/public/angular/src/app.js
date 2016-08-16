
(function () {
    var app = angular.module('app', ['ngRoute','ngMessages']);

    app.config(["$routeProvider", "$httpProvider", function ($router, $httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');

        $router.when("/", { templateUrl: "angular/views/index.html" })
        $router.when("/signin", { templateUrl: "angular/views/signin.html" })
        $router.when("/todas", { templateUrl: "angular/views/todas.html" })
        .otherwise({ redirectTo: "/" });
    }]);
})();
