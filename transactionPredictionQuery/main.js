var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope, $http, transformRequestAsFormPost){

    $scope.sendID = function() {
        $scope.errortext = "";
        $scope.result = "";

        parent_url = "";
        user_id = $scope.user_id;
        q_url = parent_url + user_id;



        if (!$scope.user_id) {return;}
        $http({
            //method:"post",
            method:"get",
            url:"http://free.currencyconverterapi.com/api/v6/convert?q=CNY_USD&compact=y"
            //url:q_url,
            //transformRequest: transformRequestAsFormPost,
            //data: {messageText: $scope.msg},
            //headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        })
            .then(function successCallback(response) {
                //$scope.msg = "";
                $scope.result = response.data.CNY_USD.val;
                console.log(response);
            }, function errorCallback(response){
                $scope.result = "Error";
                $scope.errortext = "Error occurred.";
                console.log(response);
            })
    }


});

// I provide a request-transformation method that is used to prepare the outgoing
// request as a FORM post instead of a JSON packet.
app.factory(
    "transformRequestAsFormPost",
    function() {
        // I prepare the request data for the form post.
        function transformRequest( data, getHeaders ) {
            var headers = getHeaders();
            headers[ "Content-type" ] = "application/x-www-form-urlencoded; charset=utf-8";
            return( serializeData( data ) );
        }
        // Return the factory value.
        return( transformRequest );
        // ---
        // PRVIATE METHODS.
        // ---
        // I serialize the given Object into a key-value pair string. This
        // method expects an object and will default to the toString() method.
        // --
        // NOTE: This is an atered version of the jQuery.param() method which
        // will serialize a data collection for Form posting.
        // --
        // https://github.com/jquery/jquery/blob/master/src/serialize.js#L45
        function serializeData( data ) {
            // If this is not an object, defer to native stringification.
            if ( ! angular.isObject( data ) ) {
                return( ( data == null ) ? "" : data.toString() );
            }
            var buffer = [];
            // Serialize each key in the object.
            for ( var name in data ) {
                if ( ! data.hasOwnProperty( name ) ) {
                    continue;
                }
                var value = data[ name ];
                buffer.push(
                    encodeURIComponent( name ) +
                    "=" +
                    encodeURIComponent( ( value == null ) ? "" : value )
                );
            }
            // Serialize the buffer and clean it up for transportation.
            var source = buffer
                    .join( "&" )
                    .replace( /%20/g, "+" )
                ;
            return( source );
        }
    }
);