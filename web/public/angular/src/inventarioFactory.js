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

        InventarioClass.prototype._borrarIndicesFromArray = function(arr,habitacioinesParaBorrar){
          var arr = arr;
          for (var j = 0; j < habitacioinesParaBorrar.length; j++) {
            var index = arr.indexOf(habitacioinesParaBorrar[j]);
            if(index != -1){//si se encuentra habitacion opara borrar en el array..
               arr.splice(index, 1); //borrar esa habitacion del array.
            }
          }
          return arr;
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


        InventarioClass.prototype.filtrarInventariodeHabsPorTipo = function (model){
          var that = this;
          var arr = [];
          for (var i = 0; i < that.inventario.length; i++) {
            if(that.inventario[i].tipo === model.tipo ) {
                arr.push(that.inventario[i]);
            }
          }
          return arr;
        };

        InventarioClass.prototype.filtrarArrPorFecha = function (arr, model){
          var that = this;
          var arr = arr;
          var filtradas = [];
          for (var i = 0; i < arr.length; i++) {
              var entradaDisponible = that._checkarDisponibilidadFechaEntradaDeseada(arr[i],model.fechaEntrada);
              var salidaDisponible = that._checkarDisponibilidadFechaSalidaDeseada(arr[i],model.fechaSalida);
              if(entradaDisponible === true && salidaDisponible === true){
                filtradas.push(arr[i]);
              }
          }
          return filtradas;
        };

        InventarioClass.prototype.filtrarPorCantidad = function (arr, model) {
          var arr = arr;
          var cuantas = model.habitaciones;
          var filtradas = [];
          contador = 0;

          for (var i = 0; i < arr.length; i++) {
            if(contador<cuantas){
              filtradas.push(arr[i]);
              contador++
            }
          }
          return filtradas;
        };

        InventarioClass.prototype.filtrarLasQueNoAbarcan = function(fechaLibre_tipo, model) {
          var that = this;
          var arr = fechaLibre_tipo;
          var habitacioinesParaBorrar= [];

          for (var i = 0; i < arr.length; i++) {
            var habitacionDisponible = arr[i];
            for (var j = 0; j < habitacionDisponible.reservaciones.length; j++) {
              var reservacion = habitacionDisponible.reservaciones[j];
              if( model.fechaEntrada < reservacion.fechaEntrada  &&  model.fechaSalida > reservacion.fechaSalida ) {
                habitacioinesParaBorrar.push(habitacionDisponible);
              }
            };
          };
          if(habitacioinesParaBorrar.length === 0){
            return arr;
          }
          return that._borrarIndicesFromArray(arr, habitacioinesParaBorrar);
        };

        InventarioClass.prototype.guardarFiltradas = function(filtradas, model){
          var that = this;
          var filtradas = filtradas;

          for (var i = 0; i < filtradas.length; i++) {
            var habDisponible = filtradas[i];
            for (var j = 0; j < that.inventario.length; j++) {
              var habInventario = that.inventario[j];
              if(habDisponible === habInventario){
                  habInventario.reservaciones.push({fechaEntrada:model.fechaEntrada,fechaSalida:model.fechaSalida});
                  continue;
              }
            }
          };
          return;
        };
        InventarioClass.prototype.ordenarFechas = function() {
          var that = this;
          for (var i = 0; i < that.inventario.length; i++) {
            that.inventario[i].reservaciones.sort(function(a,b){
              return new Date(a.fechaEntrada).getTime() - new Date(b.fechaEntrada).getTime();
            });
          }
        };

        return function() {
            return new InventarioClass();
        };

    }]);
})();
