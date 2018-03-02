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
    
    for(var i=0; i< $scope.TemplateData.length; i++){
            if($scope.TemplateData[i].Template == 'temp22'){
                hugotList = $scope.TemplateData[i].TempData;
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

         function decode_utf8(s) {
            return s.replace(/\\/g, '');
        }


                
        function insertDataToScope() {
            
             $scope.hugotText = decode_utf8(hugotList[makeUniqueRandom()]);
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