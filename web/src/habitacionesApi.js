//guardar la la coneccion.
var HabitacionesApi = (function() {
    var HabitacionesApi = function(config) {
        this.table = ["habitaciones"];
        this.config = config;
    };
   //curl http://localhost:3000/habitaciones/api/
   HabitacionesApi.prototype.getAll = function(req, res, next) {
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

    //curl http://localhost:3000/habitaciones/api/12
    HabitacionesApi.prototype.getOne = function(req, res, next) {
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
    //curl -i -H "Content-Type: application/json" -d '{ "numero": 1, "tipo": "sencilla" }' http://booking.weburuapan.com/habitaciones/api/
    HabitacionesApi.prototype.save = function(req, res, next){
      var that = this;
        //insertar rows a bd.
        var cbConnection = function(err, connection){
          if(err)
            console.log(err);
          var post  = {numero: req.body.numero, tipo: req.body.tipo};
          connection.query("INSERT INTO habitaciones SET ?", post, function(err,rows){
            connection.release();
             if(err) {
                console.log(err);
             } else {
               console.log(rows);
               return res.json(rows);
             }
          });
      };
      that.config.getConnection(cbConnection);
    };

    //curl -X "DELETE" http://localhost:3000/habitaciones/api/13
    HabitacionesApi.prototype.delete = function(req, res, next) {
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
    return HabitacionesApi;
})();
module.exports = HabitacionesApi;
