function temp3Controller($scope, $window, $timeout, $http, temp2Src, callback, $q){

  var widthMultiplier = 1;
  var heightMultiplier = 1;
  $scope.temp3DivStyle = {
      "position": "absolute",
      "top":      "0px",
      "left":     "0px",
      "width":    $window.innerWidth*widthMultiplier+"px",
      "height":   $window.innerHeight*heightMultiplier+"px",
      "background-color": "black"
  }

  weather = function() {
        var d = $q.defer();
        $http({
          method : 'GET',
          url: 'http://api.openweathermap.org/data/2.5/forecast/daily?id=1701668&APPID=9f534971ae41269da3bdca6da5ad3a67&q=Manila&cnt=7',
          withCredentials: false,
          headers: { 'Content-Type': 'application/json' }
        }).then(function(data){
          d.resolve(data);
        });

        return d.promise;
    }

    weather_now = function() {
        var d = $q.defer();
        $http({
          method : 'GET',
          url: 'http://api.openweathermap.org/data/2.5/weather?id=1701668&APPID=9f534971ae41269da3bdca6da5ad3a67',
          withCredentials: false,
          headers: { 'Content-Type': 'application/json' }
        }).then(function(data){
          d.resolve(data);
        });

        return d.promise;
    }

    function getGreetingTime (m) {
        var g = null; //return g

        // if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.

        var split_afternoon = 12 //24hr time to split the afternoon
        var split_evening = 17 //24hr time to split the evening
        // var currentHour = parseFloat(m.format("HH"));

        var date = new Date(m);
    // Hours part from the timestamp
    var currentHour = date.getHours();
    console.log('current: '+currentHour);

        if(currentHour >= split_afternoon && currentHour <= split_evening) {
          g = "afternoon";
        } else if(currentHour >= split_evening) {
          g = "evening";
        } else {
          g = "morning";
        }

        return g;
      }

    function get_icon (weather,greeting) {
      if(weather == 'Rain') {
        return  'icon-rain'
      }

      else if(greeting == 'evening') {
        if(x["weather"] == 'Clouds') {
          return 'icon-moon-cloud'
        }
        else {
          return 'icon-waning-crescent-moon'
        }
      }
      else {
        if(weather == 'Clouds') {
          return  'icon-sun-cloud'
        }
        else {
          return 'icon-sun'
        }
      }
    }

    weather().then(function(d){

      now = weather_now().then(function(data){
        now_w = {}
        now_w["temp"] =  data.data.main.temp - 273.15
        now_w["description"] = data.data.weather[0].description
        now_w["weather"] = data.data.weather[0].main
        now_w["greeting"] = getGreetingTime(data.data.dt*1000)
        now_w["icon"] = get_icon(data.data.weather[0].main, now_w["greeting"])

        $scope.now_weather = now_w
      })


      conditions = []

      d.data.list.forEach(function(v){
        x = {}

        var months = ['Jan', 'Feb', 'Mar', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var date = new Date(v.dt*1000);
    // Hours part from the timestamp
    var currentDay = date.getDay();

        x["temp"] = v.temp.day - 273.15
        // x["day"] = moment(v.dt*1000).format('dddd')
        x["day"] = days[currentDay];
        x["weather"] = v.weather[0].main
        x["greeting"] = getGreetingTime(v.dt*1000)
        x["icon"] = get_icon(x["weather"], x["greeting"])


        conditions.push(x)
      })
      // _.each(d.data.list, function(v) {
      //   x = {}

      //   x["temp"] = v.temp.day - 273.15
      //   x["day"] = moment(v.dt*1000).format('dddd')
      //   x["weather"] = v.weather[0].main
      //   x["greeting"] = getGreetingTime(v.dt*1000)
      //   x["icon"] = get_icon(x["weather"], x["greeting"])


      //   conditions.push(x)
      // })

      $scope.conditions = conditions

      // $scope.now = moment().format('MMMM DD ddd');

    });

  
  $timeout(callback, 10000);
}