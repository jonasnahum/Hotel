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
*/
        InventarioClass.prototype._checkarDisponibilidadFechaEntradaDeseada = function (habitacion,fechaEntrada) {
          var that = this;
          var disponible = true;
          for (var i = 0; i < habitacion.reservaciones.length; i++) {
            //la fecha de entrada deseada se encuentra dentro de algun periodo reservado de la habitacioin?.
            if(fechaEntrada >= habitacion.reservaciones[i].fechaEntrada && fechaEntrada <= habitacion.reservaciones[i].fechaSalida){
              //se encuentra en periodo reservado, así que false, porque no está disponible.
              disponible = false;
              return disponible;
            }
          }
          return disponible;
        };
        InventarioClass.prototype._checkarDisponibilidadFechaSalidaDeseada = function (habitacion,fechaSalida) {
          var that = this;
          var disponible = true;
          for (var i = 0; i < habitacion.reservaciones.length; i++) {
            //la fecha de entrada deseada se encuentra dentro de algun periodo reservado de la habitacioin?.
            if(fechaSalida >= habitacion.reservaciones[i].fechaEntrada && fechaSalida <= habitacion.reservaciones[i].fechaSalida){
              //se encuentra en periodo reservado, así que false, porque no está disponible.
              disponible = false;
              return disponible;
            }
          }
          return disponible;
        };

        InventarioClass.prototype._sonIguales = function (entrada, salida) {
          var that = this;
          if(entrada === true && salida === true){
            return true
          }
          return false;
        };

        InventarioClass.prototype.checkarDisponibilidad = function(model){
          var that = this;
          var fechasDeseadas = {fechaEntrada: model.fechaEntrada, fechaSalida: model.fechaSalida};
          var cuantasQuieren = model.habitaciones;
          var tipo = model.tipo;

          var habitacionesDisponibles = 0;
          var contador = 0;
          for (var i = 0; i < that.inventario.length; i++) {
            if(that.inventario[i].tipo === tipo ) { //&& contador < cuantasQuieren){
              //cada habitacion del inventario filtrada por tipo y cantidad deseadas.
              var habitacion = that.inventario[i];
              var entradaDisponible = that._checkarDisponibilidadFechaEntradaDeseada(habitacion,fechasDeseadas.fechaEntrada);
              var salidaDisponible = that._checkarDisponibilidadFechaSalidaDeseada(habitacion,fechasDeseadas.fechaSalida);
              if(entradaDisponible === true && salidaDisponible === true){
                habitacionesDisponibles ++;
              }
            //  contador ++;
            }
          }

          if(habitacionesDisponibles >= cuantasQuieren){
            return true;
          }
          return false;
        };

        InventarioClass.prototype.guardarRegistroEnInventario = function(model){
          var that = this;
          var reservacion = {fechaEntrada: model.fechaEntrada, fechaSalida: model.fechaSalida};
          var cuantas = model.habitaciones;
          var tipo = model.tipo;

          var contador = 0;
          for (var i = 0; i < that.inventario.length; i++) {
            if(that.inventario[i].tipo === tipo && contador < cuantas){
              that.inventario[i].reservaciones.push(reservacion);
              contador ++;
            }
          }
          return;
        };

        return function() {
            return new InventarioClass();
        };

    }]);
})();
