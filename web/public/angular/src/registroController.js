(function() {
    var app = angular.module('app');

    app.controller('registroController', ['$http', '$location', 'inventarioFactory', function($http, $location, inventarioFactory) {

        var ctrl = this;
        ctrl.inventario = inventarioFactory();

        ctrl.registros = [];
        ctrl.fechaEntrada = '';
        ctrl.fechaSalida = '';
        ctrl.cliente = '';
        ctrl.motivo = '';
        ctrl.habitaciones = 0;
        ctrl.tipo = '';
        ctrl.adultos = 0;
        ctrl.ninos = 0;

        ctrl.clearProps =function(){
          ctrl.fechaEntrada = '';
          ctrl.fechaSalida = '';
          ctrl.cliente = '';
          ctrl.motivo = '';
          ctrl.habitaciones = 0;
          ctrl.tipo = '';
          ctrl.adultos = 0;
          ctrl.ninos = 0;
        };

        ctrl.guardar = function() {
            var model = {
              cliete:ctrl.cliente,
              motivo:ctrl.motivo,
              fechaEntrada:ctrl.fechaEntrada,
              fechaSalida:ctrl.fechaSalida,
              habitaciones:ctrl.habitaciones,
              tipo:ctrl.tipo,
              adultos:ctrl.adultos,
              ninos:ctrl.ninos
            };
            var reservadas = ctrl.inventario.crearUnArraydeHabitacionesReservadas(model.habitaciones,model.tipo);
            ctrl.inventario.removeElementsFromInventarioWithArr(reservadas);

            ctrl.registros.push(reservadas);
            ctrl.clearProps();
        };
        $(function() {
            $( "#fechaEntrada" ).datepicker({
              showWeek: true,
              firstDay: 1,
              dateFormat: "mm-dd-yy"
            });
            $( "#fechaEntrada" ).change(function(){
                ctrl.fechaEntrada = $(this).val();
            });
            $( "#fechaSalida" ).datepicker({
              showWeek: true,
              firstDay: 1,
              dateFormat: "mm-dd-yy"
            });
            $( "#fechaSalida" ).change(function(){
                ctrl.fechaSalida = $(this).val();
            });
          });
    }]);

})();
