
function temp18Controller($scope, $window, $timeout, $http, tempSrc, callback, $q){ 

    var today = moment().format('MMM. DD, YYYY');

    var currentTime = moment().format('HH');

    var morning = ['05','06','07','08','09','10'];
    var afternoon = ['11','12','13','14','15','16','17'];
    var night = ['18','19','20','21','22','23','24'];
    var midnight = ['01','02','03','04','05'];
    var status = 'morning';

    if (morning.indexOf(currentTime) != -1) {
      status = 'morning';
    }else if (afternoon.indexOf(currentTime) != -1) {
      status = 'afternoon';
    }else if (night.indexOf(currentTime) != -1) {
      status = 'night';
    }else {
      status = 'midnight';
    }

    var data1, data2;
 
    for(var i=0; i< $scope.TemplateData.length; i++){
        if($scope.TemplateData[i].Template == 'temp18'){
          data1 = $scope.TemplateData[i].TempData[0];
          data2 = $scope.TemplateData[i].TempData[1];

          console.log('alltemp18data');
          console.log($scope.TemplateData[i].TempData);
          // insertDataToScope();
        }
      }

    weather = function() {
        var d = $q.defer();
        d.resolve(data1);
        return d.promise;

        // return data1;
    }

    weather_now = function() {
        var d = $q.defer();
        d.resolve(data2);
        return d.promise;

        // return data2;
    }

    function getGreetingTime (m) {
        var g = null; //return g

        if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.

        var split_afternoon = 12 //24hr time to split the afternoon
        var split_evening = 17 //24hr time to split the evening
        var currentHour = parseFloat(m.format("HH"));

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
        return  'icon-rain';
      }

      else if(greeting == 'evening') {
        if(x["weather"] == 'Clouds') {
          return 'icon-moon-cloud';

        }
        else {
          return 'icon-waning-crescent-moon'
        }
      }
      else {
        if(weather == 'Clouds') {
          return  'icon-sun-cloud';
        }
        else {
          return 'icon-sun';
        }
      }
    }

    weather().then(function(d){

      // var d = data1;
      if (d == 'error') {
         $(".weather-loader").fadeOut("slow");
        callback();   
      }else {

          now = weather_now().then(function(data){
            now_w = {}
            now_w["temp"] =  Math.floor(data.data.main.temp - 273.15)
            now_w["description"] = data.data.weather[0].description
            now_w["weather"] = data.data.weather[0].main
            now_w["greeting"] = getGreetingTime(moment(data.data.dt*1000))
            now_w["icon"] = get_icon(now_w["weather"], now_w["greeting"])
            now_w["currentDate"] = today
            now_w["location"] = data.data.name

            $(".weather-loader").fadeOut("slow",function(){
                $(".weather").fadeIn(); 
            });

            console.log(now_w.weather);

            var temp;

            if ((now_w["weather"] == 'Rain' || now_w["weather"] == 'thunderstorm' || now_w["weather"] == 'shower rain') && status == 'morning') {
              temp = '/assets/weather-rain-morning.png';
            }else if ((now_w["weather"] == 'Rain' || now_w["weather"] == 'thunderstorm' || now_w["weather"] == 'shower rain') && status == 'afternoon') {
              temp = '/asset//weather-rain-afternoon.png';
            }else if ((now_w["weather"] == 'Rain' || now_w["weather"] == 'thunderstorm' || now_w["weather"] == 'shower rain') && status == 'night') {
              temp = '/assets/weather-rain-night.png';
            }else if ((now_w["weather"] == 'Rain' || now_w["weather"] == 'thunderstorm' || now_w["weather"] == 'shower rain') && status == 'midnight') {
              temp = '/assets/weather-rain-night.png';
            }else if (status == 'morning') {
              temp = '/assets/weather-sun-morning.png';
            }else if (status == 'afternoon') {
              temp = '/assets/weather-sun-afternoon.png';
            }else if (status == 'night') {
              temp = '/assets/weather-sun-night.png';
            }else if (status == 'midnight') {
              temp = '/assets/weather-sun-night.png';
            }else {
              temp = '/assets/weather-sun-morning.png';
            }

            $scope.weather_background = temp;
            

            if (now_w["icon"] === 'icon-sun') {
                 now_w["animation"] = 'rotateInfinite' + ' ' + now_w["icon"];
            }else {
                 now_w["animation"] = 'leftToRight' + ' ' + now_w["icon"];
            }
            
            $scope.now_weather = now_w

          })


          conditions = []
          _.each(d.data.list, function(v) {
            x = {}

            x["temp"] = v.temp.day - 273.15
            x["day"] = moment(v.dt*1000).format('dddd')
            x["weather"] = v.weather[0].main
            x["greeting"] = getGreetingTime(moment(v.dt*1000))
            x["icon"] = get_icon(x["weather"], x["greeting"])


            conditions.push(x)
          })

          $scope.conditions = conditions

          $scope.now = moment().format('MMMM DD ddd');


      }


    });

  $timeout(callback, 15000);

};