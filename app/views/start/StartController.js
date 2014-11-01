/**
 * Created by Kostja on 31.10.14.
 */
hackAppKillCount.controller("StartController", function($scope, DAO){
    $scope.START ="StartController";

    $scope.categories = [
        'Witch_Hunt',
        'Serial_killer'
    ];



    $scope.serial_killers = [];

    $scope.blLoadingKillers = true;

    DAO.getSerialKillers().then(function(killers){
        console.log(arguments);
        $scope.blLoadingKillers = false;
        $scope.serial_killers = killers;
    });

    $scope.genocides = [];

    $scope.blLoadingGenocides = true;
    DAO.getGenocides().then(function(genocides){
        $scope.genocides = genocides;
        $scope.blLoadingGenocides = false;
    });
});