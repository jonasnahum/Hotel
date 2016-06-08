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
        ctrl.habitaciones = 1;
        ctrl.tipo = 'sencilla';
        ctrl.adultos = 1;
        ctrl.ninos = 0;

        ctrl.clearProps =function(){
          ctrl.fechaEntrada = '';
          ctrl.fechaSalida = '';
          ctrl.cliente = '';
          ctrl.motivo = '';
          ctrl.habitaciones = 1;
          ctrl.tipo = 'sencilla';
          ctrl.adultos = 1;
          ctrl.ninos = 0;
        };
        ctrl._agregarUnRegistro = function(seleccionadas){
          if(seleccionadas.length){
            ctrl.registros.push(seleccionadas);
            return;
          }else{
            alert("No hay habitaciones disponibles");
            return;
          };
          return;
        };

        ctrl.maxHab = function functionName() {
          var contador = 0;
          for (var i = 0; i < ctrl.inventario.inventario.length; i++) {
            var habitacion = ctrl.inventario.inventario[i];
            if (habitacion.tipo === ctrl.tipo)
              contador++;
          }

          return contador;
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
            var seleccionadas = ctrl.inventario.seleccionarHabitacionesDeInventario(model.habitaciones,model.tipo);
            ctrl.inventario.removeElementsFromInventarioWithArr(seleccionadas);
            ctrl._agregarUnRegistro(seleccionadas);
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
