'use strict';

/* Controllers */
var myApp = angular.module('app');

myApp.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});

  myApp.controller('customersCtrl', ['$scope', '$http', '$timeout',
    function(              $scope, $http, $timeout ) {

	/*
	 * Getting data from json file
	 * */  
	$http.get('vendor/jquery/datatables/datatable.json').success(function(data){
        $scope.list = data.aaData;
        $scope.currentPage = 1; //current page
        $scope.entryLimit = 10; //max no of items to display in a page
        $scope.filteredItems = $scope.list.length; //Initially for no filter 
        $scope.totalItems = $scope.list.length;
    });
	
	//using for pagination ** pageNo -> defines on which page to jump
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
		if($("#all_check_uncheck").is(":checked")){
			$("#all_check_uncheck").trigger('click');
		}
    };
    
    /*
     * for search filtering according to the keyword passed
     * */
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    }
    
    /*
     * For sorting the columns. predicate param -> column name on basis of which sorting is be done
     * */
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    }
	 
    /*
     * make all checkboxes on page selected/unselected. Depending upon weather main checkbox in header 
     * is being checked or unchecked
     * */
	$scope.selectAll = function(){
		if($("#all_check_uncheck").is(":checked")){
			$(".sub_checkboxes").each(function(){
				if(!$(this).is(":checked")){
					$(this).trigger('click');
				}
			});
		}else{
			$(".sub_checkboxes").each(function(){
				if($(this).is(":checked")){
					$(this).trigger('click');
				}
			});
		}
	}  
  }]);
  
  /*
   * Customizing tabs change functionality
   * */
  myApp.controller('CustomTabsCtrl', ['$scope', function($scope) {
	    $scope.tabText = 1;
	    /*
	     * Showing first tab as default selected.. default-selected id of tab
	     * */
	    $("#default-selected").trigger('focus');
	    /*
	     * Funtion that will make change content depending upon tab clicked. txt will have values 1, 2, 3.....
	     * */
	    $scope.tabChange = function(txt){
	    	$scope.tabText = txt;
	    }
  }]); 
  
  