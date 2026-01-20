window.altspecials = {
1587: {
        turnedOn: [ false, false, false, false, false, false ],
        onActivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn[p.sourceSlot] = true;
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn[p.sourceSlot] = false;
        },
    },
1588: {
        turnedOn: [ false, false, false, false, false, false ],
        onActivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn[p.sourceSlot] = true;
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn[p.sourceSlot] = false;
        },
    },
1934: {
        turnedOn: [ false, false, false, false, false, false ],
        onActivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn[p.sourceSlot] = true;
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn[p.sourceSlot] = false;
        },
    },
1935: {
        turnedOn: [ false, false, false, false, false, false ],
        onActivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn[p.sourceSlot] = true;
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn[p.sourceSlot] = false;
        },
    },
"2000-1": {
        chainAddition: function(p) { return 0.5; },
    },
"2000-2": {
        chainAddition: function(p) { return 0.5; },
    },
"2000-PSY": {
        chainAddition: function(p) { return 0.5; },
    },
"2000-DEX": {
        chainAddition: function(p) { return 0.5; },
    },
2073: {
        luffyGear: [ 0, 0, 0, 0, 0, 0 ],
        turnedOn: [ false, false, false, false, false, false ],
        onActivation: function(p) {
            var levels = [0, 1, 2, 3];
            var n = (levels.indexOf(window.capspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].luffyGear[p.sourceSlot]) + 1) % levels.length;
            window.capspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].luffyGear[p.sourceSlot] = levels[n];
            window.capspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn[p.sourceSlot] = true;
            p.scope.notify({
                text: '' + ["Gear 2", "Gear 3", "Boundman", "Tankman"][n] + ' boost. To ' + ["Gear 2", "Gear 3", "Boundman", "Tankman"][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
2074: {
        luffyGear: [ 0, 0, 0, 0, 0, 0 ],
        turnedOn: [ false, false, false, false, false, false ],
        onActivation: function(p) {
            var levels = [0, 1, 2, 3];
            var n = (levels.indexOf(window.capspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].luffyGear[p.sourceSlot]) + 1) % levels.length;
            window.capspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].luffyGear[p.sourceSlot] = levels[n];
            window.capspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn[p.sourceSlot] = true;
            p.scope.notify({
                text: '' + ["Gear 2", "Gear 3", "Boundman", "Tankman"][n] + ' boost. To ' + ["Gear 2", "Gear 3", "Boundman", "Tankman"][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
2245: {
        turnedOn: [ false, false, false, false, false, false ],
        onActivation: function(p) {
            console.log(p);
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn[p.sourceSlot] = true;
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn[p.sourceSlot] = false;
        },
    },
2300: {
        turnedOn: [ false, false, false, false, false, false ],
        onActivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn[p.sourceSlot] = true;
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn[p.sourceSlot] = false;
        },
    },
"2417-1": {
        orb: function(p) { return p.slot == p.sourceSlot ? 1.5 : 1; },
    },
"2417-2": {
        orb: function(p) { return p.slot == p.sourceSlot ? 1.5 : 1; },
    },
"2417-DEX": {
        orb: function(p) { return p.slot == p.sourceSlot ? 1.5 : 1; },
    },
"2417-QCK": {
        orb: function(p) { return p.slot == p.sourceSlot ? 1.5 : 1; },
    },
"2418-1": {
        orb: function(p) { return p.slot == p.sourceSlot ? 1.5 : 1; },
    },
"2418-2": {
        orb: function(p) { return p.slot == p.sourceSlot ? 1.5 : 1; },
    },
"2418-DEX": {
        orb: function(p) { return p.slot == p.sourceSlot ? 1.5 : 1; },
    },
"2418-QCK": {
        orb: function(p) { return p.slot == p.sourceSlot ? 1.5 : 1; },
    },
"2445-1": {
        chainMultiplication: function(p) { return 1.25; },
    },
"2445-2": {
        chainMultiplication: function(p) { return 1.25; },
    },
"2445-PSY": {
        chainMultiplication: function(p) { return 1.25; },
    },
"2446-1": {
        chainMultiplication: function(p) { return 1.25; },
    },
"2446-2": {
        chainMultiplication: function(p) { return 1.25; },
    },
"2446-PSY": {
        chainMultiplication: function(p) { return 1.25; },
    },
"2533-1": {
        atk: function(p) { return p.slot == p.sourceSlot ? 2 : 1; },
        type: "type",
    },
"2533-2": {
        atk: function(p) { return p.slot == p.sourceSlot ? 2 : 1; },
        type: "type",
    },
"2533-DEX": {
        atk: function(p) { return p.slot == p.sourceSlot ? 2 : 1; },
        type: "type",
    },
"2533-QCK": {
        atk: function(p) { return p.slot == p.sourceSlot ? 2 : 1; },
        type: "type",
    },
"2534-1": {
        atk: function(p) { return p.slot == p.sourceSlot ? 2 : 1; },
        type: "type",
    },
"2534-2": {
        atk: function(p) { return p.slot == p.sourceSlot ? 2 : 1; },
        type: "type",
    },
"2534-DEX": {
        atk: function(p) { return p.slot == p.sourceSlot ? 2 : 1; },
        type: "type",
    },
"2534-QCK": {
        atk: function(p) { return p.slot == p.sourceSlot ? 2 : 1; },
        type: "type",
    },
"2535-1": {
        atk: function(p) { return p.slot == p.sourceSlot ? 1.5 : 1; },
        type: "type",
        orb: function(p) { return p.slot == p.sourceSlot ? 1.5 : 1; },
    },
"2535-2": {
        atk: function(p) { return p.slot == p.sourceSlot ? 1.5 : 1; },
        type: "type",
        orb: function(p) { return p.slot == p.sourceSlot ? 1.5 : 1; },
    },
"2535-INT": {
        atk: function(p) { return p.slot == p.sourceSlot ? 1.5 : 1; },
        type: "type",
        orb: function(p) { return p.slot == p.sourceSlot ? 1.5 : 1; },
    },
"2536-1": {
        atk: function(p) { return p.slot == p.sourceSlot ? 1.5 : 1; },
        type: "type",
        orb: function(p) { return p.slot == p.sourceSlot ? 1.5 : 1; },
    },
"2536-2": {
        atk: function(p) { return p.slot == p.sourceSlot ? 1.5 : 1; },
        type: "type",
        orb: function(p) { return p.slot == p.sourceSlot ? 1.5 : 1; },
    },
"2536-INT": {
        atk: function(p) { return p.slot == p.sourceSlot ? 1.5 : 1; },
        type: "type",
        orb: function(p) { return p.slot == p.sourceSlot ? 1.5 : 1; },
    },
"2537-1": {
        chainAddition: function(p) { return 0.3; },
    },
"2537-2": {
        chainAddition: function(p) { return 0.3; },
    },
"2537-STR": {
        chainAddition: function(p) { return 0.3; },
    },
"2537-DEX": {
        chainAddition: function(p) { return 0.3; },
    },
"2538-1": {
        chainAddition: function(p) { return 0.3; },
    },
"2538-2": {
        chainAddition: function(p) { return 0.3; },
    },
"2538-STR": {
        chainAddition: function(p) { return 0.3; },
    },
"2538-DEX": {
        chainAddition: function(p) { return 0.3; },
    },
"2551-1": {
        atk: function(p) { return p.unit.class.has("Fighter") ? 1.2 : 1; },
        type: "type",
    },
"2551-2": {
        atk: function(p) { return p.unit.class.has("Fighter") ? 1.2 : 1; },
        type: "type",
    },
"2551-INT": {
        atk: function(p) { return p.unit.class.has("Fighter") ? 1.2 : 1; },
        type: "type",
    },
"2551-DEX": {
        atk: function(p) { return p.unit.class.has("Fighter") ? 1.2 : 1; },
        type: "type",
    },
"2552-1": {
        atk: function(p) { return p.unit.class.has("Fighter") ? 1.2 : 1; },
        type: "type",
    },
"2552-2": {
        atk: function(p) { return p.unit.class.has("Fighter") ? 1.2 : 1; },
        type: "type",
    },
"2552-INT": {
        atk: function(p) { return p.unit.class.has("Fighter") ? 1.2 : 1; },
        type: "type",
    },
"2552-DEX": {
        atk: function(p) { return p.unit.class.has("Fighter") ? 1.2 : 1; },
        type: "type",
    },
"2560-1": {
        affinity: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit")) ? 1.5 : 1; },
    },
"2560-2": {
        affinity: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit")) ? 1.5 : 1; },
    },
"2560-STR": {
        affinity: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit")) ? 1.5 : 1; },
    },
"2560-INT": {
        affinity: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit")) ? 1.5 : 1; },
    },
"2561-1": {
        affinity: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit")) ? 1.5 : 1; },
    },
"2561-2": {
        affinity: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit")) ? 1.5 : 1; },
    },
"2561-STR": {
        affinity: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit")) ? 1.5 : 1; },
    },
"2561-INT": {
        affinity: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit")) ? 1.5 : 1; },
    },
"2600-1": {
        chain: function(p) { return 2.5; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 2.5 : 1;
        }
    },
"2600-2": {
        chain: function(p) { return 2.5; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 2.5 : 1;
        }
    },
"2600-DEX": {
        chain: function(p) { return 2.5; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 2.5 : 1;
        }
    },
"2600-STR": {
        chain: function(p) { return 2.5; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 2.5 : 1;
        }
    },
"2601-1": {
        chain: function(p) { return 2.5; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 2.5 : 1;
        }
    },
"2601-2": {
        chain: function(p) { return 2.5; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 2.5 : 1;
        }
    },
"2601-DEX": {
        chain: function(p) { return 2.5; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 2.5 : 1;
        }
    },
"2601-STR": {
        chain: function(p) { return 2.5; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 2.5 : 1;
        }
    },
"2618-1": {
        orb: function(p) { return (p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "INT")  ? 1.5 : 1; },
    },
"2618-2": {
        orb: function(p) { return (p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "INT")  ? 1.5 : 1; },
    },
"2618-STR": {
        orb: function(p) { return (p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "INT")  ? 1.5 : 1; },
    },
"2618-INT": {
        orb: function(p) { return (p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "INT")  ? 1.5 : 1; },
    },
2803: {
        staticMult: function(p) { return p.slot == p.sourceSlot ? 500 : 0; }
    },
2804: {
        staticMult: function(p) { return p.slot == p.sourceSlot ? 500 : 0; }
    },
"2859-1": {
        atkbase: function(p) { return Math.ceil(10 + 240*(1 - p.cached.multiplier/100)); },
        onActivation: function(p) { p.cached.multiplier = p.percHP; },
    },
"2859-2": {
        atkbase: function(p) { return Math.ceil(10 + 240*(1 - p.cached.multiplier/100)); },
        onActivation: function(p) { p.cached.multiplier = p.percHP; },
    },
"2859-STR": {
        atkbase: function(p) { return Math.ceil(10 + 240*(1 - p.cached.multiplier/100)); },
        onActivation: function(p) { p.cached.multiplier = p.percHP; },
    },
"2860-1": {
        atkbase: function(p) { return Math.ceil(10 + 240*(1 - p.cached.multiplier/100)); },
        onActivation: function(p) { p.cached.multiplier = p.percHP; },
    },
"2860-2": {
        atkbase: function(p) { return Math.ceil(10 + 240*(1 - p.cached.multiplier/100)); },
        onActivation: function(p) { p.cached.multiplier = p.percHP; },
    },
"2860-STR": {
        atkbase: function(p) { return Math.ceil(10 + 240*(1 - p.cached.multiplier/100)); },
        onActivation: function(p) { p.cached.multiplier = p.percHP; },
    },
"2861-1": {
        atk: function(p) { return 1.5; },
        type: "type",
    },
"2861-2": {
        atk: function(p) { return 1.5; },
        type: "type",
    },
"2861-PSY": {
        atk: function(p) { return 1.5; },
        type: "type",
    },
"2861-QCK": {
        atk: function(p) { return 1.5; },
        type: "type",
    },
"2862-1": {
        atk: function(p) { return 1.5; },
        type: "type",
    },
"2862-2": {
        atk: function(p) { return 1.5; },
        type: "type",
    },
"2862-PSY": {
        atk: function(p) { return 1.5; },
        type: "type",
    },
"2862-QCK": {
        atk: function(p) { return 1.5; },
        type: "type",
    },
"2867-1": {
        affinity: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Driven")) ? 1.2 : 1; },
    },
"2867-2": {
        affinity: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Driven")) ? 1.2 : 1; },
    },
"2867-INT": {
        affinity: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Driven")) ? 1.2 : 1; },
    },
"2894-1": {
        negative: function(p) { return 1; },
    },
"2894-2": {
        negative: function(p) { return 1; },
    },
"2894-STR": {
        negative: function(p) { return 1; },
    },
"2894-PSY": {
        negative: function(p) { return 1; },
    },
"2895-1": {
        negative: function(p) { return 1; },
    },
"2895-2": {
        negative: function(p) { return 1; },
    },
"2895-STR": {
        negative: function(p) { return 1; },
    },
"2895-PSY": {
        negative: function(p) { return 1; },
    },
2958: {
        atk: function(p) { return 2; },
        type: "type",
    },
2960: {
        chainMultiplication: function(p) { return 1.25; },
        staticMult: function(p) { return 100; }
    },
2962: {
        delay: function(p) { return 1; },
        ignoresImmunities: function(p) { return ['delay']; },
    },
2964: {
        atkbase: function(p) { return p.slot == p.sourceSlot ? 1000 : 0; },
    },
3009: {
        orb: function(p) { return p.unit.cost <= 40  ? 2.25 : 1; },
    },
3037: {
        atk: function(p) { return p.unit.type == "PSY" ? 2.5 : 1; },
        type: "type",
    },
3038: {
        atk: function(p) { return p.unit.type == "PSY" ? 2.5 : 1; },
        type: "type",
    },
3071: {
        chainMultiplication: function(p) { return 1.25; },
    },
3100: {
        staticMult: function(p) { return p.slot == p.sourceSlot ? 1000 : 0; },
    },
3118: {
        def: function(p) { return 0; },
    },
3122: {
        orb: function(p) { return 1.75; },
    },
"3163-1": {
        chainMultiplication: function(p) { return 1.25; },
    },
"3163-2": {
        chainMultiplication: function(p) { return 1.25; },
    },
"3163-QCK": {
        chainMultiplication: function(p) { return 1.25; },
    },
"3163-DEX": {
        chainMultiplication: function(p) { return 1.25; },
    },
"3164-1": {
        chainMultiplication: function(p) { return 1.25; },
    },
"3164-2": {
        chainMultiplication: function(p) { return 1.25; },
    },
"3164-QCK": {
        chainMultiplication: function(p) { return 1.25; },
    },
"3164-DEX": {
        chainMultiplication: function(p) { return 1.25; },
    },
3175: {
        atkbase: function(p) { return p.slot == p.sourceSlot ? 1000 : 0; },
    },
3225: {
        affinity: function(p) { return p.unit.type == "DEX" ? 2 : 1; },
    },
"3252-1": {
        atk: function(p) { return 2; },
        type: "condition",
        warning: "Selected special (%name%) assumes that the enemy has been inflicted with Burn."
    },
"3252-2": {
        atk: function(p) { return 1.75; },
        type: "condition",
        warning: "Selected special (%name%) assumes that the enemy has been inflicted with Burn."
    },
"3253-1": {
        atk: function(p) { return 2; },
        type: "condition",
        warning: "Selected special (%name%) assumes that the enemy has been inflicted with Burn."
    },
"3253-2": {
        atk: function(p) { return 1.75; },
        type: "condition",
        warning: "Selected special (%name%) assumes that the enemy has been inflicted with Burn."
    },
"3331-1": {
        chainAddition: function(p) { return 0.3; },
    },
"3331-2": {
        chainAddition: function(p) { return 0.3; },
    },
"3331-QCK": {
        chainAddition: function(p) { return 0.3; },
    },
3334: {
        chainAddition: function(p) { return 1; },
    },
"3346-1": {
        atk: function(p) { return p.slot == p.sourceSlot ? 2 : 1; },
        type: "type",
    },
"3346-2": {
        atk: function(p) { return p.slot == p.sourceSlot ? 2 : 1; },
        type: "type",
    },
"3346-STR": {
        atk: function(p) { return p.slot == p.sourceSlot ? 2 : 1; },
        type: "type",
    },
"3346-DEX": {
        atk: function(p) { return p.slot == p.sourceSlot ? 2 : 1; },
        type: "type",
    },
"3348-1": {
        affinity: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [1.5, 2.25];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + ' boost. To ' + levels[(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: '5329warning'
            });
        },
    },
"3348-2": {
        affinity: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [1.5, 2.25];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + ' boost. To ' + levels[(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: '5330warning'
            });
        },
    },
"3348-QCK": {
        affinity: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [1.5, 2.25];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + ' boost. To ' + levels[(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: '5331warning'
            });
        },
    },
"3348-DEX": {
        affinity: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [1.5, 2.25];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + ' boost. To ' + levels[(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: '5332warning'
            });
        },
    },
"3349-1": {
        affinity: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [1.5, 2.25];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + ' boost. To ' + levels[(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: '5333warning'
            });
        },
    },
"3349-2": {
        affinity: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [1.5, 2.25];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + ' boost. To ' + levels[(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: '5334warning'
            });
        },
    },
"3349-QCK": {
        affinity: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [1.5, 2.25];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + ' boost. To ' + levels[(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: '5335warning'
            });
        },
    },
"3349-DEX": {
        affinity: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [1.5, 2.25];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + ' boost. To ' + levels[(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: '5336warning'
            });
        },
    },
"3354-2": {
        atk: function(p) { return p.defenseDown ? 1.75 : 1; },
        type: "condition",
        def: function(p) { return 0; }
    },
"3355-2": {
        atk: function(p) { return p.defenseDown ? 1.75 : 1; },
        type: "condition",
        def: function(p) { return 0; }
    },
3364: {
        atkPlus: function(p) { return 0.3; },
        orbPlus: function(p) { return 0.3; },
        turnedOn: false,
        onActivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = true;
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = false;
        },
    },
3364: {
        atkPlus: function(p) { return 0.25; },
    },
3369: {
        chainMultiplication: function(p) { return 1.25; },
    },
3391: {
        affinity: function(p) { return p.unit.type == "STR" ? 2 : 1; },
    },
3403: {
        orb: function(p) { return p.unit.type == "INT" || p.unit.class.has("Cerebral") || p.unit.class.has("Powerhouse") ? 2 : 1; },
    },
3405: {
        atk: function(p) { return p.unit.type == "STR" || p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") ? 2 : 1; },
        type: "type",
    },
3422: {
        orbPlus: function(p) { return 0.3; },
        turnedOn: false,
        onActivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = true;
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = false;
        },
    },
3429: {
        chainMultiplication: function(p) { return 1.25; },
    },
3430: {
        chainMultiplication: function(p) { return 1.25; },
    },
"3432-1": {
        chain: function(p) { return p.cached.multiplier; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            if (p.cached.multiplier != 1) return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 35 : 1;
            else return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? Infinity : 1;
        },
        onActivation: function(p) {
            var levels = [ 1.6, 2.5 ];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + levels[n] + 'x Chain boundary. To switch to the ' + levels[(n + 1) % levels.length] + ' Chain boundary, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3432-2": {
        chain: function(p) { return p.cached.multiplier; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            if (p.cached.multiplier != 1) return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 35 : 1;
            else return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? Infinity : 1;
        },
        onActivation: function(p) {
            var levels = [ 1.6, 2.5 ];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + levels[n] + 'x Chain boundary. To switch to the ' + levels[(n + 1) % levels.length] + ' Chain boundary, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3432-QCK": {
        chain: function(p) { return p.cached.multiplier; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            if (p.cached.multiplier != 1) return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 35 : 1;
            else return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? Infinity : 1;
        },
        onActivation: function(p) {
            var levels = [ 1.6, 2.5 ];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + levels[n] + 'x Chain boundary. To switch to the ' + levels[(n + 1) % levels.length] + ' Chain boundary, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3432-DEX": {
        chain: function(p) { return p.cached.multiplier; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            if (p.cached.multiplier != 1) return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 35 : 1;
            else return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? Infinity : 1;
        },
        onActivation: function(p) {
            var levels = [ 1.6, 2.5 ];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + levels[n] + 'x Chain boundary. To switch to the ' + levels[(n + 1) % levels.length] + ' Chain boundary, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3433-1": {
        chain: function(p) { return p.cached.multiplier; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            if (p.cached.multiplier != 1) return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 35 : 1;
            else return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? Infinity : 1;
        },
        onActivation: function(p) {
            var levels = [ 1.6, 2.5 ];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + levels[n] + 'x Chain boundary. To switch to the ' + levels[(n + 1) % levels.length] + ' Chain boundary, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3433-2": {
        chain: function(p) { return p.cached.multiplier; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            if (p.cached.multiplier != 1) return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 35 : 1;
            else return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? Infinity : 1;
        },
        onActivation: function(p) {
            var levels = [ 1.6, 2.5 ];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + levels[n] + 'x Chain boundary. To switch to the ' + levels[(n + 1) % levels.length] + ' Chain boundary, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3433-QCK": {
        chain: function(p) { return p.cached.multiplier; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            if (p.cached.multiplier != 1) return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 35 : 1;
            else return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? Infinity : 1;
        },
        onActivation: function(p) {
            var levels = [ 1.6, 2.5 ];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + levels[n] + 'x Chain boundary. To switch to the ' + levels[(n + 1) % levels.length] + ' Chain boundary, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3433-DEX": {
        chain: function(p) { return p.cached.multiplier; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            if (p.cached.multiplier != 1) return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 35 : 1;
            else return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? Infinity : 1;
        },
        onActivation: function(p) {
            var levels = [ 1.6, 2.5 ];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + levels[n] + 'x Chain boundary. To switch to the ' + levels[(n + 1) % levels.length] + ' Chain boundary, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
3454: {
        negative: function(p) { return 10; },
    },
"3492-1": {
        status: function(p) { return p.delayed > 0 ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3492-2": {
        status: function(p) { return p.delayed > 0 ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3492-STR": {
        status: function(p) { return p.delayed > 0 ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3492-PSY": {
        status: function(p) { return p.delayed > 0 ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3493-1": {
        status: function(p) { return p.delayed > 0 ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3493-2": {
        status: function(p) { return p.delayed > 0 ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3493-STR": {
        status: function(p) { return p.delayed > 0 ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3493-PSY": {
        status: function(p) { return p.delayed > 0 ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3512-1": {
        atk: function(p) { return p.cached.multiplier; },
        type: "type",
        orb: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [1.5, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3512-2": {
        atk: function(p) { return p.cached.multiplier; },
        type: "type",
        orb: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [1.5, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3512-INT": {
        atk: function(p) { return p.cached.multiplier; },
        type: "type",
        orb: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [1.5, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3512-PSY": {
        atk: function(p) { return p.cached.multiplier; },
        type: "type",
        orb: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [1.5, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3513-1": {
        atk: function(p) { return p.cached.multiplier; },
        type: "type",
        orb: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [1.5, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3513-2": {
        atk: function(p) { return p.cached.multiplier; },
        type: "type",
        orb: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [1.5, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3513-INT": {
        atk: function(p) { return p.cached.multiplier; },
        type: "type",
        orb: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [1.5, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3513-PSY": {
        atk: function(p) { return p.cached.multiplier; },
        type: "type",
        orb: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [1.5, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
3519: {
        atkbase: function(p) { return p.slot < 2 ? 1000 : 0; },
    },
3523: {
        chain: function(p) { return 3.25; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 3.25 : 1;
        }
    },
"3542-1": {
        atk: function(p) { return [p.slot == p.sourceSlot, p.unit.class.has("Fighter") || p.unit.class.has("Slasher") || p.unit.class.has("Striker") || p.unit.class.has("Cerebral") || p.unit.class.has("Powerhouse")][p.cached.multiplier] ? 2 : 1; },
        type: "type",
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Own ATK', 'Class ATK'][n] + ' boost. To ' + ['Own ATK', 'Class ATK'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3542-2": {
        atk: function(p) { return [p.slot == p.sourceSlot, p.unit.class.has("Fighter") || p.unit.class.has("Slasher") || p.unit.class.has("Striker") || p.unit.class.has("Cerebral") || p.unit.class.has("Powerhouse")][p.cached.multiplier] ? 2 : 1; },
        type: "type",
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Own ATK', 'Class ATK'][n] + ' boost. To ' + ['Own ATK', 'Class ATK'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3542-QCK": {
        atk: function(p) { return [p.slot == p.sourceSlot, p.unit.class.has("Fighter") || p.unit.class.has("Slasher") || p.unit.class.has("Striker") || p.unit.class.has("Cerebral") || p.unit.class.has("Powerhouse")][p.cached.multiplier] ? 2 : 1; },
        type: "type",
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Own ATK', 'Class ATK'][n] + ' boost. To ' + ['Own ATK', 'Class ATK'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3542-DEX": {
        atk: function(p) { return [p.slot == p.sourceSlot, p.unit.class.has("Fighter") || p.unit.class.has("Slasher") || p.unit.class.has("Striker") || p.unit.class.has("Cerebral") || p.unit.class.has("Powerhouse")][p.cached.multiplier] ? 2 : 1; },
        type: "type",
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Own ATK', 'Class ATK'][n] + ' boost. To ' + ['Own ATK', 'Class ATK'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3543-1": {
        atk: function(p) { return [p.slot == p.sourceSlot, p.unit.class.has("Fighter") || p.unit.class.has("Slasher") || p.unit.class.has("Striker") || p.unit.class.has("Cerebral") || p.unit.class.has("Powerhouse")][p.cached.multiplier] ? 2 : 1; },
        type: "type",
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Own ATK', 'Class ATK'][n] + ' boost. To ' + ['Own ATK', 'Class ATK'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3543-2": {
        atk: function(p) { return [p.slot == p.sourceSlot, p.unit.class.has("Fighter") || p.unit.class.has("Slasher") || p.unit.class.has("Striker") || p.unit.class.has("Cerebral") || p.unit.class.has("Powerhouse")][p.cached.multiplier] ? 2 : 1; },
        type: "type",
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Own ATK', 'Class ATK'][n] + ' boost. To ' + ['Own ATK', 'Class ATK'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3543-QCK": {
        atk: function(p) { return [p.slot == p.sourceSlot, p.unit.class.has("Fighter") || p.unit.class.has("Slasher") || p.unit.class.has("Striker") || p.unit.class.has("Cerebral") || p.unit.class.has("Powerhouse")][p.cached.multiplier] ? 2 : 1; },
        type: "type",
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Own ATK', 'Class ATK'][n] + ' boost. To ' + ['Own ATK', 'Class ATK'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3543-DEX": {
        atk: function(p) { return [p.slot == p.sourceSlot, p.unit.class.has("Fighter") || p.unit.class.has("Slasher") || p.unit.class.has("Striker") || p.unit.class.has("Cerebral") || p.unit.class.has("Powerhouse")][p.cached.multiplier] ? 2 : 1; },
        type: "type",
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Own ATK', 'Class ATK'][n] + ' boost. To ' + ['Own ATK', 'Class ATK'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
3553: {
        chainMultiplication: function(p) { return 1.25; }
    },
3563: {
        chainPlus: function(p) { 
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1];
            return p.chainPosition === 0 ? 0 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 0.3 : 0;
        },
    },
"3573-1": {
        affinity: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [1.5, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3573-2": {
        affinity: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [1.5, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3573-PSY": {
        affinity: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [1.5, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3573-DEX": {
        affinity: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [1.5, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3574-1": {
        affinity: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [1.5, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3574-2": {
        affinity: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [1.5, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3574-PSY": {
        affinity: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [1.5, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3574-DEX": {
        affinity: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [1.5, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
3576: {
        chainAdditionPlus: function(p) { return 0.5; }, 
    },
3597: {
        atk: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 2.25 : 1; },
        type: "type",
    },
3607: {
        orbPlus: function(p) { return 0.25; },
        atkbase: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Free Spirit") ? 1000 : 0; },
        turnedOn: false,
        onActivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = true;
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = false;
        },
    },
"3610-1": {
        burn: function(p) { return 1; },
        chain: function(p) { return p.cached.multiplier; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            if (p.cached.multiplier != 1) return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 35 : 1;
            else return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? Infinity : 1;
        },
        onActivation: function(p) {
            var levels = [ 1.6, 2.5 ];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + levels[n] + 'x Chain boundary. To switch to the ' + levels[(n + 1) % levels.length] + ' Chain boundary, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3610-2": {
        burn: function(p) { return 1; },
        chain: function(p) { return p.cached.multiplier; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            if (p.cached.multiplier != 1) return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 35 : 1;
            else return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? Infinity : 1;
        },
        onActivation: function(p) {
            var levels = [ 1.6, 2.5 ];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + levels[n] + 'x Chain boundary. To switch to the ' + levels[(n + 1) % levels.length] + ' Chain boundary, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3610-STR": {
        burn: function(p) { return 1; },
        chain: function(p) { return p.cached.multiplier; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            if (p.cached.multiplier != 1) return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 35 : 1;
            else return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? Infinity : 1;
        },
        onActivation: function(p) {
            var levels = [ 1.6, 2.5 ];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + levels[n] + 'x Chain boundary. To switch to the ' + levels[(n + 1) % levels.length] + ' Chain boundary, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3610-DEX": {
        burn: function(p) { return 1; },
        chain: function(p) { return p.cached.multiplier; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            if (p.cached.multiplier != 1) return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 35 : 1;
            else return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? Infinity : 1;
        },
        onActivation: function(p) {
            var levels = [ 1.6, 2.5 ];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + levels[n] + 'x Chain boundary. To switch to the ' + levels[(n + 1) % levels.length] + ' Chain boundary, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3611-1": {
        burn: function(p) { return 1; },
        chain: function(p) { return p.cached.multiplier; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            if (p.cached.multiplier != 1) return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 35 : 1;
            else return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? Infinity : 1;
        },
        onActivation: function(p) {
            var levels = [ 1.6, 2.5 ];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + levels[n] + 'x Chain boundary. To switch to the ' + levels[(n + 1) % levels.length] + ' Chain boundary, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3611-2": {
        burn: function(p) { return 1; },
        chain: function(p) { return p.cached.multiplier; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            if (p.cached.multiplier != 1) return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 35 : 1;
            else return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? Infinity : 1;
        },
        onActivation: function(p) {
            var levels = [ 1.6, 2.5 ];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + levels[n] + 'x Chain boundary. To switch to the ' + levels[(n + 1) % levels.length] + ' Chain boundary, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3611-STR": {
        burn: function(p) { return 1; },
        chain: function(p) { return p.cached.multiplier; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            if (p.cached.multiplier != 1) return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 35 : 1;
            else return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? Infinity : 1;
        },
        onActivation: function(p) {
            var levels = [ 1.6, 2.5 ];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + levels[n] + 'x Chain boundary. To switch to the ' + levels[(n + 1) % levels.length] + ' Chain boundary, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3611-DEX": {
        burn: function(p) { return 1; },
        chain: function(p) { return p.cached.multiplier; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            if (p.cached.multiplier != 1) return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 35 : 1;
            else return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? Infinity : 1;
        },
        onActivation: function(p) {
            var levels = [ 1.6, 2.5 ];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + levels[n] + 'x Chain boundary. To switch to the ' + levels[(n + 1) % levels.length] + ' Chain boundary, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
3620: {
        orb: function(p) { return 1.75; },
    },
3626: {
        atk: function(p) { return 1.75; },
        type: "type",
    },
3627: {
        atk: function(p) { return 1.75; },
        type: "type",
    },
3629: {
        status: function(p) { return p.defenseDown ? 2.25 : 1; },
        def: function(p) { return 0; },//Temp until we deal with on-hit effects
    },
3631: {
        atkPlus: function(p) { return 0.25; },
        warning: "Selected alt-special (%name%) does not account for the Class of character that applies the buff and WILL BE INCORRECT some, if not all, of the time. Use at your own risk."
    },
3641: {
        atk: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 2.25 : 1; },
        type: "type",
    },
3650: {
        orbCeil: function(p) { return 3; },
        turnedOn: false,
        onActivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = true;
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = false;
        },
    },
3652: {
        chainMultiplication: function(p) { return 1.25; }
    },
3669: {
        chainMultiplication: function(p) { return 1.25; },
    },
3670: {
        chainAddition: function(p) { return 1.5; }, 
    },
3672: {
        orbCeil: function(p) { return 2.5; },
        turnedOn: false,
        onActivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = true;
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = false;
        },
    },
3674: {
        mark: function(p) { return 1; },
        status: function(p) { return p.marked ? 1.75 : 1; },
    },
3680: {
        atkPlus: function(p) { return 0.25; },
        orbPlus: function(p) { return 0.25; },
        turnedOn: false,
        onActivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = true;
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = false;
        },
        warning: "Selected alt-special (%name%) does not account for the Class of character that applies the buff and WILL BE INCORRECT some, if not all, of the time. Use at your own risk."
    },
3695: {
        affinityPlus: function(p) { return 0.25; },
    },
3697: {
        atk: function(p) { return p.unit.class.has("Shooter") ? 2 : 1; },
        type: "type",
    },
3718: {
        burn: function(p) { return 1; },
        chainMultiplication: function(p) { return 1.25; },
        staticMult: function(p) { return 150; }
    },
3721: {
        affinityPlus: function(p) { return 0.25; },
        orbPlus: function(p) { return 0.25; },
        warning: "Selected alt-special (%name%) does not account for the Class of character that applies the buff and WILL BE INCORRECT some, if not all, of the time. Use at your own risk."
    },
3723: {
        atkbase: function(p) { return 1250; },
    },
3724: {
        affinity: function(p) { return p.slot == p.sourceSlot ? 2.5 : 1; },
    },
3725: {
        affinity: function(p) { return p.slot == p.sourceSlot ? 2.5 : 1; },
    },
3726: {
        affinity: function(p) { return p.slot == p.sourceSlot ? 2.5 : 1; },
    },
3727: {
        affinity: function(p) { return p.slot == p.sourceSlot ? 2.5 : 1; },
    },
3735: {
        status: function(p) { return p.delayed > 0 ? 2 : 1; },
    },
3739: {
        atkbase: function(p) { return p.slot == p.sourceSlot ? 1250 : 0; },
    },
3755: {
        atk: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 2.5 : 1; },
        type: "type",
    },
3766: {
        affinity: function(p) { return p.unit.type == "INT" || p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 2.25 : 1; },
    },
3780: {
        affinity: function(p) { return p.unit.type == "STR" || p.unit.class.has("Shooter") || p.unit.class.has("Free Spirit") ? 2.25 : 1; },
    },
3785: {
        affinity: function(p) { return 1.75; },
    },
"3787-1": {
        increaseDamageTaken: function(p) { return 1.5; },
        ignoresImmunities: function(p) { return ['increaseDamageTaken']; },
    },
"3787-2": {
        turnedOn: false,
        onActivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = true;
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = false;
        },
    },
"3788-1": {
        increaseDamageTaken: function(p) { return 1.5; },
        ignoresImmunities: function(p) { return ['increaseDamageTaken']; },
    },
"3788-2": {
        turnedOn: false,
        onActivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = true;
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = false;
        },
    },
3790: {
        status: function(p) { return 2.25; },
        warning: "Selected special (%name%) assumes that the enemy has been inflicted with Paralysis."
    },
3792: {
        orbPlus: function(p) { return [0, 0.25, 0.25][p.cached.multiplier]; },
        orb: function(p) { return p.unit.type == "QCK" || p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") ? [2.5, 1, 2.5][p.cached.multiplier] : 1; },
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["Orb boost", "Orb Buff", "Orb boost and Orb buff"][n] + '. To switch to ' + ["Orb boost", "Orb Buff", "Orb boost and Orb buff"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
3805: {
        orb: function(p) { return p.unit.cost <= 40  ? 2.25 : 1; },
    },
"3810-1": {
        chainAddition: function(p) { return [0, 1.2, 1.2][p.cached.multiplier]; },
        atk: function(p) { return [1.3, 1, 1.3][p.cached.multiplier]; },
        type: "type",
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["ATK boost", "Chain Addition", "ATK boost and Chain Addition"][n] + '. To switch to ' + ["ATK boost", "Chain Addition", "ATK boost and Chain Addition"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3810-2": {
        chainAddition: function(p) { return [0, 1.2, 1.2][p.cached.multiplier]; },
        atk: function(p) { return [1.3, 1, 1.3][p.cached.multiplier]; },
        type: "type",
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["ATK boost", "Chain Addition", "ATK boost and Chain Addition"][n] + '. To switch to ' + ["ATK boost", "Chain Addition", "ATK boost and Chain Addition"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3810-PSY": {
        chainAddition: function(p) { return [0, 1.2, 1.2][p.cached.multiplier]; },
        atk: function(p) { return [1.3, 1, 1.3][p.cached.multiplier]; },
        type: "type",
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["ATK boost", "Chain Addition", "ATK boost and Chain Addition"][n] + '. To switch to ' + ["ATK boost", "Chain Addition", "ATK boost and Chain Addition"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3810-DEX": {
        chainAddition: function(p) { return [0, 1.2, 1.2][p.cached.multiplier]; },
        atk: function(p) { return [1.3, 1, 1.3][p.cached.multiplier]; },
        type: "type",
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["ATK boost", "Chain Addition", "ATK boost and Chain Addition"][n] + '. To switch to ' + ["ATK boost", "Chain Addition", "ATK boost and Chain Addition"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3811-1": {
        chainAddition: function(p) { return [0, 1.2, 1.2][p.cached.multiplier]; },
        atk: function(p) { return [1.3, 1, 1.3][p.cached.multiplier]; },
        type: "type",
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["ATK boost", "Chain Addition", "ATK boost and Chain Addition"][n] + '. To switch to ' + ["ATK boost", "Chain Addition", "ATK boost and Chain Addition"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3811-2": {
        chainAddition: function(p) { return [0, 1.2, 1.2][p.cached.multiplier]; },
        atk: function(p) { return [1.3, 1, 1.3][p.cached.multiplier]; },
        type: "type",
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["ATK boost", "Chain Addition", "ATK boost and Chain Addition"][n] + '. To switch to ' + ["ATK boost", "Chain Addition", "ATK boost and Chain Addition"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3811-PSY": {
        chainAddition: function(p) { return [0, 1.2, 1.2][p.cached.multiplier]; },
        atk: function(p) { return [1.3, 1, 1.3][p.cached.multiplier]; },
        type: "type",
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["ATK boost", "Chain Addition", "ATK boost and Chain Addition"][n] + '. To switch to ' + ["ATK boost", "Chain Addition", "ATK boost and Chain Addition"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3811-DEX": {
        chainAddition: function(p) { return [0, 1.2, 1.2][p.cached.multiplier]; },
        atk: function(p) { return [1.3, 1, 1.3][p.cached.multiplier]; },
        type: "type",
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["ATK boost", "Chain Addition", "ATK boost and Chain Addition"][n] + '. To switch to ' + ["ATK boost", "Chain Addition", "ATK boost and Chain Addition"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
3814: {
        chainAddition: function(p) { return 1.5; },
    },
3816: {
        atkPlus: function(p) { return 0.25; },
        orbPlus: function(p) { return 0.25; },
        turnedOn: false,
        onActivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = true;
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = false;
        },
        warning: "Selected alt-special (%name%) does not account for the Class of character that applies the buff and WILL BE INCORRECT some, if not all, of the time. Use at your own risk."
    },
"3828-1": {
        orb: function(p) { return [p.slot == p.sourceSlot, p.unit.class.has("Slasher") || p.unit.class.has("Striker") || p.unit.class.has("Cerebral") || p.unit.class.has("Powerhouse")][p.cached.multiplier] ? 2 : 1; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Own Orb', 'Class Orb'][n] + ' boost. To ' + ['Own Orb', 'Class Orb'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3828-2": {
        orb: function(p) { return [p.slot == p.sourceSlot, p.unit.class.has("Slasher") || p.unit.class.has("Striker") || p.unit.class.has("Cerebral") || p.unit.class.has("Powerhouse")][p.cached.multiplier] ? 2 : 1; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Own Orb', 'Class Orb'][n] + ' boost. To ' + ['Own Orb', 'Class Orb'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3828-STR": {
        orb: function(p) { return [p.slot == p.sourceSlot, p.unit.class.has("Slasher") || p.unit.class.has("Striker") || p.unit.class.has("Cerebral") || p.unit.class.has("Powerhouse")][p.cached.multiplier] ? 2 : 1; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Own Orb', 'Class Orb'][n] + ' boost. To ' + ['Own Orb', 'Class Orb'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3828-PSY": {
        orb: function(p) { return [p.slot == p.sourceSlot, p.unit.class.has("Slasher") || p.unit.class.has("Striker") || p.unit.class.has("Cerebral") || p.unit.class.has("Powerhouse")][p.cached.multiplier] ? 2 : 1; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Own Orb', 'Class Orb'][n] + ' boost. To ' + ['Own Orb', 'Class Orb'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
3829: {
        atk: function(p) { return 1.75; },
        type: "type",
    },
3839: {
        affinity: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" || p.unit.class.has("Cerebral") ? 2.5 : 1; },
    },
3842: {
        affinity: function(p) { return 1.75; },
    },
"3845-1": {
        atk: function(p) { return p.cached.multiplier; },
        type: "type",
        onActivation: function(p) {
            var levels = [1.5, 2.25];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3845-2": {
        atk: function(p) { return p.cached.multiplier; },
        type: "type",
        onActivation: function(p) {
            var levels = [1.5, 2.25];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3845-PSY": {
        atk: function(p) { return p.cached.multiplier; },
        type: "type",
        onActivation: function(p) {
            var levels = [1.5, 2.25];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3845-QCK": {
        atk: function(p) { return p.cached.multiplier; },
        type: "type",
        onActivation: function(p) {
            var levels = [1.5, 2.25];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
3848: {
        atkPlus: function(p) { return [0, 0.25, 0.25][p.cached.multiplier]; },
        atk: function(p) { return [1.75, 1, 1.75][p.cached.multiplier]; },
        type: "type",
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["ATK boost", "ATK Buff", "ATK boost and ATK buff"][n] + '. To switch to ' + ["ATK boost", "ATK Buff", "ATK boost and ATK buff"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
3850: {
        status: function(p) { return p.defenseDown ? 2.25 : 1; },
        orbPlus: function(p) { return 0.25; },
    },
3852: {
        atk: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 2.5 : 1; },
        type: "type",
    },
3861: {
        chain: function(p) { return 2.75; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 40 : 1;
        }
    },
"3868-1": {
        orb: function(p) { return [p.slot == p.sourceSlot, p.unit.class.has("Driven")][p.cached.multiplier] ? 2 : 1; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Own Orb', 'Class Orb'][n] + ' boost. To ' + ['Own Orb', 'Class Orb'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3868-2": {
        orb: function(p) { return [p.slot == p.sourceSlot, p.unit.class.has("Driven")][p.cached.multiplier] ? 2 : 1; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Own Orb', 'Class Orb'][n] + ' boost. To ' + ['Own Orb', 'Class Orb'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3868-DEX": {
        orb: function(p) { return [p.slot == p.sourceSlot, p.unit.class.has("Driven")][p.cached.multiplier] ? 2 : 1; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Own Orb', 'Class Orb'][n] + ' boost. To ' + ['Own Orb', 'Class Orb'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3868-QCK": {
        orb: function(p) { return [p.slot == p.sourceSlot, p.unit.class.has("Driven")][p.cached.multiplier] ? 2 : 1; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Own Orb', 'Class Orb'][n] + ' boost. To ' + ['Own Orb', 'Class Orb'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
3870: {
        increaseDamageTaken: function(p) { return 2; },
        def: function(p) { return 0; },
    },
"3877-1": {
        affinity: function(p) { return p.unit.class.has("Free Spirit") ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2.5];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3877-2": {
        affinity: function(p) { return p.unit.class.has("Free Spirit") ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2.5];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3877-STR": {
        affinity: function(p) { return p.unit.class.has("Free Spirit") ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2.5];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3877-DEX": {
        affinity: function(p) { return p.unit.class.has("Free Spirit") ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2.5];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3878-1": {
        affinity: function(p) { return p.unit.class.has("Free Spirit") ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2.5];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3878-2": {
        affinity: function(p) { return p.unit.class.has("Free Spirit") ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2.5];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3878-STR": {
        affinity: function(p) { return p.unit.class.has("Free Spirit") ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2.5];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3878-DEX": {
        affinity: function(p) { return p.unit.class.has("Free Spirit") ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2.5];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3879-1": {
        orb: function(p) { return p.unit.class.has("Slasher") ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2.5];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3879-2": {
        orb: function(p) { return p.unit.class.has("Slasher") ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2.5];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3879-QCK": {
        orb: function(p) { return p.unit.class.has("Slasher") ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2.5];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3879-STR": {
        orb: function(p) { return p.unit.class.has("Slasher") ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2.5];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3880-1": {
        orb: function(p) { return p.unit.class.has("Slasher") ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2.5];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3880-2": {
        orb: function(p) { return p.unit.class.has("Slasher") ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2.5];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3880-QCK": {
        orb: function(p) { return p.unit.class.has("Slasher") ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2.5];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3880-STR": {
        orb: function(p) { return p.unit.class.has("Slasher") ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2.5];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
3886: {
        turnedOn: [ false, false, false, false, false, false ],
        onActivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn[p.sourceSlot] = true;
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn[p.sourceSlot] = false;
        },
    },
3887: {
        increaseDamageTaken: function(p) { return 1.75; },
    },
3889: {
        chainAddition: function(p) { return 1.5; },
    },
3895: {
        luffyGear: [ 0, 0, 0, 0, 0, 0 ],
        turnedOn: [ false, false, false, false, false, false ],
        onActivation: function(p) {
            var levels = [0, 1, 2, 3];
            var n = (levels.indexOf(window.capspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].luffyGear[p.sourceSlot]) + 1) % levels.length;
            window.capspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].luffyGear[p.sourceSlot] = levels[n];
            window.capspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn[p.sourceSlot] = true;
            p.scope.notify({
                text: '' + ["Sheathed", "Enma", "Enma Unleached", "Weakened"][n] + ' boost. To ' + ["Sheathed", "Enma", "Enma Unleached", "Weakened"][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
3896: {
        luffyGear: [ 0, 0, 0, 0, 0, 0 ],
        turnedOn: [ false, false, false, false, false, false ],
        onActivation: function(p) {
            var levels = [0, 1, 2, 3];
            var n = (levels.indexOf(window.capspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].luffyGear[p.sourceSlot]) + 1) % levels.length;
            window.capspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].luffyGear[p.sourceSlot] = levels[n];
            window.capspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn[p.sourceSlot] = true;
            p.scope.notify({
                text: '' + ["Sheathed", "Enma", "Enma Unleached", "Weakened"][n] + ' boost. To ' + ["Sheathed", "Enma", "Enma Unleached", "Weakened"][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
3898: {
        chainAddition: function(p) { return 1.5; },
    },
"3902-1": {
        atk: function(p) { return [p.slot == p.sourceSlot ? 1.5 : 1, 2][p.cached.multiplier]; },
        type: "type",
        orb: function(p) { return [p.slot == p.sourceSlot ? 1.5 : 1, 2][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Own Orb', 'Universal Orb'][n] + ' boost. To ' + ['Own Orb', 'Universal Orb'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3902-2": {
        atk: function(p) { return [p.slot == p.sourceSlot ? 1.5 : 1, 2][p.cached.multiplier]; },
        type: "type",
        orb: function(p) { return [p.slot == p.sourceSlot ? 1.5 : 1, 2][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Own Orb', 'Universal Orb'][n] + ' boost. To ' + ['Own Orb', 'Universal Orb'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3902-INT": {
        atk: function(p) { return [p.slot == p.sourceSlot ? 1.5 : 1, 2][p.cached.multiplier]; },
        type: "type",
        orb: function(p) { return [p.slot == p.sourceSlot ? 1.5 : 1, 2][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Own Orb', 'Universal Orb'][n] + ' boost. To ' + ['Own Orb', 'Universal Orb'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
3903: {
        increaseDamageTaken: function(p) { return 2; },
    },
"3907-1": {
        affinity: function(p) { return p.unit.class.has("Slasher") || p.unit.type == "PSY" ? 2.5 : 1; },
    },
"3907-2": {
        affinity: function(p) { return p.unit.class.has("Slasher") || p.unit.type == "DEX" ? 2.5 : 1; },
    },
"3908-1": {
        affinity: function(p) { return p.unit.class.has("Slasher") || p.unit.type == "PSY" ? 2.5 : 1; },
    },
"3908-2": {
        affinity: function(p) { return p.unit.class.has("Slasher") || p.unit.type == "DEX" ? 2.5 : 1; },
    },
"3920-1": {
        chain: function(p) { return p.cached.multiplier; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 15 : 1;
        },
        onActivation: function(p) {
            var levels = [ 1.5, 2.5 ];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + levels[n] + 'x Chain boundary. To switch to the ' + levels[(n + 1) % levels.length] + 'x Chain boundary, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3920-2": {
        chain: function(p) { return p.cached.multiplier; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 15 : 1;
        },
        onActivation: function(p) {
            var levels = [ 1.5, 2.5 ];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + levels[n] + 'x Chain boundary. To switch to the ' + levels[(n + 1) % levels.length] + 'x Chain boundary, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3920-QCK": {
        chain: function(p) { return p.cached.multiplier; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 15 : 1;
        },
        onActivation: function(p) {
            var levels = [ 1.5, 2.5 ];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + levels[n] + 'x Chain boundary. To switch to the ' + levels[(n + 1) % levels.length] + 'x Chain boundary, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3920-STR": {
        chain: function(p) { return p.cached.multiplier; },
        chainLimiter: function(p) {
            var prev = p.hitcombo[p.hitcombo.length - 1][p.chainPosition - 1]
            return p.chainPosition === 0 ? 1 : (prev == 'Good'  || prev == 'Great' || prev == 'Perfect') ? 15 : 1;
        },
        onActivation: function(p) {
            var levels = [ 1.5, 2.5 ];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + levels[n] + 'x Chain boundary. To switch to the ' + levels[(n + 1) % levels.length] + 'x Chain boundary, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3921-1": {
        affinity: function(p) { return p.unit.class.has("Cerebral") || p.unit.type == "DEX" || p.unit.type == "INT" ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2.25];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3921-2": {
        affinity: function(p) { return p.unit.class.has("Cerebral") || p.unit.type == "DEX" || p.unit.type == "INT" ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2.25];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3921-INT": {
        affinity: function(p) { return p.unit.class.has("Cerebral") || p.unit.type == "DEX" || p.unit.type == "INT" ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2.25];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3921-DEX": {
        affinity: function(p) { return p.unit.class.has("Cerebral") || p.unit.type == "DEX" || p.unit.type == "INT" ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2.25];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3922-1": {
        affinity: function(p) { return p.unit.class.has("Cerebral") || p.unit.type == "DEX" || p.unit.type == "INT" ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2.25];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3922-2": {
        affinity: function(p) { return p.unit.class.has("Cerebral") || p.unit.type == "DEX" || p.unit.type == "INT" ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2.25];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3922-INT": {
        affinity: function(p) { return p.unit.class.has("Cerebral") || p.unit.type == "DEX" || p.unit.type == "INT" ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2.25];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3922-DEX": {
        affinity: function(p) { return p.unit.class.has("Cerebral") || p.unit.type == "DEX" || p.unit.type == "INT" ? p.cached.multiplier : 1; },
        onActivation: function(p) {
            var levels = [1.5, 2.25];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3923-1": {
        chainAddition: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [0.5, 1.2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3923-2": {
        chainAddition: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [0.5, 1.2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3923-DEX": {
        chainAddition: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [0.5, 1.2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3923-INT": {
        chainAddition: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [0.5, 1.2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3924-1": {
        chainAddition: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [0.5, 1.2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3924-2": {
        chainAddition: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [0.5, 1.2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3924-DEX": {
        chainAddition: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [0.5, 1.2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3924-INT": {
        chainAddition: function(p) { return p.cached.multiplier; },
        onActivation: function(p) {
            var levels = [0.5, 1.2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + levels[n] + 'x boost. To ' + levels[(n + 1) % levels.length] + 'x boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
3956: {
        turnedOn: false,
        onActivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = true;
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = false;
        },
    },
3957: {
        increaseDamageTaken: function(p) { return 2; },
    },
3967: {
        poison: function(p) { return 99; },
        affinity: function(p) { return p.unit.type == "DEX" || p.unit.class.has("Fighter") || p.unit.class.has("Powerhouse") ? 2.25 : 1; },
    },
"3969-1": {
        chainMultiplication: function(p) { return [1.25, 1, 1.25][p.cached.multiplier]; },
        atk: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Powerhouse") ? [1, 2.25, 2.25][p.cached.multiplier] : 1; },
        type: "type",
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Chain Multiplication', 'ATK', 'Chain Multiplication & ATK'][n] + ' boost. To ' + ['Chain Multiplication', 'ATK', 'Chain Multiplication & ATK'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3969-2": {
        chainMultiplication: function(p) { return [1.25, 1, 1.25][p.cached.multiplier]; },
        atk: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Powerhouse") ? [1, 2.25, 2.25][p.cached.multiplier] : 1; },
        type: "type",
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Chain Multiplication', 'ATK', 'Chain Multiplication & ATK'][n] + ' boost. To ' + ['Chain Multiplication', 'ATK', 'Chain Multiplication & ATK'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3969-PSY": {
        chainMultiplication: function(p) { return [1.25, 1, 1.25][p.cached.multiplier]; },
        atk: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Powerhouse") ? [1, 2.25, 2.25][p.cached.multiplier] : 1; },
        type: "type",
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Chain Multiplication', 'ATK', 'Chain Multiplication & ATK'][n] + ' boost. To ' + ['Chain Multiplication', 'ATK', 'Chain Multiplication & ATK'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3970-1": {
        chainMultiplication: function(p) { return [1.25, 1.4, 1.25, 1.4][p.cached.multiplier]; },
        chainMultiplicationPlus: function(p) { return [0, 0, 0.25, 0.25][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1, 2, 3];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][n] + ' boost. To ' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3970-2": {
        chainMultiplication: function(p) { return [1.25, 1.4, 1.25, 1.4][p.cached.multiplier]; },
        chainMultiplicationPlus: function(p) { return [0, 0, 0.25, 0.25][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1, 2, 3];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][n] + ' boost. To ' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3970-PSY": {
        chainMultiplication: function(p) { return [1.25, 1.4, 1.25, 1.4][p.cached.multiplier]; },
        chainMultiplicationPlus: function(p) { return [0, 0, 0.25, 0.25][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1, 2, 3];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][n] + ' boost. To ' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3970-INT": {
        chainMultiplication: function(p) { return [1.25, 1.4, 1.25, 1.4][p.cached.multiplier]; },
        chainMultiplicationPlus: function(p) { return [0, 0, 0.25, 0.25][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1, 2, 3];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][n] + ' boost. To ' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3971-1": {
        chainMultiplication: function(p) { return [1.25, 1.4, 1.25, 1.4][p.cached.multiplier]; },
        chainMultiplicationPlus: function(p) { return [0, 0, 0.25, 0.25][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1, 2, 3];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][n] + ' boost. To ' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3971-2": {
        chainMultiplication: function(p) { return [1.25, 1.4, 1.25, 1.4][p.cached.multiplier]; },
        chainMultiplicationPlus: function(p) { return [0, 0, 0.25, 0.25][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1, 2, 3];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][n] + ' boost. To ' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3971-PSY": {
        chainMultiplication: function(p) { return [1.25, 1.4, 1.25, 1.4][p.cached.multiplier]; },
        chainMultiplicationPlus: function(p) { return [0, 0, 0.25, 0.25][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1, 2, 3];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][n] + ' boost. To ' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"3971-INT": {
        chainMultiplication: function(p) { return [1.25, 1.4, 1.25, 1.4][p.cached.multiplier]; },
        chainMultiplicationPlus: function(p) { return [0, 0, 0.25, 0.25][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1, 2, 3];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][n] + ' boost. To ' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
3973: {
        affinity: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 2.5 : 1; },
    },
3984: {
        increaseDamageTaken: function(p) { return [1.75, 1, 1.75][p.cached.multiplier]; },
        increaseDamageTakenPlus: function(p) { return [0, 0.25, 0.25][p.cached.multiplier]; },
        ignoresImmunities: function(p) { return ['increaseDamageTaken']; },
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["Increase Damage Taken Debuff", "Increase Damage Taken Increase", "Both Effects"][n] + '. To switch to ' + ["Increase Damage Taken Debuff", "Increase Damage Taken Increase", "Both Effects"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
3986: {
        burn: function(p) { return 2; },
        atk: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 2.25 : 1; },
        type: "type",
    },
3990: {
        dmgredatk: function(p) { return 1+(p.dmgreductionCounter/100); },
    },
3991: {
        dmgredatk: function(p) { return 1+(p.dmgreductionCounter/100); },
    },
3993: {
        delay: function(p) { return 1; },
        ignoresImmunities: function(p) { return ['delay']; },
    },
"4002-1": {
        turnedOn: -1,
        atkbase: function(p) { return [300, 800][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap'][n] + ' boost. To ' + ['Swap', 'Super Swap'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = -1;
        },
    },
"4002-2": {
        turnedOn: -1,
        atkbase: function(p) { return [300, 800][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap'][n] + ' boost. To ' + ['Swap', 'Super Swap'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = -1;
        },
    },
"4002-STR": {
        turnedOn: -1,
        atkbase: function(p) { return [300, 800][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap'][n] + ' boost. To ' + ['Swap', 'Super Swap'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = -1;
        },
    },
"4002-QCK": {
        turnedOn: -1,
        atkbase: function(p) { return [300, 800][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap'][n] + ' boost. To ' + ['Swap', 'Super Swap'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = -1;
        },
    },
"4003-1": {
        turnedOn: -1,
        atkbase: function(p) { return [300, 800][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap'][n] + ' boost. To ' + ['Swap', 'Super Swap'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = -1;
        },
    },
"4003-2": {
        turnedOn: -1,
        atkbase: function(p) { return [300, 800][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap'][n] + ' boost. To ' + ['Swap', 'Super Swap'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = -1;
        },
    },
"4003-STR": {
        turnedOn: -1,
        atkbase: function(p) { return [300, 800][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap'][n] + ' boost. To ' + ['Swap', 'Super Swap'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = -1;
        },
    },
"4003-QCK": {
        turnedOn: -1,
        atkbase: function(p) { return [300, 800][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap'][n] + ' boost. To ' + ['Swap', 'Super Swap'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = -1;
        },
    },
4011: {
        tapTiming: function(p) { return p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") || p.unit.class.has("Fighter") || p.unit.class.has("Slasher") ? { Good: 0.2, Great: 0.3, Perfect: 0.3 } : { Good: 0, Great: 0, Perfect: 0 }; },
    },
4012: {
        turnedOn: false,
        onActivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = true;
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = false;
        },
    },
4020: {
        def: function(p) { return 0.1; },
    },
4024: {
        atk: function(p) { return p.unit.type == "STR" ? 2.25 : 1; },
        type: "type",
    },
4029: {
        atkbase: function(p) { return 1250; },
    },
4035: {
        dmgredatk: function(p) { return 1+(p.dmgreductionCounter/100); },
    },
4038: {
        turnedOn: false,
        onActivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = true;
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = false;
        },
    },
4039: {
        turnedOn: false,
        onActivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = true;
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = false;
        },
    },
4041: {
        atk: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")? [1.25, 1, 1.25][p.cached.multiplier] : 1; },
        type: "type",
        atkbase: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")? [0, 1250, 1250][p.cached.multiplier] : 0; },
        orb: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")? [1.25, 1, 1.25][p.cached.multiplier] : 1; },
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["ATK & Orb Boost", "Base ATK Boost", "All Effects"][n] + '. To switch to ' + ["ATK & Orb Boost", "Base ATK Boost", "All Effects"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
4050: {
        orbPlus: function(p) { return 0.25; },
    },
4054: {
        status: function(p) { return p.defenseDown ? 2 : 1; },
        def: function(p) { return 0.5; },
        ignoresImmunities: function(p) { return ['def']; },
    },
4058: {
        atkbase: function(p) { return p.slot % 2 == 1 ? 2000 : 0; },
    },
"4061-1": {
        atk: function(p) { return [1.3, 2.25, 1.3, 2.25][p.cached.multiplier]; },
        type: "type",
        orb: function(p) { return [1.3, 2.25, 1.3, 2.25][p.cached.multiplier]; },
        tapTiming: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [{ Good: 0, Great: 0, Perfect: 0.0 },{ Good: 0, Great: 0, Perfect: 0.0 },{ Good: 0, Great: 0, Perfect: 0.4 },{ Good: 0, Great: 0, Perfect: 0.4 },{ Good: 0, Great: 0, Perfect: 0.4 }][p.cached.multiplier] : { Good: 0, Great: 0, Perfect: 0 }; },
        onActivation: function(p) {
            var levels = [0, 1, 2, 3];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][n] + ' boost. To ' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"4061-2": {
        atk: function(p) { return [1.3, 2.25, 1.3, 2.25][p.cached.multiplier]; },
        type: "type",
        orb: function(p) { return [1.3, 2.25, 1.3, 2.25][p.cached.multiplier]; },
        tapTiming: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [{ Good: 0, Great: 0, Perfect: 0.0 },{ Good: 0, Great: 0, Perfect: 0.0 },{ Good: 0, Great: 0, Perfect: 0.4 },{ Good: 0, Great: 0, Perfect: 0.4 },{ Good: 0, Great: 0, Perfect: 0.4 }][p.cached.multiplier] : { Good: 0, Great: 0, Perfect: 0 }; },
        onActivation: function(p) {
            var levels = [0, 1, 2, 3];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][n] + ' boost. To ' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"4061-DEX": {
        atk: function(p) { return [1.3, 2.25, 1.3, 2.25][p.cached.multiplier]; },
        type: "type",
        orb: function(p) { return [1.3, 2.25, 1.3, 2.25][p.cached.multiplier]; },
        tapTiming: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [{ Good: 0, Great: 0, Perfect: 0.0 },{ Good: 0, Great: 0, Perfect: 0.0 },{ Good: 0, Great: 0, Perfect: 0.4 },{ Good: 0, Great: 0, Perfect: 0.4 },{ Good: 0, Great: 0, Perfect: 0.4 }][p.cached.multiplier] : { Good: 0, Great: 0, Perfect: 0 }; },
        onActivation: function(p) {
            var levels = [0, 1, 2, 3];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][n] + ' boost. To ' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"4061-QCK": {
        atk: function(p) { return [1.3, 2.25, 1.3, 2.25][p.cached.multiplier]; },
        type: "type",
        orb: function(p) { return [1.3, 2.25, 1.3, 2.25][p.cached.multiplier]; },
        tapTiming: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [{ Good: 0, Great: 0, Perfect: 0.0 },{ Good: 0, Great: 0, Perfect: 0.0 },{ Good: 0, Great: 0, Perfect: 0.4 },{ Good: 0, Great: 0, Perfect: 0.4 },{ Good: 0, Great: 0, Perfect: 0.4 }][p.cached.multiplier] : { Good: 0, Great: 0, Perfect: 0 }; },
        onActivation: function(p) {
            var levels = [0, 1, 2, 3];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][n] + ' boost. To ' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"4062-1": {
        atk: function(p) { return [1.3, 2.25, 1.3, 2.25][p.cached.multiplier]; },
        type: "type",
        orb: function(p) { return [1.3, 2.25, 1.3, 2.25][p.cached.multiplier]; },
        tapTiming: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [{ Good: 0, Great: 0, Perfect: 0.0 },{ Good: 0, Great: 0, Perfect: 0.0 },{ Good: 0, Great: 0, Perfect: 0.4 },{ Good: 0, Great: 0, Perfect: 0.4 },{ Good: 0, Great: 0, Perfect: 0.4 }][p.cached.multiplier] : { Good: 0, Great: 0, Perfect: 0 }; },
        onActivation: function(p) {
            var levels = [0, 1, 2, 3];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][n] + ' boost. To ' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"4062-2": {
        atk: function(p) { return [1.3, 2.25, 1.3, 2.25][p.cached.multiplier]; },
        type: "type",
        orb: function(p) { return [1.3, 2.25, 1.3, 2.25][p.cached.multiplier]; },
        tapTiming: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [{ Good: 0, Great: 0, Perfect: 0.0 },{ Good: 0, Great: 0, Perfect: 0.0 },{ Good: 0, Great: 0, Perfect: 0.4 },{ Good: 0, Great: 0, Perfect: 0.4 },{ Good: 0, Great: 0, Perfect: 0.4 }][p.cached.multiplier] : { Good: 0, Great: 0, Perfect: 0 }; },
        onActivation: function(p) {
            var levels = [0, 1, 2, 3];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][n] + ' boost. To ' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"4062-DEX": {
        atk: function(p) { return [1.3, 2.25, 1.3, 2.25][p.cached.multiplier]; },
        type: "type",
        orb: function(p) { return [1.3, 2.25, 1.3, 2.25][p.cached.multiplier]; },
        tapTiming: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [{ Good: 0, Great: 0, Perfect: 0.0 },{ Good: 0, Great: 0, Perfect: 0.0 },{ Good: 0, Great: 0, Perfect: 0.4 },{ Good: 0, Great: 0, Perfect: 0.4 },{ Good: 0, Great: 0, Perfect: 0.4 }][p.cached.multiplier] : { Good: 0, Great: 0, Perfect: 0 }; },
        onActivation: function(p) {
            var levels = [0, 1, 2, 3];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][n] + ' boost. To ' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"4062-QCK": {
        atk: function(p) { return [1.3, 2.25, 1.3, 2.25][p.cached.multiplier]; },
        type: "type",
        orb: function(p) { return [1.3, 2.25, 1.3, 2.25][p.cached.multiplier]; },
        tapTiming: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [{ Good: 0, Great: 0, Perfect: 0.0 },{ Good: 0, Great: 0, Perfect: 0.0 },{ Good: 0, Great: 0, Perfect: 0.4 },{ Good: 0, Great: 0, Perfect: 0.4 },{ Good: 0, Great: 0, Perfect: 0.4 }][p.cached.multiplier] : { Good: 0, Great: 0, Perfect: 0 }; },
        onActivation: function(p) {
            var levels = [0, 1, 2, 3];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][n] + ' boost. To ' + ['Swap', 'Super Swap', 'Swap & EX', 'Super Swap & EX'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
4071: {
        delay: function(p) { return 1; },
        ignoresImmunities: function(p) { return ['delay']; },
        status: function(p) { return p.delayed > 0 ? 1.75 : 1; },
    },
4082: {
        atk: function(p) { return p.unit.type == "INT" && p.unit.class.has("Cerebral") ? 2.75 : p.unit.type == "INT" || p.unit.class.has("Cerebral") ? 2.5 : 1; },
        type: "type",
    },
4084: {
        increaseDamageTaken: function(p) { return 1.75; },
        turnedOn: false,
        onActivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = true;
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = false;
        },
    },
4085: {
        turnedOn: false,
        onActivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = true;
        },
        onDeactivation: function(p) {
            window.altspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = false;
        },
    },
4100: {
        superClass: function(p) { return { "Driven": 1.5 }; },
    },
4102: {
        atkbase: function(p) { return p.unit.type == "STR" || p.unit.class.has("Driven") || p.unit.class.has("Fighter") ? 1250 : 0; },
    },
4115: {
        increaseDamageTaken: function(p) { return 2; },
    },
"4118-1": {
        atkbase: function(p) { return Math.ceil(10 + 1240*(1 - p.cached.multiplier/100)); },
        onActivation: function(p) { p.cached.multiplier = p.percHP; },
    },
"4118-2": {
        atkbase: function(p) { return Math.ceil(10 + 1240*(1 - p.cached.multiplier/100)); },
        onActivation: function(p) { p.cached.multiplier = p.percHP; },
    },
"4118-STR": {
        atkbase: function(p) { return Math.ceil(10 + 1240*(1 - p.cached.multiplier/100)); },
        onActivation: function(p) { p.cached.multiplier = p.percHP; },
    },
"4121-1": {
        increaseDamageTaken: function(p) { return p.cached.multiplier; },
        ignoresImmunities: function(p) { return p.cached.multiplier1; },
        onActivation: function(p) {
            var levels = [1.25, 1.75];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.cached.multiplier1 = [[],['increaseDamageTaken']][n];
            p.scope.notify({
                text: 'Using ' + levels[n] + 'x Increase Damage Taken. To switch to' + levels[(n + 1) % levels.length] + 'x Increase Damage Taken, disable and re-enable this special',
                name: '5329warning'
            });
        },
    },
"4121-2": {
        increaseDamageTaken: function(p) { return p.cached.multiplier; },
        ignoresImmunities: function(p) { return p.cached.multiplier1; },
        onActivation: function(p) {
            var levels = [1.25, 1.75];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.cached.multiplier1 = [[],['increaseDamageTaken']][n];
            p.scope.notify({
                text: 'Using ' + levels[n] + 'x Increase Damage Taken. To switch to' + levels[(n + 1) % levels.length] + 'x Increase Damage Taken, disable and re-enable this special',
                name: '5329warning'
            });
        },
    },
"4121-QCK": {
        increaseDamageTaken: function(p) { return p.cached.multiplier; },
        ignoresImmunities: function(p) { return p.cached.multiplier1; },
        onActivation: function(p) {
            var levels = [1.25, 1.75];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.cached.multiplier1 = [[],['increaseDamageTaken']][n];
            p.scope.notify({
                text: 'Using ' + levels[n] + 'x Increase Damage Taken. To switch to' + levels[(n + 1) % levels.length] + 'x Increase Damage Taken, disable and re-enable this special',
                name: '5329warning'
            });
        },
    },
"4121-INT": {
        increaseDamageTaken: function(p) { return p.cached.multiplier; },
        ignoresImmunities: function(p) { return p.cached.multiplier1; },
        onActivation: function(p) {
            var levels = [1.25, 1.75];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.cached.multiplier1 = [[],['increaseDamageTaken']][n];
            p.scope.notify({
                text: 'Using ' + levels[n] + 'x Increase Damage Taken. To switch to' + levels[(n + 1) % levels.length] + 'x Increase Damage Taken, disable and re-enable this special',
                name: '5329warning'
            });
        },
    },
"4122-1": {
        increaseDamageTaken: function(p) { return p.cached.multiplier; },
        ignoresImmunities: function(p) { return p.cached.multiplier1; },
        onActivation: function(p) {
            var levels = [1.25, 1.75];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.cached.multiplier1 = [[],['increaseDamageTaken']][n];
            p.scope.notify({
                text: 'Using ' + levels[n] + 'x Increase Damage Taken. To switch to' + levels[(n + 1) % levels.length] + 'x Increase Damage Taken, disable and re-enable this special',
                name: '5329warning'
            });
        },
    },
"4122-2": {
        increaseDamageTaken: function(p) { return p.cached.multiplier; },
        ignoresImmunities: function(p) { return p.cached.multiplier1; },
        onActivation: function(p) {
            var levels = [1.25, 1.75];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.cached.multiplier1 = [[],['increaseDamageTaken']][n];
            p.scope.notify({
                text: 'Using ' + levels[n] + 'x Increase Damage Taken. To switch to' + levels[(n + 1) % levels.length] + 'x Increase Damage Taken, disable and re-enable this special',
                name: '5329warning'
            });
        },
    },
"4122-QCK": {
        increaseDamageTaken: function(p) { return p.cached.multiplier; },
        ignoresImmunities: function(p) { return p.cached.multiplier1; },
        onActivation: function(p) {
            var levels = [1.25, 1.75];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.cached.multiplier1 = [[],['increaseDamageTaken']][n];
            p.scope.notify({
                text: 'Using ' + levels[n] + 'x Increase Damage Taken. To switch to' + levels[(n + 1) % levels.length] + 'x Increase Damage Taken, disable and re-enable this special',
                name: '5329warning'
            });
        },
    },
"4122-INT": {
        increaseDamageTaken: function(p) { return p.cached.multiplier; },
        ignoresImmunities: function(p) { return p.cached.multiplier1; },
        onActivation: function(p) {
            var levels = [1.25, 1.75];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.cached.multiplier1 = [[],['increaseDamageTaken']][n];
            p.scope.notify({
                text: 'Using ' + levels[n] + 'x Increase Damage Taken. To switch to' + levels[(n + 1) % levels.length] + 'x Increase Damage Taken, disable and re-enable this special',
                name: '5329warning'
            });
        },
    },
"4123-1": {
        negative: function(p) { return 1; },
        ignoresImmunities: function(p) { return [[''],['negative']][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap'][n] + ' boost. To ' + ['Swap', 'Super Swap'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"4123-2": {
        negative: function(p) { return 1; },
        ignoresImmunities: function(p) { return [[''],['negative']][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap'][n] + ' boost. To ' + ['Swap', 'Super Swap'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"4123-INT": {
        negative: function(p) { return 1; },
        ignoresImmunities: function(p) { return [[''],['negative']][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap'][n] + ' boost. To ' + ['Swap', 'Super Swap'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"4123-QCK": {
        negative: function(p) { return 1; },
        ignoresImmunities: function(p) { return [[''],['negative']][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap'][n] + ' boost. To ' + ['Swap', 'Super Swap'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"4124-1": {
        negative: function(p) { return 1; },
        ignoresImmunities: function(p) { return [[''],['negative']][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap'][n] + ' boost. To ' + ['Swap', 'Super Swap'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"4124-2": {
        negative: function(p) { return 1; },
        ignoresImmunities: function(p) { return [[''],['negative']][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap'][n] + ' boost. To ' + ['Swap', 'Super Swap'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"4124-INT": {
        negative: function(p) { return 1; },
        ignoresImmunities: function(p) { return [[''],['negative']][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap'][n] + ' boost. To ' + ['Swap', 'Super Swap'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"4124-QCK": {
        negative: function(p) { return 1; },
        ignoresImmunities: function(p) { return [[''],['negative']][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: '' + ['Swap', 'Super Swap'][n] + ' boost. To ' + ['Swap', 'Super Swap'][(n + 1) % levels.length] + ' boost, disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
4137: {
        atkPlus: function(p) { return 0.25; },
        orbPlus: function(p) { return 0.25; },
    },
"4140-1": {
        atk: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" || p.unit.class.has("Cerebral")? [1.5, 1, 2, 1, 2][p.cached.multiplier] : 1; },
        type: "type",
        atkPlus: function(p) { return [0, 0.25, 0.25, 0, 0.25][p.cached.multiplier]; },
        def: function(p) { return [0.5, 1, 1, 0.2, 0.2][p.cached.multiplier]; },
        ignoresImmunities: function(p) { return [[''],[''],[''],['def'],['def']][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1, 2, 3, 4];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["Swap", "Super Swap: ATK Buff", "Super Swap: ATK Boost and ATK Buff", "Super Swap: DEF Reduction", "Super Swap: DEF Reduction, ATK Boost and ATK Buff"][n] + '. To switch to ' + ["Swap", "Super Swap: ATK Buff", "Super Swap: ATK Boost and ATK Buff", "Super Swap: DEF Reduction", "Super Swap: DEF Reduction, ATK Boost and ATK Buff"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"4140-2": {
        atk: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" || p.unit.class.has("Cerebral")? [1.5, 1, 2, 1, 2][p.cached.multiplier] : 1; },
        type: "type",
        atkPlus: function(p) { return [0, 0.25, 0.25, 0, 0.25][p.cached.multiplier]; },
        def: function(p) { return [0.5, 1, 1, 0.2, 0.2][p.cached.multiplier]; },
        ignoresImmunities: function(p) { return [[''],[''],[''],['def'],['def']][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1, 2, 3, 4];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["Swap", "Super Swap: ATK Buff", "Super Swap: ATK Boost and ATK Buff", "Super Swap: DEF Reduction", "Super Swap: DEF Reduction, ATK Boost and ATK Buff"][n] + '. To switch to ' + ["Swap", "Super Swap: ATK Buff", "Super Swap: ATK Boost and ATK Buff", "Super Swap: DEF Reduction", "Super Swap: DEF Reduction, ATK Boost and ATK Buff"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"4140-INT": {
        atk: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" || p.unit.class.has("Cerebral")? [1.5, 1, 2, 1, 2][p.cached.multiplier] : 1; },
        type: "type",
        atkPlus: function(p) { return [0, 0.25, 0.25, 0, 0.25][p.cached.multiplier]; },
        def: function(p) { return [0.5, 1, 1, 0.2, 0.2][p.cached.multiplier]; },
        ignoresImmunities: function(p) { return [[''],[''],[''],['def'],['def']][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1, 2, 3, 4];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["Swap", "Super Swap: ATK Buff", "Super Swap: ATK Boost and ATK Buff", "Super Swap: DEF Reduction", "Super Swap: DEF Reduction, ATK Boost and ATK Buff"][n] + '. To switch to ' + ["Swap", "Super Swap: ATK Buff", "Super Swap: ATK Boost and ATK Buff", "Super Swap: DEF Reduction", "Super Swap: DEF Reduction, ATK Boost and ATK Buff"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"4140-DEX": {
        atk: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" || p.unit.class.has("Cerebral")? [1.5, 1, 2, 1, 2][p.cached.multiplier] : 1; },
        type: "type",
        atkPlus: function(p) { return [0, 0.25, 0.25, 0, 0.25][p.cached.multiplier]; },
        def: function(p) { return [0.5, 1, 1, 0.2, 0.2][p.cached.multiplier]; },
        ignoresImmunities: function(p) { return [[''],[''],[''],['def'],['def']][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1, 2, 3, 4];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["Swap", "Super Swap: ATK Buff", "Super Swap: ATK Boost and ATK Buff", "Super Swap: DEF Reduction", "Super Swap: DEF Reduction, ATK Boost and ATK Buff"][n] + '. To switch to ' + ["Swap", "Super Swap: ATK Buff", "Super Swap: ATK Boost and ATK Buff", "Super Swap: DEF Reduction", "Super Swap: DEF Reduction, ATK Boost and ATK Buff"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"4141-1": {
        orb: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" || p.unit.class.has("Cerebral")? [1.5, 1, 2][p.cached.multiplier] : 1; },
        orbPlus: function(p) { return [0, 0.25, 0.25][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["Swap", "Super Swap: Orb Buff", "Super Swap: Orb Boost and Orb Buff"][n] + '. To switch to ' + ["Swap", "Super Swap: Orb Buff", "Super Swap: Orb Boost and Orb Buff"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"4141-2": {
        orb: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" || p.unit.class.has("Cerebral")? [1.5, 1, 2][p.cached.multiplier] : 1; },
        orbPlus: function(p) { return [0, 0.25, 0.25][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["Swap", "Super Swap: Orb Buff", "Super Swap: Orb Boost and Orb Buff"][n] + '. To switch to ' + ["Swap", "Super Swap: Orb Buff", "Super Swap: Orb Boost and Orb Buff"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"4141-INT": {
        orb: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" || p.unit.class.has("Cerebral")? [1.5, 1, 2][p.cached.multiplier] : 1; },
        orbPlus: function(p) { return [0, 0.25, 0.25][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["Swap", "Super Swap: Orb Buff", "Super Swap: Orb Boost and Orb Buff"][n] + '. To switch to ' + ["Swap", "Super Swap: Orb Buff", "Super Swap: Orb Boost and Orb Buff"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"4141-DEX": {
        orb: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" || p.unit.class.has("Cerebral")? [1.5, 1, 2][p.cached.multiplier] : 1; },
        orbPlus: function(p) { return [0, 0.25, 0.25][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["Swap", "Super Swap: Orb Buff", "Super Swap: Orb Boost and Orb Buff"][n] + '. To switch to ' + ["Swap", "Super Swap: Orb Buff", "Super Swap: Orb Boost and Orb Buff"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"4142-1": {
        orb: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" || p.unit.class.has("Cerebral")? [1.5, 1, 2][p.cached.multiplier] : 1; },
        orbPlus: function(p) { return [0, 0.25, 0.25][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["Swap", "Super Swap: Orb Buff", "Super Swap: Orb Boost and Orb Buff"][n] + '. To switch to ' + ["Swap", "Super Swap: Orb Buff", "Super Swap: Orb Boost and Orb Buff"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"4142-2": {
        orb: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" || p.unit.class.has("Cerebral")? [1.5, 1, 2][p.cached.multiplier] : 1; },
        orbPlus: function(p) { return [0, 0.25, 0.25][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["Swap", "Super Swap: Orb Buff", "Super Swap: Orb Boost and Orb Buff"][n] + '. To switch to ' + ["Swap", "Super Swap: Orb Buff", "Super Swap: Orb Boost and Orb Buff"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"4142-INT": {
        orb: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" || p.unit.class.has("Cerebral")? [1.5, 1, 2][p.cached.multiplier] : 1; },
        orbPlus: function(p) { return [0, 0.25, 0.25][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["Swap", "Super Swap: Orb Buff", "Super Swap: Orb Boost and Orb Buff"][n] + '. To switch to ' + ["Swap", "Super Swap: Orb Buff", "Super Swap: Orb Boost and Orb Buff"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    },
"4142-DEX": {
        orb: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" || p.unit.class.has("Cerebral")? [1.5, 1, 2][p.cached.multiplier] : 1; },
        orbPlus: function(p) { return [0, 0.25, 0.25][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["Swap", "Super Swap: Orb Buff", "Super Swap: Orb Boost and Orb Buff"][n] + '. To switch to ' + ["Swap", "Super Swap: Orb Buff", "Super Swap: Orb Boost and Orb Buff"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: window.Utils.getBaseId(p.team[p.sourceSlot].unit.id) + 'warning'
            });
        },
    }
};