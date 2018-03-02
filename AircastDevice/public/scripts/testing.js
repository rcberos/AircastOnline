console.log('testing');
// document.getElementById('custom').setAttribute('foo', 'video');
// console.log(document.getElementById('custom'));
// console.log(app);
app.controller('MainModule', function($scope, $http, $interval, $timeout, $window){
  $scope.page = 'home';
  console.log('home');
  $scope.testing = function(){
    console.log('ang testing');
  }
});

// var $injector = angular.injector(['ng', 'MainModule']);
// $injector.invoke(function($rootScope, $compile) {
//   $compile(element)($rootScope);
// });

function myController($scope, $window){
	$scope.testing = function(){
		console.log('asdasdasdasd');
		$window.alert($window.innerWidth);
	}
}



function loader(){
	console.log('LOADER');
}


// document.getElementById('dummy').innerHTML = '<div id="loof">LOADER</div>';
// document.getElementById('loof').innerHTML = 'asdaskkkkd';

// var Cont = function($scope){
//   $scope.page = 'home';
//   console.log('home');
//   $scope.testing = function(){
//     console.log('ang testing');
//   }
// };