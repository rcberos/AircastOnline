var app = angular.module('MainModule', ['ui.bootstrap', 'ui.event', 'ngAnimate']);

app.controller('MainController', function($scope, $http, $interval, $timeout, $window, $q){
  // $window.alert('W: '+$window.innerWidth+' H: '+$window.innerHeight);

  

  $scope.mainDiv = {
    "position": "absolute",
    "top":      "0px",
    "left":     "0px",
    "width":    $window.innerWidth+"px",
    "height":   $window.innerHeight+"px",
    "background-color": "black"
  }


  $scope.templates = [];

    var payload = {
    CampaignID: 2,
    tempHtml: 'templates/temp1.html',
    tempSrc: {
                video: "assets/audition.mp4",
                side1: "assets/side1.jpg",
                side2: "assets/side1.jpg",
                side3: "assets/side1.jpg",
                bottom: "assets/bottom.jpg",
              },
    tempJs: 'scripts/temp1.js',
    tempInit: 'temp1Controller'
  }

  $scope.templates.push(payload);

  

  $scope.currentCampaignID = 0;

  
  var isStart = true;
  $scope.templatePosition = 0;
  $scope.templateShuffle = function(){


    if($scope.templates.length == 0){
      var payload = {
        CampaignID: 2,
        tempHtml: 'templates/temp1.html',
        tempSrc: {
                    video: "assets/audition.mp4",
                    side1: "assets/side1.jpg",
                    side2: "assets/side1.jpg",
                    side3: "assets/side1.jpg",
                    bottom: "assets/bottom.jpg",
                  },
        tempJs: 'scripts/temp1.js',
        tempInit: 'temp1Controller'
      }

      $scope.templates.push(payload);
    }

    var playingTemplate = $scope.templates[0];
    $scope.templates.shift();
    $scope.templates.push(playingTemplate);

    

    UpdateWallet($http, playingTemplate.CampaignID);


    $scope.currentTemp = playingTemplate.tempHtml;
    if(!$scope.$$phase) {
      $scope.$apply();
    }

    var tempNameSpace = {
      '$scope': $scope,
      '$window': $window,
      '$timeout': $timeout,
      '$http': $http,
      'source': playingTemplate.tempSrc,
      "callback": $scope.templateShuffle,
      '$q': $q
    };

    var payl2 = [tempNameSpace['$scope'], tempNameSpace['$window'], tempNameSpace['$timeout'], tempNameSpace['$http'], tempNameSpace['source'], tempNameSpace['callback'], tempNameSpace['$q']];
    var payl = [$scope, $window, $timeout, $http, playingTemplate.tempSrc, $scope.templateShuffle];

    window[playingTemplate.tempInit].apply(null, payl2);

  }

  $scope.templateShuffle();


  $scope.getTemplates = function(){
    console.log('getTemplates');
    $http.get('/myID').then(function(response){
      // console.log('default');
      // console.log(response.data);
      var RpiID = response.data.RpiID;

      var data = {
        RpiID: RpiID
      }
      $http.post('http://54.254.248.115/rpiGetCampaigns', data).then(function(response){
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
            // console.log('inserted');
            $scope.templates.unshift(newTemplates[i]);
          }
          // else
          //   console.log('not inserted');
        }

          
        if(!$scope.$$phase) {
          $scope.$apply();
        }
        // console.log($scope.templates);
        // $timeout(function(){$scope.getTemplates();}, 5000);
      }, function(err){
        console.log(err);
        // $timeout(function(){$scope.getTemplates();}, 5000);
      });

    }, function(error){
      // $timeout(function(){$scope.getTemplates();}, 5000);
    });

      
  }


  $interval(function(){$scope.getTemplates();}, 10000);
  // $scope.getTemplates();


});