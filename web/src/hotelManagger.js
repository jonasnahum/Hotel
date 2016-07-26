var Hm = (function() {
    var Hm = function(config) {
      this.config = config;
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
      // ?? doble query identifiers ? para valores.
      var callbackDatabase = function(err, connection){
        if(err)
          console.log(err);
        var str = "SELECT habitaciones.id AS hab_Id, ? AS fechaEntrada, ? AS fechaSalida, ? AS cliente, ? AS tel, ? AS correo, ? AS adultos, ? AS niños FROM habitaciones LEFT JOIN reservaciones ON habitaciones.id = reservaciones.hab_id AND ( ? between reservaciones.fechaEntrada AND reservaciones.fechaSalida OR ? between reservaciones.fechaEntrada AND reservaciones.fechaSalida OR reservaciones.fechaEntrada between ? AND ?) WHERE reservaciones.fechaEntrada IS null and habitaciones.tipo = ?";
        connection.query(str,[fechaEntrada, fechaSalida, cliente, tel, correo, adultos, niños, fechaEntrada, fechaSalida, fechaEntrada, fechaSalida, tipo],function(err,rows){
          connection.release();
          if(err)
            console.log(err);
          cb(rows);
          return;
         });
      };
      that.config.getConnection(callbackDatabase);
    };
    return Hm;
})();
module.exports = Hm;
