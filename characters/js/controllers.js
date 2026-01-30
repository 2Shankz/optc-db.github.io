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

      if (!$rootScope.hasOwnProperty("nightMode")) {
        $rootScope.nightMode = $storage.get("chars.night", false);
        $rootScope.$watch("nightMode", function (night) {
          $storage.set("chars.night", night);
        });
      }

      $scope.query = $state.params.query;

      $scope.$watch("query", function (query) {
        if (
          query === null ||
          query === undefined ||
          $scope.query == $stateParams.query
        )
          return;
        $state.go(".", { query: $scope.query });
        $scope.table.parameters = CharUtils.generateSearchParameters(
          $scope.query,
          jQuery.extend({}, $rootScope.filters)
        );
      });

      $scope.$on("$stateChangeSuccess", function (e) {
        if ($state.current.name == "main.search") {
          $scope.query = $state.params.query;
        }
      });

      $scope.getRandChar = function () {
        var range = parseInt($rootScope.table.data.length) + 1;
        return $rootScope.table.data[Math.floor(Math.random() * range)][0];
      };

      $scope.clearQuery = function () {
        $scope.query = "";
      };
    }
  );

  app.controller(
    "SidebarCtrl",
    function ($scope, $rootScope, $stateParams, $timeout) {
      $scope.availableClasses = window.availableClasses;
      $scope.availableTags = window.availableTags;
      $scope.farmableOptions = window.farmableOptions;
      $scope.nonFarmableOptions = window.nonFarmableOptions;

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
            $scope.table.parameters = CharUtils.generateSearchParameters(
              $stateParams.query,
              data
            );
            if (!$scope.$$phase) $scope.$apply();
          },
          true
        );
      });

      $scope.clearFilters = function () {
        $rootScope.filters = {
          custom: {},
          classes: [],
          tags: [],
          types: [],
          stars: [],
          cost: [1, 99],
          rumbleCost: [1, 99],
          toggle: true,
          typeEnabled: false,
          characterEnabled: false,
          classEnabled: false,
          tagEnabled: false,
          rumbleStyleEnabled: false,
          dropEnabled: false,
          temporaryEnabled: false,
          specCaptEnabled: false,
          tmkcEnabled: false,
          exclusionEnabled: false,
          costEnabled: false,
          rarityEnabled: false,
          farmEnabled: false,
          nonfarmEnabled: false,
          farmable: {},
          nonFarmable: {},
        };

        // no idea why both local `filters` and `$rootScope.filters` exist
        for (const target in window.matchers) {
          $rootScope.filters.custom[target] = {};
          for (const group in window.matchers[target]) {
            // `expanded` - when a filter group is "opened"
            $rootScope.filters.custom[target][group] = {
              expanded: false,
              matchers: {},
            };

            for (const name in window.matchers[target][group]) {
              $rootScope.filters.custom[target][group].matchers[name] = {
                enabled: false,
              };

              if (window.matchers[target][group][name].submatchers) {
                $rootScope.filters.custom[target][group].matchers[
                  name
                ].submatchers = [];

                for (const j in window.matchers[target][group][name]
                  .submatchers) {
                  $rootScope.filters.custom[target][group].matchers[
                    name
                  ].submatchers[j] = {};
                }
              }
            }
          }
        }
        $("#leftContainer .collapse").collapse("hide");
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
      $scope.farmableVersions = CharUtils.getFarmableVersions(id);
      $scope.displayFamily = $scope.families ? $scope.families.join(" & ") : "";

      if (window.rumble[id]) {
        $scope.rumble = window.rumble[id].character1 ? window.rumble[id].character1 : window.rumble[id];
        $scope.rumble2 = window.rumble[id].character2;
      }

      $scope.showAllRumbleLevels = false;

      $scope.hasRumbleLLB = function(data) {
        return data && (data.festResistance?.llbbase || data.festAbility?.llbbase || data.festSpecial?.llbbase);
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