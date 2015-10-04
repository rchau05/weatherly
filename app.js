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

          //description of current weather
    $scope.main = response.data.list[2].weather[0].description;
console.log(response.data.list)
          // set icon for current weather id
          $scope.id = response.data.list[2].weather[0].id;
          console.log($scope.id);
            if ($scope.id >= 200 && $scope.id <= 299){
              $scope.icon = "images/thunderstorm.png";
            }if ($scope.id >= 300 && $scope.id <= 399){
              $scope.icon = "images/drizzle.png";
            }else if ($scope.id >= 500 && $scope.id <= 599){
              $scope.icon = "images/rain.png";
            }else if ($scope.id >= 600 && $scope.id <= 699){
              $scope.icon = "images/snow.png";
            }else if ($scope.id >= 700 && $scope.id <= 799){
              $scope.icon = "images/atmosphere.png";
            }else{ ($scope.id >= 800 && $scope.id <= 899)
              $scope.icon = "images/clouds.png";
            };
        });
    }

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
          // console.log('posted', city)
          .success(function(data) {
            $scope.weather = data;
            console.log($scope.weather);
            $scope.city=''
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