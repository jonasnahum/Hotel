var ReservacionesApi = (function() {
    var ReservacionesApi = function(dbConnection) {
        this.con = dbConnection.connect();
        this.table = ["reservaciones"];
    };
     //curl http://localhost:3000/reservaciones/api/
     ReservacionesApi.prototype.getAll = function(req, res, next) {
         var that = this;
         // ?? doble query identifiers ? para valores.
         that.con.query("SELECT * FROM ??",that.table,function(err,rows){
            if(err) {
                console.log(err);
            } else {
                console.log(rows);
            }
        });
      };
      //curl http://localhost:3000/reservaciones/api/3
      ReservacionesApi.prototype.getOne = function(req, res, next) {
          var that = this;
          that.con.query("SELECT * FROM ?? WHERE ID = ?",[that.table,req.params.id],function(err,rows){
            if(err)
              console.log(err);
            console.log(rows);
          });
      };
      ReservacionesApi.prototype.getRowsHabitacionesLibres = function(fechaEntrada, fechaSalida, cliente, tel, correo, adultos, niños, tipo, cuantas, cb) {
          var that = this;
          var str = "SELECT habitaciones.id AS hab_Id, ? AS fechaEntrada, ? AS fechaSalida, ? AS cliente, ? AS tel, ? AS correo, ? AS adultos, ? AS niños FROM habitaciones LEFT JOIN reservaciones ON habitaciones.id = reservaciones.hab_id AND ( ? between reservaciones.fechaEntrada AND reservaciones.fechaSalida OR ? between reservaciones.fechaEntrada AND reservaciones.fechaSalida OR reservaciones.fechaEntrada between ? AND ?) WHERE reservaciones.fechaEntrada IS null and habitaciones.tipo = ?";
          that.con.query(str,[fechaEntrada, fechaSalida, cliente, tel, correo, adultos, niños, fechaEntrada, fechaSalida, fechaEntrada, fechaSalida, tipo],function(err,rows){
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
      //curl -i -H "Content-Type: application/json" -d '{ "fechaEntrada": "2016-10-03", "fechaSalida": "2016-10-06", "cliente": "jjonas probando api", "tel": "4521652247", "correo": "jonasapi@gmail.com", "adultos": 2, "niños": 2, "tipo": "sencilla", "cuantas": 3 }' http://localhost:3000/reservaciones/api/
//checkar disponiblidad. metodo en otra clase, que cuando sea true, se ejecute un callback
//hacer reservacion.
//checkar si se debe terminar la conexion.
      ReservacionesApi.prototype.save = function(req, res, next){
          var that = this;
          var cb = function(rows){
            var arrs = [];
            for (var i = 0; i < rows.length; ++i) {
              if(arrs.length === req.body.cuantas){
                break;
              }
              var arr = [rows[i].hab_Id, rows[i].fechaEntrada,rows[i].fechaSalida,rows[i].cliente,rows[i].tel,rows[i].correo,rows[i].adultos,rows[i].niños];
              arrs.push(arr);
            }
            that.con.query("INSERT INTO reservaciones (hab_Id, fechaEntrada, fechaSalida, cliente, tel, correo, adultos, niños)  VALUES ?", [arrs], function(err,rows){
              if(err)
                console.log(err);
              console.log(rows);
            });
          };
          that.getRowsHabitacionesLibres(
            req.body.fechaEntrada,
            req.body.fechaSalida,
            req.body.cliente,
            req.body.tel,
            req.body.correo,
            req.body.adultos,
            req.body.niños,
            req.body.tipo,
            req.body.cuantas,
            cb
          );
      };

      //curl -X PUT -i -H "Content-Type: application/json" -d '{ "fechaEntrada": "2016-06-01", "fechaSalida": "2016-06-03", "cliente": "jjonas probando update", "tel": "4521652247", "correo": "jonasapi@gmail.com", "adultos": 2, "niños": 2, "tipo": "sencilla", "cuantas": 1 }'  http://localhost:3000/reservaciones/api/13
      ReservacionesApi.prototype.update = function(req, res, next){
          var that = this;
          var post = {
            fechaEntrada:req.body.fechaEntrada,
            fechaSalida:req.body.fechaSalida,
            cliente:req.body.cliente,
            tel:req.body.tel,
            correo: req.body.correo,
            adultos:req.body.adultos,
            niños: req.body.niños
          };
          that.con.query("UPDATE ?? SET ? WHERE ID = ?", [that.table, post, req.params.id], function(err,rows){
            if(err)
              console.log(err);
            console.log(rows);
          });
      };
        //curl -X "DELETE" http://localhost:3000/reservaciones/api/13
        ReservacionesApi.prototype.delete = function(req, res, next) {
            var that = this;
            that.con.query("DELETE FROM ?? WHERE ID = ?", [that.table,req.params.id], function(err,rows){
              if(err)
                console.log(err);
              console.log(rows);
            });
        };
    return ReservacionesApi;
})();
module.exports = ReservacionesApi;
