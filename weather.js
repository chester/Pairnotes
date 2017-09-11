
var weatherApp = angular.module('weatherApp', [])
    .controller('weatherController', function($scope, $http) {

        $scope.forecast = [];
        $scope.location = '';

        $http({
            method: 'GET',
            url: 'http://api.wunderground.com/api/68f84c8ff67e39bb/conditions/forecast/q/CA/94704.json'
        }).then(function successCallback(response) { // callback called asynchronously when response avaliable

            //Location: current_observation/display_location/full
            $scope.location = response.data.current_observation.display_location.full;

        }), function errorCallback(response) {

        }
    })