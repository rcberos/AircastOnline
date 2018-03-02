var app = angular.module('MainModule', ['ui.bootstrap', 'ui.event', 'ngAnimate','ui.odometer']);


app.filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace !== -1) {
                  //Also remove . and , so its gives a cleaner result.
                  if (value.charAt(lastspace-1) === '.' || value.charAt(lastspace-1) === ',') {
                    lastspace = lastspace - 1;
                  }
                  value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });

app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });

app.controller('MainController', function($scope, $http, $interval, $timeout, $window, $q, $sce){

  reloader = 1;
  // $window.alert('W: '+$window.innerWidth+' H: '+$window.innerHeight);

  $scope.demoState = 0;
  

  var yesterday = new Date((Date.now()) - 86400000);
  console.log('yesterday: '+Date.now());

  $scope.mainDiv = {
    "position": "absolute",
    "top":      "0px",
    "left":     "0px",
    "width":    $window.innerWidth+"px",
    "height":   $window.innerHeight+"px",
    "background-color": "black"
  }


  $scope.TemplateData = [];


  $scope.templates = [];

  var payload = {
    CampaignID: 2,
    tempHtml: 'templates/temp2.html',
    tempSrc: {
                video: "assets/audition.mp4",
                side1: "assets/side1.jpg",
                side2: "assets/side1.jpg",
                side3: "assets/side1.jpg",
                bottom: "assets/bottom.jpg",
              },
    tempJs: 'scripts/temp2.js',
    tempCss: 'css/temp2.css',
    tempInit: 'temp2Controller'
  }

  $scope.Default = payload;

  $scope.templates.push(payload);

  

  $scope.currentCampaignID = 0;

  
  var isStart = true;
  $scope.templatePosition = 0;
  $scope.templateShuffle = function(){


    if($scope.templates.length == 0){

        $scope.templates.push($scope.Default);
    }

    var playingTemplate = $scope.templates[0];
    $scope.templates.shift();
    $scope.templates.push(playingTemplate);

    

    UpdateWallet($http, playingTemplate.CampaignID);


    $scope.currentTemp = playingTemplate.tempHtml;
    if(!$scope.$$phase) {
      $scope.$apply();
    }


    // $scope.CurrentTemplate = $

    var tempNameSpace = {
      '$scope': $scope,
      '$window': $window,
      '$timeout': $timeout,
      '$http': $http,
      'source': playingTemplate,
      "callback": $scope.templateShuffle,
      '$q': $q
    };

    var payl2 = [tempNameSpace['$scope'], tempNameSpace['$window'], tempNameSpace['$timeout'], tempNameSpace['$http'], tempNameSpace['source'], tempNameSpace['callback'], tempNameSpace['$q']];
    // var payl = [$scope, $window, $timeout, $http, playingTemplate.tempSrc, $scope.templateShuffle];

    // window[playingTemplate.tempInit].apply(null, payl2);

    LazyLoad.css(playingTemplate.tempCss, function () {
      LazyLoad.js(playingTemplate.tempJs, function () {
        console.log('playing js');
        window[playingTemplate.tempInit].apply(null, payl2);
      });
    });


  }

  $scope.templateShuffle();


  $scope.getTemplates = function(){
    console.log('getTemplates');
    $http.get('/myID').then(function(response){


      var RpiID = response.data.RpiID;

      var data = {
        RpiID: RpiID
      }

      $http.post('http://54.254.248.115/rpiGetState', data).then(function(response){
        // console.log(response.data);

        var state = response.data.State;

        if(state == 0){
          $scope.templates = [];
          console.log("state 0");
          var payload = {
            CampaignID: 2,
            tempHtml: 'templates/temp4.html',
            tempSrc: {
                        gif: "assets/AircastOpen.png",
                      },
            tempJs: 'scripts/temp4.js',
            tempCss: 'css/temp4.css',
            tempInit: 'temp4Controller'
          }

          $scope.templates.push(payload);
          // $scope.templateShuffle();
        }
        else if(state == 1){
          $http.post('http://54.254.248.115/rpiGetCampaigns2', data).then(function(response){
          // $http.post('http://ec2-54-169-234-246.ap-southeast-1.compute.amazonaws.com/api/v0/aircast_new_campaign.php', data).then(function(response){
            console.log('Template Data');
            console.log($scope.TemplateData);

            var newTemplates = response.data;
            console.log(newTemplates);
            console.log('temp');
            // console.log($scope.templates);
            
            var i=0;
            while(i<$scope.templates.length){
              var wasInside = false;
              for(var j=0; j<newTemplates.length; j++){
                // console.log("NEW: "+newTemplates[j].CampaignID+" OLD: "+$scope.templates[i].CampaignI);
                if(newTemplates[j].CampaignID == $scope.templates[i].CampaignID){
                  wasInside = true;
                  break;
                }
              }

              if(!wasInside){
                $scope.templates.shift();
              }
              else{
                i++;
              }
              // console.log('i: '+i);
              // console.log($scope.templates);
            }



            // console.log('mid temp');
            // console.log($scope.templates);
            for(var i=0; i<newTemplates.length; i++){
              // console.log(newTemplates[i]);
              var wasInside = false;
              for(var j=0; j<$scope.templates.length; j++){
                if(newTemplates[i].CampaignID == $scope.templates[j].CampaignID){
                  wasInside = true;
                  break;
                }
              }
              if(!wasInside){

                if(newTemplates[i].needTempData){
                  var hasTempData = false;
                  for(var j=0; j < $scope.TemplateData.length; j++){
                    if($scope.TemplateData[j].Template == newTemplates[i].Template && $scope.TemplateData[j].CampaignID == newTemplates[i].CampaignID){
                      hasTempData = true;
                      break;
                    }
                  }

                  if(!hasTempData){
                    var dummyTemp = {
                      Template: newTemplates[i].Template,
                      hasData: false,
                      tempSrc: newTemplates[i].tempSrc,
                      CampaignID: newTemplates[i].CampaignID
                    }

                    $scope.TemplateData.push(dummyTemp);
                  }

                  for(var j=0; j < $scope.TemplateData.length; j++){
                    if($scope.TemplateData[j].Template == newTemplates[i].Template && $scope.TemplateData[j].hasData == true && $scope.TemplateData[j].CampaignID == newTemplates[i].CampaignID){
                      $scope.templates.unshift(newTemplates[i]);
                      console.log('shifting');
                    }
                  }




                }
                else{
                  $scope.templates.unshift(newTemplates[i]);
                }





                // console.log('inserted');
                // $scope.templates.unshift(newTemplates[i]);
              }
              // else
              //   console.log('not inserted');
            }


            for(var i = 0; i<$scope.TemplateData.length;i++){
              var isInside = false;
              for(var j=0; j<newTemplates.length; j++){
                if(newTemplates[j].CampaignID == $scope.TemplateData[i].CampaignID){
                  isInside = true;
                  console.log('Campaign: ' + newTemplates[j].CampaignID)
                  break;
                }
              }
              if(!isInside){
                $scope.TemplateData.splice(i, 1);
              }

            }

            console.log($scope.TemplateData);


              
            if(!$scope.$$phase) {
              $scope.$apply();
            }
            // console.log($scope.templates);
            // $timeout(function(){$scope.getTemplates();}, 5000);
          }, function(err){
            console.log(err);
            // $timeout(function(){$scope.getTemplates();}, 5000);
          });
        }
        else if(state == 2){
          $scope.templates = [];

          var payload = {
            CampaignID: 2,
            tempHtml: 'templates/temp4.html',
            tempSrc: {
                        gif: "assets/AircastClose.png",
                      },
            tempJs: 'scripts/temp4.js',
            tempCss: 'css/temp4.css',
            tempInit: 'temp4Controller'
          }

          $scope.templates.push(payload);
          // $scope.templateShuffle();
        }


      }, function(err){
        console.log(err);
      });


          

    }, function(error){
      // $timeout(function(){$scope.getTemplates();}, 5000);
    });

      
  }


  function getTempData(){
    var payl = [$http, $scope];

    // landscape-content

    window['temp10GetData'].apply(null, payl);  //news-landscape-cnn
    // window['temp11GetData'].apply(null, payl);  //nearby-restaurant-landscape
    window['temp12GetData'].apply(null, payl);  //weather-landscape
    // window['temp13GetData'].apply(null, payl);  //currency-landscape
    window['temp14GetData'].apply(null, payl);  //twitter-landscape
    window['temp15GetData'].apply(null, payl);  //hugot-landscape
    window['temp16GetData'].apply(null, payl);  //movie-landscape
    window['temp26GetData'].apply(null, payl);  //instagram-post
    window['temp27GetData'].apply(null, payl);  //facebook-post
    window['temp28GetData'].apply(null, payl);  //facebook-post

    


    //portrait-content
    // window['temp17GetData'].apply(null, payl);
    // window['temp18GetData'].apply(null, payl);
    // window['temp19GetData'].apply(null, payl);
    // window['temp20GetData'].apply(null, payl);
    // window['temp22GetData'].apply(null, payl);
    // window['temp23GetData'].apply(null, payl);
    // window['temp24GetData'].apply(null, payl);
    // window['temp25GetData'].apply(null, payl);
  }

  getTempData();
  $interval(function(){getTempData();}, 10000);

  $interval(function(){$scope.getTemplates();}, 5000);





});