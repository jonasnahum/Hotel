(function() {
    var app = angular.module('app');

    app.controller('ubicacionController', [ function() {

        var ctrl = this;
        var initMap = function() {
          var myLatLng = {lat: 19.4123538, lng: -102.07159817};
          var mapDiv = document.getElementById('map');
          var map = new google.maps.Map(mapDiv, {
              center: myLatLng,
              zoom: 8
          });
          var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Nombre de mi Hotel.'
          });
        }
        initMap();

    }]);
})();
