angular.module('weatherApp',[])

.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
   $scope.weather = [];

    $scope.searchWeather = function () {
      var city = $scope.city.replace(/\s+/, '');
				var url = 'http://api.openweathermap.org/data/2.5/weather?mode=json&units=imperial&callback=JSON_CALLBACK&q=' + city;
      $http.jsonp(url)
        .then(function (response) {
          console.log(response.data);
          $scope.city = "";
          $scope.weather = response.data;
        });
    }
}])

.directive('currentWeather', function() {
	return {
		restrict: 'AE',
		replace: true,
		scope: {
			city: '@'
		},
		templateUrl: 'templates/currentWeather.html',
		controller: ['$scope', '$http',
			function($scope, $http) {
				var url = 'http://api.openweathermap.org/data/2.5/weather?mode=json&units=imperial&callback=JSON_CALLBACK&q='
				$scope.searchWeather = function(city) {
					$http({ method: 'JSONP', url: url + city })
					.then(function(response) {
						$scope.weather = response.data;
						console.log(response.data, $scope.weather.name);
						$scope.city=''
					});
				}
		}],
		link: function (scope, element, attrs) {
			scope.weather = scope.searchWeather(attrs.city);
		}
	}
})

.directive('nextThreeDayForecast', function() {
	return {
		restrict: 'AE',
		scope: {
			city: '@'
		},
		templateUrl: 'templates/nextThreeDayForecast.html',
		controller: ['$scope', '$http', 
		function($scope, $http) {
			var url = "http://api.openweathermap.org/data/2.5/forecast?mode=json&units=imperial&callback=JSON_CALLBACK&q=";
			$scope.searchWeather = function(city) {
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
			scope.weather = scope.searchWeather(attrs.city);
		}
	};
})

//formats date to remove time
.filter('formattedDate', function() {
	return function (input) {
		return input.substring(5, 10).replace(/-/, '/');
	};
});