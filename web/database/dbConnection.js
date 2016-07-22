var Conn = (function() {
  var Conn = function(mysql, config) {
      this.mysql = mysql.module;
      this.config = config;
      this.pool = this.mysql.createPool(this.config);
      this.connection = undefined;
  };
  Conn.prototype.connect = function() {
    var that = this;
    that.pool.getConnection(function(err,connection){
      if (err) {
        connection.release();
        console.log({"code" : 100, "status" : "Error in connection database"});
        return;
      }
      console.log('connected as id ' + connection.threadId);
      that.connection = connection;
      /*
      connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
      });
      */
    });
  }
  return Conn;
})();
module.exports = Conn;
