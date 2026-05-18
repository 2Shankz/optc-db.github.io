(function () {
  /***************
   * Controllers *
   ***************/

  var app = angular.module("optc");

  app.controller(
    "MainCtrl",
    function (
      $scope,
      $rootScope,
      $state,
      $stateParams,
      $timeout,
      $storage,
      $controller
    ) {

      $scope.query = $state.params.query || '';

      var updateUrlTimeout = null;

      function updateUrl(query) {
        if (updateUrlTimeout) $timeout.cancel(updateUrlTimeout);
        updateUrlTimeout = $timeout(function() {
          $state.go('.', { query: query || '' }, { notify: false, reload: false });
        }, 300);
      }

      $scope.$watch("query", function (query) {
        if (query === null || query === undefined) return;
        updateUrl(query);
        var params = CharUtils.generateSearchParameters(
          query,
          jQuery.extend({}, $rootScope.filters)
        );
        if ($rootScope.table) {
          $rootScope.table.parameters = params;
        }
      });

      $scope.$on("$locationChangeSuccess", function() {
        $scope.$evalAsync(function() {
          $scope.query = $state.params.query || '';
        });
      });

      document.addEventListener('keydown', function(e) {
        var tag = e.target.tagName.toLowerCase();
        if (tag === 'input' || tag === 'textarea') return;
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        if (e.key === 'Backspace' && e.target.id !== 'picker') {
          $scope.$apply(function() {
            $scope.query = '';
          });
        } else if (e.key.length === 1) {
          $scope.$apply(function() {
            if (!$scope.query) $scope.query = '';
            $scope.query += e.key;
          });
        }
      });

      $scope.getRandChar = function () {
        var range = parseInt($rootScope.table.data.length) + 1;
        return $rootScope.table.data[Math.floor(Math.random() * range)][0];
      };

      $scope.clearQuery = function () {
        $scope.query = "";
      };

      $scope.saveFuzzy = function () {
        $storage.set("fuzzy", $rootScope.table.fuzzy);
        $rootScope.table.refresh();
      };

      $scope.theme = $storage.get('optc-theme', 'dark');
      $scope.modalTheme = $storage.get('optc-modal-theme', 'light');

      $rootScope.modalTheme = $scope.modalTheme;
      $rootScope.toggleModalTheme = $scope.toggleModalTheme;
      $rootScope.getModalThemeIcon = $scope.getModalThemeIcon;

      var applyTheme = function(theme, target) {
        target.classList.remove('light-mode', 'dark-mode', 'frappe', 'macchiato');
        if (theme === 'frappe') {
          target.classList.add('light-mode', 'frappe');
        } else if (theme === 'macchiato') {
          target.classList.add('dark-mode', 'macchiato');
        } else if (theme === 'light') {
          target.classList.add('light-mode');
        } else {
          target.classList.add('dark-mode');
        }
      };

      applyTheme($scope.theme, document.documentElement);

      document.documentElement.classList.remove('modal-dark', 'modal-light', 'modal-frappe', 'modal-macchiato');
      document.documentElement.classList.add('modal-' + $scope.modalTheme);

      var themeCycle = ['light', 'frappe', 'macchiato', 'dark'];
      var themeIcons = {
        'dark': 'dark_mode',
        'light': 'light_mode',
        'frappe': 'brightness_medium',
        'macchiato': 'nightlight_round'
      };

      $scope.toggleTheme = function() {
        var currentIndex = themeCycle.indexOf($scope.theme);
        var nextIndex = (currentIndex + 1) % themeCycle.length;
        $scope.theme = themeCycle[nextIndex];
        $storage.set('optc-theme', $scope.theme);
        applyTheme($scope.theme, document.documentElement);
      };

      $scope.toggleModalTheme = function() {
        var modalCycle = ['light', 'frappe', 'macchiato', 'dark'];
        var currentIndex = modalCycle.indexOf($scope.modalTheme);
        var nextIndex = (currentIndex + 1) % modalCycle.length;
        $scope.modalTheme = modalCycle[nextIndex];
        $rootScope.modalTheme = $scope.modalTheme;
        $storage.set('optc-modal-theme', $scope.modalTheme);
        document.documentElement.classList.remove('modal-dark', 'modal-light', 'modal-frappe', 'modal-macchiato');
        document.documentElement.classList.add('modal-' + $scope.modalTheme);
      };

      $scope.getThemeIcon = function() {
        return themeIcons[$scope.theme] || 'dark_mode';
      };

      $scope.getModalThemeIcon = function() {
        return themeIcons[$scope.modalTheme] || 'light_mode';
      };

      function computeActiveFilters(filters) {
        var active = [];
        filters.types.forEach(function (t) {
          active.push({ id: 'type-' + t, category: 'types', value: t, label: 'Type: ' + t });
        });
        filters.classes.forEach(function (c) {
          active.push({ id: 'class-' + c, category: 'classes', value: c, label: 'Class: ' + c });
        });
        filters.tags.forEach(function (t) {
          active.push({ id: 'tag-' + t.name, category: 'tags', value: t, label: 'Tag: ' + t.name });
        });
        filters.stars.forEach(function (s) {
          active.push({ id: 'star-' + s, category: 'stars', value: s, label: s + '\u2605' });
        });
        if (filters.cost[0] !== 1 || filters.cost[1] !== 99) {
          active.push({ id: 'cost', category: 'cost', value: filters.cost, label: 'Cost: ' + filters.cost[0] + '-' + filters.cost[1] });
        }
        if (filters.rumbleCost[0] !== 1 || filters.rumbleCost[1] !== 99) {
          active.push({ id: 'rumbleCost', category: 'rumbleCost', value: filters.rumbleCost, label: 'Rumble Cost: ' + filters.rumbleCost[0] + '-' + filters.rumbleCost[1] });
        }
        Object.keys(window.exclusiveFilterLabels).forEach(function (key) {
          if (filters[key]) {
            var label = window.exclusiveFilterLabels[key];
            if (label.indexOf(': ') > 0) {
              if (key === 'shop') {
                var shopName = Object.keys(window.shops || {}).find(function (k) { return window.shops[k] === filters[key]; });
                label += (shopName || 'Unknown');
              } else {
                label += filters[key];
              }
            }
            active.push({ id: 'excl-' + key, category: key, value: filters[key], label: label });
          }
        });
        Object.keys(filters.farmable || {}).forEach(function (key) {
          var val = filters.farmable[key];
          if (val !== null && val !== undefined) {
            var opt = (window.farmableOptions || []).find(function (o) { return o.key === key; });
            if (opt) {
              active.push({ id: 'farmable-' + key, category: 'farmable', value: key, label: val ? opt.label : opt.hideLabel });
            }
          }
        });
        Object.keys(filters.nonFarmable || {}).forEach(function (key) {
          var val = filters.nonFarmable[key];
          if (val !== null && val !== undefined) {
            var opt = (window.nonFarmableOptions || []).find(function (o) { return o.key === key; });
            if (opt) {
              active.push({ id: 'nonfarmable-' + key, category: 'nonFarmable', value: key, label: val ? opt.label : opt.hideLabel });
            }
          }
        });
        Object.keys(filters.custom || {}).forEach(function (target) {
          Object.keys(filters.custom[target] || {}).forEach(function (group) {
            Object.keys(filters.custom[target][group].matchers || {}).forEach(function (name) {
              var matcher = filters.custom[target][group].matchers[name];
              if (matcher.enabled) {
                var displayName = name;
                if (window.matchers && window.matchers[target] && window.matchers[target][group] && window.matchers[target][group][name]) {
                  displayName = window.matchers[target][group][name].name || name;
                }
                active.push({ id: 'custom-' + target + '-' + name, category: 'custom', target: target, group: group, name: name, label: target + ': ' + displayName });
              }
            });
          });
        });
        return active;
      }

      $scope.$watch(
        function () { return $rootScope.filters; },
        function (filters) {
          if (!filters || Object.keys(filters).length === 0) {
            $scope.activeFilters = [];
            return;
          }
          $scope.activeFilters = computeActiveFilters(filters);
        },
        true
      );

      $scope.removeFilter = function (filter) {
        switch (filter.category) {
          case 'types':
          case 'classes':
          case 'tags':
          case 'stars':
            var arr = $rootScope.filters[filter.category];
            var idx = arr.indexOf(filter.value);
            if (idx > -1) arr.splice(idx, 1);
            break;
          case 'cost':
            $rootScope.filters.cost = [1, 99];
            break;
          case 'rumbleCost':
            $rootScope.filters.rumbleCost = [1, 99];
            break;
          case 'farmable':
            delete $rootScope.filters.farmable[filter.value];
            break;
          case 'nonFarmable':
            delete $rootScope.filters.nonFarmable[filter.value];
            break;
          case 'custom':
            $rootScope.filters.custom[filter.target][filter.group].matchers[filter.name].enabled = false;
            break;
          default:
            if (filter.category === 'shop' || (typeof filter.value === 'string' && window.exclusiveFilterLabels[filter.category] && window.exclusiveFilterLabels[filter.category].indexOf(': ') > 0)) {
              $rootScope.filters[filter.category] = null;
            } else {
              $rootScope.filters[filter.category] = false;
            }
        }
      };

      $scope.clearAllFilters = function () {
        $rootScope.filters.types = [];
        $rootScope.filters.classes = [];
        $rootScope.filters.tags = [];
        $rootScope.filters.stars = [];
        $rootScope.filters.cost = [1, 99];
        $rootScope.filters.rumbleCost = [1, 99];
        $rootScope.filters.farmable = {};
        $rootScope.filters.nonFarmable = {};
        Object.keys($rootScope.filters.custom || {}).forEach(function (target) {
          Object.keys($rootScope.filters.custom[target] || {}).forEach(function (group) {
            Object.keys($rootScope.filters.custom[target][group].matchers || {}).forEach(function (name) {
              $rootScope.filters.custom[target][group].matchers[name].enabled = false;
            });
          });
        });
        Object.keys(window.exclusiveFilterLabels).forEach(function (key) {
          if (window.exclusiveFilterLabels[key].indexOf(': ') > 0) {
            $rootScope.filters[key] = null;
          } else {
            $rootScope.filters[key] = false;
          }
        });
      };
    }
  );

  app.controller(
    "SidebarCtrl",
    function ($scope, $rootScope, $state, $stateParams, $timeout) {
      $scope.availableClasses = window.availableClasses;
      $scope.availableTags = window.availableTags;
      $scope.farmableOptions = window.farmableOptions;
      $scope.nonFarmableOptions = window.nonFarmableOptions;
      $scope.shops = window.shops;

      $timeout(function () {
        $scope.$watch(
          "filters",
          function (filters) {
            if (
              !$rootScope.filters ||
              Object.keys($rootScope.filters).length === 0
            )
              return;
            var data = jQuery.extend({}, $rootScope.filters);
            var params = CharUtils.generateSearchParameters(
              $state.params.query || '',
              data
            );
            if ($rootScope.table) {
              $rootScope.table.parameters = params;
            }
            if (!$scope.$$phase) $scope.$apply();
          },
          true
        );
      });

      $scope.clearFilters = function () {
        if (!$rootScope.filters || Object.keys($rootScope.filters).length === 0) {
          $rootScope.filters = { custom: {} };
          for (const target in window.matchers) {
            $rootScope.filters.custom[target] = {};
            for (const group in window.matchers[target]) {
              $rootScope.filters.custom[target][group] = { expanded: false, matchers: {} };
              for (const name in window.matchers[target][group]) {
                $rootScope.filters.custom[target][group].matchers[name] = { enabled: false };
                if (window.matchers[target][group][name].submatchers) {
                  $rootScope.filters.custom[target][group].matchers[name].submatchers = [];
                  for (const j in window.matchers[target][group][name].submatchers) {
                    $rootScope.filters.custom[target][group].matchers[name].submatchers[j] = {};
                  }
                }
              }
            }
          }
        }

        $rootScope.filters.types = [];
        $rootScope.filters.classes = [];
        $rootScope.filters.tags = [];
        $rootScope.filters.stars = [];
        $rootScope.filters.cost = [1, 99];
        $rootScope.filters.rumbleCost = [1, 99];
        $rootScope.filters.farmable = {};
        $rootScope.filters.nonFarmable = {};

        for (const target in $rootScope.filters.custom) {
          for (const group in $rootScope.filters.custom[target]) {
            for (const name in $rootScope.filters.custom[target][group].matchers) {
              $rootScope.filters.custom[target][group].matchers[name].enabled = false;
            }
          }
        }

        var labels = window.exclusiveFilterLabels || {};
        Object.keys(labels).forEach(function (key) {
          $rootScope.filters[key] = labels[key] && labels[key].indexOf(': ') > 0 ? null : false;
        });
      };

      $scope.clearFilters();

      $scope.toggleFilters = function () {
        for (x in $rootScope.filters) {
          if (x.includes("Enabled")) {
            // type, character, class, and tag filters are expanded by default
            if (
              x == "typeEnabled" ||
              x == "characterEnabled" ||
              x == "classEnabled" || 
              x == "tagEnabled"
            ) {
              $rootScope.filters[x] = !$rootScope.filters["toggle"];
            } else {
              $rootScope.filters[x] = $rootScope.filters["toggle"];
            }
          }
        }
        $("#leftContainer animate-collapse + div.collapse").collapse(
          $rootScope.filters["toggle"] ? "show" : "hide"
        );
        $rootScope.filters["toggle"] = !$rootScope.filters["toggle"];
      };

      $scope.onFilterClick = function (e, value) {
        var type = null;
        if (e.target.hasAttribute("ng-model"))
          type = e.target.getAttribute("ng-model");
        else {
          var target = $(e.target);
          var child = target.find(".filter[ng-model]").first();
          if (child.length > 0) type = child.attr("ng-model");
          else {
            var parent = target.closest(".filter[ng-model]").first();
            if (parent.length > 0) type = parent.attr("ng-model");
          }
        }
        if (type === null) return;
        type = type.split(/\./)[1];
        $rootScope.filters[type] =
          $rootScope.filters[type] == value ? null : value;
      };

      $scope.onTypeClick = function (e, value) {
        if ($rootScope.filters.types.indexOf(value) == -1) {
          $rootScope.filters.types.push(value);
        } else
          $rootScope.filters.types.splice(
            $rootScope.filters.types.indexOf(value),
            1
          );
      };

      $scope.onClassClick = function (e, clazz) {
        if ($rootScope.filters.classes.indexOf(clazz) == -1) {
          $rootScope.filters.classes.push(clazz);
        } else
          $rootScope.filters.classes.splice(
            $rootScope.filters.classes.indexOf(clazz),
            1
          );
      };

      $scope.onTagsClick = function (e, tags) {
        if ($rootScope.filters.tags.indexOf(tags) == -1) {
          $rootScope.filters.tags.push(tags);
        } else
          $rootScope.filters.tags.splice(
            $rootScope.filters.tags.indexOf(tags),
            1
          );
      };

      $scope.onStarsClick = function (e, stars) {
        if ($rootScope.filters.stars.indexOf(stars) == -1)
          $rootScope.filters.stars.push(stars);
        else
          $rootScope.filters.stars.splice(
            $rootScope.filters.stars.indexOf(stars),
            1
          );
      };

      $scope.onDropFilterClick = function (e, type, key, value) {
        if (!$rootScope.filters.hasOwnProperty(type))
          $rootScope.filters[type] = {};
        $rootScope.filters[type][key] =
          $rootScope.filters[type][key] == value ? null : value;
      };

      $scope.filterData = window.matchers;

      $scope.repeat = function (n) {
        return n < 1 ? [] : new Array(n);
      };
    }
  );

  app.controller(
    "DetailsCtrl",
    function (
      $scope,
      $rootScope,
      $state,
      $stateParams,
      $timeout,
      $storage,
      $http
    ) {
      // Fallback: If modal theme functions don't exist on rootScope (MainCtrl wasn't run), initialize them
      if (!$rootScope.toggleModalTheme) {
var themeCycle = ['light', 'frappe', 'macchiato', 'dark'];
        var themeIcons = {
          'dark': 'dark_mode',
          'light': 'light_mode',
          'frappe': 'brightness_medium',
          'macchiato': 'nightlight_round'
        };
        $rootScope.modalTheme = $storage.get('optc-modal-theme', 'light');
        document.documentElement.classList.add('modal-' + $rootScope.modalTheme);

        $rootScope.toggleModalTheme = function() {
          var modalCycle = ['light', 'frappe', 'macchiato', 'dark'];
          var currentIndex = modalCycle.indexOf($rootScope.modalTheme);
          var nextIndex = (currentIndex + 1) % modalCycle.length;
          $rootScope.modalTheme = modalCycle[nextIndex];
          $storage.set('optc-modal-theme', $rootScope.modalTheme);
          document.documentElement.classList.remove('modal-dark', 'modal-light', 'modal-frappe', 'modal-macchiato');
          document.documentElement.classList.add('modal-' + $rootScope.modalTheme);
        };

        $rootScope.getModalThemeIcon = function() {
          return themeIcons[$rootScope.modalTheme] || 'light_mode';
        };
      }

      // Expose to scope for template
      $scope.modalTheme = $rootScope.modalTheme;
      $scope.toggleModalTheme = $rootScope.toggleModalTheme;
      $scope.getModalThemeIcon = $rootScope.getModalThemeIcon;
      $scope.characterLog = $rootScope.characterLog;
      $scope.checkLog = $rootScope.checkLog;

      var rumbleRequest = {
        method: "get",
        url: "../common/data/rumble.json",
        dataType: "json",
        contentType: "application/json",
      };

      $scope.rumble = undefined;

      // data - use string ID for ById lookups
      var id = $stateParams.id;
      $scope.id = id;
      $scope.unit = window.units[id];
      $scope.hybrid = $scope.unit.class && Array.isArray($scope.unit.class);
      $scope.dualunit = $scope.unit.type === null && $scope.unit.id && !$scope.unit.id.includes('-');
      $scope.char1 = null;
      $scope.char2 = null;

      if ($scope.dualunit && $scope.unit.id) {
        var baseId = $scope.unit.id;
        $scope.char1 = window.units[baseId + '-1'];
        $scope.char2 = window.units[baseId + '-2'];
      }

      $scope.getTagsForUnit = function (unit) {
        if (unit.id.includes('-')) {
          const baseId = unit.id.slice(0, -2);
          const index = parseInt(unit.id.slice(-1)) - 1;
          const tags = window.tags?.[baseId];
          return tags[index] || [];
        }
        const tags = window.tags?.[unit.id];
        return tags || [];
      };

      $scope.getCategoryClass = function (tag) {
        const match = window.availableTags.find((t) => t.name === tag);
        return match ? `tag-category-${match.category}` : "";
      };

      $scope.details = window.details[id];
      $scope.cooldown = window.cooldowns[String(id)] || null;
      $scope.evolution = window.evolutions[id];
      $scope.families = window.families[id];
      $scope.farmableVersions = CharUtils.getFarmableVersions(Utils.searchEvolutionTree(id));
      $scope.displayFamily = $scope.families ? $scope.families.join(" & ") : "";

      if (window.rumble[id]) {
        $scope.rumble = window.rumble[id].character1 ? window.rumble[id].character1 : window.rumble[id];
        $scope.rumble2 = window.rumble[id].character2;
      }

      $scope.showAllRumbleLevels = false;

      $scope.hasRumbleLLB = function(data) {
        return data && (data.festResistance?.llbbase || data.festAbility?.llbbase || data.festSpecial?.llbbase);
      };

      $scope.hasGrandPartyLLB = function(data) {
        return data && (data.festGPAbility?.llbbase || data.festGPSpecial?.llbbase);
      };

      $scope.isArray = Array.isArray;

      // derived data
      var evolvesFrom = Utils.searchBaseForms(id);
      $scope.evolvesFrom = [];
      for (var from in evolvesFrom) {
        for (var i = 0; i < evolvesFrom[from].length; ++i)
          $scope.evolvesFrom.push({
            from: parseInt(from, 10),
            to: $scope.id,
            via: evolvesFrom[from][i],
          });
      }
      $scope.usedBy = CharUtils.searchEvolverEvolutions(id);
      $scope.drops = CharUtils.searchDropLocations(id);
      $scope.manuals = CharUtils.searchDropLocations(-id);
      $scope.collapsed = {
        to: true,
        from: true,
        used: true,
        drops: true,
        manuals: true,
        families: true,
      };

      // hidden elements
      var hasStats = [
        "minHP",
        "minATK",
        "minRCV",
        "maxHP",
        "maxATK",
        "maxRCV",
      ].some(function (x) {
        return $scope.unit[x];
      });
      $scope.hidden = {
        stats: !hasStats,
        abilities: !window.details.hasOwnProperty($scope.id),
      };

      // events/functions
      $scope.getEvos = CharUtils.getEvolversOfEvolution;
      $scope.sizeOf = function (target) {
        return Object.keys(target).length;
      };
      $scope.withButton = $stateParams.previous.length > 0;
      $scope.onBackClick = function () {
        var previous = $stateParams.previous.splice(-1)[0];
        $state.go("main.search.view", {
          id: previous,
          previous: $stateParams.previous,
          query: $stateParams.query || ''
        });
      };
      $scope.openBigThumbTab = function (id) {
        console.log(Utils.getBigThumbnailUrl(id, ".."));
        window.open(Utils.getBigThumbnailUrl(id, ".."), "_blank");
      };
      $scope.getPrevious = function () {
        return $stateParams.previous.concat($scope.id);
      };
      $scope.isCaptainHybrid =
        $scope.details &&
        $scope.details.captain &&
        ($scope.details.captain.global ||
          $scope.details.captain.base ||
          $scope.details.captain.combined ||
          $scope.details.captain.character1);
$scope.isSailorHybrid =
        $scope.details &&
        $scope.details.sailor &&
        ($scope.details.sailor.global ||
          $scope.details.sailor.level1 ||
          $scope.details.sailor.combined ||
          $scope.details.sailor.character1);
      $scope.isString = function(value) {
        return typeof value === 'string';
      };
      $scope.isSpecialHybrid =
        $scope.details &&
        $scope.details.special &&
        ($scope.details.special.global ||
          $scope.details.special.base ||
          $scope.details.special.character1);
      $scope.isCooldownHybrid =
        $scope.cooldown && Array.isArray($scope.cooldown[0]);
      $scope.isSpecialStaged =
        $scope.details &&
        $scope.details.special &&
        (($scope.details.special.base &&
          Array.isArray($scope.details.special.base)) ||
          Array.isArray($scope.details.special));
      $scope.isLLBSpecialStaged = [false, false, false, false, false];
      if ($scope.details && $scope.details.lLimit) {
        for ([key, value] of Object.entries($scope.details.lLimit)) {
          $scope.isLLBSpecialStaged[key] =
            $scope.details.lLimit[key] &&
            $scope.details.lLimit[key].special &&
            $scope.details.lLimit[key].special.base &&
            Array.isArray($scope.details.lLimit[key].special.base)
              ? true
              : false;
        }
      }
      $scope.isLimitStaged =
        $scope.details &&
        $scope.details.limit &&
        Array.isArray($scope.details.limit);
      $scope.isPotentialStaged =
        $scope.details &&
        $scope.details.potential &&
        Array.isArray($scope.details.potential);
      $scope.isSupportStaged =
        $scope.details &&
        $scope.details.support &&
        Array.isArray($scope.details.support);
      $scope.isLastTapStaged =
        $scope.details &&
        $scope.details.lastTap &&
        Array.isArray($scope.details.lastTap);
      $scope.isSwapHybrid =
        $scope.details && $scope.details.swap && $scope.details.swap.base;
      $scope.isVSConditionHybrid =
        $scope.details &&
        $scope.details.VSCondition &&
        $scope.details.VSCondition.character1;
      $scope.isVSSpecialHybrid =
        $scope.details &&
        $scope.details.VSSpecial &&
        $scope.details.VSSpecial.character1;

      $scope.statPreference = 0;
      $scope.$watch("statPreference", function (value) {
        $scope.statPreference = value;
        return;
      });

    }
  );

  app.controller(
    "ColumnsCtrl",
    function ($scope, $rootScope, $state, $stateParams, $storage) {
      $scope.columns = {
        "Limit Break HP": false,
        "Limit Break ATK": false,
        "Limit Break RCV": false,
        "Limit Break: Expansion HP": false,
        "Limit Break: Expansion ATK": false,
        "Limit Break: Expansion RCV": false,
        "HP/ATK": false,
        "HP/RCV": false,
        "ATK/RCV": false,
        "ATK/CMB": false,
        CMB: false,
        "ATK/cost": false,
        "HP/cost": false,
        "Minimum cooldown": false,
        "Initial cooldown": false,
        "Minimum Limit Break cooldown": false,
        "Initial Limit Break cooldown": false,
        "Minimum Limit Break Expansion cooldown": false,
        "Initial Limit Break Expansion cooldown": false,
        "MAX EXP": false,
        "Limit Break Sockets": false,
      };

      var additionalColumns = $storage.get("charColumns", []);

      additionalColumns.forEach(function (x) {
        if ($scope.columns.hasOwnProperty(x)) $scope.columns[x] = true;
      });

      $scope.save = function () {
        var result = Object.keys($scope.columns).filter(function (x) {
          return $scope.columns[x];
        });
        $storage.set("charColumns", result);
        window.location.reload();
      };
    }
  );
})();