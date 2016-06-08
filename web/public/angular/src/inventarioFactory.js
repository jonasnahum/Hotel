(function() {
    var app = angular.module('app');

    app.factory('inventarioFactory', ['$window',function($window) {//singleton.

        var InventarioClass = function() {
            this.inventario = [
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
          /*
          for (var i = 0; i < that.inventario.length; i++) {
            var objDelInventario = that.inventario[i];
            for (var j = 0; j < arrParaBorrar.length; j++) {
              var objDeArrayParaBorrar = arrParaBorrar[j];
              if(objDeArrayParaBorrar === objDelInventario){
                that.removeRoomFromInventario(objDeArrayParaBorrar);
                contadorBorradas ++;
              }
            }
          };
          */
          return contadorBorradas;
        };

        InventarioClass.prototype.crearUnArraydeHabitacionesReservadas = function(cuantas, tipo){
          var that = this;
          var contador = 0;
          var reservadas = [];

          for (var i = 0; i < that.inventario.length; i++) {
            var arr = that.inventario;
            var obj = arr[i];
            if(arr[i].tipo === tipo && contador < cuantas){
              reservadas.push(arr[i]);
              contador ++;
            }
          }
          return reservadas;
        };
        /*
        InventarioClass.prototype.getNewArr= function(cuantas, tipo){
          var that = this;
          that.cuantas = cuantas;
          that.tipo = tipo;
          that.inventario.forEach(that.crearUnArray);
        };
/*
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

        InventarioClass.prototype.removeRoomFromInventario = function(model) {
            var that = this;
            var found = that.findByRoom (model.habitacion);
            var index = that.inventario.indexOf(found);
            that.inventario.splice(index, 1);
        };
*/
/*
        InventarioClass.prototype.findHabs = function(noHabitaciones, tipo){
            var that = this;
            var habitaciones = [];
            for(var i = 0; i < that.inventario.length; i++) {
                if(that.inventario[i].tipo === tipo) {
                  for(var j = 0; j < noHabitaciones; j++) {
                      habitaciones.push(that.inventario[i];)
                  }
                }
            }
            return habitacioines;
        };

        InventarioClass.prototype.removeRoomFromInventario = function(model) {
            var that = this;
            var noHabitaciones = model.habitaciones;
            var tipo = model.tipo;
            var found = that.findHabs (noHabitaciones, tipo);
            var index = that.inventario.indexOf(found);
            that.inventario.splice(index, 1);
        };
*/
        return function() {
            return new InventarioClass();
        };

    }]);
})();
