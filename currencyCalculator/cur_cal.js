var app = angular.module("CurCalApp", []);
app.controller("CurCalCtrl", function($scope, $http){
    $scope.fromnumber = 0;
    $scope.tonumber = 0;
    $scope.cur_val = 0;
    parent_url = "http://free.currencyconverterapi.com/api/v6/convert?q=";
    tail_url = "&compact=y";
    from_cur = "HKD";
    to_cur = "USD";
    q_string = from_cur + "_" + to_cur;
    q_url = parent_url + q_string + tail_url;

    $scope.fromcur = from_cur
    $scope.tocur = to_cur
    $scope.prices_list = [500, 1000, 1500, 2000];

    $scope.convert = function() {
        $http({
            method: "get",
            url: q_url,

        }).then(function successCallback(response){
            console.log(response.data[q_string]);
            $scope.cur_val = response.data[q_string].val;
            $scope.tonumber = Math.round($scope.fromnumber * $scope.cur_val * 100) / 100;

        }, function errorCallback(response){
            console.log(response);
        })
    }

    $scope.calculate = function(price){
        return Math.round(price * $scope.cur_val * 100) / 100;
    }
})