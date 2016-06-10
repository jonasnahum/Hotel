(function() {
    var app = angular.module('app');

    app.controller('registroController', ['$http', '$location', 'inventarioFactory', function($http, $location, inventarioFactory) {

        var ctrl = this;
        ctrl.inventario = inventarioFactory();

        ctrl.model = {
          registros : [],
          fechaEntrada : '',
          fechaSalida : '',
          cliente : '',
          motivo : '',
          habitaciones : 1,
          tipo : 'sencilla',
          adultos : 1,
          ninos : 0
        };

        ctrl.clearProps =function(){
          ctrl.model.fechaEntrada = '';
          ctrl.model.fechaSalida = '';
          ctrl.model.cliente = '';
          ctrl.model.motivo = '';
          ctrl.model.habitaciones = 1;
          ctrl.model.tipo = 'sencilla';
          ctrl.model.adultos = 1;
          ctrl.model.ninos = 0;
        };

        ctrl.maxHab = function functionName() {
          var contador = 0;
          for (var i = 0; i < ctrl.inventario.inventario.length; i++) {
            var habitacion = ctrl.inventario.inventario[i];
            if (habitacion.tipo === ctrl.model.tipo)
              contador++;
          }

          return contador;
        };

        ctrl.guardar = function() {
            var model = ctrl.model;
            var result = ctrl.inventario.checkarDisponibilidadDeHabitaciones(model);
            if(result === false){
              alert("habitaciones no disponibles");
              return;
            }
            ctrl.inventario.guardarReservacionEnInventario(model);
            ctrl.clearProps();
        };
        $(function() {
            $( "#fechaEntrada" ).datepicker({
              showWeek: true,
              firstDay: 1,
              dateFormat: "mm-dd-yy"
            });
            $( "#fechaEntrada" ).change(function(){
                ctrl.model.fechaEntrada = $(this).val();
            });
            $( "#fechaSalida" ).datepicker({
              showWeek: true,
              firstDay: 1,
              dateFormat: "mm-dd-yy"
            });
            $( "#fechaSalida" ).change(function(){
                ctrl.model.fechaSalida = $(this).val();
            });
          });
    }]);

})();
