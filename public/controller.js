var app=angular.module('jobApp', []);
app.controller('jobController', function($scope,$http){


$scope.findSkills=function() {
	// body...
			var jobtype=$scope.jobtype;
	$http.get('/jobs/'+jobtype).success(function(response) {
		// body...
		$scope.jobList=response;
		console.log(response);
	});
	jobtype="";
};
	
});