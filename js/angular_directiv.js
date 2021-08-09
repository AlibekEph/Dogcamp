rentals.directive("sheels", function($compile) {
	return {
		restrict: "C",
		scope: true,
		templateUrl: "templates/sheels.html",
		controller: function ( $scope, $element ) {
	      $scope.add = function () {
	        var el = $compile( "<sheels text='n'></sheels>" )( $scope );
	        $element.parent().append( el );
	      };
	    },
	    link: function(scope, elm, attrs) {
     		 scope.cart_elem.init(elm);
    		}
	};
});
rentals.directive("playpen", function($compile) {
	return {
		restrict: "C",
		scope: true,
		templateUrl: "templates/playpen.html",
		controller: function ( $scope, $element ) {
	      $scope.add = function () {
	        var el = $compile( "<playpen text='n'></playpen>" )( $scope );
	        $element.parent().append( el );
	      };
    	},
    	link: function(scope, elm, attrs) {
     		 scope.cart_elem.init(elm);
    		}
	};
});
rentals.directive("subscription", function($compile) {
	return {
		restrict: "C",
		scope: true,
		templateUrl: "templates/subscription.html",
		controller: function ( $scope, $element ) {
	      $scope.add = function () {
	        var el = $compile( "<subscription text='n'></subscription>" )( $scope );
	        $element.parent().append( el );
	      };
    	},
    	link: function(scope, elm, attrs) {
     		 scope.cart_elem.init(elm);
    		}
	};
});
rentals.directive("workout", function($compile) {
	return {
		restrict: "C",
		scope:true,
		
		templateUrl: "templates/workout.php",
		controller: function ( $scope, $element ) {
	      $scope.add = function () {
	        var el = $compile( "<workout text='n'></workout>" )( $scope );
	        $element.parent().append( el );
	      };
	    },
	     link: function(scope, elm, attrs) {
     		 scope.cart_elem.init(elm);
    		}
	};
});
rentals.directive("sheeps", function($compile) {
	return {
		restrict: "C",
		scope:true,
		templateUrl: "templates/sheeps.html",
		controller: function ( $scope, $element ) {
	      $scope.add = function () {
	        var el = $compile( "<sheeps text='n'></sheeps>" )( $scope );
	        $element.parent().append( el );
	      };
	    },
	    link: function(scope, elm, attrs) {
     		 scope.cart_elem.init(elm);
    		}
	};
});

rentals.directive("house", function($compile) {
	return {
		restrict: "C",
		scope: true,
		templateUrl: "templates/house.html",
		controller: function ( $scope, $element ) {
	      $scope.add = function () {
	        var el = $compile( "<house text='n'></house>" )( $scope );
	        $element.parent().append( el );
	      };
    	},
    	link: function(scope, elm, attrs) {
     		 scope.house.init(elm);
    		}
	};
});

rentals.directive('attributes', function attributesDirective($compile, $parse) {
    'use strict';

    return {
        priority: 999,
        terminal: true,
        restrict: 'A',
        compile: function attributesCompile() {
            return function attributesLink($scope, element, attributes) {
                function parseAttr(key, value) {
                    function convertToDashes(match) {
                        return match[0] + '-' + match[1].toLowerCase();
                    }

                    attributes.$set(key.replace(/([a-z][A-Z])/g, convertToDashes), value !== undefined && value !== null ? value : '');
                }

                var passedAttributes = $parse(attributes.attributes)($scope);

                if (passedAttributes !== null && passedAttributes !== undefined) {
                    if (typeof passedAttributes === 'object') {
                        for (var subkey in passedAttributes) {
                            parseAttr(subkey, passedAttributes[subkey]);
                        }
                    } else if (typeof passedAttributes === 'string') {
                        parseAttr(passedAttributes, null);
                    }
                }

                $compile(element, null, 999)($scope);
            };
        }
    };
});