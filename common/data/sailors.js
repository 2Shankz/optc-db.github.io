window.sailors = {
311: {
        atkStatic: function(p) { return p.percHP <= 30.0 && p.unit.class.has("Cerebral") ? 50 : 0; },
    },
312: {
        atkStatic: function(p) { return p.percHP <= 30.0 && p.unit.class.has("Cerebral") ? 50 : 0; },
    },
360: {
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 100 : 0; },
    },
361: {
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 100 : 0; },
    },
364: {
        rcvStatic: function(p) { return 10; },
    },
365: {
        rcvStatic: function(p) { return 10; },
    },
450: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") ? 20 : 0; },
    },
451: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") ? 20 : 0; },
    },
525: {
        rcvStatic: function(p) { return p.unit.type == "PSY" ? 15 : 0; },
    },
526: {
        rcvStatic: function(p) { return p.unit.type == "PSY" ? 15 : 0; },
    },
527: {
        rcvStatic: function(p) { return p.percHP <= 30.0 && p.slot == p.sourceSlot ? 50 : 0; },
    },
528: {
        rcvStatic: function(p) { return p.percHP <= 30.0 && p.slot == p.sourceSlot ? 50 : 0; },
    },
553: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? 20 : 0; },
    },
554: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? 20 : 0; },
    },
555: {
        rcvStatic: function(p) { return p.unit.class.has("Shooter") ? 10 : 0; },
    },
556: {
        rcvStatic: function(p) { return p.unit.class.has("Shooter") ? 10 : 0; },
    },
559: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") ? 20 : 0; },
    },
560: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") ? 20 : 0; },
    },
640: {
        atkStatic: function(p) { return p.percHP <= 30.0 && p.unit.class.has("Fighter") ? 100 : 0; },
    },
641: {
        atkStatic: function(p) { return p.percHP <= 30.0 && p.unit.class.has("Fighter") ? 100 : 0; },
    },
644: {
        rcvStatic: function(p) { return p.unit.type == "INT" ? 20 : 0; },
        atkStatic: function(p) { return p.unit.type == "INT" ? 20 : 0; },
    },
645: {
        rcvStatic: function(p) { return p.unit.type == "INT" ? 20 : 0; },
        atkStatic: function(p) { return p.unit.type == "INT" ? 20 : 0; },
    },
646: {
        hpStatic: function(p) { return p.unit.type == "STR" ? 30 : 0; },
    },
647: {
        hpStatic: function(p) { return p.unit.type == "STR" ? 30 : 0; },
    },
1172: {
        rcvStatic: function(p) { return p.unit.type == "PSY" ? 15 : 0; },
    },
1173: {
        rcvStatic: function(p) { return p.unit.type == "PSY" ? 15 : 0; },
    },
1174: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? 20 : 0; },
    },
1175: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? 20 : 0; },
    },
1176: {
        rcvStatic: function(p) { return p.percHP <= 30.0 && p.slot == p.sourceSlot ? 50 : 0; },
    },
1177: {
        rcvStatic: function(p) { return p.percHP <= 30.0 && p.slot == p.sourceSlot ? 50 : 0; },
    },
1183: {
        atkStatic: function(p) { return p.percHP >= 99.0 && p.unit.type == "PSY" ? 75 : 0; },
    },
1184: {
        atkStatic: function(p) { return p.percHP >= 99.0 && p.unit.type == "PSY" ? 75 : 0; },
    },
1187: {
        atkStatic: function(p) { return 20; },
        rcvStatic: function(p) { return 20; },
        hpStatic: function(p) { return 20; },
    },
1188: {
        atkStatic: function(p) { return 20; },
        rcvStatic: function(p) { return 20; },
        hpStatic: function(p) { return 20; },
    },
1189: {
        atkStatic: function(p) { return p.unit.type == "QCK" ? 40 : 0; },
    },
1190: {
        atkStatic: function(p) { return p.unit.type == "QCK" ? 40 : 0; },
    },
1209: {
        rcvStatic: function(p) { return p.unit.class.has("Shooter") ? 10 : 0; },
    },
1210: {
        rcvStatic: function(p) { return p.unit.class.has("Shooter") ? 10 : 0; },
    },
1211: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") ? 20 : 0; },
    },
1212: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") ? 20 : 0; },
    },
1231: {
        atkStatic: function(p) { return p.unit.class.has("Striker") ? 50 : 0; },
    },
1232: {
        atkStatic: function(p) { return p.unit.class.has("Striker") ? 50 : 0; },
    },
1233: {
        rcvStatic: function(p) { return p.unit.class.has("Slasher") ? 30 : 0; },
    },
1234: {
        rcvStatic: function(p) { return p.unit.class.has("Slasher") ? 30 : 0; },
    },
1255: {
        atkStatic: function(p) { return p.percHP <= 30.0 && p.unit.class.has("Fighter") ? 40 : 0; },
    },
1256: {
        rcvStatic: function(p) { return p.unit.class.has("Driven") ? 10 : 0; },
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 10 : 0; },
    },
1269: {
        atkStatic: function(p) { return p.captain != null ? p.captain.class.has("Driven") ? 100 : 0 : 0; },
    },
1270: {
        atkStatic: function(p) { return p.captain != null ? p.captain.class.has("Driven") ? 100 : 0 : 0; },
    },
1273: {
        hpStatic: function(p) { return 75; },
    },
1274: {
        hpStatic: function(p) { return 75; },
    },
1277: {
        rcvAdded: function(p) { return 150; },
    },
1278: {
        rcvAdded: function(p) { return 150; },
    },
1317: {
        hpStatic: function(p) { return 75; },
    },
1318: {
        hpStatic: function(p) { return 75; },
    },
1321: {
        atkStatic: function(p) { return p.captain != null ? p.captain.class.has("Cerebral") ? p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 75 : 0 : 0 : 0; },
    },
1322: {
        atkStatic: function(p) { return p.captain != null ? p.captain.class.has("Cerebral") ? p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 75 : 0 : 0 : 0; },
    },
1363: {
        hpStatic: function(p) { return p.unit.type == "PSY" ? 100 : 0; },
    },
1364: {
        hpStatic: function(p) { return p.unit.type == "PSY" ? 100 : 0; },
    },
1367: {
        atkStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
    },
1368: {
        atkStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
    },
1377: {
        rcvAdded: function(p) { return 125; },
    },
1378: {
        rcvAdded: function(p) { return 125; },
    },
1405: {
        atkStatic: function(p) { return p.percHP <= 30.0 && p.unit.class.has("Shooter") ? 100 : 0; },
        rcvStatic: function(p) { return p.percHP <= 30.0 && p.unit.class.has("Shooter") ? 100 : 0; },
    },
1406: {
        atkStatic: function(p) { return p.percHP <= 30.0 && p.unit.class.has("Shooter") ? 100 : 0; },
        rcvStatic: function(p) { return p.percHP <= 30.0 && p.unit.class.has("Shooter") ? 100 : 0; },
    },
1435: {
        atkStatic: function(p) { return p.classCount.Powerhouse == 6 ? 150 : 0; },
    },
1436: {
        atkStatic: function(p) { return p.classCount.Powerhouse == 6 ? 150 : 0; },
    },
1443: {
        hpStatic: function(p) { return p.classCount.Powerhouse == 6 ? 150 : 0; },
        atkStatic: function(p) { return p.classCount.Powerhouse == 6 ? 50 : 0; },
    },
1444: {
        hpStatic: function(p) { return p.classCount.Powerhouse == 6 ? 150 : 0; },
        atkStatic: function(p) { return p.classCount.Powerhouse == 6 ? 50 : 0; },
    },
1464: {
        rcvAdded: function(p) { return 100; },
    },
1465: {
        rcvAdded: function(p) { return 100; },
    },
1476: {
        atkStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
    },
1477: {
        atkStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
    },
1507: {
        atkStatic: function(p) { return 15; },
    },
1508: {
        atkStatic: function(p) { return 15; },
    },
1510: {
        atkStatic: function(p) { return p.percHP >= 70.0 && p.unit.class.has("Striker") ? 20 : 0; },
    },
1511: {
        atkStatic: function(p) { return p.captain != null ? p.captain.class.has("Powerhouse") ? p.unit.class.has("Powerhouse") ? 20 : 0 : 0 : 0; },
    },
1523: {
        rcvAdded: function(p) { return 124; },
    },
1524: {
        rcvAdded: function(p) { return 124; },
    },
1529: {
        atk: function(p) { return p.captain != null ? p.captain.type == "STR" || p.captain.type == "QCK" ? .5 : 1 : 1; },
    },
1530: {
        atk: function(p) { return p.captain != null ? p.captain.type == "STR" || p.captain.type == "QCK" ? .5 : 1 : 1; },
    },
1537: {
        hpStatic: function(p) { return p.unit.type == "STR" ? 150 : 0; },
    },
1538: {
        hpStatic: function(p) { return p.unit.type == "STR" ? 150 : 0; },
    },
1539: {
        atkStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
    },
1540: {
        atkStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
    },
1574: {
        atkStatic: function(p) { return p.percHP <= 30.0 && p.slot == p.sourceSlot ? 200 : 0; },
    },
1575: {
        atkStatic: function(p) { return p.percHP <= 30.0 && p.slot == p.sourceSlot ? 200 : 0; },
    },
1613: {
        staticMult: function(p) { return 2; }
    },
1614: {
        staticMult: function(p) { return 2; }
    },
1655: {
        atkStatic: function(p) { return p.unit.type == "QCK" ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.type == "QCK" ? 75 : 0; },
    },
1656: {
        atkStatic: function(p) { return p.unit.type == "QCK" ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.type == "QCK" ? 75 : 0; },
    },
1681: {
        atkStatic: function(p) { return 56; },
        hpStatic: function(p) { return 56; },
    },
1682: {
        atkStatic: function(p) { return 56; },
        hpStatic: function(p) { return 56; },
    },
1699: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") ? 75 : 0; },
    },
1700: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") ? 75 : 0; },
    },
1705: {
        atkStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
    },
1706: {
        atkStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
    },
1728: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
    },
1729: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
    },
1744: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Shooter") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Shooter") ? 30 : 0; },
    },
1745: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Shooter") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Shooter") ? 30 : 0; },
    },
1752: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? 20 : 0; },
    },
1753: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? 20 : 0; },
    },
1754: {
        atkStatic: function(p) { return 40; },
        rcvStatic: function(p) { return 40; },
        hpStatic: function(p) { return 40; },
    },
1755: {
        atkStatic: function(p) { return 40; },
        rcvStatic: function(p) { return 40; },
        hpStatic: function(p) { return 40; },
    },
1773: {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") ? 25 : 0; },
    },
1774: {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") ? 25 : 0; },
    },
1797: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 75 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 75 : 0; },
    },
1798: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 75 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 75 : 0; },
    },
1872: {
        staticMult: function(p) { return 2; }
    },
1873: {
        staticMult: function(p) { return 2; }
    },
1890: {
        rcvStatic: function(p) { return p.unit.class.has("Shooter") ? 50 : 0; },
    },
1891: {
        rcvStatic: function(p) { return p.unit.class.has("Shooter") ? 50 : 0; },
    },
1892: {
        atk: function(p) { return p.percHP <= 50.0 && p.slot == p.sourceSlot ? 1.25 : 1; },
    },
1893: {
        atk: function(p) { return p.percHP <= 50.0 && p.slot == p.sourceSlot ? 1.25 : 1; },
    },
1907: {
        atkStatic: function(p) { return p.slot <= 1 ? 100 : 0; },
    },
1908: {
        atkStatic: function(p) { return p.slot <= 1 ? 100 : 0; },
    },
1916: {
        atkStatic: function(p) { return (p.unit.class.has("Free Spirit") ? [[0, 30, 30],[0, 75, 75]][CrunchUtils.llimitUnlock(p, "sailors1")][CrunchUtils.limitUnlock(p, "sailors")] : 0) + (p.unit.class.has("Powerhouse") ? [[0, 0, 30],[0, 0, 75]][CrunchUtils.llimitUnlock(p, "sailors2")][CrunchUtils.limitUnlock(p, "sailors")] : 0); },
        hpStatic: function(p) { return (p.unit.class.has("Free Spirit") ? [[0, 30, 30],[0, 75, 75]][CrunchUtils.llimitUnlock(p, "sailors1")][CrunchUtils.limitUnlock(p, "sailors")] : 0) + (p.unit.class.has("Powerhouse") ? [[0, 0, 30],[0, 0, 75]][CrunchUtils.llimitUnlock(p, "sailors2")][CrunchUtils.limitUnlock(p, "sailors")] : 0); },
        rcvStatic: function(p) { return (p.unit.class.has("Free Spirit") ? [[0, 30, 30],[0, 75, 75]][CrunchUtils.llimitUnlock(p, "sailors1")][CrunchUtils.limitUnlock(p, "sailors")] : 0) + (p.unit.class.has("Powerhouse") ? [[0, 0, 30],[0, 0, 75]][CrunchUtils.llimitUnlock(p, "sailors2")][CrunchUtils.limitUnlock(p, "sailors")] : 0); },
    },
1972: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") ? [[0, 30, 30],[0, 60, 60]][CrunchUtils.llimitUnlock(p, "sailors1")][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Cerebral") ? [[0, 30, 30],[0, 60, 60]][CrunchUtils.llimitUnlock(p, "sailors1")][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Cerebral") ? [[0, 30, 30],[0, 60, 60]][CrunchUtils.llimitUnlock(p, "sailors1")][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
1973: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") ? 75 : 0; },
    },
1974: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") ? 75 : 0; },
    },
1975: {
        atkStatic: function(p) { return p.percHP <= 30.0 ? 40 : 0; },
    },
1976: {
        atkStatic: function(p) { return p.percHP <= 30.0 ? 40 : 0; },
    },
1983: {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
    },
"1983-1": {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 50 : 0; },
    },
"1983-2": {
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
    },
"1983-INT": {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
    },
"1983-PSY": {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
    },
1984: {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") ? 150 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") ? 150 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Free Spirit") ? 150 : 0; },
    },
"1984-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") ? 150 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Free Spirit") ? 150 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") ? 150 : 0; },
    },
"1984-STR": {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") ? 150 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Free Spirit") ? 150 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") ? 150 : 0; },
    },
1985: {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") ? 150 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") ? 150 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Free Spirit") ? 150 : 0; },
    },
"1985-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") ? 150 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Free Spirit") ? 150 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") ? 150 : 0; },
    },
"1985-STR": {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") ? 150 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Free Spirit") ? 150 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") ? 150 : 0; },
    },
1992: {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") ? 50 : 0; },
    },
1993: {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") ? 50 : 0; },
    },
"2000-1": {
        atkStatic: function(p) { return p.unit.type == "PSY" ? 30 : 0; },
    },
"2000-2": {
        atkStatic: function(p) { return p.unit.type == "DEX" ? 30 : 0; },
    },
"2000-PSY": {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "DEX" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "DEX" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "DEX" ? 50 : 0; },
    },
"2000-DEX": {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "DEX" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "DEX" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "DEX" ? 50 : 0; },
    },
2006: {
        atkStatic: function(p) { return (p.colorCount.STR>=4 && p.unit.type == "STR") ? 125 : (p.colorCount.DEX>=4 && p.unit.type == "DEX") ? 125 : (p.colorCount.QCK>=4 && p.unit.type == "QCK") ? 125 : (p.colorCount.PSY>=4 && p.unit.type == "PSY") ? 125 : (p.colorCount.INT>=4 && p.unit.type == "INT") ? 125 : 0; },
    },
2007: {
        atkStatic: function(p) { return (p.colorCount.STR>=4 && p.unit.type == "STR") ? 125 : (p.colorCount.DEX>=4 && p.unit.type == "DEX") ? 125 : (p.colorCount.QCK>=4 && p.unit.type == "QCK") ? 125 : (p.colorCount.PSY>=4 && p.unit.type == "PSY") ? 125 : (p.colorCount.INT>=4 && p.unit.type == "INT") ? 125 : 0; },
    },
2026: {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "QCK" ? 50 : 0; },
    },
2027: {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "QCK" ? 50 : 0; },
    },
2031: {
        atkStatic: function(p) { return p.unit.type == "INT"  ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "INT"  ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "INT"  ? 50 : 0; },
    },
2038: {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "QCK" ? 40 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "QCK" ? 40 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "QCK" ? 40 : 0; },
    },
2039: {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "QCK" ? 40 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "QCK" ? 40 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "QCK" ? 40 : 0; },
    },
2040: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") ? 40 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Fighter") ? 40 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Fighter") ? 40 : 0; },
    },
2041: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") ? 40 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Fighter") ? 40 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Fighter") ? 40 : 0; },
    },
2042: {
        atkStatic: function(p) { return 20; },
        rcvStatic: function(p) { return 20; },
        hpStatic: function(p) { return 20; },
    },
2043: {
        atkStatic: function(p) { return 20; },
        rcvStatic: function(p) { return 20; },
        hpStatic: function(p) { return 20; },
    },
2067: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") ? 30 : 0; },
    },
2068: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") ? 30 : 0; },
    },
2081: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? 40 : 0; },
    },
2084: {
        atkStatic: function(p) { return 50; },
    },
2085: {
        atkStatic: function(p) { return 50; },
    },
2110: {
        atkStatic: function(p) { return p.unit.type == "DEX" ? 20 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" ? 20 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" ? 20 : 0; },
    },
2111: {
        atkStatic: function(p) { return p.unit.type == "DEX" ? 20 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" ? 20 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" ? 20 : 0; },
    },
2122: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Cerebral") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Cerebral") ? 50 : 0; },
    },
2123: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Cerebral") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Cerebral") ? 50 : 0; },
    },
2153: {
        atkStatic: function(p) { return p.percHP >= 50.0 && p.unit.class.has("Fighter") ? 120 : 0; },
    },
2154: {
        atkStatic: function(p) { return p.percHP >= 50.0 && p.unit.class.has("Fighter") ? 120 : 0; },
    },
2164: {
        staticMult: function(p) { return p.captain.class.has("Fighter") ? 1.5 : 0; }
    },
2165: {
        staticMult: function(p) { return p.captain.class.has("Fighter") ? 1.5 : 0; }
    },
"2180-1": {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
    },
"2180-2": {
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
    },
"2180-PSY": {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 100 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 100 : 0; },
    },
"2180-INT": {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 100 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 100 : 0; },
    },
"2181-1": {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
    },
"2181-2": {
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
    },
"2181-PSY": {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 100 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 100 : 0; },
    },
"2181-INT": {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 100 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 100 : 0; },
    },
2182: {
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 50 : 0; },
    },
2183: {
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 50 : 0; },
    },
2184: {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 50 : 0; },
    },
2185: {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 50 : 0; },
    },
2186: {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
    },
2187: {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
    },
2192: {
        hpStatic: function(p) { return p.unit.class.has("Shooter") ? 75 : 0; },
    },
2193: {
        hpStatic: function(p) { return p.unit.class.has("Shooter") ? 75 : 0; },
    },
2204: {
        atkStatic: function(p) { return p.captain != null ? p.captain.class.has("Driven") ? p.slot == p.sourceSlot ? 100 : 0 : 0 : 0; },
    },
2205: {
        atkStatic: function(p) { return (p.captain != null ? p.captain.class.has("Driven") ? [p.slot == p.sourceSlot, true][CrunchUtils.llimitUnlock(p, "sailors1")] ? 100 : 0 : 0 : 0) + [0, 50][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
2266: {
        staticMult: function(p) { return 2; }
    },
2267: {
        staticMult: function(p) { return 2; }
    },
2268: {
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "PSY" ? 50 : 0; },
    },
2269: {
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "PSY" ? 50 : 0; },
    },
2272: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
2273: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
2280: {
        atkStatic: function(p) { return p.unit.type == "DEX" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" ? 30 : 0; },
    },
2281: {
        atkStatic: function(p) { return p.unit.type == "DEX" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" ? 30 : 0; },
    },
2284: {
        atkStatic: function(p) { return 50; },
    },
2285: {
        atkStatic: function(p) { return 50; },
    },
2287: {
        atkStatic: function(p) { return p.unit.type == "STR" ? 50 : 0; },
    },
2288: {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Slasher") ? 50 : 0; },
    },
2289: {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Slasher") ? 50 : 0; },
    },
2290: {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Slasher") ? 50 : 0; },
    },
2299: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") ? [[0, 30, 30],[0, 75, 75]][CrunchUtils.llimitUnlock(p, "sailors1")][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Shooter") ? [[0, 30, 30],[0, 75, 75]][CrunchUtils.llimitUnlock(p, "sailors1")][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Shooter") ? [[0, 30, 30],[0, 75, 75]][CrunchUtils.llimitUnlock(p, "sailors1")][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
2305: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 75 : 0; },
    },
2306: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 75 : 0; },
    },
2322: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 75 : 0; },
    },
2323: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 75 : 0; },
    },
2333: {
        hpStatic: function(p) { return p.unit.class.has("Shooter") ? 50 : 0; },
    },
2334: {
        hpStatic: function(p) { return p.unit.class.has("Shooter") ? 50 : 0; },
    },
2345: {
        atkStatic: function(p) { return 20; },
        rcvStatic: function(p) { return 20; },
        hpStatic: function(p) { return 20; },
    },
2346: {
        atkStatic: function(p) { return 20; },
        rcvStatic: function(p) { return 20; },
        hpStatic: function(p) { return 20; },
    },
2347: {
        atkStatic: function(p) { return 20; },
        rcvStatic: function(p) { return 20; },
        hpStatic: function(p) { return 20; },
    },
2374: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
2375: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
2393: {
        atkStatic: function(p) { return p.slot <= 1 ? 80 : 0; },
    },
2394: {
        atkStatic: function(p) { return p.slot <= 1 ? 80 : 0; },
    },
2400: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
    },
2401: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
    },
2402: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
    },
2403: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
    },
2404: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
    },
2405: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
    },
2406: {
        atkStatic: function(p) { return 30; },
        rcvStatic: function(p) { return 30; },
        hpStatic: function(p) { return 30; },
    },
2407: {
        atkStatic: function(p) { return 30; },
        rcvStatic: function(p) { return 30; },
        hpStatic: function(p) { return 30; },
    },
2408: {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Free Spirit") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") ? 30 : 0; },
    },
2409: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Free Spirit") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Free Spirit") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Free Spirit") ? 50 : 0; },
    },
2410: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Free Spirit") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Free Spirit") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Free Spirit") ? 50 : 0; },
    },
2413: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 50 : 0; },
    },
2414: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 50 : 0; },
    },
"2417-1": {
        hpStatic: function(p) { return p.unit.class.has("Driven") ? 50 : 0; },
    },
"2417-2": {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 50 : 0; },
    },
"2417-DEX": {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") ? 100 : 0; },
    },
"2417-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") ? 100 : 0; },
    },
"2418-1": {
        hpStatic: function(p) { return p.unit.class.has("Driven") ? 50 : 0; },
    },
"2418-2": {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 50 : 0; },
    },
"2418-DEX": {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") ? 100 : 0; },
    },
"2418-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") ? 100 : 0; },
    },
2421: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") ? 30 : 0; },
    },
2422: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") ? 30 : 0; },
    },
2425: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 50 : 0; },
    },
2426: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 50 : 0; },
    },
"2445-2": {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
"2445-PSY": {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 75 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Powerhouse") ? 75 : 0; },
    },
"2446-2": {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
"2446-PSY": {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 75 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Powerhouse") ? 75 : 0; },
    },
2462: {
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 100 : 0; },
    },
2463: {
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 100 : 0; },
    },
"2468-1": {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 25 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 25 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 25 : 0; },
    },
"2468-2": {
        atkStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "INT" ? 25 : 0; },
        hpStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "INT" ? 25 : 0; },
        rcvStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "INT" ? 25 : 0; },
    },
"2468-PSY": {
        atkStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" || p.unit.type == "INT" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" || p.unit.type == "INT" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" || p.unit.type == "INT" ? 50 : 0; },
    },
"2468-QCK": {
        atkStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" || p.unit.type == "INT" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" || p.unit.type == "INT" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" || p.unit.type == "INT" ? 50 : 0; },
    },
"2469-1": {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 25 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 25 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 25 : 0; },
    },
"2469-2": {
        atkStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "INT" ? 25 : 0; },
        hpStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "INT" ? 25 : 0; },
        rcvStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "INT" ? 25 : 0; },
    },
"2469-PSY": {
        atkStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" || p.unit.type == "INT" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" || p.unit.type == "INT" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" || p.unit.type == "INT" ? 50 : 0; },
    },
"2469-QCK": {
        atkStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" || p.unit.type == "INT" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" || p.unit.type == "INT" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" || p.unit.type == "INT" ? 50 : 0; },
    },
2472: {
        hp: function(p) { return .7; },
        rcv: function(p) { return 1.2; },
    },
2473: {
        hp: function(p) { return .7; },
        rcv: function(p) { return 1.2; },
    },
2478: {
        atkStatic: function(p) { return p.captain != null ? p.captain.class.has("Slasher") ? p.slot == p.sourceSlot ? 150 : 0 : 0 : 0; },
    },
2479: {
        atkStatic: function(p) { return p.captain != null ? p.captain.class.has("Slasher") ? p.slot == p.sourceSlot ? 150 : 0 : 0 : 0; },
    },
2484: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? 50 : 0; },
    },
2485: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? 50 : 0; },
    },
2486: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? 50 : 0; },
    },
2487: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? 50 : 0; },
    },
2488: {
        hpStatic: function(p) { return p.unit.type == "PSY" ? 40 : 0; },
    },
2489: {
        hpStatic: function(p) { return p.unit.type == "PSY" ? 40 : 0; },
    },
2494: {
        atkStatic: function(p) { return 25; },
        hpStatic: function(p) { return 25; },
        rcvStatic: function(p) { return 25; },
    },
2503: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Shooter") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Shooter") ? 50 : 0; },
    },
2504: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Shooter") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Shooter") ? 50 : 0; },
    },
"2516-1": {
        atkStatic: function(p) { return p.unit.type == "INT" ? 25 : 0; },
        hpStatic: function(p) { return p.unit.type == "INT" ? 25 : 0; },
        rcvStatic: function(p) { return p.unit.type == "INT" ? 25 : 0; },
    },
"2516-2": {
        atkStatic: function(p) { return p.unit.type == "QCK" ? 25 : 0; },
        hpStatic: function(p) { return p.unit.type == "QCK" ? 25 : 0; },
        rcvStatic: function(p) { return p.unit.type == "QCK" ? 25 : 0; },
    },
"2516-INT": {
        atkStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "INT") ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "INT") ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "INT") ? 50 : 0; },
    },
"2516-QCK": {
        atkStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "INT") ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "INT") ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "INT") ? 50 : 0; },
    },
"2517-1": {
        atkStatic: function(p) { return p.unit.type == "INT" ? 25 : 0; },
        hpStatic: function(p) { return p.unit.type == "INT" ? 25 : 0; },
        rcvStatic: function(p) { return p.unit.type == "INT" ? 25 : 0; },
    },
"2517-2": {
        atkStatic: function(p) { return p.unit.type == "QCK" ? 25 : 0; },
        hpStatic: function(p) { return p.unit.type == "QCK" ? 25 : 0; },
        rcvStatic: function(p) { return p.unit.type == "QCK" ? 25 : 0; },
    },
"2517-INT": {
        atkStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "INT") ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "INT") ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "INT") ? 50 : 0; },
    },
"2517-QCK": {
        atkStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "INT") ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "INT") ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "INT") ? 50 : 0; },
    },
2528: {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
2529: {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
"2533-1": {
        atkStatic: function(p) { return 50; },
    },
"2533-2": {
        hpStatic: function(p) { return 50; },
    },
"2533-DEX": {
        atkStatic: function(p) { return 100; },
        hpStatic: function(p) { return 100; },
        rcvStatic: function(p) { return 100; },
    },
"2533-QCK": {
        atkStatic: function(p) { return 100; },
        hpStatic: function(p) { return 100; },
        rcvStatic: function(p) { return 100; },
    },
"2534-1": {
        atkStatic: function(p) { return 50; },
    },
"2534-2": {
        hpStatic: function(p) { return 50; },
    },
"2534-DEX": {
        atkStatic: function(p) { return 100; },
        hpStatic: function(p) { return 100; },
        rcvStatic: function(p) { return 100; },
    },
"2534-QCK": {
        atkStatic: function(p) { return 100; },
        hpStatic: function(p) { return 100; },
        rcvStatic: function(p) { return 100; },
    },
"2537-1": {
        atkStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Fighter")) ? 30 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Fighter")) ? 30 : 0; },
    },
"2537-2": {
        atkStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Slasher")) ? 30 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Slasher")) ? 30 : 0; },
    },
"2537-STR": {
        atkStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Fighter") || p.unit.class.has("Slasher")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Fighter") || p.unit.class.has("Slasher")) ? 50 : 0; },
    },
"2537-DEX": {
        atkStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Fighter") || p.unit.class.has("Slasher")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Fighter") || p.unit.class.has("Slasher")) ? 50 : 0; },
    },
"2538-1": {
        atkStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Fighter")) ? 30 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Fighter")) ? 30 : 0; },
    },
"2538-2": {
        atkStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Slasher")) ? 30 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Slasher")) ? 30 : 0; },
    },
"2538-STR": {
        atkStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Fighter") || p.unit.class.has("Slasher")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Fighter") || p.unit.class.has("Slasher")) ? 50 : 0; },
    },
"2538-DEX": {
        atkStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Fighter") || p.unit.class.has("Slasher")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Fighter") || p.unit.class.has("Slasher")) ? 50 : 0; },
    },
"2539-1": {
        rcvStatic: function(p) { return (p.unit.class.has("Free Spirit")) ? 50 : 0; },
    },
"2539-2": {
        atkStatic: function(p) { return (p.unit.class.has("Free Spirit")) ? 50 : 0; },
    },
"2539-PSY": {
        atkStatic: function(p) { return (p.unit.class.has("Free Spirit")) ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Free Spirit")) ? 75 : 0; },
    },
"2539-STR": {
        atkStatic: function(p) { return (p.unit.class.has("Free Spirit")) ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Free Spirit")) ? 75 : 0; },
    },
"2540-1": {
        rcvStatic: function(p) { return (p.unit.class.has("Free Spirit")) ? 50 : 0; },
    },
"2540-2": {
        atkStatic: function(p) { return (p.unit.class.has("Free Spirit")) ? 50 : 0; },
    },
"2540-PSY": {
        atkStatic: function(p) { return (p.unit.class.has("Free Spirit")) ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Free Spirit")) ? 75 : 0; },
    },
"2540-STR": {
        atkStatic: function(p) { return (p.unit.class.has("Free Spirit")) ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Free Spirit")) ? 75 : 0; },
    },
"2541-1": {
        hpStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "PSY") ? 50 : 0; },
    },
"2541-2": {
        rcvStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "PSY") ? 50 : 0; },
    },
"2541-QCK": {
        hpStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "PSY") ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "PSY") ? 75 : 0; },
    },
"2541-PSY": {
        hpStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "PSY") ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "PSY") ? 75 : 0; },
    },
"2542-1": {
        hpStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "PSY") ? 50 : 0; },
    },
"2542-2": {
        rcvStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "PSY") ? 50 : 0; },
    },
"2542-QCK": {
        hpStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "PSY") ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "PSY") ? 75 : 0; },
    },
"2542-PSY": {
        hpStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "PSY") ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "PSY") ? 75 : 0; },
    },
"2543-DEX": {
        atkStatic: function(p) { return (p.unit.class.has("Cerebral")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Cerebral")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Cerebral")) ? 50 : 0; },
    },
"2543-INT": {
        atkStatic: function(p) { return (p.unit.class.has("Cerebral")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Cerebral")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Cerebral")) ? 50 : 0; },
    },
"2544-DEX": {
        atkStatic: function(p) { return (p.unit.class.has("Cerebral")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Cerebral")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Cerebral")) ? 50 : 0; },
    },
"2544-INT": {
        atkStatic: function(p) { return (p.unit.class.has("Cerebral")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Cerebral")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Cerebral")) ? 50 : 0; },
    },
"2549-1": {
        atkStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Driven")) ? 30 : 0; },
    },
"2549-2": {
        hpStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Driven")) ? 30 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Driven")) ? 30 : 0; },
    },
"2549-STR": {
        atkStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Driven")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Driven")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Driven")) ? 50 : 0; },
    },
"2549-DEX": {
        atkStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Driven")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Driven")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Driven")) ? 50 : 0; },
    },
"2550-1": {
        atkStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Driven")) ? 30 : 0; },
    },
"2550-2": {
        hpStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Driven")) ? 30 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Driven")) ? 30 : 0; },
    },
"2550-STR": {
        atkStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Driven")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Driven")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Driven")) ? 50 : 0; },
    },
"2550-DEX": {
        atkStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Driven")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Driven")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Driven")) ? 50 : 0; },
    },
"2551-1": {
        atkStatic: function(p) { return p.captain != null ? p.captain.class.has("Fighter") ? 40 : 0 : 0; },
    },
"2551-2": {
        atkStatic: function(p) { return p.captain != null ? p.captain.class.has("Fighter") ? 40 : 0 : 0; },
    },
"2551-INT": {
        atkStatic: function(p) { return p.captain != null ? p.captain.class.has("Fighter") ? 40 : 0 : 0; },
    },
"2551-DEX": {
        atkStatic: function(p) { return p.captain != null ? p.captain.class.has("Fighter") ? 40 : 0 : 0; },
    },
"2552-1": {
        atkStatic: function(p) { return p.captain != null ? p.captain.class.has("Fighter") ? 40 : 0 : 0; },
    },
"2552-2": {
        atkStatic: function(p) { return p.captain != null ? p.captain.class.has("Fighter") ? 40 : 0 : 0; },
    },
"2552-INT": {
        atkStatic: function(p) { return p.captain != null ? p.captain.class.has("Fighter") ? 40 : 0 : 0; },
    },
"2552-DEX": {
        atkStatic: function(p) { return p.captain != null ? p.captain.class.has("Fighter") ? 40 : 0 : 0; },
    },
2562: {
        hpStatic: function(p) { return (p.unit.class.has("Free Spirit")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Free Spirit")) ? 50 : 0; },
    },
2563: {
        hpStatic: function(p) { return (p.unit.class.has("Free Spirit")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Free Spirit")) ? 50 : 0; },
    },
2568: {
        atkStatic: function(p) { return (p.unit.class.has("Free Spirit")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Free Spirit")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Free Spirit")) ? 50 : 0; },
    },
2569: {
        atkStatic: function(p) { return (p.unit.class.has("Free Spirit")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Free Spirit")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Free Spirit")) ? 50 : 0; },
    },
2586: {
        atkStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Powerhouse") || p.unit.class.has("Slasher")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Powerhouse") || p.unit.class.has("Slasher")) ? 50 : 0; },
    },
2587: {
        atkStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Powerhouse") || p.unit.class.has("Slasher")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Powerhouse") || p.unit.class.has("Slasher")) ? 50 : 0; },
    },
"2600-1": {
        hpStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Striker")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Striker")) ? 50 : 0; },
    },
"2600-2": {
        atkStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Striker")) ? 50 : 0; },
    },
"2600-DEX": {
        atkStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Striker")) ? 75 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Striker")) ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Striker")) ? 75 : 0; },
    },
"2600-STR": {
        atkStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Striker")) ? 75 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Striker")) ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Striker")) ? 75 : 0; },
    },
"2601-1": {
        hpStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Striker")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Striker")) ? 50 : 0; },
    },
"2601-2": {
        atkStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Striker")) ? 50 : 0; },
    },
"2601-DEX": {
        atkStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Striker")) ? 75 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Striker")) ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Striker")) ? 75 : 0; },
    },
"2601-STR": {
        atkStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Striker")) ? 75 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Striker")) ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Striker")) ? 75 : 0; },
    },
"2602-INT": {
        atkStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") || p.unit.class.has("Striker")) ? 75 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") || p.unit.class.has("Striker")) ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") || p.unit.class.has("Striker")) ? 75 : 0; },
    },
"2602-PSY": {
        atkStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") || p.unit.class.has("Striker")) ? 75 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") || p.unit.class.has("Striker")) ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") || p.unit.class.has("Striker")) ? 75 : 0; },
    },
"2603-INT": {
        atkStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") || p.unit.class.has("Striker")) ? 75 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") || p.unit.class.has("Striker")) ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") || p.unit.class.has("Striker")) ? 75 : 0; },
    },
"2603-PSY": {
        atkStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") || p.unit.class.has("Striker")) ? 75 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") || p.unit.class.has("Striker")) ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") || p.unit.class.has("Striker")) ? 75 : 0; },
    },
2606: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") ? 40 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Cerebral") ? 40 : 0; },
    },
2607: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") ? 40 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Cerebral") ? 40 : 0; },
    },
2608: {
        atkStatic: function(p) { return (p.unit.class.has("Free Spirit") || p.unit.class.has("Cerebral")) ? 50 : 0; },
    },
2609: {
        atkStatic: function(p) { return (p.unit.class.has("Free Spirit") || p.unit.class.has("Cerebral")) ? 50 : 0; },
    },
2610: {
        atkStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Cerebral")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Cerebral")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Cerebral")) ? 50 : 0; },
    },
"2618-1": {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "INT" ? 25 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "INT" ? 25 : 0; },
    },
"2618-2": {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "INT" ? 25 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "INT" ? 25 : 0; },
    },
"2618-STR": {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "INT" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "INT" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "INT" ? 50 : 0; },
    },
"2618-INT": {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "INT" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "INT" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "INT" ? 50 : 0; },
    },
2619: {
        atkStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
    },
2620: {
        atkStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
    },
2621: {
        atkStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
    },
2622: {
        atkStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
    },
2623: {
        atkStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
    },
2624: {
        atkStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
    },
2625: {
        atkStatic: function(p) { return 20; },
        hpStatic: function(p) { return 20; },
        rcvStatic: function(p) { return 20; },
    },
2626: {
        atkStatic: function(p) { return 20; },
        hpStatic: function(p) { return 20; },
        rcvStatic: function(p) { return 20; },
    },
2627: {
        atkStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
    },
2628: {
        atkStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
    },
2629: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "QCK" || p.unit.type == "INT" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "QCK" || p.unit.type == "INT" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "QCK" || p.unit.type == "INT" ? 30 : 0; },
    },
2630: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "QCK" || p.unit.type == "INT" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "QCK" || p.unit.type == "INT" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "QCK" || p.unit.type == "INT" ? 30 : 0; },
    },
2646: {
        hpStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Shooter")) ? 25 : 0; },
    },
2647: {
        atkStatic: function(p) { return (p.unit.class.has("Driven") || p.unit.class.has("Slasher")) ? 25 : 0; },
    },
2652: {
        atkStatic: function(p) { return 30; },
    },
2653: {
        atkStatic: function(p) { return 30; },
    },
2654: {
        rcvStatic: function(p) { return 30; },
    },
2655: {
        rcvStatic: function(p) { return 30; },
    },
2660: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") ? 40 : 0; },
    },
2661: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") ? 40 : 0; },
    },
2672: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "PSY" ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "PSY" ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "PSY" ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
2673: {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "DEX" ? 50 : 0; },
    },
2674: {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "DEX" ? 50 : 0; },
    },
2682: {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "DEX" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "DEX" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "DEX" ? 50 : 0; },
    },
2683: {
        hpStatic: function(p) { return p.unit.type == "PSY" ? 30 : 0; },
    },
2684: {
        hpStatic: function(p) { return p.unit.type == "PSY" ? 30 : 0; },
    },
2695: {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 75 : 0; },
    },
2696: {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 75 : 0; },
    },
2703: {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
2704: {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
2708: {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "DEX" ? 50 : 0; },
    },
2709: {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "DEX" ? 50 : 0; },
    },
2720: {
        atkStatic: function(p) { return (p.unit.class.has("Striker") || p.unit.class.has("Powerhouse")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Striker") || p.unit.class.has("Powerhouse")) ? 50 : 0; },
    },
2721: {
        atkStatic: function(p) { return (p.unit.class.has("Striker") || p.unit.class.has("Powerhouse")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Striker") || p.unit.class.has("Powerhouse")) ? 50 : 0; },
    },
2728: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") ? 75 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Cerebral") ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Cerebral") ? 75 : 0; },
    },
2728: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") ? 75 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Cerebral") ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Cerebral") ? 75 : 0; },
    },
2735: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "PSY" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "PSY" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "PSY" ? 30 : 0; },
    },
2736: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "PSY" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "PSY" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "PSY" ? 30 : 0; },
    },
2742: {
        rcvStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Cerebral")) ? 30 : 0; },
    },
2743: {
        rcvStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Cerebral")) ? 30 : 0; },
    },
2744: {
        hpStatic: function(p) { return (p.unit.class.has("Shooter") || p.unit.class.has("Cerebral")) ? 30 : 0; },
    },
2745: {
        hpStatic: function(p) { return (p.unit.class.has("Shooter") || p.unit.class.has("Cerebral")) ? 30 : 0; },
    },
2746: {
        atkStatic: function(p) { return (p.unit.class.has("Shooter") || p.unit.class.has("Fighter")) ? 30 : 0; },
    },
2747: {
        atkStatic: function(p) { return (p.unit.class.has("Shooter") || p.unit.class.has("Fighter")) ? 30 : 0; },
    },
2757: {
        atkStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Striker")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Striker")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Striker")) ? 50 : 0; },
    },
2758: {
        atkStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Striker")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Striker")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Striker")) ? 50 : 0; },
    },
2766: {
        atkStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Driven")) ? 25 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Driven")) ? 25 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Driven")) ? 25 : 0; },
    },
2767: {
        atkStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Driven")) ? 25 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Driven")) ? 25 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Driven")) ? 25 : 0; },
    },
2777: {
        atkStatic: function(p) { return 50; },
    },
2778: {
        atkStatic: function(p) { return 50; },
    },
2779: {
        atkStatic: function(p) { return 20; },
        hpStatic: function(p) { return 20; },
        rcvStatic: function(p) { return 20; },
    },
2780: {
        atkStatic: function(p) { return 20; },
        hpStatic: function(p) { return 20; },
        rcvStatic: function(p) { return 20; },
    },
2788: {
        atkStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "INT" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "INT" ? 50 : 0; },
    },
2789: {
        atkStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "INT" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "INT" ? 50 : 0; },
    },
"2795-1": {
        atkStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")) ? 75 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")) ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")) ? 75 : 0; },
    },
"2795-2": {
        atkStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")) ? 75 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")) ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")) ? 75 : 0; },
    },
"2795-PSY": {
        atkStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")) ? 75 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")) ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")) ? 75 : 0; },
    },
"2795-INT": {
        atkStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")) ? 75 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")) ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")) ? 75 : 0; },
    },
2799: {
        atkStatic: function(p) { return 20; },
        hpStatic: function(p) { return 20; },
        rcvStatic: function(p) { return 20; },
    },
"2801-1": {
        atkStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")) ? 75 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")) ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")) ? 75 : 0; },
    },
"2801-2": {
        atkStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")) ? 75 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")) ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")) ? 75 : 0; },
    },
"2801-STR": {
        atkStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")) ? 75 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")) ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")) ? 75 : 0; },
    },
"2801-DEX": {
        atkStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")) ? 75 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")) ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit")) ? 75 : 0; },
    },
"2802-1": {
        atkStatic: function(p) { return p.unit.type == "QCK" ? 50 : 0; },
    },
"2802-2": {
        atkStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
    },
"2802-STR": {
        atkStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "INT" ? 50 : 0; },
    },
"2802-DEX": {
        atkStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "INT" ? 50 : 0; },
    },
2811: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? 25 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") ? 25 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") ? 25 : 0; },
    },
2812: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? 25 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") ? 25 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") ? 25 : 0; },
    },
2813: {
        atkStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse")) ? 50 : 0; },
    },
"2818-1": {
        atkStatic: function(p) { return p.unit.type == "QCK" ? 50 : 0; },
    },
"2818-2": {
        atkStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
    },
"2818-QCK": {
        atkStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "INT" ? 50 : 0; },
    },
"2818-INT": {
        atkStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "INT" ? 50 : 0; },
    },
2828: {
        atkStatic: function(p) { return p.percHP <= 30.0 && p.slot == p.sourceSlot ? 150 : 0; },
    },
2829: {
        atkStatic: function(p) { return p.percHP <= 30.0 && p.slot == p.sourceSlot ? 150 : 0; },
    },
2838: {
        hpStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" ? 75 : 0; },
    },
2839: {
        hpStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" ? 75 : 0; },
    },
2840: {
        atkStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" ? 30 : 0; },
    },
2841: {
        atkStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" ? 30 : 0; },
    },
2853: {
        atkStatic: function(p) { return (p.unit.class.has("Free Spirit") || p.unit.class.has("Cerebral")) ? 75 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Free Spirit") || p.unit.class.has("Cerebral")) ? 75 : 0; },
    },
2854: {
        atkStatic: function(p) { return (p.unit.class.has("Free Spirit") || p.unit.class.has("Fighter")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Free Spirit") || p.unit.class.has("Fighter")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Free Spirit") || p.unit.class.has("Fighter")) ? 50 : 0; },
    },
2855: {
        atkStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
    },
2856: {
        atkStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
    },
2858: {
        atkStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" || p.unit.type == "INT" ? 30 : 0; },
    },
"2863-1": {
        atkStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Striker")) ? 25 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Striker")) ? 25 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Striker")) ? 25 : 0; },
    },
"2863-2": {
        atkStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Striker")) ? 25 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Striker")) ? 25 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Striker")) ? 25 : 0; },
    },
"2863-STR": {
        atkStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Striker")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Striker")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Striker")) ? 50 : 0; },
    },
"2863-QCK": {
        atkStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Striker")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Striker")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Striker")) ? 50 : 0; },
    },
"2864-1": {
        atkStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Striker")) ? 25 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Striker")) ? 25 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Striker")) ? 25 : 0; },
    },
"2864-2": {
        atkStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Striker")) ? 25 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Striker")) ? 25 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Striker")) ? 25 : 0; },
    },
"2864-STR": {
        atkStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Striker")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Striker")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Striker")) ? 50 : 0; },
    },
"2864-QCK": {
        atkStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Striker")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Striker")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Powerhouse") || p.unit.class.has("Striker")) ? 50 : 0; },
    },
"2867-1": {
        atkStatic: function(p) { return 25; },
        hpStatic: function(p) { return 25; },
        rcvStatic: function(p) { return 25; },
    },
"2867-2": {
        atkStatic: function(p) { return 25; },
        hpStatic: function(p) { return 25; },
        rcvStatic: function(p) { return 25; },
    },
"2867-INT": {
        atkStatic: function(p) { return 25; },
        hpStatic: function(p) { return 25; },
        rcvStatic: function(p) { return 25; },
    },
2881: {
        atkStatic: function(p) { return (p.unit.class.has("Driven")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Driven")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Driven")) ? 50 : 0; },
    },
2887: {
        atkStatic: function(p) { return (p.colorCount.STR>=1 || p.colorCount.DEX>=1 || p.colorCount.QCK>=1) ? p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 75 : 0 : 0; },
        hpStatic: function(p) { return (p.colorCount.STR>=1 || p.colorCount.DEX>=1 || p.colorCount.QCK>=1) ? p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 75 : 0 : 0; },
        rcvStatic: function(p) { return (p.colorCount.STR>=1 || p.colorCount.DEX>=1 || p.colorCount.QCK>=1) ? p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 75 : 0 : 0; },
    },
2892: {
        atkStatic: function(p) { return p.unit.type == "QCK" ? 40 : 0; },
        hpStatic: function(p) { return p.unit.type == "QCK" ? 40 : 0; },
        rcvStatic: function(p) { return p.unit.type == "QCK" ? 40 : 0; },
    },
"2894-1": {
        atkStatic: function(p) { return (p.unit.type == "STR" || p.unit.type == "PSY") ? 75 : 0; },
        hpStatic: function(p) { return (p.unit.type == "STR" || p.unit.type == "PSY") ? 75 : 0; },
    },
"2894-2": {
        atkStatic: function(p) { return (p.unit.type == "STR" || p.unit.type == "PSY") ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.type == "STR" || p.unit.type == "PSY") ? 75 : 0; },
    },
"2894-STR": {
        atkStatic: function(p) { return (p.unit.type == "STR" || p.unit.type == "PSY") ? 100 : 0; },
        hpStatic: function(p) { return (p.unit.type == "STR" || p.unit.type == "PSY") ? 100 : 0; },
        rcvStatic: function(p) { return (p.unit.type == "STR" || p.unit.type == "PSY") ? 100 : 0; },
    },
"2894-PSY": {
        atkStatic: function(p) { return (p.unit.type == "STR" || p.unit.type == "PSY") ? 100 : 0; },
        hpStatic: function(p) { return (p.unit.type == "STR" || p.unit.type == "PSY") ? 100 : 0; },
        rcvStatic: function(p) { return (p.unit.type == "STR" || p.unit.type == "PSY") ? 100 : 0; },
    },
"2895-1": {
        atkStatic: function(p) { return (p.unit.type == "STR" || p.unit.type == "PSY") ? 75 : 0; },
        hpStatic: function(p) { return (p.unit.type == "STR" || p.unit.type == "PSY") ? 75 : 0; },
    },
"2895-2": {
        atkStatic: function(p) { return (p.unit.type == "STR" || p.unit.type == "PSY") ? 75 : 0; },
        rcvStatic: function(p) { return (p.unit.type == "STR" || p.unit.type == "PSY") ? 75 : 0; },
    },
"2895-STR": {
        atkStatic: function(p) { return (p.unit.type == "STR" || p.unit.type == "PSY") ? 100 : 0; },
        hpStatic: function(p) { return (p.unit.type == "STR" || p.unit.type == "PSY") ? 100 : 0; },
        rcvStatic: function(p) { return (p.unit.type == "STR" || p.unit.type == "PSY") ? 100 : 0; },
    },
"2895-PSY": {
        atkStatic: function(p) { return (p.unit.type == "STR" || p.unit.type == "PSY") ? 100 : 0; },
        hpStatic: function(p) { return (p.unit.type == "STR" || p.unit.type == "PSY") ? 100 : 0; },
        rcvStatic: function(p) { return (p.unit.type == "STR" || p.unit.type == "PSY") ? 100 : 0; },
    },
2898: {
        atkStatic: function(p) { return (p.unit.class.has("Cerebral")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Cerebral")) ? 50 : 0; },
    },
2899: {
        atkStatic: function(p) { return (p.unit.class.has("Cerebral")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Cerebral")) ? 50 : 0; },
    },
2900: {
        atkStatic: function(p) { return p.unit.type == "STR" ? 50 : 0; },
    },
2901: {
        atkStatic: function(p) { return p.unit.type == "STR" ? 50 : 0; },
    },
2902: {
        hpStatic: function(p) { return (p.unit.class.has("Cerebral")) ? 50 : 0; },
    },
2903: {
        hpStatic: function(p) { return (p.unit.class.has("Cerebral")) ? 50 : 0; },
    },
"2919-1": {
        atkStatic: function(p) { return p.slot <= 1 ? 60 : 0; },
    },
"2919-2": {
        atkStatic: function(p) { return p.slot <= 1 ? 60 : 0; },
    },
"2919-DEX": {
        atkStatic: function(p) { return p.slot <= 1 ? 60 : 0; },
    },
"2919-QCK": {
        atkStatic: function(p) { return p.slot <= 1 ? 60 : 0; },
    },
2920: {
        atkStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Powerhouse")) ? 50 : 0; },
    },
2931: {
        atkStatic: function(p) { return 25; },
        hpStatic: function(p) { return 25; },
        rcvStatic: function(p) { return 25; },
    },
2932: {
        hpStatic: function(p) { return p.unit.type == "INT" ? 100 : 0; },
    },
2934: {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
    },
2935: {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
    },
2936: {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
    },
2937: {
        atkStatic: function(p) { return 50; },
    },
2938: {
        atkStatic: function(p) { return 50; },
    },
2943: {
        atkStatic: function(p) { return 50; },
    },
2944: {
        atkStatic: function(p) { return 50; },
    },
2945: {
        rcvStatic: function(p) { return 50; },
    },
2946: {
        rcvStatic: function(p) { return 50; },
    },
2949: {
        atkStatic: function(p) { return 50; },
    },
2950: {
        atkStatic: function(p) { return 50; },
    },
2951: {
        atkStatic: function(p) { return 50; },
    },
2952: {
        atkStatic: function(p) { return 50; },
    },
2956: {
        atkStatic: function(p) { return p.unit.type == "INT" ? 40 : 0; },
    },
2960: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "PSY" ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "PSY" ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "PSY" ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
2985: {
        atkStatic: function(p) { return p.unit.type == "DEX" ? 50 : 0; },
    },
2986: {
        atkStatic: function(p) { return p.unit.type == "DEX" ? 50 : 0; },
    },
2987: {
        atkStatic: function(p) { return p.unit.type == "DEX" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" ? 50 : 0; },
    },
2988: {
        atkStatic: function(p) { return 50; },
    },
2998: {
        atkStatic: function(p) { return p.unit.type == "INT" ? 40 : 0; },
        hpStatic: function(p) { return p.unit.type == "INT" ? 40 : 0; },
        rcvStatic: function(p) { return p.unit.type == "INT" ? 40 : 0; },
    },
3010: {
        atkStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "INT") ? 30 : 0; },
        hpStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "INT") ? 30 : 0; },
        rcvStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "INT") ? 30 : 0; },
    },
3011: {
        atkStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "INT") ? 30 : 0; },
        hpStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "INT") ? 30 : 0; },
        rcvStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "INT") ? 30 : 0; },
    },
3012: {
        hpStatic: function(p) { return p.unit.type == "QCK" ? 100 : 0; },
    },
3013: {
        hpStatic: function(p) { return p.unit.type == "QCK" ? 100 : 0; },
    },
3014: {
        atkStatic: function(p) { return p.unit.type == "QCK" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "QCK" ? 50 : 0; },
    },
3015: {
        atkStatic: function(p) { return p.unit.type == "QCK" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "QCK" ? 50 : 0; },
    },
3016: {
        hpStatic: function(p) { return 50; },
    },
3017: {
        atkStatic: function(p) { return (p.unit.type == "QCK" || p.unit.type == "INT") ? 50 : 0; },
    },
3024: {
        atkStatic: function(p) { return 30; },
        hpStatic: function(p) { return 30; },
        rcvStatic: function(p) { return 30; },
    },
3025: {
        atkStatic: function(p) { return p.unit.type == "QCK" ? 50 : 0; },
    },
3028: {
        atkStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Free Spirit")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Free Spirit")) ? 50 : 0; },
    },
3029: {
        atkStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Free Spirit")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Free Spirit")) ? 50 : 0; },
    },
3030: {
        atkStatic: function(p) { return (p.unit.class.has("Striker") || p.unit.class.has("Free Spirit")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Striker") || p.unit.class.has("Free Spirit")) ? 50 : 0; },
    },
3031: {
        atkStatic: function(p) { return (p.unit.class.has("Striker") || p.unit.class.has("Free Spirit")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Striker") || p.unit.class.has("Free Spirit")) ? 50 : 0; },
    },
3032: {
        atkStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Slasher")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Slasher")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Slasher")) ? 50 : 0; },
    },
3033: {
        atkStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Shooter")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Shooter")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Fighter") || p.unit.class.has("Shooter")) ? 50 : 0; },
    },
3034: {
        atkStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Shooter")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Shooter")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Slasher") || p.unit.class.has("Shooter")) ? 50 : 0; },
    },
3035: {
        atkStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Shooter")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Shooter")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Cerebral") || p.unit.class.has("Shooter")) ? 50 : 0; },
    },
3039: {
        atkStatic: function(p) { return p.unit.type == "PSY" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" ? 50 : 0; },
    },
3040: {
        atkStatic: function(p) { return p.unit.type == "PSY" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" ? 50 : 0; },
    },
3041: {
        rcvStatic: function(p) { return p.unit.type == "PSY" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" ? 50 : 0; },
    },
3042: {
        rcvStatic: function(p) { return p.unit.type == "PSY" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" ? 50 : 0; },
    },
3045: {
        atkStatic: function(p) { return p.unit.type == "PSY" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" ? 50 : 0; },
    },
3047: {
        atkStatic: function(p) { return p.unit.type == "PSY" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" ? 30 : 0; },
    },
3049: {
        atkStatic: function(p) { return (p.unit.class.has("Driven") || p.unit.class.has("Cerebral") || p.unit.class.has("Powerhouse")) ? 30 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Driven") || p.unit.class.has("Cerebral") || p.unit.class.has("Powerhouse")) ? 30 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Driven") || p.unit.class.has("Cerebral") || p.unit.class.has("Powerhouse")) ? 30 : 0; },
    },
3050: {
        atkStatic: function(p) { return p.unit.type == "PSY" ? 50 : 0; },
    },
3051: {
        atkStatic: function(p) { return (p.unit.class.has("Striker") || p.unit.class.has("Free Spirit")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Striker") || p.unit.class.has("Free Spirit")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Striker") || p.unit.class.has("Free Spirit")) ? 50 : 0; },
    },
3052: {
        atkStatic: function(p) { return (p.unit.class.has("Driven") || p.unit.class.has("Free Spirit")) ? 50 : 0; },
    },
3056: {
        atkStatic: function(p) { return (p.unit.class.has("Driven") || p.unit.class.has("Free Spirit")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Driven") || p.unit.class.has("Free Spirit")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Driven") || p.unit.class.has("Free Spirit")) ? 50 : 0; },
    },
3057: {
        atkStatic: function(p) { return (p.unit.class.has("Driven") || p.unit.class.has("Free Spirit")) ? 50 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Driven") || p.unit.class.has("Free Spirit")) ? 50 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Driven") || p.unit.class.has("Free Spirit")) ? 50 : 0; },
    },
3062: {
        atkStatic: function(p) { return (p.unit.class.has("Shooter") || p.unit.class.has("Free Spirit")) ? 30 : 0; },
        rcvStatic: function(p) { return (p.unit.class.has("Shooter") || p.unit.class.has("Free Spirit")) ? 30 : 0; },
        hpStatic: function(p) { return (p.unit.class.has("Shooter") || p.unit.class.has("Free Spirit")) ? 30 : 0; },
    },
3063: {
        atkStatic: function(p) { return (p.unit.class.has("Slasher")) ? 50 : 0; },
    },
"3064-1": {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
    },
"3064-2": {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
    },
"3064-STR": {
        atkStatic: function(p) { return 100; },
        hpStatic: function(p) { return 100; },
        rcvStatic: function(p) { return 100; },
    },
"3064-PSY": {
        atkStatic: function(p) { return 100; },
        hpStatic: function(p) { return 100; },
        rcvStatic: function(p) { return 100; },
    },
"3065-1": {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
    },
"3065-2": {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
    },
"3065-STR": {
        atkStatic: function(p) { return 100; },
        hpStatic: function(p) { return 100; },
        rcvStatic: function(p) { return 100; },
    },
"3065-PSY": {
        atkStatic: function(p) { return 100; },
        hpStatic: function(p) { return 100; },
        rcvStatic: function(p) { return 100; },
    },
3068: {
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "PSY" ? 50 : 0; },
    },
3069: {
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "PSY" ? 50 : 0; },
    },
3078: {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Free Spirit") ? 30 : 0; },
    },
3080: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "PSY" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "PSY" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "PSY" ? 30 : 0; },
    },
3081: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "PSY" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "PSY" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "PSY" ? 30 : 0; },
    },
3082: {
        atkStatic: function(p) { return p.unit.type == "STR" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" ? 30 : 0; },
    },
3083: {
        atkStatic: function(p) { return p.unit.type == "STR" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" ? 50 : 0; },
    },
3085: {
        atkStatic: function(p) { return p.unit.type == "STR" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" ? 50 : 0; },
    },
3086: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "PSY" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "PSY" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "PSY" ? 30 : 0; },
    },
3095: {
        atkStatic: function(p) { return p.unit.type == "DEX" ? 50 : 0; },
    },
3096: {
        atkStatic: function(p) { return p.unit.type == "QCK" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "QCK" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "QCK" ? 30 : 0; },
    },
3097: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 75 : 0; },
    },
3102: {
        rcvStatic: function(p) { return p.percHP <= 10.0 && p.unit.type == "INT" ? [0, 150, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3103: {
        rcvStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
    },
3104: {
        rcvStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
    },
3107: {
        atkStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
    },
3108: {
        atkStatic: function(p) { return p.unit.type == "INT" ? 40 : 0; },
    },
3110: {
        atkStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
    },
3111: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") ? 50 : 0; },
    },
3120: {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 50 : 0; },
    },
3126: {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
    },
3127: {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
    },
3127: {
        atkStatic: function(p) { return 75; },
    },
3128: {
        atkStatic: function(p) { return 75; },
    },
3130: {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Free Spirit") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") ? 30 : 0; },
    },
3140: {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
3141: {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
3142: {
        atkStatic: function(p) { return p.unit.type == "STR" ? 50 : 0; },
    },
3143: {
        atkStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
    },
3144: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "INT" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "INT" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "INT" ? 30 : 0; },
    },
3145: {
        atkStatic: function(p) { return p.unit.type == "DEX" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" ? 50 : 0; },
    },
3146: {
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "INT" ? 50 : 0; },
    },
3149: {
        hpStatic: function(p) { return p.unit.class.has("Fighter") ? 75 : 0; },
    },
3151: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? 75 : 0; },
    },
3152: {
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse") ? 75 : 0; },
    },
3153: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Cerebral") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Cerebral") ? 50 : 0; },
    },
"3163-1": {
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 50 : 0; },
    },
"3163-2": {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 50 : 0; },
    },
"3163-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
    },
"3163-DEX": {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
    },
"3164-1": {
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 50 : 0; },
    },
"3164-2": {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 50 : 0; },
    },
"3164-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
    },
"3164-DEX": {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
    },
"3165-1": {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 50 : 0; },
    },
"3165-2": {
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 50 : 0; },
    },
"3165-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
    },
"3165-PSY": {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
    },
"3166-1": {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 50 : 0; },
    },
"3166-2": {
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 50 : 0; },
    },
"3166-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
    },
"3166-PSY": {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
    },
3167: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Cerebral") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Cerebral") ? 50 : 0; },
    },
3168: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Cerebral") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Cerebral") ? 50 : 0; },
    },
3169: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Cerebral") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Cerebral") ? 50 : 0; },
    },
3170: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Cerebral") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Cerebral") ? 50 : 0; },
    },
3171: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 50 : 0; },
    },
3172: {
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 50 : 0; },
    },
3173: {
        atkStatic: function(p) { return 30; },
        hpStatic: function(p) { return 30; },
        rcvStatic: function(p) { return 30; },
    },
3178: {
        atkStatic: function(p) { return p.percHP <= 50.0 && p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 50 : 0; },
    },
3179: {
        atkStatic: function(p) { return p.percHP <= 50.0 && p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 50 : 0; },
    },
3184: {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
    },
3185: {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
    },
3190: {
        rcvStatic: function(p) { return 30; },
    },
3191: {
        atkStatic: function(p) { return 30; },
    },
3192: {
        hpStatic: function(p) { return 30; },
    },
3198: {
        atkStatic: function(p) { return 50; },
    },
3199: {
        atkStatic: function(p) { return 30; },
        hpStatic: function(p) { return 30; },
        rcvStatic: function(p) { return 30; },
    },
"3203-1": {
        atkStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 50 : 0; },
    },
"3203-2": {
        atkStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 50 : 0; },
    },
"3203-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 100 : 0; },
    },
"3203-DEX": {
        atkStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 100 : 0; },
    },
"3204-1": {
        atkStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 50 : 0; },
    },
"3204-2": {
        atkStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 50 : 0; },
    },
"3204-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 100 : 0; },
    },
"3204-DEX": {
        atkStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 100 : 0; },
    },
3205: {
        hpStatic: function(p) { return p.unit.class.has("Cerebral") ? 75 : 0; },
    },
3206: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 50 : 0; },
    },
3207: {
        atkStatic: function(p) { return p.unit.type == "DEX" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" ? 50 : 0; },
    },
3212: {
        hpStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Free Spirit") ? 75 : 0; },
    },
3213: {
        atkStatic: function(p) { return 40; },
        hpStatic: function(p) { return 40; },
        rcvStatic: function(p) { return 40; },
    },
3214: {
        atkStatic: function(p) { return 50; },
    },
3216: {
        hpStatic: function(p) { return 50; },
    },
3218: {
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 50 : 0; },
    },
3219: {
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 50 : 0; },
    },
3220: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Fighter") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Fighter") ? 50 : 0; },
    },
3221: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Fighter") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Fighter") ? 50 : 0; },
    },
3222: {
        atkStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
    },
3223: {
        atkStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
    },
3228: {
        atkStatic: function(p) { return p.unit.type == "QCK" ? 50 : 0; },
    },
3229: {
        atkStatic: function(p) { return p.unit.type == "QCK" ? 50 : 0; },
    },
3233: {
        atkStatic: function(p) { return 30; },
        hpStatic: function(p) { return 30; },
        rcvStatic: function(p) { return 30; },
    },
3235: {
        atkStatic: function(p) { return p.unit.type == "QCK" ? 50 : 0; },
    },
3236: {
        atkStatic: function(p) { return 30; },
        hpStatic: function(p) { return 30; },
        rcvStatic: function(p) { return 30; },
    },
3238: {
        rcvStatic: function(p) { return 30; },
    },
3243: {
        atkStatic: function(p) { return p.unit.type == "PSY" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" ? 30 : 0; },
    },
3246: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
    },
3248: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
    },
3249: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 30 : 0; },
    },
3258: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Free Spirit") ? 50 : 0; },
    },
3259: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Free Spirit") ? 50 : 0; },
    },
3264: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") ? 50 : 0; },
    },
3272: {
        atkStatic: function(p) { return 30; },
    },
3274: {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? 50 : 0; },
    },
"3279-1": {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 75 : 0; },
    },
"3279-2": {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 75 : 0; },
    },
"3279-INT": {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 125 : 0; },
    },
"3280-1": {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 75 : 0; },
    },
"3280-2": {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 75 : 0; },
    },
"3280-INT": {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 125 : 0; },
    },
3283: {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
3284: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 50 : 0; },
    },
3285: {
        atkStatic: function(p) { return 30; },
        hpStatic: function(p) { return 30; },
        rcvStatic: function(p) { return 30; },
    },
3286: {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Fighter") ? 50 : 0; },
    },
3287: {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Shooter") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Shooter") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Shooter") ? 30 : 0; },
    },
3292: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") ? 30 : 0; },
    },
3294: {
        atkStatic: function(p) { return 30; },
    },
3295: {
        rcvStatic: function(p) { return 30; },
    },
3296: {
        hpStatic: function(p) { return 30; },
    },
"3299-1": {
        atkStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 50 : 0; },
    },
"3299-2": {
        atkStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 50 : 0; },
    },
"3299-DEX": {
        atkStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 100 : 0; },
    },
"3299-PSY": {
        atkStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 100 : 0; },
    },
"3300-1": {
        atkStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 50 : 0; },
    },
"3300-2": {
        atkStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 50 : 0; },
    },
"3300-DEX": {
        atkStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 100 : 0; },
    },
"3300-PSY": {
        atkStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 100 : 0; },
    },
3301: {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Driven") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Driven") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Driven") ? 30 : 0; },
    },
3301: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Driven") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Driven") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Driven") ? 30 : 0; },
    },
3308: {
        atkStatic: function(p) { return 30; },
        rcvStatic: function(p) { return 30; },
    },
3309: {
        atkStatic: function(p) { return 30; },
        hpStatic: function(p) { return 30; },
    },
3310: {
        atkStatic: function(p) { return 30; },
        hpStatic: function(p) { return 30; },
    },
3328: {
        atkStatic: function(p) { return p.unit.class.has("Striker") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Striker") ? 30 : 0; },
    },
"3330-1": {
        rcvStatic: function(p) { return 40; },
    },
"3330-2": {
        rcvStatic: function(p) { return 40; },
    },
"3330-QCK": {
        rcvStatic: function(p) { return 40; },
    },
"3330-INT": {
        rcvStatic: function(p) { return 40; },
    },
3332: {
        atkStatic: function(p) { return 30; },
        hpStatic: function(p) { return 30; },
        rcvStatic: function(p) { return 30; },
    },
3336: {
        atkStatic: function(p) { return [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3340: {
        atkStatic: function(p) { return p.unit.type == "STR" ? 50 : 0; },
    },
3341: {
        rcvStatic: function(p) { return p.unit.type == "DEX" ? 50 : 0; },
    },
3342: {
        atkStatic: function(p) { return p.unit.type == "QCK" ? 50 : 0; },
    },
3344: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 50 : 0; },
    },
3345: {
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 50 : 0; },
    },
"3346-1": {
        atkStatic: function(p) { return 50; },
    },
"3346-2": {
        atkStatic: function(p) { return 50; },
    },
"3346-STR": {
        atkStatic: function(p) { return 100; },
    },
"3346-DEX": {
        atkStatic: function(p) { return 100; },
    },
3347: {
        atkStatic: function(p) { return 30; },
        hpStatic: function(p) { return 30; },
        rcvStatic: function(p) { return 30; },
    },
"3348-1": {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
    },
"3348-2": {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
    },
"3348-QCK": {
        atkStatic: function(p) { return 100; },
        hpStatic: function(p) { return 100; },
        rcvStatic: function(p) { return 100; },
    },
"3348-DEX": {
        atkStatic: function(p) { return 100; },
        hpStatic: function(p) { return 100; },
        rcvStatic: function(p) { return 100; },
    },
"3349-1": {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
    },
"3349-2": {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
    },
"3349-QCK": {
        atkStatic: function(p) { return 100; },
        hpStatic: function(p) { return 100; },
        rcvStatic: function(p) { return 100; },
    },
"3349-DEX": {
        atkStatic: function(p) { return 100; },
        hpStatic: function(p) { return 100; },
        rcvStatic: function(p) { return 100; },
    },
3351: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Free Spirit") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Free Spirit") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Free Spirit") ? 30 : 0; },
    },
3353: {
        atkStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
    },
"3355-1": {
        atkStatic: function(p) { return [0, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
"3355-2": {
        atkStatic: function(p) { return [0, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3356: {
        atkStatic: function(p) { return p.unit.type == "INT" ? 75 : 0; },
        hpStatic: function(p) { return p.unit.type == "INT" ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.type == "INT" ? 75 : 0; },
    },
3357: {
        atkStatic: function(p) { return p.unit.type == "INT" ? 75 : 0; },
        hpStatic: function(p) { return p.unit.type == "INT" ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.type == "INT" ? 75 : 0; },
    },
3358: {
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 50 : 0; },
    },
3359: {
        atkStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
    },
3360: {
        atkStatic: function(p) { return p.unit.type == "PSY" ? 50 : 0; },
    },
3362: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") ? 30 : 0; },
    },
3374: {
        atkStatic: function(p) { return 30; },
    },
3380: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 50 : 0; },
    },
3381: {
        hpStatic: function(p) { return p.unit.class.has("Driven") ? 50 : 0; },
    },
3382: {
        atkStatic: function(p) { return p.unit.type == "DEX" ? 50 : 0; },
    },
3383: {
        atkStatic: function(p) { return p.unit.type == "QCK" ? 50 : 0; },
    },
3385: {
        atkStatic: function(p) { return 30; },
        hpStatic: function(p) { return 30; },
        rcvStatic: function(p) { return 30; },
    },
3386: {
        atkStatic: function(p) { return p.unit.type == "QCK" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "QCK" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "QCK" ? 30 : 0; },
    },
3387: {
        atkStatic: function(p) { return p.unit.type == "DEX" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" ? 30 : 0; },
    },
3388: {
        hpStatic: function(p) { return 50; },
    },
3389: {
        atkStatic: function(p) { return p.unit.type == "DEX" ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3391: {
        atkStatic: function(p) { return [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3392: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? 75 : 0; },
    },
3394: {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
3395: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") ? 30 : 0; },
    },
3396: {
        atkStatic: function(p) { return 50; },
    },
3397: {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
3400: {
        rcvStatic: function(p) { return 60; },
    },
3401: {
        atkStatic: function(p) { return 40; },
        hpStatic: function(p) { return 40; },
        rcvStatic: function(p) { return 40; },
    },
3403: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") || p.unit.class.has("Powerhouse") ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Cerebral") || p.unit.class.has("Powerhouse") ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Cerebral") || p.unit.class.has("Powerhouse") ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3405: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3406: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") ? 50 : 0; },
    },
3407: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") || p.unit.class.has("Fighter") ? 50 : 0; },
    },
3409: {
        atkStatic: function(p) { return p.unit.type == "DEX" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" ? 30 : 0; },
    },
3412: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 50 : 0; },
    },
3413: {
        rcvStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Cerebral") ? 50 : 0; },
    },
3414: {
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 50 : 0; },
    },
3415: {
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
3418: {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Fighter") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Fighter") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Fighter") ? 50 : 0; },
    },
3419: {
        rcvStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Cerebral") ? 50 : 0; },
    },
3420: {
        hpStatic: function(p) { return p.unit.class.has("Driven") ? 50 : 0; },
    },
3422: {
        atkStatic: function(p) { return [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
        staticMult: function(p) { return [0, 0, 10][CrunchUtils.limitUnlock(p, "sailors")]; }
    },
3423: {
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse") ? 75 : 0; },
    },
3424: {
        atkStatic: function(p) { return p.unit.type == "DEX" ? 50 : 0; },
    },
3425: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Powerhouse") ? 75 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Powerhouse") ? 75 : 0; },
    },
3428: {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Powerhouse") ? 30 : 0; },
    },
3429: {
        atkStatic: function(p) { return [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3430: {
        atkStatic: function(p) { return [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3431: {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
"3433-1": {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") || p.unit.class.has("Driven") ? [0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"3433-2": {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") || p.unit.class.has("Driven") ? [0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"3433-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") || p.unit.class.has("Driven") ? [0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"3433-DEX": {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") || p.unit.class.has("Driven") ? [0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3435: {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
3436: {
        atkStatic: function(p) { return 50; },
    },
3438: {
        atkStatic: function(p) { return 50; },
    },
3439: {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
    },
3440: {
        hpStatic: function(p) { return 100; },
    },
3443: {
        atkStatic: function(p) { return [0, 0, 56][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 0, 56][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 0, 56][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3444: {
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Powerhouse") ? 60 : 0; },
    },
3445: {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
    },
3447: {
        atkStatic: function(p) { return 75; },
    },
3448: {
        atkStatic: function(p) { return [0, 60, 60][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 60, 60][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 60, 60][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3452: {
        atkStatic: function(p) { return [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3454: {
        hp: function(p) { return p.captain != null ? p.captain.class.has("Free Spirit") ? p.unit.class.has("Free Spirit") ? 1.1 : 1 : 1 : 1; },
    },
3455: {
        rcvStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Striker") ? 50 : 0; },
    },
3456: {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Striker") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Striker") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Striker") ? 50 : 0; },
    },
3457: {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Striker") ? 43 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Striker") ? 43 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Striker") ? 43 : 0; },
    },
3458: {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Powerhouse") ? 30 : 0; },
    },
3459: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") ? 30 : 0; },
    },
3460: {
        atkStatic: function(p) { return 40; },
        hpStatic: function(p) { return 40; },
        rcvStatic: function(p) { return 40; },
    },
3462: {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Fighter") ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Fighter") ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3463: {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Cerebral") ? 60 : 0; },
    },
3464: {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Striker") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Striker") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Striker") ? 50 : 0; },
    },
3466: {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Slasher") ? 50 : 0; },
    },
3467: {
        hpStatic: function(p) { return p.unit.class.has("Cerebral") || p.unit.class.has("Fighter") ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Cerebral") || p.unit.class.has("Fighter") ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3472: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? [0, 125, 125][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3474: {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? [0, 125, 125][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hp: function(p) { return p.captain != null ? p.captain.class.has("Powerhouse") ? p.unit.class.has("Powerhouse") ? [1, 1, 1.1][CrunchUtils.limitUnlock(p, "sailors")] : 1 : 1 : 1; },
    },
3475: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3476: {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? [50, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? [50, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3477: {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 40 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 40 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 40 : 0; },
    },
3479: {
        atkStatic: function(p) { return p.unit.type == "STR" ? 50 : 0; },
    },
3480: {
        atkStatic: function(p) { return p.unit.type == "STR" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" ? 50 : 0; },
    },
3484: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") || p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
3485: {
        staticMult: function(p) { return 4; }
    },
3486: {
        atkStatic: function(p) { return p.percHP <= 30.0 && p.slot == p.sourceSlot ? 200 : 0; },
    },
3488: {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3489: {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
3490: {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
3491: {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"3492-1": {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
    },
"3492-2": {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
    },
"3492-STR": {
        atkStatic: function(p) { return 75; },
        hpStatic: function(p) { return 75; },
    },
"3492-PSY": {
        atkStatic: function(p) { return 75; },
        hpStatic: function(p) { return 75; },
    },
"3493-1": {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
    },
"3493-2": {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
    },
"3493-STR": {
        atkStatic: function(p) { return 75; },
        hpStatic: function(p) { return 75; },
    },
"3493-PSY": {
        atkStatic: function(p) { return 75; },
        hpStatic: function(p) { return 75; },
    },
"3494-1": {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
    },
"3494-2": {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
    },
"3494-DEX": {
        atkStatic: function(p) { return 75; },
        hpStatic: function(p) { return 75; },
    },
"3494-INT": {
        atkStatic: function(p) { return 75; },
        hpStatic: function(p) { return 75; },
    },
"3495-1": {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
    },
"3495-2": {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
    },
"3495-DEX": {
        atkStatic: function(p) { return 75; },
        hpStatic: function(p) { return 75; },
    },
"3495-INT": {
        atkStatic: function(p) { return 75; },
        hpStatic: function(p) { return 75; },
    },
3496: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Cerebral") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Cerebral") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Cerebral") ? 50 : 0; },
    },
3497: {
        atkStatic: function(p) { return 40; },
        rcvStatic: function(p) { return 40; },
        hpStatic: function(p) { return 40; },
    },
3499: {
        atkStatic: function(p) { return 40; },
        hpStatic: function(p) { return 40; },
        rcvStatic: function(p) { return 40; },
    },
3501: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") ? 30 : 0; },
    },
3502: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Cerebral") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Cerebral") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Cerebral") ? 30 : 0; },
    },
3503: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Cerebral") ? 30 : 0; },
    },
3504: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Cerebral") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Cerebral") ? 30 : 0; },
    },
"3507-1": {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
"3507-2": {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
"3507-STR": {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Powerhouse") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 100 : 0; },
    },
"3507-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Powerhouse") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 100 : 0; },
    },
"3508-1": {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
"3508-2": {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
"3508-STR": {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Powerhouse") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 100 : 0; },
    },
"3508-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Powerhouse") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 100 : 0; },
    },
3509: {
        atkStatic: function(p) { return p.slot <= 1 ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3511: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
"3512-1": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
    },
"3512-2": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
    },
"3512-INT": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
    },
"3512-PSY": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
    },
"3513-1": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
    },
"3513-2": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
    },
"3513-INT": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
    },
"3513-PSY": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
    },
"3514-1": {
        atkStatic: function(p) { return 100; },
        hpStatic: function(p) { return 100; },
    },
"3514-2": {
        atkStatic: function(p) { return 100; },
        hpStatic: function(p) { return 100; },
    },
"3514-STR": {
        atkStatic: function(p) { return 100; },
        hpStatic: function(p) { return 100; },
        rcvStatic: function(p) { return 100; },
    },
"3514-DEX": {
        atkStatic: function(p) { return 100; },
        hpStatic: function(p) { return 100; },
        rcvStatic: function(p) { return 100; },
    },
"3515-1": {
        atkStatic: function(p) { return 100; },
        hpStatic: function(p) { return 100; },
    },
"3515-2": {
        atkStatic: function(p) { return 100; },
        hpStatic: function(p) { return 100; },
    },
"3515-STR": {
        atkStatic: function(p) { return 100; },
        hpStatic: function(p) { return 100; },
        rcvStatic: function(p) { return 100; },
    },
"3515-DEX": {
        atkStatic: function(p) { return 100; },
        hpStatic: function(p) { return 100; },
        rcvStatic: function(p) { return 100; },
    },
3516: {
        atkStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
    },
3517: {
        atkStatic: function(p) { return [0, 60][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 60][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 60][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3520: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Striker") ? 60 : 0; },
    },
3521: {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Powerhouse") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 30 : 0; },
    },
3523: {
        atkStatic: function(p) { return [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3524: {
        atkStatic: function(p) { return 60; },
    },
3526: {
        hpStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Driven") ? 50 : 0; },
    },
3527: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? [0, 0, 40][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? [0, 0, 40][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? [0, 0, 40][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3531: {
        staticMult: function(p) { return [0, 3][CrunchUtils.limitUnlock(p, "sailors")]; }
    },
3532: {
        staticMult: function(p) { return [0, 3][CrunchUtils.limitUnlock(p, "sailors")]; }
    },
3534: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Fighter") ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Fighter") ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Fighter") ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3536: {
        atkStatic: function(p) { return p.unit.type == "DEX" ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3537: {
        atkStatic: function(p) { return p.unit.type == "DEX" ? [0, 40][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" ? [0, 40][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" ? [0, 40][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3538: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Fighter") ? [0, 40][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Fighter") ? [0, 40][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Fighter") ? [0, 40][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3540: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 40 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 40 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? 40 : 0; },
    },
3541: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse") ? 30 : 0; },
    },
"3542-1": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 100 : 0; },
    },
"3542-2": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 100 : 0; },
    },
"3542-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 100 : 0; },
    },
"3542-DEX": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 100 : 0; },
    },
"3543-1": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 100 : 0; },
    },
"3543-2": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 100 : 0; },
    },
"3543-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 100 : 0; },
    },
"3543-DEX": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? 100 : 0; },
    },
3546: {
        staticMult: function(p) { return 5; }
    },
3548: {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3549: {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Cerebral") ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Cerebral") ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3553: {
        atkStatic: function(p) { return [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
"3554-1": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 100 : 0; },
    },
"3554-2": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 100 : 0; },
    },
"3554-PSY": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 100 : 0; },
    },
"3554-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 100 : 0; },
    },
"3555-1": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 100 : 0; },
    },
"3555-2": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 100 : 0; },
    },
"3555-PSY": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 100 : 0; },
    },
"3555-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 100 : 0; },
    },
3557: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3558: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Free Spirit") ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Free Spirit") ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Free Spirit") ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3560: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? [0, 70][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3561: {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") || p.unit.class.has("Free Spirit") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Powerhouse") || p.unit.class.has("Free Spirit") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") || p.unit.class.has("Free Spirit") ? 30 : 0; },
    },
3563: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Slasher") ? [0, 0, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Slasher") ? [0, 0, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Slasher") ? [0, 0, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3564: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? [0, 70][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3565: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? [0, 70][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3566: {
        atkStatic: function(p) { return p.unit.type == "INT" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "INT" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "INT" ? 30 : 0; },
    },
3567: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? [0, 0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") ? [0, 0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") ? [0, 0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3568: {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Cerebral") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Cerebral") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3569: {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Cerebral") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Cerebral") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Cerebral") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3571: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3572: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3576: {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Free Spirit") ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3578: {
        atkStatic: function(p) { return 60; },
        hpStatic: function(p) { return 60; },
        rcvStatic: function(p) { return 60; },
    },
3579: {
        atkStatic: function(p) { return 40; },
        hpStatic: function(p) { return 40; },
        rcvStatic: function(p) { return 40; },
    },
3580: {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? [0, 40][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? [0, 40][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? [0, 40][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3582: {
        rcvStatic: function(p) { return p.percHP <= 30.0 && p.slot == p.sourceSlot ? [0, 400, 400][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3583: {
        atkStatic: function(p) { return p.unit.type == "INT" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "INT" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "INT" ? 30 : 0; },
    },
3584: {
        rcvStatic: function(p) { return 75; },
    },
3586: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Free Spirit") ? 40 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Free Spirit") ? 40 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Free Spirit") ? 40 : 0; },
    },
3587: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? [0, 40][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? [0, 40][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "QCK" ? [0, 40][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3588: {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Powerhouse") ? [0, 60, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Powerhouse") ? [0, 60, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3590: {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Powerhouse") ? [0, 60, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Powerhouse") ? [0, 60, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3592: {
        atkStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3595: {
        atkStatic: function(p) { return [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3597: {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 1; },
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 1; },
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 1; },
    },
3599: {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
    },
3600: {
        atkStatic: function(p) { return 60; },
        hpStatic: function(p) { return 60; },
        rcvStatic: function(p) { return 60; },
    },
3601: {
        atkStatic: function(p) { return [0, 30][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 30][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 30][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3605: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Cerebral") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Cerebral") ? 30 : 0; },
    },
3607: {
        atkStatic: function(p) { return [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3609: {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Powerhouse") ? [0, 125, 125][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"3610-1": {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Shooter") || p.unit.class.has("Free Spirit") ? 125 : 0; },
    },
"3610-2": {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Shooter") || p.unit.class.has("Free Spirit") ? 125 : 0; },
    },
"3610-STR": {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Shooter") || p.unit.class.has("Free Spirit") ? 125 : 0; },
    },
"3610-DEX": {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Shooter") || p.unit.class.has("Free Spirit") ? 125 : 0; },
    },
"3611-1": {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Shooter") || p.unit.class.has("Free Spirit") ? 125 : 0; },
    },
"3611-2": {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Shooter") || p.unit.class.has("Free Spirit") ? 125 : 0; },
    },
"3611-STR": {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Shooter") || p.unit.class.has("Free Spirit") ? 125 : 0; },
    },
"3611-DEX": {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Shooter") || p.unit.class.has("Free Spirit") ? 125 : 0; },
    },
3617: {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Powerhouse") ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Powerhouse") ? 75 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Powerhouse") ? 75 : 0; },
    },
3618: {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Powerhouse") ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Powerhouse") ? 75 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Powerhouse") ? 75 : 0; },
    },
3621: {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Free Spirit") ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3623: {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Free Spirit") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Free Spirit") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Free Spirit") ? 50 : 0; },
    },
3624: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 60 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3625: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "INT" ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "INT" ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3626: {
        atkStatic: function(p) { return p.unit.type == "QCK" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "QCK" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "QCK" ? 30 : 0; },
    },
3627: {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Free Spirit") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") ? 30 : 0; },
    },
3629: {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Cerebral") ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Cerebral") ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Cerebral") ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3631: {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Driven") ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Driven") ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Driven") ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3631: {
        rcvStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" ? [0, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3634: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 40 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") ? 40 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") ? 40 : 0; },
    },
3635: {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 75 : 0; },
    },
3641: {
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") || p.unit.class.has("Driven") ? [0, 200, 200][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3643: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse") ? 60 : 0; },
    },
3644: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 40 : 0; },
    },
3646: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") || p.unit.class.has("Driven") ? 75 : 0; },
    },
3647: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3648: {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Driven") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Driven") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Driven") ? 50 : 0; },
    },
3664: {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
    },
3666: {
        atkStatic: function(p) { return [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3670: {
        atkStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3671: {
        hpStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "PSY" ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3672: {
        atkStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
    },
3674: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Powerhouse") ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Powerhouse") ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Powerhouse") ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3679: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Shooter") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Shooter") ? 30 : 0; },
    },
3680: {
        hp: function(p) { return p.unit.class.has("Cerebral") ? [1, 1, 1.1][CrunchUtils.limitUnlock(p, "sailors")] : 1; },
    },
3683: {
        atkStatic: function(p) { return p.slot <= 1 ? [0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return [0, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3685: {
        rcvStatic: function(p) { return p.colorCount.INT == 6 ? 75 : 0; },
        hpStatic: function(p) { return 100; },
    },
3686: {
        hpStatic: function(p) { return 150; },
    },
3687: {
        atkStatic: function(p) { return 75; },
        hpStatic: function(p) { return 75; },
    },
3688: {
        atkStatic: function(p) { return [0, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3689: {
        atkStatic: function(p) { return [0, 50, 50][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 50, 50][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 50, 50][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3690: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Powerhouse") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Powerhouse") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Powerhouse") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3692: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") || p.unit.class.has("Powerhouse") ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3695: {
        atkStatic: function(p) { return [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3697: {
        atkStatic: function(p) { return p.captain.class.has("Shooter") ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.captain.class.has("Shooter") ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.captain.class.has("Shooter") ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3698: {
        atkStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "INT" ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "INT" ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "INT" ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3699: {
        atkStatic: function(p) { return p.slot <= 1 ? [0, 125][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.type == "QCK" ? 100 : 0; },
    },
3701: {
        atkStatic: function(p) { return 70; },
        hpStatic: function(p) { return 70; },
        rcvStatic: function(p) { return 70; },
    },
3702: {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
    },
3703: {
        atkStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
    },
3704: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Shooter") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Shooter") ? 30 : 0; },
    },
"3708-1": {
        atkStatic: function(p) { return [0, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
"3708-2": {
        atkStatic: function(p) { return [0, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
"3708-PSY": {
        atkStatic: function(p) { return [0, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
"3708-QCK": {
        atkStatic: function(p) { return [0, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3709: {
        atkStatic: function(p) { return 75; },
        hpStatic: function(p) { return 75; },
        rcvStatic: function(p) { return 75; },
    },
3710: {
        atkStatic: function(p) { return 75; },
        hpStatic: function(p) { return 75; },
        rcvStatic: function(p) { return 75; },
    },
3711: {
        hpStatic: function(p) { return [0, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3712: {
        hpStatic: function(p) { return [0, 0, 80][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 0, 80][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3713: {
        atkStatic: function(p) { return 70; },
        hpStatic: function(p) { return 70; },
        rcvStatic: function(p) { return 70; },
    },
3718: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "PSY" ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "PSY" ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "PSY" ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3719: {
        atkStatic: function(p) { return 70; },
    },
3720: {
        atkStatic: function(p) { return 70; },
    },
3721: {
        hp: function(p) { return p.unit.class.has("Driven") ? [1, 1, 1.1][CrunchUtils.limitUnlock(p, "sailors")] : 1; },
    },
3728: {
        atkStatic: function(p) { return 40; },
        hpStatic: function(p) { return 40; },
        rcvStatic: function(p) { return 40; },
    },
3731: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Fighter") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Fighter") ? 30 : 0; },
    },
3735: {
        atkStatic: function(p) { return p.unit.type == "QCK" ? [0, 0, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.type == "QCK" ? [0, 0, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.type == "QCK" ? [0, 0, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3736: {
        rcvStatic: function(p) { return [0, 60, 60][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3737: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse") ? 60 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse") ? 60 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse") ? 60 : 0; },
    },
3738: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") || p.unit.class.has("Fighter") ? [0, 70][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3741: {
        atkStatic: function(p) { return [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3742: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Shooter") ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Shooter") ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Shooter") ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3743: {
        atkStatic: function(p) { return [0, 50][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 50][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 50][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3743: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3745: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? [0, 0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") ? [0, 0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") ? [0, 0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3746: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? 70 : 0; },
    },
3747: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? 60 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") ? 60 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") ? 60 : 0; },
    },
3748: {
        hpStatic: function(p) { return p.unit.class.has("Slasher") ? 70 : 0; },
    },
3749: {
        rcvstatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Shooter") ? 75 : 0; },
    },
3753: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") ? 30 : 0; },
    },
3755: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 125, 125][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3758: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? [0, 0, 70][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") ? [0, 0, 70][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") ? [0, 0, 70][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3760: {
        atkStatic: function(p) { return [0, 56][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 56][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 56][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3761: {
        hpStatic: function(p) { return [0, 60][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 60][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3762: {
        atkStatic: function(p) { return p.unit.type == "DEX" ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3763: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 50 : 0; },
    },
3764: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 50 : 0; },
    },
3766: {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? [0, 125, 125][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? [0, 125, 125][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3767: {
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 100 : 0; },
    },
3770: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Powerhouse") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Powerhouse") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Powerhouse") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3772: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Powerhouse") ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Powerhouse") ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Powerhouse") ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3773: {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 60 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? 60 : 0; },
    },
3775: {
        hpStatic: function(p) { return p.unit.type == "PSY" ? [0, 150, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3777: {
        atkStatic: function(p) { return p.unit.type == "PSY" ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3780: {
        atkStatic: function(p) { return p.unit.type == "STR" ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3781: {
        hpStatic: function(p) { return 100; },
    },
3785: {
        atkStatic: function(p) { return [0, 50][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 50][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 50][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3786: {
        atkStatic: function(p) { return [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
"3787-2": {
        atkStatic: function(p) { return 100; },
        hpStatic: function(p) { return 100; },
        rcvStatic: function(p) { return 100; },
    },
"3788-2": {
        atkStatic: function(p) { return 100; },
        hpStatic: function(p) { return 100; },
        rcvStatic: function(p) { return 100; },
    },
3792: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3795: {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
    },
3797: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") ? 30 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Fighter") ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Fighter") ? 30 : 0; },
    },
3798: {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 75 : 0; },
    },
3803: {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Driven") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Driven") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Driven") ? 50 : 0; },
    },
3804: {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? 75 : 0; },
    },
3805: {
        atkStatic: function(p) { return p.unit.cost <= 40 ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.cost <= 40 ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.cost <= 40 ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3806: {
        atkStatic: function(p) { return p.unit.cost <= 40 ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.cost <= 40 ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.cost <= 40 ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3807: {
        atkStatic: function(p) { return p.unit.cost <= 40 ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.cost <= 40 ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.cost <= 40 ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3809: {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Powerhouse") ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Powerhouse") ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Powerhouse") ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3814: {
        atkStatic: function(p) { return [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3815: {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
    },
3816: {
        hp: function(p) { return p.unit.class.has("Cerebral") ? [1, 1, 1.1][CrunchUtils.limitUnlock(p, "sailors")] : 1; },
    },
3817: {
        atkStatic: function(p) { return p.unit.type == "PSY" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" ? 30 : 0; },
    },
3818: {
        atkStatic: function(p) { return p.unit.type == "PSY" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" ? 30 : 0; },
    },
3819: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Powerhouse") ? 60 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Powerhouse") ? 60 : 0; },
    },
3820: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
3821: {
        staticMult: function(p) { return [0, 4][CrunchUtils.limitUnlock(p, "sailors")]; }
    },
"3828-1": {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 125 : 0; },
    },
"3828-2": {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 125 : 0; },
    },
"3828-STR": {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 125 : 0; },
    },
"3828-PSY": {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Cerebral") ? 125 : 0; },
    },
3830: {
        atkStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3833: {
        atkStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" ? 50 : 0; },
    },
3834: {
        atkStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" ? 60 : 0; },
        hpStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" ? 60 : 0; },
    },
3835: {
        atkStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" ? [0, 40][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" ? [0, 40][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" ? [0, 40][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3836: {
        atkStatic: function(p) { return p.unit.type == "QCK" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "QCK" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "QCK" ? 30 : 0; },
    },
3837: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 45 : 0; },
    },
3840: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 60 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 60 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? 60 : 0; },
    },
3843: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 70 : 0; },
    },
3844: {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Free Spirit") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Free Spirit") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Free Spirit") ? 50 : 0; },
    },
3847: {
        atkStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" ? 50 : 0; },
    },
3848: {
        atkStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "QCK" || p.unit.type == "PSY" ? 50 : 0; },
    },
3850: {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Driven") ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Driven") ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Driven") ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3853: {
        atkStatic: function(p) { return 60; },
    },
3855: {
        atkStatic: function(p) { return p.unit.type == "PSY" ? 40 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" ? 40 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" ? 40 : 0; },
    },
3862: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Driven") ? 60 : 0; },
    },
3865: {
        hpStatic: function(p) { return p.unit.class.has("Driven") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3866: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 70 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") ? 70 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") ? 70 : 0; },
    },
"3868-1": {
        hpStatic: function(p) { return p.unit.class.has("Driven") ? 50 : 0; },
    },
"3868-2": {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 50 : 0; },
    },
"3868-DEX": {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") ? 100 : 0; },
    },
"3868-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") ? 100 : 0; },
    },
3870: {
        atkStatic: function(p) { return p.slot <= 1 ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3871: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3873: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3874: {
        atkStatic: function(p) { return p.unit.class.has("Striker") ? 45 : 0; },
    },
3875: {
        atkStatic: function(p) { return p.unit.type == "STR" ? 30 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" ? 30 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" ? 30 : 0; },
    },
"3877-1": {
        atkStatic: function(p) { return 100; },
    },
"3877-2": {
        atkStatic: function(p) { return 100; },
    },
"3877-STR": {
        atkStatic: function(p) { return 100; },
    },
"3877-DEX": {
        atkStatic: function(p) { return 100; },
    },
"3878-1": {
        atkStatic: function(p) { return 100; },
    },
"3878-2": {
        atkStatic: function(p) { return 100; },
    },
"3878-STR": {
        atkStatic: function(p) { return 100; },
    },
"3878-DEX": {
        atkStatic: function(p) { return 100; },
    },
"3880-1": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? [0, 0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") ? [0, 0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") ? [0, 0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"3880-2": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? [0, 0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") ? [0, 0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") ? [0, 0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"3880-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? [0, 0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") ? [0, 0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") ? [0, 0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"3880-STR": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? [0, 0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") ? [0, 0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") ? [0, 0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3881: {
        atkStatic: function(p) { return p.slot <= 1 ? [0, 125][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3881: {
        hpStatic: function(p) { return p.unit.class.has("Driven") ? [0, 200][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3884: {
        hpStatic: function(p) { return 100; },
        atkStatic: function(p) { return [0, 50][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3886: {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
    },
3887: {
        hpStatic: function(p) { return p.unit.class.has("Driven") ? [0, 200][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3889: {
        atkStatic: function(p) { return [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3892: {
        hpStatic: function(p) { return 200; },
    },
3899: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 70][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 70][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 70][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3900: {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") || p.unit.class.has("Free Spirit") ? [0, 70][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") || p.unit.class.has("Free Spirit") ? [0, 70][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Powerhouse") || p.unit.class.has("Free Spirit") ? [0, 70][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"3902-1": {
        hpStatic: function(p) { return [0, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
"3902-2": {
        hpStatic: function(p) { return [0, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
"3902-INT": {
        hpStatic: function(p) { return [0, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3903: {
        hpStatic: function(p) { return p.unit.class.has("Driven") ? [0, 200][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3906: {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") ? 45 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") ? 45 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Free Spirit") ? 45 : 0; },
    },
"3907-2": {
        atkStatic: function(p) { return 100; },
    },
"3908-2": {
        atkStatic: function(p) { return 100; },
    },
"3910-1": {
        atkStatic: function(p) { return (p.unit.type == "DEX" || p.unit.type == "PSY") ? [0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return (p.unit.type == "DEX" || p.unit.type == "PSY") ? [0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return (p.unit.type == "DEX" || p.unit.type == "PSY") ? [0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"3910-2": {
        atkStatic: function(p) { return (p.unit.type == "DEX" || p.unit.type == "PSY") ? [0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return (p.unit.type == "DEX" || p.unit.type == "PSY") ? [0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return (p.unit.type == "DEX" || p.unit.type == "PSY") ? [0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"3910-PSY": {
        atkStatic: function(p) { return (p.unit.type == "DEX" || p.unit.type == "PSY") ? [0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return (p.unit.type == "DEX" || p.unit.type == "PSY") ? [0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return (p.unit.type == "DEX" || p.unit.type == "PSY") ? [0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"3910-DEX": {
        atkStatic: function(p) { return (p.unit.type == "DEX" || p.unit.type == "PSY") ? [0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return (p.unit.type == "DEX" || p.unit.type == "PSY") ? [0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return (p.unit.type == "DEX" || p.unit.type == "PSY") ? [0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3912: {
        atkStatic: function(p) { return 70; },
        hpStatic: function(p) { return 70; },
        rcvStatic: function(p) { return 70; },
    },
3913: {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Powerhouse") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3915: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"3916-1": {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? 100 : 0; },
    },
"3916-2": {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? 100 : 0; },
    },
"3916-DEX": {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? 100 : 0; },
    },
"3916-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? 100 : 0; },
    },
"3917-1": {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? 100 : 0; },
    },
"3917-2": {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? 100 : 0; },
    },
"3917-DEX": {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? 100 : 0; },
    },
"3917-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? 100 : 0; },
    },
3919: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? [0, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"3920-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") ? 150 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") ? 150 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Free Spirit") ? 150 : 0; },
    },
"3920-STR": {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") ? 150 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") ? 150 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Free Spirit") ? 150 : 0; },
    },
3928: {
        atkStatic: function(p) { return [0, 50][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 50][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 50][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3929: {
        atkStatic: function(p) { return p.unit.type == "STR" ? 45 : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" ? 45 : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" ? 45 : 0; },
    },
3930: {
        atkStatic: function(p) { return p.unit.class.has("Striker") ? 45 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Striker") ? 45 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Striker") ? 45 : 0; },
    },
3931: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") || p.unit.class.has("Powerhouse") ? 75 : 0; },
    },
3934: {
        rcvStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Cerebral") ? [0, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3935: {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") || p.unit.class.has("Cerebral") ? 60 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") || p.unit.class.has("Cerebral") ? 60 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Powerhouse") || p.unit.class.has("Cerebral") ? 60 : 0; },
    },
3936: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Striker") || p.unit.class.has("Shooter") || p.unit.class.has("Powerhouse") || p.unit.class.has("Cerebral") ? [0, 60, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Striker") || p.unit.class.has("Shooter") || p.unit.class.has("Powerhouse") || p.unit.class.has("Cerebral") ? [0, 60, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Striker") || p.unit.class.has("Shooter") || p.unit.class.has("Powerhouse") || p.unit.class.has("Cerebral") ? [0, 60, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3946: {
        hpStatic: function(p) { return 60; },
        rcvStatic: function(p) { return 60; },
    },
3948: {
        atkStatic: function(p) { return p.unit.type == "STR" ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3950: {
        atkStatic: function(p) { return p.percHP <= 10 ? [0, 200][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3952: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Shooter") ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Shooter") ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Shooter") ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3954: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3956: {
        atkStatic: function(p) { return [0, 150, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 150, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 150, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3957: {
        atkStatic: function(p) { return [0, 150, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 150, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 150, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3959: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3961: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3962: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3963: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3964: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3965: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") || p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"3969-2": {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Powerhouse") ? 50 : 0; },
    },
"3969-PSY": {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? 75 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Powerhouse") ? 75 : 0; },
    },
"3971-1": {
        atkStatic: function(p) { return (p.unit.type == "PSY" || p.unit.type == "INT") ? [0, 125][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"3971-2": {
        atkStatic: function(p) { return (p.unit.type == "PSY" || p.unit.type == "INT") ? [0, 125][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"3971-PSY": {
        atkStatic: function(p) { return (p.unit.type == "PSY" || p.unit.type == "INT") ? [0, 125][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"3971-INT": {
        atkStatic: function(p) { return (p.unit.type == "PSY" || p.unit.type == "INT") ? [0, 125][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3973: {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Powerhouse") ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3974: {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
    },
3975: {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
    },
3976: {
        rcvStatic: function(p) { return 80; },
    },
3977: {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
    },
3978: {
        staticMult: function(p) { return [0, 5][CrunchUtils.limitUnlock(p, "sailors")]; }
    },
3979: {
        atkStatic: function(p) { return [0, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
3981: {
        atkStatic: function(p) { return p.slot <= 1 ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3984: {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") ? [0, 150, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Powerhouse") ? [0, 150, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Powerhouse") ? [0, 150, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3986: {
        atkStatic: function(p) { return p.slot <= 1 ? [0, 150, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.slot <= 1 ? [0, 150, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.slot <= 1 ? [0, 150, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"3989-1": {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
    },
"3989-2": {
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
    },
"3989-PSY": {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 100 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 100 : 0; },
    },
"3989-INT": {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 100 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 100 : 0; },
    },
3990: {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 70 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 70 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 70 : 0; },
    },
3991: {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 70 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 70 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 70 : 0; },
    },
3993: {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.class.has("Shooter") || p.unit.class.has("Free Spirit") ? [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
3997: {
        hpStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Slasher") ? 75 : 0; },
    },
3998: {
        atkStatic: function(p) { return 75; },
    },
3999: {
        atkStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Cerebral") ? 60 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Cerebral") ? 60 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Free Spirit") || p.unit.class.has("Cerebral") ? 60 : 0; },
    },
4000: {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Striker") ? [0, [50, 100][CrunchUtils.llimitUnlock(p, "sailors1")], [50, 100][CrunchUtils.llimitUnlock(p, "sailors1")]][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Striker") ? [0, [50, 100][CrunchUtils.llimitUnlock(p, "sailors1")], [50, 100][CrunchUtils.llimitUnlock(p, "sailors1")]][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4008: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Cerebral") ? [0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4009: {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Shooter") ? [0, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4010: {
        staticMult: function(p) { return [[0, 4],[0, 10]][CrunchUtils.llimitUnlock(p, "sailors1")][CrunchUtils.limitUnlock(p, "sailors")]; }
    },
4020: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "PSY" ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "PSY" ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "PSY" ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4024: {
        atkStatic: function(p) { return p.unit.type == "STR" ? 50 : 0; },
    },
4025: {
        atkStatic: function(p) { return 75; },
        hpStatic: function(p) { return 75; },
        rcvStatic: function(p) { return 75; },
    },
4026: {
        atkStatic: function(p) { return p.unit.type == "DEX" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" ? 50 : 0; },
    },
4027: {
        atkStatic: function(p) { return p.unit.class.has("Fighter") ? 45 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Fighter") ? 45 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Fighter") ? 45 : 0; },
    },
4033: {
        atkStatic: function(p) { return 75; },
        hpStatic: function(p) { return 75; },
        rcvStatic: function(p) { return 75; },
    },
4034: {
        atkStatic: function(p) { return p.unit.class.has("Powerhouse") || p.unit.class.has("Driven") ? [0, 80][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4035: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") || p.unit.class.has("Driven") ? [0, 80][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4037: {
        atkStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "PSY" ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "PSY" ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.type == "STR" || p.unit.type == "DEX" || p.unit.type == "PSY" ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4038: {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Driven") ? [0, 80][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4039: {
        atkStatic: function(p) { return p.unit.class.has("Striker") || p.unit.class.has("Driven") ? [0, 80][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4041: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") ? [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        chainAddition: function(p) { return p.captain.class.has("Slasher") ? [0, 0.1, 0.1][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4044: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 75 : 0; },
    },
4045: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Cerebral") ? [0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4046: {
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? 75 : 0; },
    },
4048: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Slasher") || p.unit.class.has("Free Spirit") ? [0, 0, 50][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4049: {
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Shooter") ? 30 : 0; },
    },
4050: {
        atkStatic: function(p) { return [0, 0, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
4052: {
        rcvStatic: function(p) { return p.unit.class.has("Powerhouse") ? [0, 70][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4058: {
        atkStatic: function(p) { return [0, 0, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 0, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 0, 150][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
"4059-1": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 100 : 0; },
    },
"4059-2": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 100 : 0; },
    },
"4059-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
    },
"4059-DEX": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
    },
"4060-1": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 100 : 0; },
    },
"4060-2": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 100 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 100 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 100 : 0; },
    },
"4060-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
    },
"4060-DEX": {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
        hpStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0; },
    },
"4061-DEX": {
        chainAddition: function(p) { return p.captain.class.has("Slasher") || p.captain.class.has("Free Spirit") ? [0, 0.1][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"4061-QCK": {
        chainAddition: function(p) { return p.captain.class.has("Slasher") || p.captain.class.has("Free Spirit") ? [0, 0.1][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"4062-DEX": {
        chainAddition: function(p) { return p.captain.class.has("Slasher") || p.captain.class.has("Free Spirit") ? [0, 0.1][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"4062-QCK": {
        chainAddition: function(p) { return p.captain.class.has("Slasher") || p.captain.class.has("Free Spirit") ? [0, 0.1][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4063: {
        atkStatic: function(p) { return [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
        hpStatic: function(p) { return [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
        rcvStatic: function(p) { return [0, 100, 100][CrunchUtils.limitUnlock(p, "sailors")]; },
    },
4064: {
        atkStatic: function(p) { return p.slot <= 1 ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4066: {
        atkStatic: function(p) { return p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 60 : 0; },
    },
4067: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Striker") ? [0, 70, 70][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4068: {
        atkStatic: function(p) { return p.unit.class.has("Shooter") || p.unit.class.has("Striker") ? [0, 70, 70][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4069: {
        atkStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
    },
4074: {
        atkStatic: function(p) { return p.percHP <= 30 ? p.unit.class.has("Slasher") || p.unit.class.has("Striker") ? 150 : 0 : 0; },
    },
4075: {
        atkStatic: function(p) { return p.percHP <= 30 ? 150 : 0; },
    },
4076: {
        atkStatic: function(p) { return p.percHP <= 30 ? 150 : 0; },
    },
4082: {
        atkStatic: function(p) { return p.slot <= 1 ? [0, 0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4087: {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
    },
4088: {
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 100 : 0; },
    },
4089: {
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 200 : 0; },
    },
4090: {
        atkStatic: function(p) { return p.unit.type == "PSY" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" ? 50 : 0; },
    },
4091: {
        atkStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
    },
4092: {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
    },
4094: {
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? [0, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4096: {
        atkStatic: function(p) { return p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") ? [0, 80, 80][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Cerebral") || p.unit.class.has("Free Spirit") ? [0, 0, 80][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4100: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? [0, 0, 70][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") ? [0, 0, 70][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") ? [0, 0, 70][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4105: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 60 : 0; },
    },
4106: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? 60 : 0; },
    },
4111: {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Slasher") ? [0, 75, 75][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4112: {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Striker") ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Striker") ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4113: {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Striker") ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Striker") ? [0, 60][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4114: {
        atkStatic: function(p) { return p.slot <= 1 ? 150 : 0; },
    },
4115: {
        atkStatic: function(p) { return p.slot <= 1 ? 150 : 0; },
    },
"4122-1": {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"4122-2": {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"4122-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"4122-INT": {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"4124-1": {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"4124-2": {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"4124-INT": {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
"4124-QCK": {
        atkStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") || p.unit.class.has("Cerebral") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4125: {
        hpStatic: function(p) { return p.unit.class.has("Driven") ? [0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4126: {
        atkStatic: function(p) { return p.unit.class.has("Driven") ? [0, 70][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.class.has("Driven") ? [0, 70][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        rcvStatic: function(p) { return p.unit.class.has("Driven") ? [0, 70][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4129: {
        hp: function(p) { return p.captain.type == "PSY" ? 0.7 : 1; },
    },
4133: {
        atkStatic: function(p) { return p.slot <= 1 ? [0, 0, 150][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4143: {
        atkStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" ? 60 : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" ? 60 : 0; },
        rcvStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" ? 60 : 0; },
    },
4144: {
        atkStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" ? [0, 70][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
    },
4146: {
        atkStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" ? [0, 83][CrunchUtils.limitUnlock(p, "sailors")] : 0; },
        hpStatic: function(p) { return p.unit.type == "DEX" || p.unit.type == "INT" ? 83 : 0; },
    },
4148: {
        atkStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
        hpStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
        rcvStatic: function(p) { return p.unit.type == "INT" ? 50 : 0; },
    },
4986: {
        staticMult: function(p) { return 3; }
    },
4987: {
        staticMult: function(p) { return 3; }
    },
4988: {
        atkStatic: function(p) { return p.slot <= 1 ? 60 : 0; },
    },
4989: {
        atkStatic: function(p) { return p.slot <= 1 ? 60 : 0; },
    },
4994: {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
    },
4995: {
        atkStatic: function(p) { return 50; },
        hpStatic: function(p) { return 50; },
        rcvStatic: function(p) { return 50; },
    },
5003: {
        atkStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
        hpStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
        rcvStatic: function(p) { return p.unit.type == "PSY" || p.unit.type == "INT" ? 75 : 0; },
    }
};