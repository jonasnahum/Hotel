var Conn = (function() {
  var Conn = function(mysql) {
        this.mysql = require('mysql');
        this.pool = this.mysql.createPool({
        connectionLimit : process.env.DBCONLIMIT || 100, //important 100connections maybe one per user.
        host: process.env.DBHOST || "localhost", //The hostname of the database you are connecting to.
        user: process.env.DBUSER || "root", //The MySQL user to authenticate as.
        password: process.env.DBPASS || "", //The password of that MySQL user.
        database: process.env.DBNAME || "hotel", //Name of the database to use for this connection (Optional).
        debug: false
      });
  };
  Conn.prototype.getConnection = function(cb) {
    var that = this;
    that.pool.getConnection(function(err, connection) {
        cb(err, connection);
    });
  }
  return Conn;
})();
module.exports = Conn;
