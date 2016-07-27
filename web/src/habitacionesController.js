module.exports = (function() {
    var HabitacionesController = function(express, habitacionesApi) {
        this.express = express.module;
        this.habitacionesApi = habitacionesApi;
        this.router = this.express.Router();

        var router = this.router;

        router.get('/', habitacionesApi.getAll.bind(habitacionesApi));
        router.get('/:id', habitacionesApi.getOne.bind(habitacionesApi));
        router.post('/', habitacionesApi.save.bind(habitacionesApi));
        router.delete('/:id', habitacionesApi.delete.bind(habitacionesApi));

    }
    return HabitacionesController;
})();
