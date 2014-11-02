/**
 * Created by Kostja on 01.11.14.
 */
hackAppKillCount.service("DAO", function ($q, $http, URLBuilder) {
    /**
     * Fetch all serial killers
     * @returns {*}
     */
    this.getSerialKillers = function () {

        return $http.get(URLBuilder.getUrl("serialkillers"))
            .then(function (response) {
                return response.data;
            });

        //return $q.when(serial_killer_mock);
    };

    this.getGenocides = function () {
        return $http.get(URLBuilder.getUrl("genocides"))
            .then(function (response) {
                return response.data;
            });

        //return $q.when(serial_killer_mock);
    };
    this.getTerroristAttacks = function () {
        return $http.get(URLBuilder.getUrl("terroristattacks"))
            .then(function (response) {
                return response.data;
            });
    };

    this.getWW2 = function () {
        return $http.get(URLBuilder.getUrl("ww2casualties"))
            .then(function (response) {
                return response.data;
            });
    };

    this.getDictators = function () {
        return $q.when(dicators_mock);
    };

    this.getIraqWarCasualties = function () {
        return $http.get(URLBuilder.getUrl("iraqwarcasualties"))
            .then(function (response) {
                return response.data;
            });
    };

    return this;
});

var dicators_mock = [
    {
        "region": "Combodia",
        "lowestCasualties": 1700000,
        "name": "Pol Pot",
        "yearsActive": "1963-1981"
    },
    {
        "region": "North Korea",
        "lowestCasualties": 1600000,
        "name": "Kim II Sung",
        "yearsActive": "1948-1994"
    },
    {
        "region": "Ethiopia",
        "lowestCasualties": 1500000,
        "name": "Mengistu Haite Mariam",
        "yearsActive": "1963-1981"
    }
];

var serial_killer_mock =
    [
        {"id": "5454a368d4c69f81185b30b7", "event": null, "region": "Â Colombia", "lowestCasualties": 138, "highestCasualties": 0, "name": "Luis Garavito", "yearsActive": "1990s"},
        {"id": "5454a369d4c69f81185b30b8", "event": null, "region": "Â Colombia Â Ecuador Â Peru", "lowestCasualties": 110, "highestCasualties": 0, "name": "Pedro LÃ³pez", "yearsActive": "1969 to 1980"},
        {"id": "5454a369d4c69f81185b30b9", "event": null, "region": "Â Colombia Â Ecuador", "lowestCasualties": 72, "highestCasualties": 0, "name": "Daniel Camargo", "yearsActive": "1974 to 1986"},
        {"id": "5454a369d4c69f81185b30ba", "event": null, "region": "Â Brazil", "lowestCasualties": 71, "highestCasualties": 0, "name": "Pedro Rodrigues Filho", "yearsActive": "1967 to 2003"},
        {"id": "5454a369d4c69f81185b30bb", "event": null, "region": "Â India", "lowestCasualties": 70, "highestCasualties": 0, "name": "Kampatimar Shankariya", "yearsActive": "1977 to 1978"},
        {"id": "5454a369d4c69f81185b30bc", "event": null, "region": "Â China", "lowestCasualties": 67, "highestCasualties": 0, "name": "Yang Xinhai", "yearsActive": "2000 to 2003"},
        {"id": "5454a36ad4c69f81185b30bd", "event": null, "region": "Afghanistan", "lowestCasualties": 65, "highestCasualties": 0, "name": "Abul Djabar", "yearsActive": "1970 and earlier"},
        {"id": "5454a36ad4c69f81185b30be", "event": null, "region": "Â Russian SFSR", "lowestCasualties": 53, "highestCasualties": 0, "name": "Andrei Chikatilo", "yearsActive": "1978 to 1990"},
        {"id": "5454a36ad4c69f81185b30bf", "event": null, "region": "Â Ukrainian SSR Â Ukraine", "lowestCasualties": 52, "highestCasualties": 0, "name": "Anatoly Onoprienko", "yearsActive": "1989 to 1996"},
        {"id": "5454a36ad4c69f81185b30c0", "event": null, "region": "Â United States", "lowestCasualties": 49, "highestCasualties": 0, "name": "Gary Ridgway", "yearsActive": "1982 to 2000"},
        {"id": "5454a36ad4c69f81185b30c1", "event": null, "region": "Â Russia", "lowestCasualties": 48, "highestCasualties": 0, "name": "Alexander Pichushkin", "yearsActive": "1992 to 2006"},
        {"id": "5454a36ad4c69f81185b30c2", "event": null, "region": "Â China", "lowestCasualties": 45, "highestCasualties": 0, "name": "Wang Qiang", "yearsActive": "1995 to 2003"},
        {"id": "5454a36ad4c69f81185b30c3", "event": null, "region": "Â Indonesia", "lowestCasualties": 42, "highestCasualties": 0, "name": "Ahmad Suradji", "yearsActive": "1986 to 1997"},
        {"id": "5454a36bd4c69f81185b30c4", "event": null, "region": "Â Brazil", "lowestCasualties": 39, "highestCasualties": 0, "name": "Thiago Gomes da Rocha", "yearsActive": "2011 to 2014"},
        {"id": "5454a36bd4c69f81185b30c5", "event": null, "region": "Â South Africa", "lowestCasualties": 38, "highestCasualties": 0, "name": "Moses Sithole", "yearsActive": "1994 to 1995"},
        {"id": "5454a36bd4c69f81185b30c6", "event": null, "region": "Â Ukrainian SSR Â Ukraine", "lowestCasualties": 36, "highestCasualties": 0, "name": "Serhiy Tkach", "yearsActive": "1984 to 2005"},
        {"id": "5454a36bd4c69f81185b30c7", "event": null, "region": "Â Byelorussian SSR", "lowestCasualties": 36, "highestCasualties": 0, "name": "Gennady Mikhasevich", "yearsActive": "1971 to 1985"},
        {"id": "5454a36bd4c69f81185b30c8", "event": null, "region": "Â Morocco", "lowestCasualties": 36, "highestCasualties": 0, "name": "Hadj Mohammed Mesfewi", "yearsActive": "1906 and earlier"},
        {"id": "5454a36bd4c69f81185b30c9", "event": null, "region": "Â United States", "lowestCasualties": 35, "highestCasualties": 0, "name": "Ted Bundy", "yearsActive": "1974 to 1978"},
        {"id": "5454a36bd4c69f81185b30ca", "event": null, "region": "Â United States", "lowestCasualties": 33, "highestCasualties": 0, "name": "John Wayne Gacy", "yearsActive": "1972 to 1978"},
        {"id": "5454a36bd4c69f81185b30cb", "event": null, "region": "Ottoman Iraq Iraq Persia", "lowestCasualties": 33, "highestCasualties": 0, "name": "Ali Asghar Borujerdi", "yearsActive": "1907 to 1934"},
        {"id": "5454a36cd4c69f81185b30cc", "event": null, "region": "Â Russian SFSR", "lowestCasualties": 33, "highestCasualties": 0, "name": "Vasili Komaroff", "yearsActive": "1921 to 1923"},
        {"id": "5454a36cd4c69f81185b30cd", "event": null, "region": "Â Egypt", "lowestCasualties": 32, "highestCasualties": 0, "name": "Ramadan Abdel Rehim Mansour", "yearsActive": "1999 to 2006"}
    ];


hackAppKillCount.service("URLBuilder", function (Settings) {
    /**
     * Return a useful url to fetch http requests against
     * @param strUrlPart Append this string to the end of the url root
     * @returns {string}
     */
    this.getUrl = function (strUrlPart) {
        return Settings.BASE_URL + "/" + strUrlPart;
    };
    return this;
});
