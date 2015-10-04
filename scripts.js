

angular.module('weatherApp', ['ngRoute'])

  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/currentWeather.html',
        // templateUrl: 'templates/nextThreeDayForecast.html',
        controller: 'MainCtrl'
      })

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }])

  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.searchCity = function () {
      var city = $scope.city.replace(/\s+/, '');
      var url = 'http://api.openweathermap.org/data/2.5/weather?mode=json&units=imperial&callback=JSON_CALLBACK&q=' + city
      $http.jsonp(url)
        .then(function (response) {
          console.log(response.data);
          $scope.city = '';
        })
    }
  }]);