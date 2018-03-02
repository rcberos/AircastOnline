function temp20Controller($scope, $window, $timeout, $http, tempSrc, callback){ 

   
        var config =  {
            'loop': true,
            'loopInterval': 10000,
            'animationIn': 'zoomInUp',
            'animationOut': 'zoomOutUp'
        }


        var loopCounter = 0;
        var twitterCounter =  parseInt(localStorage.getItem('twitter-counter')) || 0;
        // var twitterCounter = 0;
        var temp, twitterData, hashtagList;
        var interval7, interval8;

        var twitterPosition = 0;
        var twitterArray = 0;


    $scope.TemplateData.forEach(function(item){
    if(item.Template == 'temp20'){
          twitterData = item.TempData;
          twitterPosition = item.lastTweet;
          twitterArray = item.lastArray;

              $(".twitter-portrait .loader").fadeOut("slow");
              inserDataToScope();
        }
  })


      function inserDataToScope(){


            // var tweets = twitterData[twitterCounter].statuses;
            var tweets = twitterData[twitterArray].statuses;
            var tweetsCount  = tweets.length-1;
            var currentPosition = twitterPosition;
            var nextTweetPosition = (currentPosition < tweetsCount)? currentPosition+1 : 0;
            console.log("Current Tweet Position: " + currentPosition +"/"+tweetsCount +' of array['+twitterArray+']');

            // $scope.topHashtag = removeSpace(hashtagList[twitterCounter]);
            $scope.topHashtag = removeSpace(twitterData[twitterArray].Hashtag);


            if ($scope.topHashtag.length >= 15) {
                $(".hashtag-overlay").css("font-size","1.1em");
                $(".hashtag-overlay").css("letter-spacing","0");
                $(".hashtag-overlay").css("top","5em");
            }else {
                $(".hashtag-overlay").css("font-size","1.3em");
                $(".hashtag-overlay").css("top","4em");
            }

            
            $scope.tweet = tweets[currentPosition];
            $scope.tweetText = removeEmojis(tweets[currentPosition].text);
            $scope.tweetDate = moment(tweets[currentPosition].created_at).format('LL');
            
            
            $scope.nextTweet = tweets[nextTweetPosition];
            $scope.nextTweetText = removeEmojis(tweets[nextTweetPosition].text);
            $scope.nextTweetDate = moment(tweets[nextTweetPosition].created_at).format('LL');

            $scope.name = removeEmojis(tweets[currentPosition].user.name);
            $scope.username = removeEmojis(tweets[currentPosition].user.screen_name);


            
//            $scope.$apply();
            
            changePosition(currentPosition,tweetsCount);
            // checkIfDataEnds();

              if (loopCounter == 0) {
                twitterloop();
                loopCounter++;
              }
            
        
        }

            
        function twitterloop(){

          if (config.loop) {

                interval7 = setInterval(function () {
                    twitterRemoveClass();
                  }, config.loopInterval/2);

              
                interval8 = setInterval(function () {

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
        
        function updateValues() {
          $scope.TemplateData.forEach(function(item){
          if(item.Template == 'temp20'){
              item.lastTweet = twitterPosition
              item.lastArray = twitterArray;
              }
        })
        }

      function changePosition(currentPosition,tweetsCount) {

              if (twitterPosition >= tweetsCount) {
                  twitterPosition = 0;
                  twitterArray = twitterArray+1;
                  console.log('twitterData: '+twitterData.length);
                  if(twitterArray>= twitterData.length){
                    twitterArray = 0;
                  }
                  updateValues();
                  console.log('twitterArray: '+twitterArray);
              } else {
                  twitterPosition++;
                  updateValues();
              }


            
            // inserDataToScope();
            return currentPosition;

          }
        
    function removeEmojis (string) {
          var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

          return string.replace(regex, '');
        }


  function removeInterval() {

    if (interval7 != undefined && interval8 != undefined) {
      clearInterval(interval7);
      clearInterval(interval8);   
    } 


  }


    $timeout(removeInterval, 38000);   
    $timeout(callback, 40000);


};