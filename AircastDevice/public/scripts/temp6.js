function temp6Controller($scope, $window, $timeout, $http, temp6Src, callback){
	var widthMultiplier = 1;
	var heightMultiplier = 1;
	$scope.temp6VideoStyle = {
	    // "position": "absolute",
	    // "top":      "0px",
	    // "left":     "0px",
	    "width":    $window.innerWidth*widthMultiplier+"px",
	    // "height":   $window.innerHeight*heightMultiplier+"px",
	    "background-color": "black"
	}

	// $scope.temp6Src = {
	// 	video: temp6Src.video
	// }

	$timeout(function(){
		$timeout(function(){

			// var videoElements = angular.element(document.getElementById('temp2Video'));
			var videoElements = document.getElementById('temp6Video');
			// console.log('video');
			// console.log(videoElements);

			document.getElementById('temp6Video').src = temp6Src.video;



	    	// videoElements[0].play();
	    	videoElements.play();
		}, 10);
	}, 10);

	$scope.temp6VideoEnd = function(){
		callback();
	}
}