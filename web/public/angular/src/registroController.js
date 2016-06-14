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

            var porTipo = ctrl.inventario.filtrarInventariodeHabsPorTipo(model);
            if(porTipo.length === 0){
              alert("Error en tipo");
              return;
            };

            var fechaLibre_tipo = ctrl.inventario.filtrarArrPorFecha(porTipo, model);
            if(fechaLibre_tipo.length === 0){
              alert("Error en fecha");
              return;
            };

            var noAbarcan_fechaLibre_tipo = ctrl.inventario.filtrarLasQueNoAbarcan(fechaLibre_tipo, model);
            if(noAbarcan_fechaLibre_tipo.length === 0){
              alert("Error en la fecha dada puede abarcar fechas ya registradas.");
              return;
            };

            var cantidad_noAbarcan_fechaLibre_tipo = ctrl.inventario.filtrarPorCantidad(noAbarcan_fechaLibre_tipo, model);
            if(cantidad_noAbarcan_fechaLibre_tipo.length === 0){
              alert("Error en cantidad");
              return;
            };

            ctrl.inventario.guardarFiltradas(cantidad_noAbarcan_fechaLibre_tipo, model);

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
