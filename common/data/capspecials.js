window.capspecials = {
1764: {
        atk: function(p) { return [1.75, 2][CrunchUtils.limitUnlock(p, "captains")]; },
        type: "type",
        orb: function(p) { return [1.75, 2][CrunchUtils.limitUnlock(p, "captains")]; },
    },
1941: {
        status: function(p) { return [[1, 1, 1, 1, 1, 1, 1],[1, 1, 1, 1, 1, 1, 1.5]][CrunchUtils.llimitUnlock(p, "captains")][CrunchUtils.limitUnlock(p, "captains")]; },
        warning: "Selected special (%name%) assumes that the enemy has been inflicted with Burn."
    },
2035: {
        orb: function(p) { return p.unit.cost <= 40 ? 2 : 1; }
    },
2109: {
        atkCeil: function(p) { return [[1, 1, 1, 1, 1, 1, 1],[1, 1, 1, 1, 1, 1, 2.25]][CrunchUtils.llimitUnlock(p, "captains")][CrunchUtils.limitUnlock(p, "captains")]; },
    },
2112: {
        delay: function(p) { return 1; },
    },
2113: {
        delay: function(p) { return 1; },
    },
2739: {
        delay: function(p) { return 1; },
    },
3154: {
        affinity: function(p) { return 1.75; },
    },
"3279-1": {
        atk: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 2 : 1; },
        type: "type",
    },
"3279-2": {
        atk: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 2 : 1; },
        type: "type",
    },
"3279-INT": {
        atk: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 2 : 1; },
        type: "type",
    },
"3280-1": {
        atk: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 2 : 1; },
        type: "type",
    },
"3280-2": {
        atk: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 2 : 1; },
        type: "type",
    },
"3280-INT": {
        atk: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 2 : 1; },
        type: "type",
    },
"3492-1": {
        delay: function(p) { return 1; },
    },
"3492-2": {
        delay: function(p) { return 1; },
    },
"3492-STR": {
        delay: function(p) { return 1; },
    },
"3492-PSY": {
        delay: function(p) { return 1; },
    },
"3493-1": {
        delay: function(p) { return 1; },
    },
"3493-2": {
        delay: function(p) { return 1; },
    },
"3493-STR": {
        delay: function(p) { return 1; },
    },
"3493-PSY": {
        delay: function(p) { return 1; },
    },
3640: {
        atkbase: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? [0, 1250, 1250][p.cached.multiplier] : 0; },
        chainAddition: function(p) { return [1.4, 0, 1.4][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["Chain Addition", "Base ATK buffs", "Both Buffs"][n] + '. To switch to ' + ["Chain Addition", "Base ATK buffs", "Both Buffs"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: (parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1).toString() + 'warning'
            });
        },
    },
3641: {
        atkbase: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? [0, 1250, 1250][p.cached.multiplier] : 0; },
        chainAddition: function(p) { return [1.4, 0, 1.4][p.cached.multiplier]; },
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["Chain Addition", "Base ATK buffs", "Both Buffs"][n] + '. To switch to ' + ["Chain Addition", "Base ATK buffs", "Both Buffs"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: (parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1).toString() + 'warning'
            });
        },
    },
3663: {
        atk: function(p) { return 1.75; },
        type: "type",
    },
"3707-1": {
        delay: function(p) { return 1; },
    },
"3707-2": {
        delay: function(p) { return 1; },
    },
"3707-PSY": {
        delay: function(p) { return 1; },
    },
"3707-QCK": {
        delay: function(p) { return 1; },
    },
"3708-1": {
        delay: function(p) { return 1; },
    },
"3708-2": {
        delay: function(p) { return 1; },
    },
"3708-PSY": {
        delay: function(p) { return 1; },
    },
"3708-QCK": {
        delay: function(p) { return 1; },
    },
3734: {
        delay: function(p) { return 1; },
    },
3735: {
        delay: function(p) { return 1; },
    },
"3868-1": {
        dmgredatk: function(p) { return Math.min(1.5, 1+(p.dmgreductionCounter/100)); },
    },
"3868-2": {
        dmgredatk: function(p) { return Math.min(1.5, 1+(p.dmgreductionCounter/100)); },
    },
"3868-DEX": {
        dmgredatk: function(p) { return Math.min(1.5, 1+(p.dmgreductionCounter/100)); },
    },
"3868-QCK": {
        dmgredatk: function(p) { return Math.min(1.5, 1+(p.dmgreductionCounter/100)); },
    },
3890: {
        staticMult: function(p) { return p.slot == p.sourceSlot ? 500 : 0; }
    },
3891: {
        staticMult: function(p) { return p.slot == p.sourceSlot ? 500 : 0; }
    },
3895: {
        increaseDamageTaken: function(p) { return 1.5; },
        ignoresImmunities: function(p) { return ['increaseDamageTaken']; },
    },
3896: {
        increaseDamageTaken: function(p) { return 1.5; },
        ignoresImmunities: function(p) { return ['increaseDamageTaken']; },
    },
"3907-2": {
        chainAddition: function(p) { return 1.2; },
    },
"3908-2": {
        chainAddition: function(p) { return 1.2; },
    },
3983: {
        burn: function(p) { return [3, 0, 3][p.cached.multiplier]; },
        increaseDamageTaken: function(p) { return [1, 2, 2][p.cached.multiplier]; },
        ignoresImmunities: function(p) { return ['increaseDamageTaken', 'burn']; },
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["Burn", "Increase Damage Taken", "Both Debuffs"][n] + '. To switch to ' + ["Burn", "Increase Damage Taken", "Both Debuffs"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: (parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1).toString() + 'warning'
            });
        },
    },
3984: {
        burn: function(p) { return [3, 0, 3][p.cached.multiplier]; },
        increaseDamageTaken: function(p) { return [1, 2, 2][p.cached.multiplier]; },
        ignoresImmunities: function(p) { return ['increaseDamageTaken', 'burn']; },
        onActivation: function(p) {
            var levels = [0, 1, 2];
            var n = (levels.indexOf(p.cached.multiplier) + 1) % levels.length;
            p.cached.multiplier = levels[n];
            p.scope.notify({
                text: 'Using the ' + ["Burn", "Increase Damage Taken", "Both Debuffs"][n] + '. To switch to ' + ["Burn", "Increase Damage Taken", "Both Debuffs"][(n + 1) % levels.length] + ', disable and re-enable this special',
                name: (parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1).toString() + 'warning'
            });
        },
    },
4019: {
        burn: function(p) { return 1; },
        def: function(p) { return 0; },
    },
4020: {
        burn: function(p) { return 1; },
        def: function(p) { return 0; },
    },
4084: {
        weaken: function(p) { return [1.5, 1.25]; },
        ignoresImmunities: function(p) { return ['weaken']; },
    },
4085: {
        affinityPlus: function(p) { return 0.25; },
    },
4099: {
        status: function(p) { return p.enemyEffects.increaseDamageTaken ? 2.25 : 1; },
    },
4100: {
        status: function(p) { return p.enemyEffects.increaseDamageTaken ? 2.25 : 1; },
    },
4133: {
        orbPlus: function(p) { return 0.25; },
    },
4133: {
        atkbasePlus: function(p) { return 250; },
    },
4134: {
        chainAdditionPlus: function(p) { return 0.3; },
    },
"4140-1": {
        atkbasePlus: function(p) { return 300; },
    },
"4140-2": {
        atkbasePlus: function(p) { return 300; },
    },
"4140-INT": {
        atkbasePlus: function(p) { return 300; },
    },
"4140-DEX": {
        atkbasePlus: function(p) { return 300; },
    },
"4141-2": {
        turnedOn: false,
        onActivation: function(p) {
            window.capspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = true;
        },
        onDeactivation: function(p) {
            window.capspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = false;
        },
    },
"4141-INT": {
        turnedOn: false,
        onActivation: function(p) {
            window.capspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = true;
        },
        onDeactivation: function(p) {
            window.capspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = false;
        },
    },
"4141-DEX": {
        turnedOn: false,
        onActivation: function(p) {
            window.capspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = true;
        },
        onDeactivation: function(p) {
            window.capspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = false;
        },
    },
"4142-2": {
        turnedOn: false,
        onActivation: function(p) {
            window.capspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = true;
        },
        onDeactivation: function(p) {
            window.capspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = false;
        },
    },
"4142-INT": {
        turnedOn: false,
        onActivation: function(p) {
            window.capspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = true;
        },
        onDeactivation: function(p) {
            window.capspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = false;
        },
    },
"4142-DEX": {
        turnedOn: false,
        onActivation: function(p) {
            window.capspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = true;
        },
        onDeactivation: function(p) {
            window.capspecials[parseInt(window.Utils.getBaseId(p.team[p.sourceSlot].unit.id), 10) + 1].turnedOn = false;
        },
    }
};