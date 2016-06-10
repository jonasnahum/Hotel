describe('inventario test', function() {

    beforeEach(module('app'));

    it('checkarDisponibilidadDeHabitaciones responds true when inventario.reservaciones es empty', inject(function (inventarioFactory) {
        //arrange
        var inventario = inventarioFactory();
        inventario.inventario = [
          {habitacion:1,tipo:"sencilla", reservaciones: []},
          {habitacion:2,tipo:"sencilla", reservaciones: []},
          {habitacion:3,tipo:"sencilla", reservaciones: []},
        ];
        var modelTest = {
            registros : [],
            fechaEntrada : new Date(2016, 5, 10),
            fechaSalida : new Date(2016, 5, 20),
            cliente : '',
            motivo : '',
            habitaciones : 1,
            tipo : 'sencilla',
            adultos : 1,
            ninos : 0
          };
        //act
        var result = inventario.checkarDisponibilidadDeHabitaciones(modelTest);
        expect(result).toEqual(true);
    }));

    it('checkarDisponibilidadDeHabitaciones responds true when i want all the romms availables', inject(function (inventarioFactory) {
        //arrange
        var inventario = inventarioFactory();
        inventario.inventario = [
            {habitacion:1,tipo:"sencilla", reservaciones: [{fechaEntrada:  new Date(2016, 5, 10), fechaSalida: new Date(2016, 5, 20)}]},
            {habitacion:2,tipo:"sencilla", reservaciones: [{fechaEntrada:  new Date(2016, 5, 10), fechaSalida: new Date(2016, 5, 20)}]},
            {habitacion:3,tipo:"sencilla", reservaciones: [{fechaEntrada:  new Date(2016, 5, 10), fechaSalida: new Date(2016, 5, 20)}]},
        ];

        var modelTest = {
            registros : [],
            fechaEntrada : new Date(2016, 5, 5),
            fechaSalida : new Date(2016, 5, 9),
            cliente : '',
            motivo : '',
            habitaciones : 3,
            tipo : 'sencilla',
            adultos : 1,
            ninos : 0
          };
        //act
        var result = inventario.checkarDisponibilidadDeHabitaciones(modelTest);
        expect(result).toEqual(true);
    }));

    it('checkarDisponibilidadDeHabitaciones responds true when there are ocupied rooms buy also 1 empty', inject(function (inventarioFactory) {
        //arrange
        var inventario = inventarioFactory();
        inventario.inventario = [
          {habitacion:1,tipo:"sencilla", reservaciones: [{fechaEntrada:  new Date(2016, 5, 10), fechaSalida: new Date(2016, 5, 20)}]},
          {habitacion:2,tipo:"sencilla", reservaciones: [{fechaEntrada:  new Date(2016, 5, 10), fechaSalida: new Date(2016, 5, 20)}]},
          {habitacion:3,tipo:"sencilla", reservaciones: []},
      ];
        var modelTest = {
            registros : [],
            fechaEntrada : new Date(2016, 5, 10),
            fechaSalida : new Date(2016, 5, 20),
            cliente : '',
            motivo : '',
            habitaciones : 1,
            tipo : 'sencilla',
            adultos : 1,
            ninos : 0
          };
        //act
        var result = inventario.checkarDisponibilidadDeHabitaciones(modelTest);
        expect(result).toEqual(true);
    }));

        it('checkarDisponibilidadDeHabitaciones responds true when i want a room different than the occupied ones', inject(function (inventarioFactory) {
            //arrange
            var inventario = inventarioFactory();
            inventario.inventario = [
              {habitacion:1,tipo:"sencilla", reservaciones: [{fechaEntrada:  new Date(2016, 5, 10), fechaSalida: new Date(2016, 5, 20)}]},
              {habitacion:2,tipo:"sencilla", reservaciones: [{fechaEntrada:  new Date(2016, 5, 10), fechaSalida: new Date(2016, 5, 20)}]},
              {habitacion:3,tipo:"sencilla", reservaciones: [{fechaEntrada:  new Date(2016, 5, 10), fechaSalida: new Date(2016, 5, 20)}]},
            ];
            var modelTest = {
                registros : [],
                fechaEntrada : new Date(2016, 5, 5),
                fechaSalida : new Date(2016, 5, 9),
                cliente : '',
                motivo : '',
                habitaciones : 1,
                tipo : 'sencilla',
                adultos : 1,
                ninos : 0
              };
            //act
            var result = inventario.checkarDisponibilidadDeHabitaciones(modelTest);
            expect(result).toEqual(true);
        }));
        it('checkarDisponibilidadDeHabitaciones responds true when i want different tipo of room and it is available', inject(function (inventarioFactory) {
            //arrange
            var inventario = inventarioFactory();
            inventario.inventario = [
              {habitacion:1,tipo:"sencilla", reservaciones: [{fechaEntrada:  new Date(2016, 5, 10), fechaSalida: new Date(2016, 5, 20)}]},
              {habitacion:2,tipo:"sencilla", reservaciones: [{fechaEntrada:  new Date(2016, 5, 10), fechaSalida: new Date(2016, 5, 20)}]},
              {habitacion:3,tipo:"doble", reservaciones: []},
          ];
            var modelTest = {
                registros : [],
                fechaEntrada : new Date(2016, 5, 10),
                fechaSalida : new Date(2016, 5, 20),
                cliente : '',
                motivo : '',
                habitaciones : 1,
                tipo : 'doble',
                adultos : 1,
                ninos : 0
              };
            //act
            var result = inventario.checkarDisponibilidadDeHabitaciones(modelTest);
            expect(result).toEqual(true);
        }));

        it('checkarDisponibilidadDeHabitaciones responds true when i want different tipo of room and it is available but in other date', inject(function (inventarioFactory) {
            //arrange
            var inventario = inventarioFactory();
            inventario.inventario = [
              {habitacion:1,tipo:"sencilla", reservaciones: [{fechaEntrada:  new Date(2016, 5, 10), fechaSalida: new Date(2016, 5, 20)}]},
              {habitacion:2,tipo:"sencilla", reservaciones: [{fechaEntrada:  new Date(2016, 5, 10), fechaSalida: new Date(2016, 5, 20)}]},
              {habitacion:3,tipo:"doble", reservaciones: [{fechaEntrada:  new Date(2016, 5, 10), fechaSalida: new Date(2016, 5, 20)}]},
          ];
            var modelTest = {
                registros : [],
                fechaEntrada : new Date(2016, 5, 5),
                fechaSalida : new Date(2016, 5, 9),
                cliente : '',
                motivo : '',
                habitaciones : 1,
                tipo : 'doble',
                adultos : 1,
                ninos : 0
              };
            //act
            var result = inventario.checkarDisponibilidadDeHabitaciones(modelTest);
            expect(result).toEqual(true);
        }));

        it('checkarDisponibilidadDeHabitaciones responds false when i want more dobles than the availables', inject(function (inventarioFactory) {
            //arrange
            var inventario = inventarioFactory();
            inventario.inventario = [
              {habitacion:1,tipo:"sencilla", reservaciones: [{fechaEntrada:  new Date(2016, 5, 10), fechaSalida: new Date(2016, 5, 20)}]},
              {habitacion:2,tipo:"sencilla", reservaciones: [{fechaEntrada:  new Date(2016, 5, 10), fechaSalida: new Date(2016, 5, 20)}]},
              {habitacion:3,tipo:"doble", reservaciones: [{fechaEntrada:  new Date(2016, 5, 10), fechaSalida: new Date(2016, 5, 20)}]},
          ];
            var modelTest = {
                registros : [],
                fechaEntrada : new Date(2016, 5, 5),
                fechaSalida : new Date(2016, 5, 9),
                cliente : '',
                motivo : '',
                habitaciones : 2,
                tipo : 'doble',
                adultos : 1,
                ninos : 0
              };
            //act
            var result = inventario.checkarDisponibilidadDeHabitaciones(modelTest);
            expect(result).toEqual(false);
        }));

        it('checkarDisponibilidadDeHabitaciones responds false when i want different tipo of room and it is not available', inject(function (inventarioFactory) {
            //arrange
            var inventario = inventarioFactory();
            inventario.inventario = [
              {habitacion:1,tipo:"sencilla", reservaciones: [{fechaEntrada:  new Date(2016, 5, 10), fechaSalida: new Date(2016, 5, 20)}]},
              {habitacion:2,tipo:"sencilla", reservaciones: [{fechaEntrada:  new Date(2016, 5, 10), fechaSalida: new Date(2016, 5, 20)}]},
              {habitacion:3,tipo:"doble", reservaciones: [{fechaEntrada:  new Date(2016, 5, 10), fechaSalida: new Date(2016, 5, 20)}]},
          ];
            var modelTest = {
                registros : [],
                fechaEntrada : new Date(2016, 5, 10),
                fechaSalida : new Date(2016, 5, 20),
                cliente : '',
                motivo : '',
                habitaciones : 1,
                tipo : 'doble',
                adultos : 1,
                ninos : 0
              };
            //act
            var result = inventario.checkarDisponibilidadDeHabitaciones(modelTest);
            expect(result).toEqual(false);
        }));

    it('checkarDisponibilidadDeHabitaciones responds false when inventario.reservaciones es occupied', inject(function (inventarioFactory) {
            //arrange
            var inventario = inventarioFactory();
            inventario.inventario = [
              {habitacion:1,tipo:"sencilla", reservaciones: [{fechaEntrada:  new Date(2016, 5, 10), fechaSalida: new Date(2016, 5, 20)}]},
              {habitacion:2,tipo:"sencilla", reservaciones: [{fechaEntrada:  new Date(2016, 5, 10), fechaSalida: new Date(2016, 5, 20)}]},
              {habitacion:3,tipo:"sencilla", reservaciones: [{fechaEntrada:  new Date(2016, 5, 10), fechaSalida: new Date(2016, 5, 20)}]},
            ];
            var modelTest = {
                registros : [],
                fechaEntrada : new Date(2016, 5, 10),
                fechaSalida : new Date(2016, 5, 20),
                cliente : '',
                motivo : '',
                habitaciones : 1,
                tipo : 'sencilla',
                adultos : 1,
                ninos : 0
              };
            //act
            var result = inventario.checkarDisponibilidadDeHabitaciones(modelTest);
            expect(result).toEqual(false);
        }));

        it('checkarDisponibilidadDeHabitaciones responds false when i want more rooms than inventario.lenth', inject(function (inventarioFactory) {
          //arrange
          var inventario = inventarioFactory();
          inventario.inventario = [
            {habitacion:1,tipo:"sencilla", reservaciones: []},
            {habitacion:2,tipo:"sencilla", reservaciones: []},
            {habitacion:3,tipo:"sencilla", reservaciones: []},
          ];
          var modelTest = {
              registros : [],
              fechaEntrada : new Date(2016, 5, 10),
              fechaSalida : new Date(2016, 5, 20),
              cliente : '',
              motivo : '',
              habitaciones : 6,
              tipo : 'sencilla',
              adultos : 1,
              ninos : 0
            };
          //act
          var result = inventario.checkarDisponibilidadDeHabitaciones(modelTest);
          expect(result).toEqual(false);
        }));

        it('checkarDisponibilidadDeHabitaciones responds false when i want a room with tipo unknown', inject(function (inventarioFactory) {
          //arrange
          var inventario = inventarioFactory();
          inventario.inventario = [
            {habitacion:1,tipo:"sencilla", reservaciones: []},
            {habitacion:2,tipo:"sencilla", reservaciones: []},
            {habitacion:3,tipo:"sencilla", reservaciones: []},
          ];
          var modelTest = {
              registros : [],
              fechaEntrada : new Date(2016, 5, 10),
              fechaSalida : new Date(2016, 5, 20),
              cliente : '',
              motivo : '',
              habitaciones : 6,
              tipo : 'doble',
              adultos : 1,
              ninos : 0
            };
          //act
          var result = inventario.checkarDisponibilidadDeHabitaciones(modelTest);
          expect(result).toEqual(false);
        }));
});
