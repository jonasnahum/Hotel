(function() {
    var app = angular.module('app');

    app.controller('EmailFormController', [ '$scope','correoProxy',
                                           function($scope, correoProxy ) {

        var model = this;
        model.name = '';
        model.email = '';//el cliente que envía información
        model.phone = '';
        model.message = '';
        model.waiting = false;
        model.success = function(){
            alert('Gracias, su mensage fué enviado con éxito. Prónto nos comunicarémos con usted.');
            model.clear();
        };


        model.clear = function() {
            model.name = '';
            model.email = '';
            model.phone = '';
            model.message = '';
            model.waiting = false;
            $scope.mailForm.$setPristine();
        };

        model.send = function() {  //email del encargado de la empresa.
            correoProxy.save(model, model.success)
        };
    }]);
})();
