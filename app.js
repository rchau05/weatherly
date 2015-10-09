angular.module('weatherly', ['ngRoute'])

  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/templates/search.html',
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
      console.log(city)
      var url = 'http://api.openweathermap.org/data/2.5/weather?mode=json&units=imperial&callback=JSON_CALLBACK&q=' + city
      $http.jsonp(url)
      .then(function (response) {
        console.log(response)
        $scope.weather = response.data
        console.log($scope.weather)
        $scope.id = response.data.weather[0].id;
        // console.log($scope.id)
        if ($scope.id >= 200 && $scope.id <= 299){
          $scope.icon = "thunderstorm.png";
        }if ($scope.id >= 300 && $scope.id <= 399){
          $scope.icon = "drizzle.png";
        }else if ($scope.id >= 500 && $scope.id <= 599){
          $scope.icon = "rain.png";
        }else if ($scope.id >= 600 && $scope.id <= 699){
          $scope.icon = "snow.png";
        }else if ($scope.id >= 700 && $scope.id <= 799){
          $scope.icon = "atmosphere.png";
        }else{ ($scope.id >= 800 && $scope.id <= 899)
          $scope.icon = "clouds.png";
        };

        var weatherUrl = "http://api.openweathermap.org/data/2.5/forecast?mode=json&units=imperial&callback=JSON_CALLBACK&q=" + city;
        $http.jsonp(weatherUrl)
        .then(function (response) {
          console.log(response)
          $scope.quantity = 3;
          $scope.forecasts=[]
          $scope.forecasts.push(response.data.list[2], response.data.list[10], response.data.list[18])
          console.log($scope.forecasts)
          $scope.onceDaily = function(forecasts) {
            return forecasts.dt_txt.indexOf('09:00:00') > -1; 
          }; //$scope.onceDaily = function(forecasts) 
        }); //.then(function(response))
      }); //.then(function (response) {
    }; //$scope.searchCity
  }]) //controller

.filter('formattedDate', function() {
  return function (input) {
    return input.substring(5, 10).replace(/-/, '/');
  };
});