(function() {
    var app = angular.module('app');

    app.factory('inventarioFactory', ['$window',function($window) {//singleton.

        var InventarioClass = function() {
            this.inventario = [
              {habitacion:1,tipo:"sencilla", reservaciones: []},
              {habitacion:2,tipo:"sencilla", reservaciones: []},
              {habitacion:3,tipo:"sencilla", reservaciones: []},
              {habitacion:4,tipo:"sencilla", reservaciones: []},
              {habitacion:5,tipo:"sencilla", reservaciones: []},
              {habitacion:6,tipo:"sencilla", reservaciones: []},
              {habitacion:7,tipo:"doble", reservaciones: []},
              {habitacion:8,tipo:"doble", reservaciones: []},
              {habitacion:9,tipo:"doble", reservaciones: []},
              {habitacion:10,tipo:"doble", reservaciones: []},
              {habitacion:11,tipo:"doble", reservaciones: []},
              {habitacion:13,tipo:"doble", reservaciones: []}
            ];
        };

        InventarioClass.prototype.findByRoom = function(habitacion){
            var that = this;
            var found = undefined;
            for(var i = 0; i < that.inventario.length; i++) {
                if(that.inventario[i].habitacion === habitacion) {
                    found = that.inventario[i];
                    break;
                }
            }
            return found;
        };
        InventarioClass.prototype.removeRoomFromInventario = function(obj) {
            var that = this;
            var found = that.findByRoom (obj.habitacion);
            var index = that.inventario.indexOf(found);
            that.inventario.splice(index, 1);
        };
        InventarioClass.prototype.removeElementsFromInventarioWithArr = function(arrParaBorrar){
          var that = this;
          var contadorBorradas = 0;
          for (var i = 0; i < arrParaBorrar.length; i++) {
            for (var j = 0; j < that.inventario.length; j++) {
              if(arrParaBorrar[i] === that.inventario[j]){
                that.removeRoomFromInventario(arrParaBorrar[i]);
                contadorBorradas ++;
              }
            }
          };
          return contadorBorradas;
        };

        InventarioClass.prototype.seleccionarHabitacionesDeInventario = function(cuantas, tipo){
          var that = this;
          var contador = 0;
          var seleccionadas = [];

          for (var i = 0; i < that.inventario.length; i++) {
            if(that.inventario[i].tipo === tipo && contador < cuantas){
              seleccionadas.push(that.inventario[i]);
              contador ++;
            }
          }
          return seleccionadas;
        };

        return function() {
            return new InventarioClass();
        };

    }]);
})();
