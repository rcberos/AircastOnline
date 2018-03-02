
function temp17Controller($scope, $window, $timeout, $http, temp2Src, callback, $q){
  var loopCounter = 0;
    var cb = false;
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
    

        
    // checkIfNewsDataExpired();

    for(var i=0; i< $scope.TemplateData.length; i++){
        if($scope.TemplateData[i].Template == 'temp17'){
          localData = $scope.TemplateData[i].TempData;
          newsSource = $scope.TemplateData[i].source;
          insertDataToScope();
        }
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