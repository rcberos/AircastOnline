function temp25Controller($scope, $window, $timeout, $http, tempSrc, callback){ 

		var guest;

       for(var i=0; i< $scope.TemplateData.length; i++){
    		if($scope.TemplateData[i].Template == 'temp25'){
    			guest = $scope.TemplateData[i].TempData;
    		}
    	}

    	$scope.guests = guest;

    $timeout(callback, 10000);

};