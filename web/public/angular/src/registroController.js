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

        ctrl.fechasCongruentes = function functionName(fechaEntrada, fechaSalida) {
          if(fechaEntrada < fechaSalida){
            return true;
          }
          return false;
        };
        ctrl.getCurrentDate = function (){
          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth()+1; //January is 0!
          var yyyy = today.getFullYear();

          if(dd<10) {
              dd='0'+dd
          }

          if(mm<10) {
              mm='0'+mm
          }

          today = yyyy+'-'+mm+'-'+dd;
          return today;
        };
        ctrl.fechasEnFuturo = function (fechaEntrada, fechaSalida) {
          var todayString = ctrl.getCurrentDate();
          var today = new Date(todayString);//entrada y salida deben estar construidas con el mismo formato de string.
          var entrada = new Date(fechaEntrada);
          var todayMillisec = today.getTime();
          var entradaMillisec = entrada.getTime();

          if(todayMillisec <= entradaMillisec){
              return true;
          }
          return false;
        };

        ctrl.guardar = function() {
            var model = ctrl.model;

            var fc = ctrl.fechasCongruentes(model.fechaEntrada, model.fechaSalida);
            if(fc === false){
              alert("Error fecha de entrada debe ser menor a la fecha de salida.");
              return;
            };

            var ff = ctrl.fechasEnFuturo(model.fechaEntrada, model.fechaSalida);
            if(ff === false){
              alert("Error, fechas deben ser a partir de hoy y hacia el futuro.");
              return;
            };

            var porTipo = ctrl.inventario.filtrarInventariodeHabsPorTipo(model);
            if(porTipo.length === 0){
              alert("Error en tipo");
              return;
            };

            var fechaLibre_tipo = ctrl.inventario.filtrarArrPorFecha(porTipo, model);
            if(fechaLibre_tipo.length === 0){
              alert("Error, el tipo de habitación y la fecha, se encuentran ocupados.");
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
