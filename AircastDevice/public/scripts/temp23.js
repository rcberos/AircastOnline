function temp23Controller($scope, $window, $timeout, $http, tempSrc, callback){ 
	
    
	/*        sample data
	        makati -> lat: 14.5547 long: 121.0244
	        quezon -> lat: 14.6760 long: 121.0437
	        pasay -> lat: 14.5378 long: 121.0014
	        mendiola -> lat: 14.598718 long: 120.992822
	*/

	    var restaurantList = [];
	    var restaurantNameList = [];
	    var tempCount, counter = 0;
	    var temp, restaurantData;
	    var loopCounter = 0;
	    var cb = false;
	    var interval3, interval4;
	        
	        
	    var config = {
	        'lat': 14.609695,
	        'long': 121.0747,
	        'loopStore': false,
	        'loopInterval': 10000,
	        'imgList': ['/assets/sample-image.jpg','/assets/one.jpeg','/assets/two.jpeg','/assets/three.jpeg','/assets/four.jpeg','/assets/five.jpeg'],
	        'bgList':  { 'general':'/assets/bg_universal.png', 'korean':'/assets/bg_jap_kor.png', 'asian':'/assets/bg_asian.png' },
	        'calculateKm': function(lat1, lon1, lat2, lon2){
	                var R = 6371; // km
	                var dLat = config.toRad(lat2 - lat1);
	                var dLon = config.toRad(lon2 - lon1);
	                var lat1 = config.toRad(lat1);
	                var lat2 = config.toRad(lat2);

	                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
	                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	                var d = R * c;
	                return d;
	        },
	        'toRad': function toRad(Value) {
	            return Value * Math.PI / 180;
	        },
	        'zomatoConfig':  {
	            headers : {
	                'user-key': '1e3481187e26de091dfdb5f7f768312a',
	                'Accept': 'application/json;odata=verbose'
	            }   
	        }
	    };

	    config.url = 'https://developers.zomato.com/api/v2.1/geocode?lat=' + config.lat + '&lon=' + config.long;

		    $("#rateYo").rateYo({
		        starWidth: "25px",
		    });


	        for(var i=0; i< $scope.TemplateData.length; i++){
	    		if($scope.TemplateData[i].Template == 'temp23'){
	    			restaurantData = $scope.TemplateData[i].TempData;
	    			console.log('ppumasok dito');
	    			insertDataToScope();
	    		}
	    	}
    	
	      //insert all the data to the angular $scope
	      function insertDataToScope() {
	          
	          $(".restaurant-loader").fadeOut("slow",function(){
	              
	              var nearbyResto = restaurantData;
	              var storeCount = nearbyResto.length - 1;
	              var currentPosition =  parseInt(localStorage.getItem('restaurant-position')) || 0;
	              var bg = config.bgList.general;

	              if (localStorage.getItem('restaurant-position') === null) {
	                  currentPosition = 1;
	              }

	              //getting the data ready
	              var storePosition = currentPosition;
	              console.log("current position: " + storePosition + "/" + storeCount);
	              var store = nearbyResto[storePosition].restaurant;
	              var distanceLatitude = store.location.latitude;
	              var distanceLongitude = store.location.longitude;

	              //information from the specific store
	              var name = store.name;
	              var featuredImage = store.featured_image;
	              var cuisines = store.cuisines;

	              //this will change the background image at the cuisines section of the webpage
	              //this will vary based on the cuisines listed in the resto
	              bg = bgCheck(cuisines);

	              //some resto doesn't have featured_image, this will kick in ir featured_image is empty and will provide a local image in the dir
	              if (featuredImage == "") {

	                  var i = Math.floor((Math.random() * 5));
	                  featuredImage = config.imgList[i];

	              }

	              //variables for store data
	              var address = store.location.address;
	              var distance = config.calculateKm(config.lat, config.long, distanceLatitude, distanceLongitude).toFixed(2) + " km away";
	              var rating = store.user_rating.aggregate_rating + "/5.0";
	              var votes = "(" + store.user_rating.votes + " Votes)";
	              var ratingRaw = store.user_rating.aggregate_rating;

	              //putting data of store inside the $scope variable
	              $scope.data = {
	                  'storePosition': storePosition,
	                  'name': name,
	                  'bg':bg,
	                  'featuredImage': featuredImage,
	                  'address': address,
	                  'cuisines': cuisines,
	                  'distance': distance,
	                  'rating': rating
	              }
	              
	              $scope.$apply();

		              if (cuisines.length > 30) {
		                  $(".category-text").css("font-size",".7em");
		              }else {
		                  $(".category-text").css("font-size",".8em");
		              }

	              //changing the ratings on change
	              $("#rateYo").rateYo("rating", ratingRaw);
	              changeStore(currentPosition,storeCount);

	              if (loopCounter == 0) {
	              	restaurantloop();
	              	cb = true;
	              	callCallback();
	              	loopCounter++;
	              }
	              


	              // loop at the available stores in the array

	              });
	         
	      } // end of insert data to scope

	      function restaurantloop() {

	        if (config.loopStore) {
	            
	              interval3 = setInterval(function () {
	                  restaurantRemoveClass();
	                }, config.loopInterval/2);
	            
	              interval4 = setInterval(function () {
	                  insertDataToScope();
	                  restaurantAddClass();
	                }, config.loopInterval);
	              
	          }

	      }
	        


	     function restaurantAddClass() {

	          $(".restaurant-portrait .restaurant-top, .restaurant-background").addClass("restaurant-animation");
	          $(".restaurant-portrait .restaurant-top-float").addClass("fadeInLeft");
	          $(".restaurant-top-div,.restaurant-portrait .distance-div, .restaurant-portrait .restaurant-bottom-review, .restaurant-portrait .restaurant-bottom-rating").addClass("fadeInUp");
	      }

	      function restaurantRemoveClass(){
	          $(".restaurant-portrait .restaurant-top, .restaurant-portrait .restaurant-background").removeClass("restaurant-animation");
	          $(".restaurant-portrait .restaurant-top-float").removeClass("fadeInLeft");
	          $(".restaurant-portrait .restaurant-top-div, .restaurant-portrait .distance-div, .restaurant-portrait .restaurant-bottom-review, .restaurant-portrait .restaurant-bottom-rating").removeClass("fadeInUp");    
	      }

	        
	      //this will be the state of the current store, saved in local storage
	      function changeStore(currentPosition,storeCount) {

	              //saving data in localstorage
	              if (currentPosition >= storeCount) {
	                  currentPosition = 0;
	                  localStorage.setItem('restaurant-position', currentPosition);
	              } else {
	                  currentPosition++;
	                  localStorage.setItem('restaurant-position', currentPosition);
	              }

	          }

	      //function that will identify what background to use in the cuisines section
	      function bgCheck(cuisinesList) {

	              var x = cuisinesList.split(",");

	              for(var i = 0; i < x.length; i++) {
	                  if (x[i] == 'Japanese' || x[i] == 'Korean') {
	                      bg = config.bgList.korean;
	                      break;
	                  }else if (x[i] == 'Asian' || x[i] == 'Filipino') {
	                      bg = config.bgList.asian;
	                      break;
	                  }else {
	                      bg = config.bgList.general;
	                  }

	              }
	              return bg;
	          }



		function removeInterval2(){

			clearInterval(interval3);
			clearInterval(interval4);		
			
		}

		function callCallback(){

			if (cb) {
				$timeout(removeInterval2, 28000);      
				$timeout(callback, 30000);
			}
			
		}
};