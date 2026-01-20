window.events = {
    3522: {
        onInsertion: function($scope) {
            if (++$scope.options.cloneEnabled == 1)
                $scope.notify({ text: 'Enabling Clone-Clone support.' });
        },
        onRemoval: function($scope) {
            if (--$scope.options.cloneEnabled === 0)
                $scope.notify({ text: 'Disabling Clone-Clone support.' });
        }
    },
    3523: {
        onInsertion: function($scope) {
            if (++$scope.options.cloneEnabled == 1)
                $scope.notify({ text: 'Enabling Clone-Clone support.' });
        },
        onRemoval: function($scope) {
            if (--$scope.options.cloneEnabled === 0)
                $scope.notify({ text: 'Disabling Clone-Clone support.' });
        }
    },
    3390: {
        onInsertion: function($scope) {
            if (++$scope.options.tokiStateEnabled == 1)
                $scope.notify({ text: 'Enabling Toki-Toki Effect support.' });
        },
        onRemoval: function($scope) {
            if (--$scope.options.tokiStateEnabled === 0)
                $scope.notify({ text: 'Disabling Toki-Toki Effect support.' });
        }
    },
    3391: {
        onInsertion: function($scope) {
            if (++$scope.options.tokiStateEnabled == 1)
                $scope.notify({ text: 'Enabling Toki-Toki Effect support.' });
        },
        onRemoval: function($scope) {
            if (--$scope.options.tokiStateEnabled === 0)
                $scope.notify({ text: 'Disabling Toki-Toki Effect support.' });
        }
    },
    3722: {
        onInsertion: function($scope) {
            if (++$scope.options.tokiStateEnabled == 1)
                $scope.notify({ text: 'Enabling Selected Character Effect support.' });
        },
        onRemoval: function($scope) {
            if (--$scope.options.tokiStateEnabled === 0)
                $scope.notify({ text: 'Disabling Selected Character Effect support.' });
        }
    },
    3723: {
        onInsertion: function($scope) {
            if (++$scope.options.tokiStateEnabled == 1)
                $scope.notify({ text: 'Enabling Toki-Toki Effect support.' });
        },
        onRemoval: function($scope) {
            if (--$scope.options.tokiStateEnabled === 0)
                $scope.notify({ text: 'Disabling Selected Character Effect support.' });
        }
    },
    3008: {
        onInsertion: function($scope) {
            if (++$scope.options.sugarToysEnabled == 1)
                $scope.notify({ text: 'Enabling Hobby-Hobby Transformation support.' });
        },
        onRemoval: function($scope) {
            if (--$scope.options.sugarToysEnabled === 0)
                $scope.notify({ text: 'Disabling Hobby-Hobby Transformation support.' });
        }
    },
    3009: {
        onInsertion: function($scope) {
            if (++$scope.options.sugarToysEnabled == 1)
                $scope.notify({ text: 'Enabling Hobby-Hobby Transformation support.' });
        },
        onRemoval: function($scope) {
            if (--$scope.options.sugarToysEnabled === 0)
                $scope.notify({ text: 'Disabling Hobby-Hobby Transformation support.' });
        }
    },
    3805: {
        onInsertion: function($scope) {
            if (++$scope.options.sugarToysEnabled == 1)
                $scope.notify({ text: 'Enabling Hobby-Hobby Transformation support.' });
        },
        onRemoval: function($scope) {
            if (--$scope.options.sugarToysEnabled === 0)
                $scope.notify({ text: 'Disabling Hobby-Hobby Transformation support.' });
        }
    }
};
