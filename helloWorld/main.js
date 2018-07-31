var app = angular.module("helloworld", [])

app.controller("helloworld", ["$scope", function ($scope) {
    $scope.helloworldtext = "Hello World!";
}]);