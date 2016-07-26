(function() {
    var app = angular.module('app');

    app.factory('reservacionesProxy', ['proxyFactory', function(proxyFactory) {
        var proxy = proxyFactory('reservaciones/api/');
        return proxy;
    }]);
})();
