import { DBdetail, DButils } from "./DBLoader"

// Split generated family query
function splitCriteria(criteria) {
    if (!criteria)
        return null;
    let params = criteria.split(' ');
    let families = [];
    for (let param of params) {
        if (!param.startsWith('family:^('))
            continue;
        families = param
            .slice(9, -2) // strip `family:^(` and `)$`
            .split('|')
            .map(family => family.replace(/_+/g, ' ').replace(/\\/g, ''));
    }
    return families;
}

/**
 * Failures are collected before failing, instead of creating one describe/it
 * per unit and property. That tree had hundreds of thousands of nodes and
 * overflowed the stack inside jest's result builder.
 */
function expectNoViolations(violations) {
    if (!violations.length)
        return;

    const preview = violations.slice(0, 10).join('\n  ');
    const rest = violations.length > 10 ? `\n  ...and ${violations.length - 10} more` : '';
    throw new Error(`${violations.length} violation(s):\n  ${preview}${rest}`);
}

// Every unit property as text, so structured values are checked too.
function collectUnitTexts() {
    const texts = [];
    for (const id in DBdetail) {
        if (Number(id) >= 5000) // ignore ghost units because they use same descriptions, so no need to check them
            break;
        for (const property in DBdetail[id]) {
            const value = DBdetail[id][property];
            texts.push({
                id,
                property,
                text: typeof value === 'string' ? value : JSON.stringify(value)
            });
        }
    }
    return texts;
}

function violatingUnits(texts, predicate) {
    return texts
        .filter(({ text }) => predicate(text))
        .map(({ id, property }) => `${id}: ${property}`);
}

describe('Used family names should be valid', () => {
    const allFamilies = Object.keys(DButils.getReverseFamilyMap());
    allFamilies.push("Toy Bears"); // No such family name yet, but it is valid (Sugar)

    it("checks supported characters' families", () => {
        const violations = [];
        for (const id in DBdetail) {
            const supports = DBdetail[id].support;
            if (!supports)
                continue;

            // stored in an array, though there doesn't seem to be any unit that has multiple supports
            for (const supportData of supports) {
                if (supportData.Characters === undefined) {
                    violations.push(`${id} support: missing Characters`);
                    continue;
                }

                const criteria = DButils.generateSupportedCharactersQuery(supportData.Characters);
                if (!criteria)
                    continue;

                for (const familyName of splitCriteria(criteria)) {
                    if (!allFamilies.includes(familyName))
                        violations.push(`${id} support: "${familyName}" should be in window.families (families.js)`);
                }
            }
        }
        expectNoViolations(violations);
    });

    it('checks super special criteria families', () => {
        const violations = [];
        for (const id in DBdetail) {
            const criteria = DBdetail[id].superSpecialCriteria;
            if (!criteria)
                continue;

            for (const familyName of splitCriteria(DButils.generateSuperSpecialQuery(criteria))) {
                if (!allFamilies.includes(familyName))
                    violations.push(`${id} superSpecial: "${familyName}" should be in window.families (families.js)`);
            }
        }
        expectNoViolations(violations);
    });
});

describe('Typos', () => {
    const texts = collectUnitTexts();

    // Rules that rewrite the text to its corrected form.
    const corrections = {
        'consecutive spaces': (text) => text.replace(/ {2,}/g, ' '),
        'invalid variable multipliers': (text) => text.replace(/([?.\d]+)(?:-([?.\d]+)(%|x))/g, '$1$3-$2$3'),
        '"1 turns"': (text) => text.replace(/\b1 turns/g, '1 turn'),
        '"n turn"': (text) => text.replace(/\b(\d{2,}|[02-9]) turn(?!s)/g, '$1 turns'),
    };

    for (const [name, correct] of Object.entries(corrections)) {
        it(`checks for ${name}`, () => {
            expectNoViolations(violatingUnits(texts, (text) => correct(text) !== text));
        });
    }

    it('checks for "ie" typos', () => {
        expectNoViolations(violatingUnits(texts, (text) => /thier|recieve/.test(text)));
    });

    it('checks for "a" that should be "an"', () => {
        // "an 8%" or "an 80%", "an [INT] orb" or "an [INT] character"
        expectNoViolations(violatingUnits(texts, (text) => /\ba (8|\[INT\])/.test(text)));
    });
});
