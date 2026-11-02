import "../../characters/js/utils"

describe("CharUtils.resetFilters", () => {
    beforeEach(() => {
        window.exclusiveFilterLabels = {
            drop: 'Drop: ',
            noBase: 'Hide Base'
        };
    });

    const buildFilters = () => ({
        types: ['STR'],
        classes: ['Fighter'],
        tags: [{ name: 'Free Spirit' }],
        stars: ['5'],
        cost: [10, 20],
        rumbleCost: [2, 3],
        farmable: { Story: true },
        nonFarmable: { promo: false },
        drop: 'Farmable',
        noBase: true,
        toggle: true,
        custom: {
            swap: {
                'Slot Change': {
                    expanded: true,
                    matchers: {
                        'Orb Control: Change': {
                            enabled: true,
                            submatchersOpen: true,
                            submatchers: [
                                { param: true },
                                { param: '3' }
                            ]
                        },
                        'No subfilters': { enabled: true }
                    }
                }
            }
        }
    });

    it("clears submatcher params, not just the matcher's enabled flag", () => {
        const filters = buildFilters();
        const matcher = filters.custom.swap['Slot Change'].matchers['Orb Control: Change'];

        window.CharUtils.resetFilters(filters);

        expect(matcher.enabled).toBe(false);
        expect(matcher.submatchersOpen).toBe(false);
        expect(matcher.submatchers).toEqual([{}, {}]);
    });

    it("resets every top-level filter to its default", () => {
        const filters = buildFilters();

        window.CharUtils.resetFilters(filters);

        expect(filters.types).toEqual([]);
        expect(filters.classes).toEqual([]);
        expect(filters.tags).toEqual([]);
        expect(filters.stars).toEqual([]);
        expect(filters.cost).toEqual([1, 99]);
        expect(filters.rumbleCost).toEqual([1, 99]);
        expect(filters.farmable).toEqual({});
        expect(filters.nonFarmable).toEqual({});
        expect(filters.drop).toBeNull();
        expect(filters.noBase).toBe(false);
        expect(filters.toggle).toBe(false);
        expect(filters.custom.swap['Slot Change'].expanded).toBe(false);
    });
});
