(function () {
	var FODDER_REGEX = new RegExp(
		"(" +
			[
				"Group",
				"Ensign Navy HQ",
				"Armed \\w+ Unit",
				"[BM]illions Baroque",
				"Eneru's Elect",
				"Skypiea (Guard|Enforcer)",
				"(Adept|Nomad|Hunter), Shandian",
				"(Seaman|Major|Corporal) Navy",
				"Hoodlum.+Bounty Hunter",
				"Punk Black Cat Pirates",
				"Arlong crewmember",
				"Gunner|Cannoneer|Assassin Master",
				"^(Female|Giant).*(Red|Blue|Green|Yellow|Black) Pirates",
				"(Soldier|General) Zombie.*Shadow",
				"Wild Zombie",
				"Street Punk",
				"Kuja Warriors",
				"(Naginata|Rifle|Saber|Bazooka|Knuckle) (Corporal|Major)",
				"(Strong|Speedy|Crafty|Hate-Filled|Egotistical) Soldier Zombie",
				"(Powerful|Sneaky|Blazing) General Zombie",
				"(Quick-Draw|Scheming|Technical|Quick-Strike|Strong-Arm|Bold) Gunman",
				"(Suppressor|Emergency|Perimeter) Jailer",
				"(Contemplative|All-Action) Guard",
				"Fishman (Guard|Outlaw)",
				"Punk Hazard Gas Mask Patrol Soldier",
				"Punk Hazard Patrol Troop Corps",
				"Donquixote Pirates Member",
				"(Tactical|Elite) Musketeers",
				"(Fighter Group|Reconnaissance Group|Electro Group), Guardians",
				"Germa Kingdom Clone Soldier",
				"Soul Homie",
				"Chess Mercenaries",
				"Wano Country Official",
			].join(")|(") +
			")",
		"i"
	);

	var utils = {};

	var fullNames = null,
		reverseEvoMap = null,
		reverseFamilyMap = null;

	/* * * * * Unit control * * * * */

	var parseUnit = function (element, id) {
		var piratefest = window.rumble[id];

		// If multi-dimensional array (i.e. VS units), split into two
		if (piratefest && piratefest.character1) {
			var piratefest2 = piratefest.character2;
			piratefest = piratefest.character1;
		}

		var limitHealth = element.maxHP,
			limitAttack = element.maxATK,
			limitRecovery = element.maxRCV,
			limitCooldown = 0,
			limitSockets = element.sockets;
		var limitexHealth = element.maxHP,
			limitexAttack = element.maxATK,
			limitexRecovery = element.maxRCV,
			limitexCooldown = 0,
			limitexSockets = element.sockets;
		var keylevel = 0;
		var LBhp = [],
			LBatk = [],
			LBrcv = [],
			LBsailor = [0],
			LBcaptain = [0];
		var LLBsailor = [0],
			LLBcaptain = [0],
			LLBspecial = [0];
		var LLBsailors = 0,
			LLBcaptains = 0,
			LLBspecials = 0;
		var LBhptotal = 0,
			LBatktotal = 0,
			LBrcvtotal = 0,
			LBsailors = 0,
			LBcaptains = 0;

		if (window.details && window.details[id] && window.details[id].limit) {
			var unitDetails = window.details[id];
			keylevel = Object.keys(unitDetails.limit).length;
			for (var x in unitDetails.limit) {
				if (unitDetails.limit[x].description.includes("LOCKED WITH KEY")) {
					keylevel = x;
				}
			}

			for (var x in unitDetails.limit) {
				if (parseInt(x) < keylevel) {
					if (unitDetails.limit[x].description.includes("Boosts base HP by ")) {
						limitHealth += parseInt(unitDetails.limit[x].description.substring(18), 10);
					}
					if (unitDetails.limit[x].description.includes("Boosts base ATK by ")) {
						limitAttack += parseInt(unitDetails.limit[x].description.substring(19), 10);
					}
					if (unitDetails.limit[x].description.includes("Boosts base RCV by ")) {
						limitRecovery += parseInt(unitDetails.limit[x].description.substring(19), 10);
					}
					if (unitDetails.limit[x].description.includes("Reduce base Special Cooldown by ")) {
						limitCooldown += parseInt(unitDetails.limit[x].description.substring(32, 33), 10);
					}
					if (unitDetails.limit[x].description.includes("additional Socket slot")) {
						limitSockets += parseInt(unitDetails.limit[x].description.substring(8, 9), 10);
					}
				}

				if (unitDetails.limit[x].description.includes("Boosts base HP by ")) {
					limitexHealth += parseInt(unitDetails.limit[x].description.substring(18), 10);
					LBhptotal += parseInt(unitDetails.limit[x].description.substring(18), 10);
				}
				if (unitDetails.limit[x].description.includes("Boosts base ATK by ")) {
					limitexAttack += parseInt(unitDetails.limit[x].description.substring(19), 10);
					LBatktotal += parseInt(unitDetails.limit[x].description.substring(19), 10);
				}
				if (unitDetails.limit[x].description.includes("Boosts base RCV by ")) {
					limitexRecovery += parseInt(unitDetails.limit[x].description.substring(19), 10);
					LBrcvtotal += parseInt(unitDetails.limit[x].description.substring(19), 10);
				}
				if (unitDetails.limit[x].description.includes("Reduce base Special Cooldown by ")) {
					limitexCooldown += parseInt(unitDetails.limit[x].description.substring(32, 33), 10);
				}
				if (unitDetails.limit[x].description.includes("additional Socket slot")) {
					limitexSockets += parseInt(unitDetails.limit[x].description.substring(8, 9), 10);
				}
				if (unitDetails.limit[x].description.includes("Acquire Sailor Ability")) {
					LBsailors++;
					if (!unitDetails.sailor) unitDetails.sailor = {};
					if (unitDetails.sailor.constructor == String) {
						unitDetails.sailor = { base: unitDetails.sailor };
					}
					unitDetails.sailor["level" + LBsailors.toString()] =
						unitDetails.sailor["level" + LBsailors.toString()] ||
						unitDetails.limit[x].description.substring(26);
				}
				if (unitDetails.limit[x].description.includes("Acquire new Captain Ability")) {
					LBcaptains++;
					if (unitDetails.captain.constructor == String) {
						unitDetails.captain = { base: unitDetails.captain };
					}
					unitDetails.captain["level" + LBcaptains.toString()] =
						unitDetails.captain["level" + LBcaptains.toString()] ||
						unitDetails.limit[x].description.substring(29);
				}
				LBhp.push(LBhptotal);
				LBatk.push(LBatktotal);
				LBrcv.push(LBrcvtotal);
				LBsailor.push(LBsailors);
				LBcaptain.push(LBcaptains);
			}
		}

		if (window.details && window.details[id] && window.details[id].lLimit) {
			var unitDetails = window.details[id];
			for (var x in unitDetails.lLimit) {
				if (unitDetails.lLimit[x]) {
					if (unitDetails.lLimit[x].captain) {
						if (unitDetails.captain.constructor == String) {
							unitDetails.captain = { base: unitDetails.captain };
						}
						var keys = Object.entries(unitDetails.lLimit[x].captain);
						keys.forEach(([key, value]) => {
							unitDetails.captain["llb" + key] = value;
							LLBcaptains++;
						});
					}
					if (unitDetails.lLimit[x].sailor) {
						if (unitDetails.sailor.constructor == String) {
							unitDetails.sailor = { base: unitDetails.sailor };
						}
						var keys = Object.entries(unitDetails.lLimit[x].sailor);
						keys.forEach(([key, value]) => {
							unitDetails.sailor["llb" + key] = value;
							LLBsailors++;
						});
					}
					if (unitDetails.lLimit[x].special) {
						if (!unitDetails.special || unitDetails.special.constructor == String || Array.isArray(unitDetails.special)) {
							unitDetails.special = { base: unitDetails.special };
						}
						var keys = Object.entries(unitDetails.lLimit[x].special);
						keys.forEach(([key, value]) => {
							unitDetails.special["llb" + key] = value;
							LLBspecials++;
						});
					}
				}
				LLBsailor.push(LLBsailors);
				LLBcaptain.push(LLBcaptains);
				LLBspecial.push(LLBspecials);
			}
		}

		var growthHP = 1, growthATK = 1, growthRCV = 1;
		if (typeof element.growth === 'number') {
			growthHP = element.growth;
			growthATK = element.growth;
			growthRCV = element.growth;
		} else if (element.growth && typeof element.growth === 'object') {
			growthHP = element.growth.hp || 1;
			growthATK = element.growth.atk || 1;
			growthRCV = element.growth.rcv || 1;
		}

		var result = {
			id: element.id,
			name: element.name,
			type: element.type,
			class: element.class,
			tag: window.tags[element.id],
			stars: element.stars,
			cost: element.cost,
			combo: element.combo,
			sockets: element.sockets,
			maxLevel: element.maxLevel,
			maxEXP: element.maxEXP,
			minHP: element.minHP,
			minATK: element.minATK,
			minRCV: element.minRCV,
			maxHP: element.maxHP,
			maxATK: element.maxATK,
			maxRCV: element.maxRCV,
			llbmaxHP: Math.max(element.maxHP, Math.round(element.maxHP * 1.5)),
			llbmaxATK: Math.max(element.maxATK, Math.round(element.maxATK * 1.5)),
			llbmaxRCV: Math.max(element.maxRCV, Math.round(element.maxRCV * 1.5)),
			limitHP: limitHealth,
			limitATK: limitAttack,
			limitRCV: limitRecovery,
			limitSocket: limitSockets,
			limitCD: limitCooldown,
			limitexHP: limitexHealth,
			limitexATK: limitexAttack,
			limitexRCV: limitexRecovery,
			limitexSocket: limitexSockets,
			limitexCD: limitexCooldown,
			growth: {
				hp: growthHP,
				atk: growthATK,
				rcv: growthRCV,
			},
			number: id,
			limitStats: {
				hp: LBhp,
				atk: LBatk,
				rcv: LBrcv,
				sailors: LBsailor,
				captains: LBcaptain,
			},
			llimitStats: {
				sailors: LLBsailor,
				captains: LLBcaptain,
				specials: LLBspecial,
			},
			pirateFest: {
				class: piratefest ? piratefest.festStats.style : "",
				DEF: piratefest ? piratefest.festStats.def : null,
				SPD: piratefest ? piratefest.festStats.spd : null,
				minCP: null,
				maxCP: null,
			},
			pirateFest2: !piratefest2 ? null : {
				class: piratefest2 ? piratefest2.festStats.style : "",
				DEF: piratefest2 ? piratefest2.festStats.def : null,
				SPD: piratefest2 ? piratefest2.festStats.spd : null,
				minCP: null,
				maxCP: null,
			},
			aliases: window.aliases && window.aliases[id] ? window.aliases[id].join(" ") : "",
			families: (window.families && window.families[id] && window.families[id].map(utils.normalizeText)) || null,
			support: (window.details && window.details[id] && window.details[id].support) || null,
		};
		return result;
	};

	utils.parseUnits = function () {
		const processedUnits = {};
		Object.keys(window.units).forEach(function(key) {
			const unit = window.units[key];
			processedUnits[key] = parseUnit(unit, parseInt(key));
		});
		window.units = processedUnits;
	};

	utils.getFullUnitName = function (id) {
		if (fullNames === null) {
			fullNames = {};
			Object.keys(window.units).forEach(function(key) {
				const unit = window.units[key];
				if (!unit.name) return null;
				let fullName = unit.name;
				if (window.aliases && window.aliases[unit.id])
					fullName += ", " + window.aliases[unit.id].join(", ");
				if (window.families && window.families[unit.id])
					fullName += ", " + window.families[unit.id].join(", ");
				fullNames[unit.id] = fullName;
			});
		}
		return fullNames[id] && utils.normalizeText(fullNames[id]);
	};

	/**
	 * Transforms a list of characters or types and classes from supported
	 * characters or super special criteria into a query using family, type,
	 * class, and cost operators.
	 * @example
	 * // returns 'type:STR class:Free_Spirit'
	 * Utils.generateCriteriaQuery('[STR] Free Spirit')
	 * @example
	 * // returns 'family:^(Daz_Bones|Nico_Robin|Bentham)$ notFamily:^(Crocodile|Mr._0)$'
	 * Utils.generateCriteriaQuery('Daz Bones (Mr. 1), Nico Robin and Bentham (Mr. 2 Bon Clay)', window.families[1616])
	 * @example
	 * // returns 'cost<=29 notFamily:^(Sengoku)$'
	 * Utils.generateCriteriaQuery('Characters with cost 29 or less', window.families[459])
	 * @param {string} criteria - string that could be a list of families supported,
	 * types and/or classes supported, or character cost supported. Should NOT
	 * include "All characters", "characters" at the end, or "must consist of", etc.
	 * @param {string[]} [supportingFamilies] - array of family names of the
	 * supporting unit. If provided, a `notFamily:` query will be included in
	 * the result
	 * @param {boolean} [returnParamsObject=false] - if true, this will return an object
	 * similar to what `Utils.generateSearchParameters` returns, so that it will
	 * not be necessary to parse the query.
	 * @returns {string|object} search query that filters for the units supported.
	 * This can be of the forms `family:^(Monkey_D._Luffy|Nami)$`, `type:STR|QCK`,
	 * `class:Free_Spirit|Powerhouse`, `cost<=29`, or combinations of them. This
	 * can also be an object of search parameters if `returnParamsObject` is true.
	 */
	utils.generateCriteriaQuery = function (
		criteria,
		supportingFamilies = [],
		returnParamsObject = false
	) {
		let families = [];
		let types = [];
		let classes = [];
		let tags = [];
		let matchers = [];
		let params = { matchers: {} };
		let whitespaceRegex = /\s+/g;
		let aliasesRegex = /\s+\(.*?\)/g; // Denjiro (Kyoshiro)
		let specialCharactersRegex = /[*+?^${}()|[\]\\]/g; //except dot, no need to escape
		let costRegex = /characters with cost (\d+) or (less|more)/i;
		let typeRegex = /\[(STR|DEX|QCK|PSY|INT)\]/i;
		let classRegex = /(?:Fighter|Slasher|Striker|Shooter|Free Spirit|Powerhouse|Cerebral|Driven)/i;
		let tagRegex = /\[((?!STR]|DEX]|QCK]|PSY]|INT])[^\]]+)\]/i;

		// may be "and" or ", and" or ", " even with extra whitespace
		// if using .split(), you should use non-capturing groups (?:)
		let separatorRegex = /(?:\s*,\s*|\s+)(?:and|or)\s+|\s*,\s*|\/|:\s*/g;

		let costMatch = criteria.match(costRegex);
		if (costMatch) {
			let op = costMatch[2] == "less" ? "<=" : ">=";
			let value = costMatch[1];
			matchers.push("cost" + op + value);
			if (returnParamsObject) {
				params.ranges = {
					cost: [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY],
				};

				if (op === "=") {
					params.ranges["cost"][0] = value;
					params.ranges["cost"][1] = value;
				} else if (op === "<") {
					params.ranges["cost"][1] = value - 1;
				} else if (op === "<=") {
					params.ranges["cost"][1] = value;
				} else if (op === ">") {
					params.ranges["cost"][0] = value + 1;
				} else if (op === ">=") {
					params.ranges["cost"][0] = value;
				};
			};
		} else {
			criteria = criteria.replace(aliasesRegex, "");
			let terms = criteria.split(separatorRegex);
			for (let term of terms) {
				let typeMatch = term.match(typeRegex);
				let classMatch = term.match(classRegex);
				let tagMatch = term.match(tagRegex);
				
				if (typeMatch || classMatch || tagMatch) {
					if (typeMatch) types.push(typeMatch[1]);
					if (classMatch) classes.push(classMatch[0]);
					if (tagMatch) tags.push(tagMatch[1]);
				} else {
					families.push(term.replace(specialCharactersRegex, "\\$&")); // escape special characters before pushing (except dot)
				};
			};
		};

		// Create matchers
		if (families.length > 0) {
			// family should be exact match
			params.matchers.family =
				"^(" + families.join("|").replace(whitespaceRegex, "_") + ")$";
			matchers.push("family:" + params.matchers.family);
		};
		if (types.length > 0) {
			params.matchers.type = types.join("|").replace(whitespaceRegex, "_");
			matchers.push("type:" + params.matchers.type);
		};
		if (classes.length > 0) {
			// check if supported characters require both classes
			let split = criteria.split(classRegex);
			if (split.length === 3 && split[1] === "/") params.matchers.class = classes.join(",").replace(whitespaceRegex, "_");
			else params.matchers.class = classes.join("|").replace(whitespaceRegex, "_");
			matchers.push("class:" + params.matchers.class);
		};
		if (tags.length > 0) {
			params.matchers.tag = tags.join("|").replace(whitespaceRegex, "_");
			if (families.length > 0) matchers.push("|tag:" + params.matchers.tag);
			else matchers.push("tag:" + params.matchers.tag);
		};
		if (supportingFamilies && supportingFamilies.length > 0) {
			params.matchers.notfamily =
				utils.generateFamilyExclusionQuery(supportingFamilies);
			matchers.push(params.matchers.notfamily);
		};

		if (returnParamsObject) {
			if (params.matchers.notfamily)
				params.matchers.notfamily = params.matchers.notfamily.replace(
					/^notFamily:/,
					""
				);
			for (let key in params.matchers)
				params.matchers[key] = new RegExp(
					params.matchers[key].replace(/_/g, " "),
					"i"
				);
			return params;
		} else {
			return matchers.join(" ");
		};
	};

	/**
	 * Wrapper function for `Utils.generateCriteriaQuery` that will convert the
	 * given `criteria` to a compatible format. If "All characters" is passed
	 * as a criteria, no query (null) will be returned as you should not need
	 * any query for that. This will also strip the trailing " characters", for
	 * supports like "[PSY] characters".
	 * @param {string} criteria - the support criteria given by
	 * window.details[i].support[0].Characters
	 * @param {string[]} [supportingFamilies] - the families of the supporting
	 * unit, which should not be included in the search results, so a
	 * `notFamily:` query will be generated for it.
	 * @param {boolean} [returnParamsObject=false] - if true, this will return an object
	 * similar to what `Utils.generateSearchParameters` returns, so that it will
	 * not be necessary to parse the query.
	 * @returns {string|null|object} a usable query that can be used to search for all
	 * supported characters, or the search parameters   if `returnParamsObject` is true.
	 */
	utils.generateSupportedCharactersQuery = function (
		criteria,
		supportingFamilies = [],
		returnParamsObject = false
	) {
		if (/^All characters?/i.test(criteria)) return null;
		return utils.generateCriteriaQuery(
			criteria.replace(/ characters?$/i, ""),
			supportingFamilies,
			returnParamsObject
		);
	};

	/**
	 * Wrapper function for `Utils.generateCriteriaQuery` for `superSpecialCriteria`
	 * that will convert the given `criteria` to a compatible format. If
	 * "All characters" is passed as a criteria, no query (null) will be returned
	 * as you should not need any query for that. This will also strip the
	 * trailing " characters", for descriptions like "[PSY] characters". This will
	 * also take only superSpecialCriteria that match "must consist of <family names>,
	 * excluding support members", or "must consist of <number> <class or type>
	 * characters, excluding support members".
	 * @param {string} criteria - the support criteria given by
	 * window.details[i].support[0].Characters
	 * @param {string[]} [supportingFamilies] - the families of the unit with
	 * a super special, which should not be included in the search results, so a
	 * `notFamily:` query will be generated for it.
	 * @param {boolean} [returnParamsObject=false] - if true, this will return an object
	 * similar to what `Utils.generateSearchParameters` returns, so that it will
	 * not be necessary to parse the query.
	 * @returns {string|null|object} a usable query that can be used to search for
	 * characters fulfilling the `superSpecialCriteria`, or the search parameters
	 * if `returnParamsObject` is true.
	 */
	utils.generateSuperSpecialQuery = function (
		criteria,
		supportingFamilies = [],
		returnParamsObject = false
	) {
		// for cases like "must consist of 6 Powerhouse or Driven characters, excluding Support members.",
		// this will create `class:Powerhouse|Driven`

		// for cases like "must consist of Monkey D. Luffy, Dracule Mihawk, Ben Beckman, Yasopp or Lucky Roux, excluding Support members.",
		// this will create `family:^(Monkey_D._Luffy|Dracule_Mihawk|Ben_Beckman|Yasopp|Lucky_Roux)$`

		// 3609: `must consist of 6 Striker characters or King, Queen, Jack, Sasaki, X Drake, Black Maria, Who's-Who, Page One, Ulti, or Charlotte Linlin (Big Mom), excluding Support members.`
		// for now, just ignore the `6 Striker characters` condition IF it there are family names succeeding it,
		// since you can have non-Striker Jack teams
		// idea: return an array of queries, so that there will be multiple "Search for these characters" links,
		// depending on the conditions (so that one will handle the `6 Striker characters`,
		// the other will handle the family names.)
		let charactersRegex =
			/must consist of (?:any \d(?: or \d)?|all) of the following, excluding Supports(?: and counting only 1 per unit)?\: (?:(?:\d )?(.*?)characters(?: or )?)?(.*)?/i;
		let match = criteria.match(charactersRegex);
		if (!match) return null;
		// prioritize family names. if there are no family names (match[2] is null|undefined), use the classes/types condition.
		var criteriaTrimmed = (match[2] || match[1]).trim();
		return utils.generateCriteriaQuery(criteriaTrimmed, supportingFamilies);
	};

	utils.generateSuperTandemQuery = function (
		criteria,
		supportingFamilies = [],
		returnParamsObject = false
	) {
		// for cases like "must consist of 6 Powerhouse or Driven characters, excluding Support members.",
		// this will create `class:Powerhouse|Driven`

		// for cases like "Any X of the following: King, Queen, Jack, Sasaki, X Drake, Black Maria, Who's-Who, Page One, Ulti or Striker characters. One of King, Queen, Jack, Sasaki, X Drake, Black Maria, Who's-Who, Page One or Ulti is required.",
		// this will create `family:^(King|Queen|Jack|Sasaki|X_Drake|Black_Maria|Who's-Who|Page_One|Ulti|Striker_characters)$`

		// 3609: `Any X of the following: King, Queen, Jack, Sasaki, X Drake, Black Maria, Who's-Who, Page One, Ulti or Striker characters.`
		// The trailing "Striker characters" is not handled properly as of now
		// idea: return an array of queries, so that there will be multiple "Search for these characters" links,
		// depending on the conditions (so that one will handle the `Striker characters`,
		// the other will handle the family names.)
		let charactersRegex =
			/of the following, excluding Supports and counting only 1 per unit\: (?!.+:)(?:\d (.*?)characters(?: or )?)?(.*)?/i;
		let match = criteria.match(charactersRegex);
		if (!match) return null;
		// prioritize family names. if there are no family names (match[2] is null|undefined), use the classes/types condition.
		var criteriaTrimmed = (match[2] || match[1]).trim();

		return utils.generateCriteriaQuery(criteriaTrimmed, supportingFamilies);
	};

	utils.generateAttachableSupportsQuery = function (
		unitIdToSupport,
		supportingFamilies = []
	) {
		return "supports:" + unitIdToSupport;
	};

	/**
	 * Will generate a `notFamily:` query so that the supporting unit's families
	 * will not be included in the filtered search results.
	 * @example
	 * // returns 'notFamily:^(Monkey_D._Luffy|Roronoa_Zoro|Nami|Usopp|Vinsmoke_Sanji)$'
	 * Utils.generateFamilyExclusionQuery(window.families[2875]); // can also use array literals
	 * @param {string[]} families - Array of family names of the supporting unit.
	 * @returns {string|null} A `notFamily:` query to be used in the search.
	 */
	utils.generateFamilyExclusionQuery = function (families) {
		if (!families) return null;
		let specialCharactersRegex = /[*+?^${}()[\]\\]/g; // except dot and pipe "|"
		let query =
			"notFamily:^(" +
			families
				.join("|")
				.replace(/\s+/g, "_")
				.replace(specialCharactersRegex, "\\$&") +
			")$";
		return query;
	};

	/**
	 * Replaces letters with diacritics into the more common letters. Used for parsing
	 * and matching search terms, so that users won't have to type exact diacritics.
	 * @example
	 * // returns 'Brulee'
	 * Utils.normalizeText('Brûlée');
	 * @param {string} str String to normalize
	 * @returns {string} String without diacritics
	 */
	utils.normalizeText = function (str) {
		return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	};

	/**
	 * @param {string} family Family name used in window.families.
	 * @returns {Array|null} Array of unit ids that has the given family, or null if the family is not found.
	 */
	utils.getUnitsInFamily = function (family) {
		return utils.getReverseFamilyMap()[family] || null;
	};

	/* * * * * Thumbnail control * * * * */

	/**
	 *
	 * @param {number|string} n Unit ID, evolver ID (e.g., "3828-skull", "4439-PSY"),
	 *      skull type (e.g., "skullSTR"), or null.
	 * @param {string} relPathToRoot Relative path to the root folder (folder
	 *      containing 'characters', 'common', 'damage', etc), which allows the urls to work even
	 *      in setups where the root folder is not necessarily the root in terms of the url.
	 *      Will only be used for resources that are stored in the repo.
	 * @returns {object} Object with {jap, glo} URL properties
	 */
	utils.getThumbnailUrl = function (n, relPathToRoot = "") {
		if (n === null || n === undefined) {
			var noimagePath = relPathToRoot + "/api/images/common/noimage.png";
			return { jap: noimagePath, glo: noimagePath };
		}

		if (typeof n === "string") {
			var basePath = relPathToRoot + "/api/images/thumbnail/";

			if (n.startsWith("skull")) {
				var skullPath = relPathToRoot + "/api/images/common/skull-" + n.substring(5) + ".png";
				return { jap: skullPath, glo: skullPath };
			}

			var skullMatch = n.match(/^(\d+)-skull$/);
			if (skullMatch) {
				var unitId = parseInt(skullMatch[1], 10);
				var folder = Math.trunc(unitId / 1000) + "/" + Math.trunc((unitId % 1000) / 100) + "00";
				return {
					jap: basePath + "jap/" + folder + "/" + n + ".png",
					glo: basePath + "glo/" + folder + "/" + n + ".png"
				};
			}

			var variantMatch = n.match(/^(\d+)-(STR|QCK|PSY|DEX|INT)$/);
			if (variantMatch) {
				var unitId = parseInt(variantMatch[1], 10);
				var folder = Math.trunc(unitId / 1000) + "/" + Math.trunc((unitId % 1000) / 100) + "00";
				return {
					jap: basePath + "jap/" + folder + "/" + n + ".png",
					glo: basePath + "glo/" + folder + "/" + n + ".png"
				};
			}
		}

		var id = ("0000" + n).slice(-4);
		var basePath = relPathToRoot + "/api/images/thumbnail/";
		var folder = Math.trunc(n / 1000) + "/" + Math.trunc((n % 1000) / 100) + "00";

		return {
			jap: basePath + "jap/" + folder + "/" + id + ".png",
			glo: basePath + "glo/" + folder + "/" + id + ".png"
		};
	};

	/**
	 * Function to get the url for the big thumbnail (the one shown upon checking the details of a unit)
	 * @param {number} n 1-based ID number of the unit.
	 * @param {string} relPathToRoot Relative path to the root folder.
	 * @returns The URL of the big thumbnail
	 */
	utils.getBigThumbnailUrl = function (n, relPathToRoot = "") {
		var id = ("0000" + n).slice(-4);
		var folder = Math.trunc(n / 1000) + "/" + Math.trunc((n % 1000) / 100) + "00";
		return relPathToRoot + "/api/images/full/transparent/" + folder + "/" + id + ".png";
	};

	utils.getThumbnailTitle = function (arg) {
		if (arg === null || arg === undefined) return null;
		if (arg.constructor == Object) {
			return [
				arg.name,
				"HP: " + arg.hp,
				"ATK: " + arg.atk,
				"RCV: " + arg.rcv,
				"CMB: " + arg.cmb,
			].join("\n");
		}
		var unit = arg.constructor == Object ? arg : window.units[String(arg)];
		return [
			unit.name,
			"HP: " + unit.maxHP,
			"ATK: " + unit.maxATK,
			"RCV: " + unit.maxRCV,
			"CMB: " + unit.combo,
			"Cost: " + unit.cost,
		].join("\n");
	};

	utils.isClickOnOrb = function (e, target) {
		var x = e.offsetX,
			y = e.offsetY;
		var distance = Math.sqrt(Math.pow(x - 20, 2) + Math.pow(y - 21, 2));
		return distance < 13;
	};

	/* * * * * Misc functions * * * * */

	/* given an array of arrays, generates the cartesian product of
	 * all the arrays contained within the root array
	 * eg f([[1],[2,3],[4,5,6]]) -> [[1,2,4],[1,2,5],[1,2,6],[1,3,4],[1,3,5],[1,3,6]] */
	utils.arrayProduct = function (data) {
		var result = data.reduce(
			function (prev, next) {
				if (next.length === 0) return prev;
				return next
					.map(function (n) {
						return prev.map(function (p) {
							return p.concat([n]);
						});
					})
					.reduce(function (prev, next) {
						return prev.concat(next);
					}, []);
			},
			[[]]
		);
		return result.filter(function (r) {
			return r.length > 0;
		});
	};

	utils.getOppositeType = function (type) {
		if (!type) return null;
		type = type.toUpperCase();
		if (type == "STR") return "QCK";
		if (type == "QCK") return "DEX";
		if (type == "DEX") return "STR";
		if (type == "PSY") return "INT";
		return "PSY";
	};

	/* * * * * Searching/filtering * * * * */

	utils.getRegex = function (query) {
		try {
			return new RegExp(query, "i");
		} catch (e) {
			return new RegExp(
				query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"),
				"i"
			);
		}
	};

	utils.generateSearchParameters = function (query) {
		if (!query || query.trim().length < 2) return null;
		if (/^\d+$/.test(query)) {
			var n = parseInt(query, 10);
			if (n > 0 && n <= Object.keys(window.units).length) query = "id=" + query;
		}
		query = utils.normalizeText(query.toLowerCase().trim());
		var result = { matchers: {}, ranges: {}, query: [], queryTerms: [] };
		var ranges = {},
			params = [
				"hp",
				"atk",
				"stars",
				"cost",
				"growth",
				"rcv",
				"id",
				"sockets",
				"combo",
				"exp",
				"minCD",
				"maxCD",
			];
		var regex = new RegExp(
			"^((type|class|tag|family|notfamily|supports|units):(.+)|(" +
				params.join("|") +
				")(>|<|>=|<=|=)([-?\\d.]+))$",
			"i"
		);
		const typeRegex = /^(?:str|dex|qck|psy|int)$/;
		var tokens = query.replace(/&|\//g, " ").split(/\s+/);
		tokens.forEach(function (x) {
			x = x.replace(/_+/g, " ");
			var temp = x.match(regex);
			if (!temp) {
				// if it couldn't be parsed, treat it as string
				if (typeRegex.test(x)) {
					// if string is a unit type, treat it as `type:X`
					result.matchers["type"] = new RegExp(x, "i");
				} else {
					result.query.push(x);
					result.queryTerms.push(utils.getRegex(x));
				}
			} else if (temp[4] !== undefined) {
				// numeric operator
				var parameter = temp[4],
					op = temp[5],
					value = parseFloat(temp[6], 10);
				if (!result.ranges.hasOwnProperty(parameter)) {
					if (op === ">" || op === ">=") {
						result.ranges[parameter] = [0, Number.POSITIVE_INFINITY];
					} else if (op === "<" || op === "<=") {
						result.ranges[parameter] = [Number.NEGATIVE_INFINITY, 0];
					} else {
						result.ranges[parameter] = [
							Number.NEGATIVE_INFINITY,
							Number.POSITIVE_INFINITY,
						];
					}
				}
				if (op === "=") {
					result.ranges[parameter][0] = value;
					result.ranges[parameter][1] = value;
				} else if (op === "<") {
					result.ranges[parameter][1] = value - 1;
				} else if (op === "<=") {
					result.ranges[parameter][1] = value;
				} else if (op === ">") {
					result.ranges[parameter][0] = value + 1;
				} else if (op === ">=") {
					result.ranges[parameter][0] = value;
				}
			} else {
				// matcher (string operators)
				if (
					["supports", "units"].includes(temp[2]) &&
					/^[\d|]+$/.test(temp[3])
				) {
					// allow only IDs and `|` for a separator
					// split by `|` and make sure no empty elements are pushed
					let ids = temp[3]
						.split(/\|+/)
						.filter((x) => x.length > 0)
						.map(Number);
					if (ids.length == 0) return;
					if (!result.matchers[temp[2]]) result.matchers[temp[2]] = [];

					result.matchers[temp[2]].push(...ids);
				} else {
					result.matchers[temp[2]] = new RegExp(temp[3], "i");
				}
				//console.log(result.matchers); //Here for stuff to try to do custom
			}
		});
		if (result.query.length > 0) result.query = result.query.join(" ");
		else result.query = null;
		return result;
	};

	/**
	 * Checks a unit against a set of parameters generated by `Utils.generateSearchParameters`.
 	 * Fuzzy search is not supported on this function. To implement fuzzy search, filter
 	 * with fuzzy search first, then remove `queryTerms` from `searchParameters` before
 	 * passing it into this function.
 	 * @param {object|number} unit - Unit object to check. Get it from `window.units`.
 	 * If a number is given, it will be converted to string and used as the lookup key.
 	 * @param {object} searchParameters - Object returned by `Utils.generateSearchParameters`
 	 * @returns {boolean} True if given unit matches all parameters
 	 */
	utils.checkUnitMatchSearchParameters = function (unit, searchParameters) {
		if (typeof unit === "number" && isFinite(unit))
			unit = window.units[String(unit)];

		// filter by matchers (string operators)
		for (let matcher in searchParameters.matchers) {
			let regex = searchParameters.matchers[matcher];
			if (matcher === "family") {
				if (
					!(unit.families && unit.families.some((family) => regex.test(family)))
				) {
					return false;
				}
			} else if (matcher === "notfamily") {
				if (
					unit.families &&
					unit.families.some((family) => regex.test(family))
				) {
					return false;
				}
			} else if (matcher === "supports") {
				let ids = regex; // `regex` is an array of IDs here
				if (!ids.some((id) => utils.canSupportUnit(id, unit))) return false;
			} else if (matcher === "units") {
				let ids = regex; // `regex` is an array of IDs here
				if (!ids.some((id) => id == unit.id)) return false;
			} else if (!regex.test(unit[matcher])) {
				return false;
			}
		}

		// filter by ranges (numeric operators)
		for (let range in searchParameters.ranges) {
			let stat;
			range = range.toLowerCase();

			if (range == "id") {
				stat = parseInt(unit.id, 10);
			} else if (range == "mincd" || range == "maxcd") {
				stat = window.cooldowns[unit.id];
				if (stat) stat = stat[range == "mincd" ? 0 : 1];
			} else {
				stat = unit[range] || unit[range] || unit["max" + range.toUpperCase()];
			}

			if (
				stat === null ||
				stat === undefined ||
				stat < searchParameters.ranges[range][0] ||
				stat > searchParameters.ranges[range][1]
			) {
				return false;
			}
		}

		// filter by queryTerms
		if (searchParameters.queryTerms && searchParameters.queryTerms.length > 0) {
			let name = Utils.getFullUnitName(unit.id);
			// make sure all terms match
			if (!searchParameters.queryTerms.every((term) => term.test(name))) {
				return false;
			}
		}
		return true;
	};

	/**
	 * Returns true if the supporting unit can support the given unit by
	 * recreating the query generated by "Search for supported characters" for
	 * `supportingUnit`.
	 * @param {number|object} unitToSupport - 1-based ID of the unit to support
	 * or the object from window.units[id]
	 * @param {number|object} supportingUnit - 1-based ID of the supporting unit
	 * or the object from window.units[id]
	 * @returns {boolean} true if the supporting unit can support the given unit.
	 */
	utils.canSupportUnit = function (unitToSupport, supportingUnit) {
		if (typeof unitToSupport === "number")
			unitToSupport = window.units[String(unitToSupport)];
		if (typeof supportingUnit === "number")
			supportingUnit = window.units[String(supportingUnit)];

		if (!unitToSupport || !supportingUnit) return false;

		if (!supportingUnit.support || !supportingUnit.support[0])
			// no support
			return false;

		// They should not have the same family. The supporting unit may have no
		// families if data is incomplete, in which case it won't be excluded
		// from the supporting units even though it may have the same family name
		//
		// The unitToSupport may also have no families (incomplete or fodder),
		// in which case supports that match a type, class, cost, or all chars
		// will work, but supports that match a family won't work.
		if (
			supportingUnit.families &&
			unitToSupport.families &&
			unitToSupport.families.some((fam) =>
				supportingUnit.families.includes(fam)
			)
		)
			return false;

		if (/^All characters?/i.test(supportingUnit.support[0].Characters))
			return true;

		// recreate the query generated for support units
		// make it returns search params instead of the query, so we save up on
		// parsing the query (no `utils.generateSearchParameters` call)
		let params = utils.generateSupportedCharactersQuery(
			supportingUnit.support[0].Characters,
			undefined,
			true
		);
		if (!params) return false;
		return utils.checkUnitMatchSearchParameters(unitToSupport, params);
	};

	utils.isFodder = function (unit) {
		return (
			(unit.stars < 2 && !utils.isEvolverBooster(unit)) ||
			FODDER_REGEX.test(unit.name)
		);
	};

	utils.isEvolverBooster = function (unit) {
		return /Evolver|Booster/i.test(unit.class);
	};

	utils.searchBaseForms = function (id) {
		if (!reverseEvoMap) generateReverseEvoMap();
		if (!reverseEvoMap[id]) return null;
		return reverseEvoMap[id];
	};

	var updateEvoMap = function (from, to, via) {
		if (!reverseEvoMap[to]) reverseEvoMap[to] = {};
		if (!reverseEvoMap[to][from]) reverseEvoMap[to][from] = [];
		reverseEvoMap[to][from].push(via);
	};

	/**
	 * @returns {Object} Reverse map (lazy-instantiated) of window.families where
	 * the keys are the family names and the values are arrays of the unit ids
	 * that have the given family name.
	 */
	utils.getReverseFamilyMap = function () {
		if (reverseFamilyMap) return reverseFamilyMap;

		reverseFamilyMap = {};
		for (let id in window.families) {
			id = Number(id);
			let families = window.families[id];
			if (!families) continue;
			for (const family of families) {
				if (!(family in reverseFamilyMap)) {
					reverseFamilyMap[family] = [];
				}
				reverseFamilyMap[family].push(id);
			}
		}
		return reverseFamilyMap;
	};

	var generateReverseEvoMap = function () {
		reverseEvoMap = {};
		for (var evo in evolutions) {
			var from = parseInt(evo, 10);
			if (evolutions[evo].evolution.constructor != Array)
				updateEvoMap(from, evolutions[evo].evolution, evolutions[evo].evolvers);
			else
				for (var i = 0; i < evolutions[evo].evolution.length; ++i)
					updateEvoMap(
						from,
						evolutions[evo].evolution[i],
						evolutions[evo].evolvers[i]
					);
		}
	};

	/* * * * * Body * * * * */

	window.Utils = utils;
})();
