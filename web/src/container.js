var intravenous = require("intravenous");

//local modules
var config = require('./../database/db-config');

var Hm = require("./hotelManagger");
Hm.$inject = ["config"];

var ReservacionesApi = require("./reservacionesApi");
ReservacionesApi.$inject = ["hm","config"];
var HabitacionesApi = require("./habitacionesApi");
HabitacionesApi.$inject = ["config"];

var ReservacionesController = require("./reservacionesController");
ReservacionesController.$inject = ["express", "reservacionesApi"];
var HabitacionesController = require("./habitacionesController");
HabitacionesController.$inject = ["express", "habitacionesApi"];

var container = intravenous.create();

//register
container.register("hm", Hm);
container.register("reservacionesApi", ReservacionesApi);
container.register("habitacionesApi", HabitacionesApi);
container.register("reservacionesController", ReservacionesController);
container.register("habitacionesController", HabitacionesController);
container.register("config", config);
container.register("mysql", { module: require('mysql') });
container.register("express", { module: require('express') });

module.exports = container;
