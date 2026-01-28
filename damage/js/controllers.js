/* jshint loopfunc: true */

(function() {

var controllers = { };

/***************
 * DefenseCtrl *
 ***************/

controllers.DefenseCtrl = function($scope, $state, $stateParams) { 

    $scope.$watch('query',function() {
        var regex = Utils.getRegex($scope.query || '');
        $scope.list = defenses.filter(function(x) { return regex.test(x); });
    });

    $scope.pickDefense = function(defense) {
        $scope.data.defense = defense[4];
        $state.go('^');
    };

    $scope.list = [ ];
    $scope.query = '';

};

/**************
 * PickerCtrl *
 **************/

controllers.PickerCtrl = function($scope, $state, $stateParams, $storage) { 

    /* * * * * Scope variables * * * * */

    $scope.units = [ ];
    $scope.query = '';
    $scope.recents = $storage.get('recentUnits', [ ]);

    $scope.$watch('query',function() { populateList(); },true);

    /* * * * * Scope functions * * * * */

    $scope.pickUnit = function(unitId) {
        $scope.resetSlot($stateParams.slot);
        $scope.data.team[$stateParams.slot].unit = window.units[unitId];
        $scope.data.team[$stateParams.slot].level = window.units[unitId].maxLevel;
        $scope.slotChanged($stateParams.slot);
        updateRecent(unitId);
        // captain warning - use exact ID for ability lookup
        if ($stateParams.slot < 2 && captains[unitId] && captains[unitId].warning) {
            noty({
                text: captains[unitId].warning.replace(/\%name\%/g, window.units[unitId].name),
                type: 'warning',
                layout: 'topRight',
                theme: 'relax',
                timeout: 5000
            });
        }
        $state.go('^');
    };

    /* * * * * List generation * * * * */

    var populateList = function() {
        $scope.units = [ ];
        var result, parameters = Utils.generateSearchParameters($scope.query);
        if (parameters === null) return;

        result = Object.values(window.units).filter(function(x) {
            if (x === null || x === undefined || !x.hasOwnProperty('id'))
                return false;
            if (x.type === null)
                return false;
            if (Array.isArray(x.type))
                return false;
            if (!Utils.checkUnitMatchSearchParameters(x, parameters))
                return false;
            return true
        });

        $scope.units = result;
    };

    /* * * * * Recent list generation * * * * */

    var updateRecent = function(unitNumber) {
        var recentUnits = JSON.parse(JSON.stringify($scope.recents));
        var n = recentUnits.indexOf(unitNumber);
        if (n < 0) recentUnits.unshift(unitNumber);
        else recentUnits = recentUnits.splice(n,1).concat(recentUnits);
        recentUnits = recentUnits.slice(0,16);
        $storage.set('recentUnits', recentUnits);
    };

};

/*************
 * SlotsCtrl *
 *************/

controllers.SlotsCtrl = function($scope, $state, $stateParams, $storage) {

    /* * * * * Functions * * * * */

    var populateSlots = function(query) {
        var regex = Utils.getRegex($scope.query || ''), result = { };
        for (var key in slots) {
            if (regex.test(slots[key].name))
                result[key] = slots[key];
        }
        $scope.slots = result;
    };

    /* * * * * Local variables * * * * */

    var lastSlotName = $storage.get('lastSlotName', '');
    var slots = $storage.get('slots', { });

    /* * * * * Scope variables * * * * */

    $scope.query = '';
    $scope.slots = slots;
    $scope.lastSlot = lastSlotName;
    $scope.overwriting = false;

    $scope.$watch('query',populateSlots);

    $scope.$watch('lastSlot',function(value) {
        if (value)
            $scope.overwriting = slots.hasOwnProperty(value.toLowerCase());
    });

    /* * * * * Scope functions * * * * */

    $scope.teamClick = function(e,slot) {
        if (e.which == 1 && !e.ctrlKey && !e.metaKey) {
            slot.team.forEach(function(x,n) {
                if (n > 5) return;
                $scope.resetSlot(n);
                if (x !== null) {
                    // override default properties so old teams will always have complete properties
                    // override unit property with the whole unit data (was stored as number)
                    Object.assign($scope.data.team[n], x, {unit: window.units[String(x.unit)]});
                };
                $scope.slotChanged(n);
            });
            if (slot.hasOwnProperty('defense')) $scope.data.defense = parseInt(slot.defense, 10) || 0;
            if (slot.hasOwnProperty('ship')) $scope.data.ship = slot.ship;
            $storage.set('lastSlotName', slot.name);
            $state.go('^');
        } else if (e.which == 2 || (e.which == 1 && (e.ctrlKey || e.metaKey))) {
            var name = slot.name.toLowerCase();
            delete slots[name];
            delete $scope.slots[name];
            $storage.set('slots', slots);
        }
    };

    $scope.saveTeam = function() {
        $scope.$broadcast('$validate');
        var team = $scope.data.team.map(function(x) {
            return !x.unit ? null : {...x, ...{unit: x.unit.id}}; // save only the unit id to save space
        });
        var result = { name: $scope.lastSlot, team: team };
        if ($scope.saveShip) result.ship = $scope.data.ship;
        if ($scope.saveDefense) result.defense = parseInt($scope.data.defense, 10) || 0;
        slots[$scope.lastSlot.toLowerCase()] = result;
        $storage.set('slots', slots);
        $storage.set('lastSlotName', $scope.lastSlot);
        $state.go('^');
    };

};

/************
 * ShipCtrl *
 ************/

controllers.ShipCtrl = function($scope, $state) {

    $scope.query = '';
    $scope.list = ships;

    $scope.$watch('query',function() {
        var regex = Utils.getRegex($scope.query || ''), result = [ ];
        for (var i=0;i<ships.length;++i) {
            if (regex.test(ships[i].name))
                result.push(ships[i]);
        }
        $scope.list = result;
    });

    $scope.getThumbnail = function(ship) {
        if (!ship.thumb) {
            var paths = Utils.getThumbnailUrl(null, '..');
            return 'background-image: url(' + paths.jap + ')';
        }
        return 'background-image: url(https://onepiece-treasurecruise.com/wp-content/uploads/' + ship.thumb + ')';
    };

    $scope.getThumbnailLocal = function(ship, relPathToRoot = '..') {
        if (!ship.thumb) return relPathToRoot + '/api/images/thumbnail/ship/ship_blank_t1.png';
        return relPathToRoot + '/api/images/thumbnail/ship/' + ship.thumb;
    };

    $scope.pickShip = function(name) {
        for (var i=0;i<ships.length;++i) {
            if (ships[i].name != name) continue;
            $scope.data.ship[0] = i;
            break;
        }
        $state.go('^');
    };

};

/*************
 * ResetCtrl *
 *************/

controllers.ResetCtrl = function($scope, $state, $storage) {
    $scope.resetStorage = function() {
        $storage.remove('team');
        for (var i=0;i<6;++i) $scope.resetSlot(i);
        $state.go('^');
    };
};
    
/*******************
 * InstructionCtrl *
 ******************/

controllers.InstructionCtrl = function() {
    //Do nothing
};

/*************
 * CandyCtrl *
 *************/

controllers.CandyCtrl = function($scope, $state, $stateParams) {
    $scope.slot = $stateParams.slot;
    $scope.resetCandies = function() {
        $scope.data.team[$scope.slot].candies = { hp: 0, atk: 0, rcv: 0 };
    };
};

/***************
 * EffectsCtrl *
 ***************/

controllers.EffectsCtrl = function($scope, $state) {
    $scope.list = effects;
    $scope.pickEffect = function(effect) {
        $scope.data.effect = effect;
        $state.go('^');
    };
};

/***************
 * PopoverCtrl *
 ***************/

controllers.PopoverCtrl = function($scope) {
    if (!$scope.data.team[$scope.slot].unit) return;
    var id = $scope.data.team[$scope.slot].unit.id;
    
    // Extract base ID from variant ID (e.g., "4475-1" -> "4475", "4475-INT" -> "4475")
    var baseId = String(id).split('-')[0];
    var variantSuffix = String(id).split('-')[1] || null;
    
    // Look up details using base ID (variant IDs don't exist in window.details)
    $scope.details = window.details[baseId] ? JSON.parse(JSON.stringify(window.details[baseId])) : null;
    $scope.cooldown = window.cooldowns[baseId] || window.cooldowns[id] || null;
    
    // Set char1 and char2 for dual/VS units
    $scope.char1 = window.units[baseId + '-1'] || null;
    $scope.char2 = window.units[baseId + '-2'] || null;
    
    // Determine variant type: '1' = character1, '2' = character2, null = base dual/VS
    $scope.variantType = null;
    if (variantSuffix === '1' || variantSuffix === 'STR' || variantSuffix === 'DEX' || variantSuffix === 'QCK' || variantSuffix === 'INT' || variantSuffix === 'PSY') {
        $scope.variantType = 'character1';
    } else if (variantSuffix === '2') {
        $scope.variantType = 'character2';
    }
    
    if (!$scope.details) return;
    
    // Handle special - for variant units, keep the object structure with character1/character2
    if ($scope.details.special) {
        // For variant units (-1 or -2), don't simplify - keep the object for template to handle
        if (!$scope.variantType && $scope.details.special.llbbase) {
            $scope.details.special = $scope.details.special.llbbase;
        }
        // For variant units with arrays, extract last stage
        if (Array.isArray($scope.details.special)) {
            var lastStage = $scope.details.special.slice(-1)[0];
            $scope.cooldown = lastStage.cooldown;
            $scope.details.special = lastStage.description;
        }
    }
    
    // Handle captain - for variant units, keep object structure
    if ($scope.details.captain && typeof $scope.details.captain === 'object') {
        // Only simplify for base dual/VS units (not variant -1/-2)
        if (!$scope.variantType) {
            if ($scope.details.captain.combined) {
                $scope.details.captain = $scope.details.captain.combined;
            } else if ($scope.details.captain.level6) {
                $scope.details.captain = $scope.details.captain.level6;
            } else if ($scope.details.captain.level5) {
                $scope.details.captain = $scope.details.captain.level5;
            } else if ($scope.details.captain.level4) {
                $scope.details.captain = $scope.details.captain.level4;
            } else if ($scope.details.captain.level3) {
                $scope.details.captain = $scope.details.captain.level3;
            } else if ($scope.details.captain.level2) {
                $scope.details.captain = $scope.details.captain.level2;
            } else if ($scope.details.captain.llblevel1) {
                $scope.details.captain = $scope.details.captain.llblevel1;
            } else if ($scope.details.captain.level1) {
                $scope.details.captain = $scope.details.captain.level1;
            } else if ($scope.details.captain.llbbase) {
                $scope.details.captain = $scope.details.captain.llbbase;
            } else if ($scope.details.captain.base) {
                $scope.details.captain = $scope.details.captain.base;
            }
        }
    }
    
    // Handle sailor - for variant units, keep object structure
    if ($scope.details.sailor && typeof $scope.details.sailor === 'object') {
        // Only simplify for base dual/VS units
        if (!$scope.variantType) {
            if ($scope.details.sailor.llbbase) {
                $scope.details.sailor = $scope.details.sailor.llbbase;
            }
        }
    }
    
    // Handle swap - for variant units, keep object structure
    if ($scope.details.swap && typeof $scope.details.swap === 'object') {
        // Only simplify for base dual/VS units
        if (!$scope.variantType && $scope.details.swap.base) {
            $scope.details.swap = $scope.details.swap.base;
        }
    }
    
    // Handle superSpecial
    if ($scope.details.superSpecial && typeof $scope.details.superSpecial === 'object') {
        // Keep object structure for variant units
    }
};

/*****************
 * QuickPickCtrl *
 *****************/

controllers.QuickPickCtrl = function($scope, $state) {

    var pickUnit = function(slotNumber, unitId) {
        $scope.resetSlot(slotNumber);
        if (unitId) {
            $scope.data.team[slotNumber].unit = window.units[unitId];
            $scope.data.team[slotNumber].level = window.units[unitId].maxLevel;
            $scope.slotChanged(slotNumber);
        }
    };

    $scope.quickPick = function() {

        var data = $scope.quickPickContent.split(/[\r\n]/)
            .filter(function(x) { return x && x.trim().length > 0; })
            .map(function(x) { return x.trim(); });

        // Support both numeric IDs and variant IDs (e.g., "1983" or "1983-INT")
        Object.values(window.units).forEach(function(unit) {
            while (data.indexOf(unit.name) >= 0)
                data.splice(data.indexOf(unit.name), 1, unit.id);
        });

        data = data.map(function(x) {
            if (x && window.units[x]) return x;
            return null;
        });

        data = data.slice(0,6);
        for (var i=0;i<6;++i)
            pickUnit(i, data[i]);

        $state.go('^');

    };

};

/*****************************
 * Controller initialization *
 *****************************/

for (var key in controllers)
    angular.module('optc')
        .controller(key, controllers[key]);

})();
