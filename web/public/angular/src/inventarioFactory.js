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

        InventarioClass.prototype._conseguirArrHabitacionesDisponiblesSegunTipo = function (model){
          var that = this;
          var arr = [];
          for (var i = 0; i < that.inventario.length; i++) {
            if(that.inventario[i].tipo === model.tipo ) {
              var entradaDisponible = that._checkarDisponibilidadFechaEntradaDeseada(that.inventario[i],model.fechaEntrada);
              var salidaDisponible = that._checkarDisponibilidadFechaSalidaDeseada(that.inventario[i],model.fechaSalida);
              if(entradaDisponible === true && salidaDisponible === true){
                arr.push(that.inventario[i]);
              }
            }
          }
          return arr;
        };

       InventarioClass.prototype.checkarDisponibilidadDeHabitaciones = function(model){
          var that = this;
          var arrDisponibles = that._conseguirArrHabitacionesDisponiblesSegunTipo(model);
          var cuantasQuieren = model.habitaciones;
          var cantidadHabitacionesDisponibles = arrDisponibles.length;
          if(cantidadHabitacionesDisponibles >= cuantasQuieren){
            return true;
          }
          return false;
        };

        InventarioClass.prototype.guardarReservacionEnInventario = function(model){
          var that = this;
          var cuantas = model.habitaciones;
          //arrDisponibles >= cuantas, y son del tipo deseado
          var arrDisponibles = that._conseguirArrHabitacionesDisponiblesSegunTipo(model);
          var inventario = that.inventario;

          var contadorDeReservacionesGuardadasEnInventario = 0;
          for (var i = 0; i < arrDisponibles.length; i++) {
            var habDisponible = arrDisponibles[i];
            for (var j = 0; j < inventario.length; j++) {
              var habInventario = inventario[j];
              if(habDisponible === habInventario && contadorDeReservacionesGuardadasEnInventario < cuantas){
                  habInventario.reservaciones.push({fechaEntrada:model.fechaEntrada,fechaSalida:model.fechaSalida});
                  contadorDeReservacionesGuardadasEnInventario ++;
                  continue;
              }
            }
          };
          return;
        };

        return function() {
            return new InventarioClass();
        };

    }]);
})();
