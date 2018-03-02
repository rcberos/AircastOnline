function temp28Controller($scope, $window, $timeout, $http, tempSrc, callback,$q, $sce, tempSrc){ 

	var loopCounter = 0;
	var cb = true;
	var interval37, interval38;

	var access_token = 'EAAKAyZCmFO8EBAPQVWKgotd8I6cZAnRVjZBZCy74gAXQ7zwryKOV0gWdc9LlDmYvERfq5DSy7z9X9gpmEw5NJcxbZBjEZCuLZBZAC2eOLvuevnXRNdKtC7SVmJpbV1QHzdwPOCMfkXyKfSgN3Ew9aUnllAabS988tSBq2lU4hBlxmDBeZBBTZAlrlu';
	var events = {
  		url : 'https://graph.facebook.com/search?q=manila&type=event&limit=100&access_token='+access_token,
  		eventList: {},
  		currentPosition: 1,
  		eventListLength: 0,
  		loopInterval: 20000,
  		loop: true,
      latitude: 12.8797,
      longitude: 121.7740
   	} 

    for(var i=0; i< $scope.TemplateData.length; i++){
  		if($scope.TemplateData[i].Template == 'temp28'){

  			 events.eventList = $scope.TemplateData[i].TempData.data;
         		events.currentPosition = $scope.TemplateData[i].currentPosition;
         		events.eventListLength = $scope.TemplateData[i].TempData.data.length;
  			   insertDataToScope();

  		}
	}

    	function insertDataToScope(){


    		var data = events.eventList[events.currentPosition];
    		var start_date=[];
            var end_date= [];

            setEventBackground(data.id);
            $scope.name = data.name;

            if ($scope.name.length <= 25) {
                $(".event-top .event-name h1").css("margin-top",".5em");
            }else {
                $(".event-top .event-name h1").css("margin-top","0");
            }

            if ($scope.name.length != undefined && $scope.name.length > 50) {
                $(".event-top .event-name h1").css("font-size","1.2em");
            }else {
                $(".event-top .event-name h1").css("font-size","1.6em");
            }

          try {
            if (typeof data.place.location.latitude == undefined && typeof data.place.location.longitude == undefined) {
                  events.latitude = 12.8797;
                  events.longitude = 121.7740;
            }else {
                events.latitude = data.place.location.latitude;
                events.longitude = data.place.location.longitude;
            }
          } catch(err){
                events.latitude = 12.8797;
                events.longitude = 121.7740;
            }  

            $scope.google_map = '<iframe width="100%" height="950" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAppPFcfzyJyLxd4h__Hi-dpG50oCXuc0w&q='+events.latitude+','+events.longitude+'"></iframe>';

            start_date[0] = moment(data.start_time).format('dddd, MMMM Do');
            start_date[1] = moment(data.start_time).format('hh a');

            end_date[0] = moment(data.end_time).format('dddd, MMMM Do');
            end_date[1] = moment(data.end_time).format('hh a');

            if (start_date[0] != end_date[0]) {
                $scope.starttime_text = 'Start Time:';
                $scope.endtime_text = 'End Time:';
                $scope.starttime = start_date[0] + ' at ' + start_date[1];
                $scope.endtime = end_date[0] + ' at ' + end_date[1];
                $(".facebook-events .start-time-div, .facebook-events .end-time-div").css("width","50%");
            }else {
                $scope.starttime_text = 'Start Time:';
                $scope.endtime_text = '';
                $scope.starttime = start_date[0] + ' at ' + start_date[1];
                $scope.endtime = '';
                $(".facebook-events .start-time-div, .facebook-events .end-time-div").css("width","100%");
            }

            console.log('Facebook Events: ' + events.currentPosition + '/'+events.eventListLength);
            $scope.calendar_month = moment(data.start_time).format('MMM');
            $scope.calendar_day = moment(data.start_time).format('DD');
            try {
              $scope.place = data.place.name;    
            }catch(err) {
              $scope.place = '';
            }
        	
          	$scope.description = data.description;
            $scope.fb_event_id = 'https://www.facebook.com/events/'+data.id;

           	if (loopCounter == 0) {
  		      	loop();
  		      	cb = true;
  		      	callCallback();
  		      	loopCounter++;
  		      }

    	}

    function eventsAddClass() {

          $(".event-calendar").addClass("flipInX");
          $(".event-name").addClass("flipInX");
          $(".event-date").addClass("flipInX");
          $(".event-location").addClass("flipInX");
          $(".event-bottom").addClass("flipInX");
          $(".event-id").addClass("flipInX");
          $(".facebook-logo").addClass("fadeInUp");
          
      }

      function eventsRemoveClass(){
          $(".event-calendar").removeClass("flipInX");
          $(".event-name").removeClass("flipInX");
          $(".event-date").removeClass("flipInX");
          $(".event-location").removeClass("flipInX");
          $(".event-bottom").removeClass("flipInX");
          $(".event-id").removeClass("flipInX");
          $(".facebook-logo").removeClass("fadeInUp");
      }


       function updateValues() {
        	$scope.TemplateData.forEach(function(item){
					if(item.Template == 'temp28'){
							item.currentPosition = events.currentPosition;
			    		}
				  })
        }

      function setEventBackground(id){

            $http.get('https://graph.facebook.com/'+id+'/?fields=cover&&access_token='+access_token).then(function(res){

                if ( typeof res.data.cover == undefined) {
                    $scope.event_background = '/assets/images/facebook.jpeg';
                }else {

                  try { 
                     $scope.event_background = res.data.cover.source;    
                    }catch(err){

                    }
                  }
            })
      }


    	function loop(){

	        if (events.loop) {

                interval37 = setInterval(function () {
                  eventsRemoveClass();
                }, events.loopInterval/2);
            
	              interval38 = setInterval(function () {

	                  $scope.$apply(function(){

	                    	if (events.currentPosition >= events.eventListLength-1) {
	                    		events.currentPosition = 1;
	                    	}else {
	                    		events.currentPosition++;	
	                    	}

	                    	updateValues();
	                    	insertDataToScope();
                        eventsAddClass();
	                    	
	                    });
	                    
	                }, events.loopInterval);
	            
	        }
    	}



      console.log('callback',callback);

    function removeInterval2(){

			clearInterval(interval37);
			clearInterval(interval38);		
			
		}

		function callCallback(){

      console.log('calling callback');

			if (cb) {
        console.log('calling callback inside if statement');
				$timeout(removeInterval2, 38000);      
				$timeout(callback, 40000);
        cb = false;
			}
			
		}


};