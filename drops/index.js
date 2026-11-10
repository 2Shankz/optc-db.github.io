(function() {

var app = angular.module('optc', [ 'ui.bootstrap' ]);

var addImages = function(target) {
    target.find('> table [data], h3 [data]').each(function(n,x) {
        x.style.backgroundImage = 'url(' + x.getAttribute('data') + ')';
        x.removeAttribute('data');
    });
};

app.controller('MainCtrl',function($scope, $rootScope, $timeout, $controller, $storage) {

    // Theme toggle - 4 theme cycle (brightest to darkest)
    $scope.theme = $storage.get('optc-theme', 'dark');
    $scope.applyTheme = Theme.apply;
    $scope.applyTheme($scope.theme);

    $scope.getThemeIcon = function() {
        return Theme.icon($scope.theme, 'dark_mode');
    };

    $scope.toggleTheme = function() {
        $scope.theme = Theme.next($scope.theme);
        $storage.set('optc-theme', $scope.theme);
        $scope.applyTheme($scope.theme);
    };

    // variables
    $rootScope.onlyGlobal = false;
    $rootScope.query = '';
    $scope.data = drops;
    $scope.hiddenUnits = [ ];

    // One-time search / deep link from the character details page.
    var escapeRegex = function(text) {
        return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    var readInitialLocation = function() {
        var raw = location.search.replace(/^\?/, '');
        if (!raw) return null;

        // New format: ?island=<name>&type=<category>
        var params = { }, hasParams = false;
        raw.split('&').forEach(function(pair) {
            var parts = pair.split('=');
            if (parts.length !== 2) return;
            hasParams = true;
            try {
                params[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1].replace(/\+/g, ' '));
            } catch (e) { }
        });
        if (hasParams && params.island)
            return { island: params.island, type: params.type || null };

        var decoded;
        try { decoded = decodeURIComponent(raw.replace(/\+/g, ' ')); }
        catch (e) { decoded = raw; }

        // Legacy format used by old links: "<island> | <category>"
        var legacy = decoded.split(' | ');
        if (legacy.length === 2 && window.drops.hasOwnProperty(legacy[1]))
            return { island: legacy[0], type: legacy[1] };

        return { query: decoded };
    };

    var initialLocation = readInitialLocation();
    if (initialLocation) {
        if (initialLocation.island) {
            $scope.queryFilter = initialLocation.island;
            $scope.query = Utils.getRegex(escapeRegex(initialLocation.island));
        } else {
            $scope.queryFilter = initialLocation.query;
            $scope.query = Utils.getRegex(initialLocation.query);
        }
    }

    // Expand the exact island a link points at, once its category has rendered.
    var expandInitialLocation = function() {
        if (!initialLocation || !initialLocation.island) return;
        var attempts = 0;
        var findIsland = function() {
            var wantedType = initialLocation.type ? initialLocation.type + 's' : null;
            var sections = [].slice.call(document.querySelectorAll('.type'));
            for (var i = 0; i < sections.length; ++i) {
                var label = sections[i].querySelector('h2 > span');
                if (wantedType && (!label || label.textContent.trim() !== wantedType)) continue;
                var islands = [].slice.call(sections[i].querySelectorAll('.island'));
                for (var j = 0; j < islands.length; ++j) {
                    var name = islands[j].querySelector('h3 > span');
                    if (!name || name.textContent.trim() !== initialLocation.island) continue;
                    var islandElement = islands[j];
                    if (islandElement.classList.contains('collapsed')) {
                        var header = islandElement.querySelector('h3');
                        if (header) $(header).trigger($.Event('click', { which: 1 }));
                    }
                    $timeout(function() { islandElement.scrollIntoView({ block: 'center' }); }, 100);
                    return true;
                }
            }
            return false;
        };
        var poll = function() {
            if (findIsland() || ++attempts > 15) return;
            $timeout(poll, 200);
        };
        $timeout(poll, 200);
    };

    expandInitialLocation();

    // units
    $scope.reverse = function(x) { return -x; };
    $scope.changeSorting = function() { $rootScope.sortByType = $scope.sortByType; };
    $scope.changeQueryFilter = function() { $scope.query = Utils.getRegex($scope.queryFilter); };

    $scope.changeFilters = function() {
        $scope.hiddenUnits = [ ];
        var unitValues = Object.values(window.units);
        for (var i=0;i<unitValues.length;++i) {
            $scope.hiddenUnits[i+1] = ($scope.noFodder && Utils.isFodder(unitValues[i])) ||
                ($scope.noEvolverBooster && Utils.isEvolverBooster(unitValues[i]));
        }
        if (!$scope.$$phase) $scope.$apply();
    };

});

app.directive('decorateSlot',function() {
    return {
        restrict: 'A',
        scope: { uid: '=', big: '@', delay: '@' },
        link: function(scope, element, attrs) {
            var paths = scope.big ? { glo: Utils.getBigThumbnailUrl(scope.uid), jap: Utils.getBigThumbnailUrl(scope.uid) } : Utils.getThumbnailUrl(scope.uid, '..');
            var noimagePath = '../api/images/common/noimage.png';
            if (scope.delay) {
                var url = paths.jap;
                if (url) element[0].setAttribute('data', url);
            } else {
                element[0].style.backgroundImage = 'url(' + paths.jap + ')';
                element[0].onerror = function() {
                    if (paths.glo && paths.glo !== paths.jap) {
                        element[0].style.backgroundImage = 'url(' + paths.glo + ')';
                        element[0].onerror = function() {
                            element[0].style.backgroundImage = 'url(' + noimagePath + ')';
                        };
                    } else {
                        element[0].style.backgroundImage = 'url(' + noimagePath + ')';
                    }
                };
            }
        }
    };
});

app.directive('type',function() {
    return {
        restrict: 'E',
        scope: { type: '=', data: '=', hiddenUnits: '=', onlyGlobal: '=' },
        replace: true,
        templateUrl: 'type.html'
    };
});

app.directive('island',function() {
    return {
        restrict: 'E',
        scope: { island: '=', data: '=', type: '=', hiddenUnits: '=', condition: '=', challenge: '=', completion: '=', showManual: '=' },
        replace: true,
        templateUrl: 'island.html',
        link: function(scope, element, attrs) {
            scope.isTooltipEnabled = function(id) { return !!window.cooldowns[String(id)]; };
            scope.getTooltipText = function(id) {
                var cooldown = window.cooldowns[String(id)], unit = window.units[String(id)];
                if (!cooldown && (!unit || !unit.name)) return;
                if (cooldown) {
                    if (Array.isArray(cooldown)) cooldown = cooldown[0] + ' \u2192 ' + cooldown[1] + ' turns';
                    else cooldown = cooldown + ' \u2192 ? turns';
                }
                var result = 'CD: ' + cooldown;
                if (unit && unit.name) result = unit.name + '\n' + result;
                return result;
            };
        }
    };
});

app.directive('collapsable',function($compile, $timeout) {
    return {
        restrict: 'A',
        scope: { target: '@', data: '=', type: '=', island: '=', hiddenUnits: '=', onlyGlobal: '=', query: '=' },
        link: function(scope, element, attrs) {

            var collapse = function() {
                if (element.children().length == 1) return;
                while (element.children().length > 1)
                    element.children().last().remove();
                element.addClass('collapsed');
            };

            var expand = function() {
                if (element.children().length > 1) return;
                if (scope.target == 'type.html')
                    element.append($compile('<type type="type" data="data" hidden-units="hiddenUnits" only-global="onlyGlobal"></type>')(scope));
                else
                    element.append($compile('<island type="type" island="island" data="data" hidden-units="hiddenUnits"></island>')(scope));
                element.removeClass('collapsed');
            };

            var update = function() {
                if (element.children().length > 1) collapse();
                else expand();
            };

            element.find('> h3, > h2').click(function(e) {
                if (e.which != 1) return;
                update();
            });

            scope.$watch('query',function() {
                if (scope.target != 'type.html' || scope.query.constructor == String) return;
                var validQuery = (scope.query.source.length && scope.query.source != '(?:)');
                if (!validQuery) collapse();
                else {
                    expand();
                    $timeout(function() {
                        var visible = element.find('> div:not(.ng-hide)').length;
                        if (visible === 0) collapse();
                    });
                }
            });

        }
    };
});

app.directive('autoFocus',function($timeout) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			$timeout(function(){ element[0].focus(); });
		}
	};
});

app.directive('hideWhenEmpty',function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var observer = new MutationObserver(function(e) {
               if (element.children().length === 0) element.parent().hide();
               else element.parent().show();
            });
            observer.observe(element[0],{ childList: true });
        }
    };
});

app.directive('addBonuses',function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var bonusNames = { 'stamina': '0.5x stamina', 'drop': '2x drop', 'beli': '2x beli', 'exp': '2x EXP', };
            $timeout(function() {

                var rows = element[0].rows;
                window.bonuses.forEach(function(bonus) {
                    var min = (bonus.stop || 0);
                    for (var i=0;i<=bonus.x-min && bonus.y+i+1 < rows.length;++i) {
                        var cell = rows[bonus.y + i + 1].cells[bonus.x - i + 1];
                        cell.innerHTML = bonusNames[bonus.type];
                        cell.className = bonus.type;
                    }
                });

                element.find('td, th').hover(
                    function(e) {
                        var index = $(this).index() + 1;
                        if (index == 1) return;
                        element.find('tr > :nth-child(' + index + ')').each(function(n,x) { $(x).addClass('active'); });
                    },
                    function() {
                        element.find('.active').each(function(n,x) { $(x).removeClass('active'); });
                    }
                );

            });
        }
    };
});

app.directive('bonusList',function() {
    return {
        restrict: 'E',
        template: '<span ng-repeat="bonus in bonuses" class="bonus {{bonus.slice(0,2)}} {{bonus.slice(3)}}"></span>',
        scope: { y: '=' },
        link: function(scope, element, attrs) {
            scope.bonuses = CharUtils.getIslandBonuses(scope.y);
        }
    };
});

app.directive('dayLabel',function() {
    return {
        restrict: 'E',
        template: '<span class="day-label" ng-if="island.day >= 0" ng-class="{ active: isActive }">{{day}}</span>',
        link: function(scope, element, attrs) {
            scope.day = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][scope.island.day];
            scope.isActive = CharUtils.getDayOfWeek(false) == scope.island.day || CharUtils.getDayOfWeek(true, true) == scope.island.day;
        }
    };
});

app.filter('smartSort',function($rootScope) {
    var getId = function(id) {
        //if(typeof id == "string"){ console.log(id.charCodeAt(0)); return id.charCodeAt(0); }
        id = Math.abs(id);
        return [ 'STR', 'DEX', 'QCK', 'PSY', 'INT' ].indexOf(window.units[String(id)].type || 'INT') * 1000 + id;
    };
    return function(array) {
        if (!$rootScope.sortByType) {
            array.sort(function(a,b) { return Math.abs(a) - Math.abs(b); });
            return array;
        }
        var temp = array.map(function(x) { return [ getId(x), x ]; });
        temp.sort(function(a,b) { return a[0] - b[0]; });
        return temp.map(function(x) { return x[1]; });
    };
});

})();

function refreshTimer(){
var refresh=1000; // Refresh rate in milli seconds
mytime=setTimeout('updateTimes()',refresh)
}

function updateTimes(){
    //Japan can also be Etc/GMT-9
    document.getElementById("times").innerHTML = "Global: <b>"+moment().tz('Etc/GMT+8').format('H:mm:ss')+"</b> | Japan: <b>"+moment().tz('Asia/Tokyo').format('H:mm:ss')+"</b>";

    if(moment().tz('Asia/Tokyo').format('H')>12 && moment().tz('Asia/Tokyo').format('H')<23){
        document.getElementById("timesNote").innerHTML = "The Bonuses in the Japanese Version only last from 12:00 till 23:00<br><b>Japan Bonuses are currently active<b>";
    }else{
         document.getElementById("timesNote").innerHTML = "The Bonuses in the Japanese Version only last from 12:00 till 23:00<br><b>Japan Bonuses are currently not active<b>";
    }
    tt=refreshTimer();
}
