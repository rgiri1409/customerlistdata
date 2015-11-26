function AppCtrl($scope, $http) {
	console.log("Hallo World from the Controller.js");

var refresh = function(){
	$http.get('/customerlist').success(function(response) {
		console.log("I got the requested customer data");
		$scope.customerlist = response;
		$scope.customer = "";
	});
};

refresh();

$scope.addCustomer = function() {
	console.log($scope.customer);
	$http.post('/customerlist',$scope.customer).success(function(response) {
		console.log(response);
		refresh();
	});
};

$scope.remove = function(id) {
	console.log(id);
	$http.delete('/customerlist/' + id).success(function(response) {
		refresh();
	});

$scope.edit = function(id) {
	console.log(id);
	$http.get('/customerlist/' + id).success(function(response) {
         $scope.customer = response; 
	});
};

$scope.update = function() {
	console.log($scope.customer._id);
	$http.put('/customerlist/' + $scope.customer._id, $scope.customer).success(function(response) {
        refresh();		
	});

};

};

}
