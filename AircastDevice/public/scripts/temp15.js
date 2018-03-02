
function temp15Controller($scope, $window, $timeout, $http, tempSrc, callback){ 

     var config = {
        'loop':'true',
        'loopInterval': 10000,
        'animationEnter': 'flipInX',
        'animationOut' : 'flipOutX'
    }
    var loopCounter = 0;
    var interval5, interval6;
    var hugotList;

     var bgList = ['/assets/hugot-landscape-1.png',
     '/assets/hugot-landscape-2.png',
     '/assets/hugot-landscape-3.png',
     '/assets/hugot-landscape-4.png',
     '/assets/hugot-landscape-5.png'];
    
    for(var i=0; i< $scope.TemplateData.length; i++){
    		if($scope.TemplateData[i].Template == 'temp15'){
    			hugotList = $scope.TemplateData[i].TempData;
    		}
    	}

    
    var uniqueRandoms = [];
    var numRandoms = hugotList.length;
        
    //generate random number that is not repeating    
    function makeUniqueRandom() {

        if (!uniqueRandoms.length) {
            for (var i = 0; i < numRandoms; i++) {
                uniqueRandoms.push(i);
            }
        }
        var index = Math.floor(Math.random() * uniqueRandoms.length);
        console.log('index: '+index);
        var val = uniqueRandoms[index];


        uniqueRandoms.splice(index, 1);

        return val;

    }        
        function insertDataToScope() {
            
             $scope.hugotText = decode_utf8(hugotList[makeUniqueRandom()]);
             $scope.hugotBackground  = bgList[Math.floor(Math.random() * bgList.length)];

              // $scope.hugotText = hugotList[0];

              console.log($scope.hugotText);

              if(!$scope.$$phase) {
						$scope.$apply();
					}


           	 if (loopCounter == 0) {
           	 	hugotloop();
           	 	loopCounter++;
           	 }
             

             
        }

        function decode_utf8(s) {
            return s.replace(/\\/g, '');
        }

        function hugotloop(){

	         if (config.loop) {
	            
	            // insertDataToScope();
	    
	            interval5 = setInterval(function(){
	                hugotRemoveClass();
	            },config.loopInterval/2);

	            interval6 = setInterval(function(){

	                insertDataToScope();
	                hugotAddClass();
	                if(!$scope.$$phase) {
						$scope.$apply();
					}

	            },config.loopInterval);
	    
	        }       	
        }
        
        


        function hugotRemoveClass(){
            $(".hugot-text").delay(2000).removeClass(config.animationEnter);
            $(".hugot").delay(2000).removeClass("hugot-animation");
            $(".hugot-title").delay(2000).removeClass("fadeInDown");
        }

        function hugotAddClass(){
            $(".hugot-text").addClass(config.animationEnter);
            $(".hugot").addClass("hugot-animation");
            $(".hugot-title").addClass("fadeInDown");
        }
       




	function removeInterval() {

		if (interval5 != undefined && interval6 != undefined) {
			clearInterval(interval5);
			clearInterval(interval6);			
		} 


	}

	insertDataToScope();

    $timeout(removeInterval, 29000);   
    $timeout(callback, 30000);

};