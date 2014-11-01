/**
 * Created by Kostja on 31.10.14.
 */
hackAppKillCount.controller("StartController", function($scope, SerialKillerDAO){
    $scope.START ="StartController";

    $scope.categories = [
        'Witch_Hunt',
        'Serial_killer'
    ];



    $scope.serial_killers = [];

    $scope.blLoadingKillers = true;
    SerialKillerDAO.getSerialKillers().then(function(killers){
        console.log(arguments);
        $scope.blLoadingKillers = false;
        $scope.serial_killers = killers;
    })
});