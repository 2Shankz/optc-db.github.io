(function() {
    /**
     * On-demand variant augmentation for dual/VS units
     *
     * Data Model:
     * - Base unit: "1984" with type=null, complete stats (dual) or null stats (VS)
     * - Variant entries: "1984-1", "1984-2" with variant-specific type/class
     * - Generated type-keyed variants: "1984-QCK", "1984-STR" - base stats + variant type (dual only)
     *
     * After augmentation:
     * - Base unit (type=null) is excluded from unit selection
     * - Type-keyed variants ("1984-QCK", "1984-STR") are added to window.units
     * - Completed -1/-2 variants have all metadata filled
     * - All augmented units can be looked up directly and used in damage calculation
     *
     * Usage:
     * - Call UnitVariants.augment() once at load time (after units.js loads)
     * - window.units is augmented IN PLACE
     * - All existing code continues to work
     * - New type-keyed variants are transparently available
     */
    window.UnitVariants = {
        _cache: null,

        /**
         * Main entry point - augment window.units with complete variants
         * Called once at load time after units.js is loaded
         */
        augment: function() {
            if (this._cache) return;

            var self = this;
            Object.keys(window.units).forEach(function(key) {
                var unit = window.units[key];
                if (!unit || unit.type !== null) return;

                var baseId = unit.id;
                var v1 = window.units[baseId + '-1'];
                var v2 = window.units[baseId + '-2'];
                var missing = [];
                if (!v1) missing.push('-1');
                if (!v2) missing.push('-2');
                if (missing.length > 0) {
                    console.warn('[UnitVariants] Incomplete unit ' + baseId + ': missing variant(s)' + missing.join(', ') + '. Augmentation skipped.');
                    return;
                }

                var type1 = v1.type;
                var type2 = v2.type;

                var isDualUnit = unit.type !== null;

                if (isDualUnit) {
                    if (type1) {
                        window.units[baseId + '-' + type1] = self._createDualVariant(unit, type1, v1);
                    }
                    if (type2) {
                        window.units[baseId + '-' + type2] = self._createDualVariant(unit, type2, v2);
                    }
                }

                if (v1.stars === null) {
                    window.units[baseId + '-1'] = self._completeVariant(unit, v1);
                }
                if (v2.stars === null) {
                    window.units[baseId + '-2'] = self._completeVariant(unit, v2);
                }
            });

            this._cache = true;
        },

        /**
         * Create a type-keyed variant for dual units
         * Uses base stats with variant's type and combo
         */
        _createDualVariant: function(base, type, variant) {
            return {
                id: base.id + '-' + type,
                name: base.name,
                type: type,
                class: base.class,
                stars: base.stars,
                cost: base.cost,
                combo: variant.combo || base.combo,
                sockets: base.sockets,
                maxLevel: base.maxLevel,
                maxEXP: base.maxEXP,
                minHP: base.minHP,
                minATK: base.minATK,
                minRCV: base.minRCV,
                maxHP: base.maxHP,
                maxATK: base.maxATK,
                maxRCV: base.maxRCV,
            };
        },

        /**
         * Complete a variant entry with missing metadata from base
         * Variant-specific values (type, class, stats) take precedence
         */
        _completeVariant: function(base, variant) {
            return {
                id: variant.id,
                name: variant.name,
                type: variant.type,
                class: variant.class,
                combo: variant.combo,
                stars: base.stars,
                cost: base.cost,
                sockets: base.sockets,
                maxLevel: base.maxLevel,
                maxEXP: base.maxEXP,
                minHP: variant.minHP !== null ? variant.minHP : base.minHP,
                minATK: variant.minATK !== null ? variant.minATK : base.minATK,
                minRCV: variant.minRCV !== null ? variant.minRCV : base.minRCV,
                maxHP: variant.maxHP !== null ? variant.maxHP : base.maxHP,
                maxATK: variant.maxATK !== null ? variant.maxATK : base.maxATK,
                maxRCV: variant.maxRCV !== null ? variant.maxRCV : base.maxRCV,
            };
        },

        /**
         * Get a unit by ID
         * For base IDs (type=null), returns the first complete variant
         */
        get: function(id) {
            var unit = window.units[id];
            if (!unit) return null;
            if (unit.type !== null) return unit;
            var v1 = window.units[id + '-1'];
            return v1 || unit;
        },
    };
})();
