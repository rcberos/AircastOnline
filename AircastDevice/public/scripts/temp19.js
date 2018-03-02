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
        
        function insertDataToScope(result){

            $scope.todayYen = "P "+result[0].yen;
            $scope.todayUsd = "P "+result[0].usd;
            $scope.todayEuro = "P "+result[0].euro;
            $scope.yesterday = result[1];
            
            var temp = {
                'yen': result[0].yen.toString(),
                'usd': result[0].usd.toString(),
                'euro': result[0].euro.toString()
            }

            $scope.yen = temp["yen"].substring(1,2) + temp["yen"].substring(2,4);
            $scope.usd = temp["usd"].substring(0,2);
            $scope.euro = temp["euro"].substring(0,2);
            
            var signs = {
                'down': '/assets/currency-down.png',
                'equal': '/assets/currency-equal.png',
                'up': '/assets/currency-up.png'
            }
            $scope.signs = {};
            
            var usdSign,euroSign,yenSign;

            if (result[2].usd == "down") {
                $scope.signs.usd = signs.up;
            }else if (result[2].usd == "equal") {
                $scope.signs.usd = signs.equal;
            }else {
                $scope.signs.usd = signs.down;
            }

            if (result[2].yen == "down") {
                $scope.signs.yen = signs.up;
            }else if (result[2].yen == "equal") {
                $scope.signs.yen = signs.equal;
            }else {
                $scope.signs.yen = signs.down;
            }

            
            if (result[2].euro == "down") {
                $scope.signs.euro = signs.up;
            }else if (result[2].euro == "equal") {
                $scope.signs.euro = signs.equal;
            }else {
                $scope.signs.euro = signs.down;
            }
            
        }
        
        for(var i=0; i< $scope.TemplateData.length; i++){
    		if($scope.TemplateData[i].Template == 'temp19'){
    			currencyData = $scope.TemplateData[i].TempData;
    			// insertDataToScope();
    			inserDataToScope(currencyData);
    		}
    	}

        
        // checkIfCurrencyDataExpired();

        $timeout(callback, 15000);	

   //      function callCallback() {

		 // if (cb) {
	  //       	$timeout(callback, 15000);	
	  //       }
        	
   //      }

        
        
};