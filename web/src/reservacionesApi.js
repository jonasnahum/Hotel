//guardar la la coneccion.
var ReservacionesApi = (function() {
    var ReservacionesApi = function(Hm, config) {
        this.hm = Hm;
        this.table = ["reservaciones"];
        this.config = config;
    };
   //curl http://localhost:3000/reservaciones/api/
   ReservacionesApi.prototype.getAll = function(req, res, next) {
       var that = this;
       // ?? doble query identifiers ? para valores.
       var cb = function(err, connection){
         if(err)
           console.log(err);
         connection.query("SELECT * FROM ??",that.table,function(err,rows){
           connection.release();
            if(err) {
                console.log(err);
            } else {
                console.log(rows);
            }
          });
       };
       that.config.getConnection(cb);
    };
    //curl http://localhost:3000/reservaciones/api/25
    ReservacionesApi.prototype.getOne = function(req, res, next) {
        var that = this;
        var cb = function(err, connection){
          if(err)
            console.log(err);
          connection.query("SELECT * FROM ?? WHERE ID = ?",[that.table,req.params.id],function(err,rows){
            connection.release();
             if(err) {
                 console.log(err);
             } else {
                 console.log(rows);
             }
           });
        };
        that.config.getConnection(cb);
    };
    //curl -i -H "Content-Type: application/json" -d '{ "fechaEntrada": "2016-12-21", "fechaSalida": "2016-12-22", "cliente": "jjonas probando api", "tel": "4521652247", "correo": "jonasapi@gmail.com", "adultos": 2, "niños": 2, "tipo": "sencilla", "cuantas": 2 }' http://localhost:3000/reservaciones/api/
    ReservacionesApi.prototype.save = function(req, res, next){
      var that = this;
      var cbForHm = function(rows){
        //insertar rows a bd.
        var cbConnection = function(err, connection){
          if(err)
            console.log(err);
          var nestedArr = [];
          nestedArr = that.hm.takeCuantasFromLibres(rows, req.body.cuantas);
          connection.query("INSERT INTO reservaciones (hab_Id, fechaEntrada, fechaSalida, cliente, tel, correo, adultos, niños)  VALUES ?", [nestedArr], function(err,rows){
            connection.release();
             if(err) {
                 console.log(err);
             } else {
                 console.log(rows);
             }
          });
        };
        that.config.getConnection(cbConnection);
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
        cbForHm
      );
    };
    //curl -X PUT -i -H "Content-Type: application/json" -d '{ "fechaEntrada": "2016-06-01", "fechaSalida": "2016-06-03", "cliente": "jjonas probando update", "tel": "4521652247", "correo": "jonasapi@gmail.com", "adultos": 2, "niños": 2, "tipo": "sencilla" }'  http://localhost:3000/reservaciones/api/25
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
      var cb = function(err, connection){
        if(err)
          console.log(err);
        connection.query("UPDATE ?? SET ? WHERE ID = ?", [that.table, post, req.params.id], function(err,rows){
          connection.release();
          if(err)
            console.log(err);
          console.log(rows);
        });
      };
      that.config.getConnection(cb);
    };
    //curl -X "DELETE" http://localhost:3000/reservaciones/api/13
    ReservacionesApi.prototype.delete = function(req, res, next) {
      var that = this;
      var cb = function(err, connection){
        if(err)
          console.log(err);
        connection.query("DELETE FROM ?? WHERE ID = ?", [that.table,req.params.id], function(err,rows){
          connection.release();
           if(err)
               console.log(err);
           console.log(rows);
        });
      };
      that.config.getConnection(cb);
    };
    return ReservacionesApi;
})();
module.exports = ReservacionesApi;
