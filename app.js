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
      var url = "http://api.openweathermap.org/data/2.5/forecast/daily?&cnt=4&units=imperial&q="+city+"&type=accurate&,us&mode=json&callback=JSON_CALLBACK&APPID=8aa25b237192dd69078ca44e1b1e2598"
      $http.jsonp(url)
      .then(function (response) {
        console.log(response)

        // getting city name for title
        $scope.searchedCity = response.data.city.name;

        // setting today's temperature
        $scope.temp = response.data.list[0].temp.day;

        //setting next three days forecast
        $scope.forecast = response.data.list;
        console.log("Forecast",$scope.forecast)

        // getting weather id + icons
        $scope.id = response.data.list[0].weather[0].id;
        console.log($scope.id)
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

        // get UNIX time/date
        // $scope.dt = response.data.list[1].dt;
        $scope.dt = response.data.list[1].dt;

        // convert it into human friendly date
        dt = $scope.dt
        
        function timeConverter(dt){

        var a = new Date($scope.dt * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = month + ' ' + date + ' ' +  year + ' ' + hour + ':' + min + ':' + sec ;
        var monthDay = month + ' ' + date;
          return monthDay;
      }
      console.log('')
      for (var i = 0; i < $scope.forecast.length-1; i++) {
        $scope.forecast[i].time =  timeConverter(dt);
      console.log($scope.forecast[i].time)
      };
      // $scope.time = timeConverter(dt);
      console.log(timeConverter(dt))

  //       // getting UNIX timestamp

  //         var myDate = new Date();

  // var dayOfWeek = myDate.getDate();
  // var month = myDate.getMonth();
  // var day = myDate.getDay();
  // // getDate() getMonth() getDay() 

  // // alert(dt.getDate());
  // // returns: Thu Oct 15 2015 16:23:24 GMT-0700 (PDT)


      }); //.then(function (response) {
    }; //$scope.searchCity
  }]) //controller

.filter('formattedDate', function() {
  return function (input) {
    return input.substring(5, 10).replace(/-/, '/');
  };
});
