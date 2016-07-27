(function() {
    var app = angular.module('app');

    app.factory('correoProxy', ['proxyFactory', function(proxyFactory) {
        var proxy = proxyFactory('/correo');
        return proxy;
    }]);
})();
