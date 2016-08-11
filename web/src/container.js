var intravenous = require("intravenous");

//local modules
var config = require('./../database/db-config');

var Hm = require("./hotelManagger");
Hm.$inject = ["config"];

var ReservacionesApi = require("./reservacionesApi");
ReservacionesApi.$inject = ["hm","config"];
var HabitacionesApi = require("./habitacionesApi");
HabitacionesApi.$inject = ["config"];
var UsuariosApi = require("./usuariosApi");
UsuariosApi.$inject = ["moment", "jwt"];

var ReservacionesController = require("./reservacionesController");
ReservacionesController.$inject = ["express", "reservacionesApi"];
var HabitacionesController = require("./habitacionesController");
HabitacionesController.$inject = ["express", "habitacionesApi"];
var UsuariosController = require("./usuariosController");
UsuariosController.$inject = ["express", "usuariosApi"];

var container = intravenous.create();

//register
container.register("hm", Hm);
container.register("reservacionesApi", ReservacionesApi);
container.register("habitacionesApi", HabitacionesApi);
container.register("usuariosApi", UsuariosApi);
container.register("reservacionesController", ReservacionesController);
container.register("habitacionesController", HabitacionesController);
container.register("usuariosController", UsuariosController);
container.register("config", config);
container.register("mysql", { module: require('mysql') });
container.register("express", { module: require('express') });
container.register("jwt", { module: require('jwt-simple') });
container.register("moment", { module: require('moment') });

module.exports = container;
