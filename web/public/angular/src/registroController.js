(function() {
    var app = angular.module('app');

    app.controller('registroController', ['$http', '$location', function($http, $location) {

        var ctrl = this;

        ctrl.registros = [];
        ctrl.fechaEntrada = '';
        ctrl.fechaSalida = '';
        ctrl.cliente = '';
        ctrl.motivo = '';

        ctrl.inventario = [
          {cuarto:1,tipo:1},
          {cuarto:2,tipo:1},
          {cuarto:3,tipo:1},
          {cuarto:4,tipo:1},
          {cuarto:5,tipo:1},
          {cuarto:6,tipo:2},
          {cuarto:7,tipo:2},
          {cuarto:8,tipo:2},
          {cuarto:9,tipo:2},
          {cuarto:10,tipo:2},
          {cuarto:11,tipo:3},
          {cuarto:12,tipo:3},
          {cuarto:13,tipo:3}
        ];

        ctrl.guardar = function() {
            var model = {
              cliete:ctrl.cliente,
              motivo:ctrl.motivo,
              fechaEntrada:ctrl.fechaEntrada,
              fechaSalida:ctrl.fechaSalida
            };
            ctrl.registros.push(model);
            alert("registro guardado");
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
