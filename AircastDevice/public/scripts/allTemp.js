function UpdateWallet($http, CampaignID){
	// console.log('updating Wallet');
	$http.get('/myID').then(function(response){
      var RpiID = response.data.RpiID;

      var data = {
        RpiID: RpiID,
        CampaignID: CampaignID
      }
      $http.post('http://54.254.248.115/rpiUpdateWallet', data).then(function(response){
        // console.log(response);
        // console.log('update wallet success');
      }, function(err){
        // console.log('wallet update failed');
        console.log(err);
      });

    }, function(error){
      // console.log('get config failed');
    });
}

















//         var config = {
//             'currentDate': moment(today).format('YYYY-MM-DD'),
//             'yesterdayDate': moment(yesterday).format('YYYY-MM-DD'),
//         }
        
//         console.log(config.currentDate);
//         console.log(config.yesterdayDate);

        
//         for(var i=0; i< $scope.TemplateData.length; i++){
//     		if($scope.TemplateData[i].Template == 'temp13'){
//     			currencyData = $scope.TemplateData[i].TempData;
//     			// insertDataToScope();
//     			processData(currencyData);
//     		}
//     	}



//         function processData(rates) {
            
//             var rate_today= rates[0],
//                   rate_yesterday = rates[1],
//                   signs = {},
//                   result = [];
            
//             //get the first date
//             var ratesToday = {
//                 'usd': parseFloat(Math.fround(parseFloat(rate_today[currencyToDisplay[0]])).toPrecision(5)),
//                 'yen': parseFloat(Math.fround(parseFloat(rate_today[currencyToDisplay[0]]/rate_today[currencyToDisplay[1]])).toPrecision(5)),
//                 'euro': parseFloat(Math.fround(parseFloat(rate_today[currencyToDisplay[0]]/rate_today[currencyToDisplay[2]])).toPrecision(5))
//             }
            
//             var ratesYesterday = {
//                 'usd': parseFloat(Math.fround(parseFloat(rate_yesterday[currencyToDisplay[0]])).toPrecision(5)),
//                 'yen': parseFloat(Math.fround(parseFloat(rate_yesterday[currencyToDisplay[0]]/rate_yesterday[currencyToDisplay[1]])).toPrecision(5)),
//                 'euro': parseFloat(Math.fround(parseFloat(rate_yesterday[currencyToDisplay[0]]/rate_yesterday[currencyToDisplay[2]])).toPrecision(5))
//             }
            
//             console.log(ratesToday);
//             console.log(ratesYesterday);
            
//             if (ratesToday.usd > ratesYesterday.usd) {
//                 signs.usd = "up";
//             }else if (ratesToday.usd == ratesYesterday.usd) {
//                 signs.usd = "equal";
//             }else {
//                 signs.usd = "down";
//             }
            
//             if (ratesToday.yen > ratesYesterday.yen) {
//                 signs.yen = "up";
//             }else if (ratesToday.yen == ratesYesterday.yen) {
//                 signs.yen = "equal";
//             }else {
//                 signs.yen = "down";
//             }
            
//             if (ratesToday.euro > ratesYesterday.euro) {
//                 signs.euro = "up";
//             }else if (ratesToday.euro == ratesYesterday.euro) {
//                 signs.euro = "equal";
//             }else {
//                 signs.euro = "down";
//             }
            
//             console.log(signs);
//             result.push(ratesToday,ratesYesterday,signs);
//             console.log(result);
//             insertDataToScope(result);
            
            

//         }
        
//         function insertDataToScope(result){

//             $scope.todayYen = "P "+result[0].yen;
//             $scope.todayUsd = "P "+result[0].usd;
//             $scope.todayEuro = "P "+result[0].euro;
//             $scope.yesterday = result[1];
            
//             var temp = {
//                 'yen': result[0].yen.toString(),
//                 'usd': result[0].usd.toString(),
//                 'euro': result[0].euro.toString()
//             }

//             $scope.yen = temp["yen"].substring(1,2) + temp["yen"].substring(2,4);
//             $scope.usd = temp["usd"].substring(0,2);
//             $scope.euro = temp["euro"].substring(0,2);
            
//             var signs = {
//                 'down': '/assets/currency-down.png',
//                 'equal': '/assets/currency-equal.png',
//                 'up': '/assets/currency-up.png'
//             }
//             $scope.signs = {};
            
//             var usdSign,euroSign,yenSign;

//             if (result[2].usd == "down") {
//                 $scope.signs.usd = signs.up;
//             }else if (result[2].usd == "equal") {
//                 $scope.signs.usd = signs.equal;
//             }else {
//                 $scope.signs.usd = signs.down;
//             }

//             if (result[2].yen == "down") {
//                 $scope.signs.yen = signs.up;
//             }else if (result[2].yen == "equal") {
//                 $scope.signs.yen = signs.equal;
//             }else {
//                 $scope.signs.yen = signs.down;
//             }

            
//             if (result[2].euro == "down") {
//                 $scope.signs.euro = signs.up;
//             }else if (result[2].euro == "equal") {
//                 $scope.signs.euro = signs.equal;
//             }else {
//                 $scope.signs.euro = signs.down;
//             }
            
//         }
        

//         // checkIfCurrencyDataExpired();

//         $timeout(callback, 15000);
        
// };

// //tweeter
// function temp14Controller($scope, $window, $timeout, $http, tempSrc, callback){ 

   
//         var config =  {
//             'loop': true,
//             'loopInterval': 10000,
//             'animationIn': 'zoomInUp',
//             'animationOut': 'zoomOutUp'
//         }


//         var loopCounter = 0;
//         var twitterCounter =  parseInt(localStorage.getItem('twitter-counter')) || 0;
//         // var twitterCounter = 0;
//         var temp, twitterData, hashtagList;
//         var interval7, interval8;

//         var twitterPosition = 0;
//         var twitterArray = 0;


//     $scope.TemplateData.forEach(function(item){
// 		if(item.Template == 'temp14'){
//     			twitterData = item.TempData;
//     			twitterPosition = item.lastTweet;
//     			twitterArray = item.lastArray;

// 		          $(".twitter .loader").fadeOut("slow");
// 		          inserDataToScope();
//     		}
// 	})


//       function inserDataToScope(){

//             var tweets = twitterData[twitterArray].statuses;
//             var tweetsCount  = tweets.length-1;
//             var currentPosition = twitterPosition;
//             var nextTweetPosition = (currentPosition < tweetsCount)? currentPosition+1 : 0;
//             console.log("Current Tweet Position: " + currentPosition +"/"+tweetsCount);
                
//             // $scope.topHashtag = removeSpace(hashtagList[twitterCounter]);
//             $scope.topHashtag = removeSpace(twitterData[twitterArray].Hashtag);
            
            
//             if ($scope.topHashtag.length >= 14) {
//                 $(".hashtag-overlay").css("font-size","3.5em");
//                 $(".hashtag-overlay").css("top","2.5em");
//                 $(".hashtag-overlay").css("letter-spacing","0");
//             }else {
//                 $(".hashtag-overlay").css("font-size","7em");
//                 $(".hashtag-overlay").css("top","1em");
//             }


//             $scope.tweet = tweets[currentPosition];
//             $scope.tweetText = removeEmojis(tweets[currentPosition].text);
//             $scope.tweetDate = moment(tweets[currentPosition].created_at).format('LL');
            
            
//             $scope.nextTweet = tweets[nextTweetPosition];
//             $scope.nextTweetText = removeEmojis(tweets[nextTweetPosition].text);
//             $scope.nextTweetDate = moment(tweets[nextTweetPosition].created_at).format('LL');

//             $scope.name = removeEmojis(tweets[currentPosition].user.name);
//             $scope.username = removeEmojis(tweets[currentPosition].user.screen_name);


            
// //            $scope.$apply();
            
//             changePosition(currentPosition,tweetsCount);
//             // checkIfDataEnds();

//               if (loopCounter == 0) {
//               	twitterloop();
//               	loopCounter++;
//               }
            
        
//         }

            
//         function twitterloop(){

// 	        if (config.loop) {

// 	              interval7 = setInterval(function () {
// 	                  twitterRemoveClass();
// 	                }, config.loopInterval/2);

	            
// 	              interval8 = setInterval(function () {

// 	                  $scope.$apply(function(){
// 	                    inserDataToScope();
// 	                    twitterAddClass();
// 	                    });
	                    
// 	                }, config.loopInterval);
	            
// 	        }        	
//         }
        

        

//         function twitterRemoveClass(){
//               $(".twitter #currentTweet").delay(2000).removeClass("bounceInUp");
//               $(".twitter #secondTweet").delay(2000).removeClass("slideInUp");
//         }


//         function twitterAddClass(){
//                 $(".twitter #currentTweet").addClass("bounceInUp");
//                 $(".twitter #secondTweet").addClass("slideInUp");
//         }
        
//         function removeSpace(topHashtag) {
            
//             if (topHashtag.indexOf('#') >= 0) {
//                 return topHashtag.replace(/ /g,'');
//             }else {
//                 return '#' + topHashtag.replace(/ /g,'');
//             }
            
//         }
        
//         function updateValues() {
//         	$scope.TemplateData.forEach(function(item){
// 					if(item.Template == 'temp14'){
// 							item.lastTweet = twitterPosition
// 							item.lastArray = twitterArray;
// 			    		}
// 				})
//         }

//       function changePosition(currentPosition,tweetsCount) {

//               if (twitterPosition >= tweetsCount) {
//                   twitterPosition = 0;
//                   twitterArray = twitterArray+1;
//                   console.log('twitterData: '+twitterData.length);
//                   if(twitterArray>= twitterData.length){
//                   	twitterArray = 0;
//                   }
//                   updateValues();
//                   console.log('twitterArray: '+twitterArray);
//               } else {
//                   twitterPosition++;
//                   updateValues();
//               }


            
//             // inserDataToScope();
//             return currentPosition;

//           }
        
//     function removeEmojis (string) {
//           var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

//           return string.replace(regex, '');
//         }


// 	function removeInterval() {

// 		if (interval7 != undefined && interval8 != undefined) {
// 			clearInterval(interval7);
// 			clearInterval(interval8);		
// 		} 


// 	}


//     $timeout(removeInterval, 38000);   
//     $timeout(callback, 40000);


// };


// function temp15Controller($scope, $window, $timeout, $http, tempSrc, callback){ 

//      var config = {
//         'loop':'true',
//         'loopInterval': 10000,
//         'animationEnter': 'flipInX',
//         'animationOut' : 'flipOutX'
//     }
//     var loopCounter = 0;
//     var interval5, interval6;
//     var hugotList;

//      var bgList = ['/assets/hugot-landscape-1.png',
//      '/assets/hugot-landscape-2.png',
//      '/assets/hugot-landscape-3.png',
//      '/assets/hugot-landscape-4.png',
//      '/assets/hugot-landscape-5.png'];
    
//     for(var i=0; i< $scope.TemplateData.length; i++){
//     		if($scope.TemplateData[i].Template == 'temp15'){
//     			hugotList = $scope.TemplateData[i].TempData;
//     			console.log(hugotList);
//     		}
//     	}

    
//     var uniqueRandoms = [];
//     var numRandoms = hugotList.length;
        
//     //generate random number that is not repeating    
//     function makeUniqueRandom() {

//         if (!uniqueRandoms.length) {
//             for (var i = 0; i < numRandoms; i++) {
//                 uniqueRandoms.push(i);
//             }
//         }
//         var index = Math.floor(Math.random() * uniqueRandoms.length);
//         console.log('index: '+index);
//         var val = uniqueRandoms[index];


//         uniqueRandoms.splice(index, 1);

//         return val;

//     }        
//         function insertDataToScope() {
            
//              $scope.hugotText = hugotList[makeUniqueRandom()];
//              $scope.hugotBackground  = bgList[Math.floor(Math.random() * bgList.length)];

//               // $scope.hugotText = hugotList[0];

//               console.log($scope.hugotText);

//               if(!$scope.$$phase) {
// 						$scope.$apply();
// 					}


//            	 if (loopCounter == 0) {
//            	 	hugotloop();
//            	 	loopCounter++;
//            	 }
             

             
//         }

//         function hugotloop(){

// 	         if (config.loop) {
	            
// 	            // insertDataToScope();
	    
// 	            interval5 = setInterval(function(){
// 	                hugotRemoveClass();
// 	            },config.loopInterval/2);

// 	            interval6 = setInterval(function(){

// 	                insertDataToScope();
// 	                hugotAddClass();
// 	                if(!$scope.$$phase) {
// 						$scope.$apply();
// 					}

// 	            },config.loopInterval);
	    
// 	        }       	
//         }
        
        


//         function hugotRemoveClass(){
//             $(".hugot-text").delay(2000).removeClass(config.animationEnter);
//             $(".hugot").delay(2000).removeClass("hugot-animation");
//             $(".hugot-title").delay(2000).removeClass("fadeInDown");
//         }

//         function hugotAddClass(){
//             $(".hugot-text").addClass(config.animationEnter);
//             $(".hugot").addClass("hugot-animation");
//             $(".hugot-title").addClass("fadeInDown");
//         }
       




// 	function removeInterval() {

// 		if (interval5 != undefined && interval6 != undefined) {
// 			clearInterval(interval5);
// 			clearInterval(interval6);			
// 		} 


// 	}

// 	insertDataToScope();

//     $timeout(removeInterval, 29000);   
//     $timeout(callback, 30000);

// };


// function temp16Controller($scope, $window, $timeout, $http, tempSrc, callback){ 


//   var filter = ["now_playing","upcoming","popular","top_rated"];
//     var size= ["w92", "w154", "w185", "w342", "w500", "w780", "original"]
//     var config = {
//     	"filter": filter[1],
//     	"posterSize": size[4],
//     	"backgroundSize": size[5],
//     	"loop": true,
//     	"loopInterval": 10000,
//     	"animation": "flipInX"
//     }

//     var temp, movieData;
//     var loopCounter = 0;
//     var currentPosition = 0;
//     var moviesLength = 0;
//     var movies, interval9, interval10; 

//     config.url = "https://api.themoviedb.org/3/movie/"+config.filter+"?api_key=f2ebc8131c456f6ee2f134ac299aa40f&language=en&US";

//     if (config.filter == "now_playing") {
//     	$scope.movieslist = "Movies in Cinemas";
//     }else if(config.filter == "upcoming"){
//     	$scope.movieslist = "Latest Movies";
//     }else if(config.filter == "popular"){
//     	$scope.movieslist = "Popular Movies";
//     }else if (config.filter == "top_rated"){
//     	$scope.movieslist = "Top Rated Movies";
//     }else{
//     	$scope.movieslist = "Latest Movies";
//     }

//     for(var i=0; i< $scope.TemplateData.length; i++){
// 		if($scope.TemplateData[i].Template == 'temp16'){
// 			movieData = $scope.TemplateData[i].TempData.results;
// 			currentPosition = $scope.TemplateData[i].moviePosition;
// 			getDataFromStorage();
// 		}
// 	}

//         function updateValues() {
//         	$scope.TemplateData.forEach(function(item){
// 					if(item.Template == 'temp16'){
// 							item.moviePosition = currentPosition;
// 			    		}
// 				})
//         }

//        function getDataFromStorage() {

//           moviesLength = movieData.length;
//           inserDataToScope();
//       }


//     function inserDataToScope(){

//         var result = movieData[currentPosition];

//         if (result.overview.length > 400) {
//             $(".movie-description p").css("font-size",".6em");
//         }else{
//             $(".movie-description p").css("font-size",".7em");
//         }

//         console.log("Movie position: " + currentPosition + "/" + moviesLength);

//         $scope.title = result.original_title;
//         $scope.description = result.overview;
//         $scope.vote_average = "Ratings: " + result.vote_average + " / 10";
//         $scope.release_date = "Release Date: " + moment(result.release_date).format('LL');
//         $scope.poster_path = "http://image.tmdb.org/t/p/"+config.posterSize+"/"+result.poster_path;
//         $scope.backdrop_path = "http://image.tmdb.org/t/p/"+config.backgroundSize+"/"+result.backdrop_path;
//         $scope.animation = config.animation;

//         if (loopCounter == 0) {
//         	movieloop();
//         	loopCounter++;	
//         }
        

//     }

//     function changeMovie(){
    	
// 	       if ((currentPosition+1) >= moviesLength) {
//               currentPosition = 0;
//               updateValues();
//               inserDataToScope();

//           } else {
//               currentPosition++;
//               updateValues();
//               inserDataToScope();
//           }

//     }

//     function movieRemoveClass(){
// 		$(".movie-poster").delay(2000).removeClass("bounceInDown");   
//         $(".movie-title").delay(2000).removeClass(config.animation);   
//         $(".movie-release-date").delay(2000).removeClass(config.animation);   
//         $(".movie-description").delay(2000).removeClass(config.animation);   
//         $(".movie-ratings").delay(2000).removeClass(config.animation);   
//         $(".movie-logo").delay(2000).removeClass("fadeInUp");   
//     }

//     function movieAddClass(){
// 		$(".movie-poster").addClass("bounceInDown");
//         $(".movie-title").addClass(config.animation);
//         $(".movie-release-date").addClass(config.animation);
//         $(".movie-description").addClass(config.animation);
//         $(".movie-ratings").addClass(config.animation);
//         $(".movie-logo").addClass("fadeInUp");
//     }


//     function movieloop(){

// 	    if (config.loop) {

// 		 interval9 = setInterval(function () {
// 		        movieRemoveClass();     
// 		    }, config.loopInterval/2);

// 		  interval10 = setInterval(function () {
// 		        changeMovie();
// 		        movieAddClass();
// 		        $scope.$apply();
// 		    }, config.loopInterval);

// 	    }

//     }





// 	function removeInterval() {


// 		if (interval9 != undefined && interval10 != undefined) {
// 			clearInterval(interval9);
// 			clearInterval(interval10);		
// 		} 


// 	}

//     $timeout(removeInterval, 39000);   
//     $timeout(callback, 40000);


// };



function temp17Controller($scope, $window, $timeout, $http, temp2Src, callback, $q){
	var loopCounter = 0;
    var cb = false;
    var interval1, interval2;

    var localData;
            
    var config = {

        //source -> latest, top, popular
        'sourceList': [ 'buzzfeed','cnn','espn','google-news','entertainment-weekly','al-jazeera-english','bloomberg,','techcrunch','business-insider-uk'],
        'source': 'cnn',
        'sort':'top',
        'apiKey': '44e7bd68b7d74cef902f1d9c7cb96b72',
        'loopNews':true,
        'loopInterval':13000,
        'image':{
            'buzzfeed': '/assets/logo-buzzfeed.png',
            'cnn': '/assets/logo-cnn.png',
            'espn': '/assets/logo-espn.png',
            'google-news': '/assets/logo-google-news.png',
            'entertainment-weekly': '/assets/logo-entertainment-weekly.png',
            'al-jazeera-english': '/assets/logo-aljazeera.png',
            'bloomberg': '/assets/logo-bloomberg.png',
            'techcrunch': '/assets/logo-techcrunch.png',
            'business-insider': '/assets/logo-business-insider.png'
        }

    }
    
    config.url = 'https://newsapi.org/v1/articles?source='+config.source+'&sortBy='+config.sort+'&apiKey='+config.apiKey;
    
        console.log(config.url);
        console.log("config source -> " + config.source);
    

        function checkIfNewsDataExpired(){

          var currentDate = moment().format('MM-DD-YYYY');

          if (localStorage.getItem('news-expiration-date') == null) {

              getDataFromApi();
          	
          }else{

            if(currentDate == localStorage.getItem('news-expiration-date')) {
              console.log("News data is still within the same day");
              console.log("Getting data from the local storage");

              if (localStorage.getItem('news-source') == null) {
                localStorage.setItem('news-source',config.source);
                getDataFromApi();
              }

              if (localStorage.getItem('news-source') != config.source) {
                console.log("news source is not the same with the config.source, getting data from api");
                getDataFromApi();
              }

              insertDataToScope();

            }else{

              getDataFromApi();


            }

          }

        } // end of the checkIfNewsDataExpired function

        
    // checkIfNewsDataExpired();

    for(var i=0; i< $scope.TemplateData.length; i++){
    		if($scope.TemplateData[i].Template == 'temp17'){
    			localData = $scope.TemplateData[i].TempData;
    			insertDataToScope();
    		}
    	}

        

      // this function  will get data from the api if the json file is not yet saved in the local storage
      function getDataFromApi() {

          console.log("fetch data from news api");


          $http.get(config.url)
              .then(function(response) {

                  var currentDate = moment().format('MM-DD-YYYY');

                  if (response.data) {
                      localStorage.setItem('news-expiration-date',currentDate);
                      localStorage.setItem('news',JSON.stringify(response.data));
                      localStorage.setItem('news-position',0);
                      localStorage.setItem('news-source',config.source);
                      console.log("fetch data from the local storage");
                      //location.reload();
                      insertDataToScope();
                  } else {
                      console.log("nothing returned");
                  }
              })
              .catch(function() {
                  // handle error
                  console.log('error occurred');

                  if (localStorage.getItem('news') != null && localStorage.getItem('news') != '') {
                    console.log("fetch data from the local storage");
                    insertDataToScope();
                  }else{

                  	if (cb == false) {
                  		callback();	
                  	}
                                        
                    // $(".news-loader").fadeIn("slow");
                  }
              })

      }

          //insert all the data to the angular $scope
      function insertDataToScope() {
          
          $(".news-loader").fadeOut("slow",function(){
  
              var x = localStorage.getItem('news');
              var parsedData = JSON.parse(x);

              var parsedData = localData;

              //check if data is empty
              if (parsedData == '') {
                getDataFromApi();
              }

              var newsList = parsedData.articles;
              var currentPosition = parseInt(localStorage.getItem("news-position")) || 0;
              var newsCount = newsList.length-1;
              var article = newsList[currentPosition];

              var title = article.title;
              var author = article.author || "";

              var rawDate = article.publishedAt;
              var dateCreated;

              if (rawDate !== null) {
                    dateCreated = moment(article.publishedAt).format('LL');
              }else {
                    dateCreated = "";
              }

              console.log("News-Position " + currentPosition + "/"+newsCount);

              var description = article.description || "";
              var featuredImage = article.urlToImage;

              if (featuredImage === null || featuredImage == "") {
                  featuredImage = "assets/news-background.jpeg";
              }

                var articleAside =  returnArticle(currentPosition,newsCount);
                var article1 = newsList[articleAside[0]];
                var article2 = newsList[articleAside[1]];
                var article3 = newsList[articleAside[2]];

                $scope.news = {
                    'title': title,
                    'author': author,
                    'dateCreated': dateCreated,
                    'description': description,
                    'featuredImage': featuredImage,
                    'article1': article1,
                    'article2':article2,
                    'article3':article3,
                    'sourceIcon': config.image[config.source]
                }
              
              $scope.$apply();
              changeNews(currentPosition,newsCount);

              if (loopCounter == 0) {
              	newsloop();
              	cb = true;
              	callCallback();
              	loopCounter++;
              }

              
        });
          
      }; // end of insertDataToScope

      function newsloop(){

        if(config.loopNews){
            
                interval13 = setInterval(function () {
                    removeNewsClass();
                }, config.loopInterval/2);
            
                interval14 = setInterval(function () {
                  
                    insertDataToScope();
                    addNewsClass();

                }, config.loopInterval);
            
          }

      }
        



    function removeNewsClass(){

		$(".news-portrait .header").delay(2000).removeClass("fadeInLeft");
        $(".news-portrait .news").delay(2000).removeClass("news-animation");
        $(".news-portrait .news-aside-div").delay(2000).removeClass("fadeInRight");
        $(".news-portrait .divider-bottom").delay(2000).removeClass("fadeInUp");
        $(".news-portrait .news-item").delay(2000).removeClass("fadeInRight");
        $(".news-portrait .news-source-div").delay(2000).removeClass("fadeInDown");
    
    }

    function addNewsClass(){

        $(".news-portrait .header").addClass("fadeInLeft");
        $(".news-portrait .news").addClass("news-animation");
        $(".news-portrait .news-aside-div").addClass("fadeInRight");
        $(".news-portrait .divider-bottom").addClass("fadeInUp");
        $(".news-portrait .news-item").addClass("fadeInRight");
        $(".news-portrait .news-source-div").addClass("fadeInDown");

    }      
        
    function changeNews(currentPosition,newsCount) {

              //saving data in local storage
              if (currentPosition >= newsCount) {
                  currentPosition = 0;
                  localStorage.setItem('news-position', currentPosition);
              } else {
                  currentPosition++;
                  localStorage.setItem('news-position', currentPosition);
              }

          }  //end of changeNews function
        
    function returnArticle(currentPosition,newsCount){

              var counter = parseInt(currentPosition)+1;
              var articleAsidePosition = []; 

              for (var i = 0; i < 3; i++ ) {
                  
                  if (counter <= newsCount) {
                      articleAsidePosition.push(counter);
                      counter++;
                  }else {
                      counter = 0;
                      articleAsidePosition.push(counter);
                      counter++;
                  }
                  
              }
             
             return articleAsidePosition;
          }
         
         


	function removeInterval() {

		clearInterval(interval13);
		clearInterval(interval14);		

		
	}

	function callCallback() {

		if (cb) {
			$timeout(removeInterval, 37000);      
			$timeout(callback, 39000);	
		}
		
	}
}

function temp18Controller($scope, $window, $timeout, $http, temp2Src, callback, $q){
	var today = moment().format('MMM. DD, YYYY');
    var currentTime = moment().format('HH');

    var morning = ['05','06','07','08','09','10'];
    var afternoon = ['11','12','13','14','15','16','17'];
    var night = ['18','19','20','21','22','23','24'];
    var midnight = ['01','02','03','04','05'];
    var status;
	 
	    weather = function() {
	        var d = $q.defer();
	        $http({
	          method : 'GET',
	          url: 'http://api.openweathermap.org/data/2.5/forecast/daily?id=1701668&APPID=9f534971ae41269da3bdca6da5ad3a67&q=Manila&cnt=7',
	          withCredentials: false,
	          headers: { 'Content-Type': 'application/json' }
	        }).then(function(data){
	          d.resolve(data);
	        }, function(err) {
	        	d.reject('error');
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

	    	if (d == 'error') {
	    		console.log('error');
	    	}else {
			      now = weather_now().then(function(data){
			        now_w = {}
			        now_w["temp"] =  data.data.main.temp - 273.15
			        now_w["description"] = data.data.weather[0].description
			        now_w["weather"] = data.data.weather[0].main
			        now_w["greeting"] = getGreetingTime(moment(data.data.dt*1000))
			        now_w["icon"] = get_icon(now_w["weather"], now_w["greeting"])
			        now_w["currentDate"] = today
			        now_w["location"] = data.data.name

			        $(".weather-loader").fadeOut("slow",function(){
			            $(".weather").fadeIn(); 
			        });


			        var temp;

			        if ((now_w["weather"] == 'Rain' || now_w["weather"] == 'thunderstorm' || now_w["weather"] == 'shower rain') && status == 'morning') {
			          temp = '/assets/weather-rain-morning.jpg';
			          console.log('getting morning-rain background');
			        }else if ((now_w["weather"] == 'Rain' || now_w["weather"] == 'thunderstorm' || now_w["weather"] == 'shower rain') && status == 'afternoon') {
			          temp = '/asset//weather-rain-afternoon.png';
			        }else if ((now_w["weather"] == 'Rain' || now_w["weather"] == 'thunderstorm' || now_w["weather"] == 'shower rain') && status == 'night') {
			          temp = '/assets/weather-rain-night.png';
			        }else if ((now_w["weather"] == 'Rain' || now_w["weather"] == 'thunderstorm' || now_w["weather"] == 'shower rain') && status == 'midnight') {
			          temp = '/assets/weather-rain-midnight.png';
			        }else if (status == 'morning') {
			          temp = '/assets/weather-sun-morning.jpg';
			        }else if (status == 'afternoon') {
			          temp = '/assets/weather-sun-afternoon.png';
			        }else if (status == 'night') {
			          temp = '/assets/weather-sun-night.png';
			        }else if (status == 'midnight') {
			          temp = '/assets/weather-sun-midnight.png';
			        }else {
			          temp = '/assets/weather-sun-morning';
			        }



			        $(".weather-loader").fadeOut("slow",function(){
			            $(".weather").fadeIn(); 
			        });


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
}

function temp20Controller($scope, $window, $timeout, $http, temp2Src, callback, $q){
	var config =  {
            'loop': true,
            'loopInterval': 10000,
            'animationIn': 'zoomInUp',
            'animationOut': 'zoomOutUp'
        }


        var loopCounter = 0;
        var cb = false;
        var twitterCounter =  parseInt(localStorage.getItem('twitter-counter')) || 0;
        var temp, twitterData, hashtagList;
        var interval7, interval8;

        var twitterPosition = 0;

       function checkIfTwitterDataExpired(){

                var currentTimeStamp = moment().unix();

                if (localStorage.getItem('twitter-expiration-date') == null) {

                    getDataFromApi();
                
                }else{

                  if(localStorage.getItem('twitter-expiration-date') >= currentTimeStamp) {
                    console.log("Twitter data is still good and data is still within 4 hours.");
                    console.log("Getting data from the local storage");

                    if (localStorage.getItem('twitter') != null || localStorage.getItem('twitter') != '') {
                      
                      getDataFromStorage();
                    }

                      console.log("data is not good, getting data from the api");
                      getDataFromApi();

                    

                  }else{

                    getDataFromApi();


                  }

                }

              } // end of the checkIfNewsDataExpired function


        // checkIfTwitterDataExpired();

         

         function getDataFromApi() {

          console.log("fetch data from twitter api");


          $http.get('/api/twitter')
              .then(function(response) {

                  console.log(response);

                  var currentTimeStamp = moment().unix() + 14400;

                  console.log(response.data);

                  if (response.data) {
                      localStorage.setItem('twitter-expiration-date',currentTimeStamp);
                      localStorage.setItem('twitter',JSON.stringify(response.data));
                      localStorage.setItem('twitter-position',0);
                      console.log("fetch data from the local storage");

                      getDataFromStorage();
                  } else {
                      console.log("nothing returned");
                  }
              })
              .catch(function() {
                  // handle error
                  console.log('error occurred');
                  if (localStorage.getItem('twitter') != null && localStorage.getItem('twitter') != '') {
                    console.log("fetch data from the local storage");
                    getDataFromStorage();
                  }else{
                  	if (cb == false) {
                  		callback();	
                  	}
                    
                    // $(".twitter .loader").fadeIn("slow");
                  }
              })

      }

      function currentHashtag(){

          if (twitterCounter < hashtagList.length-1) {
            inserDataToScope();
            twitterCounter++;
          }else{
            twitterCounter = 0;
            inserDataToScope();
          }

          console.log("Twitter Counter: ", twitterCounter);
      }
        
        function getDataFromStorage() {

          
          temp = localStorage.getItem('twitter');
          twitterData = JSON.parse(temp);

          hashtagList = twitterData.pop();

          // localStorage.setItem('twitter-position',0);
          // localStorage.setItem('twitter-counter',0);
          $(".twitter-portrait .loader").fadeOut("slow");
          inserDataToScope();
      }

      function inserDataToScope(){


            var tweets = twitterData.status.statuses;
            var tweetsCount  = tweets.length-1;
            var currentPosition = twitterPosition;
            var nextTweetPosition = (currentPosition < tweetsCount)? currentPosition+1 : 0;
            console.log("Current Tweet Position: " + currentPosition +"/"+tweetsCount);
                
            $scope.topHashtag = removeSpace(twitterData.status.topHastagToday);
            
            
            // if ($scope.topHashtag.length > 15) {
            //     $(".hashtag-overlay").css("font-size","3.5em");
            //     $(".hashtag-overlay").css("top","2.5em");
            //     $(".hashtag-overlay").css("letter-spacing","0");
            // }else {
            //     $(".hashtag-overlay").css("font-size","7em");
            //     $(".hashtag-overlay").css("top","1em");
            // }


            $scope.tweet = tweets[currentPosition];
            $scope.tweetTextPort = removeEmojis(tweets[currentPosition].text);
            $scope.tweetDate = moment(tweets[currentPosition].created_at).format('LL');
            
            
            $scope.nextTweet = tweets[nextTweetPosition];
            $scope.nextTweetText = removeEmojis(tweets[nextTweetPosition].text);
            $scope.nextTweetDate = moment(tweets[nextTweetPosition].created_at).format('LL');

            $scope.name = removeEmojis(tweets[currentPosition].user.name);
            $scope.username = removeEmojis(tweets[currentPosition].user.screen_name);

            
            if(!$scope.$$phase) {
              $scope.$apply();
            }
//            $scope.$apply();
            
            changePosition(currentPosition,tweetsCount);
            // checkIfDataEnds();

              if (loopCounter == 0) {
              	twitterloop();
              	cb = true;
              	callCallback();
              	loopCounter++;
              }
            
        
        }

        function twitterloop() {


			if (config.loop) {	

	              interval11 = setInterval(function () {
	                  twitterRemoveClass();
	                }, config.loopInterval/2);

	            
	              interval12 = setInterval(function () {

	                  $scope.$apply(function(){
	                    inserDataToScope();
	                    twitterAddClass();
	                    });
	                    
	                }, config.loopInterval);
	            
	        }

        }

	                	
        

        

        function twitterRemoveClass(){
              $(".twitter-portrait #currentTweet").delay(2000).removeClass("bounceInUp");
              $(".twitter-portrait #secondTweet").delay(2000).removeClass("slideInUp");
        }


        function twitterAddClass(){
                $(".twitter-portrait #currentTweet").addClass("bounceInUp");
                $(".twitter-portrait #secondTweet").addClass("slideInUp");
        }
        
        function removeSpace(topHashtag) {
            
            if (topHashtag.indexOf('#') >= 0) {
                return topHashtag.replace(/ /g,'');
            }else {
                return '#' + topHashtag.replace(/ /g,'');
            }
            
        }
        
      function changePosition(currentPosition,tweetsCount) {

              if (currentPosition >= tweetsCount) {
                  twitterPosition = 0;
                  localStorage.setItem('twitter-position', currentPosition);
                  localStorage.setItem('twitter-counter',twitterCounter);
                  currentHashtag();
              } else {
                  twitterPosition++;
                  localStorage.setItem('twitter-position', currentPosition);
                  localStorage.setItem('twitter-counter', twitterCounter);
              }

              $scope.TemplateData.forEach(function(item){
					if(item.Template == 'temp20'){
							item.lastTweet = twitterPosition
			    		}
				})
            
            return currentPosition;

          }
        
    function removeEmojis (string) {
          var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

          return string.replace(regex, '');
        }


	function removeInterval() {


	clearInterval(interval11);
	clearInterval(interval12);		


	}

	$scope.TemplateData.forEach(function(item){
		if(item.Template == 'temp20'){
    			twitterData = item.TempData;
    			twitterPosition = item.lastTweet;


		          $(".twitter .loader").fadeOut("slow");
		          inserDataToScope();
    		}
	})


	function callCallback(){
		if (cb) {
			$timeout(removeInterval, 58000);   
		    $timeout(callback, 60000);	
		}
	}
}


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
	        'loopStore': true,
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
		        starWidth: "30px",
		    });


	      function checkIfRestaurantDataExpired(){

	          var currentTimeStamp = moment().unix();

	          if (localStorage.getItem('restaurant-expiration-date') == null) {

	              fetchRestaurantData(config.url);
	          
	          }else{

	            if(localStorage.getItem('restaurant-expiration-date') >= currentTimeStamp) {
	              console.log("restaurant data is still good and data is still within 1 month.");
	              console.log("Getting data from the local storage");

	              if (localStorage.getItem('restaurant') == null || localStorage.getItem('restaurant') == '') {
	                console.log("data is not good, getting data from the api");
	                fetchRestaurantData(config.url);
	              }

	              getDataFromStorage();

	            }else{

	              fetchRestaurantData(config.url);


	            }

	          }

	        } // end of the checkIfNewsDataExpired function


	        for(var i=0; i< $scope.TemplateData.length; i++){
	    		if($scope.TemplateData[i].Template == 'temp23'){
	    			restaurantData = $scope.TemplateData[i].TempData;
	    			insertDataToScope();
	    		}
	    	}
    	

	        // checkIfRestaurantDataExpired();

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
	                        localStorage.setItem('restaurant-expiration-date',currentTimeStamp);
	                        localStorage.setItem('restaurant',JSON.stringify(restaurantList));
	                        getDataFromStorage();
	                      }
	                      
	                  } else {
	                      console.log("nothing returned");
	                  }
	              })
	              .catch(function() {
	                  // handle error
	                  console.log('error occurred');
	                  if (cb == false) {
	                  	callback();	
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
	                localStorage.setItem('restaurant-expiration-date',currentTimeStamp);
	                localStorage.setItem('restaurant',JSON.stringify(restaurantList));
	                //location.reload();
	                getDataFromStorage();

	            }else {
	              url = 'https://developers.zomato.com/api/v2.1/geocode?lat=' + config.lat + '&lon=' + config.long;
	              fetchRestaurantData(url);
	            }


	        }

	        function getDataFromStorage() {

	          console.log("fetch data from local storage");

	          temp = localStorage.getItem('restaurant');
	          restaurantData = JSON.parse(temp);
	          console.log(restaurantData);
	          // localStorage.setItem('restaurant-position',0);

	          insertDataToScope();
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
				$timeout(removeInterval2, 38000);      
				$timeout(callback, 40000);
			}
			
		}
};




function temp22Controller($scope, $window, $timeout, $http, temp2Src, callback, $q){

    

    

    var config = {
        'loop':'true',
        'loopInterval': 10000,
        'animationEnter': 'flipInX',
        'animationOut' : 'flipOutX'
    }

    var bgList = ['/assets/hugot-background-1.png','/assets/hugot-background-2.png','/assets/hugot-background-3.png','/assets/hugot-background-4.png','/assets/hugot-background-5.png'];
    

    var interval5, interval6;

    var hugotList;
    
    
    // var hugotList = [
    //     "Sabi ko na nga ba sabon ka! Kasi I'm SOAPer in love with you!",
    //     "Sana gravity nalang ako para kahit lumayo ka babalik at babalik ka din sa akin.",
    //     "Don't waste your time to the person who doesn't even cares to your feelings.",
    //     "Kung dalawa ang mahal mo, piliin mo yung pangalawa.. kasi, hindi ka naman magmamahal ng iba kung mahal mo talaga yung una.",
    //     "Sa Tindi ng Trapik sa EDSA, naniniwala na ako sa FOREVER.",
    //     "Ang Paglalakbay natin sa buhay ay tulad sa batas trapiko. Alam natin kung kailan maghahanda, ititigil at magpapatuloy, higit sa lahat ng sumusunod sa batas.",
    //     "Ang landian ay parang pagkain lang. Pag nasobrahan, nakakalaki ng tiyan.",
    //     "Liliko ako kahit saan, Makarating lang sa Kinaroroonan mo.",
    //     "Hintayin mo ang True Love mo. Na Traffic lang yun sa malalanding tao.",
    //     "If you want to be part of my life, make sure that you are ready to accept not only the good parts but also my stupid side.",
    //     "How can you love someone else. If you’re returning to the past.",
    //     "In a relationship, no matter how carefully you hold the one.. Yet you have lost it.. Because he had released the hold earlier.",
        
    // ]
    
    for(var i=0; i< $scope.TemplateData.length; i++){
    		if($scope.TemplateData[i].Template == 'temp22'){
    			hugotList = $scope.TemplateData[i].TempData;
    			console.log(hugotList);
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
        var val = uniqueRandoms[index];


        uniqueRandoms.splice(index, 1);

        return val;

    }        
        function insertDataToScope() {
            
             $scope.hugotText = hugotList[makeUniqueRandom()];
             $scope.hugotBackground  = bgList[Math.floor(Math.random() * bgList.length)];

             
        }

	         if (config.loop) {
	            
	            insertDataToScope();
	    
	            interval5 = setInterval(function(){
	                hugotRemoveClass();
	            },config.loopInterval/2);

	            interval6 = setInterval(function(){

	                insertDataToScope();
	                hugotAddClass();
	                $scope.$apply();

	            },config.loopInterval);
	    
	        }       	
        
        


        function hugotRemoveClass(){
            $(".hugot-text").delay(2000).removeClass(config.animationEnter);
        }

        function hugotAddClass(){
            $(".hugot-text").addClass(config.animationEnter);
        }
       




	function removeInterval() {

		clearInterval(interval5);
		clearInterval(interval6);			



	}

    $timeout(removeInterval, 19000);   
    $timeout(callback, 20000);

};




function temp21Controller($scope, $window, $timeout, $http, tempSrc, callback){ 


  	var filter = ["now_playing","upcoming","popular","top_rated"];
    var size= ["w92", "w154", "w185", "w342", "w500", "w780", "original"]
    var config = {
    	"filter": filter[1],
    	"posterSize": size[4],
    	"backgroundSize": size[5],
    	"loop": true,
    	"loopInterval": 13000,
    	"animation": "flipInX"
    }

    var temp, movieData;
    var loopCounter = 0;
    var cb = false;
    var currentPosition = parseInt(localStorage.getItem('movie-position')) || 0;
    var moviesLength = 0;
    var movies, interval9, interval10; 

    config.url = "https://api.themoviedb.org/3/movie/"+config.filter+"?api_key=f2ebc8131c456f6ee2f134ac299aa40f&language=en&US";



    if (config.filter == "now_playing") {
    	$scope.movieslist = "Movies in Cinemas";
    }else if(config.filter == "upcoming"){
    	$scope.movieslist = "Latest Movies";
    }else if(config.filter == "popular"){
    	$scope.movieslist = "Popular Movies";
    }else if (config.filter == "top_rated"){
    	$scope.movieslist = "Top Rated Movies";
    }else{
    	$scope.movieslist = "Latest Movies";
    }


      function checkIfMovieDataExpired(){

                var currentTimeStamp = moment().unix();

                if (localStorage.getItem('movie-expiration-date') == null) {

                    getDataFromApi();
                
                }else{

                  if(localStorage.getItem('movie-expiration-date') >= currentTimeStamp) {
                    console.log("Movie data is still good and data is still within 4 hours.");
                    console.log("Getting data from the local storage");

                    if (localStorage.getItem('movie') == null || localStorage.getItem('movie') == '') {
                      console.log("data is not good, getting data from the api");
                      getDataFromApi();
                    }

                    getDataFromStorage();

                  }else{

                    getDataFromApi();


                  }

                }

              } // end of the checkIfMovieDataExpired function


    checkIfMovieDataExpired();

    function getDataFromApi() {

          console.log("fetch data from themoviedb api");


          $http.get(config.url)
              .then(function(response) {

                  var currentTimeStamp = moment().unix() + 259200;

                  if (response.data) {
                      localStorage.setItem('movie-expiration-date',currentTimeStamp);
                      localStorage.setItem('movie',JSON.stringify(response.data));
                      localStorage.setItem('movie-position',0);
                      //location.reload();
                      console.log("fetch data from the local storage");
                      getDataFromStorage();
                  } else {
                      console.log("nothing returned");
                  }
              })
              .catch(function() {
                  // handle error
                  console.log('error occurred');
                  if (localStorage.getItem('movie') != null && localStorage.getItem('movie') != '') {
                    console.log("fetch data from the local storage");
                    getDataFromStorage();
                  }else{
                  	if (cb == false) {
                  		callback();	
                  	}
                    
                  }
              })

      }


       function getDataFromStorage() {

          
          temp = localStorage.getItem('movie');
          movieData = JSON.parse(temp);
          movies = movieData.results;
          moviesLength = movies.length;
          inserDataToScope();
      }


    function inserDataToScope(){

        var result = movies[currentPosition];

        if (result.overview.length > 400) {
            $(".movie-description p").css("font-size",".6em");
        }else{
            $(".movie-description p").css("font-size",".7em");
        }

        console.log("Movie position: " + currentPosition + "/" + moviesLength);

        $scope.title = result.original_title;
        $scope.description = result.overview;
        $scope.vote_average = "Ratings: " + result.vote_average + " / 10";
        $scope.release_date = "Release Date: " + moment(result.release_date).format('LL');
        $scope.poster_path = "http://image.tmdb.org/t/p/"+config.posterSize+"/"+result.poster_path;
        $scope.backdrop_path = "http://image.tmdb.org/t/p/"+config.backgroundSize+"/"+result.backdrop_path;
        $scope.animation = config.animation;

        if (loopCounter == 0) {
        	movieloop();
        	cb = true;
        	callCallback();
        	loopCounter++;	
        }
        

    }

    function changeMovie(){
    	
	       if ((currentPosition+1) >= moviesLength) {
              currentPosition = 0;
              localStorage.setItem('movie-position',currentPosition);
              console.log('setting data ' , currentPosition);
              inserDataToScope();
          } else {
              currentPosition++;
              localStorage.setItem('movie-position',currentPosition);
              console.log('setting data ' , currentPosition);
              inserDataToScope();
          }

    }

    function movieRemoveClass(){
		$(".movie-poster").delay(2000).removeClass("bounceInDown");   
        $(".movie-title").delay(2000).removeClass(config.animation);   
        $(".movie-release-date").delay(2000).removeClass(config.animation);   
        $(".movie-description").delay(2000).removeClass(config.animation);   
        $(".movie-ratings").delay(2000).removeClass(config.animation);   
        $(".movie-logo").delay(2000).removeClass("fadeInUp");   
    }

    function movieAddClass(){
		$(".movie-poster").addClass("bounceInDown");
        $(".movie-title").addClass(config.animation);
        $(".movie-release-date").addClass(config.animation);
        $(".movie-description").addClass(config.animation);
        $(".movie-ratings").addClass(config.animation);
        $(".movie-logo").addClass("fadeInUp");
    }


    function movieloop(){

	    if (config.loop) {

		 interval9 = setInterval(function () {
		        movieRemoveClass();     
		    }, config.loopInterval/2);

		  interval10 = setInterval(function () {
		        changeMovie();
		        movieAddClass();
		        $scope.$apply();
		    }, config.loopInterval);

	    }

    }





	function removeInterval() {

		clearInterval(interval9);
		clearInterval(interval10);		

	}

	function callCallback(){

		if (cb) {
			$timeout(removeInterval, 37000);   
	    	$timeout(callback, 39000);	
		}
	}

	
   
};



function temp19Controller($scope, $window, $timeout, $http, tempSrc, callback, $q){ 

        
        var today = new Date();
        var yesterday = new Date(today.getTime() - 86400000);
        var currencyToDisplay = ["PHP","JPY","EUR"];
        var temp, currencyData;
        var errorCounter = 0;
        var cb = false;
        var loopCounter = 0;

        var config = {
            'currentDate': moment(today).format('YYYY-MM-DD'),
            'yesterdayDate': moment(yesterday).format('YYYY-MM-DD'),
        }
        
        console.log(config.currentDate);
        console.log(config.yesterdayDate);


        function checkIfCurrencyDataExpired(){

                var currentTimeStamp = moment().unix();

                if (localStorage.getItem('currency-expiration-date') == null) {

                    getDataFromApi();
                
                }else{

                  if(localStorage.getItem('currency-expiration-date') >= currentTimeStamp) {
                    console.log("currency data is still good and data is still within 2 hours.");
                    console.log("Getting data from the local storage");

                    if (localStorage.getItem('currency') == null || localStorage.getItem('currency') == '') {
                      console.log("data is not good, getting data from the api");
                      getDataFromApi();
                    }

                    getDataFromStorage();

                  }else{

                    getDataFromApi();


                  }

                }

              } // end of the checkIfNewsDataExpired function


         function getDataFromApi() {

            errorCounter++;

            if(errorCounter > 10) {
                //add some error catch here if the internet is not working
                getDataFromStorage();

            } else {


                console.log("fetch data from currency api");

                //get the current data today
                var url = 'https://openexchangerates.org/api/latest.json?app_id=611c0c2870aa4804a4014db80c91ee2d';
                var results = [];
                

              $http.get(url)
                  .then(function(response) {

                      console.log(response);

                      var currentTimeStamp = moment().unix() + 7200;

                      if (response.data) {

                          results.push(response.data.rates);

                          url = 'https://openexchangerates.org/api/historical/'+ config.yesterdayDate +'.json?app_id=611c0c2870aa4804a4014db80c91ee2d';

                          $http.get(url)
                                .then(function(response) {

                                    results.push(response.data.rates);

                                    localStorage.setItem('currency-expiration-date',currentTimeStamp);
                                    localStorage.setItem('currency',JSON.stringify(results));
                                })
                                .catch(function(){

                                    console.log('error occured on the 2nd level of currency');
                                    callback();	
                                      if (localStorage.getItem('currency') != null && localStorage.getItem('currency') != '') {
                                        console.log("fetch data from the local storage");
                                        getDataFromStorage();
                                      }else{
                                      	if (cb == false) {
                                      		callback();	
                                      	}
                                      	
                                        // getDataFromApi();
                                      }
                                })



                          console.log("fetch data from the local storage");
                          getDataFromStorage();
                      } else {
                          console.log("nothing returned");
                      }
                  })
                  .catch(function() {
                      // handle error
                      console.log('error occurred on the first level of currency');
                      callback();	
                      if (localStorage.getItem('currency') != null && localStorage.getItem('currency') != '') {
                        console.log("fetch data from the local storage");
                        getDataFromStorage();
                      }else{
                      	if (cb == false) {
                      		callback();	
                      	}
                        
                      }
                  })

            }

            
      }


    function getDataFromStorage() {

          
          temp = localStorage.getItem('currency');
          currencyData = JSON.parse(temp);
          if (loopCounter == 0) {
          	cb = true;
          	callCallback();
          	loopCounter++;	
          }
          
          inserDataToScope(currencyData);
      }

        
        function inserDataToScope(rates) {
            
            var rate_today= rates[0],
                  rate_yesterday = rates[1],
                  signs = {},
                  result = [];
            
            //get the first date
            var ratesToday = {
                'usd': parseFloat(Math.fround(parseFloat(rate_today[currencyToDisplay[0]])).toPrecision(5)),
                'yen': parseFloat(Math.fround(parseFloat(rate_today[currencyToDisplay[0]]/rate_today[currencyToDisplay[1]])).toPrecision(5)),
                'euro': parseFloat(Math.fround(parseFloat(rate_today[currencyToDisplay[0]]/rate_today[currencyToDisplay[2]])).toPrecision(5))
            }
            
            var ratesYesterday = {
                'usd': parseFloat(Math.fround(parseFloat(rate_yesterday[currencyToDisplay[0]])).toPrecision(5)),
                'yen': parseFloat(Math.fround(parseFloat(rate_yesterday[currencyToDisplay[0]]/rate_yesterday[currencyToDisplay[1]])).toPrecision(5)),
                'euro': parseFloat(Math.fround(parseFloat(rate_yesterday[currencyToDisplay[0]]/rate_yesterday[currencyToDisplay[2]])).toPrecision(5))
            }
            
            console.log(ratesToday);
            console.log(ratesYesterday);
            
            if (ratesToday.usd > ratesYesterday.usd) {
                signs.usd = "up";
            }else if (ratesToday.usd == ratesYesterday.usd) {
                signs.usd = "equal";
            }else {
                signs.usd = "down";
            }
            
            if (ratesToday.yen > ratesYesterday.yen) {
                signs.yen = "up";
            }else if (ratesToday.yen == ratesYesterday.yen) {
                signs.yen = "equal";
            }else {
                signs.yen = "down";
            }
            
            if (ratesToday.euro > ratesYesterday.euro) {
                signs.euro = "up";
            }else if (ratesToday.euro == ratesYesterday.euro) {
                signs.euro = "equal";
            }else {
                signs.euro = "down";
            }
            
            console.log(signs);
            result.push(ratesToday,ratesYesterday,signs);
            console.log(result);
            insertDataToScope(result);
            
    }
}











