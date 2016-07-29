(function() {
    var app = angular.module('app');

    app.controller('registroController', ["$location","reservacionesProxy", function($location, reservacionesProxy) {

        var ctrl = this;
        ctrl.model = {
          cliente : '',
          tel : '',
          correo : '',
          cuantas : 1,
          tipo : 'sencilla',
          adultos : 1,
          ninos : 0,
          fechaEntrada : '',
          fechaSalida : ''
        };
        ctrl.clearProps = function(){
          ctrl.model = {
            cliente : '',
            tel : '',
            correo : '',
            cuantas : 1,
            tipo : 'sencilla',
            adultos : 1,
            ninos : 0,
            fechaEntrada : '',
            fechaSalida : ''
          };
        };

        ctrl.guardar = function() {
            reservacionesProxy.save(ctrl.model, function(data, status, headers, config){
              if(data.length<ctrl.model.cuantas){
                alert("Lo sentimos, habitaciones no disponibles, sólo hay..." + data.length);
                return;
              }
              alert("Gracias, la reservación esta hecha con los siguientes datos:\n cliente: " + ctrl.model.cliente + "\n" + " teléfono: " + ctrl.model.tel+"\n" + " correo: " + ctrl.model.correo+"\n" + " habitaciones: " + ctrl.model.cuantas+"\n" + " tipo: " + ctrl.model.tipo+"\n" );
              ctrl.clearProps();
              $location.path('/');
            });
        };

        $(function() {
            $( "#fechaEntrada" ).datepicker({
              showWeek: true,
              firstDay: 1,
              dateFormat: "yy-mm-dd"//dateFormat: "mm-dd-yy"
            });
            $( "#fechaEntrada" ).change(function(){
                ctrl.model.fechaEntrada = $(this).val();
            });
            $( "#fechaSalida" ).datepicker({
              showWeek: true,
              firstDay: 1,
              dateFormat: "yy-mm-dd"//dateFormat: "mm-dd-yy"
            });
            $( "#fechaSalida" ).change(function(){
                ctrl.model.fechaSalida = $(this).val();
            });
          });

    }]);

})();
