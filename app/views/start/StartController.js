/**
 * Created by Kostja on 31.10.14.
 */
hackAppKillCount.controller("StartController", function($scope, DAO){

    $scope.selectedCategory ="";
    $scope.CATEGORY =  {
        "SERIAL_KILLER": "sk",
        "GENOCIDE": "g",
        "TERRORISM":"t"
    };

    $scope.blLoading = true;

    $scope.selectCategory = function (strCategory) {
        switch (strCategory){
            case $scope.CATEGORY.SERIAL_KILLER:
                if($scope.serial_killers.length == 0){
                    DAO.getSerialKillers().then(function(killers){
                        console.log(arguments);
                        $scope.blLoading = false;
                        $scope.serial_killers = killers;
                    });
                }
            break;
            case $scope.CATEGORY.GENOCIDE:
                if($scope.genocides.length == 0){
                    $scope.blLoading = true;
                    DAO.getGenocides().then(function(genocides){
                        console.log(genocides);
                        $scope.genocides = genocides;
                        $scope.blLoading = false;
                    });
                }
                break;
        }
        $scope.selectedCategory = strCategory;
    };

    $scope.serial_killers = [];
    $scope.serial_killer_tip_template =
        function(d) {
            return '<strong>Name:</strong> <span class="text-danger">' + d.name + '</span> <br>' +
                '<strong>Bewiesene Morde:</strong> <span class="text-danger">' + d.lowestCasualties + '</span> <br>' +
                '<strong>Vermutete Morde:</strong> <span class="text-danger">' + d.highestCasualties + '</span> <br>' +
                '<strong>Aktivität:</strong> <span class="text-danger">' + d.yearsActive + '</span> <br>' +
                '<strong>Region:</strong> <span class="text-danger">' + d.region + '</span> <br>' +
                '<a class="text-primary" href="'+ d.wikipediaLink +'" class="text-danger" target="_blank">Mehr erfahren</a> <br>'
        };



    $scope.genocides = [];
    $scope.genocide_tip_template =
        function(d) {
            return '<strong>Name:</strong> <span class="text-danger">' + d.event + '</span> <br>' +
                '<strong>Bewiesene Morde:</strong> <span class="text-danger">' + d.lowestCasualties + '</span> <br>' +
                '<strong>Vermutete Morde:</strong> <span class="text-danger">' + d.highestCasualties + '</span> <br>' +
                '<strong>Zeitraum:</strong> <span class="text-danger">' + d.from + ' bis '+ d.to+'</span> <br>' +
                '<strong>Region:</strong> <span class="text-danger">' + d.region + '</span> <br>' +
                '<a class="text-primary" href="'+ d.wikipediaLink +'" class="text-danger" target="_blank">Mehr erfahren</a> <br>'
        };



});