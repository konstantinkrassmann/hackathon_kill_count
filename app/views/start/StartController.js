/**
 * Created by Kostja on 31.10.14.
 */
hackAppKillCount.controller("StartController", function ($scope, DAO, $filter) {

    $scope.selectedCategory = "";
    $scope.CATEGORY = {
        "SERIAL_KILLER": "sk",
        "GENOCIDE": "g",
        "TERRORISM": "t",
        "WW2": "ww2",
        "DICTATORS": "dd"
    };

    $scope.blLoading = true;

    $scope.selectCategory = function (strCategory) {
        switch (strCategory) {
            case $scope.CATEGORY.SERIAL_KILLER:
                if ($scope.serial_killers.length == 0) {
                    DAO.getSerialKillers().then(function (killers) {
                        $scope.blLoading = false;
                        $scope.serial_killers = killers;
                    });
                }
                break;
            case $scope.CATEGORY.GENOCIDE:
                if ($scope.genocides.length == 0) {
                    $scope.blLoading = true;
                    DAO.getGenocides().then(function (genocides) {
                        console.log(genocides);
                        $scope.genocides = genocides;
                        $scope.blLoading = false;
                    });
                }
                break;
            case $scope.CATEGORY.TERRORISM:
                if ($scope.terrorismAttacks.length == 0) {
                    $scope.blLoading = true;
                    DAO.getTerroristAttacks().then(function (terrorism) {
                        console.log(terrorism)
                        $scope.terrorismAttacks = terrorism;
                        $scope.blLoading = false;
                    });
                }
            break;
            case $scope.CATEGORY.WW2:
                if ($scope.ww2casualties.length == 0) {
                    $scope.blLoading = true;
                    DAO.getWW2().then(function (ww2)
                    {
                        $scope.ww2casualties = ww2;
                        $scope.blLoading = false;
                    });
                }
            break;
            case $scope.CATEGORY.DICTATORS:
                if ($scope.dictators.length == 0) {
                    $scope.blLoading = true;
                    DAO.getDictators().then(function (dictators)
                    {
                        $scope.dictators = dictators;
                        $scope.blLoading = false;
                    });
                }
                break;
        }
        $scope.selectedCategory = strCategory;
    };

    $scope.serial_killers = [];
    $scope.serial_killer_tip_template =
        function (d) {
            return '<strong>Name:</strong> <span class="text-danger">' + d.name + '</span> <br>' +
                '<strong>Proven victims:</strong> <span class="text-danger">' + d.lowestCasualties + '</span> <br>' +
                '<strong>Possible victims:</strong> <span class="text-danger">' + d.highestCasualties + '</span> <br>' +
                '<strong>Activity:</strong> <span class="text-danger">' + d.yearsActive + '</span> <br>' +
                '<strong>Region:</strong> <span class="text-danger">' + d.region + '</span> <br>' +
                '<a class="text-primary" href="' + d.wikipediaLink + '" class="text-danger" target="_blank">Find out more</a> <br>'
        };


    $scope.genocides = [];
    $scope.genocide_tip_template =
        function (d) {
            return '<strong>Name:</strong> <span class="text-danger">' + d.event + '</span> <br>' +
                '<strong>Expected victims:</strong> <span class="text-danger">' + $filter("humanize")(d.lowestCasualties) + '-' +  $filter("humanize")(d.highestCasualties) + '</span> <br>' +
                '<strong>Activity:</strong> <span class="text-danger">' + d.from + ' bis ' + d.to + '</span> <br>' +
                '<strong>Region:</strong> <span class="text-danger">' + d.region + '</span> <br>' +
                '<a class="text-primary" href="' + d.wikipediaLink + '" class="text-danger" target="_blank">Find out more</a> <br>'
        };

    $scope.terrorismAttacks = [];
    $scope.terrorismAttacksCountryTooltip = function(data){
        return '<div class="panel panel-default">'+
            '<div class="panel-heading">Death toll of terrorism in '+data.event[0].region+'</div>'+
            '<strong class="text-danger">~'+  $filter("humanize")(data.casualties) +'</strong>'
        '</div>';
    };

    $scope.ww2casualties = [];
    $scope.ww2countryTooltip = function(data){
        if(typeof data != "undefined" && data != null && typeof data.event != "undefined"  && data.event.length > 0){
            return '<div class="panel panel-default">'+
                '<div class="panel-heading">Death toll of world war 2 in '+ (data.event[0].region ? data.event[0].region: data.event[0].event)+'</div>'+
                '<strong class="text-danger">~'+  $filter("humanize")(data.casualties) +'</strong>'
            '</div>';
        }
    };
    $scope.ww2_tip_template =
        function (d) {
            return '<strong>Region:</strong> <span class="text-danger">' + d.region + '</span> <br>' +
                '<strong>Deaths:</strong> <span class="text-danger">' +  $filter("humanize")(d.lowestCasualties) + '</span> <br>' +
                '<a class="text-primary" href="http://en.wikipedia.org/wiki/World_War_II" class="text-danger" target="_blank">Find out more</a> <br>'
        };

    $scope.dictators = [];
    $scope.dictators_tip_template =
        function (d) {
            return '<strong>Name:</strong> <span class="text-danger">' + d.name + '</span> <br>' +
                '<strong>Indirectly killed victims:</strong> <span class="text-danger">' + d.lowestCasualties + '</span> <br>' +
                '<strong>Activity:</strong> <span class="text-danger">' + d.yearsActive + '</span> <br>' +
                '<strong>Region:</strong> <span class="text-danger">' + d.region + '</span> <br>' +
                '<a class="text-primary" href="' + d.wikipediaLink + '" class="text-danger" target="_blank">Find out more</a> <br>'
        };
});
