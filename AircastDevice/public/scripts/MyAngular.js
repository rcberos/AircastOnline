angular.module('MainModule', ['ui.bootstrap', 'ui.event']);

angular
	.module('MainModule').controller('MainController', function($scope, $http, $interval){

		// $scope.playingImage = "/images/crib-1.jpg";
		// $scope.ctr = 0;
		// $scope.Images = ["/images/bot1.jpg", "/images/bot2.jpg"];
		// $scope.Images2 = ["/images/crib-1.jpg", "/images/crib-2.jpg", "/images/crib-3.jpg", "/images/crib-4.jpg", "/images/crib-5.jpg"];

		// $interval(function(){
		// 	console.log('change');
  //       	$scope.playingImage = $scope.Images[$scope.ctr];
  //       	console.log($scope.playingImage);
  //       	if($scope.ctr < $scope.Images.length -1)
  //       		$scope.ctr++;
  //       	else
  //       		$scope.ctr=0;
  //       },2000);

	
		
		$scope.change = function(){
			// $scope.playingImage = "/images/crib-2.jpg";
			$scope.Images = $scope.Images2;
		}

		$scope.area = {
			foodpark: false,
			gym: false,
			grocery: false,
			lrt: false
		};

		$scope.timeslot = {
			morning: false,
			lunch: false,
			afternoon: false,
			evening: false
		}

		$scope.setFiles = function(element) {
	    $scope.$apply(function(scope) {
	      console.log('files:', element.files);
	      // Turn the FileList object into an Array
	        $scope.files = []
	        for (var i = 0; i < element.files.length; i++) {
	          $scope.files.push(element.files[i])
	        }
	      $scope.progressVisible = false
	      });
	    };

	    $scope.videoEnded = function(){
	    	var videoElements = angular.element(document.getElementById('vidId'));
	    	console.log(videoElements);
	    	videoElements[0].src = '/images/japan.mp4';
	    	// videoElements[0].play();
	    	console.log('Video Ended');
	    }

	    $scope.subs = function(type){
	    	var lala = ['qw,e', 'asd', 'zxc'];
	    	
	    	var location = [];
	    	if($scope.area.foodpark)
	    		location.push('foodpark');
	    	if($scope.area.gym)
	    		location.push('gym');
	    	if($scope.area.grocery)
	    		location.push('grocery');
	    	if($scope.area.lrt)
	    		location.push('lrt');

	    	var time = [];
	    	if($scope.timeslot.morning)
	    		time.push('morning');
	    	if($scope.timeslot.lunch)
	    		time.push('lunch');
	    	if($scope.timeslot.afternoon)
	    		time.push('afternoon');
	    	if($scope.timeslot.evening)
	    		time.push('evening');


	    	var formData = new FormData()
	    	console.log(formData);
	    	if(type != 'TEXT'){
	    		for (var i in $scope.files) {
		            formData.set("file", $scope.files[i])
		            console.log($scope.files[i])
		        }
	    	}
	    	else{
	    		formData.set("message", $scope.textMessage)
	    	}
	        
	        formData.set("type", type)
	        formData.set("tag", $scope.CompanyTag)
	        formData.set("location", location)
	        formData.set("timeslot", time)
	        formData.set("startDate", Date.now()/1000)
	        formData.set("endDate", (Date.now()/1000+86000))
	        formData.set("week", $scope.date)
	        console.log(formData);
	        var xhr = new XMLHttpRequest()
	        xhr.open("POST", "http://localhost:3000/upload");
	        xhr.upload.addEventListener("progress", uploadProgress, false)
	        xhr.addEventListener("load", uploadComplete, false)
	        xhr.addEventListener("error", uploadFailed, false)
	        xhr.addEventListener("abort", uploadCanceled, false)
	        xhr.send(formData)


	        $scope.progressVisible = true;

	    }


	    function uploadProgress(evt) {
	        $scope.$apply(function(){
	            if (evt.lengthComputable) {
	            	console.log(evt)
	                $scope.progress = Math.round(evt.loaded * 100 / evt.total)
	            } else {
	                $scope.progress = 'unable to compute'
	            }
	        })
	    }

	    function uploadComplete(evt) {
	        /* This event is raised when the server send back a response */
	        alert(evt.target.responseText)
	        $scope.$apply(function(){
	            $scope.progressVisible = false
	        })
	    }

	    function uploadFailed(evt) {
	        alert("There was an error attempting to upload the file.")
	    }

	    function uploadCanceled(evt) {
	        $scope.$apply(function(){
	            $scope.progressVisible = false
	        })
	        alert("The upload has been canceled by the user or the browser dropped the connection.")
	    }

	});