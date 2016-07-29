module.exports = (function() {
    var ReservacionesController = function(express, reservacionesApi) {
        this.express = express.module;
        this.reservacionesApi = reservacionesApi;
        this.router = this.express.Router();

        var router = this.router;

        router.get('/', reservacionesApi.getAll.bind(reservacionesApi));
        router.get('/join/', reservacionesApi.getJoin.bind(reservacionesApi));
        router.get('/:id', reservacionesApi.getOne.bind(reservacionesApi));
        router.post('/', reservacionesApi.save.bind(reservacionesApi));
        router.put('/:id', reservacionesApi.update.bind(reservacionesApi));
        router.delete('/:id', reservacionesApi.delete.bind(reservacionesApi));

    }
    return ReservacionesController;
})();
