/*
(function() {
    var app = angular.module('app');

    app.controller('ubicacionController', [ function() {

        var ctrl = this;
        var initMap = function() {
          var myLatLng = {lat: 19.4123538, lng: -102.07159817};
          var mapDiv = document.getElementById('map');
          var map = new google.maps.Map(mapDiv, {
              center: myLatLng,
              zoom: 15
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
*/
(function() {
    var app = angular.module('app');

    app.controller('ubicacionController', [ function() {
        var ctrl = this;

        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();
        var map;
        var gpsPosition = new google.maps.LatLng(19, -101);
        var hotelPosition = new google.maps.LatLng(19.4123538, -102.07159817);

        ctrl.initMap = function() {
            directionsDisplay = new google.maps.DirectionsRenderer();
            var mapOptions = {
              zoom: 14,
              center: hotelPosition
            }
            map = new google.maps.Map(document.getElementById("map"), mapOptions);
            directionsDisplay.setMap(map);
            var marker = new google.maps.Marker({
                position: hotelPosition,
                map: map,
                title: 'Nombre de mi Hotel.'
            });
        }
        ctrl.calcRoute = function (selectedMode) {
          var request = {
              origin: gpsPosition,
              destination: hotelPosition,
              // Note that Javascript allows us to access the constant
              // using square brackets and a string value as its
              // "property."
              travelMode: google.maps.TravelMode[selectedMode]
          };
          directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
            }
          });
        }
        ctrl.initMap();
    }]);
})();
