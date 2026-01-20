/* jshint loopfunc: true */

(function() {

var MODIFIERS = [ 'Miss', 'Good', 'Great', 'Perfect' ];

window.Utils = window.Utils || {};

/**
 * Extract base ID from variant ID
 * Examples:
 *   "1983-1" -> "1983"
 *   "1983-INT" -> "1983"
 *   "1983" -> "1983"
 */
window.Utils.getBaseId = function(id) {
    return String(id).split('-')[0];
};

/**
 * Check if ID is a variant (has - in it)
 */
window.Utils.isVariant = function(id) {
    return String(id).includes('-');
};

/**
 * Get variant suffix from ID
 * Examples:
 *   "1983-1" -> "1"
 *   "1983-INT" -> "INT"
 *   "1983" -> null
 */
window.Utils.getVariantSuffix = function(id) {
    var parts = String(id).split('-');
    return parts.length > 1 ? parts[1] : null;
};

/**
 * Check if unit is a base unit (type: null)
 */
window.Utils.isBaseUnit = function(unit) {
    return unit && unit.type === null;
};

/**
 * Get the display name for a unit in the picker
 * Shows variant suffix for clarity (e.g., "Smoker & Tashigi (INT)")
 */
window.Utils.getDisplayName = function(unit) {
    if (!unit) return '';
    if (unit.type === null) return unit.name;
    var suffix = window.Utils.getVariantSuffix(unit.id);
    if (suffix) {
        return unit.name + ' (' + suffix + ')';
    }
    return unit.name;
};

/**
 * Compare two unit IDs by their base ID
 * Useful for sorting and grouping
 */
window.Utils.compareBaseIds = function(id1, id2) {
    var base1 = parseInt(window.Utils.getBaseId(id1), 10);
    var base2 = parseInt(window.Utils.getBaseId(id2), 10);
    if (base1 < base2) return -1;
    if (base1 > base2) return 1;
    return 0;
};

window.CrunchUtils = { };

window.CrunchUtils.okamaCheck = function(array, modifiers, data) {
    for (var i=0;i<array.length;++i) {
        for (var j=0;j<data.length && i+j<array.length;++j) {
            var different = (data[j].type && array[i+j].unit.unit.type != data[j].type) ||
                (data[j].minModifier && MODIFIERS.indexOf(modifiers[i+j]) < MODIFIERS.indexOf(data[j].minModifier));
            if (different) break;
        }
        if (j == data.length) return true;
    }
    return false;
};

//Sorts the hit order to proc a Raid-Ivan style captain boost
window.CrunchUtils.okamaSort = function(array, data) {
    var that = jQuery.extend([], array), temp = [ ];
    for (var i=0;i<data.length;++i) {
        for (var j=0;j<that.length;++j) {
            if (that[j].unit.unit.type != data[i]) continue;
            temp.push(that.splice(j,1)[0]);
            break;
        }
        if (i == data.length) break;
    }
    if (temp.length != data.length) return null;
    else return [ temp.concat(that) ];
};
    
/* Sorts by class (units not belonging to the specified class(es) at the
 * beginning), then by ATK. classMultiplier is the multiplier units belonging
 * to the specified class(es) receive. */
window.CrunchUtils.classSort = function(array, classMultiplier, classes) {
    var result = [ ];
    function isUnitAMatch(unit) {
        for (var n = 0;n<classes.length;n++) {
            if (unit.class.has(classes[n])) {
                return true;
            }
        }
        return false;
    }
    // atk-based
    var temp = array.map(function(x) {
        var multiplier = x.multipliers.reduce(function(prev,next) { return prev * next[0]; },1);
        return [ x.base * multiplier * (isUnitAMatch(x.unit.unit) ? classMultiplier : 1), x ];
    });
    temp.sort(function(x,y) { return x[0] - y[0]; });
    result.push(temp.map(function(x) { return x[1]; }));
    // class-based
    var beginning = [ ], end = [ ];
    array.forEach(function(x) {
        if (isUnitAMatch(x.unit.unit)) {
            end.push(x);
        } else {
            beginning.push(x);
        }
    });
    result.push(beginning.concat(end));
    // return result
    return result;
};
    
/* Sorts by class (units not belonging to the specified class(es) at the
 * beginning), then by ATK. classMultiplier is the multiplier units belonging
 * to the specified class(es) receive. */
window.CrunchUtils.typeclassSort = function(array, classMultiplier, classes) {
    var result = [ ];
    function isUnitAMatch(unit) {
        for (var n = 0;n<classes.length;n++) {
            if (unit.class.has(classes[n])) {
                return true;
            }
        }
        if (classes.includes(unit.type)) {
            return true;
        }
        return false;
    }
    // atk-based
    var temp = array.map(function(x) {
        var multiplier = x.multipliers.reduce(function(prev,next) { return prev * next[0]; },1);
        return [ x.base * multiplier * (isUnitAMatch(x.unit.unit) ? classMultiplier : 1), x ];
    });
    temp.sort(function(x,y) { return x[0] - y[0]; });
    result.push(temp.map(function(x) { return x[1]; }));
    // class-based
    var beginning = [ ], end = [ ];
    array.forEach(function(x) {
        if (isUnitAMatch(x.unit.unit)) {
            end.push(x);
        } else {
            beginning.push(x);
        }
    });
    result.push(beginning.concat(end));
    // return result
    return result;
};
    
window.CrunchUtils.lowCostSort = function(array, costMultiplier, cost) {
    var result = [ ];
    function isUnitAMatch(unit) {
        if (unit.cost <= cost) {
            return true;
        }
        return false;
    }
    // atk-based
    var temp = array.map(function(x) {
        var multiplier = x.multipliers.reduce(function(prev,next) { return prev * next[0]; },1);
        return [ x.base * multiplier * (isUnitAMatch(x.unit.unit) ? costMultiplier : 1), x ];
    });
    temp.sort(function(x,y) { return x[0] - y[0]; });
    result.push(temp.map(function(x) { return x[1]; }));
    // class-based
    var beginning = [ ], end = [ ];
    array.forEach(function(x) {
        if (isUnitAMatch(x.unit.unit)) {
            end.push(x);
        } else {
            beginning.push(x);
        }
    });
    result.push(beginning.concat(end));
    // return result
    return result;
};
    
window.CrunchUtils.typeSort = function(array, typeMultiplier, types) {
    var result = [ ];
    function isUnitAMatch(unit) {
        if (types.includes(unit.type)) {
            return true;
        }
        else {
            return false;
        }
    }
    var temp = array.map(function(x) {
        var multiplier = x.multipliers.reduce(function(prev,next) { return prev * next[0]; },1);
        return [ x.base * multiplier * (isUnitAMatch(x.unit.unit) ? typeMultiplier : 1), x ];
    });
    temp.sort(function(x,y) { return x[0] - y[0]; });
    result.push(temp.map(function(x) { return x[1]; }));
    // class-based
    var beginning = [ ], end = [ ];
    array.forEach(function(x) {
        if (isUnitAMatch(x.unit.unit)) {
            end.push(x);
        } else {
            beginning.push(x);
        }
    });
    result.push(beginning.concat(end));
    return result;
};
    
window.CrunchUtils.gearSort = function(array, typeMultiplier) {
    var result = [ ];
    var gears = array.gear;
    delete array.gear;
    function isUnitAMatch(unit, slot) {
        if (slot < 2) {
            if (gears[slot] == 3){
                return true;
            }
            else{
                return false;
            }
        }
        else {
            return false;
        }
    }
    var temp = array.map(function(x) {
        var multiplier = x.multipliers.reduce(function(prev,next) { return prev * next[0]; },1);
        return [ x.base * multiplier * (isUnitAMatch(x.unit.unit, x.position) ? typeMultiplier : 1), x ];
    });
    temp.sort(function(x,y) { return x[0] - y[0]; });
    result.push(temp.map(function(x) { return x[1]; }));
    // class-based
    var beginning = [ ], end = [ ];
    array.forEach(function(x) {
        if (isUnitAMatch(x.unit.unit)) {
            end.push(x);
        } else {
            beginning.push(x);
        }
    });
    result.push(beginning.concat(end));
    return result;
};
    
window.CrunchUtils.kataCount = function(checkClasses, unitClasses) {
    return checkClasses.reduce((a, c) => a + unitClasses.includes(c), 0);
};

window.CrunchUtils.getOrbMultiplier = function(orb, type, uclass, baseMultiplier, boostedMultiplier, captains, effectName, params) {
    /* Object.keys(window.altspecials).forEach(function(x) {
        if (window.altspecials[x].hasOwnProperty('orbPlus')){
            if(window.altspecials[x].turnedOn)
                if (window.altspecials[x].orbPlus(params) > orbPlusBonus)
                    orbPlusBonus = window.altspecials[x].orbPlus(params)
        }
    }); */

    boostedMultiplier = parseFloat(params.customBuffs.orb) != 1 ? parseFloat(params.customBuffs.orb) : boostedMultiplier;

    for(temp = 0; temp < 2; temp++){
        if(captains[temp] != null){
            var captainBaseId = window.Utils.getBaseId(captains[temp].id);
            if([1610, 1609, 1532, 1531, 2232, 2233, 2234, 2500, 2300, 2803, 2804, "2516-INT",  "2517-1", "2517-2", "2517-QCK", 2957, 2957, 3306, 3307, 3814, 3888, 3889, 3904, 3905, 3947, 3948, "3877-1", "3877-2", "3877-STR", "3877-DEX", "3878-1", "3878-2", "3878-STR", "3878-DEX", 3955, 3956, 3957, 3966, 3967, "4002-1", "4002-2", "4002-STR", "4002-QCK", "4003-1", "4003-1", "4003-STR", "4003-QCK", 4028, 4029, 4139].includes(parseInt(captainBaseId))){
                if (orb == 'meat'){
                    return boostedMultiplier;
                }
            }
            if(["3877-1", "3877-2", "3877-STR", "3877-DEX", "3878-1", "3878-2", "3878-STR", "3878-DEX",  "3994-1",  "3994-2",  "3994-INT",  "3994-PSY", "3995-1", "3995-2", "3995-INT", "3995-PSY", 4028, 4029, 4050].includes(parseInt(captainBaseId))){
                if (orb == 'tnd'){
                    return boostedMultiplier;
                }
            }
            if([2012, 2013].includes(parseInt(captainBaseId)) && uclass.has("Free Spirit")){
                if (orb == 'meat'){
                    return boostedMultiplier;
                }
            }
            if([2022, 2023].includes(parseInt(captainBaseId)) && type == 'INT'){
                if (orb == 'str'){
                    return boostedMultiplier;
                }
            }
            if([2306].includes(parseInt(captainBaseId)) && (uclass.has("Slasher") || uclass.has("Cerebral"))){
                if (orb == 'str' || (type == 'DEX' && orb == 0.5)){
                    return boostedMultiplier;
                }
            }
            if(["2445-1", "2445-2", "2445-PSY", "2446-1", "2446-2", "2446-PSY", "2468-1", "2468-2"].includes(parseInt(captainBaseId)) && (uclass.has("Driven"))){
                if (orb == 'str' || (type == 'DEX' && orb == 0.5)){
                    return boostedMultiplier;
                }
            }
            if([2137].includes(parseInt(captainBaseId))){
                if (orb == 'str' || (type == 'DEX' && orb == 0.5)){
                    return boostedMultiplier;
                }
            }
            if(["2399-DEX", "2399-STR"].includes(parseInt(captainBaseId)) && type == 'DEX'){
                if (orb == 0.5){
                    return boostedMultiplier;
                }
            }
            if([2476, 2477].includes(parseInt(captainBaseId)) && (uclass.has("Slasher"))){
                if ((orb == 'dex' || orb == 'int') || (orb == 0.5  && (type == 'QCK' || type == 'PSY'))){
                    return boostedMultiplier;
                }
            }
            if([4050].includes(parseInt(captainBaseId))){
                if ((orb == 'dex') || (orb == 2  && type == 'DEX')){
                    return boostedMultiplier;
                }
            }
        }
    }
    if (orb == 1.0 || orb == 'str' || orb == 'dex' || orb == 'qck' || orb == 'psy' || orb == 'int' || orb == 'meat' || orb == 'empty') return baseMultiplier;
    if (orb == 2.0 || orb == 'g' || orb == 'superbomb' || orb == 'rainbow' || orb == 'wano') return boostedMultiplier;
    if (orb == 0.5) return 1 / boostedMultiplier;
    return 1;
};

window.CrunchUtils.limitUnlock = function(p, ability) {
    return p.team[p.sourceSlot].unit.limitStats[ability][Math.min(p.team[p.sourceSlot].limit,p.team[p.sourceSlot].unit.limitStats[ability].length-1)];
};

window.CrunchUtils.llimitUnlock = function(p, ability) {
    return p.team[p.sourceSlot].unit.llimitStats[ability][Math.min(p.team[p.sourceSlot].llimit,p.team[p.sourceSlot].unit.llimitStats[ability].length-1)];
};

})();
