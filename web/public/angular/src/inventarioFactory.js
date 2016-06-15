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
                //arr.splice(i,1);
                habitacioinesParaBorrar.push(habitacionDisponible);
              }
            };
          };
          if(habitacioinesParaBorrar.length === 0){
            return arr;
          }
          return that.borrarIndicesFromArray(arr, habitacioinesParaBorrar);
        };
        InventarioClass.prototype.borrarIndicesFromArray = function(arr,habitacioinesParaBorrar){
          var arr = arr;
          for (var j = 0; j < habitacioinesParaBorrar.length; j++) {
            var index = arr.indexOf(habitacioinesParaBorrar[j]);
            if(index != -1){//si se encuentra habitacion opara borrar en el array..
               arr.splice(index, 1); //borrar esa habitacion del array.
            }
          }
          return arr;
        };


      /*    var newArr = [];
          for (var i = 0; i < arr.length; i++) {
            var habDisponible = arr[i];
            for (var j = 0; j < habitacioinesParaBorrar.length; j++) {
              var habBorrar = habitacioinesParaBorrar[j];
              if(habDisponible != habBorrar){
                newArr.push(arr[i]);
              }
              continue;
            }
          }
          return newArr;
        };*/
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
















        InventarioClass.prototype.quitarNoDeseadasDeArr = function (arr, noDeseadas){
          var arr = arr;
          var noDeseadas = noDeseadas;
          for (var i = 0; i < arr.length; i++) {
            hab = arr[i];
            for (var j = 0; j < noDeseadas.length; j++) {
              var habToDelete = noDeseadas[j];
              if(hab === habToDelete){
                  //borrar hab de arr
                  arr.splice(i,1);
              }
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

        InventarioClass.prototype._habitacionAbarcaFechasRegistradas = function(entrada,salida) {
          var that = this;
          for (var i = 0; i < that.inventario.length; i++) {
            if(that.inventario[i].reservaciones.length === 0 ){
              //habitacion no abarca fechas registradas
              continue;
            };
            if(that.inventario[i].reservaciones.fechaEntrada > entrada && that.inventario[i].reservaciones.fechaSalida < salida  ) {
              //habitacion si abarca fechas registradas
                return true;
            }
          };
          //no hay inventario.
          return false;
        };


        InventarioClass.prototype._sonIguales = function (entrada, salida) {
          var that = this;
          if(entrada === true && salida === true){
            return true
          }
          return false;
        };

        InventarioClass.prototype._conseguirArrHabitacionesDisponiblesSegunTipoYFecha = function (model){
          var that = this;
          var arr = [];
          for (var i = 0; i < that.inventario.length; i++) {
            if(that.inventario[i].tipo === model.tipo ) {
              var entradaDisponible = that._checkarDisponibilidadFechaEntradaDeseada(that.inventario[i],model.fechaEntrada);
              var salidaDisponible = that._checkarDisponibilidadFechaSalidaDeseada(that.inventario[i],model.fechaSalida);
              var abarca = that._habitacionAbarcaFechasRegistradas(model.fechaEntrada,model.fechaSalida);
              if(entradaDisponible === true && salidaDisponible === true && abarca === false){
                arr.push(that.inventario[i]);
              }
            }
          }
          return arr;
        };
/*
       InventarioClass.prototype.checkarDisponibilidadDeHabitaciones = function(model){
          var that = this;
          var arrDisponibles = that._conseguirArrHabitacionesDisponiblesSegunTipoYFecha(model);
          var cuantasQuieren = model.habitaciones;
          var cantidadHabitacionesDisponibles = arrDisponibles.length;
          if(cantidadHabitacionesDisponibles >= cuantasQuieren){
            return true;
          }
          return false;
        };
*/
        InventarioClass.prototype.guardarReservacionEnInventario = function(model,filtradas){
          var that = this;
          var cuantas = model.habitaciones;
          //arrDisponibles >= cuantas, y son del tipo deseado
          var arrDisponibles = filtradas;//that._conseguirArrHabitacionesDisponiblesSegunTipoYFecha(model);
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
