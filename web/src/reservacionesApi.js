var ReservacionesApi = (function() {
    var ReservacionesApi = function(dbConnection, Hm) {
        this.dbConnection = dbConnection;
        this.con = dbConnection.connect();
        this.hm = Hm;
        this.table = ["reservaciones"];
    };
     //curl http://localhost:3000/reservaciones/api/
     ReservacionesApi.prototype.getAll = function(req, res, next) {
         var that = this;
         // ?? doble query identifiers ? para valores.

         that.dbConnection.connection.query("SELECT * FROM ??",that.table,function(err,rows){
           that.dbConnection.connection.release();
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
          that.dbConnection.connection.query("SELECT * FROM ?? WHERE ID = ?",[that.table,req.params.id],function(err,rows){
            that.dbConnection.connection.release();//moved to the pool.
            if(err)
              console.log(err);
            console.log(rows);
          });
      };
      //curl -i -H "Content-Type: application/json" -d '{ "fechaEntrada": "2016-01-21", "fechaSalida": "2016-01-22", "cliente": "jjonas probando api", "tel": "4521652247", "correo": "jonasapi@gmail.com", "adultos": 2, "niños": 2, "tipo": "sencilla", "cuantas": 2 }' http://localhost:3000/reservaciones/api/
      ReservacionesApi.prototype.save = function(req, res, next){
          var that = this;
          that.dbConnection.connect();
          var nestedArr = [];
          var cb = function(rows){
            nestedArr = that.hm.takeCuantasFromLibres(rows, req.body.cuantas);
            that.dbConnection.connection.query("INSERT INTO reservaciones (hab_Id, fechaEntrada, fechaSalida, cliente, tel, correo, adultos, niños)  VALUES ?", [nestedArr], function(err,rows){
              that.dbConnection.connection.release();
              if(err)
                console.log(err);
              console.log(rows);
            });
          };
          that.hm.getRowsHabitacionesLibres(
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
          that.dbConnection.connection.query("UPDATE ?? SET ? WHERE ID = ?", [that.table, post, req.params.id], function(err,rows){
            that.dbConnection.connection.release();
            if(err)
              console.log(err);
            console.log(rows);
          });
      };
      //curl -X "DELETE" http://localhost:3000/reservaciones/api/13
      ReservacionesApi.prototype.delete = function(req, res, next) {
          var that = this;
          that.dbConnection.connection.query("DELETE FROM ?? WHERE ID = ?", [that.table,req.params.id], function(err,rows){
            that.dbConnection.connection.release();
            if(err)
              console.log(err);
            console.log(rows);
          });
      };
    return ReservacionesApi;
})();
module.exports = ReservacionesApi;
