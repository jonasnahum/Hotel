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
      ReservacionesApi.prototype.getIdDeHabitacionesLibres = function(fechaEntrada, fechaSalida, tipo, cuantas) {
          var that = this;
          var str = "SELECT habitaciones.id  FROM habitaciones LEFT JOIN reservaciones ON habitaciones.id = reservaciones.hab_id and ( ? between reservaciones.fechaEntrada and reservaciones.fechaSalida OR ? between reservaciones.fechaEntrada and reservaciones.fechaSalida  OR reservaciones.fechaEntrada between ? and ?) where reservaciones.fechaEntrada is null and habitaciones.tipo = ? LIMIT ?";
          that.con.query(str,[fechaEntrada,fechaSalida, fechaEntrada, fechaSalida, tipo, cuantas],function(err,rows){
            if(err)
              console.log(err);
            console.log(rows);
          });
      };
      /*
      INSERT INTO reservaciones (hab_id,fechaEntrada,fechaSalida,cliente,tel,correo,adultos,niños)
      SELECT
          habitaciones.id,
          '2016-06-21' AS fechaEntrada,
          '2016-06-23' AS fechaSalida,
          'Jonatelo del bosque' AS cliente,
          '4521652247' AS tel,
          'jonasnahum@gmail.com' AS correo,
           2 AS adultos,
           2 AS niños
      FROM habitaciones     LEFT JOIN reservaciones
      ON habitaciones.id = reservaciones.hab_id
      AND ('2016-06-21' BETWEEN reservaciones.fechaEntrada and reservaciones.fechaSalida
      OR '2016-06-23' BETWEEN reservaciones.fechaEntrada and reservaciones.fechaSalida
      OR reservaciones.fechaEntrada BETWEEN '2016-06-21' and '2016-06-23')
      WHERE reservaciones.fechaEntrada is null and habitaciones.tipo = "sencilla" LIMIT 1;
      */
      //curl -i -H "Content-Type: application/json" -d '{ "fechaEntrada": "2016-06-01", "fechaSalida": "2016-06-03", "cliente": "jjonas probando api", "tel": "4521652247", "correo": "jonasapi@gmail.com", "adultos": 2, "niños": 2, "tipo": "sencilla", "cuantas": 1 }' http://localhost:3000/reservaciones/api/
//checkar disponiblidad. metodo en otra clase, que cuando sea true, se ejecute un callback
//hacer reservacion.
//checkar si se debe terminar la conexion.
      ReservacionesApi.prototype.save = function(req, res, next){
          var that = this;
          var str = "SELECT habitaciones.id AS hab_Id, ? AS fechaEntrada, ? AS fechaSalida, ? AS cliente, ? AS tel, ? AS correo, ? AS adultos, ? AS niños FROM habitaciones LEFT JOIN reservaciones ON habitaciones.id = reservaciones.hab_id AND ( ? between reservaciones.fechaEntrada AND reservaciones.fechaSalida OR ? between reservaciones.fechaEntrada AND reservaciones.fechaSalida OR reservaciones.fechaEntrada between ? AND ?) WHERE reservaciones.fechaEntrada IS null and habitaciones.tipo = ? LIMIT ?";
          that.con.query(str,[req.body.fechaEntrada, req.body.fechaSalida, req.body.cliente, req.body.tel, req.body.correo, req.body.adultos, req.body.niños, req.body.fechaEntrada,req.body.fechaSalida, req.body.fechaEntrada, req.body.fechaSalida, req.body.tipo, req.body.cuantas],function(err,rows){
            if(err)
              console.log(err);
            if(rows.length){
              console.log(rows)
              /*
              var post = {
                hab_Id: rows[0].id,
                fechaEntrada:req.body.fechaEntrada,
                fechaSalida:req.body.fechaSalida,
                cliente:req.body.cliente,
                tel:req.body.tel,
                correo: req.body.correo,
                adultos:req.body.adultos,
                niños: req.body.niños
              };
              */
              that.con.query("INSERT INTO ?? SET ?", [that.table,rows[0]], function(err,results,fields){
                if(err)
                  console.log(err);
                console.log(results);
              });

            }else{
              console.log("rows vacio rows vacio rowss vacioo--------------");
            };
          });
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
