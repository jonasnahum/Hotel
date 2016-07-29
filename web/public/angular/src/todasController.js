(function() {
    var app = angular.module('app');
    app.controller('TodasController', ['$location', 'reservacionesProxy', function($location, proxy) {
        var ctrl = this;
        ctrl.clientes = [];
        ctrl.getHumanReadable = function (str){
          if (str===null){
            return "";
          };
          return moment.utc(str).format("YYYY-MM-DD");//utc va adelante de local time, si lo despliego en local(default), será un día atras puesto que utc está a media noche.
        };
        ctrl.getAll = function(){
            proxy.getAllJoint(function(data){
                ctrl.clientes=data;
            });
        };
        ctrl.getAll();

        ctrl.delete = function (id) {
            proxy.delete(id,function(){
               $location.path('/todas');
            });
        };

    }]);
})();
