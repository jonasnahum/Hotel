(function() {
    var app = angular.module('app');

    app.controller('registroController', ['$http', '$location', function($http, $location) {

        var ctrl = this;

        ctrl.registros = [];
        ctrl.fechaEntrada = '';
        ctrl.fechaSalida = '';
        ctrl.cliente = '';
        ctrl.motivo = '';
        ctrl.habitacion = 0;
        ctrl.tipo = '';
        ctrl.adultos = 0;
        ctrl.ninos = 0;
        ctrl.inventario = [
          {habitacion:1,tipo:"sencilla"},
          {habitacion:2,tipo:"sencilla"},
          {habitacion:3,tipo:"sencilla"},
          {habitacion:4,tipo:"sencilla"},
          {habitacion:5,tipo:"sencilla"},
          {habitacion:6,tipo:"doble"},
          {habitacion:7,tipo:"doble"},
          {habitacion:8,tipo:"doble"},
          {habitacion:9,tipo:"doble"},
          {habitacion:10,tipo:"doble"},
          {habitacion:11,tipo:"doble"},
          {habitacion:12,tipo:"doble"},
          {habitacion:13,tipo:"doble"}
        ];
        ctrl.clearProps =function(){
          ctrl.fechaEntrada = '';
          ctrl.fechaSalida = '';
          ctrl.cliente = '';
          ctrl.motivo = '';
          ctrl.habitacion = 0;
          ctrl.tipo = '';
          ctrl.adultos = 0;
          ctrl.ninos = 0;
        };


        ctrl.findByRoom = function(habitacion){
          var found = undefined;
          for(var i = 0; i < ctrl.inventario.length; i++) {
              if(ctrl.inventario[i].habitacion === habitacion) {
                  found = ctrl.inventario[i];
                  break;
              }
          }
          return found;
        };
        ctrl.removeRoomFromInventario = function(model) {
          var found = ctrl.findByRoom (model.habitacion);
          var index = ctrl.inventario.indexOf(found);
          ctrl.inventario.splice(index, 1);
        };

        ctrl.guardar = function() {
            var model = {
              cliete:ctrl.cliente,
              motivo:ctrl.motivo,
              fechaEntrada:ctrl.fechaEntrada,
              fechaSalida:ctrl.fechaSalida,
              habitacion:ctrl.habitacion,
              tipo:ctrl.tipo,
              adultos:ctrl.adultos,
              ninos:ctrl.ninos
            };
            ctrl.removeRoomFromInventario(model);
            ctrl.registros.push(model);
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
