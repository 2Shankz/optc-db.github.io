(function () {
	/**
	 * These are the `filters.custom` in "characters\js\table.js", used to "match"
	 * ability descriptions in "common\data\details.js"
	 *
	 * # Properties:
	 * * `name` {string} - Description of the filter that will appear in the sidebar
	 *      in the Character Table
	 * * `target` {string} - The property of an object in `window.details` (see
	 *      "common\data\details.js") that will be matched against `matcher`.
	 * * `matcher` {RegExp} - Regex that will be used to match against `target`. For
	 *      performance and readability purposes, use non-capturing regex groups if
	 *      that group is not matched by any submatcher. It also makes counting
	 *      groups easier (firefox only started supporting named capture groups in
	 *      2020). Do not use lookbehind regexes as they are not supported by Safari
	 *      on iOS, as of 2022. Do learn what the differences of "greedy" and "lazy"
	 *      quantifiers are.
	 * * `submatchers` [{object[]}] - optional array of submatchers. These are used
	 *      for matching the captured groups by the regex for further filtering of
	 *      units. For example, you can filter a unit by its special, specifying its
	 *      multiplier and the number of turns.
	 *
	 * ## Submatcher properties:
	 * * `type` {string} - type of the submatcher. Can be one of the following:
	 * * * "number" - a numerical value that can be compared with "<", ">", "<=",
	 *          ">=", and "=". May be floating-point (so allow that in the regexes where
	 *          there are decimal values). Can also be "completely" or "99+", in which case it
	 *          will be interpreted as Infinity for comparing (make sure that it is in a
	 *          captured group too). This shows up in the sidebar as a label with an
	 *          input text field. Make sure the captured group does not include spaces.
	 *          "?"'s in the captured groups will be replaced by "0" for comparison,
	 *          so that they will be filtered when the filter is on, but won't be
	 *          included when the user searches for specific numbers (unless they search
	 *          for "=0" or "<1").
	 * * * "text" - same as "number", but it matches any text (case-insensitive)
	 *          against the specified groups. This actually supports regex, so
	 *          "luffy|yamato" could be used
	 * * * "option" - matches a regex against the specified `groups`. This shows up
	 *          as a toggleable filter. If the submatcher needs to check if an optional
	 *          group was NOT captured, use the regex /^$/ (empty string). Try to
	 *          optimize them by using `^` (start of string) where applicable, and pick
	 *          shorter keywords. For example, if you need to match the phrase "on the
	 *          supported character", you can include that whole phrase as an optional
	 *          group, but your submatcher regex will just be /./ (any character), so it
	 *          will only check for only one character. If you want a set of options to
	 *          be mutually exclusive (up to only one of them can be active), specify a
	 *          `radioGroup` that they will share.
	 * * * "separator" - a submatcher that doesn't do anything except show some text
	 * * `description` - a string that indicates what the text field of a number-type
	 *      submatcher is for (appears on the left of it) or the text that will show
	 *      up on an option-type submatcher.
	 * * `regex` - a RegExp object used by "option"-type submatchers to check
	 *      against the specified group.
	 * * `radioGroup` - any string that will be used to identify a group of options,
	 *      so that enabling one will turn off all other options that share the same
	 *      `radioGroup`.
	 * * `groups` - an array of indexes (numbers) of the captured group(s) that will
	 *      be matched by the submatcher `regex` or the number the user entered. For
	 *      abilities that may remove an effect's duration completely or by x turns,
	 *      it may be necessary to specify two group indexes, one for the finite "x"
	 *      turns, another for the completely (because we don't say
	 *      "by completely turns"). Note that captured groups have 1-based indexes,
	 *      because the 0th group is the whole string captured by the whole regex.
	 * * `cssClasses` - optional array of strings of css class names to apply to the
	 *      submatcher div. If not provided, they will be given the 'min-width-12'
	 *      class (because the parent div is a flexbox, allowing options to be
	 *      placed beside each other to save space). If provided, the given array
	 *      will be used and will not be given the default class (unless it is also
	 *      in the given array)
	 *
	 * Matchers and submatchers are evaluated in CharUtils.checkMatcher in
	 * "characters\js\utils.js". Also see `directives.addTags` in "characters\js\directives.js".
	 *
	 * # Regex Notes:
	 * * You can test your regexes at https://regex101.com/, especially with
	 *      complex ones
	 * * Many target properties are JSON stringified as they can be objects, like
	 *      when a support character has multiple sailor abilities. As such, the
	 *      string will be evaluated against a string that may contain quotes.
	 *      To prevent a regex from matching across two separate sailor abilities,
	 *      make sure to exclude quotes when matching any character (i.e. [^"]+
	 *      instead of .+)
	 * * Also exclude dots so that the regex doesn't match across sentences, so use
	 *      [^."]+
	 * * The regexes assume that the words "ATK", "HP", and "RCV" will appear in
	 *      in this order. The only forms expected are the following:
	 *      ATK|HP|RCV|ATK and HP|ATK and RCV|HP and RCV|ATK, HP and RCV
	 * * JS does not support atomic groups nor possessive quantifiers (.++) but it
	 *      has a workaround.
	 *      Atomic group - `(?>...)`
	 *      Workaround - `(?=(...))\1`  (http://www.rexegg.com/regex-tricks.html#pseudo-atomic-groups)
	 *      The reason some filters (mainly atk, hp, and rcv boosts) need this is
	 *      that this prevents A LOT of backtracking when a certain part of a
	 *      pattern isn't matched. You can make a regex that will match successfully,
	 *      but the simple ones will take a lot of steps to "fail" because of
	 *      backtracking.
	 *      For example (simplified), `Boosts ATK of ([^."]*?)characters by (\d+)x for (\d+) turn`
	 *      There are a few units that boost statically, like #613's "Boosts ATK and
	 *      RCV of all characters by 45 for 1 turn, amplifies the effect of orbs of
	 *      all characters by 2x for 1 turn" (try making a multiplicative ATK boost
	 *      filter that doesn't match this), which will
	 *      fail when the regex encounters the `x` in the multiplier part of the
	 *      regex, so it backtracks to the `[^."]*?` part, which will give back
	 *      every character it captured AND recheck, just to try if the regex will still match,
	 *      so this results in a lot of backtracking (like hundreds or even thousands
	 *      of extra steps).
	 *      This also results in them trying to match for another "by x" in the
	 *      string, so it could give a false positive when there is a different buff
	 *      in the string.
	 *      Give http://www.rexegg.com/regex-quantifiers.html#explicit_greed a read
	 *      (regex experience required)
	 *      The resulting regexes may seem more complicated, but it's a lot more
	 *      efficient and will prevent the regex from "jumping over the fence".
	 *      The key to seeing the performance difference here is to check how few
	 *      steps it requires to match and to fail (as in not trying further).
	 *
	 * # Common Patterns
	 * * by ([?.\d]+)x(?:-([?.\d]+)x)?
	 * * * should match "by ?x", "by 2.5-3.5x", "by 2.?x"
	 * * for ([?\d]+\+?)(?:-([?\d]+))? turns?
	 * * * should match "for ? turns", "for 2-3 turns", "for 99+ turns"
	 * * by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?)?
	 * * * doubled multiplier regex, allowing for an optional "otherwise" clause
	 * * for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, for ([?\d]+\+?)(?:-([?\d]+))? turns?)?
	 * * * double turns regex
	 * * by ([?.\d]+)x(?:-([?.\d]+)x)? for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?(?: for ([?\d]+\+?)(?:-([?\d]+))? turns?)?)?
	 * * * this simply combines the first two, and doubles it for an optional "otherwise" clause
	 * * * should match "by 2x-3x for 1-2 turns, by 1.5-2.5x for 1-2 turns instead"
	 * * (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))
	 * * * mostly for status effect reducers, should accept "by 1-3 turns" or "completely"
	 * * * (interpreted as Infinity for comparison). This does not accept "by 99+ turns" since "completely" is used for them
	 * * of (?=((?:(?=([^c."]+))\2|c(?!har))*))\1characters?
	 * * of (?=((?:[^c."]+|c(?!har))*))\1characters?
	 * * * explicit greedy alternation, with a workaround for atomic groups. either is usable
	 * * * the first one is what is in the guide, the second one is my simplified version (no need for the first atomic group)
	 * * * this is basically /of ([^."]*?)characters?/, but prevents backtracking when the next parts of the pattern are not met, potentially leading to false positives.
	 * * * for example, "boosts base atk of all characters by 1000, boosts atk of all characters by 1.5x"
	 * * * this could be matched if the regex for the base atk uses /by ([?.\d]+)x/
	 */

	var types = ["STR", "DEX", "QCK", "PSY", "INT"];
	var classes = [
		"Fighter",
		"Shooter",
		"Slasher",
		"Striker",
		"Free Spirit",
		"Cerebral",
		"Powerhouse",
		"Driven",
	];

	function createTypesSubmatchers(
		groups,
		includeUniversal = true,
		universalRegex = "all|type(?!])"
	) {
		var result = [];
		for (var [i, type] of types.entries()) {
			result.push({
				type: "option",
				description: type,
				// interpret "Captain's Type", "Dominant Type", "each Type" as universal (only when filtering for types)
				regex: new RegExp(
					"\\[" + type + "\\]" + (includeUniversal ? "|" + universalRegex : ""),
					"i"
				),
				cssClasses: [i < 3 ? "min-width-4" : "min-width-6"],
				groups: groups,
			});
		}
		return result;
	}

	function createClassesSubmatchers(
		groups,
		includeUniversal = true,
		universalRegex = "all"
	) {
		var result = [];
		for (var [i, class_] of classes.entries()) {
			result.push({
				type: "option",
				description: class_,
				regex: new RegExp(
					class_ + (includeUniversal ? "|" + universalRegex : ""),
					"i"
				),
				cssClasses: ["min-width-6"],
				groups: groups,
			});
		}
		return result;
	}

	function createOrbsSubmatchers(
		orbs,
		groups,
		includeUniversal = true,
		universalRegex = "all"
	) {
		var result = [];

		for (var [i, orb] of orbs.entries()) {
			var minWidth = 6;
			if (orb.length <= 3) minWidth = "2";
			else if (orb.length <= 5) minWidth = "3";
			result.push({
				type: "option",
				description: orb,
				regex: new RegExp(
					"\\[" + orb + "\\]" + (includeUniversal ? "|" + universalRegex : ""),
					"i"
				),
				cssClasses: ["min-width-" + minWidth],
				groups: groups,
			});
		}
		return result;
	}

	function createPositionsSubmatchers(
		groups,
		includeUniversal = true,
		universalRegex = "all",
		excludedSubmatchers = [],
		useRowsAndColumns = true
	) {
		const rows = ["Top", "Middle", "Bottom"];
		const columns = ["Left", "Right"];
		var result = [];
		if (useRowsAndColumns) {
			for (var [i, row] of rows.entries()) {
				if (!excludedSubmatchers.includes(row)) {
					result.push({
						type: "option",
						description: row + (i == 0 ? " Row" : ""),
						regex: new RegExp(
							row + (includeUniversal ? "|" + universalRegex : ""),
							"i"
						),
						cssClasses: ["min-width-4"],
						groups: groups,
					});
				}
			}
			for (var [i, col] of columns.entries()) {
				if (!excludedSubmatchers.includes(col)) {
					result.push({
						type: "option",
						description: col + " Column",
						regex: new RegExp(
							col + (includeUniversal ? "|" + universalRegex : ""),
							"i"
						),
						cssClasses: ["min-width-6"],
						groups: groups,
					});
				}
			}
		} else {
			// for the rows, this should catch "top and bottom rows" and the like
			// by simply excluding "top right" from Friend Captain (top left),
			// we can match "top row", "top left", "top and bottom rows", and "top" (like "top characters", in case the "row" is forgotten)
			// of course, there is no "left and right columns", since that's just "all characters"
			result.push({
				type: "option",
				description: "Friend Captain",
				regex: new RegExp(
					"left column|top(?! right)|Friend Captain" +
						(includeUniversal ? "|" + universalRegex : ""),
					"i"
				),
				cssClasses: ["min-width-6"],
				groups: groups,
			});
			result.push({
				type: "option",
				description: "Captain",
				regex: new RegExp(
					"right column|top(?! left)|(?:^|(?!end ).{4})Captain" +
						(includeUniversal ? "|" + universalRegex : ""),
					"i"
				), // should catch "the Captain", but not "Friend Captain"
				cssClasses: ["min-width-6"],
				groups: groups,
			});
			result.push({
				type: "option",
				description: "Middle Left",
				regex: new RegExp(
					"left column|middle(?! right)" +
						(includeUniversal ? "|" + universalRegex : ""),
					"i"
				),
				cssClasses: ["min-width-6"],
				groups: groups,
			});
			result.push({
				type: "option",
				description: "Middle Right",
				regex: new RegExp(
					"right column|middle(?! left)" +
						(includeUniversal ? "|" + universalRegex : ""),
					"i"
				),
				cssClasses: ["min-width-6"],
				groups: groups,
			});
			result.push({
				type: "option",
				description: "Bottom Left",
				regex: new RegExp(
					"left column|bottom(?! right)" +
						(includeUniversal ? "|" + universalRegex : ""),
					"i"
				),
				cssClasses: ["min-width-6"],
				groups: groups,
			});
			result.push({
				type: "option",
				description: "Bottom Right",
				regex: new RegExp(
					"right column|bottom(?! left)" +
						(includeUniversal ? "|" + universalRegex : ""),
					"i"
				),
				cssClasses: ["min-width-6"],
				groups: groups,
			});
		}

		if (!excludedSubmatchers.includes("Adjacent")) {
			result.push({
				type: "option",
				description: "Adjacent",
				regex: new RegExp(
					"adjacent" + (includeUniversal ? "|" + universalRegex : ""),
					"i"
				),
				cssClasses: ["min-width-4"],
				groups: groups,
			});
		}
		if (!excludedSubmatchers.includes("Selected")) {
			result.push({
				type: "option",
				description: "Selected",
				regex: new RegExp(
					"selected" + (includeUniversal ? "|" + universalRegex : ""),
					"i"
				),
				cssClasses: ["min-width-4"],
				groups: groups,
			});
		}
		if (!excludedSubmatchers.includes("Self")) {
			result.push({
				type: "option",
				description: "Self",
				regex: new RegExp(
					"this|own|supported" + (includeUniversal ? "|" + universalRegex : ""),
					"i"
				),
				cssClasses: ["min-width-4"],
				groups: groups,
			});
		}
		return result;
	}

	function createUniversalSubmatcher(groups, universalRegex = "all|type(?!])") {
		var result = [];
		result.push({
			type: "option",
			description: "Universal",
			// interpret "Captain's Type", "Dominant Type", "each Type" as universal
			regex: new RegExp(universalRegex || "all|type(?!])", "i"),
			groups: groups,
		});
		return result;
	}

	function createRangeSubmatcher(groups) {
		var result = [];
		const sizes = ["Small", "Medium", "Large"];
		const directions = ["Forward", "Sideways", "Radial"];

		sizes.forEach((size) => {
			result.push({
				type: "option",
				description: size,
				regex: new RegExp(size, "i"),
				radioGroup: "size",
				cssClasses: ["min-width-4"],
				groups: groups,
			});
		});
		directions.forEach((direction) => {
			result.push({
				type: "option",
				description: direction,
				regex: new RegExp(direction, "i"),
				radioGroup: "direction",
				cssClasses: ["min-width-4"],
				groups: groups,
			});
		});		

		return result;
	}

	/**
	 * Convenience function to construct a RegExp object from an array of regexes,
	 * allowing us to split a regex across lines and even add comments. Note that
	 * you can't split a regex group as each subregex must be a valid regex object.
	 * Credit: https://stackoverflow.com/a/30835667
	 *
	 * @param {RegExp[]} regs
	 * @param {string} options - RegExp options (flags) for the resulting object
	 * @returns {RegExp}
	 */
	function multilineRegExp(regs, options) {
		return new RegExp(
			regs
				.map(function (reg) {
					return reg.source;
				})
				.join(""),
			options
		);
	}

	// Structure will be changed to window.matchers[target][matcherGroup]
	let matchers = {
		Damage: [
			{
				name: "Old Damage dealer",
				targets: ["special", "superSpecial", "swap", "support"],
				regex: /deals.+to/i,
			},

			{
				name: "Old Instant Damage dealer",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/deals[^"]+?to \w+ enem(?:y|ies)(?=((?: with the highest current HP)?))\1(?! at the (?:end|start))/i,
			},

			{
				name: "Damage Dealer: Instant",
				targets: ["special", "superSpecial", "swap", "support"],
				// for the ones with numbers and an "x" like "50x character's ATK", the "x" is not made optional, and instead the static values will be captured in different groups, so the submatchers can distinguish them.
				// "Typeless" and the like should come BEFORE "Fixed"
				// since this matches "the enemy with the highest current HP" (and possibly others in the future),
				// that group is placed in an atomic group. Otherwise, the negative lookahead for the
				// "at the (?:end|start)" will not work due to backtracking.

				// match "Deals 50x character's ATK in Typeless Fixed True damage, ignoring Normal Attack Only, to all enemies"
				// match "Deals 1,000,000 Fixed True damage, ignoring Normal Attack Only, to all enemies"
				// match "Deals random [STR] damage to one enemy"
				// match "Deals 10 hits of random [INT] damage to random enemies"
				// match "deals 5x the damage received in the previous turn in [INT] damage to all enemies"
				// match "Deals 25x character's ATK to one enemy" should be interpreted as typeless damage
				// match "Deals 25x character's ATK in Typeless damage to one enemy"
				// match "Deals 30x the damage taken from enemies before the special is activated in Typeless damage to all enemies"
				// match "Deals 20x the damage taken from enemies in the previous turn in Typeless damage to all enemies"
				// match "Deals 0.5x the damage dealt in the previous turn in Typeless damage to all enemies"
				// match "deals 3x the damage dealt by this character with normal attacks in Typeless damage to the enemy with the highest current HP"
				// match "Deals random large [INT] Damage to all enemies..."
				// match "Deals 2x the damage dealt in Overkill Damage in the previous turn in Typeless damage to all enemies"
				// match "Deals 10x Excess Healing done before the special is activated in Typeless damage to all enemies"
				// match "Deals 20%-40% of enemies' current HP in damage to all enemies"
				// Health-Sacrificial Damage Dealer
				// // match "deals 15x the amount of HP subtracted in Typeless damage to all enemies"
				regex:
					/Deals (?:([?\d]+) hits? of )?(random(?: large)?|([?.\d]+)x(?:-([?.\d]+)x)? (character's ATK|the amount of HP subtracted|the damage taken from enemies (?:before the special is activated|in the previous turn)|the damage dealt (?:in (?:Overkill Damage in )?the previous turn|by this character with normal attacks)|Excess Healing done before the special is activated)|([?.\d]+)%(?:-([?.\d]+)%)? of enemies' current HP|([?,\d]+)(?:-([?,\d]+))?) (?:in )?((?:typeless|\[\w+\]|character's type) )?(Fixed )?(True )?damage(, ignoring Normal Attack Only,?|, depending on the crew's current HP,?)? to (all enemies|random enemies|one enemy|the enemy)(?=((?: with the highest current HP)?))\15(?! at the (?:end|start))/i,
				submatchers: [
					{
						type: "number",
						description: "# of Hits (multi-hit):", // this matches only multi-hit, so "1 hit" specials won't be matched
						groups: [1],
					},
					{
						type: "option",
						description: "Random damage",
						regex: /^random/i,
						groups: [2],
					},
					{
						type: "number",
						description: "Fixed value:",
						groups: [8, 9],
					},
					{
						type: "number",
						description: "Percentage Cut:",
						groups: [6, 7],
					},
					{
						type: "number",
						description: "Multiplier:",
						groups: [3, 4],
					},
					{
						type: "separator",
						description: "Multiplier basis:",
					},
					{
						type: "option",
						description: "Character's ATK",
						regex: /^character's ATK/i,
						radioGroup: "basis",
						groups: [5],
					},
					{
						type: "option",
						description: "Damage Dealt",
						regex: /^the damage dealt/i,
						radioGroup: "basis",
						groups: [5],
					},
					{
						type: "option",
						description: "Excess Healing",
						regex: /^Excess Healing/i,
						radioGroup: "basis",
						groups: [5],
					},
					{
						type: "option",
						description: "Health Loss",
						regex: /^the damage taken from enemies/i,
						radioGroup: "basis",
						groups: [5],
					},
					{
						type: "option",
						description: "Health Sacrificed",
						regex: /^the amount of HP subtracted/i,
						radioGroup: "basis",
						groups: [5],
					},
					{
						type: "option",
						description: "HP-Based",
						regex: /^, depending on the crew's current HP/i,
						radioGroup: "basis",
						groups: [13],
					},
					{
						type: "separator",
						description: "Damage type:",
					},
					{
						type: "option",
						description: "Typed",
						regex: /^[^t]/i,
						radioGroup: "1",
						groups: [10],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Typeless",
						regex: /^$|typeless/i,
						radioGroup: "1",
						groups: [10],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Fixed",
						regex: /./,
						groups: [11],
					},
					{
						type: "option",
						description: "True",
						regex: /./,
						groups: [12],
					},
					{
						type: "option",
						description: "Ignores NAO",
						regex: /^, ignoring Normal Attack Only/,
						groups: [13],
					},
					{
						type: "separator",
						description: "Targets:",
					},
					{
						type: "option",
						description: "One enemy",
						regex: /^one|^the/,
						radioGroup: "targets",
						groups: [14],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "All enemies",
						regex: /^all|^each/,
						radioGroup: "targets",
						groups: [14],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Random enemies",
						regex: /^random/,
						radioGroup: "targets",
						groups: [14],
					},
				],
			},

			{
				name: "Old End of Turn Damage Dealer",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex: /(deals|cuts)[^."]+end of (?:the|each) turn/i,
			},

			{
				name: "Damage Dealer: End of Turn",
				targets: ["captain"],
				regex:
					/Deals (?:([?\d]+) hits? of )?(random(?: large)?|([?.\d]+)x(?:-([?.\d]+)x)? (character's ATK|the amount of HP subtracted|the damage taken from enemies (?:before the special is activated|in the previous turn)|the damage dealt (?:in (?:Overkill Damage in )?the previous turn|by this character with normal attacks)|Excess Healing done before the special is activated)|([?.\d]+)%(?:-([?.\d]+)%)? of enemies' current HP|([?,\d]+)(?:-([?,\d]+))?) (?:in )?((?:typeless|\[\w+\]|character's type) )?(Fixed )?(True )?damage(, ignoring Normal Attack Only,?)? to (all enemies|random enemies|one enemy|the enemy)(?=((?: with the highest current HP)?))\15 at the end of (?:the|each|every) (?:turn|stage)/i,
				submatchers: [
					{
						type: "number",
						description: "# of Hits (multi-hit):", // this matches only multi-hit, so "1 hit" specials won't be matched
						groups: [1],
					},
					{
						type: "option",
						description: "Random damage",
						regex: /^random/i,
						groups: [2],
					},
					{
						type: "number",
						description: "Fixed value:",
						groups: [8, 9],
					},
					{
						type: "number",
						description: "Percentage Cut:",
						groups: [6, 7],
					},
					{
						type: "number",
						description: "Multiplier:",
						groups: [3, 4],
					},
					{
						type: "separator",
						description: "Multiplier basis:",
					},
					{
						type: "option",
						description: "Character's ATK",
						regex: /^character's ATK/i,
						radioGroup: "basis",
						groups: [5],
					},
					{
						type: "option",
						description: "Damage Dealt",
						regex: /^the damage dealt/i,
						radioGroup: "basis",
						groups: [5],
					},
					{
						type: "option",
						description: "Excess Healing",
						regex: /^Excess Healing/i,
						radioGroup: "basis",
						groups: [5],
					},
					{
						type: "option",
						description: "Health Loss",
						regex: /^the damage taken from enemies/i,
						radioGroup: "basis",
						groups: [5],
					},
					{
						type: "option",
						description: "Health Sacrificed",
						regex: /^the amount of HP subtracted/i,
						radioGroup: "basis",
						groups: [5],
					},
					{
						type: "separator",
						description: "Damage type:",
					},
					{
						type: "option",
						description: "Typed",
						regex: /^[^t]/i,
						radioGroup: "1",
						groups: [10],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Typeless",
						regex: /^$|typeless/i,
						radioGroup: "1",
						groups: [10],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Fixed",
						regex: /./,
						groups: [11],
					},
					{
						type: "option",
						description: "True",
						regex: /./,
						groups: [12],
					},
					{
						type: "option",
						description: "Ignores NAO",
						regex: /./,
						groups: [13],
					},
					{
						type: "separator",
						description: "Targets:",
					},
					{
						type: "option",
						description: "One enemy",
						regex: /^one|^the/,
						radioGroup: "targets",
						groups: [14],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "All enemies",
						regex: /^all|^each/,
						radioGroup: "targets",
						groups: [14],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Random enemies",
						regex: /^random/,
						radioGroup: "targets",
						groups: [14],
					},
				],
			},

			{
				name: "Old1 End of Turn Damage Dealer",
				targets: ["special", "superSpecial", "swap", "support"],
				// match "deals 0.5x the damage dealt by this character with normal attacks to all enemies at the end of each turn for 99+ turns"
				// should not match "Deals [PSY] damage to one enemy according to HP, recovers 5x character's RCV in HP at the end of each turn for 5 turns"
				regex:
					/(?:deals|cuts)(?=((?:[^er."]+|e(?!nd of)|\.\d|r(?!ecover))*))\1end of (?:the|each) turn for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, for ([?\d]+\+?)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4],
					},
				],
			},

			{
				name: "Damage Dealer: End of Turn",
				targets: ["special", "superSpecial", "swap", "support"],
				// match "deals 0.5x the damage dealt by this character with normal attacks to all enemies at the end of each turn for 99+ turns"
				// should not match "Deals [PSY] damage to one enemy according to HP, recovers 5x character's RCV in HP at the end of each turn for 5 turns"
				regex:
					/Deals (?:([?\d]+) hits? of )?(random(?: large)?|([?.\d]+)x(?:-([?.\d]+)x)? (character's ATK|the amount of HP subtracted|the damage taken from enemies (?:before the special is activated|in the previous turn)|the damage dealt (?:in (?:Overkill Damage in )?the previous turn|by this character with normal attacks)|Excess Healing done before the special is activated)|([?.\d]+)%(?:-([?.\d]+)%)? of enemies' current HP|([?,\d]+)(?:-([?,\d]+))?) (?:in )?((?:typeless|\[\w+\]|character's type) )?(Fixed )?(True )?damage(, ignoring Normal Attack Only,?)? to (all enemies|random enemies|one enemy|the enemy)(?=((?: with the highest current HP)?))\15 at the end of (?:the|each|every) (?:turn|stage)(?: for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, for ([?\d]+\+?)(?:-([?\d]+))? turns?)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [16, 17, 18, 19],
					},
					{
						type: "number",
						description: "# of Hits (multi-hit):", // this matches only multi-hit, so "1 hit" specials won't be matched
						groups: [1],
					},
					{
						type: "option",
						description: "Random damage",
						regex: /^random/i,
						groups: [2],
					},
					{
						type: "number",
						description: "Fixed value:",
						groups: [8, 9],
					},
					{
						type: "number",
						description: "Percentage Cut:",
						groups: [6, 7],
					},
					{
						type: "number",
						description: "Multiplier:",
						groups: [3, 4],
					},
					{
						type: "separator",
						description: "Multiplier basis:",
					},
					{
						type: "option",
						description: "Character's ATK",
						regex: /^character's ATK/i,
						radioGroup: "basis",
						groups: [5],
					},
					{
						type: "option",
						description: "Damage Dealt",
						regex: /^the damage dealt/i,
						radioGroup: "basis",
						groups: [5],
					},
					{
						type: "option",
						description: "Excess Healing",
						regex: /^Excess Healing/i,
						radioGroup: "basis",
						groups: [5],
					},
					{
						type: "option",
						description: "Health Loss",
						regex: /^the damage taken from enemies/i,
						radioGroup: "basis",
						groups: [5],
					},
					{
						type: "option",
						description: "Health Sacrificed",
						regex: /^the amount of HP subtracted/i,
						radioGroup: "basis",
						groups: [5],
					},
					{
						type: "separator",
						description: "Damage type:",
					},
					{
						type: "option",
						description: "Typed",
						regex: /^[^t]/i,
						radioGroup: "1",
						groups: [10],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Typeless",
						regex: /^$|typeless/i,
						radioGroup: "1",
						groups: [10],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Fixed",
						regex: /./,
						groups: [11],
					},
					{
						type: "option",
						description: "True",
						regex: /./,
						groups: [12],
					},
					{
						type: "option",
						description: "Ignores NAO",
						regex: /./,
						groups: [13],
					},
					{
						type: "separator",
						description: "Targets:",
					},
					{
						type: "option",
						description: "One enemy",
						regex: /^one|^the/,
						radioGroup: "targets",
						groups: [14],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "All enemies",
						regex: /^all|^each/,
						radioGroup: "targets",
						groups: [14],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Random enemies",
						regex: /^random/,
						radioGroup: "targets",
						groups: [14],
					},
				],
			},

			{
				name: "Damage Dealer: Start of Stage",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				// match "deals 0.5x the damage dealt by this character with normal attacks to all enemies at the end of each turn for 99+ turns"
				// should not match "Deals [PSY] damage to one enemy according to HP, recovers 5x character's RCV in HP at the end of each turn for 5 turns"
				regex:
					/Deals (?:([?\d]+) hits? of )?(random(?: large)?|([?.\d]+)x(?:-([?.\d]+)x)? (character's ATK|the amount of HP subtracted|the damage taken from enemies (?:before the special is activated|in the previous turn)|the damage dealt (?:in (?:Overkill Damage in )?the previous turn|by this character with normal attacks)|Excess Healing done before the special is activated)|([?.\d]+)%(?:-([?.\d]+)%)? of enemies' current HP|([?,\d]+)(?:-([?,\d]+))?) (?:in )?((?:typeless|\[\w+\]|character's type) )?(Fixed )?(True )?damage(, ignoring Normal Attack Only,?)? to (all enemies|random enemies|one enemy|the enemy)(?=((?: with the highest current HP)?))\15 at the start of (?:the|each|every) (?:turn|stage)(?: for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, for ([?\d]+\+?)(?:-([?\d]+))? turns?)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [16, 17, 18, 19],
					},
					{
						type: "number",
						description: "# of Hits (multi-hit):", // this matches only multi-hit, so "1 hit" specials won't be matched
						groups: [1],
					},
					{
						type: "option",
						description: "Random damage",
						regex: /^random/i,
						groups: [2],
					},
					{
						type: "number",
						description: "Fixed value:",
						groups: [8, 9],
					},
					{
						type: "number",
						description: "Percentage Cut:",
						groups: [6, 7],
					},
					{
						type: "number",
						description: "Multiplier:",
						groups: [3, 4],
					},
					{
						type: "separator",
						description: "Multiplier basis:",
					},
					{
						type: "option",
						description: "Character's ATK",
						regex: /^character's ATK/i,
						radioGroup: "basis",
						groups: [5],
					},
					{
						type: "option",
						description: "Damage Dealt",
						regex: /^the damage dealt/i,
						radioGroup: "basis",
						groups: [5],
					},
					{
						type: "option",
						description: "Excess Healing",
						regex: /^Excess Healing/i,
						radioGroup: "basis",
						groups: [5],
					},
					{
						type: "option",
						description: "Health Loss",
						regex: /^the damage taken from enemies/i,
						radioGroup: "basis",
						groups: [5],
					},
					{
						type: "option",
						description: "Health Sacrificed",
						regex: /^the amount of HP subtracted/i,
						radioGroup: "basis",
						groups: [5],
					},
					{
						type: "separator",
						description: "Damage type:",
					},
					{
						type: "option",
						description: "Typed",
						regex: /^[^t]/i,
						radioGroup: "1",
						groups: [10],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Typeless",
						regex: /^$|typeless/i,
						radioGroup: "1",
						groups: [10],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Fixed",
						regex: /./,
						groups: [11],
					},
					{
						type: "option",
						description: "True",
						regex: /./,
						groups: [12],
					},
					{
						type: "option",
						description: "Ignores NAO",
						regex: /./,
						groups: [13],
					},
					{
						type: "separator",
						description: "Targets:",
					},
					{
						type: "option",
						description: "One enemy",
						regex: /^one|^the/,
						radioGroup: "targets",
						groups: [14],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "All enemies",
						regex: /^all|^each/,
						radioGroup: "targets",
						groups: [14],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Random enemies",
						regex: /^random/,
						radioGroup: "targets",
						groups: [14],
					},
				],
			},

			{
				name: "Old HP-based damage dealers",
				targets: ["special"],
				regex: /specialProportional/i,
			},

			{
				name: "ATK",
				targets: ["rumbleSpecial"],
				regex: /Deals ([.\d]+)x ATK in( spread)? damage( ignoring DEF)? to (\d)?(?=((?:[^e]+|e(?!nem))*))\5enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: (\d+) times?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Amount:",
						groups: [1],
					},
					{
						type: "number",
						description: "Repeat:",
						groups: [8],
					},
					{
						type: "option",
						description: "Spread",
						regex: /./i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Ignoring DEF",
						regex: /./i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [4],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [5],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([5]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([5]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([7]),
				],
			},

			{
				name: "Leader's ATK",
				targets: ["gpSpecial"],
				regex: /Deals ([.\d]+)x Leader's base ATK in( spread)? damage( ignoring DEF)? to (\d)?(?=((?:[^e]+|e(?!nem))*))\5enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: (\d+) times?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Amount:",
						groups: [1],
					},
					{
						type: "number",
						description: "Repeat:",
						groups: [7],
					},
					{
						type: "option",
						description: "Spread",
						regex: /./i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Ignoring DEF",
						regex: /./i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [4],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [5],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([5]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([5]),
				],
			},

			{
				name: "Fixed",
				targets: ["rumbleSpecial"],
				regex: /Deals ([,\d]+) fixed( spread)? damage to (\d)?(?=((?:[^e]+|e(?!nem))*))\4enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: (\d+) times?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Amount:",
						groups: [1],
					},
					{
						type: "number",
						description: "Repeat:",
						groups: [7],
					},
					{
						type: "option",
						description: "Spread",
						regex: /./i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [3],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [4],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([4]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([4]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([6]),
				],
			},

			{
				name: "Fixed",
				targets: ["gpSpecial"],
				regex: /Deals ([,\d]+) fixed( spread)? damage to (\d)?(?=((?:[^e]+|e(?!nem))*))\4enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: (\d+) times?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Amount:",
						groups: [1],
					},
					{
						type: "number",
						description: "Repeat:",
						groups: [6],
					},
					{
						type: "option",
						description: "Spread",
						regex: /./i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [3],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [4],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([4]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([4]),
				],
			},

			{
				name: "Percentage",
				targets: ["rumbleSpecial"],
				regex: /([.\d]+)% HP cut to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: (\d+) times?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Amount:",
						groups: [1],
					},
					{
						type: "number",
						description: "Repeat:",
						groups: [6],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([5]),
				],
			},

			{
				name: "Percentage",
				targets: ["gpSpecial"],
				regex: /([.\d]+)% HP cut to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: (\d+) times?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Amount:",
						groups: [1],
					},
					{
						type: "number",
						description: "Repeat:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "Random",
				targets: ["rumbleSpecial"],
				regex: /Randomly deals between ([,\d]+)-([,\d]+) fixed damage to (\d)?(?=((?:[^e]+|e(?!nem))*))\4enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: (\d+) times?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Amount:",
						groups: [1, 2],
					},
					{
						type: "number",
						description: "Repeat:",
						groups: [7],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [3],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [4],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([4]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([4]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([6]),
				],
			},

			{
				name: "Random",
				targets: ["gpSpecial"],
				regex: /Randomly deals between ([,\d]+)-([,\d]+) fixed damage to (\d)?(?=((?:[^e]+|e(?!nem))*))\4enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: (\d+) times?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Amount:",
						groups: [1, 2],
					},
					{
						type: "number",
						description: "Repeat:",
						groups: [6],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [3],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [4],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([4]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([4]),
				],
			},

			{
				name: "Damage Over Time",
				targets: ["rumbleSpecial"],
				regex:
					/Inflicts Lv. (\d+) Damage Over Time to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [6],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([5]),
				],
			},

			{
				name: "Damage Over Time",
				targets: ["gpSpecial"],
				regex:
					/Inflicts Lv. (\d+) Damage Over Time to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},
		],

		"Boost Damage and Stats": [
			{
				name: "Old Passive ATK boosting %target%",
				targets: ["captain", "sailor"],
				regex: /Boosts (base )?(?:their )?ATK/i,
			},

			{
				name: "Passive ATK Boost",
				targets: ["captain"],
				// Can be "boosts ATK of all characters by 1x-2x, by ?x-3x otherwise"
				// Or "boosts HP of Striker characters by 2.5x, their ATK by 2x" (or RCV first)
				// Or "Boosts ATK of Slasher characters by 3.25x, by 4.0625x instead if they have a [DEX] or [INT] orb" (or beneficial orb)
				// or "boosts ATK of all characters by 1x-2x, depending on the crew's current HP, and their HP by 2x"
				// But NOT "boosts ATK of Striker characters by 2.5x, boosts their HP by 1.2x"
				// "boosts" should NOT be matched within, which should be a different buff already
				// `","` is the JSON separator for array items
				// wrap the part before "ATK" in an atomic group to prevent backtracking
				// prevent it from jumping over "reduces"
				regex:
					/Boosts (?=((?:[^.abor"]+|a(?!tk)|\.\d|b(?!oosts)|of ([^."]+?)characters?|o|r(?!educes)|"(?!,"))*))\1ATK(?: and HP| and RCV|, HP and RCV)?(?: of ([^."]*?)characters?)? by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [4, 5, 6, 7],
					},
					...createUniversalSubmatcher([2, 3]),
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([2, 3]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([2, 3]),
					{
						type: "separator",
						description: "Affected positions:",
					},
					...createPositionsSubmatchers([2, 3], true, undefined, [
						"Adjacent",
						"Selected",
					]),
				],
			},

			{
				name: "Passive Base ATK Boost",
				targets: ["sailor"],
				// separate the "by 1.2x" and "by 1,000" into groups so that they can be matched by different submatchers
				// in the regex alternations, the "multiplier" groups go first, so when it tries to find an "x",
				// it falls back to the "static boost" groups
				regex:
					/Boosts base ATK(?: and HP| and RCV|, HP and RCV)? of (?=((?:[^c."]+|c(?!har))*))\1characters? by (?:([?.\d]+)x(?:-([?.\d]+)x)?|([?.,\d]+)(?:-([?.,\d]+))?)(?:, by (?:([?.\d]+)x(?:-([?.\d]+)x)?|([?.,\d]+)(?:-([?.,\d]+))?))?/i,
				submatchers: [
					{
						type: "number",
						description: "Static Boost:",
						groups: [4, 5, 8, 9],
					},
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3, 6, 7],
					},
					...createUniversalSubmatcher([1]),
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected positions:",
					},
					...createPositionsSubmatchers([1], true, undefined, [
						"Adjacent",
						"Selected",
					]),
				],
			},

			{
				name: "Old Passive Base ATK boosting %target%",
				targets: ["support"],
				regex: /Adds.+%.+ATK/i,
			},

			{
				name: "Passive Base ATK Boost",
				targets: ["support"],
				regex: /Adds ([?.\d]+)% of this character's base ATK/i,
				submatchers: [
					{
						type: "number",
						description: "Percentage:",
						groups: [1],
					},
				],
			},

			{
				name: "Old Passive HP boosting %target%",
				targets: ["captain", "sailor"],
				regex: /Boosts (base )?(HP|ATK and HP|ATK, HP)|Boosts.+their HP/i,
			},

			{
				name: "Passive HP Boost",
				targets: ["captain"],
				// Can be "boosts HP of all characters by 1x-2x, by ?x-3x otherwise"
				// Or "boosts ATK of Striker characters by 2.5x, their HP by 1.2x"
				// or "boosts ATK of all characters by 1x-2x, depending on the crew's current HP, and their HP by 2x"
				// But not "boosts ATK of Striker characters by 2.5x, boosts their HP by 1.2x"
				// "boosts" should NOT be matched within, which should be a different buff already
				// Also NOT "Boosts ATK of [STR] characters by 2.5x and reduces their HP by 60%"
				// `","` is the JSON separator for array items. Allow "Special Name"
				regex:
					/Boosts (?=((?:[^.bhor"]+|h(?!p (?:and RCV )?(?:by|of))|\.\d|b(?!oosts)|of ([^."]+?)characters?|o|r(?!educes)|"(?!,"))*))\1HP(?: and RCV)?(?: of ([^."]*?)characters?)? by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [4, 5, 6, 7],
					},
					...createUniversalSubmatcher([2, 3]),
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([2, 3]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([2, 3]),
					{
						type: "separator",
						description: "Affected positions:",
					},
					...createPositionsSubmatchers([2, 3], true, undefined, [
						"Adjacent",
						"Selected",
					]),
				],
			},

			{
				name: "Passive Base HP Boost",
				targets: ["sailor"],
				// separate the "by 1.2x" and "by 100" into groups so that they can be matched by different submatchers
				// in the regex alternations, the "multiplier" groups go first, so when it finds an "x",
				// it falls back to the "static boost" groups
				regex:
					/Boosts base (?:ATK, |ATK and )?HP(?: and RCV)? of (?=((?:[^c."]+|c(?!har))*))\1characters? by (?:([?.\d]+)x(?:-([?.\d]+)x)?|([?.,\d]+)(?:-([?.,\d]+))?)(?:, by (?:([?.\d]+)x(?:-([?.\d]+)x)?|([?.,\d]+)(?:-([?.,\d]+))?))?/i,
				submatchers: [
					{
						type: "number",
						description: "Static Boost:",
						groups: [4, 5, 8, 9],
					},
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3, 6, 7],
					},
					...createUniversalSubmatcher([1]),
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected positions:",
					},
					...createPositionsSubmatchers([1], true, undefined, [
						"Adjacent",
						"Selected",
					]),
				],
			},

			{
				name: "Old Passive Base HP boosting %target%",
				targets: ["support"],
				regex: /Adds.+%.+HP/i,
			},

			{
				name: "Passive Base HP Boost",
				targets: ["support"],
				regex:
					/Adds ([?.\d]+)% of this character's base (?:HP|ATK and HP|ATK, HP)/i,
				submatchers: [
					{
						type: "number",
						description: "Percentage:",
						groups: [1],
					},
				],
			},

			{
				name: "Old Passive RCV boosting %target%",
				targets: ["captain", "sailor"],
				regex:
					/Boosts (base )?(RCV|ATK and RCV|HP and RCV|ATK, HP and RCV)|Boosts.+their RCV/i,
			},

			{
				name: "Passive RCV Boost",
				targets: ["captain"],
				// same as ATK and HP
				// should not match "Boosts ATK of all characters by 3x, their HP by 1.25x and recovers 0.5x this character's RCV at the end of the turn"
				regex:
					/Boosts (?=((?:[^.bor"]+|\.\d|b(?!oosts)|of ([^."]+?)characters?|o|r(?!educes|cv[^\]])|"(?!,"))*))\1RCV(?: of ([^."]*?)characters?)? by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [4, 5, 6, 7],
					},
					...createUniversalSubmatcher([2, 3]),
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([2, 3]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([2, 3]),
					{
						type: "separator",
						description: "Affected positions:",
					},
					...createPositionsSubmatchers([2, 3], true, undefined, [
						"Adjacent",
						"Selected",
					]),
				],
			},

			{
				name: "Passive Base RCV Boost",
				targets: ["sailor"],
				// separate the "by 1.2x" and "by 100" into groups so that they can be matched by different submatchers
				// in the regex alternations, the "multiplier" groups go first, so when it finds an "x",
				// it falls back to the "static boost" groups
				regex:
					/Boosts base (?:ATK, HP and |ATK and |HP and )?RCV of (?=((?:[^c."]+|c(?!har))*))\1characters? by (?:([?.\d]+)x(?:-([?.\d]+)x)?|([?.,\d]+)(?:-([?.,\d]+))?)(?:, by (?:([?.\d]+)x(?:-([?.\d]+)x)?|([?.,\d]+)(?:-([?.,\d]+))?))?/i,
				submatchers: [
					{
						type: "number",
						description: "Static Boost:",
						groups: [4, 5, 8, 9],
					},
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3, 6, 7],
					},
					...createUniversalSubmatcher([1]),
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected positions:",
					},
					...createPositionsSubmatchers([1], true, undefined, [
						"Adjacent",
						"Selected",
					]),
				],
			},

			{
				name: "Old Passive Base RCV boosting %target%",
				targets: ["support"],
				regex: /Adds.+%.+RCV/i,
			},

			{
				name: "Passive Base RCV Boost",
				targets: ["support"],
				regex:
					/Adds ([?.\d]+)% of this character's base (?:RCV|ATK and RCV|HP and RCV|ATK, HP and RCV)/i,
				submatchers: [
					{
						type: "number",
						description: "Percentage:",
						groups: [1],
					},
				],
			},

			{
				name: "Special Damage Boost",
				targets: ["captain"],
				regex: /Boosts damage.+specials/i,
			},

			{
				name: "Old ATK boosters",
				targets: ["special", "superSpecial", "swap", "support"],
				regex: /boosts( own ATK| ATK)(?! against)/i,
			},

			{
				name: "ATK Boost",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				/* Uses explicit greedy alternation for "of ...characters", preventing
                backtracking with every character matched in it (easily reaches a
                thousand extra steps), like if there's an ATK boost that has "by 45",
                but no "x" because it's not a multiplier. It also prevents it from
                jumping over "characters" in the mentioned case, as it would no
                longer be able to backtrack. Variable atk boosts and variable turns
                should be accounted for with optional groups, and should handle an
                "otherwise" clause. This part of the regex also uses a workaround
                for atomic groups in JS.

                "If something, boosts ATK, HP and RCV of [PSY], Cerebral and Free
                Spirit characters by 2x-2.5x for 1-2 turns, by 1.5x-2x for 2-3 turns
                otherwise."
            */
				regex:
					/Boosts ATK(?: and HP| and RCV|, HP and RCV)? of (?=((?:[^c."]+|c(?!har))*))\1characters? by (?:([?.\d]+)x(?:-([?.\d]+)x)?|([?.,\d]+)(?:-([?.,\d]+))?)(?:, ([^,]+),)? (?:after [?\d\w]+? hit in the chain )?for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, by (?:([?.\d]+)x(?:-([?.\d]+)x)?|([?.,\d]+)(?:-([?.,\d]+))?)(?:, ([^,]+),)? for ([?\d]+\+?)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3, 9, 10],
					},
					{
						type: "number",
						description: "Static Boost:",
						groups: [4, 5, 11, 12],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [7, 8, 14, 15],
					},
					{
						type: "option",
						description: "Allowing Override",
						regex: /allowing override/,
						radioGroup: "targets",
						groups: [6, 13],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Buff Clear Immune",
						regex: /preventing buff clears/,
						radioGroup: "targets",
						groups: [6, 13],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Double Enhance",
						regex: /can be enhanced up to 2 times/,
						radioGroup: "targets",
						groups: [6, 13],
						cssClasses: ["min-width-6"],
					},
					...createUniversalSubmatcher([1]),
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected positions:",
					},
					...createPositionsSubmatchers([1]),
				],
			},

			{
				name: "RCV boosters",
				targets: ["special"],
				regex: /Boosts RCV/i,
			},

			{
				name: "Old Base ATK boosters",
				targets: ["special", "superSpecial", "swap", "support"],
				regex: /boosts[^."]*?base ATK/i,
			},

			{
				name: "Base ATK Boost",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex:
					/Boosts base ATK(?: and HP| and RCV|, HP and RCV)? of (?=((?:[^c."]+|c(?!har))*))\1characters? by (?:([?.\d]+)x(?:-([?.\d]+)x)?|([?.,\d]+)(?:-([?.,\d]+))?)(?:, ([^,]+),)? for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, by (?:([?.\d]+)x(?:-([?.\d]+)x)?|([?.,\d]+)(?:-([?.,\d]+))?)(?:, ([^,]+),)? for ([?\d]+\+?)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3, 9, 10],
					},
					{
						type: "number",
						description: "Static Boost:",
						groups: [4, 5, 11, 12],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [7, 8, 14, 15],
					},
					{
						type: "option",
						description: "Allowing Override",
						regex: /allowing override/,
						radioGroup: "targets",
						groups: [6, 13],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Buff Clear Immune",
						regex: /preventing buff clears/,
						radioGroup: "targets",
						groups: [6, 13],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Double Enhance",
						regex: /can be enhanced up to 2 times/,
						radioGroup: "targets",
						groups: [6, 13],
						cssClasses: ["min-width-6"],
					},
					...createUniversalSubmatcher([1]),
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected positions:",
					},
					...createPositionsSubmatchers([1]),
				],
			},

			{
				name: "Stage Base ATK boosters",
				targets: ["support"],
				// must match both "by 1.5x" and "by 1,500". Make the two capture groups separate
				// so one can search either by multiplier or by static boost
				regex:
					/Boosts base ATK(?: and HP| and RCV|, HP and RCV)? of (?=((?:[^c."]+|c(?!har))*))\1characters? by (?:([?.\d]+)x(?:-([?.\d]+)x)?|([?.,\d]+)(?:-([?.,\d]+))?) until the next stage(?:, by (?:([?.\d]+)x(?:-([?.\d]+)x)?|([?.,\d]+)(?:-([?.,\d]+))?) until the next stage)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3, 6, 7],
					},
					{
						type: "number",
						description: "Static Boost:",
						groups: [4, 5, 8, 9],
					},
				],
			},

			{
				name: "ATK Boost: Combo",
				targets: ["special", "superSpecial"],
				regex: /Boost.+hit in the chain/i,
			},

			{
				name: "Old Orb boosters",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /boosts Orb Effects/i,
			},

			/*         {
            name: 'Orb Effect: Boost',
            targets: [ 'captain' ],
            regex: /boosts Orb Effects of (?=((?:[^c."]+|c(?!har))*))\1characters? by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?)?/i,
            submatchers: [
                {
                    type: 'number',
                    description: 'Multiplier:',
                    groups: [2, 3, 4, 5],
                },
                ...createUniversalSubmatcher([1]),
                {
                    type: 'separator',
                    description: 'Affected types:',
                },
                ...createTypesSubmatchers([1]),
                {
                    type: 'separator',
                    description: 'Affected classes:',
                },
                ...createClassesSubmatchers([1]),
                {
                    type: 'separator',
                    description: 'Affected positions:',
                },
                ...createPositionsSubmatchers([1]),
            ],
        }, */

			{
				name: "Orb Effect: Boost",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex:
					/boosts Orb Effects of (?=((?:[^c."]+|c(?!har))*))\1characters? by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)? for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)?(?: for ([?\d]+\+?)(?:-([?\d]+))? turns?)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3, 7, 8],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [5, 6, 10, 11],
					},
					{
						type: "option",
						description: "Allowing Override",
						regex: /allowing override/,
						radioGroup: "targets",
						groups: [4, 9],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Buff Clear Immune",
						regex: /preventing buff clears/,
						radioGroup: "targets",
						groups: [4, 9],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Double Enhance",
						regex: /can be enhanced up to 2 times/,
						radioGroup: "targets",
						groups: [4, 9],
						cssClasses: ["min-width-6"],
					},
					...createUniversalSubmatcher([1]),
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected positions:",
					},
					...createPositionsSubmatchers([1]),
				],
			},

			{
				name: "Orb Effect: Change Multiplier",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				//increases Orb Effects of beneficial [TND] orbs to 2.25x for 1 turn
				regex:
					/increases Orb Effects of (beneficial)? ?((?:(?!increases Orb Effects)[^."])*?) orbs to ([?.\d]+)x(?:-([?.\d]+)x)? for ([?\d]+\+?)(?:-([?\d]+))? turns?/i,
				submatchers: [
					{
						type: "option",
						description: "Beneficial Orbs Only",
						regex: /./i,
						groups: [1],
					},
					...createOrbsSubmatchers(
						[
							"STR",
							"DEX",
							"QCK",
							"PSY",
							"INT",
							"G",
							"RCV",
							"TND",
							"BOMB",
							"EMPTY",
							"SUPERBOMB",
							"RAINBOW",
							"SEMLA",
							"WANO",
						],
						[2],
						false
					),
					{
						type: "number",
						description: "Multiplier:",
						groups: [3, 4],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [5, 6],
					},
				],
			},

			{
				name: "Old Color Affinity boosters",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /Boosts (?:the )?Color Affinity/i,
			},

			{
				name: "Color Affinity Boost",
				targets: ["captain"],
				regex:
					/Boosts (?:the )?Color Affinity of (?=((?:[^c."]+|c(?!har))*))\1characters? by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3, 4, 5],
					},
					...createUniversalSubmatcher([1]),
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected positions:",
					},
					...createPositionsSubmatchers([1]),
				],
			},

			{
				name: "Color Affinity Boost",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/Boosts (?:the )?Color Affinity of (?=((?:[^c."]+|c(?!har))*))\1characters? by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)? for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)?(?: for ([?\d]+\+?)(?:-([?\d]+))? turns?)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3, 7, 8],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [5, 6, 10, 11],
					},
					{
						type: "option",
						description: "Allowing Override",
						regex: /allowing override/,
						radioGroup: "targets",
						groups: [4, 9],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Buff Clear Immune",
						regex: /preventing buff clears/,
						radioGroup: "targets",
						groups: [4, 9],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Double Enhance",
						regex: /can be enhanced up to 2 times/,
						radioGroup: "targets",
						groups: [4, 9],
						cssClasses: ["min-width-6"],
					},
					...createUniversalSubmatcher([1]),
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected positions:",
					},
					...createPositionsSubmatchers([1]),
				],
			},

			{
				name: "Old Additional Damage dealer",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /Additional.+Damage/i,
			},

			{
				name: "Additional Damage",
				targets: ["captain", "sailor"],
				regex:
					/Adds ([?.\d]+)x(?:-([?.\d]+)x)? character's ATK as Additional (Typeless )?Damage/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [1, 2],
					},
				],
			},

			{
				name: "Additional Damage",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/Adds ([?.\d]+)x(?:-([?.\d]+)x)? (?:the )?((?:supported )?character's ATK|damage taken from enemies (?:in the previous turn|before the special is activated)) as Additional (Typeless )?Damage (?:to ([^."]+?)attacks )?for ([?\d]+\+?)(?:-([?\d]+))? turns?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [1, 2],
					},
					{
						type: "separator",
						description: "Multiplier basis:",
					},
					{
						type: "option",
						description: "Character's ATK",
						regex: /character's ATK/i,
						radioGroup: "basis",
						groups: [3],
					},
					{
						type: "option",
						description: "Health Loss",
						regex: /^damage taken from enemies/i,
						radioGroup: "basis",
						groups: [3],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [6, 7],
					},
					...createUniversalSubmatcher([5], "all|type|^$"),
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([5]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([5]),
					{
						type: "separator",
						description: "Affected positions:",
					},
					...createPositionsSubmatchers([5]),
				],
			},

			{
				name: "Status ATK Boost",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex: /Boosts ATK.+against.+enemies/i,
			},

			{
				name: "Enemy Type-Based Damage booster",
				targets: ["sailor"],
				regex: /Boosts this character's damage against/i,
			},

			{
				name: "Old Delay Status ATK boosters",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /Boosts ATK.+against.+delayed.+enemies/i,
			},

			{
				name: "Status ATK Boost: Delay",
				targets: ["captain"],
				regex:
					/Boosts (?:ATK|([^."]*?)characters? ATK) against[^."]+?delayed enemies[^."]+?by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3, 4, 5],
					},
				],
			},

			{
				name: "Status ATK Boost: Delay",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/Boosts ATK against[^."]+?delayed enemies[^."]+?by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)? for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)?(?: for ([?\d]+\+?)(?:-([?\d]+))? turns?)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [1, 2, 6, 7],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [4, 5, 9, 10],
					},
					{
						type: "option",
						description: "Double Enhance",
						regex: /can be enhanced up to 2 times/,
						radioGroup: "targets",
						groups: [3, 8],
						cssClasses: ["min-width-6"],
					}
				],
			},

			{
				name: "Old Defense Reduction Status ATK boosters",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /Boosts ATK.+against.+enemies.+reduced defense/i,
			},

			{
				name: "Status ATK Boost: Defense Reduction",
				targets: ["captain"],
				regex:
					/Boosts (?:ATK|([^."]*?)characters? ATK) against[^."]+?enemies with reduced defense[^."]+?by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3, 4, 5],
					},
				],
			},

			{
				name: "Status ATK Boost: Defense Reduction",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/Boosts ATK against[^."]+?enemies with reduced defense[^."]+?by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)? for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)?(?: for ([?\d]+\+?)(?:-([?\d]+))? turns?)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [1, 2, 6, 7],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [4, 5, 9, 10],
					},
					{
						type: "option",
						description: "Double Enhance",
						regex: /can be enhanced up to 2 times/,
						radioGroup: "targets",
						groups: [3, 8],
						cssClasses: ["min-width-6"],
					}
				],
			},

			{
				name: "Old Increase Defense Status ATK boosters",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /Boosts ATK.+against.+enemies.+increased defense/i,
			},

			{
				name: "Status ATK Boost: Increase Defense",
				//targets: [ 'captain' ],
				targets: [],
				regex:
					/Boosts (?:ATK|([^."]*?)characters? ATK) against[^."]+?enemies with increased defense[^."]+?by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3, 4, 5],
					},
				],
			},

			{
				name: "Status ATK Boost: Increase Defense",
				targets: ["special"],
				regex:
					/Boosts ATK against[^."]+?enemies with increased defense[^."]+?by ([?.\d]+)x(?:-([?.\d]+)x)? for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?(?: for ([?\d]+\+?)(?:-([?\d]+))? turns?)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [1, 2, 5, 6],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [3, 4, 7, 8],
					},
				],
			},

			{
				name: "Old Poison Status ATK boosters",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex:
					/Boosts ATK.+against.+?((strongly )?poisoned.+enemies|enemies.+inflicted with ((strong )?poison|Toxic))/i,
			},

			{
				name: "Status ATK Boost: Poison",
				targets: ["captain"],
				regex:
					/Boosts (?:ATK|([^."]*?)characters? ATK) against[^."]+?(?:(?:(?:strongly )?poisoned.+enemies|enemies inflicted with (?:(?:strong )?poison|Toxic)))[^."]+?by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3, 4, 5],
					},
				],
			},

			{
				name: "Status ATK Boost: Poison",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/Boosts ATK against[^."]+?(?:(?:(?:strongly )?poisoned.+enemies|enemies inflicted with (?:(?:strong )?poison|Toxic)))[^."]+?by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)? for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)?(?: for ([?\d]+\+?)(?:-([?\d]+))? turns?)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [1, 2, 6, 7],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [4, 5, 9, 10],
					},
					{
						type: "option",
						description: "Double Enhance",
						regex: /can be enhanced up to 2 times/,
						radioGroup: "targets",
						groups: [3, 8],
						cssClasses: ["min-width-6"],
					}
				],
			},

			{
				name: "Old Burn Status ATK boosters",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /Boosts ATK.+against.+enemies.+burn/i,
			},

			{
				name: "Status ATK Boost: Burn",
				targets: ["captain"],
				regex:
					/Boosts (?:ATK|([^."]*?)characters? ATK) against[^."]+?enemies inflicted with burn[^."]+?by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3, 4, 5],
					},
				],
			},

			{
				name: "Status ATK Boost: Burn",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/Boosts ATK against[^."]+?enemies inflicted with burn[^."]+?by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)? for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)?(?: for ([?\d]+\+?)(?:-([?\d]+))? turns?)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [1, 2, 6, 7],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [4, 5, 9, 10],
					},
					{
						type: "option",
						description: "Double Enhance",
						regex: /can be enhanced up to 2 times/,
						radioGroup: "targets",
						groups: [3, 8],
						cssClasses: ["min-width-6"],
					}
				],
			},

			{
				name: "Old Negative Status ATK boosters",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /Boosts ATK.+against.+enemies.+negative/i,
			},

			{
				name: "Status ATK Boost: Negative",
				targets: ["captain"],
				regex:
					/Boosts (?:ATK|([^."]*?)characters? ATK) against[^."]+?enemies inflicted with negative[^."]+?by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3, 4, 5],
					},
				],
			},

			{
				name: "Status ATK Boost: Negative",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/Boosts ATK against[^."]+?enemies inflicted with negative[^."]+?by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)? for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)?(?: for ([?\d]+\+?)(?:-([?\d]+))? turns?)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [1, 2, 6, 7],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [4, 5, 9, 10],
					},
					{
						type: "option",
						description: "Double Enhance",
						regex: /can be enhanced up to 2 times/,
						radioGroup: "targets",
						groups: [3, 8],
						cssClasses: ["min-width-6"],
					}
				],
			},

			{
				name: "Status ATK Boost: Paralysis",
				targets: ["captain"],
				regex:
					/Boosts (?:ATK|([^."]*?)characters? ATK) against[^."]+?paralyzed enemies[^."]+?by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3, 4, 5],
					},
				],
			},

			{
				name: "Status ATK Boost: Paralysis",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/Boosts ATK against[^."]+?paralyzed enemies[^."]+?by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)? for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)?(?: for ([?\d]+\+?)(?:-([?\d]+))? turns?)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [1, 2, 6, 7],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [4, 5, 9, 10],
					},
					{
						type: "option",
						description: "Double Enhance",
						regex: /can be enhanced up to 2 times/,
						radioGroup: "targets",
						groups: [3, 8],
						cssClasses: ["min-width-6"],
					}
				],
			},

			{
				name: "Status ATK Boost: Increase Damage Taken",
				targets: ["captain"],
				regex:
					/Boosts (?:ATK|([^."]*?)characters? ATK) against[^."]+?enemies inflicted with Increase Damage Taken[^."]+?by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3, 4, 5],
					},
				],
			},

			{
				name: "Status ATK Boost: Increase Damage Taken",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/Boosts ATK against[^."]+?enemies inflicted with Increase Damage Taken[^."]+?by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)? for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)?(?: for ([?\d]+\+?)(?:-([?\d]+))? turns?)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [1, 2, 6, 7],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [4, 5, 9, 10],
					},
					{
						type: "option",
						description: "Double Enhance",
						regex: /can be enhanced up to 2 times/,
						radioGroup: "targets",
						groups: [3, 8],
						cssClasses: ["min-width-6"],
					}
				],
			},

			{
				name: "Status ATK Boost: Weaken",
				targets: ["captain"],
				regex:
					/Boosts (?:ATK|([^."]*?)characters? ATK) against[^."]+?enemies inflicted with Weaken[^."]+?by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3, 4, 5],
					},
				],
			},

			{
				name: "Status ATK Boost: Weaken",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/Boosts ATK against[^."]+?enemies inflicted with Weaken[^."]+?by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)? for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)?(?: for ([?\d]+\+?)(?:-([?\d]+))? turns?)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [1, 2, 6, 7],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [4, 5, 9, 10],
					},
					{
						type: "option",
						description: "Double Enhance",
						regex: /can be enhanced up to 2 times/,
						radioGroup: "targets",
						groups: [3, 8],
						cssClasses: ["min-width-6"],
					}
				],
			},

			{
				name: "Status ATK Boost: Marked",
				targets: ["special", "superSpecial"],
				regex:
				/Boosts ATK against[^."]+?Marked enemies[^."]+?by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)? for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)?(?: for ([?\d]+\+?)(?:-([?\d]+))? turns?)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [1, 2, 6, 7],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [4, 5, 9, 10],
					},
					{
						type: "option",
						description: "Double Enhance",
						regex: /can be enhanced up to 2 times/,
						radioGroup: "targets",
						groups: [3, 8],
						cssClasses: ["min-width-6"],
					}
				],
			},

			{
				name: "Old Specific Enemy ATK boosters",
				targets: ["support"],
				regex: /Boosts the supported character's ATK.+against/i,
			},

			{
				name: "Specific Enemy ATK Boost",
				targets: ["support"],
				regex:
					/Boosts the supported character's ATK by ([?.\d]+)x against ([^."]+)/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [1],
					},
					{
						type: "text",
						description: "Enemy name:",
						groups: [2],
					},
				],
			},

			{
				name: "Old Multiplicative Chain Boosters",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /Boosts.+chain multiplier/i,
			},

			{
				name: "Chain Boost: Multiplicative",
				targets: ["captain"],
				regex:
					/Boosts Chain Multiplier Growth Rate by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [1, 2, 3, 4],
					},
				],
			},

			{
				name: "Chain Boost: Multiplicative",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/Boosts Chain Multiplier Growth Rate by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)? for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)?(?: for ([?\d]+\+?)(?:-([?\d]+))? turns?)?)?/i,
				submatchers: [
					{
						type: "option",
						description: "Allowing Override",
						regex: /allowing override/,
						radioGroup: "targets",
						groups: [3, 7],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Buff Clear Immune",
						regex: /preventing buff clears/,
						radioGroup: "targets",
						groups: [3, 7],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Double Enhance",
						regex: /can be enhanced up to 2 times/,
						radioGroup: "targets",
						groups: [3, 7],
						cssClasses: ["min-width-6"],
					},
					{
						type: "number",
						description: "Multiplier:",
						groups: [1, 2, 5, 6],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [4, 5, 8, 9],
					},
				],
			},

			{
				name: "Old Additive Chain Boosters",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /Adds.+to Chain/i,
			},

			{
				name: "Chain Boost: Additive",
				targets: ["captain"],
				regex: /adds ([?.\d]+)x(?:-([?.\d]+)x)? to (?:the )?Chain multiplier/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [1, 2],
					},
				],
			},

			{
				name: "Chain Boost: Additive",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/adds ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)? to (?:the )?Chain multiplier for ([?\d]+\+?)(?:-([?\d]+))? turns?/i,
				submatchers: [
					{
						type: "option",
						description: "Allowing Override",
						regex: /allowing override/,
						radioGroup: "targets",
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Buff Clear Immune",
						regex: /preventing buff clears/,
						radioGroup: "targets",
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Double Enhance",
						regex: /can be enhanced up to 2 times/,
						radioGroup: "targets",
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "number",
						description: "Multiplier:",
						groups: [1, 2],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [4, 5],
					},
				],
			},

			{
				name: "Chain Boost: Tap Timing",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex:
					/increases Chain Tap Timing Bonus of ([^."]+?)characters? to \+([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)? for (\d) turns? depending on Tap Timing/i,
				submatchers: [
					{
						type: "option",
						description: "Allowing Override",
						regex: /allowing override/,
						radioGroup: "targets",
						groups: [4],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Buff Clear Immune",
						regex: /preventing buff clears/,
						radioGroup: "targets",
						groups: [4],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Double Enhance",
						regex: /can be enhanced up to 2 times/i,
						radioGroup: "targets",
						groups: [4],
						cssClasses: ["min-width-6"],
					},
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([1]),
				],
			},

			{
				name: "Old Chain Lockers",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /Locks the chain multiplier/i,
			},

			{
				name: "Chain Limit: Lock",
				targets: ["captain"],
				regex:
					/Locks the chain multiplier at ([?.\d]+)x(?:-([?.\d]+)x)?(?:, at ([?.\d]+)x(?:-([?.\d]+)x)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [1, 2, 3, 4],
					},
				],
			},

			{
				name: "Chain Limit: Lock",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/Locks the chain multiplier at ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)? for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, at ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)?(?: for ([?\d]+\+?)(?:-([?\d]+))? turns?)?)?/i,
				submatchers: [
					{
						type: "option",
						description: "Allowing Override",
						regex: /allowing override/,
						radioGroup: "targets",
						groups: [3, 7],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Double Enhance",
						regex: /can be enhanced up to 2 times/,
						radioGroup: "targets",
						groups: [3, 7],
						cssClasses: ["min-width-6"],
					},
					{
						type: "number",
						description: "Multiplier:",
						groups: [1, 2, 5, 6],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [4, 5, 8, 9],
					},
				],
			},

			{
				name: "Old Boundary Chain Limiters",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /Sets chain boundaries/i,
			},

			{
				name: "Chain Limit: Boundary",
				targets: ["captain"],
				regex: /Sets chain boundaries to ([?.\d]+)x and ([?.\d]+)x/i,
				submatchers: [
					{
						type: "number",
						description: "Lower Bound:",
						groups: [1],
					},
					{
						type: "number",
						description: "Upper Bound:",
						groups: [2],
					},
				],
			},

			{
				name: "Chain Limit: Boundary",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/Sets chain boundaries to ([?.\d]+)x(?:-([?.\d]+)x)? and ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)? for ([?\d]+\+?)(?:-([?\d]+))? turns?/i,
				submatchers: [
					{
						type: "option",
						description: "Allowing Override",
						regex: /allowing override/,
						radioGroup: "targets",
						groups: [5],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Double Enhance",
						regex: /can be enhanced up to 2 times/,
						radioGroup: "targets",
						groups: [5],
						cssClasses: ["min-width-6"],
					},
					{
						type: "number",
						description: "Lower Bound:",
						groups: [1, 2],
					},
					{
						type: "number",
						description: "Upper Bound:",
						groups: [3, 4],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [6, 7],
					},
				],
			},

			{
				name: "Delayed Effect: ATK Boost",
				targets: ["special", "superSpecial"],
				regex:
					/(Following the activation.+boosts.+ATK|If during that turn.+boosts.+ATK)/i,
			},

			{
				name: "Old Critical Hit",
				targets: ["potential"],
				regex: /Critical Hit/i,
			},

			{
				name: "Critical Hit",
				targets: ["potential"],
				regex:
					/If you hit a PERFECT with this character, there is an? ([?\d]+)% chance to deal ([?\d]+)% of this character's attack in extra damage/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Extra Damage Percentage:",
						groups: [2],
					},
				],
			},

			{
				// Split from "Enrage/Reduce Increase Damage Taken" PA
				name: "Enrage",
				targets: ["potential"],
				regex: /Boosts base ATK by ([?\d]+) the turn after taking damage/i,
				submatchers: [
					{
						type: "number",
						description: "Static boost:",
						groups: [1],
					},
				],
			},

			{
				// Split from "Nutrition/Reduce Hunger Stacks" PA
				name: "Nutrition",
				targets: ["potential"],
				// it is a variable atk boost, going 0-x when it has "up to"
				regex:
					/Boosts base ATK by (up to )?([?,\d]+) the turn after recovering (up to )?([?,\d]+) HP/i,
				submatchers: [
					{
						type: "number",
						description: "ATK Boost:",
						groups: [2],
					},
					{
						type: "option",
						description: "Variable ATK boost",
						regex: /^up/,
						groups: [1, 3],
						cssClasses: ["min-width-12"],
					},
					{
						type: "number",
						description: "HP Requirement:",
						groups: [4],
					},
				],
			},

			{
				name: "Set Target",
				targets: ["captain", "special", "superSpecial"],
				regex:
					/Inflicts all (?:the )?enemies with Set Target, increasing damage taken from (?=((?:[^c."]+|c(?!har))*))\1characters? by ([?.\d]+)x(?:-([?.\d]+)x)? and reducing special cooldown of (?=((?:[^c."]+|c(?!har))*))\4characters?(?: by ([?\d]+\+?)(?:-([?\d]+))? turns?)(?:\D+,) for ([?\d]+\+?)(?:-([?\d]+))? turns?/i,
				submatchers: [
					{
						type: "number",
						description: "Set Target Turns:",
						groups: [7, 8],
					},
					{
						type: "separator",
						description: "---Increased Damage Stuff---",
					},
					{
						type: "number",
						description: "Increased Damage Multiplier:",
						groups: [2, 3],
					},
					{
						type: "separator",
						description: "Increased Damage Types:",
					},
					...createTypesSubmatchers([1]),
					{
						type: "separator",
						description: "Increased Damage Classes:",
					},
					...createClassesSubmatchers([1]),
					{
						type: "separator",
						description: "---CD Reduce Stuff---",
					},
					{
						type: "number",
						description: "CD Reduce Turns:",
						groups: [5, 6],
					},
					{
						type: "separator",
						description: "CD Reduced Types:",
					},
					...createTypesSubmatchers([4]),
					{
						type: "separator",
						description: "CD Reduced Classes:",
					},
					...createClassesSubmatchers([4]),
				],
			},

			{
				name: "Territory",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex:
					/Applies Territory: (?=((?:[^ct."]+|c(?!lass)|t(?!ype))*))\1(?:class|type) to the field, boosts ATK by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, (\D+?),)? and reduces damage received by ([?.\d]+)%(?:-([?.\d]+)%)? (?:based|depending) on number of characters matching the territory, for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, for ([?\d]+\+?)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3],
					},
					{
						type: "number",
						description: "Percentage:",
						groups: [5, 6],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [7, 8, 9, 10],
					},
					{
						type: "separator",
						description: "Affected Types:",
					},
					...createTypesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected Classes:",
					},
					...createClassesSubmatchers([1]),
				],
			},

			{
				name: "Critical Hit Rate",
				targets: ["captain", "special", "superSpecial", "swap"],
				regex:
					/Boosts Critical Hit Rate of (?=((?:[^c."]+|c(?!har))*))\1characters? by(?: up to)? ([?.\d]+)%(?:-([?.\d]+)%)? for ([?\d]+\+?)(?:-([?\d]+))? turns?/i,
				submatchers: [
					{
						type: "number",
						description: "Increased Critical Rate Turns:",
						groups: [4, 5],
					},
					{
						type: "number",
						description: "Increased Critical Rate Percentage:",
						groups: [2, 3],
					},
					{
						type: "separator",
						description: "Increased Critical Rate Types:",
					},
					...createTypesSubmatchers([1]),
					{
						type: "separator",
						description: "Increased Critical Rate Classes:",
					},
					...createClassesSubmatchers([1]),
				],
			},

			{
				name: "Critical Hit Damage",
				targets: ["captain", "special", "superSpecial", "swap"],
				regex:
					/Boosts Critical Hit Damage of (?=((?:[^c."]+|c(?!har))*))\1characters? by(?: up to)? ([?.\d]+)%(?:-([?.\d]+)%)? for ([?\d]+\+?)(?:-([?\d]+))? turns?/i,
				submatchers: [
					{
						type: "number",
						description: "Increased Critical Damage Turns:",
						groups: [4, 5],
					},
					{
						type: "number",
						description: "Increased Critical Damage Percentage:",
						groups: [2, 3],
					},
					{
						type: "separator",
						description: "Increased Critical Damage Types:",
					},
					...createTypesSubmatchers([1]),
					{
						type: "separator",
						description: "Increased Critical Damage Classes:",
					},
					...createClassesSubmatchers([1]),
				],
			},

			{
				name: "Advantageous Class Effect",
				targets: ["captain", "special", "superSpecial", "support"],
				regex:
					/Boosts Advantageous Class Effect of (?=((?:[^c."]+|c(?!har))*))\1characters? by(?: up to)? ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)? for ([?\d]+\+?)(?:-([?\d]+))? turns?/i,
				submatchers: [
					{
						type: "number",
						description: "Advantageous Class Effect Boost Turns:",
						groups: [5, 6],
					},
					{
						type: "number",
						description: "Advantageous Class Effect Boost Amount:",
						groups: [2, 3],
					},
					{
						type: "option",
						description: "Allowing Override",
						regex: /allowing override/,
						radioGroup: "targets",
						groups: [4],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Advantageous Class Effect Boosted Classes:",
					},
					...createClassesSubmatchers([1]),
				],
			},

			{
				name: "Final Tap ATK",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex:
					/boosts Final Tap ATK of (?=((?:[^c."]+|c(?!har))*))\1characters? by ([?.\d]+)%(?:-([?.\d]+)%)?(?:, by ([?.\d]+)%(?:-([?.\d]+)%)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Percentage:",
						groups: [2, 3, 4, 5],
					},
					...createUniversalSubmatcher([1]),
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([1]),
				],
			},

			{
				name: "Crew Damage Reduction to ATK",
				targets: ["captain", "special", "superSpecial", "support"],
				regex:
					/boosts Crew Damage Reduction to ATK of (?=((?:[^c."]+|c(?!har))*))\1characters? by ([?.\d]+)x-([?.\d]+)x, proportional to the strength of crew's Percent Damage Reduction buff([^,]*), for ([?\d]+\+?)(?:-([?\d]+))? turns?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [5, 6],
					},
					{
						type: "option",
						description: "Buff Clear Immune",
						regex: /preventing buff clears/,
						radioGroup: "targets",
						groups: [4],
						cssClasses: ["min-width-6"],
					},
					...createUniversalSubmatcher([1]),
					{
						type: "separator",
						description: "Affected Types:",
					},
					...createTypesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected Classes:",
					},
					...createClassesSubmatchers([1]),
				],
			},
			{
				name: "Enemy Damage Reduction to ATK",
				targets: ["special"],
				regex:
					/boosts Enemy Damage Reduction to ATK of (?=((?:[^c."]+|c(?!har))*))\1characters? by ([?.\d]+)x-([?.\d]+)x, proportional to the strength of enemies' Percent Damage Reduction buff, for ([?\d]+\+?)(?:-([?\d]+))? turns?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [4, 5],
					},
					...createUniversalSubmatcher([1]),
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([1]),
				],
			},

			{
				name: "Super Effect Boost",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/Boosts Super (?:Type|Class) Effects of (?=((?:[^c."]+|c(?!har))*))\1characters to ([?.\d]+)x(?:-([?.\d]+)x)? for ([?\d]+\+?)(?:-([?\d]+))? turns?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [4, 5],
					},
					{
						type: "separator",
						description: "Affected Types:",
					},
					...createTypesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected Classes:",
					},
					...createClassesSubmatchers([1]),
				],
			},
		],
		"Modify Buff": [
			{
				name: "Old Buff Duration Extender",
				targets: ["special", "superSpecial", "swap", "support"],
				regex: /increases duration of any/i,
			},

			{
				name: "Buff Duration Extender",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"support",
					"sailor",
				],
				regex:
					/increases duration of any ([^."]+?)by ([?\d]+\+?)(?:-([?\d]+))? turns?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [2, 3],
					},
					// following should also match "...boosting"
					{
						type: "separator",
						description: "Damage Boosting Buffs",
					},
					{
						type: "option",
						description: "ATK",
						// could've used negative lookbehind, but some platforms don't support it
						// either ATK boosting buffs or ATK UP or ATK boost
						regex: /(?:^|(?!base|atus).{4} )ATK (?:boost|UP)/i, // do not match "base ATK boost" and "Status ATK boost"
						groups: [1],
						cssClasses: ["min-width-3"],
					},
					{
						type: "option",
						description: "Orb",
						regex: /Orb (?:Amplification|boost|effect)/i,
						groups: [1],
						cssClasses: ["min-width-3"],
					},
					{
						type: "option",
						description: "Color Affinity",
						regex: /Color Affinity/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Base ATK",
						regex: /Base ATK boost/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Status ATK",
						regex: /Status ATK boost/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Chain Lock",
						regex: /Chain Lock/i, // should also match "Chain Lock/Limit/Boundary"
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Chain Addition",
						regex: /Chain Addition/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Chain Multiplication",
						regex: /(?:Chain Multiplication|Chain Multiplier Growth Rate)/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "option",
						description: "Chain Tap Timing",
						regex: /Chain Tap Timing/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "option",
						description: "Crew Damage Reduction to ATK",
						regex: /Crew Damage Reduction to ATK/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "separator",
						description: "Others",
					},
					{
						type: "option",
						description: "Percent Damage Reduction",
						regex: /Percent Damage Reduction/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "option",
						description: "Threshold Damage Reduction",
						regex: /Threshold Damage Reduction/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "option",
						description: "Damage Nullification",
						regex: /Damage Nullification/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "option",
						description: "EOT Damage",
						regex: /End of Turn Damage/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "EOT Healing",
						regex: /End of Turn Healing/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
				],
			},

			{
				name: "Buff Duration Reducer",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"support",
					"sailor",
				],
				regex:
					/decreases duration of any ([^."]+?)by ([?\d]+\+?)(?:-([?\d]+))? turns?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [2, 3],
					},
					// following should also match "...boosting"
					{
						type: "separator",
						description: "Damage Boosting Buffs",
					},
					{
						type: "option",
						description: "ATK",
						// could've used negative lookbehind, but some platforms don't support it
						// either ATK boosting buffs or ATK UP or ATK boost
						regex: /(?:^|(?!base|atus).{4} )ATK (?:boost|UP)/i, // do not match "base ATK boost" and "Status ATK boost"
						groups: [1],
						cssClasses: ["min-width-3"],
					},
					{
						type: "option",
						description: "Orb",
						regex: /Orb (?:Amplification|boost|effect)/i,
						groups: [1],
						cssClasses: ["min-width-3"],
					},
					{
						type: "option",
						description: "Color Affinity",
						regex: /Color Affinity/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Base ATK",
						regex: /Base ATK boost/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Status ATK",
						regex: /Status ATK boost/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Chain Lock",
						regex: /Chain Lock/i, // should also match "Chain Lock/Limit/Boundary"
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Chain Addition",
						regex: /Chain Addition/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Chain Multiplication",
						regex: /(?:Chain Multiplication|Chain Multiplier Growth Rate)/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "option",
						description: "Chain Tap Timing",
						regex: /Chain Tap Timing/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "separator",
						description: "Others",
					},
					{
						type: "option",
						description: "Percent Damage Reduction",
						regex: /Percent Damage Reduction/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "option",
						description: "Threshold Damage Reduction",
						regex: /Threshold Damage Reduction/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "option",
						description: "Damage Nullification",
						regex: /Damage Nullification/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "option",
						description: "EOT Damage",
						regex: /End of Turn Damage/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "EOT Healing",
						regex: /End of Turn Healing/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
				],
			},

			{
				// Just a copy from Buff Duration Extenders, except only damage-boosting buffs
				name: "Buff/Debuff Enhancers",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"support",
					"sailor",
				],
				// Roger/WB "increases or decreases"
				regex:
					/increases (?:or decreases )?boost effects of ([^."]+?)(?:by \+?([?.\d]+)x?(?:-([?.\d]+)x)?|to ([?.\d]+)x(?:-([?.\d]+)x)?)/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3],
					},
					{
						type: "number",
						description: "Set to:",
						groups: [4, 5],
					},
					// following should also match "...boosting"
					{
						type: "separator",
						description: "Damage Boosting Buffs",
					},
					{
						type: "option",
						description: "ATK",
						// could've used negative lookbehind, but some platforms don't support it
						// either ATK boosting buffs or ATK UP or ATK boost
						regex: /(?:^|(?!base|atus).{4} )ATK (?:boost|UP)/i, // do not match "base ATK boost" and "Status ATK boost"
						groups: [1],
						cssClasses: ["min-width-3"],
					},
					{
						type: "option",
						description: "Orb",
						regex: /Orb (?:Amplification|boost|effect)/i,
						groups: [1],
						cssClasses: ["min-width-3"],
					},
					{
						type: "option",
						description: "Color Affinity",
						regex: /Color Affinity/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Base ATK",
						regex: /Base ATK boost/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Status ATK",
						regex: /Status ATK boost/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Chain Lock",
						regex: /Chain Lock/i, // should also match "Chain Lock/Limit/Boundary"
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Chain Addition",
						regex: /Chain Addition/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Chain Multiplication",
						regex: /(?:Chain Multiplication|Chain Multiplier Growth Rate)/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "option",
						description: "Chain Tap Timing",
						regex: /Chain Tap Timing/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "separator",
						description: "Damage Boosting Debuffs",
					},
					{
						type: "option",
						description: "Increase Damage Taken",
						regex: /Increase Damage Taken/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
				],
			},

			{
				name: "Double Buff Enabler",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"support",
					"swap"
				],
				regex:
					/enables ([^."]+?) to be enhanced up to 2 times/i,
				submatchers: [
					// following should also match "...boosting"
					{
						type: "separator",
						description: "Damage Boosting Buffs",
					},
					{
						type: "option",
						description: "ATK",
						// could've used negative lookbehind, but some platforms don't support it
						// either ATK boosting buffs or ATK UP or ATK boost
						regex: /(?:^|(?!base|atus).{4} )ATK (?:boost|UP)/i, // do not match "base ATK boost" and "Status ATK boost"
						groups: [1],
						cssClasses: ["min-width-3"],
					},
					{
						type: "option",
						description: "Orb",
						regex: /Orb (?:Amplification|boost|effect)/i,
						groups: [1],
						cssClasses: ["min-width-3"],
					},
					{
						type: "option",
						description: "Color Affinity",
						regex: /Color Affinity/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Base ATK",
						regex: /Base ATK boost/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Status ATK",
						regex: /Status ATK boost/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Chain Lock",
						regex: /Chain Lock/i, // should also match "Chain Lock/Limit/Boundary"
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Chain Addition",
						regex: /Chain Addition/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Chain Multiplication",
						regex: /(?:Chain Multiplication|Chain Multiplier Growth Rate)/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "option",
						description: "Chain Tap Timing",
						regex: /Chain Tap Timing/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "separator",
						description: "Damage Boosting Debuffs",
					},
					{
						type: "option",
						description: "Increase Damage Taken",
						regex: /Increase Damage Taken/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
				],
			},

			{
				name: "Stackable: ATK Boost",
				targets: ["captain", "special", "superSpecial"],
				regex: /converts ATK Up into a Stackable ATK Up/i,
			},

			{
				name: "Stackable: Orb Boost",
				targets: ["captain", "special", "superSpecial"],
				regex: /converts Orb Amplification into a Stackable Orb Amplification/i,
			},

			{
				name: "Stackable: Color Affinity",
				targets: ["captain", "special", "superSpecial"],
				regex: /converts Color Affinity into a Stackable Color Affinity/i,
			},
		],
		"Ability Requirements": [
			{
				name: "Turn Limited Effects",
				targets: ["captain"],
				regex: /for \d+ turn/i,
			},

			{
				name: "Old HP-based ATK %target%",
				targets: ["captain"],
				regex:
					/(?:Boosts|their) ATK(?:(?!\.\D)[^"])+?depending on the crew's current HP/i,
			},

			{
				name: "Requirement: HP Percentage",
				targets: ["captain"],
				// make sure that it doesn't "jump over" "boosts", which would be a different type of boost already
				// "explicit greedy alternation"
				// should NOT match "Boosts ATK of Striker characters by 2x, reduces damage received up to 30% depending on the crew's current HP"
				regex:
					/(?:Boosts|their) ATK(?=(([^b."]+|b(?!y |oosts)|\.[?\d])+))\1by ([?.\d]+)x(?:-([?.\d]+)x)?,? depending on the crew's current HP/i,
			},

			{
				name: "Requirement: Team Composition",
				targets: ["captain", "special"],
				regex: /your crew/i,
			},

			{
				name: "Requirement: Captain Swap",
				targets: ["captain"],
				regex: /becomes your captain/i,
			},

			{
				name: "Requirement: Tap Timing",
				targets: ["captain"],
				regex: /(after scoring|following a chain|perfect|great|good)/i,
			},

			{
				name: "Old Type-boosting %target%",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex:
					/Boosts (ATK|HP|RCV|ATK and HP|ATK and RCV|HP and RCV|ATK, HP and RCV) of[^(,.)]+(STR|DEX|QCK|PSY|INT|Type)\b/i,
			},

			{
				name: "Requirement: Type",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				// `(?:(?!char)[^."])*?` is a "tempered dot"
				// ensure that there is one type (there could be abilities that boost type and classes)
				// make it stop when it finds "char" (characters)
				// include "Dominant Type" boosters
				regex:
					/Boosts (?:ATK|HP|RCV|ATK and HP|ATK and RCV|HP and RCV|ATK, HP and RCV) of ((?:(?!char)[^."])*?(?:\[(?:STR|DEX|QCK|PSY|INT)\]|Type)[^."]+?)character/i,
				submatchers: [...createTypesSubmatchers([1])],
			},

			{
				name: "Requirement: Type",
				targets: ["sailor"],
				// `(?:(?!char)[^."])*?` is a "tempered dot"
				// ensure that there is one type (there could be abilities that boost type and classes)
				// make it stop when it finds "char" (characters)
				// include "Dominant Type" boosters
				regex:
					/Boosts base (?:ATK|HP|RCV|ATK and HP|ATK and RCV|HP and RCV|ATK, HP and RCV) of ((?:(?!char)[^."])*?(?:\[(?:STR|DEX|QCK|PSY|INT)\]|Type)[^."]+?)character/i,
				submatchers: [...createTypesSubmatchers([1])],
			},

			{
				name: "Old Class-boosting %target%",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex:
					/Boosts (ATK|HP|RCV|ATK and HP|ATK and RCV|HP and RCV|ATK, HP and RCV) of[^(,.)]+(Slasher|Striker|Fighter|Shooter|Free Spirit|Cerebral|Powerhouse|Driven)/i,
			},

			{
				name: "Requirement: Class",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				// `(?:(?!char)[^."])*?` is a "tempered dot"
				// ensure that there is one class (there could be abilities that boost type and classes)
				// make it stop when it finds "char" (characters)
				regex:
					/Boosts (?:ATK|HP|RCV|ATK and HP|ATK and RCV|HP and RCV|ATK, HP and RCV) of ((?:(?!char)[^."])*?(?:Slasher|Striker|Fighter|Shooter|Free Spirit|Cerebral|Powerhouse|Driven)[^."]+?)character/i,
				submatchers: [...createClassesSubmatchers([1])],
			},

			{
				name: "Requirement: Class",
				targets: ["sailor"],
				// `(?:(?!char)[^."])*?` is a "tempered dot"
				// ensure that there is one class (there could be abilities that boost type and classes)
				// make it stop when it finds "char" (characters)
				regex:
					/Boosts base (?:ATK|HP|RCV|ATK and HP|ATK and RCV|HP and RCV|ATK, HP and RCV) of ((?:(?!char)[^."])*?(?:Slasher|Striker|Fighter|Shooter|Free Spirit|Cerebral|Powerhouse|Driven)[^."]+?)character/i,
				submatchers: [...createClassesSubmatchers([1])],
			},

			{
				name: "Multiple Stage",
				targets: ["special"],
				regex: /description/i,
			},

			{
				name: "Requirement: HP Threshold",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /if HP is (below|above)/i,
			},

			{
				name: "Requirement: Damage Taken",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /(if total Damage Taken is|Every turn Damage Taken exceeds)/i,
			},

			{
				name: "Requirement: Overfill Healing",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /If there is more than \d+(,\d+)* Excess Healing(?: done)?/i,
			},

			{
				name: "Requirement: Beneficial Orb",
				targets: ["captain"],
				regex: /if they have a beneficial orb/i,
			},

			{
				name: "Requirement: Team Orb Composition",
				targets: ["special"],
				regex: /your( crew.+characters with|.+Captain's orb is)/i,
			},

			{
				name: "Old Captain Composition Requirement %target%",
				targets: ["special"],
				regex: /your captain /i,
			},

			{
				name: "Captain Composition Requirement %target%",
				targets: ["special"],
				// match "If Zoro is your Captain or Friend/Guest Captain"
				// match "If your Captain is a Striker character"
				// match "If your captain is a [INT] or [PSY] character"
				// match "If during that turn, you hit 2 PERFECTS and your Captain is a Shooter character" (1665)
				// should NOT match "Swaps this unit with your captain for 2 turns"
				// should NOT match "boosts ATK of your Captain character by ..."
				regex: /your captain is|is your captain/i,
			},

			{
				name: "Old Universal Orb boosting %target%",
				targets: ["special"],
				regex: /Boosts Orb Effects of[^(,.)]+(all characters)/i,
			},

			{
				name: "Orb Boost Requirement: Universal",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				// `(?:(?!char)[^."])*?` is a "tempered dot"
				// ensure that there is one type (there could be abilities that boost type and classes)
				// make it stop when it finds "char" (characters)
				// interpret "Captain's Type", "Dominant Type", "each Type" as universal
				regex:
					/Boosts Orb Effects of ((?:(?!char)[^."])*?(?:all|type)[^."]+?)character/i,
			},

			{
				name: "Old Type-boosting Orb boosting %target%",
				targets: ["special"],
				regex: /Boosts Orb Effects of([^,.]+)(STR|DEX|QCK|PSY|INT|Type)\b/i,
			},

			{
				name: "Orb Boost Requirement: Type",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				// `(?:(?!char)[^."])*?` is a "tempered dot"
				// ensure that there is one type (there could be abilities that boost type and classes)
				// make it stop when it finds "char" (characters)
				// include "Dominant Type" boosters
				// should match "boosts Orb Effects of [PSY] and Slasher characters"
				regex:
					/Boosts Orb Effects of ((?:(?!char)[^."])*?(?:\[(?:STR|DEX|QCK|PSY|INT)\]|Type)[^."]+?)character/i,
				submatchers: [...createTypesSubmatchers([1])],
			},

			{
				name: "Old Class-boosting Orb boosting %target%",
				targets: ["special"],
				regex:
					/Boosts Orb Effects of[^(,.)]+(Slasher|Striker|Fighter|Shooter|Free Spirit|Cerebral|Powerhouse|Driven)/i,
			},

			{
				name: "Orb Boost Requirement: Class",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				// `(?:(?!char)[^."])*?` is a "tempered dot"
				// ensure that there is one class (there could be abilities that boost type and classes)
				// make it stop when it finds "char" (characters)
				// should match "boosts Orb Effects of [PSY] and Slasher characters"
				regex:
					/Boosts Orb Effects of ((?:(?!char)[^."])*?(?:Slasher|Striker|Fighter|Shooter|Free Spirit|Cerebral|Powerhouse|Driven)[^."]+?)character/i,
				submatchers: [...createClassesSubmatchers([1])],
			},

			{
				name: "Color Affinity Requirement: Universal",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				// `(?:(?!char)[^."])*?` is a "tempered dot"
				// ensure that there is one type (there could be abilities that boost type and classes)
				// make it stop when it finds "char" (characters)
				// interpret "Captain's Type", "Dominant Type", "each Type" as universal
				regex:
					/Boosts (?:the )?Color Affinity of ((?:(?!char)[^."])*?(?:all|type)[^."]+?)character/i,
			},

			{
				name: "Color Affinity Requirement: Type",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				// `(?:(?!char)[^."])*?` is a "tempered dot"
				// ensure that there is one type (there could be abilities that boost type and classes)
				// make it stop when it finds "char" (characters)
				// include "Dominant Type" boosters
				// should match "boosts Color Affinity of [PSY] and Slasher characters"
				regex:
					/Boosts (?:the )?Color Affinity of ((?:(?!char)[^."])*?(?:\[(?:STR|DEX|QCK|PSY|INT)\]|Type)[^."]+?)character/i,
				submatchers: [...createTypesSubmatchers([1])],
			},

			{
				name: "Color Affinity Requirement: Class",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				// `(?:(?!char)[^."])*?` is a "tempered dot"
				// ensure that there is one class (there could be abilities that boost type and classes)
				// make it stop when it finds "char" (characters)
				// should match "boosts Color Affinity of [PSY] and Slasher characters"
				regex:
					/Boosts (?:the )?Color Affinity of ((?:(?!char)[^."])*?(?:Slasher|Striker|Fighter|Shooter|Free Spirit|Cerebral|Powerhouse|Driven)[^."]+?)character/i,
				submatchers: [...createClassesSubmatchers([1])],
			},

			{
				name: "Final Stage Activated %target%",
				targets: ["support"],
				regex: /final stage/i,
			},

			{
				name: "Number Stage Activated %target%",
				targets: ["support"],
				regex: /when you reach the (\d+)\w{2} stage/i,
				submatchers: [
					{
						type: "number",
						description: "Stage:",
						groups: [1],
					},
				],
			},

			{
				name: "First Special Activated %target%",
				targets: ["support"],
				regex: /uses (their|a).+special/i,
			},

			{
				name: "Damage Special Activated %target%",
				targets: ["support"],
				regex: /Damage Dealing/i,
			},

			{
				name: "Buff Activated %target%",
				targets: ["support"],
				regex: /when (the|an) enemy (gains|applies)/i,
			},

			{
				name: "Debuff Activated %target%",
				targets: ["support"],
				regex: /when (the|an) enemy inflicts/i,
			},

			{
				name: "Tap Timing Activated %target%",
				targets: ["support"],
				regex: /PERFECT|GREAT|GOOD/,
			},

			{
				name: "Old Type-Supporting %target%",
				targets: ["support"],
				regex: /^[^,]+(STR|DEX|QCK|PSY|INT)\b/i,
			},

			{
				name: "Supporting Group: Type",
				targets: ["support"],
				regex:
					/^\[\{"Characters":"((?:(?!char)[^."])*?(?:\[(?:STR|DEX|QCK|PSY|INT)\]|Type)[^."]+?)character/i,
				submatchers: [...createTypesSubmatchers([1])],
			},

			{
				name: "Old Class-Supporting %target%",
				targets: ["support"],
				regex:
					/^[^,]+(Slasher|Striker|Fighter|Shooter|Free Spirit|Cerebral|Powerhouse|Driven)/i,
			},

			{
				name: "Supporting Group: Class",
				targets: ["support"],
				regex:
					/^\[\{"Characters":"((?:(?!char)[^."])*?(?:Slasher|Striker|Fighter|Shooter|Free Spirit|Cerebral|Powerhouse|Driven)[^."]+?)character/i,
				submatchers: [...createClassesSubmatchers([1])],
			},

			{
				name: "Supporting Group: Universal",
				targets: ["support"],
				regex: /^\[\{"Characters":"All character/i,
			},

			{
				name: "Supporting Group: Character Family",
				targets: ["support"],
				// if the supported does not have "character", it is a list of family names
				// the target string is JSON stringified, so there is no space in `":"`
				regex: /"Characters":"((?:(?!character)[^"])+)"/i,
				submatchers: [
					{
						type: "text",
						description: "Family:",
						groups: [1],
					},
				],
			},

			{
				name: "Special Cooldown Reducer on Special Activation",
				targets: ["sailor"],
				regex:
					/When any.+character uses a special, reduces special cooldown of this character/i,
			},

			{
				name: "Delayed Effect",
				targets: ["special"],
				regex: /(Following the activation|If during that turn|After \d+ turn)/i,
			},

			{
				name: "Delayed Effect: Turns",
				targets: ["special"],
				regex: /After (\d+) turn/i,
				submatchers: [
					{
						type: "number",
						description: "Number of Turns:",
						groups: [1],
					},
				],
			},

			{
				name: "Delayed Effect: Tap Timing",
				targets: ["special"],
				regex:
					/If during that turn you score (\d|all) (GOOD|GREAT|PERFECT) hits/i,
				submatchers: [
					{
						type: "number",
						description: "Number of Taps:",
						groups: [1],
					},
					{
						type: "option",
						description: "Good",
						regex: /Good/i,
						groups: [2],
						cssClasses: ["min-width-4"],
					},
					{
						type: "option",
						description: "Great",
						regex: /Great/i,
						groups: [2],
						cssClasses: ["min-width-4"],
					},
					{
						type: "option",
						description: "Perfect",
						regex: /Perfect/i,
						groups: [2],
						cssClasses: ["min-width-4"],
					},
				],
			},

			{
				name: "Requirement: Crew Effect",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/If your crew (?:has|is) ([^."]+?) when the special is activated,/i,
				submatchers: [
					{
						type: "separator",
						description: "Damage Boosting Buffs",
					},
					{
						type: "option",
						description: "ATK",
						// could've used negative lookbehind, but some platforms don't support it
						// either ATK boosting buffs or ATK UP or ATK boost
						regex: /(?:^|(?!base|atus).{4} )ATK (?:boost|UP)/i, // do not match "base ATK boost" and "Status ATK boost"
						groups: [1],
						cssClasses: ["min-width-3"],
					},
					{
						type: "option",
						description: "Orb",
						regex: /Orb (?:Amplification|boost|effect)/i,
						groups: [1],
						cssClasses: ["min-width-3"],
					},
					{
						type: "option",
						description: "Color Affinity",
						regex: /Color Affinity/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Base ATK",
						regex: /Base ATK boost/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Status ATK",
						regex: /Status ATK boost/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Chain Lock",
						regex: /Chain Lock/i, // should also match "Chain Lock/Limit/Boundary"
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Chain Addition",
						regex: /Chain Addition/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Chain Multiplication",
						regex: /Chain Multiplication/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "separator",
						description: "Survivability Buffs",
					},
					{
						type: "option",
						description: "Percent Damage Reduction",
						regex: /Percent Damage Reduction/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "option",
						description: "Threshold Damage Reduction",
						regex: /Threshold Damage Reduction/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "option",
						description: "Resilience",
						regex: /Resilience/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "option",
						description: "End of Turn Healing",
						regex: /End of Turn Healing/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "separator",
						description: "Misc. Buffs",
					},
					{
						type: "option",
						description: "Turn Progress Effect",
						regex: /Turn Progress Effect/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "separator",
						description: "Debuffs",
					},
					{
						type: "option",
						description: "Bind",
						regex: /Bind/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Despair",
						regex: /Despair/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Paralysis",
						regex: /Paralysis/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Special Bind",
						regex: /Special Bind/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Normal Attack Only",
						regex: /Normal Attack Only/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
				],
			},

			{
				name: "Requirement: Enemy Effect",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/If enemies (?:have|are) ([^."]+?) (?:when the special is activated|after receiving damage),/i,
				submatchers: [
					{
						type: "separator",
						description: "Debuff Immunities",
					},
					{
						type: "option",
						description: "All",
						regex: /All Debuff Protection/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "option",
						description: "Delay",
						regex: /Delay Debuff Protection/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Poison",
						regex: /Poison Debuff Protection/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Defense Reduction",
						regex: /Defense Reduction Debuff Protection/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "separator",
						description: "Damage Boosting Buffs",
					},
					{
						type: "option",
						description: "ATK",
						// could've used negative lookbehind, but some platforms don't support it
						// either ATK boosting buffs or ATK UP or ATK boost
						regex: /(?:^|(?!base|atus).{4} )ATK (?:boost|UP)/i, // do not match "base ATK boost" and "Status ATK boost"
						groups: [1],
						cssClasses: ["min-width-3"],
					},
					{
						type: "option",
						description: "Enrage",
						regex: /Enrage/i,
						groups: [1],
						cssClasses: ["min-width-3"],
					},
					{
						type: "option",
						description: "End of Turn Damage",
						regex: /End of Turn Damage/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "separator",
						description: "Survivability Buffs",
					},
					{
						type: "option",
						description: "Increased Defense",
						regex: /Increased Defense/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "option",
						description: "Percent Damage Reduction",
						regex: /Percent Damage Reduction/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "option",
						description: "Threshold Damage Reduction",
						regex: /Threshold Damage Reduction/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "option",
						description: "Resilience",
						regex: /Resilience/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Barrier",
						regex: /Barrier/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "End of Turn Heal",
						regex: /End of Turn Heal/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "separator",
						description: "Debuffs",
					},
					{
						type: "option",
						description: "Delay",
						regex: /delayed/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Poison",
						regex: /inflicted with poison/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Melo-Melo/Love-Love",
						regex: /Melo-Melo/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "option",
						description: "Defense Reduction",
						regex: /reduced defense/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
				],
			},
		],
		Survivability: [
			{
				name: "Healer",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex: /Recovers/i,
			},

			{
				name: "Old Pinch Healing",
				targets: ["potential"],
				regex: /Pinch Healing/i,
			},

			{
				name: "Pinch Healing",
				targets: ["potential"],
				regex:
					/If HP is below ([?\d]+)% at the start of the turn, recovers ([?.\d]+)x this character's RCV at the end of the turn for each time you hit a PERFECT with this character/i,
				submatchers: [
					{
						type: "number",
						description: "HP Percentage:",
						groups: [1],
					},
					{
						type: "number",
						description: "RCV Multiplier:",
						groups: [2],
					},
				],
			},

			{
				name: "Old RCV based Healers",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex: /Recovers.+ character's RCV/i,
			},

			{
				name: "Healer: RCV-based",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex:
					/Recovers ([?.\d]+)x(?:-([?.\d]+)x)? (?:this |supported )?character's RCV/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [1, 2],
					},
				],
			},

			{
				name: "Old Fixed HP Healers",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex: /Recovers (\d|,)+ HP/i,
			},

			{
				name: "Healer: Fixed",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex: /Recovers ([?,\d]+)(?:-([?,\d]+))? HP/i,
				submatchers: [
					{
						type: "number",
						description: "HP:",
						groups: [1, 2],
					},
				],
			},

			{
				name: "Old MAX HP based Healers",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex: /(Recovers all missing HP|Recovers.+ crew\'s MAX HP)/i,
			},

			{
				name: "Healer: Percentage MAX HP",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/(?:Recovers all missing HP|Recovers ([?\d]+)%(?:-([?\d]+)%)? of crew's MAX HP)/i,
				submatchers: [
					{
						type: "number",
						description: "Percentage:",
						groups: [1, 2],
					},
				],
			},

			{
				name: "Healer: Missing HP",
				targets: ["special", "swap", "support"],
				regex: /Recovers[^."]+?missing HP/i,
			},

			{
				name: "Healer: Overheal",
				targets: ["special", "superSpecial", "swap", "support"],
				regex: /Recovers[^."]+?allowing HP Overfill/i,
			},

			{
				name: "Old End-of-Turn Healers",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex: /Recovers.+HP at the end of (?:the|each) turn/i,
			},

			{
				name: "Healer: End-of-Turn",
				targets: ["captain", "sailor"],
				regex: /Recovers[^."]+?HP at the end of (?:the|each) turn/i,
			},

			{
				name: "Healer: End-of-Turn",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/Recovers[^."]+?HP at the end of (?:the|each) turn(?:, ([^,]+),)? for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, for ([?\d]+\+?)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [2, 3, 4, 5],
					},
					{
						type: "option",
						description: "Buff Clear Immune",
						regex: /preventing buff clears/,
						radioGroup: "targets",
						groups: [1],
						cssClasses: ["min-width-6"],
					},
				],
			},

			{
				name: "HP Overfill Enablers",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex: /Allows HP Overfill/i,
			},

			{
				name: "Old Damage reducing %target%",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex: /Reduces (any )?damage (received|taken)/i,
			},

			{
				name: "Damage Reduction - Passive: Percentage",
				targets: ["captain", "support"],
				// Reduces damage received from [STR] characters by 1%
				// Reduces damage received by 10%-20%
				// match "If you don't attack with Bartolomeo, reduces damage received by 30% for that turn", because CAs like these don't apply icon buffs
				// should not match "Reduces damage received from [STR] characters by 10% for 1 turn"
				// put the second "Percentage" group in an atomic group, so it doesn't backtrack just to fulfill the negative lookahead, or else the negative lookahead could be true and create false positives
				regex:
					/Reduces (?:any )?damage (?:received|taken) (?:from ([^."]+?)(?:characters?|enemies) )?by ([?.\d]+)%(?=((?:-([?.\d]+)%)?))\3(?! for [?\d]+\+?(?:-[?\d]+)? turn)(?:, by ([?.\d]+)%(?:-([?.\d]+)%)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Percentage:",
						groups: [2, 4, 5, 6],
					},
					{
						type: "option",
						description: "All enemy damage",
						regex: /^$/,
						groups: [1],
					},
					{
						type: "separator",
						description: "Damage from types:",
					},
					...createTypesSubmatchers([1], true, "^$"),
				],
			},

			{
				name: "Damage Reduction: Percentage",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				// Reduces damage received from [STR] characters by 100% for 2 turns
				// Reduces damage received by 10%-20% for 1-2 turns, by 30-50% for 3-4 turns instead...
				regex:
					/Reduces (?:any )?damage (?:received|taken) (?:from ([^".]+?)(?:characters?|enemies) )?by ([?.\d]+)%(?:-([?.\d]+)%)? for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, by ([?.\d]+)%(?:-([?.\d]+)%)?(?: for ([?\d]+\+?)(?:-([?\d]+))? turns?)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Percentage:",
						groups: [2, 3, 6, 7],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [4, 5, 8, 9],
					},
					{
						type: "option",
						description: "All enemy damage",
						regex: /^$/,
						groups: [1],
					},
					{
						type: "separator",
						description: "Damage from types:",
					},
					...createTypesSubmatchers([1], true, "^$"),
				],
			},

			{
				name: "Old Damage Reduction",
				targets: ["potential"],
				regex: /Damage Reduction/i,
			},

			{
				name: "Damage Reduction",
				targets: ["potential"],
				// while it is possible to use `...createTypesSubmatchers([1])` here,
				// due to different potential abilites not matchable in one regex
				// (filtering for both STR and DEX Damage Reduction), it would be
				// impossible to filter for multiple Damage Reduction abilities, thus
				// there are separate ones for each type (which would allow "and")
				regex:
					/Reduces damage taken from \[(?:STR|DEX|QCK|PSY|INT)\] (?:characters|enemies) by ([?\d]+)%/i,
				submatchers: [
					{
						type: "number",
						description: "Percentage:",
						groups: [1],
					},
				],
			},

			{
				name: "Damage Reduction: STR",
				targets: ["potential"],
				regex:
					/Reduces damage taken from \[STR\] (?:characters|enemies) by ([?\d]+)%/i,
				submatchers: [
					{
						type: "number",
						description: "Percentage:",
						groups: [1],
					},
				],
			},

			{
				name: "Damage Reduction: DEX",
				targets: ["potential"],
				regex:
					/Reduces damage taken from \[DEX\] (?:characters|enemies) by ([?\d]+)%/i,
				submatchers: [
					{
						type: "number",
						description: "Percentage:",
						groups: [1],
					},
				],
			},

			{
				name: "Damage Reduction: QCK",
				targets: ["potential"],
				regex:
					/Reduces damage taken from \[QCK\] (?:characters|enemies) by ([?\d]+)%/i,
				submatchers: [
					{
						type: "number",
						description: "Percentage:",
						groups: [1],
					},
				],
			},

			{
				name: "Damage Reduction: PSY",
				targets: ["potential"],
				regex:
					/Reduces damage taken from \[PSY\] (?:characters|enemies) by ([?\d]+)%/i,
				submatchers: [
					{
						type: "number",
						description: "Percentage:",
						groups: [1],
					},
				],
			},

			{
				name: "Damage Reduction: INT",
				targets: ["potential"],
				regex:
					/Reduces damage taken from \[INT\] (?:characters|enemies) by ([?\d]+)%/i,
				submatchers: [
					{
						type: "number",
						description: "Percentage:",
						groups: [1],
					},
				],
			},

			{
				name: "Old Threshold Damage reducers",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex: /Reduces (any )?damage (?:received|taken) above/i,
			},

			{
				name: "Damage Reduction - Passive: Threshold",
				//targets: [ 'captain' ],
				targets: [],
				// reduces any damage received above 5,000 HP by 95% for 2 turns
				// put the second "Percentage" group in an atomic group, so it doesn't backtrack just to fulfill the negative lookahead, or else the negative lookahead could be true and create false positives
				regex:
					/Reduces (?:any )?damage (?:received|taken) above ([?,\d]+)(?:-([?,\d]+))? HP by ([?.\d]+)%(?=((?:-([?.\d]+)%)?))\4(?! for [?\d]+\+?(?:-[?\d]+)? turn)(?:, by ([?.\d]+)%(?:-([?.\d]+)%)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Above HP:",
						groups: [1, 2],
					},
					{
						type: "number",
						description: "Percentage:",
						groups: [3, 5, 6, 7],
					},
				],
			},

			{
				name: "Damage Reduction: Threshold",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex:
					/Reduces (?:any )?damage (?:received|taken) above ([?,\d]+)(?:-([?,\d]+))? HP by ([?.\d]+)%(?:-([?.\d]+)%)? for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, by ([?.\d]+)%(?:-([?.\d]+)%)? for ([?\d]+\+?)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Above HP:",
						groups: [1, 2],
					},
					{
						type: "number",
						description: "Percentage:",
						groups: [3, 4, 7, 8],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [5, 6, 9, 10],
					},
				],
			},

			{
				name: "Old Damage nullifiers",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex: /Reduces (?:any )?damage (?:received|taken)[^%]+100%/i,
			},

			{
				name: "Damage Reduction: Nullify",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				// match "reduces damage received from [STR] and [PSY] enemies by 100% for 1 turn"
				// match "Reduces damage received by 70%-100% for 1 turn"
				// match "reduces any damage received above 2,000 HP by 100% for 1 turn" (3282)
				regex:
					/Reduces (?:any )?damage (?:received|taken) (?:above [?\d,]+ HP )?(?:from ([^."]+?)(?:characters?|enemies) )?by (?:100%|[?.\d]+%-100%) for (?:([?\d]+\+?)(?:-([?\d]+))? turns?|([?\d]+\+?)(?:-([?\d]+))? attacks?)/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [2, 3],
					},
					{
						type: "number",
						description: "Attacks:",
						groups: [4, 5],
					},
					{
						type: "option",
						description: "All enemy damage",
						regex: /^$/,
						groups: [1],
					},
					{
						type: "separator",
						description: "Damage from types:",
					},
					...createTypesSubmatchers([1], true, "^$"),
				],
			},

			{
				name: "Damage Reduction: Full HP",
				targets: ["captain"],
				regex: /Reduces (any )?damage.+if HP.+99/i,
			},

			{
				name: "Old Zombies",
				targets: ["captain", "special", "superSpecial", "support"],
				regex: /Protects from defeat/i,
			},

			{
				name: "Zombies (Protect from Defeat)",
				targets: ["captain"],
				regex: /Protects from defeat/i,
			},

			{
				name: "Zombies (Protect from Defeat)",
				targets: ["special", "superSpecial", "swap", "support"],
				regex: /Protects from defeat for ([?\d]+\+?)(?:-([?\d]+))? turn/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2],
					},
				],
			},

			{
				name: "HP Guard",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex:
					/Activates HP Guard of ([?.\d]+)%(?:-([?.\d]+)%)? effect for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, of ([?.\d]+)%(?:-([?.\d]+)%)?(?: for ([?\d]+\+?)(?:-([?\d]+))? turns?)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Percentage:",
						groups: [1, 2, 5, 6],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [3, 4, 7, 8],
					},
				],
			},
		],
		Slot: [
			{
				name: "Old Orb Chance Boosters",
				targets: ["captain", "special", "swap", "sailor", "support"],
				regex: /boosts chances of getting.+?orbs/i,
			},

			{
				name: "Orb Chance Boosters",
				targets: ["captain", "sailor"],
				// "Boosts chances of getting [QCK], [INT] and [RCV] orbs"
				regex: /boosts chances of getting ([^."]+?)orbs/i,
				submatchers: [
					...createOrbsSubmatchers(
						["STR", "DEX", "QCK", "PSY", "INT", "RCV", "TND", "SEMLA", "WANO"],
						[1]
					), // add 'BOMB' AND 'SUPERBOMB' if they exist
					{
						type: "option",
						description: "Matching",
						regex: /Matching/i,
						cssClasses: ["min-width-6"],
						groups: [1],
					},
				],
			},

			{
				name: "Orb Chance Boosters",
				targets: ["special", "swap", "support"],
				// "Boosts chances of getting [QCK], [INT] and [RCV] orbs for 1 turn"

				// tempered dot to prevent spilling for cases like "Boosts chances of getting [PSY] orbs and reduces chances of getting [INT] orbs for 3 turns"
				// should be fixed to have the "for 3 turns" in the first part, however.
				regex:
					/boosts chances of getting ((?:(?!orb)[^."])+?)orbs for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, for ([?\d]+\+?)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [2, 3, 4, 5],
					},
					...createOrbsSubmatchers(
						["STR", "DEX", "QCK", "PSY", "INT", "RCV", "TND", "SEMLA", "WANO"],
						[1]
					), // add 'BOMB' AND 'SUPERBOMB' if they exist
					{
						type: "option",
						description: "Matching",
						regex: /Matching/i,
						cssClasses: ["min-width-6"],
						groups: [1],
					},
				],
			},

			{
				name: "Old Beneficial Orb Enablers",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /orbs beneficial/i,
			},

			{
				name: "Beneficial Orb Enablers",
				targets: ["captain", "sailor"],
				regex: /makes ([^".]+?)orbs beneficial for ([^".]+?)characters?/i,
				submatchers: [
					...createUniversalSubmatcher([2]),
					{
						type: "separator",
						description: "Beneficial orbs:",
					},
					...createOrbsSubmatchers(
						[
							"STR",
							"DEX",
							"QCK",
							"PSY",
							"INT",
							"RCV",
							"TND",
							"BOMB",
							"SEMLA",
							"SUPERBOMB",
						],
						[1]
					),
					{
						type: "option",
						description: "Badly Matching",
						regex: /Badly Matching/i,
						cssClasses: ["min-width-6"],
						groups: [1],
					},
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Beneficial Orb Enable",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/makes ([^".]+?)orbs beneficial for ([^".]+?)characters? for ([?\d]+\+?)(?:-([?\d]+))? turn/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [3, 4],
					},
					...createUniversalSubmatcher([2]),
					{
						type: "separator",
						description: "Beneficial orbs:",
					},
					...createOrbsSubmatchers(
						[
							"STR",
							"DEX",
							"QCK",
							"PSY",
							"INT",
							"RCV",
							"TND",
							"BOMB",
							"SEMLA",
							"SUPERBOMB",
						],
						[1]
					),
					{
						type: "option",
						description: "Badly Matching",
						regex: /Badly Matching/i,
						cssClasses: ["min-width-6"],
						groups: [1],
					},
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Orb Multiplier Override",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/increases Orb Effects of (?: beneficial)?([^".]+?)orbs to ([?.\d]+)x(?:-([?.\d]+)x)? for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, to ([?.\d]+)x(?:-([?.\d]+)x)?(?: for ([?\d]+\+?)(?:-([?\d]+))? turns?)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [2],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [3, 4],
					},
					...createUniversalSubmatcher([2]),
					{
						type: "separator",
						description: "Beneficial orbs:",
					},
					...createOrbsSubmatchers(
						[
							"STR",
							"DEX",
							"QCK",
							"PSY",
							"INT",
							"RCV",
							"TND",
							"BOMB",
							"SEMLA",
							"RAINBOW",
							"WANO",
							"SUPERBOMB",
						],
						[1]
					),
					{
						type: "option",
						description: "Badly Matching",
						regex: /Badly Matching/i,
						cssClasses: ["min-width-6"],
						groups: [1],
					},
				],
			},

			{
				name: "Old Negative Orb Negators",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /Makes Badly Matching and \[BLOCK\] orbs not reduce damage/i,
			},

			{
				name: "Negative Orb Neutralizer",
				targets: ["captain", "sailor"],
				regex: /Makes Badly Matching and \[BLOCK\] orbs not reduce damage/i,
			},

			{
				name: "Negative Orb Neutralizer",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/Makes Badly Matching and \[BLOCK\] orbs not reduce damage for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, for ([?\d]+\+?)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4],
					},
				],
			},

			{
				name: "Old Orb lockers",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex: /locks (orbs|all orbs|orb|own orb|your captain's orb)/i,
			},

			{
				name: "Old1 Orb lockers",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex: /locks((?!chain).)+?orb/i,
			},

			{
				name: "Orb lockers",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				// "locks orbs for free spirit characters", "...all orbs"
				// not "locks the chain multiplier"
				// TODO: submatchers for group 1
				regex:
					/locks (orbs (?:for|on) (?=((?:[^c."]+|c(?!har))*))\2characters?|all orbs|own orb|your captain's orb|(?:the )?supported character's orb) for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, for ([?\d]+\+?)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [3, 4, 5, 6],
					},
					...createUniversalSubmatcher([1]),
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected positions:",
					},
					...createPositionsSubmatchers([1]),
				],
			},

			{
				name: "Old Orb barrierers",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex: /Barriers [^."]+orbs? for/i,
			},

			{
				name: "Orb barrierers",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/Barriers (?=((?:[^o."]+|o(?!rb))*))\1orbs? for ([?\d]+\+?) ((?:GOOD|GREAT|PERFECT|, | and | or )+) hit/i,
				submatchers: [
					{
						type: "option",
						description: "GOOD",
						regex: /GOOD/,
						radioGroup: "1", // remove radio group if unit with "1 GOOD or GREAT hit" arises
						groups: [3],
						cssClasses: ["min-width-4"],
					},
					{
						type: "option",
						description: "GREAT",
						regex: /GREAT/,
						radioGroup: "1", // remove radio group if unit with "1 GOOD or GREAT hit" arises
						groups: [3],
						cssClasses: ["min-width-4"],
					},
					{
						type: "option",
						description: "PERFECT",
						regex: /PERFECT/,
						radioGroup: "1", // remove radio group if unit with "1 GOOD or GREAT hit" arises
						groups: [3],
						cssClasses: ["min-width-4"],
					},
					{
						type: "number",
						description: "Hits:",
						groups: [2],
					},
					...createUniversalSubmatcher([1]),
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected positions:",
					},
					...createPositionsSubmatchers([1]),
				],
			},
			{
				name: "STND Expansion",
				targets: ["captain", "special", "superSpecial", "support"],
				regex:
					/allows crew to perform Super Tandem with ([^".]+?)orbs(?:, ([^,]+),)? for ([?\d]+\+?)(?:-([?\d]+))? turns?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [3, 4],
					},
					{
						type: "option",
						description: "Buff Clear Immune",
						regex: /preventing buff clears/,
						radioGroup: "targets",
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Expanded to orbs:",
					},
					...createOrbsSubmatchers(
						[
							"STR",
							"DEX",
							"QCK",
							"PSY",
							"INT",
							"RCV",
							"BOMB",
							"SEMLA",
							"SUPERBOMB",
							"RAINBOW",
							"WANO",
						],
						[1]
					),
				],
			},
			{
				name: "PERFECTs Consume RCV/SEMLA Orbs",
				targets: ["captain"],
				regex:
					/makes PERFECTs consume ([^.,]+) orbs/i,
				submatchers: [
					{
						type: "separator",
						description: "Orbs:",
					},
					...createOrbsSubmatchers(
						[
							"RCV",
							"SEMLA",
						],
						[1]
					),
				],
			},
		],
		"Slot Change": [
			{
				name: "Old Orb Retainer",
				targets: ["sailor"],
				regex:
					/If this character has.+(STR|DEX|QCK|PSY|INT|RCV).+(GOOD|GREAT|PERFECT)/i,
			},

			{
				name: "Orb Retainer",
				targets: ["sailor"],
				regex:
					/you hit a ([\w ]+?) with (?:him|her|them|this character), keep (?:his|her|their)([^."]+?)orb/i,
				submatchers: [
					{
						type: "separator",
						description: "Tap Timing:",
					},
					{
						type: "option",
						description: "GOOD",
						regex: /GOOD/i,
						cssClasses: ["min-width-4"],
						groups: [1],
					},
					{
						type: "option",
						description: "GREAT",
						regex: /GREAT/i,
						cssClasses: ["min-width-4"],
						groups: [1],
					},
					{
						type: "option",
						description: "PERFECT",
						regex: /PERFECT/i,
						cssClasses: ["min-width-4"],
						groups: [1],
					},
					{
						type: "separator",
						description: "Retained Orb:",
					},
					...createOrbsSubmatchers(
						["STR", "DEX", "QCK", "PSY", "INT", "RCV", "TND"],
						[2]
					), // add others  if they exist
				],
			},

			{
				name: "Old Orb controllers",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex: /(Changes.+?orbs?)/i,
			},

			{
				name: "Orb Control: Change",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				// the From orbs is optional in the ability description. If it is not mentioned,
				// it is considered to be "Any" orb, just like "changes all orbs" (these are Any orbs)
				// "changes the orb of this character into a Matching orb" (no From orb, so this is Any orb)

				// the "of ____ characters" is optional. If it is not mentioned, it is considered "of all characters"
				// "changes [BLOCK] orbs into [INT] orbs"

				// ", including [BLOCK] orbs," is optional

				// the From orbs part of the regex should not include "changes" (hence the tempered dot),
				// which would mean that the regex would interlap with a different special.
				// ex. "Changes own Type and both Classes to any selected combination, reduces Special Cooldown of all characters by 1 turn, changes all orbs, including [BLOCK] orbs, into [RCV] orbs" (3523)
				// in this case, it's not really a problem since he changes all orbs anyway,
				// but in case he changes only [STR] orbs, it would be a false positive when searching with "From Any orb", because there is "Type" (from "own Type and both Classes") in the first part.

				// "changes all orbs of top and bottom row characters into Matching orbs"
				// "Changes orbs of right column characters into [DEX], [STR] and [QCK], from top to bottom"
				// "changes [STR], [QCK], [DEX], [PSY] and [INT] orbs of right column Shooter and Striker characters into Matching orbs"
				regex:
					/changes (?:the )?((?:(?!changes)[^."])*?)orbs?(?:, including (?=((?:[^o."]+|o(?!rb))*))\2orbs?,)? (?:of (?=((?:[^c."]+|c(?!har))*))\3characters? )?into([^."]+?)orbs?/i,
				submatchers: [
					{
						type: "separator",
						description: "From orbs:",
					},
					{
						type: "option",
						description: "Any",
						regex: /^$|all/i,
						cssClasses: ["min-width-6"],
						groups: [1],
					},
					...createOrbsSubmatchers(
						[
							"BLOCK",
							"SUPERBLOCK",
							"RAINBOW",
							"SUPERBOMB",
							"SEMLA",
							"WANO",
						],
						[1, 2],
						false
					),
					...createOrbsSubmatchers(
						[
							"STR",
							"DEX",
							"QCK",
							"PSY",
							"INT",
							"G",
							"RCV",
							"TND",
							"BOMB",
							"EMPTY",
						],
						[1],
						false
					),
					{
						type: "option",
						description: "Matching",
						regex: /(?:^|(?!Badly ).{6}|^.{0,5})\bMatching/i, // alternative for negative lookbehind for "Badly " and "Non-"
						cssClasses: ["min-width-6"],
						groups: [1],
					},
					{
						type: "option",
						description: "Badly Matching",
						regex: /Badly Matching/i,
						cssClasses: ["min-width-6"],
						groups: [1],
					},
					{
						type: "separator",
						description: "To orbs:", // To orbs won't have "Any", since simply not selecting any "To" orb does the same thing
					},
					...createOrbsSubmatchers(
						[
							"STR",
							"DEX",
							"QCK",
							"PSY",
							"INT",
							"G",
							"RCV",
							"TND",
							"BOMB",
							"EMPTY",
							"SUPERBOMB",
							"RAINBOW",
							"SEMLA",
							"WANO",
						],
						[4],
						false
					),
					{
						type: "option",
						description: "Character's Orb",
						regex: /'s|s'/i, // match "this character's orb", "Luffy's orb"
						cssClasses: ["min-width-6"],
						groups: [4],
					},
					{
						type: "option",
						description: "Matching",
						regex: /(?:^|(?!Badly ).{6}|^.{0,5})\bMatching/i, // alternative for negative lookbehind for "Badly " and "Non-"
						cssClasses: ["min-width-6"],
						groups: [4],
					},
					{
						type: "option",
						description: "Badly Matching",
						regex: /Badly Matching/i,
						cssClasses: ["min-width-6"],
						groups: [4],
					},
					{
						type: "separator",
						description: "Affected characters:",
					},
					...createUniversalSubmatcher([3], "all|type|^$"),
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3], true, "all|type|^$"),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3], true, "all|^$"),
					{
						type: "separator",
						description: "Positions:",
					},
					...createPositionsSubmatchers(
						[3],
						true,
						"all|^$",
						["Selected"],
						false
					),
				],
			},

			{
				name: "Orb Control: Auto",
				targets: ["captain", "special", "superSpecial"],
				regex:
					/changes (?=((?:[^o."]+|o(?!rbs))*))\1orbs into (?=((?:[^o."]+|o(?!rbs))*))\2orbs for ([?\d]+\+?)(?:-([?\d]+))? turns?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [3, 4],
					},
					{
						type: "separator",
						description: "From orbs:",
					},
					{
						type: "option",
						description: "Any",
						regex: /^$|all/i,
						cssClasses: ["min-width-12"],
						groups: [1],
					},
					...createOrbsSubmatchers(
						[
							"STR",
							"DEX",
							"QCK",
							"PSY",
							"INT",
							"RCV",
							"TND",
							"BOMB",
						],
						[1],
						false
					),
					{
						type: "separator",
						description: "To orbs:", // To orbs won't have "Any", since simply not selecting any "To" orb does the same thing
					},
					...createOrbsSubmatchers(
						[
							"STR",
							"DEX",
							"QCK",
							"PSY",
							"INT",
							"RCV",
							"TND",
							"EMPTY",
							"SUPERBOMB",
							"RAINBOW",
							"SEMLA",
							"WANO",
						],
						[2],
						false
					),
				],
			},

			// {
			// 	name: "Orb Control: Stage 1 Full",
			// 	targets: ["sailor"],
			// 	regex: /Changes all orbs into([^."]+?)orbs?/i,
			// 	submatchers: [
			// 		...createOrbsSubmatchers(
			// 			[
			// 				"STR",
			// 				"DEX",
			// 				"QCK",
			// 				"PSY",
			// 				"INT",
			// 				"G",
			// 				"RCV",
			// 				"TND",
			// 				"BOMB",
			// 				"SEMLA",
			// 				"SUPERBOMB",
			// 				"RAINBOW",
			// 				"WANO",
			// 			],
			// 			[1],
			// 			false
			// 		),
			// 		{
			// 			type: "option",
			// 			description: "Matching",
			// 			regex: /(?:^|(?!Badly ).{6}|^.{0,5})\bMatching/i, // alternative for negative lookbehind for "Badly " and "Non-"
			// 			cssClasses: ["min-width-6"],
			// 			groups: [1],
			// 		},
			// 	],
			// },

			{
				name: "Orb Control: Stage 1",
				targets: ["sailor"],
				regex: /Changes (?:the )?orbs? (?:of (?=((?:[^c."]+|c(?!har))*))\1characters? )?into([^."]+?)orbs?/i,
				submatchers: [
					...createOrbsSubmatchers(
						[
							"STR",
							"DEX",
							"QCK",
							"PSY",
							"INT",
							"G",
							"RCV",
							"TND",
							"BOMB",
							"SEMLA",
							"SUPERBOMB",
							"RAINBOW",
							"WANO",
						],
						[2],
						false
					),
					{
						type: "option",
						description: "Matching",
						regex: /(?:^|(?!Badly ).{6}|^.{0,5})\bMatching/i, // alternative for negative lookbehind for "Badly " and "Non-"
						cssClasses: ["min-width-6"],
						groups: [2],
					},
					{
						type: "separator",
						description: "Positions:",
					},
					...createUniversalSubmatcher([1], "all"),
					...createPositionsSubmatchers(
						[1],
						true,
						"all",
						["Adjacent", "Selected"],
						true
					),
				],
			},

			{
				name: "Orb Control: Randomize",
				targets: ["special", "superSpecial", "swap", "support"],
				regex: /randomizes.+orb/i,
			},

			{
				name: "Old Orb Control: Switch",
				targets: ["special", "superSpecial", "swap", "support"],
				regex: /switches orbs/i,
			},

			{
				name: "Orb Control: Switch",
				targets: ["special", "superSpecial", "swap", "support"],
				// "Switches orbs between slots 2 times"
				// "Switches orbs between slots 1 time"
				regex: /switches orbs between slots ([?\d]+)(?:-([?\d]+))? times?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2],
					},
				],
			},
		],
		"Beneficial Team Effects": [
			{
				name: "Normal Attack Bypassing Enemy Buffs",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex:
					/Attacks.+ignore.+damage reducing Barriers( and Buffs|, Buffs and DEF)/i,
			},

			{
				name: "Debuff Immunity Buff",
				targets: ["special", "superSpecial", "swap", "support"],
				regex: /applies.+immunity/i,
			},

			{
				name: "Immunity: Blow Away",
				targets: ["captain"],
				regex: /makes crew immune to Blow Away/i,
			},

			{
				name: "Immunity: Blow Away",
				targets: ["sailor"],
				regex: /Cannot be Blown away/i,
			},

			{
				name: "Resource: Beli",
				targets: ["captain"],
				regex: /boosts[^.]+?Beli[^.]+?(?:gained|received) by ([?.\d]+)x/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [1],
					},
				],
			},

			{
				name: "Resource: EXP",
				targets: ["captain"],
				regex: /boosts[^.]+?EXP[^.]+?(?:gained|received) by ([?.\d]+)x/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [1],
					},
				],
			},

			{
				name: "Old Drop Doublers",
				targets: ["captain"],
				regex: /duplicating a drop/i,
			},

			{
				name: "Resource: Drops",
				targets: ["captain"],
				regex: /(guarantees )?duplicating a drop/i,
				submatchers: [
					{
						type: "option",
						description: "Guaranteed",
						regex: /^./,
						groups: [1],
					},
				],
			},

			{
				name: "Enemy Status Displayer",
				targets: ["special", "swap", "support"],
				regex: /Displays the status of all enemies/i,
			},

			{
				name: "PERFECT Assist",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex: /makes PERFECTs (slightly |significantly )?easier to hit/i,
			},

			{
				name: "Special Cooldown Charge",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				// Reduces Special Cooldown of all characters by 3 turns
				// Reduces Special Cooldown of all characters completely
				// Advances Special Cooldown of all characters to MAX
				regex:
					/(?:reduces|advances) Special Cooldown of([^."]+?)characters? (?:(completely)|to (MAX)|by ([?\d]+)(?:-([?\d]+))? turns?)(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [2, 3, 4, 5, 6, 7],
					},
					...createUniversalSubmatcher([1]),
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected positions:",
					},
					...createPositionsSubmatchers([1]),
				],
			},

			{
				name: "Ship Special Cooldown Charge",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"support",
				],
				// Reduces Special Cooldown of Ship by 3 turns
				// Reduces Special Cooldown of Ship completely
				// Advances Special Cooldown of Ship to MAX
				regex:
					/(?:reduces|advances) Special Cooldown of(?: your)? Ship (?:(completely)|to (MAX)|by ([?\d]+)(?:-([?\d]+))? turns?)(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5, 6],
					},
				],
			},

			{
				name: "Switch Effect Charge",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"sailor",
					"support",
					"swap"
				],
				// Reduces Switch Effect of all characters by 3 turns
				// Reduces Switch Effect of all characters completely
				// Advances Switch Effect of all characters to MAX
				regex:
					/(?:reduces|advances)[^."]+?Switch Effect[^."]+?of([^."]+?)characters? (?:(completely)|to (MAX)|by ([?\d]+)(?:-([?\d]+))?)(?:, by ([?\d]+)(?:-([?\d]+))?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [2, 3, 4, 5, 6, 7],
					},
					...createUniversalSubmatcher([1]),
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected positions:",
					},
					...createPositionsSubmatchers([1]),
				],
			},

			{
				name: "VS Gauge Charge",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"support"
				],
				// Reduces VS Gauge of all characters by 3 turns
				// Reduces VS Gauge of all characters completely
				// Advances VS Gauge of all characters to MAX
				regex:
					/(?:reduces|advances)[^."]+?VS Gauge[^."]+?of([^."]+?)characters? (?:(completely)|to (MAX)|by ([?\d]+)(?:-([?\d]+))?)(?:, by ([?\d]+)(?:-([?\d]+))?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [2, 3, 4, 5, 6, 7],
					},
					...createUniversalSubmatcher([1]),
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected positions:",
					},
					...createPositionsSubmatchers([1]),
				],
			},

			{
				name: "Status ATK Boost Stack",
				targets: ["special", "superSpecial"],
				regex: /allows crew to stack 2 different Status ATK Boost buffs for ([?\d]+)(?:-([?\d]+))? turns?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2],
					},
				],
			},

		],
		"Bad Team Effects": [
			{
				name: "Passive ATK Reducers",
				targets: ["captain"],
				// Can be "reduces ATK of all characters by 1x-2x, by ?x-3x otherwise"
				// Or "reduces HP of Striker characters by 2.5x, their ATK by 2x" (or RCV first)
				// Or "reduces ATK of Slasher characters by 3.25x, by 4.0625x instead if they have a [DEX] or [INT] orb" (or beneficial orb)
				// or "reduces ATK of all characters by 1x-2x, depending on the crew's current HP, and their HP by 2x"
				// But NOT "reduces ATK of Striker characters by 2.5x, reduces their HP by 1.2x"
				// "reduces" should NOT be matched within, which should be a different buff already
				// `","` is the JSON separator for array items
				// wrap the part before "ATK" in an atomic group to prevent backtracking
				// prevent it from jumping over "reduces"
				regex:
					/Reduces (?=((?:[^.abor"]+|a(?!tk)|\.\d|b(?!oosts)|of ([^."]+?)characters?|o|r(?!educes)|"(?!,"))*))\1ATK(?: and HP| and RCV|, HP and RCV)?(?: of ([^."]*?)characters?)? by ([?\d]+)%(?:-([?\d]+)%)?(?:, by ([?\d]+)%(?:-([?\d]+)%)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Percentage:",
						groups: [4, 5, 6, 7],
					},
					...createUniversalSubmatcher([2, 3]),
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([2, 3]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([2, 3]),
					{
						type: "separator",
						description: "Affected positions:",
					},
					...createPositionsSubmatchers([2, 3], true, undefined, [
						"Adjacent",
						"Selected",
					]),
				],
			},

			{
				name: "Passive HP Reducers",
				targets: ["captain"],
				// Can be "reduces HP of all characters by 1x-2x, by ?x-3x otherwise"
				// Or "reduces ATK of Striker characters by 2.5x, their HP by 1.2x"
				// or "reduces ATK of all characters by 1x-2x, depending on the crew's current HP, and their HP by 2x"
				// But not "reduces ATK of Striker characters by 2.5x, reduces their HP by 1.2x"
				// "reduces" should NOT be matched within, which should be a different buff already
				// Also NOT "reduces ATK of [STR] characters by 2.5x and reduces their HP by 60%"
				// not "Boosts ATK of [STR] characters by 2.5x and reduces their HP by 60%" because different buffs
				// NOT "Reduces damage received by 50%, reduces crew's current HP by 10% at the end of each turn"
				// NOT "Reduces any damage received above 10,000 HP by 60% for 99 turns"
				// `","` is the JSON separator for array items. Allow "Special Name"
				regex:
					/Reduces (?=((?:[^.bcdhor"]+|h(?!p (?:and RCV )?(?:by|of))|\.\d|b(?!oosts)|of ([^."]+?)characters?|o|r(?!educes)|"(?!,")|c(?!rew's current HP)|d(?!amage received))*))\1HP(?: and RCV)?(?: of ([^."]*?)characters?)? by ([?\d]+)%(?:-([?\d]+)%)?(?:, by ([?\d]+)%(?:-([?\d]+)%)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Percentage:",
						groups: [4, 5, 6, 7],
					},
					...createUniversalSubmatcher([2, 3]),
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([2, 3]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([2, 3]),
					{
						type: "separator",
						description: "Affected positions:",
					},
					...createPositionsSubmatchers([2, 3], true, undefined, [
						"Adjacent",
						"Selected",
					]),
				],
			},

			{
				name: "Passive RCV Reducers",
				targets: ["captain"],
				// same as ATK and HP
				// should not match "Reduces ATK of all characters by 3x, their HP by 1.25x and recovers 0.5x this character's RCV at the end of the turn"
				regex:
					/Reduces (?=((?:[^.bor"]+|\.\d|b(?!oosts)|of ([^."]+?)characters?|o|r(?!educes|cv[^\]])|"(?!,"))*))\1RCV(?: of ([^."]*?)characters?)? by ([?\d]+)%(?:-([?\d]+)%)?(?:, by ([?\d]+)%(?:-([?\d]+)%)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Percentage:",
						groups: [4, 5, 6, 7],
					},
					...createUniversalSubmatcher([2, 3]),
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([2, 3]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([2, 3]),
					{
						type: "separator",
						description: "Affected positions:",
					},
					...createPositionsSubmatchers([2, 3], true, undefined, [
						"Adjacent",
						"Selected",
					]),
				],
			},

			{
				name: "ATK reducers",
				targets: ["special", "superSpecial", "swap", "support"],
				/* Uses explicit greedy alternation for "of ...characters", preventing
                backtracking with every character matched in it (easily reaches a
                thousand extra steps), like if there's an ATK boost that has "by 45",
                but no "x" because it's not a multiplier. It also prevents it from
                jumping over "characters" in the mentioned case, as it would no
                longer be able to backtrack. Variable atk boosts and variable turns
                should be accounted for with optional groups, and should handle an
                "otherwise" clause. This part of the regex also uses a workaround
                for atomic groups in JS.

                "If something, boosts ATK, HP and RCV of [PSY], Cerebral and Free
                Spirit characters by 2x-2.5x for 1-2 turns, by 1.5x-2x for 2-3 turns
                otherwise."
            */
				regex:
					/Reduces ATK(?: and HP| and RCV|, HP and RCV)? of (?=((?:[^c."]+|c(?!har))*))\1characters? by (?:([?.\d]+)%(?:-([?.\d]+)%)?|([?.,\d]+)(?:-([?.,\d]+))?) (?:after [?\d\w]+? hit in the chain )?for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, by (?:([?.\d]+)%(?:-([?.\d]+)%)?|([?.,\d]+)(?:-([?.,\d]+))?) for ([?\d]+\+?)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Percentage:",
						groups: [2, 3, 8, 9],
					},
					{
						type: "number",
						description: "Static Reduction:",
						groups: [4, 5, 10, 11],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [6, 7, 12, 13],
					},
					...createUniversalSubmatcher([1]),
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected positions:",
					},
					...createPositionsSubmatchers([1]),
				],
			},

			{
				name: "Old Current Health reducers",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex: /Reduces crew's current HP/i,
			},

			{
				name: "Current Health reducers",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex:
					/Reduces crew's current HP (?:by ([?.\d]+)%(?:-([?.\d]+)%)?|to ([?\d]+)(?:-([?\d]+))?)(?:, (?:by ([?.\d]+)%(?:-([?.\d]+)%)?|to ([?\d]+)(?:-([?\d]+))?))?/i,
				submatchers: [
					{
						type: "number",
						description: "Percentage:",
						groups: [1, 2, 5, 6],
					},
					{
						type: "number",
						description: "Set to:",
						groups: [3, 4, 7, 8],
					},
				],
			},

			{
				name: "Self bind %target%",
				targets: ["special", "superSpecial", "swap", "support"],
				// match "Binds self for 2 turns"
				// match "Binds and Despairs himself for 7 turns"
				regex:
					/Binds[^."]+?self for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, for ([?\d]+\+?)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4],
					},
				],
			},

			{
				name: "Self despair %target%",
				targets: ["special", "superSpecial", "swap", "support"],
				// match "Binds and Despairs himself for 7 turns"
				regex:
					/Despairs[^."]+?self for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, for ([?\d]+\+?)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4],
					},
				],
			},

			{
				name: "Health Loss Damage Dealer",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/Despairs[^."]+?self for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, for ([?\d]+\+?)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "separator",
						description:
							"This filter matches units that reduce the crew's HP and deals damage based on the HP subtracted. This counts as enemy inflicted damage.",
					},
				],
			},
		],
		"Reduce Status Effects": [
			{
				name: "Old Bind reducers",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /(reduces|removes)( bind|.+, bind|.+and bind).+duration/i,
			},

			{
				name: "Bind",
				targets: ["captain", "special", "superSpecial", "swap", "sailor"],
				// must not match "ship bind" or "special bind"
				// there is no swap that will remove bind on themselves, because bind stops all abilities
				regex:
					/(?:reduces|removes)(?: |[^."]+?, |[^."]+? and )bind[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))( (?:for|on) \w+ characters?)?(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 5, 6],
					},
					{
						type: "option",
						description: "Selected",
						regex: /./,
						radioGroup: "1",
						groups: [4],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Whole crew",
						regex: /^$/,
						radioGroup: "1",
						groups: [4],
						cssClasses: ["min-width-6"],
					},
				],
			},

			{
				name: "Bind",
				targets: ["support"],
				// must not match "ship bind" or "special bind"
				regex:
					/(?:reduces|removes)(?: |[^."]+?, |[^."]+? and )bind[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))( (?:for|on) the supported character)?(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 5, 6],
					},
					{
						type: "option",
						description: "Supported",
						regex: /./,
						radioGroup: "1",
						groups: [4],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Whole crew",
						regex: /^$/,
						radioGroup: "1",
						groups: [4],
						cssClasses: ["min-width-6"],
					},
				],
			},

			{
				name: "Old Ship Bind Reduction",
				targets: ["potential"],
				regex: /Reduce Ship Bind duration/i,
			},

			{
				name: "Ship Bind",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex:
					/(?:reduces|removes)[^."]+?Ship Bind[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},

			{
				name: "Ship Bind",
				targets: ["potential"],
				regex:
					/Reduces Ship Bind duration (?:by ([?\d]+) turns?|(completely))/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2],
					},
				],
			},

			{
				name: "Old Despair reducers",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /(reduces|removes).+despair.+duration/i,
			},

			{
				name: "Despair",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				// must not match "sailor despair"
				regex:
					/(?:reduces|removes)(?: |[^."]+? and |[^."]+?, )despair[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?: on ([^."]+?)characters?)?(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 5, 6],
					},
					{
						type: "option",
						description: "Self only",
						regex: /^this|^the supported/,
						radioGroup: "1",
						groups: [4],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Whole crew",
						regex: /^$/,
						radioGroup: "1",
						groups: [4],
						cssClasses: ["min-width-6"],
					},
				],
			},

			{
				name: "Fear (IGN: Sailor Despair)",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex:
					/(?:reduces|removes)[^."]+?sailor despair[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?: on ([^."]+?)characters?)?(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 5, 6],
					},
					{
						type: "option",
						description: "Self only",
						regex: /^this|^the supported/,
						radioGroup: "1",
						groups: [4],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Whole crew",
						regex: /^$/,
						radioGroup: "1",
						groups: [4],
						cssClasses: ["min-width-6"],
					},
				],
			},

			{
				name: "Old Fear/Sailor Despair Reduction",
				targets: ["potential"],
				regex: /Reduces? (own )?Sailor Despair duration/i,
			},

			{
				name: "Fear (IGN: Sailor Despair)",
				targets: ["potential"],
				regex:
					/Reduces? Sailor Despair duration (?:by ([?\d]+) turns?|(completely))/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2],
					},
				],
			},

			{
				name: "Old Special Bind reducers",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /(?:reduces|removes).+special bind.+duration/i,
			},

			{
				name: "Special Bind",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex:
					/(?:reduces|removes)(?: |[^."]+?, |[^."]+? and )special bind[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?: on ([^."]+?)characters?)?(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 5, 6],
					},
					{
						type: "option",
						description: "Self only",
						regex: /^this|^the supported/,
						radioGroup: "1",
						groups: [4],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Whole crew",
						regex: /^$/,
						radioGroup: "1",
						groups: [4],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Certain types/classes",
						regex: /^(?!this|the supported)./,
						radioGroup: "1",
						groups: [4],
						cssClasses: ["min-width-12"],
					},
				],
			},

			{
				name: "Silence (Active Ability Silence)",
				targets: ["captain", "special", "superSpecial", "swap", "support", "sailor"],
				regex:
					/(?:reduces|removes)[^."]+?silence[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?: on ([^."]+?)characters?)?(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 5, 6],
					},
					{
						type: "option",
						description: "Self only",
						regex: /^this|^the supported/,
						radioGroup: "1",
						groups: [4],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Whole crew",
						regex: /^$/,
						radioGroup: "1",
						groups: [4],
						cssClasses: ["min-width-6"],
					},
				],
			},

			{
				name: "Old Paralysis reducers",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /(reduces|removes).+paralysis.+duration/i,
			},

			{
				name: "Paralysis",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex:
					/(?:reduces|removes)[^."]+?paralysis[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?: on ([^."]+?)characters?)?(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 5, 6],
					},
					{
						type: "option",
						description: "Self only",
						regex: /^this|^the supported/,
						radioGroup: "1",
						groups: [4],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Whole crew",
						regex: /^$/,
						radioGroup: "1",
						groups: [4],
						cssClasses: ["min-width-6"],
					},
					// { // uncomment if such sailor appears
					//     type: 'option',
					//     description: 'Certain types/classes',
					//     regex: /^(?!this)./,
					//     radioGroup: '1',
					//     groups: [4],
					//     cssClasses: ['min-width-12'],
					// },
				],
			},

			{
				name: "Old Poison removers",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /removes.+poison.+duration completely/i,
				include: [2602, 2603, 3398],
			},

			{
				name: "Poison",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex:
					/(?:reduces|removes)[^."]+?(?:poison|selected debuffs?)[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},

			{
				name: "Old Special Rewind Restorers",
				targets: ["captain", "sailor"],
				regex: /restores.+special cooldowns?.+rewinded/i,
			},

			{
				name: "Special Rewind",
				targets: ["captain", "sailor"],
				regex:
					/restores special cooldown of ([^."]+?)characters? (?:(completely)|by ([?\d]+)(?:-([?\d]+))? turns?)/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [2, 3, 4],
					},
					{
						type: "option",
						description: "Self only",
						regex: /^this/,
						radioGroup: "1",
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Whole crew",
						regex: /all/,
						radioGroup: "1",
						groups: [1],
						cssClasses: ["min-width-6"],
					},
				],
			},

			{
				name: "Old Special Cooldown reducers",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /(?:reduces|advances) (special )?cooldown/i,
			},

			{
				name: "Old Burn reducers",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /(reduces|removes).+Burn.+duration/i,
				include: [2602, 2603, 3398],
			},

			{
				name: "Burn",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex:
					/(?:reduces|removes)[^."]+?(?:Burn|selected debuffs?)[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},

			{
				name: "Old Blindness reducers",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /(reduces|removes).+blindness.+duration/i,
				include: [2602, 2603, 3398],
			},

			{
				name: "Blindness (IGN: Remove SFX)",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex:
					/(?:reduces|removes)[^."]+?(?:blindness|selected debuffs?)[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},

			{
				name: "Old Stun removers",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /(reduces|removes).+stun.+duration/i,
			},

			{
				name: "Stun",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /(?:reduces|removes)[^."]+?stun/i,
				// regex: /(?:reduces|removes)[^."]+?stun[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))/i,
				// submatchers: [       // uncomment if stun with turns get released, or if a special that reduces stun for turns gets released
				//     {
				//         type: 'number',
				//         description: 'Turns:',
				//         groups: [1, 2, 3],
				//     },
				// ],
			},

			{
				name: "Old Slot Bind reducers",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /(reduces|removes).+Slot Bind.+duration/i,
			},

			{
				name: "Slot Bind",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex:
					/(?:reduces|removes)[^."]+?slot bind[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?: on ([^."]+?)characters?)?(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 5, 6],
					},
					{
						type: "option",
						description: "Self only",
						regex: /^this|^the supported/,
						radioGroup: "1",
						groups: [4],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Whole crew",
						regex: /^$/,
						radioGroup: "1",
						groups: [4],
						cssClasses: ["min-width-6"],
					},
				],
			},

			{
				name: "Old Reduce Slot Bind duration",
				targets: ["potential"],
				regex: /Reduce Slot Bind duration/i,
			},

			{
				name: "Slot Bind",
				targets: ["potential"],
				regex:
					/Reduces Slot Bind duration (?:by ([?\d]+) turns?|(completely))/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2],
					},
				],
			},

			{
				name: "Old Reduce Slot Barrier duration",
				targets: ["potential"],
				regex: /Reduce Slot Barrier duration/i,
			},

			{
				name: "Slot Barrier",
				targets: ["potential"],
				regex:
					/Reduces Slot Barrier duration (?:by ([?\d]+) stacks?|(completely))/i,
				submatchers: [
					{
						type: "number",
						description: "Stacks:",
						groups: [1, 2],
					},
				],
			},

			{
				name: "Old Crew ATK DOWN reducer",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /(removes|reduces).+ATK DOWN.+duration/i,
				include: [2602, 2603, 3398],
			},

			{
				name: "ATK DOWN",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				//Does not match Minimum-Chain or Maximum-Chain ATK DOWN
				regex:
					/(?:reduces|removes)[^."]+?(?<!Chain )(?:ATK DOWN|selected debuffs?)[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},

			{
				name: "Minimum-Chain ATK DOWN",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				//Does not match Minimum-Chain or Maximum-Chain ATK DOWN
				regex:
					/(?:reduces|removes)[^."]+?(?:Minimum-Chain ATK DOWN|selected debuffs?)[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},

			{
				name: "Maximum-Chain ATK DOWN",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				//Does not match Minimum-Chain or Maximum-Chain ATK DOWN
				regex:
					/(?:reduces|removes)[^."]+?(?:Maximum-Chain ATK DOWN|selected debuffs?)[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},

			{
				name: "Old Nutrition/Reduce Hunger Stacks",
				targets: ["potential"],
				regex: /Nutrition/i,
			},

			{
				// Split from "Nutrition/Reduce Hunger Stacks" PA
				name: "Hunger",
				targets: ["potential"],
				regex: /reduces Hunger stack (?:by ([?\d]+) stacks?|(completely))/i,
				submatchers: [
					{
						type: "number",
						description: "Stacks:",
						groups: [1, 2],
					},
				],
			},

			{
				name: "Old Crew RCV DOWN reducer",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /(removes|reduces).+RCV DOWN.+duration/i,
				include: [2602, 2603, 3398],
			},

			{
				name: "RCV DOWN",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex:
					/(?:reduces|removes)[^."]+?(?:RCV DOWN|selected debuffs?)[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},

			{
				name: "Old Crew No Healing reducer",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /(removes|reduces).+No Healing.+duration/i,
				include: [2602, 2603, 3398],
			},

			{
				name: "No Healing",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex:
					/(?:reduces|removes)[^."]+?(?:no healing|selected debuffs?)[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},

			{
				name: "Counter-Healing",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex:
					/(?:reduces|removes)[^."]+?(?:Counter-Healing|selected debuffs?)[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},

			{
				name: "Counter-RCV",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex:
					/(?:reduces|removes)[^."]+?(?:Counter-RCV|selected debuffs?)[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},

			{
				name: "Old Reduce No Healing",
				targets: ["potential"],
				regex: /Reduce No Healing/i,
			},

			{
				name: "No Healing",
				targets: ["potential"],
				regex:
					/Reduces No Healing duration (?:by ([?\d]+) turns?|(completely))/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2],
					},
				],
			},

			{
				name: "Old Crew Increase Damage Taken reducer",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /(removes|reduces).+Increase Damage Taken.+duration/i,
				include: [2602, 2603, 3398],
			},

			{
				name: "Increase Damage Taken",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex:
					/(?:reduces|removes)[^."]+?(?:Increase Damage Taken|selected debuffs?)[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},

			{
				name: "Old Enrage/Reduce Increase Damage Taken",
				targets: ["potential"],
				regex: /Enrage/i,
			},

			{
				// Split from "Enrage/Reduce Increase Damage Taken" PA
				name: "Increase Damage Taken",
				targets: ["potential"],
				regex:
					/reduces Increase Damage Taken duration (?:by ([?\d]+) turns?|(completely))/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2],
					},
				],
			},

			{
				name: "Old Crew positive buff reducer",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /removes.+positive buffs/i,
			},

			{
				name: "Positive Buffs",
				targets: ["special", "superSpecial", "swap", "sailor", "support"],
				regex: /removes[^."]+?positive buffs/i,
			},

			{
				name: "Orb Rate Increase and Decrease",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /(reduces|removes).+Orb Rate Up and Orb Rate Down.+Buffs/i,
			},

			{
				name: "Beneficial Orb Buff and Non-beneficial Orb Debuff",
				targets: ["special"],
				regex:
					/(reduces|removes).+beneficial orb Buff and non-beneficial orb Debuff/i,
			},

			{
				name: "Old Chain Multiplier Limit and Chain Lock reducer",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /(removes|reduces)[^.]+Chain Multiplier Limit/i,
			},

			{
				name: "Chain Multiplier Limit/Chain Lock",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex:
					/(?:reduces|removes)[^."]+?(?:Chain Multiplier Limit|selected debuffs?)[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},

			{
				name: "Old Chain Coefficient Reduction reducer",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex: /(removes|reduces).+Chain Coefficient Reduction/i,
			},

			{
				name: "Chain Coefficient Reduction",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex:
					/(?:reduces|removes)[^."]+?(?:Chain Coefficient Reduction|selected debuffs?)[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},

			{
				name: "Special Use Limit",
				targets: ["captain", "special", "potential", "support"],
				regex:
					// /(?:reduces|removes)[^."]+?(?: |[^."]+? and |[^."]+?, )?(?:Special Use Limit|selected debuffs?)[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))/i,
					/(?:reduces|removes)[^."]+?(?:Special Use Limit|selected debuffs?)[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2],
					},
				],
			},

			{
				name: "Healing Reduction",
				targets: ["potential"],
				regex:
					/Reduces Healing Reduction duration (?:by ([?\d]+) turns?|(completely))/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2],
					},
				],
			},

			{
				name: "Captain Swap",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex:
					/(optionally )?(?:reduces|removes)[^."]+?Captain Swap[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "option",
						description: "Optional",
						regex: /i/,
						groups: [1],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [2, 3, 4, 5, 6],
					},
				],
			},
			{
				name: "Bleed",
				targets: ["captain", "special", "sailor"],
				regex:
					/(?:reduces|removes)[^."]+?(?:Bleed|selected debuffs?)[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},
			{
				name: "Pain",
				targets: ["captain", "special", "sailor"],
				regex:
				/(?:reduces|removes)[^."]+?(?:Pain|selected debuffs?)[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},

			{
				name: "Blow Away",
				targets: [
					"special",
				],
				regex:
					/(?:reduces|removes)[^."]+?Blow Away[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},
		],
		"Apply Enemy Effects": [
			{
				name: "Delayers",
				targets: ["captain"],
				regex:
					/(ignores? (?:Delay )?Debuff Protection and )?delays (all enemies|that enemy) by ([?\d]+)(?:-([?\d]+))? turns?(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [2, 3, 4, 5],
					},
					{
						type: "option",
						description: "Ignores Immunity",
						regex: /i/,
						groups: [1],
					},
					{
						type: "option",
						description: "One enemy",
						regex: /^t/,
						radioGroup: "1",
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "All enemies",
						regex: /^a/,
						radioGroup: "1",
						groups: [2],
						cssClasses: ["min-width-6"],
					},
				],
			},

			{
				name: "Old Delayers",
				targets: ["special", "superSpecial", "swap", "support"],
				regex: /delays/i,
			},

			{
				name: "Delayers",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/(ignores? (?:Delay )?Debuff Protection and )?delays (that enemy|all enemies) by ([?\d]+)(?:-([?\d]+))? turns?(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [3, 4, 5, 6],
					},
					{
						type: "option",
						description: "Ignores Immunity",
						regex: /i/,
						groups: [1],
					},
					{
						type: "option",
						description: "One enemy",
						regex: /^t/, // no class or type begins with "t" anyway
						radioGroup: "1",
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "All enemies",
						regex: /^a/,
						radioGroup: "1",
						groups: [2],
						cssClasses: ["min-width-6"],
					},
				],
			},

			{
				name: "Old Delay Immunity Ignorers",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex: /ignores Delay Debuff Protection/i,
			},

			{
				name: "Poisoners",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex:
					/(ignores? (?:Defense Reduction )?Debuff Protection and )?(poisons|strongly poisons|inflicts all enemies with Reiju Poison|inflicts Toxic)/i,
				submatchers: [
					{
						type: "option",
						description: "Ignores Immunity",
						regex: /i/,
						groups: [1],
					},
					{
						type: "option",
						description: "Poison",
						regex: /^p/i,
						radioGroup: "1",
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Strong Poison",
						regex: /^s/i,
						radioGroup: "1",
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Reiju Poison",
						regex: /inflicts all enemies with Reiju Poison/i,
						radioGroup: "1",
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Toxic",
						regex: /inflicts Toxic/i,
						radioGroup: "1",
						groups: [2],
						cssClasses: ["min-width-6"],
					},
				],
			},

			{
				name: "Paralyzers",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex:
					/(ignores (?:Negative )?Debuff Protection and )?Paralyzes \(([?\d]+)%(?:-([?\d]+)%)?\) all enemies for ([?\d]+\+?)(?:-([?\d]+))? turns?/i,
				submatchers: [
					{
						type: "number",
						description: "Percentage:",
						groups: [2, 3],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [4, 5],
					},
					{
						type: "option",
						description: "Ignores Immunity",
						regex: /i/,
						groups: [1],
					},
				],
			},

			{
				name: "Old Defense reducers",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex: /Reduces the defense/i,
			},

			{
				name: "Defense Reduction",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex:
					/(ignores? (?:Defense Reduction )?Debuff Protection and )?Reduces the defense of all enemies by ([?\d]+)%(?:-([?\d]+)%)? for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, by ([?\d]+)%(?:-([?\d]+)%)?(?: for ([?\d]+\+?)(?:-([?\d]+))? turns?)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Percentage:",
						groups: [2, 3, 6, 7],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [4, 5, 8, 9],
					},
					{
						type: "option",
						description: "Ignores Immunity",
						regex: /i/,
						groups: [1],
					},
				],
			},

			{
				name: "Burn",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				// "inflicts all enemies with Burn that will deal 100x enemies' ATK in damage for 4 turns that will ignore debuff protection"
				regex:
					/(ignores? (?:Burn )?Debuff Protection and )?inflicts all enemies with Burn that will deal ([?.\d]+)x(?:-([?.\d]+)x)? enemies' ATK in damage for ([?\d]+)(?:-([?\d]+))? turns?(?:, for ([?\d]+)(?:-([?\d]+))? turns?)?( that will ignore debuff protection)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [4, 5, 6, 7],
					},
					{
						type: "option",
						description: "Ignores Immunity",
						regex: /./,
						groups: [1, 8],
					},
				],
			},

			{
				name: "Negative",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex:
					/(ignores (?:Negative )?Debuff Protection and )?inflicts enemies with Negative for ([?\d]+)(?:-([?\d]+))? turns?(?:, for ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [2, 3, 4, 5],
					},
					{
						type: "option",
						description: "Ignores Immunity",
						regex: /i/,
						groups: [1],
					},
				],
			},

			{
				name: "Melo-Melo",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex:
					/(ignores (?:Melo-Melo )?Debuff Protection and )?inflicts Melo-Melo to (all enemies|enemies that attack you) for ([?\d]+\+?)(?:-([?\d]+))? (additional )?hits/i,
				submatchers: [
					{
						type: "number",
						description: "Hits:",
						groups: [3, 4],
					},
					{
						type: "option",
						description: "Attacking enemies",
						regex: /^e/,
						radioGroup: "1",
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "All enemies",
						regex: /^a/,
						radioGroup: "1",
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Ignores Immunity",
						regex: /i/,
						groups: [1],
					},
					{
						type: "option",
						description: "Additional Hits",
						regex: /a/,
						groups: [5],
					},
				],
			},

			{
				name: "Old Increase Damage Taken %target%",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex: /Inflicts\D+Increase Damage Taken/i,
			},

			{
				name: "Increase Damage Taken",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex:
					/(ignores (?:Increase Damage Taken )?Debuff Protection and )?Inflicts (?:all enemies) with Increase Damage Taken by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)? for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, by ([?.\d]+)x(?:-([?.\d]+)x)?(?:, ([^,]+),)?(?: for ([?\d]+\+?)(?:-([?\d]+))? turns?)?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3, 7, 8],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [5, 6, 10, 11],
					},
					{
						type: "option",
						description: "Ignores Immunity",
						regex: /i/,
						groups: [1],
					},
					{
						type: "option",
						description: "Double Enhance",
						regex: /can be enhanced up to 2 times/,
						radioGroup: "targets",
						groups: [4, 9],
						cssClasses: ["min-width-6"],
					},
				],
			},

			{
				name: "Resistance Reduction",
				targets: [
					"captain",
					"special",
					"superSpecial",
					"swap",
					"sailor",
					"support",
				],
				regex:
					/Reduces enemies' (?=((?:[^r."\d]+|r(?!esi))*))\1Resistance by -([?.\d]+)%(?:-([?.\d]+)%)? for ([?\d]+\+?)(?:-([?\d]+))? turns?/i,
				submatchers: [
					{
						type: "number",
						description: "Percentage:",
						groups: [2, 3, 4, 5],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [4, 5, 8, 9],
					},
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([1]),
				],
			},

			{
				name: "Weaken",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex:
					/(Ignores (?:Weakened )?Debuff Protection and )?Inflicts (?:all enemies) with Weaken by ([?.\d]+)x(?:-([?.\d]+)x)?, by ([?.\d]+)x(?:-([?.\d]+)x)? if enemies are inflicted with Increase Damage Taken, for ([?\d]+\+?)(?:-([?\d]+))? turns?/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [2, 3, 4, 5],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [6, 7, 8, 9],
					},
					{
						type: "option",
						description: "Ignores Immunity",
						regex: /i/,
						groups: [1],
					},
				],
			},

			{
				name: "Marked",
				targets: ["special", "superSpecial"],
				regex:
					/Marks all enemies (?:with ([?.,\d]+) or more MAX HP)/i,
				submatchers: [
					{
						type: "number",
						description: "Enemy's Minimum MAX HP:",
						groups: [1],
					},
				],
			},
			{
				name: "Percent Damage Reduction",
				targets: ["special", "superSpecial"],
				regex:
					/(ignores? (?:Percent Damage Reduction )?Debuff Protection and )?(?:Reduces|Removes) enemies' damage received by ([?\d]+)%(?:-([?\d]+)%)? for ([?\d]+)(?:-([?\d]+))? turns?/i,
				submatchers: [
					{
						type: "number",
						description: "Damage reduced percentage:",
						groups: [1, 2],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [3, 4],
					},
				],
			},

			{
				name: "Allow Ignore Debuff Protection",
				targets: ["captain"],
				regex:
					/allows effects that inflict (?=((?:[^i]+|i(?!gnore))*))\1ignore Debuff Protection/i,
				submatchers: [
					{
						type: "option",
						description: "ATK Down",
						regex: /ATK Down/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Burn",
						regex: /Burn/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Delay",
						regex: /Delay/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Melo-Melo",
						regex: /Melo-Melo/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Negative",
						regex: /Negative/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Paralysis",
						regex: /Paralysis/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Poison",
						regex: /Poison/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Weaken",
						regex: /Weaken/i,
						groups: [1],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Defense Reduction",
						regex: /Defense Reduction/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
					{
						type: "option",
						description: "Increase Damage Taken",
						regex: /Increase Damage Taken/i,
						groups: [1],
						cssClasses: ["min-width-12"],
					},
				],
			},
		],
		"Reduce Enemy Effects": [
			{
				name: "Old Enemy End of Turn Heal buff reducer",
				targets: ["special", "superSpecial", "swap", "support"],
				regex: /(removes|reduces).+End of Turn Heal.+duration/i,
			},

			{
				name: "End of Turn Heal",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/(?:reduces|removes) enemies[^."]+?End of Turn Heal[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},

			{
				name: "Old Enemy End of Turn Damage/Percent Cut buff reducer",
				targets: ["special", "superSpecial", "swap", "support"],
				regex: /(removes|reduces).+End of Turn Damage\/Percent Cut.+duration/i,
			},

			{
				name: "End of Turn Damage/Percent Cut",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/(?:reduces|removes) enemies[^."]+?End of Turn Damage\/Percent Cut[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},

			{
				name: "Old Enemy Enrage buff reducer",
				targets: ["special", "superSpecial", "swap", "support"],
				regex: /(removes|reduces).+Enrage.+duration/i,
			},

			{
				name: "Enrage",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/(?:reduces|removes) enemies[^."]+?Enrage[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},

			{
				name: "Old Enemy ATK UP buff reducer",
				targets: ["special", "superSpecial", "swap", "support"],
				regex: /(removes|reduces).+ATK UP.+duration/i,
			},

			{
				name: "ATK UP",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/(?:reduces|removes) enemies'[^."]+?ATK UP[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},

			{
				name: "Old Enemy Increased Defense reducer",
				targets: ["special", "superSpecial", "swap", "support"],
				regex: /(removes|reduces).+Increased Defense.+duration/i,
			},

			{
				name: "Increased Defense",
				targets: ["captain", "special", "superSpecial", "swap", "support", "sailor"],
				regex:
					/(?:reduces|removes) enemies'[^."]+?Increased Defense[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},

			{
				name: "Old Enemy Percent Damage Reduction reducer",
				targets: ["special", "superSpecial", "swap", "support"],
				regex: /(removes|reduces).+Percent Damage Reduction.+duration/i,
			},

			{
				name: "Percent Damage Reduction",
				targets: ["captain", "special", "superSpecial", "swap", "support", "sailor"],
				regex:
					/(?:reduces|removes) enemies'[^."]+?Percent Damage Reduction[^."]+?(?:duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?|effect (?:by (\d+)%(?:-(\d+)%)?)(?:, by (\d+)%(?:-(\d+)%)?)?)/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
					{
						type: "number",
						description: "Percentage:",
						groups: [6, 7, 8, 9],
					},
				],
			},

			{
				name: "Old Enemy Damage Nullification reducer",
				targets: ["special", "superSpecial", "swap", "support"],
				regex: /(removes|reduces).+Damage Nullification.+duration/i,
			},

			{
				name: "Damage Nullification",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex:
					/(?:reduces|removes) enemies'[^."]+?Damage Nullification[^."]+?(?:duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?|effect (?:by (\d+)%(?:-(\d+)%)?)(?:, by (\d+)%(?:-(\d+)%)?)?)/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
					{
						type: "number",
						description: "Percentage:",
						groups: [6, 7, 8, 9],
					},
				],
			},

			{
				name: "Old Enemy Threshold Damage Reduction reducer",
				targets: ["special", "superSpecial", "swap", "support"],
				regex: /(removes|reduces).+Threshold Damage Reduction.+duration/i,
			},

			{
				name: "Threshold Damage Reduction",
				targets: ["captain", "special", "superSpecial", "swap", "support", "sailor"],
				regex:
					/(?:reduces|removes) enemies'[^."]+?Threshold Damage Reduction[^."]+?(?:duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?|effect (?:by (\d+)%(?:-(\d+)%)?)(?:, by (\d+)%(?:-(\d+)%)?)?)/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
					{
						type: "number",
						description: "Percentage:",
						groups: [6, 7, 8, 9],
					},
				],
			},

			{
				name: "Orb-Based Damage Reduction",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/(?:reduces|removes) enemies'[^."]+?Orb-Based Damage Reduction[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},

			{
				name: "Old Enemy Barrier reducer",
				targets: ["special", "superSpecial", "swap", "support"],
				regex: /(removes|reduces).+Barrier .*duration/i,
			},

			{
				name: "Barrier",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex:
					/(?:reduces|removes) enemies'[^."]+?Barrier[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},

			{
				name: "Old Enemy Resilience reducer",
				targets: ["special", "superSpecial", "swap", "support"],
				regex: /(removes|reduces).+Resilience.+duration/i,
			},

			{
				name: "Resilience",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex:
					/(?:reduces|removes) enemies'[^."]+?Resilience[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},

			{
				name: "Positive Buff",
				targets: ["captain", "special", "superSpecial", "swap", "support"],
				regex:
					/(?:reduces|removes) enemies'[^."]+?positive buff[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},

			{
				name: "Intimidation",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/(?:reduces|removes) enemies'[^."]+?Intimidation[^."]+?duration (?:by ([?\d]+)(?:-([?\d]+))? turns?|(completely))(?:, by ([?\d]+)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [1, 2, 3, 4, 5],
					},
				],
			},

		],

		"Buffs": [
			{
				name: "Accuracy",
				targets: ["rumbleAbility", "gpAbility"],
				regex:
					/Applies Lv. ([\d]+)[^.]+Accuracy[^.]+up buff to ([^.]+)/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					...createUniversalSubmatcher([2]),
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Accuracy",
				targets: ["rumbleSpecial"],
				regex:
					/Applies Lv. ([\d]+)[^.]+Accuracy[^.]+up buff to (\d)?(self|(?=((?:[^c]+|c(?!rew))*))\4crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [7],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([6]),
				],
			},

			{
				name: "Accuracy",
				targets: ["gpSpecial"],
				regex:
					/Applies Lv. ([\d]+)[^.]+Accuracy[^.]+up buff to (\d)?(?=((?:[^c]+|c(?!rew))*))\3crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "ATK",
				targets: ["rumbleAbility", "gpAbility"],
				regex:
					/Applies Lv. ([\d]+)[^.]+ATK[^.]+up buff to ([^.]+)/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					...createUniversalSubmatcher([2]),
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "ATK",
				targets: ["rumbleSpecial"],
				regex:
					/Applies Lv. ([\d]+)[^.]+ATK[^.]+up buff to (\d)?(self|(?=((?:[^c]+|c(?!rew))*))\4crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [7],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([6]),
				],
			},
		
			{
				name: "ATK",
				targets: ["gpSpecial"],
				regex:
					/Applies Lv. ([\d]+)[^.]+ATK[^.]+up buff to (\d)?(?=((?:[^c]+|c(?!rew))*))\3crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "Blow Away",
				targets: ["rumbleAbility", "gpAbility"],
				regex:
					/Applies Lv. ([\d]+)[^.]+Blow Away[^.]+up buff to ([^.]+)/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					...createUniversalSubmatcher([2]),
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Blow Away",
				targets: ["rumbleSpecial"],
				regex:
					/Applies Lv. ([\d]+)[^.]+Blow Away[^.]+up buff to (\d)?(self|(?=((?:[^c]+|c(?!rew))*))\4crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [7],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([6]),
				],
			},

			{
				name: "Blow Away",
				targets: ["gpSpecial"],
				regex:
					/Applies Lv. ([\d]+)[^.]+Blow Away[^.]+up buff to (\d)?(?=((?:[^c]+|c(?!rew))*))\3crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "Critical Hit",
				targets: ["rumbleAbility", "gpAbility"],
				regex:
					/Applies Lv. ([\d]+)[^.]+Critical Hit[^.]+up buff to ([^.]+)/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					...createUniversalSubmatcher([2]),
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Critical Hit",
				targets: ["rumbleSpecial"],
				regex:
					/Applies Lv. ([\d]+)[^.]+Critical Hit[^.]+up buff to (\d)?(self|(?=((?:[^c]+|c(?!rew))*))\4crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [7],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([6]),
				],
			},

			{
				name: "Critical Hit",
				targets: ["gpSpecial"],
				regex:
					/Applies Lv. ([\d]+)[^.]+Critical Hit[^.]+up buff to (\d)?(?=((?:[^c]+|c(?!rew))*))\3crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "DEF",
				targets: ["rumbleAbility", "gpAbility"],
				regex:
					/Applies Lv. ([\d]+)[^.]+DEF[^.]+up buff to ([^.]+)/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					...createUniversalSubmatcher([2]),
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "DEF",
				targets: ["rumbleSpecial"],
				regex:
					/Applies Lv. ([\d]+)[^.]+DEF[^.]+up buff to (\d)?(self|(?=((?:[^c]+|c(?!rew))*))\4crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [7],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([6]),
				],
			},

			{
				name: "DEF",
				targets: ["gpSpecial"],
				regex:
					/Applies Lv. ([\d]+)[^.]+DEF[^.]+up buff to (\d)?(?=((?:[^c]+|c(?!rew))*))\3crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "Guard",
				targets: ["rumbleAbility", "gpAbility"],
				regex:
					/Applies Lv. ([\d]+)[^.]+Guard[^.]+up buff to ([^.]+)/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					...createUniversalSubmatcher([2]),
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Guard",
				targets: ["rumbleSpecial"],
				regex:
					/Applies Lv. ([\d]+)[^.]+Guard[^.]+up buff to (\d)?(self|(?=((?:[^c]+|c(?!rew))*))\4crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [7],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([6]),
				],
			},

			{
				name: "Guard",
				targets: ["gpSpecial"],
				regex:
					/Applies Lv. ([\d]+)[^.]+Guard[^.]+up buff to (\d)?(?=((?:[^c]+|c(?!rew))*))\3crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "HP",
				targets: ["rumbleAbility", "gpAbility"],
				regex:
					/Applies Lv. ([\d]+)[^.]+HP[^.]+up buff to ([^.]+)/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					...createUniversalSubmatcher([2]),
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "RCV",
				targets: ["rumbleAbility", "gpAbility"],
				regex:
					/Applies Lv. ([\d]+)[^.]+RCV[^.]+up buff to ([^.]+)/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					...createUniversalSubmatcher([2]),
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "RCV",
				targets: ["rumbleSpecial"],
				regex:
					/Applies Lv. ([\d]+)[^.]+RCV[^.]+up buff to (\d)?(self|(?=((?:[^c]+|c(?!rew))*))\4crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [7],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([6]),
				],
			},

			{
				name: "RCV",
				targets: ["gpSpecial"],
				regex:
					/Applies Lv. ([\d]+)[^.]+RCV[^.]+up buff to (\d)?(?=((?:[^c]+|c(?!rew))*))\3crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "Shield",
				targets: ["rumbleAbility", "gpAbility"],
				regex:
					/Applies Lv. ([\d]+)[^.]+Shield[^.]+up buff to ([^.]+)/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					...createUniversalSubmatcher([2]),
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Shield",
				targets: ["rumbleSpecial"],
				regex:
					/Applies Lv. ([\d]+)[^.]+Shield[^.]+up buff to (\d)?(self|(?=((?:[^c]+|c(?!rew))*))\4crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [7],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([6]),
				],
			},

			{
				name: "Shield",
				targets: ["gpSpecial"],
				regex:
					/Applies Lv. ([\d]+)[^.]+Shield[^.]+up buff to (\d)?(?=((?:[^c]+|c(?!rew))*))\3crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "SPD",
				targets: ["rumbleAbility", "gpAbility"],
				regex:
					/Applies Lv. ([\d]+)[^.]+SPD[^.]+up buff to ([^.]+)/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					...createUniversalSubmatcher([2]),
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "SPD",
				targets: ["rumbleSpecial"],
				regex:
					/Applies Lv. ([\d]+)[^.]+SPD[^.]+up buff to (\d)?(self|(?=((?:[^c]+|c(?!rew))*))\4crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [7],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([6]),
				],
			},

			{
				name: "SPD",
				targets: ["gpSpecial"],
				regex:
					/Applies Lv. ([\d]+)[^.]+SPD[^.]+up buff to (\d)?(?=((?:[^c]+|c(?!rew))*))\3crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "Special CT",
				targets: ["rumbleAbility", "gpAbility"],
				regex:
					/Applies Lv. ([\d]+)[^.]+Special CT[^.]+up buff to ([^.]+)/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					...createUniversalSubmatcher([2]),
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Special CT",
				targets: ["rumbleSpecial"],
				regex:
					/Applies Lv. ([\d]+)[^.]+Special CT[^.]+up buff to (\d)?(self|(?=((?:[^c]+|c(?!rew))*))\4crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [7],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([6]),
				],
			},

			{
				name: "Special CT",
				targets: ["gpSpecial"],
				regex:
					/Applies Lv. ([\d]+)[^.]+Special CT[^.]+up buff to (\d)?(?=((?:[^c]+|c(?!rew))*))\3crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},
		],

		"Debuffs": [
			{
				name: "Accuracy",
				targets: ["rumbleAbility", "gpAbility"],
				regex:
					/Inflicts Lv. ([\d]+)[^.]+Accuracy[^.]+down debuff to ([^.]+)/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					...createUniversalSubmatcher([2]),
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Accuracy",
				targets: ["rumbleSpecial"],
				regex:
					/Inflicts Lv. ([\d]+)[^.]+Accuracy[^.]+down debuff to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?(?: (\d+) times?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [6],
					},
					{
						type: "number",
						description: "Repeat:",
						groups: [7],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([5]),
				],
			},

			{
				name: "Accuracy",
				targets: ["gpSpecial"],
				regex:
					/Inflicts Lv. ([\d]+)[^.]+Accuracy[^.]+down debuff to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "ATK",
				targets: ["rumbleAbility", "gpAbility"],
				regex:
					/Inflicts Lv. ([\d]+)[^.]+ATK[^.]+down debuff to ([^.]+)/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					...createUniversalSubmatcher([2]),
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "ATK",
				targets: ["rumbleSpecial"],
				regex:
					/Inflicts Lv. ([\d]+)[^.]+ATK[^.]+down debuff to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?(?: (\d+) times?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [6],
					},
					{
						type: "number",
						description: "Repeat:",
						groups: [7],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([5]),
				],
			},

			{
				name: "ATK",
				targets: ["gpSpecial"],
				regex:
					/Inflicts Lv. ([\d]+)[^.]+ATK[^.]+down debuff to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "Critical Hit",
				targets: ["rumbleAbility", "gpAbility"],
				regex:
					/Inflicts Lv. ([\d]+)[^.]+Critical Hit[^.]+down debuff to ([^.]+)/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					...createUniversalSubmatcher([2]),
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Critical Hit",
				targets: ["rumbleSpecial"],
				regex:
					/Inflicts Lv. ([\d]+)[^.]+Critical Hit[^.]+down debuff to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?(?: (\d+) times?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [6],
					},
					{
						type: "number",
						description: "Repeat:",
						groups: [7],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([5]),
				],
			},

			{
				name: "Critical Hit",
				targets: ["gpSpecial"],
				regex:
					/Inflicts Lv. ([\d]+)[^.]+Critical Hit[^.]+down debuff to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "DEF",
				targets: ["rumbleAbility", "gpAbility"],
				regex:
					/Inflicts Lv. ([\d]+)[^.]+DEF[^.]+down debuff to ([^.]+)/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					...createUniversalSubmatcher([2]),
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "DEF",
				targets: ["rumbleSpecial"],
				regex:
					/Inflicts Lv. ([\d]+)[^.]+DEF[^.]+down debuff to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?(?: (\d+) times?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [6],
					},
					{
						type: "number",
						description: "Repeat:",
						groups: [7],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([5]),
				],
			},

			{
				name: "DEF",
				targets: ["gpSpecial"],
				regex:
					/Inflicts Lv. ([\d]+)[^.]+DEF[^.]+down debuff to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "Guard",
				targets: ["rumbleAbility", "gpAbility"],
				regex:
					/Inflicts Lv. ([\d]+)[^.]+Guard[^.]+down debuff to ([^.]+)/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					...createUniversalSubmatcher([2]),
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Guard",
				targets: ["rumbleSpecial"],
				regex:
					/Inflicts Lv. ([\d]+)[^.]+Guard[^.]+down debuff to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?(?: (\d+) times?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [6],
					},
					{
						type: "number",
						description: "Repeat:",
						groups: [7],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([5]),
				],
			},

			{
				name: "Guard",
				targets: ["gpSpecial"],
				regex:
					/Inflicts Lv. ([\d]+)[^.]+Guard[^.]+down debuff to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "HP",
				targets: ["rumbleAbility", "gpAbility"],
				regex:
					/Inflicts Lv. ([\d]+)[^.]+HP[^.]+down debuff to ([^.]+)/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					...createUniversalSubmatcher([2]),
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "RCV",
				targets: ["rumbleSpecial"],
				regex:
					/Inflicts Lv. ([\d]+)[^.]+RCV[^.]+down debuff to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?(?: (\d+) times?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [6],
					},
					{
						type: "number",
						description: "Repeat:",
						groups: [7],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([5]),
				],
			},

			{
				name: "RCV",
				targets: ["gpSpecial"],
				regex:
					/Inflicts Lv. ([\d]+)[^.]+RCV[^.]+down debuff to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "SPD",
				targets: ["rumbleAbility", "gpAbility"],
				regex:
					/Inflicts Lv. ([\d]+)[^.]+SPD[^.]+down debuff to ([^.]+)/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					...createUniversalSubmatcher([2]),
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "SPD",
				targets: ["rumbleSpecial"],
				regex:
					/Inflicts Lv. ([\d]+)[^.]+SPD[^.]+down debuff to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?(?: (\d+) times?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [6],
					},
					{
						type: "number",
						description: "Repeat:",
						groups: [7],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([5]),
				],
			},

			{
				name: "SPD",
				targets: ["gpSpecial"],
				regex:
					/Inflicts Lv. ([\d]+)[^.]+SPD[^.]+down debuff to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "Special CT",
				targets: ["rumbleAbility", "gpAbility"],
				regex:
					/Inflicts Lv. ([\d]+)[^.]+Special CT[^.]+down debuff to ([^.]+)/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					...createUniversalSubmatcher([2]),
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Special CT",
				targets: ["rumbleSpecial"],
				regex:
					/Inflicts Lv. ([\d]+)[^.]+Special CT[^.]+down debuff to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?(?: (\d+) times?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [6],
					},
					{
						type: "number",
						description: "Repeat:",
						groups: [7],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([5]),
				],
			},

			{
				name: "Special CT",
				targets: ["gpSpecial"],
				regex:
					/Inflicts Lv. ([\d]+)[^.]+Special CT[^.]+down debuff to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Level:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},
		],

		"Recharge": [
			{
				name: "Healer: RCV",
				targets: ["rumbleAbility", "rumbleSpecial"],
				regex:
					/Heals ([.\d]+)x RCV of HP to (\d)?(self|(?=((?:[^c]+|c(?!rew))*))\4crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?/i,
				submatchers: [
					{
						type: "number",
						description: "Amount:",
						groups: [1],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([6]),
				],
			},

			{
				name: "Healer: RCV",
				targets: ["gpSpecial"],
				regex:
					/Heals ([.\d]+)x RCV of HP to (\d)?(?=((?:[^c]+|c(?!rew))*))\3crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?/i,
				submatchers: [
					{
						type: "number",
						description: "Amount:",
						groups: [1],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "Healer: Percentage",
				targets: ["rumbleSpecial"],
				regex:
					/Heals ([.\d]+)% of HP to (\d)?(self|(?=((?:[^c]+|c(?!rew))*))\4crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?/i,
				submatchers: [
					{
						type: "number",
						description: "Amount:",
						groups: [1],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([6]),
				],
			},

			{
				name: "Healer: Percentage",
				targets: ["gpSpecial"],
				regex:
					/Heals ([.\d]+)% of HP to (\d)?(?=((?:[^c]+|c(?!rew))*))\3crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?/i,
				submatchers: [
					{
						type: "number",
						description: "Amount:",
						groups: [1],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "Healer: Fixed",
				targets: ["rumbleSpecial"],
				regex:
					/Heals ([,\d]+) fixed HP to (\d)?(self|(?=((?:[^c]+|c(?!rew))*))\4crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?/i,
				submatchers: [
					{
						type: "number",
						description: "Amount:",
						groups: [1],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([6]),
				],
			},

			{
				name: "Healer: Fixed",
				targets: ["gpSpecial"],
				regex:
					/Heals ([,\d]+) fixed HP to (\d)?(?=((?:[^c]+|c(?!rew))*))\3crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?/i,
				submatchers: [
					{
						type: "number",
						description: "Amount:",
						groups: [1],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "Healer: Interval",
				targets: ["rumbleSpecial"],
				regex:
					/Heals ([,\d]+) fixed HP every (\d+) seconds to (\d)?(self|(?=((?:[^c]+|c(?!rew))*))\5crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Amount:",
						groups: [1],
					},
					{
						type: "number",
						description: "Interval:",
						groups: [2],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [8],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [3],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [4],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([4]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([4]),
				],
			},

			{
				name: "Healer: Interval",
				targets: ["gpSpecial"],
				regex:
					/Heals ([,\d]+) fixed HP every (\d+) seconds to (\d)?(?=((?:[^c]+|c(?!rew))*))\4crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Amount:",
						groups: [1],
					},
					{
						type: "number",
						description: "Interval:",
						groups: [2],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [6],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [3],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [4],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([4]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([4]),
				],
			},

			{
				name: "Special CT",
				targets: ["rumbleAbility", "rumbleSpecial"],
				regex:
					/Reduces ([.\d]+)% of Special CT to (\d)?(self|(?=((?:[^c]+|c(?!rew))*))\4crew members?)([. ])?(, excluding self,)?(?: ?with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: ?in a ([\w]+, [\w]+) range)?/i,
				submatchers: [
					{
						type: "number",
						description: "Amount:",
						groups: [1],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-12"],
					},
					{
						type: "option",
						description: "Includes Self",
						regex: /./i,
						groups: [5],
						cssClasses: ["min-width-12"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([8]),
				],
			},

			{
				name: "Special CT",
				targets: ["gpSpecial"],
				regex:
					/Reduces ([.\d]+)% of Special CT to (\d)?(?=((?:[^c]+|c(?!rew))*))\3crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?/i,
				submatchers: [
					{
						type: "number",
						description: "Amount:",
						groups: [1],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},
		],

		"Boons": [
			{
				name: "Counter",
				targets: ["rumbleSpecial"],
				regex:
					/Grant ([.\d]+)x Counter to (\d)?(self|(?=((?:[^c]+|c(?!rew))*))\4crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Amount:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [7],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([6]),
				],
			},

			{
				name: "Counter",
				targets: ["gpSpecial"],
				regex:
					/Grant ([.\d]+)x Counter to (\d)?(?=((?:[^c]+|c(?!rew))*))\3crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Amount:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "Haste",
				targets: ["rumbleSpecial"],
				regex:
					/([.\d]+)% chance to grant Haste to (\d)?(self|(?=((?:[^c]+|c(?!rew))*))\4crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "Haste",
				targets: ["gpSpecial"],
				regex:
					/([.\d]+)% chance to grant Haste to (\d)?(?=((?:[^c]+|c(?!rew))*))\3crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "Provoke: Enemies",
				targets: ["rumbleSpecial"],
				regex:
					/Provoke enemies to (\d)?(self|(?=((?:[^c]+|c(?!rew))*))\3crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [1],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Provoke: Enemies",
				targets: ["gpSpecial"],
				regex:
					/Provoke enemies to (\d)?(?=((?:[^c]+|c(?!rew))*))\2crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Duration:",
						groups: [4],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [1],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Provoke: Crew Members",
				targets: ["rumbleSpecial", "gpSpecial"],
				regex:
					/Provoke crew members to (\d)?(?=((?:[^e]+|e(?!nem))*))\2enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [1],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},
		],

		"Hinderances": [
			{
				name: "Action Bind",
				targets: ["rumbleSpecial"],
				regex:
					/([.\d]+)% chance to inflict[^.]+Action Bind[^.]+to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [6],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([5]),
				],
			},

			{
				name: "Action Bind",
				targets: ["gpSpecial"],
				regex:
					/([.\d]+)% chance to inflict[^.]+Action Bind[^.]+to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "Confusion",
				targets: ["rumbleSpecial"],
				regex:
					/([.\d]+)% chance to inflict[^.]+Confusion[^.]+to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [6],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([5]),
				],
			},

			{
				name: "Confusion",
				targets: ["gpSpecial"],
				regex:
					/([.\d]+)% chance to inflict[^.]+Confusion[^.]+to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "Forced Out",
				targets: ["rumbleSpecial"],
				regex:
					/([.\d]+)% chance to inflict[^.]+Forced Out[^.]+to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [6],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([5]),
				],
			},

			{
				name: "Forced Out",
				targets: ["gpSpecial"],
				regex:
					/([.\d]+)% chance to inflict[^.]+Forced Out[^.]+to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "Paralysis",
				targets: ["rumbleSpecial"],
				regex:
					/([.\d]+)% chance to inflict[^.]+Paralysis[^.]+to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [6],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([5]),
				],
			},

			{
				name: "Paralysis",
				targets: ["gpSpecial"],
				regex:
					/([.\d]+)% chance to inflict[^.]+Paralysis[^.]+to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "RCV Bind",
				targets: ["rumbleSpecial"],
				regex:
					/([.\d]+)% chance to inflict[^.]+RCV Bind[^.]+to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [6],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([5]),
				],
			},

			{
				name: "RCV Bind",
				targets: ["gpSpecial"],
				regex:
					/([.\d]+)% chance to inflict[^.]+RCV Bind[^.]+to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "Special Bind",
				targets: ["rumbleSpecial"],
				regex:
					/([.\d]+)% chance to inflict[^.]+Special Bind[^.]+to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [6],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([5]),
				],
			},

			{
				name: "Special Bind",
				targets: ["gpSpecial"],
				regex:
					/([.\d]+)% chance to inflict[^.]+Special Bind[^.]+to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "Half Stats",
				targets: ["rumbleSpecial"],
				regex:
					/([.\d]+)% chance to inflict[^.]+Half([^.]+)to (\d)?(?=((?:[^e]+|e(?!nem))*))\4enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [7],
					},
					{
						type: "option",
						description: "All",
						regex: /Stats/i,
						groups: [2],
						cssClasses: ["min-width-4"],
					},
					{
						type: "option",
						description: "ATK",
						regex: /(ATK|Stats)/i,
						groups: [2],
						cssClasses: ["min-width-4"],
					},
					{
						type: "option",
						description: "DEF",
						regex: /(DEF|Stats)/i,
						groups: [2],
						cssClasses: ["min-width-4"],
					},
					{
						type: "option",
						description: "RCV",
						regex: /(RCV|Stats)/i,
						groups: [2],
						cssClasses: ["min-width-4"],
					},
					{
						type: "option",
						description: "SPD",
						regex: /(SPD|Stats)/i,
						groups: [2],
						cssClasses: ["min-width-4"],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [3],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [4],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([4]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([4]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([6]),
				],
			},

			{
				name: "Half Stats",
				targets: ["gpSpecial"],
				regex:
					/([.\d]+)% chance to inflict[^.]+Half([^.]+)to (\d)?(?=((?:[^e]+|e(?!nem))*))\4enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [6],
					},
					{
						type: "option",
						description: "All",
						regex: /Stats/i,
						groups: [2],
						cssClasses: ["min-width-4"],
					},
					{
						type: "option",
						description: "ATK",
						regex: /(ATK|Stats)/i,
						groups: [2],
						cssClasses: ["min-width-4"],
					},
					{
						type: "option",
						description: "DEF",
						regex: /(DEF|Stats)/i,
						groups: [2],
						cssClasses: ["min-width-4"],
					},
					{
						type: "option",
						description: "RCV",
						regex: /(RCV|Stats)/i,
						groups: [2],
						cssClasses: ["min-width-4"],
					},
					{
						type: "option",
						description: "SPD",
						regex: /(SPD|Stats)/i,
						groups: [2],
						cssClasses: ["min-width-4"],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [3],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [4],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([4]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([4]),
				],
			},

			{
				name: "Special CT",
				targets: ["rumbleAbility", "rumbleSpecial"],
				regex:
					/Removes ([.\d]+)% of Special CT to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: (\d+) times?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Amount:",
						groups: [1],
					},
					{
						type: "number",
						description: "Repeat:",
						groups: [6],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([5]),
				],
			},

			{
				name: "Special CT",
				targets: ["gpSpecial"],
				regex:
					/Removes ([.\d]+)% of Special CT to (\d)?(?=((?:[^e]+|e(?!nem))*))\3enem(?:y|ies)(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: (\d+) times?)?/i,
				submatchers: [
					{
						type: "number",
						description: "Amount:",
						groups: [1],
					},
					{
						type: "number",
						description: "Repeat:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [2],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},
		],

		"Hinderance Reducers": [
			{
				name: "Action Bind",
				targets: ["rumbleSpecial"],
				regex:
					/Reduce[^.]+Action Bind[^.]+to (\d)?(self|(?=((?:[^c]+|c(?!rew))*))\3crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Duration:",
						groups: [6],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [1],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([5]),
				],
			},

			{
				name: "Action Bind",
				targets: ["gpSpecial"],
				regex:
					/Reduce[^.]+Action Bind[^.]+to (\d)?(?=((?:[^c]+|c(?!rew))*))\2crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Duration:",
						groups: [4],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [1],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Damage Over Time",
				targets: ["rumbleSpecial"],
				regex:
					/Reduce[^.]+Damage Over Time[^.]+to (\d)?(self|(?=((?:[^c]+|c(?!rew))*))\3crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Duration:",
						groups: [6],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [1],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([5]),
				],
			},

			{
				name: "Damage Over Time",
				targets: ["gpSpecial"],
				regex:
					/Reduce[^.]+Damage Over Time[^.]+to (\d)?(?=((?:[^c]+|c(?!rew))*))\2crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Duration:",
						groups: [4],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [1],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Half Stats",
				targets: ["rumbleSpecial"],
				regex:
					/Reduce[^.]+Half Stats[^.]+to (\d)?(self|(?=((?:[^c]+|c(?!rew))*))\3crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Duration:",
						groups: [6],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [1],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([5]),
				],
			},

			{
				name: "Half Stats",
				targets: ["gpSpecial"],
				regex:
					/Reduce[^.]+Half Stats[^.]+to (\d)?(?=((?:[^c]+|c(?!rew))*))\2crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Duration:",
						groups: [4],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [1],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Paralysis",
				targets: ["rumbleSpecial"],
				regex:
					/Reduce[^.]+Paralysis[^.]+to (\d)?(self|(?=((?:[^c]+|c(?!rew))*))\3crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Duration:",
						groups: [6],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [1],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([5]),
				],
			},

			{
				name: "Paralysis",
				targets: ["gpSpecial"],
				regex:
					/Reduce[^.]+Paralysis[^.]+to (\d)?(?=((?:[^c]+|c(?!rew))*))\2crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Duration:",
						groups: [4],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [1],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "RCV Bind",
				targets: ["rumbleSpecial"],
				regex:
					/Reduce[^.]+RCV Bind[^.]+to (\d)?(self|(?=((?:[^c]+|c(?!rew))*))\3crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Duration:",
						groups: [6],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [1],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([5]),
				],
			},

			{
				name: "RCV Bind",
				targets: ["gpSpecial"],
				regex:
					/Reduce[^.]+RCV Bind[^.]+to (\d)?(?=((?:[^c]+|c(?!rew))*))\2crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Duration:",
						groups: [4],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [1],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Special Bind",
				targets: ["rumbleSpecial"],
				regex:
					/Reduce[^.]+Special Bind[^.]+to (\d)?(self|(?=((?:[^c]+|c(?!rew))*))\3crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: in a ([\w]+, [\w]+) range)?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Duration:",
						groups: [6],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [1],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
					{
						type: "separator",
						description: "Range:",
					},
					...createRangeSubmatcher([5]),
				],
			},

			{
				name: "Special Bind",
				targets: ["gpSpecial"],
				regex:
					/Reduce[^.]+Special Bind[^.]+to (\d)?(?=((?:[^c]+|c(?!rew))*))\2crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Duration:",
						groups: [4],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "number",
						description: "Count:",
						groups: [1],
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},
		],

		"Evades": [
			{
				name: "Action Bind",
				targets: ["rumbleSpecial"],
				regex:
					/([.\d]+)% chance to evade[^.]+Action Bind[^.]+to (self|(?=((?:[^c]+|c(?!rew))*))\3crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Action Bind",
				targets: ["gpSpecial"],
				regex:
					/([.\d]+)% chance to evade[^.]+Action Bind[^.]+to (?=((?:[^c]+|c(?!rew))*))\2crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [4],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Forced Out",
				targets: ["rumbleSpecial"],
				regex:
					/([.\d]+)% chance to evade[^.]+Forced Out[^.]+to (self|(?=((?:[^c]+|c(?!rew))*))\3crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Forced Out",
				targets: ["gpSpecial"],
				regex:
					/([.\d]+)% chance to evade[^.]+Forced Out[^.]+to (?=((?:[^c]+|c(?!rew))*))\2crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [4],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Half Stats",
				targets: ["rumbleSpecial"],
				regex:
					/([.\d]+)% chance to evade[^.]+Half Stats[^.]+to (self|(?=((?:[^c]+|c(?!rew))*))\3crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Paralysis",
				targets: ["rumbleSpecial"],
				regex:
					/([.\d]+)% chance to evade[^.]+Paralysis[^.]+to (self|(?=((?:[^c]+|c(?!rew))*))\3crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Paralysis",
				targets: ["gpSpecial"],
				regex:
					/([.\d]+)% chance to evade[^.]+Paralysis[^.]+to (?=((?:[^c]+|c(?!rew))*))\2crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [4],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Special Bind",
				targets: ["rumbleSpecial"],
				regex:
					/([.\d]+)% chance to evade[^.]+Special Bind[^.]+to (self|(?=((?:[^c]+|c(?!rew))*))\3crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Special Bind",
				targets: ["gpSpecial"],
				regex:
					/([.\d]+)% chance to evade[^.]+Special Bind[^.]+to (?=((?:[^c]+|c(?!rew))*))\2crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [4],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Special CT",
				targets: ["rumbleSpecial"],
				regex:
					/([.\d]+)% chance to evade[^.]+Special CT[^.]+to (self|(?=((?:[^c]+|c(?!rew))*))\3crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Special CT",
				targets: ["gpSpecial"],
				regex:
					/([.\d]+)% chance to evade[^.]+Special CT[^.]+to (?=((?:[^c]+|c(?!rew))*))\2crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [4],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Stats Down",
				targets: ["rumbleSpecial"],
				regex:
					/([.\d]+)% chance to evade[^.]+Stats Down[^.]+to (self|(?=((?:[^c]+|c(?!rew))*))\3crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Damage",
				targets: ["rumbleSpecial"],
				regex:
					/([.\d]+)% chance to evade([^.]+Damage[^.]+)to (self|(?=((?:[^c]+|c(?!rew))*))\4crew members?)(?:, excluding self,)?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [6],
					},
					{
						type: "separator",
						description: "Damage Types:",
					},
					{
						type: "option",
						description: "Fixed",
						regex: /Fixed Damage/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Percentage",
						regex: /Percentage Damage/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Ignoring DEF",
						regex: /Damage Ignoring DEF/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Over Time",
						regex: /Damage Over Time/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

			{
				name: "Damage",
				targets: ["gpSpecial"],
				regex:
					/([.\d]+)% chance to evade([^.]+Damage[^.]+)to (?=((?:[^c]+|c(?!rew))*))\3crew members?(?: with [^.]+ (ATK|DEF|HP|RCV|SPD|Special CT))?(?: for (\d+) seconds)?/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "number",
						description: "Duration:",
						groups: [5],
					},
					{
						type: "separator",
						description: "Damage Types:",
					},
					{
						type: "option",
						description: "Fixed",
						regex: /Fixed Damage/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Percentage",
						regex: /Percentage Damage/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Ignoring DEF",
						regex: /Damage Ignoring DEF/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "option",
						description: "Over Time",
						regex: /Damage Over Time/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					{
						type: "option",
						description: "Universal",
						regex: /all/i,
						groups: [3],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([3]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},
		],

		"Cleanse": [
			{
				name: "Stats Down",
				targets: ["rumbleSpecial", "gpSpecial"],
				regex:
					/([\d]+)% chance to cleanse ([^.]+) down debuffs to ([^.]+)/i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
					{
						type: "separator",
						description: "Stats:",
					},
					{
						type: "option",
						description: "All",
						regex: /All/i,
						groups: [2],
						cssClasses: ["min-width-4"],
					},
					{
						type: "option",
						description: "ATK",
						regex: /(ATK|all)/i,
						groups: [2],
						cssClasses: ["min-width-4"],
					},
					{
						type: "option",
						description: "DEF",
						regex: /(DEF|all)/i,
						groups: [2],
						cssClasses: ["min-width-4"],
					},
					{
						type: "option",
						description: "RCV",
						regex: /(RCV|all)/i,
						groups: [2],
						cssClasses: ["min-width-4"],
					},
					{
						type: "option",
						description: "SPD",
						regex: /(SPD|all)/i,
						groups: [2],
						cssClasses: ["min-width-4"],
					},
					{
						type: "option",
						description: "Special CT",
						regex: /(Special CT|all)/i,
						groups: [2],
						cssClasses: ["min-width-4"],
					},
					{
						type: "separator",
						description: "Targeting:",
					},
					...createUniversalSubmatcher([3]),
				],
			},
		],

		"Resistances": [

			{
				name: "Action Bind",
				targets: ["rumbleResistance"],
				regex:
					/([\d]+)% chance to resist Action Bind./i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
				],
			},

			{
				name: "Confusion",
				targets: ["rumbleResistance"],
				regex:
					/([\d]+)% chance to resist Confusion./i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
				],
			},

			{
				name: "Damage Over Time",
				targets: ["rumbleResistance"],
				regex:
					/([\d]+)% chance to resist Damage Over Time./i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
				],
			},

			{
				name: "Forced Out",
				targets: ["rumbleResistance"],
				regex:
					/([\d]+)% chance to resist Forced Out./i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
				],
			},

			{
				name: "Half Stats",
				targets: ["rumbleResistance"],
				regex:
					/([\d]+)% chance to resist Half Stats./i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
				],
			},

			{
				name: "Paralysis",
				targets: ["rumbleResistance"],
				regex:
					/([\d]+)% chance to resist Paralysis./i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
				],
			},

			{
				name: "RCV Bind",
				targets: ["rumbleResistance"],
				regex:
					/([\d]+)% chance to resist RCV Bind./i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
				],
			},

			{
				name: "Special Bind",
				targets: ["rumbleResistance"],
				regex:
					/([\d]+)% chance to resist Special Bind./i,
				submatchers: [
					{
						type: "number",
						description: "Chance:",
						groups: [1],
					},
				],
			},

		],


		Other: [
			{
				name: "Exclude Passive Base Stat Boost Only",
				targets: ["support"],
				regex:
					/"description":[^\]]*?(\["|",")(?!Adds ([?.\d]+)% of this character's base (?:ATK|HP|RCV|ATK and HP|ATK and RCV|HP and RCV|ATK, HP and RCV) to the supported character's base (?:ATK|HP|RCV|ATK and HP|ATK and RCV|HP and RCV|ATK, HP and RCV)\.?")[^"]*"/i,
			},

			{
				name: "Old Captain Swapping %target%",
				targets: ["special", "superSpecial", "swap", "support"],
				regex: /Swaps this unit with your captain/i,
			},

			{
				name: "Captain Swap",
				targets: ["special", "superSpecial", "swap", "support"],
				regex:
					/(optionally )?swaps this unit with your captain for ([?\d]+\+?)(?:-([?\d]+))? turns?(?:, for ([?\d]+\+?)(?:-([?\d]+))? turns?)?/i,
				submatchers: [
					{
						type: "option",
						description: "Optional",
						regex: /i/,
						groups: [1],
					},
					{
						type: "number",
						description: "Turns:",
						groups: [2, 3, 4, 5],
					},
				],
			},

			{
				name: "Instant Defeat",
				targets: ["special", "superSpecial", "swap", "support"],
				regex: /instantly defeat/i,
			},

			{
				name: "Cooldown Reduction",
				targets: ["potential"],
				regex: /Cooldown Reduction/i,
			},

			{
				name: "Beneficial Effect Clear",
				targets: ["special", "superSpecial", "swap", "support"],
				regex: /Removes all positive buffs on your team/i,
			},

			{
				name: "Double Special Activation",
				targets: ["potential"],
				regex: /Double Special Activation/i,
			},

			{
				name: "Triple Special Activation",
				targets: ["potential"],
				regex: /Triple Special Activation/i,
			},

			{
				name: "Barrier Penetration",
				targets: ["potential"],
				regex: /Barrier Penetration/i,
			},
			{
				name: "Class Change",
				targets: ["special", "superSpecial"],
				regex:
					/changes class [?.\d]+? of (?:all non-(?=((?:[^c."]+|c(?!har))*))\1characters?|(?=((?:[^c."]+|c(?!har))*))\2characters?) to (?=((?:[^f."]+|f(?!or))*))\3for ([?\d]+)(?:-([?\d]+))? turns?/i,
				submatchers: [
					{
						type: "number",
						description: "Turns:",
						groups: [4, 5],
					},
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([3]),
				],
			},

		],
		Uncategorized: [
			/* * * * * Specials * * * * */

			/*{
            name: 'Slot fillers',
            targets: [ 'special' ],
            regex: /(Fills\b|\[EMPTY\] orbs into|Changes.+\[EMPTY\].+into)/i,
        },*/

			/*{
            name: 'Meat producers',
            targets: [ 'special' ],
            regex: /into( either)?[\s,\[\]A-Zor]+\[RCV\]/
        },

        {
            name: 'Meat converters',
            targets: [ 'special' ],
            regex: /\[RCV\].+into/i,
        },*/
			{
				name: "Super Type/Class Transformation",
				targets: ["superSpecial"],
				regex: /transforms ([^."]+?) characters into Super/i,
				submatchers: [
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([1]),
				],
			},

			{
				name: "Has Super Swap",
				targets: ["swap"],
				regex: /"super"\s*:/i,
			},

			{
				name: "Has Sailor Ability",
				targets: ["sailor"],
				regex: /\S/i,
			},

			{
				name: "Has Support Ability",
				targets: ["support"],
				regex: /\S/i,
			},

			/* * * * * Limit Break * * * * */

			{
				name: "Has Limit Break",
				targets: ["limit"],
				regex: /\S/i,
			},

			{
				name: "Has Level Limit Break",
				targets: ["limit"],
				regex: /\^\$/i,
			},

			{
				name: "Has No Level Limit Break",
				targets: ["limit"],
				regex: /\^\$/i,
			},

			{
				name: "Key Locked Limit Break",
				targets: ["limit"],
				regex: /Locked/i,
			},

			{
				name: "Captain Upgrade Limit Break",
				targets: ["limit"],
				regex: /Captain Ability/i,
			},

			{
				name: "3rd Potential Ability",
				targets: ["limit"],
				regex: /Acquire Potential 3/i,
			},

			{
				name: "No 3rd Potential Ability",
				targets: ["limit"],
				regex: /^(.(?!Acquire Potential 3))*$/i,
			},

			/* * * * * Potential Abilities * * * * */

			// Leave uncategorized as per @Solaris
			{
				name: "Last Tap",
				targets: ["potential"],
				regex: /Obtain Last Tap/i,
			},

			{
				name: "Super Tandem",
				targets: ["potential"],
				regex: /(?:Obtain Super Tandem(?! Boost)|Boosts Tandem ATK of (?=((?:[^c."]+|c(?!har))*))\1characters? by ([.\d]+)x for (\d+) turns?)/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [2],
					},
					...createUniversalSubmatcher([1]),
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([1]),
					{
						type: "separator",
						description: "Affected positions:",
					},
					...createPositionsSubmatchers([1]),
				]
			},

			{
				name: "Super Tandem Boost",
				targets: ["potential"],
				regex: /Obtain Super Tandem Boost/i,
			},

			{
				name: "Rush",
				targets: ["potential"],
				regex: /Obtain Rush/i,
			},

			{
				name: "Damage Limit Break: Class",
				targets: ["potential"],
				regex: /Boosts Damage Limit Break effect based on number of (?!\[)(?=((?:[^c."]+|c(?!har))*))\1characters? on the crew/i,
				submatchers: [
					{
						type: "separator",
						description: "Affected classes:",
					},
					...createClassesSubmatchers([1]),
				]
			},

			{
				name: "Damage Limit Break: Type",
				targets: ["potential"],
				regex: /Boosts Damage Limit Break effect based on number of (?=\[)(?=((?:[^c."]+|c(?!har))*))\1characters? on the crew/i,
				submatchers: [
					{
						type: "separator",
						description: "Affected types:",
					},
					...createTypesSubmatchers([1]),
				]
			},

			/* * * * * Super Special Criteria * * * * */
			{
				name: "Top Row Only",
				targets: ["superSpecialCriteria"],
				regex: /^This character must be captain\.?[^."]*/i,
			},
			{
				name: "Universal Position",
				targets: ["superSpecialCriteria"],
				regex: /^(?!This character must be captain\.?)[^."]*/i,
			},
			{
				name: "Captain Shift Only",
				targets: ["superSpecialCriteria"],
				regex: /[^."]+?When character becomes [^,"]+? during Captain Shift[^."]*?/i,
			},
			{
				name: "Super Swap Only",
				targets: ["superSpecialCriteria"],
				regex: /[^."]+?When this character is in Combined Form from Super Swap Effect[^."]*?/i,
			},

			/* * * * * Rumble Cost * * * * */

			{
				name: "Cost",
				targets: ["rumbleCost"],
				regex:
					/(\d+)/i,
				submatchers: [
					{
						type: "number",
						description: "",
						groups: [1],
					}
				],
			},

			/* * * * * Rumble Ability * * * * */

			{
				name: "On Death",
				targets: ["rumbleAbility"],
				regex: /On death launches rumble special [\d]+ times?./i,
			},

			{
				name: "Revive",
				targets: ["gpAbility", "rumbleAbility"],
				regex:
					/Revive to ([\d]+)% HP after death to ([^.]+) ([\d]+) times?./i,
				submatchers: [
					{
						type: "number",
						description: "Percentage:",
						groups: [1],
					},
					{
						type: "number",
						description: "Repeat:",
						groups: [3],
					},
				],
			},

			/* * * * * Rumble Special * * * * */

			{
				name: "Cooldown",
				targets: ["rumbleSpecial"],
				regex:
					/["']cooldown["']:\s?(\d+)/i,
				submatchers: [
					{
						type: "number",
						description: "Seconds:",
						groups: [1],
					}
				],
			},

			{
				name: "Has Assault Rumble Abilities",
				targets: ["rumbleAbility", "rumbleSpecial"],
				regex: /During Assault Rumble/i,
			},

			{
				name: "Has Super Special",
				targets: ["rumbleSpecial"],
				regex: /\^\$/i,
			},

			/* * * * * Rumble Resistance * * * * */

			{
				name: "Damage Boost",
				targets: ["rumbleResistance"],
				regex:
					/([.\d]+)x damage boost to ([^.]+)/i,
				submatchers: [
					{
						type: "number",
						description: "Multiplier:",
						groups: [1],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
				],
			},

			{
				name: "Damage Reduction",
				targets: ["rumbleResistance"],
				regex:
					/([\d]+)% damage reduction from ([^.]+)/i,
				submatchers: [
					{
						type: "number",
						description: "Percentage:",
						groups: [1],
					},
					{
						type: "separator",
						description: "Damage Types:",
					},
					{
						type: "option",
						description: "Ignoring DEF",
						regex: /Damage Ignoring DEF/i,
						groups: [2],
						cssClasses: ["min-width-6"],
					},
					{
						type: "separator",
						description: "Types:",
					},
					...createTypesSubmatchers([2]),
					{
						type: "separator",
						description: "Classes:",
					},
					...createClassesSubmatchers([2]),
				],
			},

			{
				name: "Interval Healing",
				targets: ["rumbleResistance"],
				regex:
					/Heals ([,\d]+) HP every 5 seconds/i,
				submatchers: [
					{
						type: "number",
						description: "Amount:",
						groups: [1],
					},
				],
			},

			/* * * * * Grand Party Burst * * * * */

			{
				name: "Uses",
				targets: ["gpSpecial"],
				regex:
					/["']uses["']:\s?(\d+)/i,
				submatchers: [
					{
						type: "number",
						description: "",
						groups: [1],
					}
				],
			},
		],
	};

	var includeOldFilters = false;
	var alphabeticalOrder = true;
	window.matchers = {};

	// declare correct order of targets here, otherwise the tags in details of units
	// will be unordered (would be based on which matchers were added first)
	var allTargets = [
		"captain",
		"special",
		"superSpecialCriteria",
		"superSpecial",
		"swap",
		"sailor",
		"limit",
		"potential",
		"support",
	];
	for (var target of allTargets) {
		window.matchers[target] = {};
	}

	/* change the structure by grouping them by their `target`. Matchers with
multiple targets will be shallow-copied. As RegExp objects and arrays are objects,
they will only be reference-copied
*/
	for (const group in matchers) {
		for (var matcher of matchers[group]) {
			for (var target of matcher.targets) {
				if (!includeOldFilters && /^old/i.test(matcher.name)) continue;
				if (!window.matchers[target]) {
					window.matchers[target] = {};
				}
				if (!window.matchers[target][group]) {
					window.matchers[target][group] = {};
				}
				var newName;
				if (target == "superSpecial") {
					newName = matcher.name.replace(/%target%/g, "super specials");
				} else {
					newName = matcher.name.replace(/%target%/g, target + "s");
				}

				// log when a matcher is overridden
				if (window.matchers[target][group][newName]) {
					console.error('Duplicate matcher "' + newName + '"');
				}

				// shallow-copy matcher so matcher objects will have different `target`'s
				var matcherCopy = {
					...matcher,
					...{ target: target, group: group, name: newName },
				};
				if (matcherCopy.submatchers) {
					matcherCopy.submatchers = [...matcherCopy.submatchers];
				}
				window.matchers[target][group][newName] = matcherCopy;
			}
		}
	}

	if (alphabeticalOrder) {
		function sortObj(obj) {
			return Object.keys(obj)
				.sort()
				.reduce(function (result, key) {
					result[key] = obj[key];
					return result;
				}, {});
		}

		for (const target in window.matchers) {
			for (const group in window.matchers[target]) {
				window.matchers[target][group] = sortObj(
					window.matchers[target][group]
				);
			}
		}
	}
})();
