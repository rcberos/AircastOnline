function temp5Controller($scope, $window, $timeout, $http, temp5Src, callback){
// 	$scope.testing = function(){
// 		console.log('asdasdasdasd');
// 		$window.alert($window.innerWidth);
// 	}
	var widthMultiplier = 0.66;
	var heightMultiplier = 0.66;
	$scope.temp5VideoStyle = {
	    "position": "absolute",
	    "top":      "0px",
	    "left":     "0px",
	    "width":    $window.innerWidth*widthMultiplier+"px",
	    "height":   $window.innerHeight*heightMultiplier+"px",
	    "background-color": "black"
	}
	$scope.temp5BottomStyle = {
	    "position": "absolute",
	    "top":      $window.innerHeight*heightMultiplier+"px",
	    "left":     "0px",
	    "width":    $window.innerWidth*widthMultiplier+"px",
	    "height":   $window.innerHeight*(1-heightMultiplier)+"px",
	    "background-color": "yellow",
		"background-image": 'url("images/trafficrecording.gif")',
		"background-repeat": "no-repeat",
		"background-size": "100% 100%",
	}



	$scope.temp5Side1Style = {
	    "position": "relative",
	    "top":      "0px",
	    "left":     $window.innerWidth*widthMultiplier+"px",
	    "width":    $window.innerWidth*(1-widthMultiplier)+"px",
	    "height":   $window.innerHeight*0.5+"px",
	    "background-color": "skyblue"
	}
	$scope.temp5Side2Style = {
	    "position": "absolute",
	    "top":      $window.innerHeight*0.5+"px",
	    "left":     $window.innerWidth*widthMultiplier+"px",
	    "width":    $window.innerWidth*(1-widthMultiplier)+"px",
	    "height":   $window.innerHeight*0.5+"px",
	    "background-color": "orange"
	}

	var weatherWidth = $window.innerWidth*(1-widthMultiplier);
	var weatherHeight = $window.innerHeight*0.5;
	$scope.temp5WeatherMainIcon = {
		"position": "absolute",
		"display": "block",
	    "top":      weatherHeight*0.1+"px",
	    "left":     weatherWidth*0.4+"px",
	    "font-size": weatherWidth*0.2+"px",
	    "color": "black"
	}
	$scope.temp5WeatherMainText = {
		"position": "relative",
		"display": "block",
	    "top":      weatherHeight*0.26+"px",
	    // "left":     weatherWidth*0.4+"px",
	    "text-align": "center",
	    "font-size": weatherWidth*0.07+"px",
	    "color": "black"
	}
	$scope.temp5WeatherForcast = {
		"font-size": weatherWidth*0.07+"px",
		"position": "absolute",
	    "top":      weatherHeight*0.45+"px",
	    // "left":     "10px",
	    "width":    weatherWidth+"px",
	    "height":   weatherHeight*0.1+"px",
	    // "background-color": "blue"
	}
	$scope.temp5WeatherForcast1 = {
		"font-size": weatherWidth*0.06+"px",
		"position": "absolute",
	    "top":      weatherHeight*0.60+"px",
	    // "left":     "10px",
	    "margin-left": weatherWidth*0.07+"px",
	    "width":    weatherWidth*0.43+"px",
	    "height":   weatherHeight*0.1+"px",
	    // "background-color": "blue"
	}
	$scope.temp5WeatherForcast11 = {
		"font-size": weatherWidth*0.06+"px",
		"position": "absolute",
	    "top":      weatherHeight*0.60+"px",
	    "left":     weatherWidth*0.5+"px",
	    "margin-left": weatherWidth*0.15+"px",
	    "width":    weatherWidth*0.35+"px",
	    "height":   weatherHeight*0.1+"px",
	    // "background-color": "blue"
	}
	$scope.temp5WeatherForcast2 = {
		"font-size": weatherWidth*0.06+"px",
		"position": "absolute",
	    "top":      weatherHeight*0.73+"px",
	    // "left":     "10px",
	    "margin-left": weatherWidth*0.07+"px",
	    "width":    weatherWidth*0.43+"px",
	    "height":   weatherHeight*0.1+"px",
	    // "background-color": "blue"
	}
	$scope.temp5WeatherForcast22 = {
		"font-size": weatherWidth*0.06+"px",
		"position": "absolute",
	    "top":      weatherHeight*0.73+"px",
	    "left":     weatherWidth*0.5+"px",
	    "margin-left": weatherWidth*0.15+"px",
	    "width":    weatherWidth*0.35+"px",
	    "height":   weatherHeight*0.1+"px",
	    // "background-color": "blue"
	}
	$scope.temp5WeatherForcast3 = {
		"font-size": weatherWidth*0.06+"px",
		"position": "absolute",
	    "top":      weatherHeight*0.86+"px",
	    // "left":     "10px",
	    "margin-left": weatherWidth*0.07+"px",
	    "width":    weatherWidth*0.43+"px",
	    "height":   weatherHeight*0.1+"px",
	    // "background-color": "blue"
	}
	$scope.temp5WeatherForcast33 = {
		"font-size": weatherWidth*0.06+"px",
		"position": "absolute",
	    "top":      weatherHeight*0.86+"px",
	    "left":     weatherWidth*0.5+"px",
	    "margin-left": weatherWidth*0.15+"px",
	    "width":    weatherWidth*0.35+"px",
	    "height":   weatherHeight*0.1+"px",
	    // "background-color": "blue"
	}
	$scope.temp5WeatherSpan = {
		"display": "inline-block",
	    "width":    weatherWidth*0.2+"px",
	    "height":   weatherHeight*0.1+"px",
	    // "background-color": "blue"
	}


	console.log($scope.temp5WeatherForcast);
	if(!$scope.$$phase) {
		$scope.$apply();
	}






	$scope.temp5Src = {
		// video: temp5Src.video,
		video: "images/guardian.mp4",
		// side1: temp5Src.side1,
		side2: temp5Src.side2,
		// side3: temp5Src.side3,
		// bottom: temp5Src.bottom
	}

	// $timeout(function(){}, 10);

	// var videoElements = angular.element(document.getElementById('temp1Video'));
	// console.log(videoElements);
 //    videoElements[0].play();

 	var vidCtr = 0;
 //    $timeout(function(){
	// 	$timeout(function(){
	// 		temp1VideoPlay();
	// 	}, 10);
	// }, 10);

	// $scope.$apply();
    
    console.log('hello');
	function temp5VideoPlay(){
		$scope.temp5Src.video = temp5Src.video;
		$scope.$apply();
		vidCtr++;
		var videoElements = angular.element(document.getElementById('temp5Video'));
	    		videoElements[0].play();
		// $timeout(function(){
		// 	// var videoElements = angular.element(document.getElementById('temp1Video'));
	 //  //   		videoElements[0].play();

		// 	$timeout(function(){
		// 		var videoElements = angular.element(document.getElementById('temp1Video'));
	 //    		videoElements[0].play();
		// 	}, 10);
		// }, 10);
		
	}

	  

	$scope.temp5VideoEnd = function(){
		// if(vidCtr<temp1Src.video.length)
		// 	temp1VideoPlay();
		// else
			callback();
	}

	temp5VideoPlay();

	$http({
      method : 'GET',
      url: 'http://api.openweathermap.org/data/2.5/forecast?lat=14.629701&lon=121.027937&APPID=9f534971ae41269da3bdca6da5ad3a67',
      withCredentials: false,
      headers: { 'Content-Type': 'application/json' }
    }).then(function(data){
      // d.resolve(data);
      console.log(data.data);
    	

		$scope.temp5WeatherFuture1 = {
	      	temp: (data.data.list[0].main.temp-273.15).toFixed(2)+"°C"
	      };
	      if(data.data.list[0].weather[0].main == "Clouds"){
	      	$scope.temp5WeatherFuture1.icon = "wi-day-cloudy";
	      }
	      else if(data.data.list[0].weather[0].main == "Rain"){
	      	$scope.temp5WeatherFuture1.icon = "wi-day-rain";
	      }
	      else{
	      	$scope.temp5WeatherFuture1.icon = "wi-day-sunny";
	      }

      	var date = new Date(data.data.list[0].dt*1000);
		var hours = date.getUTCHours();
		if((hours+8)<12){
			console.log((hours+8)+" AM");
			$scope.temp5WeatherFuture1.time = (hours+8)+" AM";
		}
		else if((hours+8)>24){
			console.log((hours+8-24)+" AM");
			$scope.temp5WeatherFuture1.time = (hours+8-24)+" AM";
		}
		else if((hours+8) == 24){
			console.log("12 AM");
			$scope.temp5WeatherFuture1.time = "12 AM";
		}
		else if((hours+8) == 12){
			console.log("12 AM");
			$scope.temp5WeatherFuture1.time = "12 PM";
		}
		else{
			console.log((hours+8-12)+" PM");
			$scope.temp5WeatherFuture1.time = (hours+8-12)+" PM";
		}

		$scope.temp5WeatherFuture2 = {
	      	temp: (data.data.list[1].main.temp-273.15).toFixed(2)+"°C"
	      };
	      if(data.data.list[1].weather[0].main == "Clouds"){
	      	$scope.temp5WeatherFuture2.icon = "wi-day-cloudy";
	      }
	      else if(data.data.list[1].weather[0].main == "Rain"){
	      	$scope.temp5WeatherFuture2.icon = "wi-day-rain";
	      }
	      else{
	      	$scope.temp5WeatherFuture2.icon = "wi-day-sunny";
	      }

      	var date = new Date(data.data.list[1].dt*1000);
		var hours = date.getUTCHours();
		if((hours+8)<12){
			console.log((hours+8)+" AM");
			$scope.temp5WeatherFuture2.time = (hours+8)+" AM";
		}
		else if((hours+8)>24){
			console.log((hours+8-24)+" AM");
			$scope.temp5WeatherFuture2.time = (hours+8-24)+" AM";
		}
		else if((hours+8) == 24){
			console.log("12 AM");
			$scope.temp5WeatherFuture2.time = "12 AM";
		}
		else if((hours+8) == 12){
			console.log("12 AM");
			$scope.temp5WeatherFuture2.time = "12 PM";
		}
		else{
			console.log((hours+8-12)+" PM");
			$scope.temp5WeatherFuture2.time = (hours+8-12)+" PM";
		}

		$scope.temp5WeatherFuture3 = {
	      	temp: (data.data.list[2].main.temp-273.15).toFixed(2)+"°C"
	      };
	      if(data.data.list[2].weather[0].main == "Clouds"){
	      	$scope.temp5WeatherFuture3.icon = "wi-day-cloudy";
	      }
	      else if(data.data.list[2].weather[0].main == "Rain"){
	      	$scope.temp5WeatherFuture3.icon = "wi-day-rain";
	      }
	      else{
	      	$scope.temp5WeatherFuture3.icon = "wi-day-sunny";
	      }

      	var date = new Date(data.data.list[2].dt*1000);
		var hours = date.getUTCHours();
		if((hours+8)<12){
			console.log((hours+8)+" AM");
			$scope.temp5WeatherFuture3.time = (hours+8)+" AM";
		}
		else if((hours+8)>24){
			console.log((hours+8-24)+" AM");
			$scope.temp5WeatherFuture3.time = (hours+8-24)+" AM";
		}
		else if((hours+8) == 24){
			console.log("12 AM");
			$scope.temp5WeatherFuture3.time = "12 AM";
		}
		else if((hours+8) == 12){
			console.log("12 AM");
			$scope.temp5WeatherFuture3.time = "12 PM";
		}
		else{
			console.log((hours+8-12)+" PM");
			$scope.temp5WeatherFuture3.time = (hours+8-12)+" PM";
		}

    });

	if(!$scope.$$phase) {
		$scope.$apply();
	}

    $http({
      method : 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?lat=14.629701&lon=121.027937&APPID=9f534971ae41269da3bdca6da5ad3a67',
      withCredentials: false,
      headers: { 'Content-Type': 'application/json' }
    }).then(function(data){
    	console.log('now');
      console.log(data.data);
      $scope.temp5WeatherNow = {
      	description: data.data.weather[0].description,
      	temp: (data.data.main.temp-273.15).toFixed(2)+"°C"
      };
      if(data.data.weather[0].main == "Clouds"){
      	$scope.temp5WeatherNow.icon = "wi-day-cloudy";
      }
      else if(data.data.weather[0].main == "Rain"){
      	$scope.temp5WeatherNow.icon = "wi-day-rain";
      }
      else{
      	$scope.temp5WeatherNow.icon = "wi-day-sunny";
      }
      // $scope.temp5WeatherNow
    });

}