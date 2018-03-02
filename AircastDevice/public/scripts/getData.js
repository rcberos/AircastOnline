function temp10GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp10'&&(!item.hasData||item.lastQuery < (Date.now()-600000))){
			console.log('news query');

			console.log(item);
			var dum = item.tempSrc.source.split('/');
			console.log(dum);
			var source = dum[1];
			item.source = source;
			// for(var i=0; i< $scope.templates.length; i++){
			// 	console.log()
			// 	if($scope.templates[i].Template == 'temp10'){
			// 		console.log('NEWWWS');
			// 		var dum = $scope.templates[i].tempSrc.source.split('/');
			// 		source = dum[1];
			// 		console.log('source: '+source);
			// 	}
			// }

			$http.get('https://newsapi.org/v1/articles?source='+source+'&sortBy=top&apiKey=44e7bd68b7d74cef902f1d9c7cb96b72')
				.then(function(response){
					console.log('temp 10 success');
					for(var i=0; i<$scope.TemplateData.length; i++){
		        		if($scope.TemplateData[i].Template == 'temp10' && $scope.TemplateData[i].CampaignID == item.CampaignID){
		        			$scope.TemplateData[i].TempData = response.data;
		        			$scope.TemplateData[i].hasData = true;
		        			$scope.TemplateData[i].lastQuery = Date.now();
		        			// $scope.TemplateData[i].source = source;
		        			console.log('Get Data Temp Data');
		        			console.log($scope.TemplateData);
		        			break;
		        		}
		        	}
				}, function(error){
					console.log(error);
				})
		}
	})

			
}


function temp11GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp11'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){

	    var restaurantList = [];
	    var restaurantNameList = [];
	    var tempCount, counter = 0;

	    var config = {
	        'lat': 14.609695,
	        'long': 121.0747,
	        'zomatoConfig':  {
	            headers : {
	                'user-key': '1e3481187e26de091dfdb5f7f768312a',
	                'Accept': 'application/json;odata=verbose'
	            }   
	        }
	    };

	    config.url = 'https://developers.zomato.com/api/v2.1/geocode?lat=' + config.lat + '&lon=' + config.long;

	        fetchRestaurantData(config.url);


	        function fetchRestaurantData(url){

	            var currentTimeStamp = moment().unix() + 2592000;
	           $http.get(url,config.zomatoConfig)
	           .then(function(response) {

	                  if (response.data) {

	                    var restaurants = response.data.nearby_restaurants;

	                    for (var i = 0 ; i < restaurants.length; i++) {

	                      if (restaurantNameList.indexOf(restaurants[i].restaurant.name) == -1) {
	                        restaurantNameList.push(restaurants[i].restaurant.name);
	                        restaurantList.push(restaurants[i]);
	                      }
	                    }

	                      if (restaurantList.length < 100) {
	                        checkIfListReach50(restaurantList.length);
	                      }else{
	                      	saveData(restaurantList);
	                      }
	                      
	                  } else {
	                      console.log("nothing returned");
	                  }
	              })
	       }

	        function checkIfListReach50(restaurantListLength){

	           var currentTimeStamp = moment().unix() + 2592000;
	           console.log(restaurantListLength);

	            config.lat += .01;

	            if (tempCount == restaurantListLength) {
	              config.long += 0.01;
	              counter++;
	            }else {
	              tempCount = restaurantListLength;
	              counter = 0;
	            }
	            if (counter > 5) {
	            	saveData(restaurantList);
	            }else {
	              url = 'https://developers.zomato.com/api/v2.1/geocode?lat=' + config.lat + '&lon=' + config.long;
	              fetchRestaurantData(url);
	            }

	        }

	        function saveData(dummy){

	        	 for(var i=0; i<$scope.TemplateData.length; i++){
		        		if($scope.TemplateData[i].Template == 'temp11'){
		        			$scope.TemplateData[i].TempData = dummy;
		        			$scope.TemplateData[i].hasData = true;
		        			$scope.TemplateData[i].lastQuery = Date.now();
		        			localStorage.setItem('restaurant-position', 0);
		        			console.log('Get Data Temp Data 11');
		        			console.log($scope.TemplateData);
		        			break;
		        		}
		        	}

	        }

			}
		})
				
}

function temp12GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp12'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$http.get('http://api.openweathermap.org/data/2.5/forecast/daily?id=1701668&APPID=9f534971ae41269da3bdca6da5ad3a67&q=Manila&cnt=7')
				.then(function(response1){
					$http.get('http://api.openweathermap.org/data/2.5/weather?id=1701668&APPID=9f534971ae41269da3bdca6da5ad3a67')
						.then(function(response2){
							for(var i=0; i<$scope.TemplateData.length; i++){
				        		if($scope.TemplateData[i].Template == 'temp12'){
				        			var dummy = [];
				        			dummy.push(response1);
				        			dummy.push(response2);
				        			$scope.TemplateData[i].TempData = dummy;
				        			$scope.TemplateData[i].hasData = true;
		        					$scope.TemplateData[i].lastQuery = Date.now();
				        			console.log('Get Data Temp Data');
				        			console.log($scope.TemplateData);
				        			break;
				        		}
				        	}
						})
				})
		}
	})

			

}


function temp13GetData($http, $scope){

	function formatDate(date) {
	    var d = new Date(date),
	        month = '' + (d.getMonth() + 1),
	        day = '' + d.getDate(),
	        year = d.getFullYear();

	    if (month.length < 2) month = '0' + month;
	    if (day.length < 2) day = '0' + day;

	    return [year, month, day].join('-');
	}


	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp13'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$scope.TemplateData.forEach(function(item){
				if(item.Template == 'temp13'){

					item.TempData = [];

					$http.get('https://openexchangerates.org/api/latest.json?app_id=611c0c2870aa4804a4014db80c91ee2d')
						.then(function(response1){
							item.TempData.push(response1.data.rates);

							var yesterday = new Date((Date.now()) - 86400000);

							var yes = formatDate(yesterday);

							$http.get('https://openexchangerates.org/api/historical/'+ yes +'.json?app_id=611c0c2870aa4804a4014db80c91ee2d')
								.then(function(response2){
									item.TempData.push(response2.data.rates);
				        			item.hasData = true;
		        					item.lastQuery = Date.now();
				        			console.log('Get Data Temp Data');
				        			console.log(item);
								})
						})


				}
			})
		}
	})
			

}


function temp14GetData($http, $scope){
	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp14'&&(!item.hasData||item.lastQuery < (Date.now()-300000))){
			console.log('GETTING TWITTER DATA');

			var search_keyword = "GetReadyToReinvent";
			var formatted_keyword = encodeURI('http://palmsolutions-twitter-api.herokuapp.com/'+search_keyword);
			$http.get(formatted_keyword)
		              .then(function(response) {
		              		if (response.status == 200 && response.data[0].statuses.length != 0) {
		              			console.log("GETTING TWITTER DATA");
		              			console.log(response.data[0].statuses.length);
			              		$scope.TemplateData.forEach(function(item){
									if(item.Template == 'temp14'){
										item.TempData = response.data;
										item.lastTweet = 0;
										item.lastArray = 0;
										item.hasData = true;
			        					item.lastQuery = Date.now();
										console.log('Get Data Temp Data 14');
					        			console.log(item);
									}
								})
		              		}
		              })
		}
	})

			
}


function temp15GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp15'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$http.get('http://ec2-54-169-234-246.ap-southeast-1.compute.amazonaws.com/api/v0/hugot.php')
		              .then(function(response) {
			              		$scope.TemplateData.forEach(function(item){
									if(item.Template == 'temp15'){
										item.TempData = response.data;
										item.hasData = true;
			        					item.lastQuery = Date.now();
										console.log('Get Data Temp Data 15');
					        			console.log(item);
									}
								})
		              		
		              })
		}
	})

}

function temp16GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp16'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$http.get('https://api.themoviedb.org/3/movie/upcoming?api_key=f2ebc8131c456f6ee2f134ac299aa40f&language=en&US')
		              .then(function(response) {
		              		$scope.TemplateData.forEach(function(item){
								if(item.Template == 'temp16'){
									item.TempData = response.data;
									console.log("movies data: ");
									console.log(response.data);
									item.moviePosition = 0;
									item.hasData = true;
		        					item.lastQuery = Date.now();
									console.log('Get Data Temp Data 16');
				        			console.log(item);
								}
							})
		              })
		}
	})

			
}




function temp17GetData($http, $scope){
	// console.log('temp10');

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp17'&&(!item.hasData||item.lastQuery < (Date.now()-600000))){
			console.log('news query');

			console.log(item);
			var dum = item.tempSrc.source.split('/');
			console.log(dum);
			var source = dum[1];
			item.source = source;
			// for(var i=0; i< $scope.templates.length; i++){
			// 	console.log()
			// 	if($scope.templates[i].Template == 'temp10'){
			// 		console.log('NEWWWS');
			// 		var dum = $scope.templates[i].tempSrc.source.split('/');
			// 		source = dum[1];
			// 		console.log('source: '+source);
			// 	}
			// }

			$http.get('https://newsapi.org/v1/articles?source='+source+'&sortBy=top&apiKey=44e7bd68b7d74cef902f1d9c7cb96b72')
				.then(function(response){
					console.log('temp 17 success');
					for(var i=0; i<$scope.TemplateData.length; i++){
		        		if($scope.TemplateData[i].Template == 'temp10' && $scope.TemplateData[i].CampaignID == item.CampaignID){
		        			$scope.TemplateData[i].TempData = response.data;
		        			$scope.TemplateData[i].hasData = true;
		        			$scope.TemplateData[i].lastQuery = Date.now();
		        			// $scope.TemplateData[i].source = source;
		        			console.log('Get Data Temp Data');
		        			console.log($scope.TemplateData);
		        			break;
		        		}
		        	}
				}, function(error){
					console.log(error);
				})
		}
	})
	
}

function temp18GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp18'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$http.get('http://api.openweathermap.org/data/2.5/forecast/daily?id=1701668&APPID=9f534971ae41269da3bdca6da5ad3a67&q=Manila&cnt=7')
				.then(function(response1){
					$http.get('http://api.openweathermap.org/data/2.5/weather?id=1701668&APPID=9f534971ae41269da3bdca6da5ad3a67')
						.then(function(response2){
							for(var i=0; i<$scope.TemplateData.length; i++){
				        		if($scope.TemplateData[i].Template == 'temp18'){
				        			var dummy = [];
				        			dummy.push(response1);
				        			dummy.push(response2);
				        			$scope.TemplateData[i].TempData = dummy;
				        			$scope.TemplateData[i].hasData = true;
		        					$scope.TemplateData[i].lastQuery = Date.now();
				        			console.log('Get Data Temp Data');
				        			console.log($scope.TemplateData);
				        			break;
				        		}
				        	}
						})
				})
		}
	})
}



function temp20GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp20'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){

			var search_keyword = "";
			var formatted_keyword = encodeURI('http://palmsolutions-twitter-api.herokuapp.com/'+search_keyword);
			$http.get(formatted_keyword)
		              .then(function(response) {
		              		if (response.status == 200) {
		              			console.log("GETTING TWITTER DATA");
		              			console.log(response);
			              		$scope.TemplateData.forEach(function(item){
									if(item.Template == 'temp14'){
										item.TempData = response.data;
										item.lastTweet = 0;
										item.lastArray = 0;
										item.hasData = true;
			        					item.lastQuery = Date.now();
										console.log('Get Data Temp Data 14');
					        			console.log(item);
									}
								})
		              		}
		              })
		}
	})
}



function temp23GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp23'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){

	    var restaurantList = [];
	    var restaurantNameList = [];
	    var tempCount, counter = 0;

	    var config = {
	        'lat': 14.609695,
	        'long': 121.0747,
	        'zomatoConfig':  {
	            headers : {
	                'user-key': '1e3481187e26de091dfdb5f7f768312a',
	                'Accept': 'application/json;odata=verbose'
	            }   
	        }
	    };

	    config.url = 'https://developers.zomato.com/api/v2.1/geocode?lat=' + config.lat + '&lon=' + config.long;

	        fetchRestaurantData(config.url);


	        function fetchRestaurantData(url){

	            var currentTimeStamp = moment().unix() + 2592000;
	           $http.get(url,config.zomatoConfig)
	           .then(function(response) {

	                  if (response.data) {

	                    var restaurants = response.data.nearby_restaurants;

	                    for (var i = 0 ; i < restaurants.length; i++) {

	                      if (restaurantNameList.indexOf(restaurants[i].restaurant.name) == -1) {
	                        restaurantNameList.push(restaurants[i].restaurant.name);
	                        restaurantList.push(restaurants[i]);
	                      }
	                    }

	                      if (restaurantList.length < 5) {
	                        checkIfListReach50(restaurantList.length);
	                      }else{
	                      	saveData(restaurantList);
	                      }
	                      
	                  } else {
	                      console.log("nothing returned");
	                  }
	              })
	       }

	        function checkIfListReach50(restaurantListLength){

	           var currentTimeStamp = moment().unix() + 2592000;
	           console.log(restaurantListLength);

	            config.lat += .01;

	            if (tempCount == restaurantListLength) {
	              config.long += 0.01;
	              counter++;
	            }else {
	              tempCount = restaurantListLength;
	              counter = 0;
	            }

	            if (counter > 5) {
	            	saveData(restaurantList);
	            }else {

	              url = 'https://developers.zomato.com/api/v2.1/geocode?lat=' + config.lat + '&lon=' + config.long;
	              fetchRestaurantData(url);
	            }

	        }

	        function saveData(dummy){

	        	 for(var i=0; i<$scope.TemplateData.length; i++){
		        		if($scope.TemplateData[i].Template == 'temp23'){
		        			$scope.TemplateData[i].TempData = dummy;
		        			$scope.TemplateData[i].hasData = true;
		        			$scope.TemplateData[i].lastQuery = Date.now();
		        			localStorage.setItem('restaurant-position', 0);
		        			console.log('Get Data Temp Data 23');
		        			console.log($scope.TemplateData);
		        			break;
		        		}
		        	}

	        }

			}
		})
}


function temp22GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp22'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$http.get('http://ec2-54-169-234-246.ap-southeast-1.compute.amazonaws.com/api/v0/hugot.php')
		              .then(function(response) {
			              		$scope.TemplateData.forEach(function(item){
									if(item.Template == 'temp22'){
										item.TempData = response.data;
										item.hasData = true;
			        					item.lastQuery = Date.now();
										console.log('Get Data Temp Data 22');
					        			console.log(item);
									}
								})
		              		
		              })
		}
	})

}



function temp19GetData($http, $scope){

	function formatDate(date) {
	    var d = new Date(date),
	        month = '' + (d.getMonth() + 1),
	        day = '' + d.getDate(),
	        year = d.getFullYear();

	    if (month.length < 2) month = '0' + month;
	    if (day.length < 2) day = '0' + day;

	    return [year, month, day].join('-');
	}


	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp19'&&(!item.hasData||item.lastQuery < (Date.now()-360000))){
			$scope.TemplateData.forEach(function(item){
				if(item.Template == 'temp19'){

					item.TempData = [];

					$http.get('https://openexchangerates.org/api/latest.json?app_id=611c0c2870aa4804a4014db80c91ee2d')
						.then(function(response1){
							item.TempData.push(response1.data.rates);

							var yesterday = new Date((Date.now()) - 86400000);

							var yes = formatDate(yesterday);

							$http.get('https://openexchangerates.org/api/historical/'+ yes +'.json?app_id=611c0c2870aa4804a4014db80c91ee2d')
								.then(function(response2){
									item.TempData.push(response2.data.rates);
				        			item.hasData = true;
		        					item.lastQuery = Date.now();
				        			console.log('Get Data Temp Data');
				        			console.log(item);
								})
						})


				}
			})
		}
	})
			

}


function temp24GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp24'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$http.get('https://api.themoviedb.org/3/movie/upcoming?api_key=f2ebc8131c456f6ee2f134ac299aa40f&language=en&US')
		              .then(function(response) {
		              		$scope.TemplateData.forEach(function(item){
								if(item.Template == 'temp24'){
									item.TempData = response.data;
									console.log(response.data);
									item.moviePosition = 0;
									item.hasData = true;
		        					item.lastQuery = Date.now();
									console.log('Get Data Temp Data 24');
				        			console.log(item);
								}
							})
		              })
		}
	})

			
}

function temp25GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp25'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){
			$http.get('http://ec2-54-169-234-246.ap-southeast-1.compute.amazonaws.com/api/v0/ikomai_guest.php')
		              .then(function(response) {
		              		$scope.TemplateData.forEach(function(item){
								if(item.Template == 'temp25'){
									item.TempData = response.data;
									console.log(response.data);
									item.hasData = true;
		        					item.lastQuery = Date.now();
									console.log('Get Data Temp Data 25');
				        			console.log(item);
								}
							})
		              })
		}
	})

			
}


function temp26GetData($http, $scope){

	$scope.new_source_ig = [];
	var dummyTemp = $scope.TemplateData;

	dummyTemp.forEach(function(item){
			if(item.Template=='temp26'){
				console.log("Getting Instagram Source FROM Database");
				$scope.new_source_ig = item.tempSrc.source.split('/');
			}
	});

	dummyTemp.forEach(function(item){
  		if ($scope.new_source_ig.length != 0) {

  			if(item.Template=='temp26'){

  				if ((!item.hasData || item.lastQuery < (Date.now()-900000)) || item.Source != $scope.new_source_ig[1]) {


		  			var instagram_post = {
						username: $scope.new_source_ig[1],
						currentPosition: 0,
						postList: {},
						post_length: 0,
						display_limit: "auto",
						loopInterval: 10000,
						loop: true,
					}
					var user_info = {};

					var url = 'https://stark-gorge-93872.herokuapp.com/'+instagram_post.username+'/?__a=1';

				    		$http.get(url)
				              .then(function(response) {
				              	console.log("GETTIN NEW DATA FROM IG API");
				              	var arrOfData = [];
				              	var data = response.data;
			              		var temp = [];
								var counter = 0;
								arrOfData.push(data.user);

						   		for (var i=0; i < data.user.media.nodes.length; i++ ) {
						   			if (instagram_post.display_limit === "auto") {
						   				temp.push(data.user.media.nodes[i]);		
						   			}else {
										if (counter < instagram_post.display_limit) {
						   					temp.push(data.user.media.nodes[i]);
						   					counter++;
						   				}else {
						   					break;
						   				}
						   			}   
						   		}

						   		instagram_post.postList = temp;
						   		instagram_post.post_length = temp.length;
						   		arrOfData.push(instagram_post);
						   		saveData(arrOfData);

				              })
				              .catch(function() {
				                  // handle error
				                  console.log('error occured getting the instagram post');
				              })


				          	function saveData(data){

						    	 for(var i=0; i<$scope.TemplateData.length; i++){
						        		if($scope.TemplateData[i].Template == 'temp26'){
						        			$scope.TemplateData[i].Source = $scope.new_source_ig[1];
						        			$scope.TemplateData[i].TempData = data;
						        			$scope.TemplateData[i].currentPosition = 0;
						        			$scope.TemplateData[i].hasData = true;
						        			$scope.TemplateData[i].lastQuery = Date.now();
						        			break;
						        		}
						        	}

							 } // end of function saveData


  				} // end of ((!item.hasData || item.lastQuery < (Date.now()-3600000)) || item.Source != $scope.new_source_fb[1])

			} // end of if (item.Template=='temp27')

  		} // end of if ($scope.new_source_ig.length != 0)

	}) // end of dummyTemp.forEach(function(item)

} // end of temp26GetData($http, $scope)


function temp27GetData($http, $scope){

	$scope.new_source_fb = [];

	var dummyTemp = $scope.TemplateData;

	// dummyTemp.forEach(function(item){
	// 		if(item.Template=='temp27'){
	// 			console.log("Getting Facebook Source FROM Database");
	// 			$scope.new_source_fb = item.tempSrc.source.split('/');
	// 		}
	// });


	dummyTemp.forEach(function(item){

		if ($scope.new_source_fb.length != 0 || 1) {

			if(item.Template=='temp27'){
				$scope.new_source_fb = item.tempSrc.source.split('/');

				if ((!item.hasData || item.lastQuery < (Date.now()-900000))) {

					console.log(item);
					console.log('FB Source 1: ',$scope.new_source_fb[1] );
					console.log('FB Source 2: ',item.Source1 );

					console.log('FB First Condition: ' ,(item.Template=='temp27' && (!item.hasData||item.lastQuery < (Date.now()-900000))));
					console.log('FB Second Condition: ' ,item.Source1 != $scope.new_source_fb[1]);


						var fb_post = {
							access_token: 'EAADZBXIds1zwBADjMTCIwthGP7jEGguv3whJSI3TucMMBVFFkI7BC0ZBQKVH44F2oMuQtZB15NRdJxKBqbxTjii3SUhVjh7HXHJpR69NaOrnsvCkAzJ82ERdPMrs3uALWEjH9OkjESKzQdqZBx63OhaFzagZB4DUTCOEMShLouQZDZD',
							page_id: $scope.new_source_fb[1],
							api_version: 'v2.8',
							currentPosition: 0,
							postList: {},
							post_length: 0,
							fb_limit: 30,
							display_limit: 10,
							has_comment: false,
							loopInterval: 10000,
							loop: true,
						}
						var page_info = {};
						var interval35, interval36;
						var arrOfData = [];

						var url = 'https://graph.facebook.com/'+fb_post.page_id+'?fields=name,fan_count,picture.width(100)&access_token='+fb_post.access_token;

						$http.get(url)
					      .then(function(response) {

					      		console.log("GETTIN NEW DATA FROM FB API");
					      		if (response.data) {
					      			var data = response.data;
									page_info.name = data.name;
									page_info.page_likes = data.fan_count;
									page_info.picture = data.picture.data.url;
									arrOfData.push(page_info);
									console.log(url);
									console.log("getting first fb data");


										var url = 'https://graph.facebook.com/'+fb_post.api_version+'/'+fb_post.page_id+'/feed?fields=id,message,full_picture,shares.summary(true).as(reactions_shares).limit(0),comments.summary(true).limit(0).as(reactions_comments),reactions.type(LIKE).limit(0).summary(total_count).as(reactions_like),reactions.type(SAD).limit(0).summary(total_count).as(reactions_sad),reactions.type(ANGRY).limit(0).summary(total_count).as(reactions_angry),reactions.type(LOVE).limit(0).summary(total_count).as(reactions_love),reactions.type(WOW).limit(0).summary(total_count).as(reactions_wow),reactions.type(HAHA).limit(0).summary(total_count).as(reactions_haha)&limit='+fb_post.fb_limit+'&access_token='+fb_post.access_token;


							    		$http.get(url)
							              .then(function(response) {
							              		if (response.data) {
													var data = response.data;
								              		var temp = [];
													var counter = 0;
													console.log(url);
													console.log("getting second fb data");

											   		for (var i=0; i < data.data.length; i++ ) {
											   			if ('full_picture' in data.data[i]) {
											   				if (counter < fb_post.display_limit) {
											   					temp.push(data.data[i]);
											   					counter++;	
											   				}
											   			}
											   		}
											   		fb_post.postList = temp;
											   		fb_post.post_length = temp.length

											   		arrOfData.push(fb_post);
											   		saveData(arrOfData);
							              		}else {
							              			console.log("failed to get facebook data");
							              		}
							              		
							              })

							              .catch(function(err) {
							                  // handle error
							                  console.log('error occured getting the facebook post 2', err);
							              })


					      		}else {
					      			console.log("failed to get facebook data");
					      		}

					      })
					      .catch(function(err) {
					          // handle error
					          console.log('error occured getting the facebook post 1',err);
					      })



						function saveData(data){

							

					    	 for(var i=0; i<$scope.TemplateData.length; i++){
					        		if($scope.TemplateData[i].Template == 'temp27' && $scope.TemplateData[i].CampaignID == item.CampaignID){
					        			console.log('saving');
					        			console.log($scope.TemplateData[i].CampaignID);
					        			console.log($scope.new_source_fb[1]);
					        			$scope.TemplateData[i].Source = $scope.new_source_fb[1];
					        			// $scope.TemplateData[i].Source = 
					        			$scope.TemplateData[i].TempData = data;
					        			$scope.TemplateData[i].currentPosition = 0;
					        			$scope.TemplateData[i].hasData = true;
					        			$scope.TemplateData[i].lastQuery = Date.now();
					        			break;
					        		}
					        	}


					        	// for(var i=0; i<$scope.TemplateData.length; i++){
					        	// 	if($scope.TemplateData[i].Template == 'temp10' && $scope.TemplateData[i].CampaignID == item.CampaignID){
					        	// 		$scope.TemplateData[i].TempData = response.data;
					        	// 		$scope.TemplateData[i].hasData = true;
					        	// 		$scope.TemplateData[i].lastQuery = Date.now();
					        	// 		// $scope.TemplateData[i].source = source;
					        	// 		console.log('Get Data Temp Data');
					        	// 		console.log($scope.TemplateData);
					        	// 		break;
					        	// 	}



						 } // end of function saveData

					} // end of !item.hasData||item.lastQuery < (Date.now()-3600000) || item.Source1 != $scope.new_source_fb[1]

				} // end of (item.Template=='temp27')

		} //end of length if $scope.new_source_fb.length != 0

	}) // enf of dummyTemp.forEach(function(item)

			
} //end of the temp27GetData($http, $scope)



function temp28GetData($http, $scope){

	$scope.TemplateData.forEach(function(item){
		if(item.Template=='temp28'&&(!item.hasData||item.lastQuery < (Date.now()-3600000))){

			var access_token = 'EAAKAyZCmFO8EBAPQVWKgotd8I6cZAnRVjZBZCy74gAXQ7zwryKOV0gWdc9LlDmYvERfq5DSy7z9X9gpmEw5NJcxbZBjEZCuLZBZAC2eOLvuevnXRNdKtC7SVmJpbV1QHzdwPOCMfkXyKfSgN3Ew9aUnllAabS988tSBq2lU4hBlxmDBeZBBTZAlrlu';
	    	var events = {
	    		url : 'https://graph.facebook.com/search?q=manila&type=event&limit=100&access_token='+access_token,
	    		eventList: {},
	    		currentPosition: 1,
	    		eventListLength: 0,
	    		loopInterval: 15000,
	    		loop: true,
	        	latitude: 12.8797,
	        	longitude: 121.7740
	    	} 

	    	console.log('GETTING TEMP 28');

	    	function getEvents() {
	    		$http.get(events.url)
	              .then(function(response) {

	              	console.log(response);

	                  if (response.data.data.length > 0) {
	                  	console.log("GET A RESPONSE AT TEMP 28");
	                  	console.log(response);
	                  	saveData(response);
	                  } else {
	                      console.log("nothing returned");
	                  }
	              })
	    	}


	       function saveData(data){
	       	console.log('SAVING TEMP 28 DATA');
	    	 for(var i=0; i<$scope.TemplateData.length; i++){
	        		if($scope.TemplateData[i].Template == 'temp28'){
	        			$scope.TemplateData[i].TempData = data.data;;
	        			$scope.TemplateData[i].currentPosition = 0;
	        			$scope.TemplateData[i].hasData = true;
	        			$scope.TemplateData[i].lastQuery = Date.now();
	        			break;
	        		}
	        	}

		 } // end of function saveData


		getEvents();


		}
	});


	

};