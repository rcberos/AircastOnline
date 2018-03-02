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