/* jshint loopfunc:true */

(function() {

var app = angular.module('optc', [ 'ui.router', 'ui.bootstrap', 'ngSanitize' ]);

/********************
 * GA Configuration *
 ********************/

app
    .run(function($rootScope, $location, $window, $state, $stateParams) {
        $rootScope.$on('$stateChangeSuccess',function(e) {
            $rootScope.currentState = $state.current.name;
            if (typeof ga === 'function') ga('send', 'pageview', '/characters');
            var title = 'One Piece Treasure Cruise Character Table';
            if ($state.current.name == 'main.search.view') {
                var unit = window.units[String($stateParams.id)];
                title = (unit.name || '?') + ' | ' + title;
            }
            window.document.title = title;
        });
    });

/**************
 * Versioning *
 **************/

app
    .run(function($http, $storage) {

        /* * * * * Check version * * * * */

        $http.get('../common/data/version.js?ts=' + Date.now())
            .then(function(response) {
                var version = parseInt(response.data.match(/=\s*(\d+)/)[1],10);
                if (version <= window.dbVersion) return;
                noty({
                    text: 'New data detected. Please refresh the page.',
                    timeout: 5000,
                    type: 'success',
                    layout: 'topRight',
                    theme: 'relax'
                });
            });

        /* * * * * Alerts * * * * */

        var version = $storage.get('charVersion', 5);

        if (version < 5) {
            $storage.set('charVersion', 5);
            setTimeout(function() {
                noty({
                    text: 'Some stuff changed. Refreshing the page and/or clearing your browser\'s cache may be a smart idea.',
                    timeout: 10000,
                    type: 'error',
                    layout: 'topRight',
                    theme: 'relax'
                });
            },500);
        }

    });

})();
