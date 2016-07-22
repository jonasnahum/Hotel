//doesnt return a new instance.
var Hm = (function() {
    var Hm = function(dbConnection) {
      this.dbConnection = dbConnection;
      this.con = dbConnection.connect();
    };
    Hm.prototype.takeCuantasFromLibres = function(rows, cuantas){
      var arrs = [];
      for (var i = 0; i < rows.length; ++i) {
        if(arrs.length === cuantas){
          break;
        }
        var arr = [rows[i].hab_Id, rows[i].fechaEntrada,rows[i].fechaSalida,rows[i].cliente,rows[i].tel,rows[i].correo,rows[i].adultos,rows[i].niños];
        arrs.push(arr);
      };
      return arrs;
    };

    Hm.prototype.getRowsHabitacionesLibres = function(fechaEntrada, fechaSalida, cliente, tel, correo, adultos, niños, tipo, cuantas, cb) {
        var that = this;
        var str = "SELECT habitaciones.id AS hab_Id, ? AS fechaEntrada, ? AS fechaSalida, ? AS cliente, ? AS tel, ? AS correo, ? AS adultos, ? AS niños FROM habitaciones LEFT JOIN reservaciones ON habitaciones.id = reservaciones.hab_id AND ( ? between reservaciones.fechaEntrada AND reservaciones.fechaSalida OR ? between reservaciones.fechaEntrada AND reservaciones.fechaSalida OR reservaciones.fechaEntrada between ? AND ?) WHERE reservaciones.fechaEntrada IS null and habitaciones.tipo = ?";
        that.dbConnection.connection.query(str,[fechaEntrada, fechaSalida, cliente, tel, correo, adultos, niños, fechaEntrada, fechaSalida, fechaEntrada, fechaSalida, tipo],function(err,rows){
      //    that.dbConnection.connection.release();
          if(err)
            console.log(err);
          if(rows.length >= cuantas){
            cb(rows);
            return;
          }
          if(rows.length < cuantas){
            console.log("no hay habitaciones disponibles, tu quieres..");
            console.log(cuantas);
            console.log("pero tenemos estos ids de habitaciones disponibles..");
            console.log(rows.length);
          }
        });
    };
    return Hm;
})();
module.exports = Hm;
