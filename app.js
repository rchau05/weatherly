angular.module('weatherApp',[])

.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
   $scope.weather = [];

    $scope.searchCity = function () {
      var city = $scope.city.replace(/\s+/, '');
       var url = 'http://api.openweathermap.org/data/2.5/weather?mode=json&units=imperial&callback=JSON_CALLBACK&q=' + city;
      $http.jsonp(url)
        .then(function (response) {
        if (response == undefined || response == null){
          alert("No City Found!");
        } else {
          $scope.city = "";
          $scope.weather = response.data;
          console.log($scope.weather)
          }
        });
    }
    $scope.number ="123123"

}])

.directive('currentWeather', function() {
  return {
    restrict: 'AE',
    transclude: true,
    scope: {
      city: '@'
    },
    templateUrl: 'templates/currentWeather.html',
    controller: ['$scope', '$http',
      function($scope, $http) {
        var url = 'http://api.openweathermap.org/data/2.5/weather?mode=json&units=imperial&callback=JSON_CALLBACK&q='
        $scope.searchCity = function(city) {
          $http({ method: 'JSONP', url: url + city })
          .success(function(data) {
            console.log(data)
            $scope.weather = data;
            console.log($scope.weather);
            $scope.city=''
             $scope.id = data.weather[0].id;
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
          });
        }
    }],
    link: function (scope, element, attrs) {
      scope.weather = scope.searchCity(attrs.city);
    }
  }
})

.directive('nextThreeDayForecast', function() {
  return {
    restrict: 'AE',
    transclude: true,
    scope: {
      city: '@'
    },
    templateUrl: 'templates/nextThreeDayForecast.html',
    controller: ['$scope', '$http', 
    function($scope, $http) {
      var url = "http://api.openweathermap.org/data/2.5/forecast?mode=json&units=imperial&callback=JSON_CALLBACK&q=";
      $scope.searchCity = function(city) {
        $http({ method: 'JSONP', url: url + city })
        .success(function(data) {
          $scope.weather = data;
          console.log($scope.weather);
          $scope.city=''
          $scope.id = data.list[0].weather[0].id;
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
        });
        $scope.quantity = 3;
      };
      $scope.onceDaily = function(forecast) {
        return forecast.dt_txt.indexOf('09:00:00') > -1; 
      };
    }],
    link: function (scope, element, attrs) {
      scope.weather = scope.searchCity(attrs.city);
    }
  };
})

//formats date to remove time
.filter('formattedDate', function() {
  return function (input) {
    return input.substring(5, 10).replace(/-/, '/');
  };
});