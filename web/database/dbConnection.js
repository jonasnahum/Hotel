var Conn = (function() {
    var Conn = function(mysql, config) {
        this.mysql = mysql.module;
        this.config = config;
        this.c = undefined;
    };
  Conn.prototype.connect = function() {
      var that = this;
      that.c = that.mysql.createConnection(that.config);
      return that.c;
  };
    return Conn;
})();
module.exports = Conn;
