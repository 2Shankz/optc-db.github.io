(function () {
  angular.module("optc").run(function ($rootScope, $timeout, $storage) {
    /**************
     * Table data *
     **************/

    var additionalColumns = $storage.get("charColumns", []);

    var padding =
      Math.floor(Math.log(Object.keys(window.units).length + 2) / Math.log(10)) + 1;
    var table = null;

    var addImage = function (data, type, row, meta) {
      if (type == "display") {
        var id = parseInt(row[0], 10);
        var paths = Utils.getThumbnailUrl(id, "..");
        var noimage = "../api/images/common/noimage.png";
        return (
          '<img class="slot small" data-original="' +
          paths.glo +
          '" ' +
          "onerror=\"this.onerror=null; this.src='" +
          paths.jap +
          "'; this.onerror=function(){this.src='" + noimage + "'};\">" +
          '<a ui-sref="main.search.view({ id: ' +
          id +
          '})">' +
          data +
          "</a>"
        );
      }
      return data; // only the Name string for filtering, sorting, etc.
    };

    var fuse = new Fuse(Object.values(window.units), {
      keys: ["name", "aliases"],
      id: "number",
      threshold: 0.3,
      distance: 200,
    });

    var fused = null;

    var tableData = null;
    var farmableLocations = null;

    var log = $storage.get("characterLog", []);
    var characterLog = {};
    for (var i = 0; i < log.length; ++i) characterLog[log[i]] = true;

    /*******************
     * Table functions *
     *******************/

    var getTableColumns = function () {
      var result = [
        { title: "ID" },
        { title: "Name", render: addImage },
        { title: "Type" },
        { title: "Class" },
        { title: "HP" },
        { title: "ATK" },
        { title: "RCV" },
        { title: "Cost" },
        { title: "Sockets" },
        { title: "Stars" },
        { title: "CL", orderable: false },
      ];
      additionalColumns.forEach(function (x) {
        var title = x
          .replace(/Minimum cooldown/, "Min CD")
          .replace(/Minimum Limit Break cooldown/, "Min LB CD")
          .replace(/Initial cooldown/, "Init. CD")
          .replace(/Initial Limit Break cooldown/, "Init. LB CD")
          .replace(/MAX EXP/, "MAX EXP");
        result.splice(result.length - 1, 0, {
          title: title,
          type: "num-string",
        });
      });
      return result;
    };

    /*******************
     * Table filtering *
     *******************/

    var tableFilter = function (settings, data, index) {
      if (!tableData.parameters) return true;
var id = parseInt(data[0], 10),
  unit = window.units[String(id)];
if (!unit) {
  console.warn('[TableFilter] Missing unit for ID:', id, '- Row excluded from filtered results');
  return false;
}
var flags = window.flags[unit.id] || {};

/* Helper to get all variants of a unit (base, -1, -2) that have classes/types */
      function getUnitVariants(unit) {
        var variants = [];
        
        // Add base unit if it has classes
        if (unit.class && unit.class.length > 0) {
          variants.push(unit);
        }
        
        // Add variant -1 if it exists and has classes
        var variant1 = window.units[unit.id + '-1'];
        if (variant1 && variant1.class && variant1.class.length > 0) {
          variants.push(variant1);
        }
        
        // Add variant -2 if it exists and has classes  
        var variant2 = window.units[unit.id + '-2'];
        if (variant2 && variant2.class && variant2.class.length > 0) {
          variants.push(variant2);
        }
        
        return variants;
      }

      /* Helper to get all variants of a unit that have types */
      function getUnitVariantsWithTypes(unit) {
        var variants = [];
        
        // Add base unit if it has type
        if (unit.type) {
          variants.push(unit);
        }
        
        // Add variant -1 if it exists and has type
        var variant1 = window.units[unit.id + '-1'];
        if (variant1 && variant1.type) {
          variants.push(variant1);
        }
        
        // Add variant -2 if it exists and has type  
        var variant2 = window.units[unit.id + '-2'];
        if (variant2 && variant2.type) {
          variants.push(variant2);
        }
        
        return variants;
      }

      /* Helper to extract all classes from a variant (handle nested arrays) */
      function extractVariantClasses(variant) {
        var variantClasses = [];
        
        if (Array.isArray(variant.class)) {
          for (var c = 0; c < variant.class.length; c++) {
            if (Array.isArray(variant.class[c])) {
              variantClasses = variantClasses.concat(variant.class[c]);
            } else {
              variantClasses.push(variant.class[c]);
            }
          }
        } else if (variant.class) {
          variantClasses = [variant.class];
        }
        
        return variantClasses;
      }

      /* Helper to extract all types from a variant (handle arrays) */
      function extractVariantTypes(variant) {
        var variantTypes = [];
        
        if (Array.isArray(variant.type)) {
          variantTypes = variantTypes.concat(variant.type);
        } else if (variant.type) {
          variantTypes = [variant.type];
        }
        
        return variantTypes;
      }

      /* Helper to check if unit has only single classes across all variants */
      function hasOnlySingleClasses(unit) {
        var variants = getUnitVariants(unit);
        for (var v = 0; v < variants.length; v++) {
          var variant = variants[v];
          var variantClasses = extractVariantClasses(variant);
          if (variantClasses.length > 1) {
            return false; // Found a variant with multiple classes
          }
        }
        return true; // All variants have single class
      }

      /* * * * * Query filters * * * * */

      // override `queryTerms` checking if fuzzy mode is enabled
      let tempParams = { ...tableData.parameters };
      if (tableData.fuzzy) {
        tempParams.queryTerms = null;

        if (tableData.parameters.query) {
          if (fused === null) fused = fuse.search(tableData.parameters.query);
          if (fused.indexOf(id) == -1) return false;
        }
      }

      if (!Utils.checkUnitMatchSearchParameters(unit, tempParams)) return false;

/* * * * * Sidebar filters * * * * */
      if (!tableData.parameters.filters) return true;
      var filters = tableData.parameters.filters;

      // Handle Exclude Single Class Characters filter (independent of class selection)
      if (filters.noSingleClass && hasOnlySingleClasses(unit)) {
        return false;
      }
// filter by type
      if (filters.types && filters.types.length) {
        var typeVariants = getUnitVariantsWithTypes(unit);
        var anyVariantMatches = false;
        
        // Evaluate each variant individually
        for (var v = 0; v < typeVariants.length; v++) {
          var variant = typeVariants[v];
          var variantTypes = extractVariantTypes(variant);
          
          // Check if this variant matches any of the selected types
          var variantMatches = false;
          for (var i = 0; i < variantTypes.length; i++) {
            if (filters.types.includes(variantTypes[i])) {
              variantMatches = true;
              break;
            }
          }
          
          if (variantMatches) {
            anyVariantMatches = true;
            break; // Found a matching variant, no need to check others
          }
        }
        
        if (!anyVariantMatches) return false;
      }
// filter by class
      if (filters.classes && filters.classes.length) {
        var variants = getUnitVariants(unit);
        var anyVariantMatches = false;
        
        // Evaluate each variant individually
        for (var v = 0; v < variants.length; v++) {
          var variant = variants[v];
          var variantClasses = extractVariantClasses(variant);
          
          var variantMatches = true;
          var inclusive = !filters.classInclusive;
          
          if (inclusive) {
            // ANY selected class must be present in this variant
            var hasAnyClass = false;
            for (var i = 0; i < filters.classes.length; i++) {
              if (variantClasses.includes(filters.classes[i])) {
                hasAnyClass = true;
                break;
              }
            }
            variantMatches = hasAnyClass;
          } else {
            // Exclusive mode: variant must have ALL selected classes
            for (var i = 0; i < filters.classes.length; i++) {
              if (!variantClasses.includes(filters.classes[i])) {
                variantMatches = false;
                break;
              }
            }
          }
          
          if (variantMatches) {
            anyVariantMatches = true;
            break; // Found a matching variant, no need to check others
          }
        }
        
        if (!anyVariantMatches) return false;
      }
      //filter rumble style
      if (filters.styleATK) {
        if (unit.pirateFest.class !== "ATK") {
          if (unit.pirateFest2 === null) return false;
          if (unit.pirateFest2.class !== "ATK") return false
        };
      };
      if (filters.styleDEF) {
        if (unit.pirateFest.class !== "DEF") {
          if (unit.pirateFest2 === null) return false;
          if (unit.pirateFest2.class !== "DEF") return false
        };
      };
      if (filters.styleRCV) {
        if (unit.pirateFest.class !== "RCV") {
          if (unit.pirateFest2 === null) return false;
          if (unit.pirateFest2.class !== "RCV") return false
        };
      };
      if (filters.styleSPT) {
        if (unit.pirateFest.class !== "SPT") {
          if (unit.pirateFest2 === null) return false;
          if (unit.pirateFest2.class !== "SPT") return false
        };
      };
      if (filters.styleDBF) {
        if (unit.pirateFest.class !== "DBF") {
          if (unit.pirateFest2 === null) return false;
          if (unit.pirateFest2.class !== "DBF") return false
        };
      };
      if (filters.styleBAL) {
        if (unit.pirateFest.class !== "BAL") {
          if (unit.pirateFest2 === null) return false;
          if (unit.pirateFest2.class !== "BAL") return false
        };
      };

      if (filters.tags && filters.tags.length) {
        const unitTagSet = window.tags[unit.id];
        if (!unitTagSet) return false;

        const isVsOrDual = Array.isArray(unitTagSet[0]);

        // Extract tag names for comparison
        const filterTagNames = filters.tags.map((tag) => tag.name);

        if (filters.tagsStrict) {
          if (isVsOrDual) {
            const match = unitTagSet.some((tagList) =>
              filterTagNames.every((tag) => tagList.includes(tag))
            );
            if (!match) return false;
          } else {
            const match = filterTagNames.every((tag) =>
              unitTagSet.includes(tag)
            );
            if (!match) return false;
          }
        } else {
          if (isVsOrDual) {
            const match = unitTagSet.some((tagList) =>
              filterTagNames.some((tag) => tagList.includes(tag))
            );
            if (!match) return false;
          } else {
            const match = filterTagNames.some((tag) =>
              unitTagSet.includes(tag)
            );
            if (!match) return false;
          }
        }
      }

      // filter by stars
      if (
        filters.stars &&
        filters.stars.length &&
        filters.stars.indexOf(unit.stars) == -1
      )
        return false;
      // filter by cost
      if (unit.cost < filters.cost[0] || unit.cost > filters.cost[1])
        return false;
      // filter by rumble cost
      var rumble = window.rumble[id];
      if (rumble) {
        var rumbleCost = rumble.character1 ? rumble.character1.festCost : rumble.festCost;
        if (filters.rumbleCost && filters.rumbleCost.length === 2) {
          if (rumbleCost < filters.rumbleCost[0] || rumbleCost > filters.rumbleCost[1])
            return false;
        }
      }
      // filter by drop
      //if(id == 2) console.log(filters);
      if (filters.nonFarmable && Object.keys(filters.nonFarmable).length > 0) {
        // RR
        if (filters.nonFarmable.rro && !flags.rro) return false;
        if (filters.nonFarmable.rro === false && flags.rro) return false;
        // limited RR
        if (filters.nonFarmable.lrr && !flags.lrr) return false;
        if (filters.nonFarmable.lrr === false && flags.lrr) return false;
        // promo
        if (filters.nonFarmable.promo && !flags.promo) return false;
        if (filters.nonFarmable.promo === false && flags.promo) return false;
        // special
        if (filters.nonFarmable.special && !flags.special) return false;
        if (filters.nonFarmable.special === false && flags.special)
          return false;
        // rayleigh shop
        if (filters.nonFarmable.shop && !flags.shop) return false;
        if (filters.nonFarmable.shop === false && flags.shop) return false;
        // trade port
        if (filters.nonFarmable.tmshop && !flags.tmshop) return false;
        if (filters.nonFarmable.tmshop === false && flags.tmshop) return false;
        // TM RR
        if (filters.nonFarmable.tmlrr && !flags.tmlrr) return false;
        if (filters.nonFarmable.tmlrr === false && flags.tmlrr) return false;
        // KC RR
        if (filters.nonFarmable.kclrr && !flags.kclrr) return false;
        if (filters.nonFarmable.kclrr === false && flags.kclrr) return false;
        // PF RR
        if (filters.nonFarmable.pflrr && !flags.pflrr) return false;
        if (filters.nonFarmable.pflrr === false && flags.pflrr) return false;
        // Support RR
        if (filters.nonFarmable.slrr && !flags.slrr) return false;
        if (filters.nonFarmable.slrr === false && flags.slrr) return false;
        // Super RR
        if (filters.nonFarmable.superlrr && !flags.superlrr) return false;
        if (filters.nonFarmable.superlrr === false && flags.superlrr)
          return false;
        // Anni RR
        if (filters.nonFarmable.annilrr && !flags.annilrr) return false;
        if (filters.nonFarmable.annilrr === false && flags.annilrr)
          return false;
      }
      if (filters.farmable && Object.keys(filters.farmable).length > 0) {
        if (farmableLocations !== null) {
          var farmable = CharUtils.checkFarmable(id, farmableLocations);
          if (!farmable) return false;
        }
      }
      if (filters.drop) {
        var isFarmable = CharUtils.isFarmable(id);
        if (filters.drop == "Farmable") {
          if (id == 1 || !isFarmable) return false;
        }
        if (filters.drop != "Farmable") {
          if (id != 1 && isFarmable) return false;
        }
      }
      // exclusion filters
      if (filters.noBase && evolutions[id] && evolutions[id].evolution)
        return false;
      if (filters.noEvos && Utils.isEvolverBooster(unit)) return false;
      //console.log(window.details[id] ? "limit" in window.details[id] ? id : "no" : "no details");
      if (filters.noLB && window.details[id])
        if ("limit" in window.details[id]) return false;
      if (filters.potential)
        if (window.details[id]) {
          if (!("potential" in window.details[id])) return false;
        } else {
          return false;
        }
      //console.log(window.details[id].limit);
      if (filters.noLBex && window.details[id])
        if ("limit" in window.details[id]) {
          for (x in window.details[id].limit) {
            if (
              window.details[id].limit[x].includes(
                "LOCKED WITH KEY"
              )
            )
              return false;
          }
        }
      if (filters.noLBCap && window.details[id])
        if ("limit" in window.details[id]) {
          for (x in window.details[id].limit) {
            if (
              window.details[id].limit[x].includes(
                "Acquire new Captain Ability"
              )
            )
              return false;
          }
        }
      if (filters.LLBSailor && window.details[id])
        if ("lLimit" in window.details[id]) {
          if (!("sailor" in window.details[id].lLimit[4])) return false;
        }
      if (filters.noLLB && window.details[id])
        if ("lLimit" in window.details[id]) return false;

			if (filters.noSupport && window.details[id])
				if ("support" in window.details[id]) return false;
			if (
				filters.globalTM &&
				[
					4515, 4516, 4517, 4497, 4510, 4506, 4507, 4511, 4490, 4491, 
          4492, 4493, 4494, 4495, 4505, 4508, 4509, 4512, 4502, 4481, 
          3364, 3462, 3483, 3523, 3543, 3563, 3641, 3735, 3775, 3861, 
          3933, 4003, 4050, 4071, 4133, 4179, 4193, 4227, 4250, 4274, 
          4282, 4300, 4314, 4345, 4401, 4419, 4483, 4499, 2473, 2792, 
          2940, 2944, 2938, 2942, 2936, 2946, 2948, 2950, 2952, 2869, 
          3339, 3416, 3588, 3884, 3886, 3931, 3936, 4357, 4358, 4476, 
          4477, 4478, 4479, 4180, 4181, 4194, 4195, 4484, 4485, 4486, 
          4500, 4501
				].indexOf(id) == -1
			)
				return false;
			if (
				filters.globalKC &&
				[
					4502, 4503, 4504, 2700, 4490, 4491, 4492, 4493, 4494, 4495, 
          4497, 4498, 4499, 4500, 4501, 4505, 2940, 2944, 2938, 2942, 
          2936, 2946, 2948, 2950, 2952, 3300, 3204, 3349, 3391, 3508, 
          3590, 3884, 3780, 3824, 3886, 3917, 3967, 4008, 4054, 4115, 
          4137, 4167, 4182, 4197, 4216, 4253, 4285, 4287, 4303, 4319, 
          4333, 4348, 4350, 4378, 4469, 4476, 4477, 4392, 4405, 4422, 
          4432, 4433, 4436, 4451, 4453, 4441, 4443, 4456, 4472, 4487, 
          4488, 4489, 4496
				].indexOf(id) == -1
			)
				return false;
			if (
				filters.globalPKA &&
				[
					2767, 2749, 2815, 2940, 2944, 2938, 2942, 2936, 2946, 2948, 
          2950, 2952, 2867, 2883, 3032, 3033, 3034, 3035, 3346, 3108, 
          3109, 3223, 3247, 3262, 3286, 3287, 3304, 3305, 3353, 3382, 
          3400, 3401, 3436, 3425, 3477, 3481, 3498, 3518, 3520, 3539, 
          3560, 3559, 3579, 3601, 3620, 3634, 3884, 3657, 3678, 3713, 
          3728, 3743, 3796, 3770, 3750, 3795, 3815, 3835, 3855, 3874, 
          3887, 3903, 3885, 3927, 3952, 3976, 3999, 4021, 4025, 4066, 
          4047, 4088, 4107, 4127, 4130, 4146, 4131, 4176, 4190, 4205, 
          4224, 4245, 4260, 4279, 4297, 4311, 4326, 4341, 4357, 4398, 
          4384, 4413, 4429, 4447, 4463, 3886, 4053, 4033, 4074, 4089, 
          4108, 4128, 4147, 4177, 4191, 4206, 4225, 4246, 4261, 4280, 
          4298, 4312, 4327, 4342, 4358, 4399, 4385, 4414, 4430, 4448, 
          4464, 4480, 4481, 4476, 4477, 4490, 4475, 4478, 4479, 4489, 
          4491, 4492, 4493, 4494, 4495, 4496, 4497, 4505, 4508, 4509, 
          4506, 4507
				].indexOf(id) == -1
			)
				return false;

      if (
        filters.comodorevsempress &&
        [
          4490, 4491, 4492, 4493, 4494, 4495, 4469, 4476, 4477, 4470, 
          4471, 4478, 4479, 4482, 4487, 4488, 4468, 4481, 4489, 4467, 
          2362, 2940, 2944, 2938, 2942, 2936, 2946, 2948, 2950, 2952, 
          3884, 3886, 4084, 4133, 4137, 4139, 4281, 4285, 4354, 4358, 
          4352, 4380, 4381, 4382, 4383, 4425, 4426, 4431, 4432, 4433, 
          4436, 4439, 4451, 4453, 4454, 4455, 4441, 4443, 4444, 4445, 
          4446, 4480
        ].indexOf(id) == -1
      )
        return false;

      if (
        filters.yamatovskaido &&
        [
          4060, 4058, 4062, 5559, 5560, 5561, 5562, 5567, 5568, 5569, 5570,
          4064, 4065, 4056, 4063, 4066, 4066, 4066, 4041, 4043, 3814, 3336,
          3338, 4044, 4045, 4046, 4047, 4053, 3877, 3878, 3889, 3896, 3430,
          3611, 3788, 3991, 4050, 4051, 4052, 4054, 4055, 4048, 4049, 3886,
          2936, 2938, 2940, 2942, 2944, 2946, 2948, 2950, 2952, 3884, 2443,
          2469, 2510, 2618, 3784, 3629, 3631, 3650, 3652, 3654, 3723, 3766,
          3809, 3850, 3852, 3870, 3891, 3898, 3908, 3910, 3944, 3948, 3959,
          3986, 3993, 3995, 3385, 3811, 3786, 3519, 5453, 5454, 5455, 5456,
          5457, 5458, 5459, 5460, 5417, 5418, 5419, 5420, 5431, 5432, 5062,
          5063, 5064, 5065, 5176, 5177, 5178, 5179, 5474, 5475, 5480, 5481,
          5482, 5483, 5543, 5544, 5545, 5546, 5437, 5438, 5439, 5440,
        ].indexOf(id) == -1
      )
        return false;
      if (
        filters.LuffyvsKaido &&
        [
          3956, 3959, 3960, 3961, 3430, 3946, 3952, 3954, 3922, 3924, 3948,
          5500, 5501, 5502, 5503, 5508, 5509, 5510, 5511, 3949, 3950, 3951,
          3894, 3903, 3887, 3877, 3878, 3889, 3896, 3880, 3881, 3882, 3883,
          3891, 3898, 3870, 3852, 3536, 3555, 3850, 3824, 3775, 3576, 3857,
          3856, 3768, 3886, 2936, 2938, 2940, 2942, 2944, 2946, 2948, 2950,
          2952, 3884, 3749, 2813, 2649, 3231, 2908, 3153, 3309, 3676, 3493,
          3495, 3674, 3519, 3433, 5453, 5454, 5455, 5456, 5457, 5458, 5459,
          5460, 5465, 5466, 5467, 5468, 5401, 5402, 5403, 5404, 5353, 5354,
          5355, 5356, 5361, 5362, 5363, 5364, 5345, 5346, 5347, 5348,
        ].indexOf(id) == -1
      )
        return false;
      if (
        filters.strawhatdiva &&
        [
          4011, 4012, 4020, 4022, 4023, 4025, 4021, 4008, 4006, 4010, 2330,
          3993, 3995, 3996, 3997, 3998, 4024, 4003, 4004, 4005, 4009, 4000,
          2936, 2938, 2940, 2942, 2944, 2946, 2948, 2950, 2952, 2749, 2758,
          2299, 2763, 3695, 3697, 3845, 3358, 3120, 3708, 3121, 3672, 3688,
          3684, 3685, 3679, 3683, 3686, 3687, 3689, 3682, 2681, 2672, 3706,
          3742, 3884, 3886, 5543, 5544, 5545, 5546, 5551, 5552, 5553, 5554,
          5445, 5446, 5447, 5448, 5425, 5426, 5427, 5428,
        ].indexOf(id) == -1
      )
        return false;
      if (
        filters.worldClash &&
        [
          253, 1041, 255, 257, 259, 979, 980, 983, 453, 455, 457, 946, 947, 948,
          1182, 1528, 1186, 1188, 1190, 1270, 1509, 1510, 1511, 1606, 451, 981,
          1184, 1272, 1512, 1607, 1222, 1276, 1278, 1602, 1608, 1700, 1798,
          1989, 2037, 1047, 1492, 1972, 447, 1268, 575, 2025, 978, 2034, 1298,
          2023, 1380, 2007, 1846, 1416, 1847, 2066, 408, 1927, 1345, 1593, 649,
          1251, 1991, 1387, 2401, 2403, 2405,
        ].indexOf(id) == -1
      )
        return false;
      if (
        filters.swordOrdeal &&
        [
          77, 255, 308, 449, 455, 530, 639, 645, 677, 750, 914, 1033, 1081,
          1125, 1129, 1173, 1182, 1186, 1188, 1175, 1230, 1234, 1236, 1238,
          1276, 1278, 1322, 1324, 1410, 1436, 1481, 1534, 1536, 1573, 1575,
          1577, 1654, 1614, 1796, 1753, 1800, 1759, 1881, 2505, 1873, 1875,
          1877, 1921, 1989, 2001, 2242, 2306, 2031, 2034, 2080, 2082, 2332,
          2185, 2189, 2117, 2119, 2107, 2336, 2338, 2346, 2372, 2338, 2371,
          2418, 2465, 2475, 2477, 2479, 2481, 2483, 2485, 2496, 2498,
        ].indexOf(id) == -1
      )
        return false;
      if (
        filters.faceoffAA &&
        [
          3324, 1126, 2771, 2769, 595, 1298, 1314, 1192, 1280, 1283, 1665, 1669,
          1713, 1826, 1849, 1764, 2023, 2025, 2405, 2039, 2041, 32, 77, 232,
          263, 306, 459, 530, 860, 804, 978, 1054, 1085, 1100, 1225, 1228, 1240,
          1281, 1282, 1316, 1318, 1380, 1416, 1590, 1595, 1707, 1778, 1780,
          1784, 1846, 1847, 1869, 1926, 1991, 1993, 2007, 2019, 2027, 2029,
          2031, 2034, 2043, 2064, 2187, 2251, 2261, 2283, 2347, 2552, 5032,
          5033, 5034, 5035, 3313, 2819, 5048, 5049, 5050, 5051, 34, 44, 59, 68,
          228, 229, 230, 265, 268, 297, 298, 299, 353, 355, 724, 770, 771, 772,
          773, 774, 775, 783, 804, 806, 840, 974, 976, 1051, 1072, 1102, 1104,
          1106, 1135, 1223, 1224, 1230, 1232, 1234, 1236, 1238, 1264, 1279,
          1320, 1322, 1324, 1382, 1392, 1397, 1399, 1417, 1418, 1423, 1469,
          1696, 1715, 1729, 2053, 2068, 1983, 5000, 5001, 5002, 5003, 2189,
          2330, 2332, 2334, 2389,
        ].indexOf(id) == -1
      )
        return false;
      if (
        filters.summerGirlsBlitz &&
        [
          2626, 2624, 2622, 2620, 2631, 2603, 2601, 5164, 5165, 5166, 5167,
          5172, 5173, 5174, 5175, 2588, 2561, 5148, 5149, 5150, 5151, 2628,
          2434, 2076, 2338, 5076, 1951, 1747, 1473, 1445, 416, 4993, 2217, 2215,
          2213, 2191, 2173, 1731, 1729, 1711, 1709, 1674, 1214, 1201, 1199,
          1194, 1161, 686, 685, 683, 681, 662, 514,
        ].indexOf(id) == -1
      )
        return false;
      if (
        filters.summerGirlsBlitz2 &&
        [
          3038, 3040, 3042, 3044, 3045, 3046, 3050, 4993, 514, 662, 681, 683,
          685, 686, 1161, 1194, 1199, 1201, 1214, 1674, 1709, 1711, 1729, 1731,
          2173, 2191, 2213, 2215, 2217, 2620, 2622, 2624, 2626, 2628, 2630,
          2774, 2776, 2835, 2837, 2895, 3009,
        ].indexOf(id) == -1
      )
        return false;
      if (
        filters.summerGirlsBlitz3 &&
        [
          3433, 3430, 3429, 3407, 3406, 3405, 3403, 3401, 3400, 3398, 3393,
          3391, 3038, 3050, 3046, 3045, 3044, 3042, 3040, 2628, 2626, 2624,
          2622, 2620, 2217, 2215, 2213, 2191, 2173, 1731, 1729, 1711, 1709,
          1674, 1214, 1201, 1199, 1194, 1161, 686, 685, 683, 681, 514, 3435,
          3431, 3434, 3436,
        ].indexOf(id) == -1
      )
        return false;
      if (
        filters.beastBlitz &&
        [
          2840, 2802, 5195, 5196, 5197, 5198, 2812, 2810, 2808, 2806, 2792,
          2789, 2787, 2780, 2778, 2776, 2774, 2709, 2707, 2782, 2785, 2815,
          2813, 2904, 2905, 2906, 2907,
        ].indexOf(id) == -1
      )
        return false;
      if (
        filters.yonkoBlitz &&
        [
          2734, 2736, 2735, 2738, 2557, 5140, 5141, 5142, 5143, 2347, 2019,
          2007, 1707, 1380, 2536, 5093, 5094, 5095, 2500, 2473, 2381, 2109,
          2700, 2387, 2690, 2197, 1268, 2302, 2504, 1980, 1016, 365, 2477, 1921,
          2097, 2525, 2707, 2534, 5086, 5087, 5088, 5089, 1922, 2001, 1751,
          2709, 2336, 1581, 2672, 1985, 5008, 5009, 5010, 5011, 1916, 2087,
          2519, 2245, 2148, 2919, 5180, 5181, 5182, 5183, 1961, 2459, 2523, 314,
          781, 1865, 312, 1043, 2609, 1982, 359, 882, 361, 1091, 1857, 1855,
          310, 2729, 1867, 831, 357, 2111, 1690, 2152, 1963, 2457,
        ].indexOf(id) == -1
      )
        return false;
      if (
        filters.wapolAssault &&
        [
          2362, 2676, 1889, 2704, 2745, 2304, 2365, 2446, 2577, 2603, 2672,
          2181, 2798, 2797, 3381, 2369, 2371, 2794,
        ].indexOf(id) == -1
      )
        return false;
      if (
        filters.warlordBlitz &&
        [
          227, 306, 750, 752, 754, 756, 760, 804, 806, 860, 865, 978, 1230,
          1232, 1234, 1236, 1238, 1298, 1316, 1318, 1320, 1322, 1324, 1595,
          1614, 1808, 1846, 1926, 1983, 5000, 5001, 5002, 5003, 5004, 1991,
          1993, 2015, 2027, 2029, 2031, 2068, 2183, 2185, 2187, 2189, 2283,
          2483, 2510, 2538, 2542, 2552, 5084, 5085, 5086, 5087, 5100, 5101,
          5102, 5103, 5124, 5125, 5126, 5127, 2583, 2605, 2618, 5168, 5169,
          5170, 5171, 2632, 2659, 2668, 2670, 2795, 5172, 5173, 5174, 5175,
          2819, 5188, 5189, 5190, 5191, 2841, 2867, 5237, 5238, 5239, 2882,
          2895, 5244, 5245, 5246, 5247, 2966, 2975, 3007, 3038, 3052, 3097,
          3098, 5268, 5269, 5270, 5271, 3100, 3104, 3106, 3157, 3171, 3172,
          3186, 3246, 3247, 3248, 3249, 1445, 1663, 1847, 1881, 2034, 2434,
          2505, 2578, 2954, 2991, 3240, 2682, 2064, 1778, 3197,
        ].indexOf(id) == -1
      )
        return false;
      if (
        filters.garpFN &&
        [
          3519, 3518, 3517, 3516, 3515, 3513, 3511, 3510, 3509, 3506, 3499,
          3497, 3496, 3495, 3493, 3481, 3498, 3508, 3175, 2797,
        ].indexOf(id) == -1
      )
        return false;
      if (
        filters.navyBlitz &&
        [3519, 3517, 3516, 3515, 3513, 3175].indexOf(id) == -1
      )
        return false;
      if (
        filters.retainersFN &&
        [
          3553, 3555, 5401, 5402, 5403, 5404, 3558, 3557, 3556, 3550, 3551,
          3559, 3543, 5393, 5394, 5395, 5396, 3536, 3534, 3532, 3519, 3430,
          3391, 3545, 3544, 3540, 3546, 3547, 3548, 3549, 3538, 3537, 3539,
          3531, 3503, 3502, 3385, 3083, 3388, 3387, 3523, 3350,
        ].indexOf(id) == -1
      )
        return false;
      if (
        filters.odenKaidoBlitz &&
        [
          3555, 5401, 5402, 5403, 5404, 3553, 3556, 3557, 3558, 3560, 3559,
          3551, 3550, 3519, 3175, 3391, 1310, 2487, 3502, 3503, 3382, 2785,
          3504, 1660, 1861, 1338, 1658, 2813, 3385, 257, 979, 2778, 3083, 3269,
          3388, 2577, 5148, 5149, 5150, 5051, 1733, 3536, 2908, 3534, 3506,
          1776, 3496, 3329, 3217, 3222, 3350,
        ].indexOf(id) == -1
      )
        return false;
      if (
        filters.forbiddenSecretFN &&
        [
          3597, 3595, 3600, 3598, 3599, 3592, 3601, 3584, 3585, 3586, 3580,
          3590, 3574, 3576, 3563, 2536, 3073, 3469, 3298, 3572, 3567, 3591,
          3579, 3498, 3577, 3578, 2117, 2323, 2342, 3458, 2240, 2244, 2367,
          3205,
        ].indexOf(id) == -1
      )
        return false;
      if (filters.typoClass) {
        var allClass = [
          "Fighter",
          "Slasher",
          "Striker",
          "Shooter",
          "Free Spirit",
          "Powerhouse",
          "Cerebral",
          "Driven",
          "Evolver",
          "Booster",
        ];
        if (unit.class.length == 3)
          if (
            allClass.indexOf(unit.class[0][0]) != -1 &&
            allClass.indexOf(unit.class[0][1]) != -1 &&
            allClass.indexOf(unit.class[1][0]) != -1 &&
            allClass.indexOf(unit.class[1][1]) != -1 &&
            allClass.indexOf(unit.class[2][0]) != -1 &&
            allClass.indexOf(unit.class[2][1]) != -1
          )
            return false;
        if (unit.class.length == 2)
          if (
            allClass.indexOf(unit.class[0]) != -1 &&
            allClass.indexOf(unit.class[1]) != -1
          )
            return false;
        if (allClass.indexOf(unit.class) != -1) return false;
      }
      var unitNum = parseInt(unit.id, 10);
      if (filters.dualUnits) {
        //if (unit.class.length != 3) return false;
        if (window.details[unitNum]) {
          if (!Object.keys(window.details[unitNum]).includes("swap"))
            return false;
        } else return false;
      }
      if (filters.vsUnits) {
        //if (unit.class.length != 2 || unit.type.length != 2)  return false;
        if (window.details[unitNum]) {
          if (
            !Object.keys(window.details[unitNum]).includes("VSSpecial")
          )
            return false;
        } else return false;
      }
      if (filters.superTypeUnits) {
        //if (unit.class.length != 2 || unit.type.length != 2)  return false;
        if (window.details[unitNum]) {
          if (
            !Object.keys(window.details[unitNum]).includes(
              "superSpecial"
            )
          )
            return false;
        } else return false;
      }
      if (filters.nodualUnits) {
        if (unit.type.length == 2) return false;
      }
      if (filters.luffyvkatakuri) {
        var evolved = !(id in window.evolutions);
        var character = window.families[unitNum];
        if (character)
          if (character.length == 2)
            var matching =
              [
                "Capone Bege",
                "Charlotte Linlin",
                "Carrot",
                "Jinbe",
                "Vinsmoke Judge",
                "Vito",
                "Gotti",
                "Charlotte Smoothie",
                "Charlotte Daifuku",
                "Tamago",
                "Charlotte Amande",
                "Caesar Clown",
                "Aladdin",
                "Charlotte Praline",
                "Charlotte Perospero",
                "Charlotte Pudding",
                "Bobbin",
                "Charlotte Opera",
                "Charlotte Chiffon",
                "Wadatsumi",
                "Charlotte Cracker",
                "Pekoms",
                "Charlotte Brûlée",
                "Charlotte Oven",
                "Pedro",
              ].indexOf(character[0]) != -1 ||
              [
                "Capone Bege",
                "Charlotte Linlin",
                "Carrot",
                "Jinbe",
                "Vinsmoke Judge",
                "Vito",
                "Gotti",
                "Charlotte Smoothie",
                "Charlotte Daifuku",
                "Tamago",
                "Charlotte Amande",
                "Caesar Clown",
                "Aladdin",
                "Charlotte Praline",
                "Charlotte Perospero",
                "Charlotte Pudding",
                "Bobbin",
                "Charlotte Opera",
                "Charlotte Chiffon",
                "Wadatsumi",
                "Charlotte Cracker",
                "Pekoms",
                "Charlotte Brûlée",
                "Charlotte Oven",
                "Pedro",
              ].indexOf(character[1]) != -1;
          else
            var matching =
              [
                "Capone Bege",
                "Charlotte Linlin",
                "Carrot",
                "Jinbe",
                "Vinsmoke Judge",
                "Vito",
                "Gotti",
                "Charlotte Smoothie",
                "Charlotte Daifuku",
                "Tamago",
                "Charlotte Amande",
                "Caesar Clown",
                "Aladdin",
                "Charlotte Praline",
                "Charlotte Perospero",
                "Charlotte Pudding",
                "Bobbin",
                "Charlotte Opera",
                "Charlotte Chiffon",
                "Wadatsumi",
                "Charlotte Cracker",
                "Pekoms",
                "Charlotte Brûlée",
                "Charlotte Oven",
                "Pedro",
              ].indexOf(character) != -1;
        if (character)
          if (character.length == 2)
            var matching2 =
              [
                "Charlotte Katakuri",
                "Charlotte Flampe",
                "Charlotte Mont-d'Or",
                "Streusen",
              ].indexOf(character[0]) != -1 ||
              [
                "Charlotte Katakuri",
                "Charlotte Flampe",
                "Charlotte Mont-d'Or",
                "Streusen",
              ].indexOf(character[1]) != -1;
          else
            var matching2 =
              [
                "Charlotte Katakuri",
                "Charlotte Flampe",
                "Charlotte Mont-d'Or",
                "Streusen",
              ].indexOf(character) != -1;
        var criteria = unit.stars >= 4 && unit.maxLevel == 99;
        var specific =
          [
            2245, 2148, 1815, 2236, 2080, 2076, 2089, 2072, 2093, 2074, 2363,
            2382,
          ].indexOf(id) != -1;
        if (!((matching2 && evolved) || (matching && criteria) || specific))
          return false;
      }
      if (filters.doffyBlitz) {
        var character = window.families[unitNum];
        var matching =
          [
            "Monkey D. Luffy",
            "Roronoa Zoro",
            "Franky",
            "Nico Robin",
            "Usopp",
            "Trafalgar Law",
            "Bartolomeo",
            "Cavendish",
            "Rob Lucci",
            "Sabo",
            "Boa Sandersonia",
            "Boa Marigold",
            "Boa Hancock",
            "Marguerite",
            "Leo",
            "Don Sai",
            "Don Chinjao",
            "Ideo",
            "Blue Gilly",
            "Suleiman",
            "Mansherry",
            "Ricky",
            "Kyros",
            "Funk Brothers",
            "Hajrudin",
            "Abdullah and Jeet",
            "Orlumbus",
            "Elizabello",
            "Bepo",
            "Sabo",
            "Dagama",
            "Jesus Burgess",
            "Diamante",
          ].indexOf(character) != -1;
        var Katacount = 0;
        var Kataclass = ["Slasher", "Striker", "Shooter", "Powerhouse"];
        if (!Array.isArray(unit.class[0])) {
          for (var i = 0; i < Kataclass.length; i++)
            if (unit.class.indexOf(Kataclass[i]) != -1) Katacount++;
        } else
          for (var i = 0; i < Kataclass.length; i++)
            if (unit.class[2].indexOf(Kataclass[i]) != -1) Katacount++;
        if (Katacount !== 2) return false;
        else if (!matching) return false;
      }
      if (filters.katakuri) {
        var Kataclass = [
          "Fighter",
          "Striker",
          "Shooter",
          "Cerebral",
          "Powerhouse",
        ];
        var vsClasses = getVsUnitClasses();
        if (vsClasses) {
          // VS unit - check if at least one variant has 2 matching classes
          var vsMatch = false;
          for (var v = 0; v < vsClasses.length; v++) {
            var vKatacount = 0;
            var vClasses = vsClasses[v];
            for (var i = 0; i < Kataclass.length; i++) {
              if (vClasses.indexOf(Kataclass[i]) != -1) vKatacount++;
            }
            if (vKatacount === 2) {
              vsMatch = true;
              break;
            }
          }
          if (!vsMatch) return false;
        } else {
          // Regular unit
          var Katacount = 0;
          var Katacount1 = 0;
          var Katacount2 = 0;
          var Katacount3 = 0;
          if (Object.prototype.toString.call(unit.class[0]) != "[object Array]") {
            for (var i = 0; i < Kataclass.length; i++)
              if (unit.class.indexOf(Kataclass[i]) != -1) Katacount++;
          } else {
            for (var i = 0; i < Kataclass.length; i++)
              if (unit.class[0].indexOf(Kataclass[i]) != -1) {
                Katacount1++;
              }
            for (var i = 0; i < Kataclass.length; i++)
              if (unit.class[1].indexOf(Kataclass[i]) != -1) {
                Katacount2++;
              }
            for (var i = 0; i < Kataclass.length; i++)
              if (unit.class[2])
                if (unit.class[2].indexOf(Kataclass[i]) != -1) {
                  Katacount3++;
                }
          }
          if (
            Katacount !== 2 &&
            Katacount1 !== 2 &&
            Katacount2 !== 2 &&
            Katacount3 !== 2
          )
            return false;
        }
      }
      if (filters.katakuriplus) {
        var Kataclass = [
          "Slasher",
          "Striker",
          "Driven",
          "Cerebral",
          "Powerhouse",
        ];
        var vsClasses = getVsUnitClasses();
        if (vsClasses) {
          // VS unit - check if at least one variant has 2 matching classes
          var vsMatch = false;
          for (var v = 0; v < vsClasses.length; v++) {
            var vKatacount = 0;
            var vClasses = vsClasses[v];
            for (var i = 0; i < Kataclass.length; i++) {
              if (vClasses.indexOf(Kataclass[i]) != -1) vKatacount++;
            }
            if (vKatacount === 2) {
              vsMatch = true;
              break;
            }
          }
          if (!vsMatch) return false;
        } else {
          // Regular unit
          var Katacount = 0;
          var Katacount1 = 0;
          var Katacount2 = 0;
          var Katacount3 = 0;
          if (Object.prototype.toString.call(unit.class[0]) != "[object Array]") {
            for (var i = 0; i < Kataclass.length; i++)
              if (unit.class.indexOf(Kataclass[i]) != -1) Katacount++;
          } else {
            for (var i = 0; i < Kataclass.length; i++)
              if (unit.class[0].indexOf(Kataclass[i]) != -1) {
                Katacount1++;
              }
            for (var i = 0; i < Kataclass.length; i++)
              if (unit.class[1].indexOf(Kataclass[i]) != -1) {
                Katacount2++;
              }
            for (var i = 0; i < Kataclass.length; i++)
              if (unit.class[2])
                if (unit.class[2].indexOf(Kataclass[i]) != -1) {
                  Katacount3++;
                }
          }
          if (
            Katacount !== 2 &&
            Katacount1 !== 2 &&
            Katacount2 !== 2 &&
            Katacount3 !== 2
          )
            return false;
        }
      }
      if (filters.katakuriv2) {
        var Kataclass = [
          "Fighter",
          "Slasher",
          "Shooter",
          "Driven",
          "Powerhouse",
        ];
        var vsClasses = getVsUnitClasses();
        if (vsClasses) {
          // VS unit - check if at least one variant has 2 matching classes
          var vsMatch = false;
          for (var v = 0; v < vsClasses.length; v++) {
            var vKatacount = 0;
            var vClasses = vsClasses[v];
            for (var i = 0; i < Kataclass.length; i++) {
              if (vClasses.indexOf(Kataclass[i]) != -1) vKatacount++;
            }
            if (vKatacount === 2) {
              vsMatch = true;
              break;
            }
          }
          if (!vsMatch) return false;
        } else {
          // Regular unit
          var Katacount = 0;
          var Katacount1 = 0;
          var Katacount2 = 0;
          var Katacount3 = 0;
          if (Object.prototype.toString.call(unit.class[0]) != "[object Array]") {
            for (var i = 0; i < Kataclass.length; i++)
              if (unit.class.indexOf(Kataclass[i]) != -1) Katacount++;
          } else {
            for (var i = 0; i < Kataclass.length; i++)
              if (unit.class[0].indexOf(Kataclass[i]) != -1) {
                Katacount1++;
              }
            for (var i = 0; i < Kataclass.length; i++)
              if (unit.class[1].indexOf(Kataclass[i]) != -1) {
                Katacount2++;
              }
            for (var i = 0; i < Kataclass.length; i++)
              if (unit.class[2])
                if (unit.class[2].indexOf(Kataclass[i]) != -1) {
                  Katacount3++;
                }
          }
          if (
            Katacount !== 2 &&
            Katacount1 !== 2 &&
            Katacount2 !== 2 &&
            Katacount3 !== 2
          )
            return false;
        }
      }
      if (filters.TMlaw) {
        var Kataclass = ["Fighter", "Slasher", "Cerebral", "Free Spirit"];
        var vsClasses = getVsUnitClasses();
        if (vsClasses) {
          // VS unit - check if at least one variant has 2 matching classes
          var vsMatch = false;
          for (var v = 0; v < vsClasses.length; v++) {
            var vKatacount = 0;
            var vClasses = vsClasses[v];
            for (var i = 0; i < Kataclass.length; i++) {
              if (vClasses.indexOf(Kataclass[i]) != -1) vKatacount++;
            }
            if (vKatacount === 2) {
              vsMatch = true;
              break;
            }
          }
          if (!vsMatch) return false;
        } else {
          // Regular unit
          var Katacount = 0;
          var Katacount1 = 0;
          var Katacount2 = 0;
          var Katacount3 = 0;
          if (Object.prototype.toString.call(unit.class[0]) != "[object Array]") {
            for (var i = 0; i < Kataclass.length; i++)
              if (unit.class.indexOf(Kataclass[i]) != -1) Katacount++;
          } else {
            for (var i = 0; i < Kataclass.length; i++)
              if (unit.class[0].indexOf(Kataclass[i]) != -1) {
                Katacount1++;
              }
            for (var i = 0; i < Kataclass.length; i++)
              if (unit.class[1].indexOf(Kataclass[i]) != -1) {
                Katacount2++;
              }
            for (var i = 0; i < Kataclass.length; i++)
              if (unit.class[2])
                if (unit.class[2].indexOf(Kataclass[i]) != -1) {
                  Katacount3++;
                }
          }
          if (
            Katacount !== 2 &&
            Katacount1 !== 2 &&
            Katacount2 !== 2 &&
            Katacount3 !== 2
          )
            return false;
        }
      }
      if (filters.sulongCarrot) {
        var Kataclass = [
          "Fighter",
          "Slasher",
          "Striker",
          "Shooter",
          "Cerebral",
        ];
        var vsClasses = getVsUnitClasses();
        if (vsClasses) {
          // VS unit - check if at least one variant has 2 matching classes
          var vsMatch = false;
          for (var v = 0; v < vsClasses.length; v++) {
            var vKatacount = 0;
            var vClasses = vsClasses[v];
            for (var i = 0; i < Kataclass.length; i++) {
              if (vClasses.indexOf(Kataclass[i]) != -1) vKatacount++;
            }
            if (vKatacount === 2) {
              vsMatch = true;
              break;
            }
          }
          if (!vsMatch) return false;
        } else {
          // Regular unit
          var Katacount = 0;
          var Katacount1 = 0;
          var Katacount2 = 0;
          var Katacount3 = 0;
          if (Object.prototype.toString.call(unit.class[0]) != "[object Array]") {
            for (var i = 0; i < Kataclass.length; i++)
              if (unit.class.indexOf(Kataclass[i]) != -1) Katacount++;
          } else {
            for (var i = 0; i < Kataclass.length; i++)
              if (unit.class[0].indexOf(Kataclass[i]) != -1) {
                Katacount1++;
              }
            for (var i = 0; i < Kataclass.length; i++)
              if (unit.class[1].indexOf(Kataclass[i]) != -1) {
                Katacount2++;
              }
            for (var i = 0; i < Kataclass.length; i++)
              if (unit.class[2])
                if (unit.class[2].indexOf(Kataclass[i]) != -1) {
                  Katacount3++;
                }
          }
          if (
            Katacount !== 2 &&
            Katacount1 !== 2 &&
            Katacount2 !== 2 &&
            Katacount3 !== 2
          )
            return false;
        }
      }
      if (filters.carrotwanda) {
        var Kataclass = [
          "Fighter",
          "Slasher",
          "Striker",
          "Cerebral",
          "Powerhouse",
        ];
        var vsClasses = getVsUnitClasses();
        if (vsClasses) {
          // VS unit - check if at least one variant has 2 matching classes
          var vsMatch = false;
          for (var v = 0; v < vsClasses.length; v++) {
            var vKatacount = 0;
            var vClasses = vsClasses[v];
            for (var i = 0; i < Kataclass.length; i++) {
              if (vClasses.indexOf(Kataclass[i]) != -1) vKatacount++;
            }
            if (vKatacount === 2) {
              vsMatch = true;
              break;
            }
          }
          if (!vsMatch) return false;
        } else {
          // Regular unit
          var Katacount = 0;
          var Katacount1 = 0;
          var Katacount2 = 0;
          var Katacount3 = 0;
          if (Object.prototype.toString.call(unit.class[0]) != "[object Array]") {
            for (var i = 0; i < Kataclass.length; i++)
              if (unit.class.indexOf(Kataclass[i]) != -1) Katacount++;
          } else {
            for (var i = 0; i < Kataclass.length; i++)
              if (unit.class[0].indexOf(Kataclass[i]) != -1) {
                Katacount1++;
              }
            for (var i = 0; i < Kataclass.length; i++)
              if (unit.class[1].indexOf(Kataclass[i]) != -1) {
                Katacount2++;
              }
            for (var i = 0; i < Kataclass.length; i++)
              if (unit.class[2])
                if (unit.class[2].indexOf(Kataclass[i]) != -1) {
                  Katacount3++;
                }
          }
          if (
            Katacount !== 2 &&
            Katacount1 !== 2 &&
            Katacount2 !== 2 &&
            Katacount3 !== 2
          )
            return false;
        }
      }
      if (filters.noFodder && Utils.isFodder(unit)) return false;
      if (filters.noFortnights && flags.fnonly) return false;
      if (filters.noRaids && flags.raid) return false;
      if (
        filters.noSpecials &&
        (flags.lrr || flags.promo || flags.special || flags.shop)
      )
        return false;
      // filter by server
      if (filters.server) {
        if (filters.server == "Global units" && !flags.global) return false;
        if (filters.server !== "Global units" && flags.global) return false;
      }
      // filter by rr pool
      if (
        (filters.rr === "Not in RR pool" && flags.rr) ||
        (filters.rr === "In RR pool" && !flags.rr)
      )
        return false;
      //filter by farmable Sockets
      if (filters.socket) {
        var farmableSocket = CharUtils.hasFarmableSocket(unitNum);
        if (
          (filters.socket === "No Farmable Sockets" && farmableSocket) ||
          (filters.socket === "Farmable Sockets" && !farmableSocket)
        )
          return false;
      }

      // filter by inkable flag
      if (filters.inkable) {
        if (filters.inkable == "Inkable" && !flags.inkable) return false;
        if (filters.inkable == "Not Inkable" && flags.inkable) return false;
      }

      // filter by active matchers
      if (filters.custom.length > 0 && !window.details.hasOwnProperty(id))
        return false;
      for (var i = 0; i < filters.custom.length; ++i) {
        if (!CharUtils.checkMatcher(filters.custom[i], id)) return false;
      }
      // filter by character log
      if (filters.noLog && characterLog.hasOwnProperty(id)) return false;
      if (filters.noMissing && !characterLog.hasOwnProperty(id)) return false;
      // filter by orb controllers
      return true;
    };

    /*****************
     * Table sorting *
     *****************/

    jQuery.fn.dataTable.ext.type.order["num-string-asc"] = function (x, y) {
      if (x && x.constructor == String) x = x == "Unknown" ? 100 : 101;
      if (y && y.constructor == String) y = y == "Unknown" ? 100 : 101;
      return x - y;
    };

    jQuery.fn.dataTable.ext.type.order["num-string-desc"] = function (x, y) {
      if (x && x.constructor == String) x = x == "Unknown" ? -100 : -101;
      if (y && y.constructor == String) y = y == "Unknown" ? -100 : -101;
      return y - x;
    };

    /***********************
     * Table configuration *
     ***********************/

    var data = Object.values(window.units)
      .filter(function (x) {
        return x.name && !x.id.includes("-");
      })
      .map(function (x, n) {
        var combinedType = x.type;
        var combinedClass = x.class;
        var combinedHp = x.maxHP;
        var combinedAtk = x.maxATK;
        var combinedRcv = x.maxRCV;
        var combinedCombo = x.combo;
        if (!x.type && x.id) {
          var variant1 = window.units[x.id + "-1"];
          var variant2 = window.units[x.id + "-2"];
          if (variant1 && variant1.type) {
            combinedType = variant2 && variant2.type
              ? variant1.type + "," + variant2.type
              : variant1.type;
            if (!combinedClass) combinedClass = variant1.class;
            if (!combinedHp) combinedHp = variant1.maxHP;
            if (!combinedAtk) combinedAtk = variant1.maxATK;
            if (!combinedRcv) combinedRcv = variant1.maxRCV;
            if (!combinedCombo) combinedCombo = variant1.combo;
          }
        }
        var result = [
          ("000" + parseInt(x.id, 10)).slice(-padding),
          x.name,
          combinedType,

          combinedClass && Array.isArray(combinedClass) ? combinedClass.join(", ") : (combinedClass || ""),
          combinedHp || 0,
          combinedAtk || 0,
          combinedRcv || 0,
          x.cost || 0,
          x.sockets || 0,
          x.stars || 0,
          "",
          parseInt(x.id, 10),
        ];
        additionalColumns.forEach(function (c, n) {
          var temp = 0;
          if (c == "HP/ATK")
            temp = Math.round((combinedHp / combinedAtk) * 100) / 100;
          else if (c == "HP/RCV")
            temp = Math.round((combinedHp / combinedRcv) * 100) / 100;
          else if (c == "ATK/RCV")
            temp = Math.round((combinedAtk / combinedRcv) * 100) / 100;
          else if (c == "ATK/CMB")
            temp = Math.round((combinedAtk / combinedCombo) * 100) / 100;
          else if (c == "ATK/cost")
            temp = Math.round((combinedAtk / x.cost) * 100) / 100;
          else if (c == "HP/cost")
            temp = Math.round((combinedHp / x.cost) * 100) / 100;
          else if (c == "CMB") temp = combinedCombo;
          else if (c == "MAX EXP") temp = x.maxEXP;
          else if (c == "Limit Break HP") temp = x.limitHP;
          else if (c == "Limit Break ATK") temp = x.limitATK;
          else if (c == "Limit Break RCV") temp = x.limitRCV;
          else if (c == "Limit Break: Expansion HP") temp = x.limitexHP;
          else if (c == "Limit Break: Expansion ATK") temp = x.limitexATK;
          else if (c == "Limit Break: Expansion RCV") temp = x.limitexRCV;
          else if (c == "Limit Break Sockets") temp = x.limitSocket;
        else if (c == "Minimum cooldown" || c == "Initial cooldown") {
            var d = window.cooldowns[x.id];
            if (!d) temp = "N/A";
            else if (c == "Minimum cooldown" && Array.isArray(d))
              temp = d[1];
            else if (c == "Initial cooldown")
              temp = Array.isArray(d) ? d[0] : d;
            else temp = "Unknown";
          } else if (
            c == "Minimum Limit Break cooldown" ||
            c == "Initial Limit Break cooldown"
          ) {
            var d = window.cooldowns[x.id];
            if (!d) temp = "N/A";
            else if (
              c == "Minimum Limit Break cooldown" &&
              Array.isArray(d)
            )
              temp = d[1] - x.limitCD;
            else if (c == "Initial Limit Break cooldown")
              temp = Array.isArray(d) ? d[0] - x.limitCD : d - x.limitCD;
            else temp = "Unknown";
          } else if (
            c == "Minimum Limit Break Expansion cooldown" ||
            c == "Initial Limit Break Expansion cooldown"
          ) {
            var d = window.cooldowns[x.id];
            if (!d) temp = "N/A";
            else if (
              c == "Minimum Limit Break Expansion cooldown" &&
              Array.isArray(d)
            )
              temp = d[1] - x.limitexCD;
            else if (c == "Initial Limit Break Expansion cooldown")
              temp =
                Array.isArray(d) ? d[0] - x.limitexCD : d - x.limitexCD;
            else temp = "Unknown";
          }
          if (
            temp &&
            temp.constructor != String &&
            !isNaN(temp) &&
            !isFinite(temp)
          )
            temp = "&#8734;";
          if (temp && temp.constructor != String && isNaN(temp)) temp = 0;
          result.splice(result.length - 2, 0, temp);
        });
        return result;
      });

    tableData = {
      columns: getTableColumns(),
      additional: additionalColumns.length,
      data: data,
      parameters: null,
      fuzzy: $storage.get("fuzzy", false),
      regexes: {},
    };

    $rootScope.table = tableData;

    $rootScope.characterLog = characterLog;
    $rootScope.showLogFilters = log.length > 0;

    $timeout(function () {
      jQuery.fn.dataTable.ext.search.push(tableFilter);
      var types = {
        Story: "Story Island",
        Fortnight: "Fortnight",
        Raid: "Raid",
        Coliseum: "Coliseum",
        Arena: "Arena",
        Treasuremap: "Treasure Map",
        Ambush: "Ambush",
        Kizuna: "Kizuna Clash",
        Piraterumble: "Pirate Rumble",
        Pirateking: "Pirate King Adventure",
        Coop: "Co-Op",
      };
      $rootScope.$watch(
        "table",
        function (table) {
          tableData = table;
          if (
            table.parameters &&
            table.parameters.filters &&
            table.parameters.filters.farmable
          ) {
            var filters = table.parameters.filters.farmable;
            farmableLocations = {};
            for (var key in types) {
              if (filters.hasOwnProperty(key) && filters[key] !== null)
                farmableLocations[types[key]] = filters[key];
            }
            if (Object.keys(farmableLocations).length === 0)
              farmableLocations = null;
          } else farmableLocations = null;
          if (table.refresh) table.refresh();
        },
        true
      );
    });

    $rootScope.$on("table.refresh", function () {
      fused = null;
    });

    $rootScope.checkLog = function () {
      var temp = [];
      for (var key in $rootScope.characterLog) {
        if ($rootScope.characterLog[key]) temp.push(parseInt(key, 10));
      }
      temp.sort(function (a, b) {
        return a - b;
      });
      $storage.set("characterLog", temp);
      $rootScope.showLogFilters = temp.length > 0;
    };
  });
})();
