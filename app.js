angular.module('weatherApp',[])

.controller('MainCtrl', ['$scope', function($scope) {
	$scope.message = {
		text: 'Last updated',
		time: new Date()
	};
}])

.directive('currentWeather', function() {
	return {
		restrict: 'AE',
		scope: {
			city: '@'
		},
		templateUrl: 'templates/currentWeather.html',
		controller: ['$scope', '$http',
			function($scope, $http) {
				var url = 'http://api.openweathermap.org/data/2.5/weather?mode=json&units=imperial&callback=JSON_CALLBACK&q='
				$scope.getWeather = function(city) {
					$http({ method: 'JSONP', url: url + city })
					.success(function(data) {
						$scope.weather = data;
					});
				}
		}],
		link: function (scope, element, attrs) {
			scope.weather = scope.getWeather(attrs.city);
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
		controller: ['$scope', '$http', function($scope, $http) {
			var url = "http://api.openweathermap.org/data/2.5/forecast?mode=json&units=imperial&callback=JSON_CALLBACK&q=";
			$scope.getForecast = function(city) {
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
			scope.weather = scope.getForecast(attrs.city);
		}
	};
})

//formats date to remove time
.filter('formattedDate', function() {
	return function (input) {
		return input.substring(5, 10).replace(/-/, '/');
	};
});