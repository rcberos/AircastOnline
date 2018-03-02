
function temp10Controller($scope, $window, $timeout, $http, tempSrc, callback){

 /*
    1. entertainment
    buzzfeed and entertainment-weekly

    2. breaking news
    cnn, al-jazeera-english, google-news

    3. financial and business
    -bloomberg,business insider uk

    4. tech
    techcrunch

    5. sports
    espn
    */

    var loopCounter = 0;
    var interval1, interval2;

    var localData;

    var newsSource;
            
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

        
        for(var i=0; i< $scope.TemplateData.length; i++){
    		if($scope.TemplateData[i].Template == 'temp10' && $scope.TemplateData[i].CampaignID == tempSrc.CampaignID){
    			localData = $scope.TemplateData[i].TempData;
          newsSource = $scope.TemplateData[i].source;
    			insertDataToScope();
    		}
    	}


          //insert all the data to the angular $scope
      function insertDataToScope() {
          console.log('temp 10 data insert');
          $(".news-loader").fadeOut("slow",function(){
  
              // var x = localStorage.getItem('news');
              var x = localData;
              // var parsedData = JSON.parse(x);
              var parsedData = localData;

              // //check if data is empty
              // if (parsedData == '') {
              //   getDataFromApi();
              // }

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
                    'sourceIcon': config.image[newsSource]
                }
              
              $scope.$apply();
              changeNews(currentPosition,newsCount);

              if(title.length > 50) {
                  $(".news-headline h1").css("font-size","1.2em");
              }else {
                $(".news-headline h1").css("font-size","1.5em");
              }

              if (description.length > 200) {
                  $(".news-upper").css("margin-top","3em")
              }else {
                  $(".news-upper").css("margin-top","4em")
              }

              if (loopCounter == 0) {
              	newsloop();
              	loopCounter++;
              }

              
        });
          
      }; // end of insertDataToScope

      function newsloop(){

        if(config.loopNews){
            
                interval1 = setInterval(function () {
                    removeNewsClass();
                }, config.loopInterval/2);
            
                interval2 = setInterval(function () {
                  
                    insertDataToScope();
                    addNewsClass();

                }, config.loopInterval);
            
          }

      }
        



    function removeNewsClass(){

		$(".news .header").delay(2000).removeClass("fadeInLeft");
        $(".news .news").delay(2000).removeClass("news-animation");
        $(".news .news-aside-div").delay(2000).removeClass("fadeInRight");
        $(".news .divider-bottom").delay(2000).removeClass("fadeInUp");
        $(".news .news-item").delay(2000).removeClass("fadeInRight");
        $(".news .news-source-div").delay(2000).removeClass("fadeInDown");
    
    }

    function addNewsClass(){

        $(".news .header").addClass("fadeInLeft");
        $(".news .news").addClass("news-animation");
        $(".news .news-aside-div").addClass("fadeInRight");
        $(".news .divider-bottom").addClass("fadeInUp");
        $(".news .news-item").addClass("fadeInRight");
        $(".news .news-source-div").addClass("fadeInDown");

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

		if (interval1 != undefined && interval2 != undefined) {
			clearInterval(interval1);
			clearInterval(interval2);		
		} 

		
	}

    $timeout(removeInterval, 37000);      
	$timeout(callback, 39000);

}