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
            //la fecha de salida deseada se encuentra dentro de algun periodo reservado de la habitacioin?.
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
          for (var i = 0; i < that.inventario.length; i++) {
            if(that.inventario[i].tipo === tipo ) {
              //cada habitacion del inventario filtrada por tipo, aunque puede estar o no ocupada.
              var habitacion = that.inventario[i];
              var entradaDisponible = that._checkarDisponibilidadFechaEntradaDeseada(habitacion,fechasDeseadas.fechaEntrada);
              var salidaDisponible = that._checkarDisponibilidadFechaSalidaDeseada(habitacion,fechasDeseadas.fechaSalida);
              if(entradaDisponible === true && salidaDisponible === true){
                habitacionesDisponibles ++;
              }
            }
          }
          if(habitacionesDisponibles >= cuantasQuieren){
            return true;
          }
          return false;
        };

        InventarioClass.prototype.guardarReservacionEnInventario = function(model){
          var that = this;
          var reservacion = {fechaEntrada: model.fechaEntrada, fechaSalida: model.fechaSalida};
          var cuantas = model.habitaciones;
          var tipo = model.tipo;

          var contador = 0;
          for (var i = 0; i < that.inventario.length; i++) {
            //si la habitacion del inventario es del tipo deseado , y esta disponible, agregar las deseadas.
            var habitacion = that.inventario[i];
            if(habitacion.tipo === tipo && contador < cuantas && that._checkarDisponibilidadFechaEntradaDeseada(habitacion,reservacion.fechaEntrada) && that._checkarDisponibilidadFechaSalidaDeseada(habitacion,reservacion.fechaSalida)){
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
