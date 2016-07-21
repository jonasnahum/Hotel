var intravenous = require("intravenous");

//local modules
var config = require('./../database/db-config');
var DbConnection = require("./../database/dbConnection");
DbConnection.$inject = ["mysql", "config"];

var Hm = require("./hotelManagger");
Hm.$inject = ["dbConnection"];

var ReservacionesApi = require("./reservacionesApi");
ReservacionesApi.$inject = ["dbConnection","hm"];

var ReservacionesController = require("./reservacionesController");
ReservacionesController.$inject = ["express", "reservacionesApi"];

var container = intravenous.create();

//register
container.register("dbConnection", DbConnection);
container.register("hm", Hm);
container.register("reservacionesApi", ReservacionesApi);
container.register("reservacionesController", ReservacionesController);
container.register("config", config);
container.register("mysql", { module: require('mysql') });
container.register("express", { module: require('express') });

module.exports = container;
