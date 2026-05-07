(function () {
	var directives = {};
	var filters = {};

	var app = angular.module("optc");

	/**************
	 * Directives *
	 **************/

	directives.characterTable = function (
		$rootScope,
		$timeout,
		$state
	) {
		return {
			restrict: "E",
			replace: true,
			template: '<div id="tabulator-table"></div>',
			link: function (scope, element, attrs) {
				var convertColumns = function(dtColumns) {
					return dtColumns.map(function(col, index) {
						var tabCol = {
							title: col.title,
							field: "col" + index,
							headerSort: col.orderable !== false,
							vertAlign: "middle",
						};
						
						if (index === 0) {
							tabCol.width = 60;
						} else if (index === 1) {
							tabCol.widthGrow = 1;
							tabCol.formatter = "textarea";
						} else if (index === 2 || index === 3 || index === 8 || index === 10) {
							tabCol.width = 80;
						} else if (index >= 4 && index <= 7) {
							tabCol.width = 60;
						} else if (index === 9) {
							tabCol.width = 100;
						}
						
						if (col.render && typeof col.render === 'function') {
							tabCol.formatter = function(cell, formatterParams, onRendered) {
								var rowData = cell.getRow().getData();
								var value = rowData["col" + index];
								var mockCell = { getValue: function() { return value; }, getRow: function() { return { getData: function() { return rowData; } }; } };
								return col.render(value, 'display', mockCell);
							};
						}
						
						if (index === 1) {
							tabCol.formatter = function(cell, formatterParams, onRendered) {
								try {
									var data = cell.getRow().getData();
									var id = parseInt(data.col0, 10);
									var name = data.col1 || "";
									var paths = (window.Utils && window.Utils.getThumbnailUrl) ? window.Utils.getThumbnailUrl(id, "..") : { glo: "../api/images/common/noimage.png", jap: "../api/images/common/noimage.png" };
									var noimage = "../api/images/common/noimage.png";
									return '<img class="slot small" src="' + paths.glo + 
								       '" onerror="this.onerror=null; this.src=\'' + paths.jap + 
								       '\'; this.onerror=function(){this.src=\'' + noimage + '\'};" style="width:40px;height:40px;vertical-align:middle;margin-right:8px;border-radius:4px;">' +
								       name;
								} catch (e) {
									var data = cell.getRow().getData();
									return '<span>' + (data.col1 || "") + '</span>';
								}
							};
							tabCol.cellClick = function(e, cell) {
								var id = parseInt(cell.getData().col0, 10);
								$state.go("main.search.view", { id: id, previous: [] });
							};
						}
						
						if (index === 9) {
							tabCol.sorter = function(a, b, aRow, bRow, column, dir, sorterParams) {
								var parseStars = function(v) {
									if (v === "4+") return 4.5;
									if (v === "5+") return 5.5;
									if (v === "6+") return 6.5;
									return typeof v === "string" ? parseInt(v, 10) || 0 : (v || 0);
								};
								return parseStars(a) - parseStars(b);
							};
							tabCol.formatter = function(cell, formatterParams, onRendered) {
								var stars = cell.getValue();
								if (stars === "4+") return '<span class="stars-4+"></span>';
								if (stars === "5+") return '<span class="stars-5+"></span>';
								if (stars === "6+") return '<span class="stars-6+"></span>';
								var starCount = typeof stars === 'string' ? parseInt(stars, 10) : stars;
                                var html = '';
                                for (var i = 0; i < 6; i++) {
                                    html += i < starCount ? '<i class="material-icons" style="color:#f7c118">star</i>' : '<i class="material-icons" style="color:#ccc">star_border</i>';
                                }
								return html;
							};
						}
						
						if (index === 2) {
							tabCol.formatter = function(cell, formatterParams, onRendered) {
								var type = cell.getValue();
								if (type && type.indexOf('/') > -1) {
									var types = type.split('/');
									return '<span class="cell-' + types[0] + '">' + types[0] + '</span>/<span class="cell-' + types[1] + '">' + types[1] + '</span>';
								}
								if (type && type.indexOf(',') > -1) {
									var types = type.split(',');
									return '<span class="cell-' + types[0].trim() + '">' + types[0].trim() + '</span>, <span class="cell-' + types[1].trim() + '">' + types[1].trim() + '</span>';
								}
								return type ? '<span class="cell-' + type + '">' + type + '</span>' : '';
							};
						}
						
						if (index === 3) {
							tabCol.formatter = function(cell, formatterParams, onRendered) {
								var cls = cell.getValue();
								if (cls && cls.indexOf(',') > -1) {
									var classes = cls.split(',');
									var lastTwo = classes.slice(-2);
									return '<span class="cell-' + lastTwo[0].trim() + '">' + lastTwo[0].trim() + '</span><br><span class="cell-' + lastTwo[1].trim() + '">' + lastTwo[1].trim() + '</span>';
								}
								return cls || '';
							};
						}
						
						return tabCol;
					});
				};
				
				var transformData = function(data) {
					if (!data || data.length === 0) return [];
					return data.map(function(row) {
						var newRow = {};
						row.forEach(function(val, idx) {
							newRow["col" + idx] = val;
						});
						return newRow;
					});
				};
				
				window.charTable = new Tabulator("#tabulator-table", {
					data: transformData(scope.table.data),
					layout: "fitColumns",
					maxHeight: "100%",
					persistentLayout: false,
					persistentSort: true,
					movableColumns: true,
					columns: convertColumns(scope.table.columns),
					rowFormatter: function(row) {
						var cells = row.getCells();
						var lastCell = cells[cells.length - 1];
						if (lastCell && lastCell.getElement().querySelector('label')) {
							return; // Already formatted - skip to prevent re-render on scroll
						}
						
						var data = row.getData();
						var id = data.col0;
						var checkbox = document.createElement('label');
						var input = document.createElement('input');
						input.setAttribute('type', 'checkbox');
						input.setAttribute('ng-change', 'checkLog(' + id + ')');
						input.setAttribute('ng-model', 'characterLog[' + id + ']');
						checkbox.appendChild(input);
						
						if (cells.length > 0) {
							cells[cells.length - 1].getElement().appendChild(checkbox);
						}
						
						// Handle lazy-loaded images
						for (var i = 0; i < cells.length; i++) {
							var cellEl = cells[i].getElement();
							var imgs = cellEl.querySelectorAll('img[data-original]');
							for (var j = 0; j < imgs.length; j++) {
								var img = imgs[j];
								img.src = img.getAttribute('data-original');
								img.removeAttribute('data-original');
							}
						}
					},
					headerClick: function(e, column) {
						if (column.getTitle() === "CL") {
							column.getElement().setAttribute('title', 'Character Log');
						}
					},
				});
				
				scope.table.refresh = function() {
					$rootScope.$emit("table.refresh");
					$timeout(function() {
						window.charTable.setData(transformData(scope.table.data));
					});
				};

				scope.$watch('table.data', function(newData, oldData) {
					if (newData !== oldData && window.charTable) {
						window.charTable.setData(transformData(newData));
					}
				}, true);

				var lastQuery = '';
				scope.$watch('table.parameters', function(newParams, oldParams) {
					if (!newParams || !window.charTable) return;
					var query = newParams.query || '';
					var filters = newParams.filters;
					var hasSidebarFilters = filters && (
						(filters.types && filters.types.length) ||
						(filters.classes && filters.classes.length) ||
						(filters.cost && (filters.cost[0] > 0 || filters.cost[1] < 999)) ||
						(filters.stars && filters.stars.length) ||
						(filters.tags && filters.tags.length) ||
						filters.noSingleClass || filters.noBase || filters.noEvos || filters.noLB ||
						filters.drop || filters.farmable || filters.nonFarmable || filters.shop
					);
					if (query && !hasSidebarFilters) {
						var q = query.toLowerCase();
						window.charTable.setFilter(function(row) {
							var name = (row.col1 || '').toLowerCase();
							var id = row.col0 || '';
							var type = (row.col2 || '').toLowerCase();
							var cls = (row.col3 || '').toLowerCase();
							return name.indexOf(q) !== -1 || id.indexOf(q) !== -1 || 
							       type.indexOf(q) !== -1 || cls.indexOf(q) !== -1;
						});
						lastQuery = query;
					} else if (!query && lastQuery) {
						window.charTable.clearFilter();
						lastQuery = '';
					}
				}, true);

				scope.$on('$stateChangeSuccess', function() {
					$timeout(function() {
						if (window.charTable) {
							window.charTable.redraw(true);
						}
					}, 300);
				});
			},
		};
	};

		directives.decorateSlot = function () {
		return {
			restrict: "A",
			scope: { uid: "=", big: "@" },
			link: function (scope, element, attrs) {
				var noimagePath = "../api/images/common/noimage.png";
				if (scope.big) {
					var bigUrl = Utils.getBigThumbnailUrl(scope.uid, "..");
					var img = new Image();
					img.onload = function() { element[0].style.backgroundImage = "url(" + bigUrl + ")"; };
					img.onerror = function() { element[0].style.backgroundImage = "url(" + noimagePath + ")"; };
					img.src = bigUrl;
				} else {
					var paths = Utils.getThumbnailUrl(scope.uid, "..");
					var img = new Image();
					img.onload = function() { element[0].style.backgroundImage = "url(" + paths.glo + ")"; };
					img.onerror = function() {
						if (paths.jap && paths.jap !== paths.glo) {
							var img2 = new Image();
							img2.onload = function() { element[0].style.backgroundImage = "url(" + paths.jap + ")"; };
							img2.onerror = function() { element[0].style.backgroundImage = "url(" + noimagePath + ")"; };
							img2.src = paths.jap;
						} else {
							element[0].style.backgroundImage = "url(" + noimagePath + ")";
						}
					};
					img.src = paths.glo;
				}
			},
		};
	};

	directives.autoFocus = function ($timeout) {
		return {
			restrict: "A",
			link: function (scope, element, attrs) {
				$timeout(function () {
					element[0].focus();
				});
			},
		};
	};

// Uses Bootstrap's Collapse Component
directives.animateCollapse = function ($timeout, $document) {
	return {
		restrict: "E",
		transclude: true,
		template: `<span class="animate-collapse-header">
        <ng-transclude></ng-transclude>
        <i class="{{ faClasses }}">chevron_right</i>
    </span>`,
		scope: {},
		link: function (scope, element, attrs) {
			scope.faClasses = attrs.faClasses || "material-icons material-icons-chevron-right";

			// Delegate to document-level events so chevron syncs with any trigger (click, Toggle All, jQuery)
			if (!$document.isAnimateCollapseHandlerAdded) {
				$document.on("hide.bs.collapse", (e) => {
					var collapserElement = e.target.previousElementSibling;
					if (collapserElement && collapserElement.tagName === "ANIMATE-COLLAPSE") {
						var icon = collapserElement.querySelector("i");
						if (icon) icon.classList.remove("material-icons-chevron-rotated");
					}
				});
				$document.on("show.bs.collapse", (e) => {
					var collapserElement = e.target.previousElementSibling;
					if (collapserElement && collapserElement.tagName === "ANIMATE-COLLAPSE") {
						var icon = collapserElement.querySelector("i");
						if (icon) icon.classList.add("material-icons-chevron-rotated");
					}
				});
				$document.isAnimateCollapseHandlerAdded = true;
			}

			element.on("click", () => {
				var collapsibleElement = element.next();
				if (collapsibleElement && collapsibleElement.hasClass("collapse")) {
					collapsibleElement.collapse("toggle");
				}
			});
		},
	};
};

	directives.addCustomFilters = function ($timeout, $compile) {
		return {
			restrict: "E",
			replace: true,
			templateUrl: "views/custom-filters.html",
			scope: { target: "@", filterData: "=", filters: "=" },
			link: function (scope, element, attrs) {
				// turns off all other options in a radio group
				scope.toggleRadioGroup = function (
					matcher,
					submatcherIndex,
					radioGroup = null
				) {
					var submatchers =
						scope.filters.custom[matcher.target][matcher.group].matchers[
							matcher.name
						].submatchers;
					if (radioGroup) {
						for (const [j, submatcher] of submatchers.entries()) {
							if (
								submatcherIndex != j &&
								matcher.submatchers[j].type == "option" &&
								matcher.submatchers[j].radioGroup == radioGroup
							)
								submatcher.param = false;
						}
					}
					submatchers[submatcherIndex].param =
						!submatchers[submatcherIndex].param;
				};
				// called when a matcher is toggled, should debounce during the collapse animation
				// of submatchers div
				scope.toggleMatcher = function ($event, matcher) {
					var targetElement = $event.target.nextElementSibling;
					if (targetElement) {
						if (targetElement.classList.contains("collapsing")) {
							return;
						}
						$(targetElement).collapse("toggle");
					}

					var matcherObj =
						scope.filters.custom[matcher.target][matcher.group].matchers[
							matcher.name
						];
					matcherObj.enabled = !matcherObj.enabled;
					matcherObj.submatchersOpen = !matcherObj.submatchersOpen;
				};
				scope.getCssClasses = function (submatcher) {
					var classes = ["min-width-12"]; //default, may be overridden
					if (submatcher.cssClasses) classes = submatcher.cssClasses;
					return classes;
				};
			},
		};
	};

directives.goBack = function ($state) {
		return {
			restrict: "A",
			link: function (scope, element, attrs) {
				element.click(function (e) {
					if (!e.target || e.target.className.indexOf("inner-container") == -1)
						return;
					element.find(".modal-content").addClass("rollOut");
					$(".quick-nav").addClass("closing");
					$(".backdrop").addClass("closing");
					setTimeout(function () {
						$state.go("^");
					}, 300);
				});
			},
		};
	};

	directives.evolution = function ($state, $stateParams) {
		return {
			restrict: "E",
			replace: true,
			scope: { unit: "=", base: "=", evolvers: "=", evolution: "=", size: "@" },
			templateUrl: "views/evolution.html",
			link: function (scope, element, attrs) {
				scope.goToState = function (id) {
					if (!Number.isInteger(id)) return;
					if (id == parseInt($stateParams.id, 10)) return;
					var previous = $stateParams.previous.concat([$stateParams.id]);
					$state.go("main.search.view", { id: id, previous: previous });
				};
			},
		};
	};

	directives.unit = function ($state, $stateParams) {
		return {
			restrict: "E",
			scope: { uid: "=" },
			template:
				'<a class="slot medium" decorate-slot uid="uid" ng-click="goToState(uid)"></a>',
			link: function (scope, element, attrs) {
				scope.goToState = function (id) {
					if (id == parseInt($stateParams.id, 10)) return;
					var previous = $stateParams.previous.concat([$stateParams.id]);
					$state.go("main.search.view", { id: id, previous: previous });
				};
			},
		};
	};

	directives.addSuperSpecialQuery = function ($state, $stateParams) {
		return {
			restrict: "E",
			scope: { criteria: "=", excludedFamilies: "=" },
			template:
				'<a role="button" ng-if="query" ui-sref="main.search({query:query})"><b>Search for these characters</b></a>',
			link: function (scope, element, attrs) {
				scope.query = Utils.generateSuperSpecialQuery(
					scope.criteria,
					scope.excludedFamilies
				);
			},
		};
	};

	directives.addSupportQuery = function ($state, $stateParams) {
		return {
			restrict: "E",
			scope: { criteria: "=", excludedFamilies: "=" },
			template:
				'<a role="button" ng-if="query" ui-sref="main.search({query:query})"><b>Search for supported characters</b></a>',
			link: function (scope, element, attrs) {
				scope.query = Utils.generateSupportedCharactersQuery(
					scope.criteria,
					scope.excludedFamilies
				);
			},
		};
	};

	directives.addSupportersQuery = function () {
		return {
			restrict: "E",
			scope: { uid: "=" },
			template:
				'<a role="button" ng-if="query" ui-sref="main.search({query:query})"><b>Search for attachable supports</b></a>',
			link: function (scope, element, attrs) {
				scope.query = Utils.generateAttachableSupportsQuery(scope.uid);
			},
		};
	};

	directives.addSuperTandemQuery = function () {
		return {
			restrict: "E",
			scope: { criteria: "=", excludedFamilies: "=" },
			template:
				'<a role="button" ng-if="query" ui-sref="main.search({query:query})"><b>Search for these characters</b></a>',
			link: function (scope, element, attrs) {
				scope.query = Utils.generateSuperTandemQuery(
					scope.criteria,
					scope.excludedFamilies
				);
			},
		};
	};

	directives.scrollToSection = function ($state, $stateParams) {
		return {
			restrict: "A",
			link: function (scope, element, attrs) {
				element.click(function (e) {
					var target = document.getElementById(attrs.scrollToSection);
					if (target.classList.contains('modal-body')) {
						target.scrollTo({ top: 0, behavior: "smooth" });
					} else {
						target.scrollIntoView({ behavior: "smooth" });
					}
				});
			},
		};
	};

	directives.addNames = function ($stateParams, $rootScope) {
		var name = window.aliases;
		return {
			restrict: "E",
			replace: true,
			template:
				'<table class="table table-striped-column abilities"><tbody></tbody></table>',
			link: function (scope, element, attrs) {
				var id = $stateParams.id,
					data = details[id];
				var htmlToAppend = "";
				var currentAliases = name[id];
				if (currentAliases[0] != "") {
					htmlToAppend +=
						"<tr><td>Japanese</td><td><div>" +
						currentAliases[0] +
						"</div></td></tr>";
				}
				if (currentAliases[1] != "") {
					htmlToAppend +=
						"<tr><td>French</td><td><div>" +
						currentAliases[1] +
						"</div></td></tr>";
				}
				if (currentAliases[2]) {
					var otherAliases = currentAliases.slice(2).join(", ");
					htmlToAppend +=
						"<tr><td>Others</td><td><div>" + otherAliases + "</div></td></tr>";
				}
				element.append(htmlToAppend);
			},
		};
	};

	directives.addTags = function ($stateParams, $rootScope) {
		return {
			restrict: "E",
			replace: true,
			template: '<div class="tag-container"></div>',
			link: function (scope, element, attrs) {
				var id = $stateParams.id,
					data = details[id];
				// flags
				var flags = window.flags[id] || {};
				var htmlToAppend = "";
				htmlToAppend +=
					'<span class="tag flag">' +
					(flags.global ? "Global unit" : "Japan unit") +
					"</span>";
				htmlToAppend +=
					'<span class="tag flag">' +
					(CharUtils.isFarmable(id) ? "Farmable" : "Non-farmable") +
					"</span>";
				if (flags.rr)
					htmlToAppend += '<span class="tag flag">Rare Recruit only</span>';
				if (flags.lrr)
					htmlToAppend +=
						'<span class="tag flag">Limited Rare Recruit only</span>';
				if (flags.tmlrr)
					htmlToAppend +=
						'<span class="tag flag">Treasure Map Sugo-fest Limited Rare Recruit only</span>';
				if (flags.kclrr)
					htmlToAppend +=
						'<span class="tag flag">Kizuna Clash Sugo-fest Limited Rare Recruit only</span>';
				if (flags.pflrr)
					htmlToAppend +=
						'<span class="tag flag">Pirate Rumble Sugo-fest Limited Rare Recruit only</span>';
				if (flags.superlrr)
					htmlToAppend +=
						'<span class="tag flag">Super Sugo-fest Limited Rare Recruit only</span>';
				if (flags.slrr)
					htmlToAppend +=
						'<span class="tag flag">Support Sugo-fest Limited Rare Recruit only</span>';
				if (flags.superlrr)
					htmlToAppend +=
						'<span class="tag flag">Super Sugo-fest Limited Rare Recruit only</span>';
				if (flags.annilrr)
					htmlToAppend +=
						'<span class="tag flag">Anniversary Sugo-fest Limited Rare Recruit only</span>';
				if (flags.promo)
					htmlToAppend += '<span class="tag flag">Promo-code only</span>';
				if (flags.shop)
					htmlToAppend += '<span class="tag flag">Rayleigh Shop Unit</span>';
				if (flags.tmshop)
					htmlToAppend += '<span class="tag flag">Trade Port Unit</span>';
				if (flags.special)
					htmlToAppend +=
						'<span class="tag flag">One time only characters</span>';
				if (flags.inkable)
					htmlToAppend += '<span class="tag flag">Inkable</span>';
				if (CharUtils.checkFarmable(id, { "Story Island": true }))
					htmlToAppend += '<span class="tag flag">Story mode only</span>';
				if (CharUtils.checkFarmable(id, { Fortnight: true }))
					htmlToAppend += '<span class="tag flag">Fortnight only</span>';
				if (CharUtils.checkFarmable(id, { Raid: true }))
					htmlToAppend += '<span class="tag flag">Raid only</span>';
				if (CharUtils.checkFarmable(id, { Arena: true }))
					htmlToAppend += '<span class="tag flag">Arena only</span>';
				if (CharUtils.checkFarmable(id, { Treasure: true }))
					htmlToAppend += '<span class="tag flag">Treasure Map only</span>';
				if (
					CharUtils.checkFarmable(id, { "Story Island": true, Fortnight: true })
				)
					htmlToAppend +=
						'<span class="tag flag">Story mode & fortnight only</span>';
				if (CharUtils.checkFarmable(id, { "Story Island": true, Raid: true }))
					htmlToAppend +=
						'<span class="tag flag">Story mode & raid only</span>';
				if (CharUtils.checkFarmable(id, { Raid: true, Fortnight: true }))
					htmlToAppend += '<span class="tag flag">Raid & fortnight only</span>';

				// Shops
				Object.entries(window.shops).forEach(([key, value]) => {
					if (Object.values(value).includes(Number(id)))
						htmlToAppend += '<span class="tag flag">' + key + ' Shop</span>';
				});
				
				// matchers
				if (data) {
					for (const target in window.matchers) {
						for (const group in window.matchers[target]) {
							for (var name in window.matchers[target][group]) {
								var matcher = window.matchers[target][group][name];
								if (!data[matcher.target]) break;
								let targetString =
									data[matcher.target].constructor == String
										? data[matcher.target]
										: JSON.stringify(data[matcher.target]);

								// captain
								if (matcher.target == "captain" && matcher.regex.test(targetString)) {
									name = matcher.name;
									if (/Class$/.test(name)) 
										name = "Captain: " + name;
									else if (!/captains$/.test(name))
										name = "Captain: " + name.replace(/ers$/, "ing");
									else name = name.replace(/s$/, "");
									name = name.replace(/iing/, "ying");
									htmlToAppend += '<span class="tag captain">' + name + "</span>";
								}

								// special
								if (matcher.target.indexOf("special") === 0 && matcher.regex.test(targetString)) {
									name = matcher.name;
									if (!/specials$/.test(name))
										name = "Special: " + name.replace(/ers$/, "ing");
									else name = name.replace(/s$/, "");
									name = name.replace(/iing/, "ying");
									htmlToAppend += '<span class="tag special">' + name + "</span>";
								}

								// super special
								if (matcher.target === "superSpecial" && matcher.regex.test(targetString)) {
									name = matcher.name;
									if (!/specials$/.test(name))
										name = "Super Special: " + name.replace(/ers$/, "ing");
									else name = name.replace(/s$/, "").replace(/special/i, "Super Special");
									name = name.replace(/iing/, "ying");
									htmlToAppend += '<span class="tag superSpecial">' + name + "</span>";
								}

								// swap
								if (matcher.target.indexOf("swap") === 0 && matcher.regex.test(targetString)) {
									name = matcher.name;
									if (!/swaps$/.test(name))
										name = "Swap: " + name.replace(/ers$/, "ing");
									else name = name.replace(/s$/, "");
									name = name.replace(/iing/, "ying");
									htmlToAppend += '<span class="tag swap">' + name + "</span>";
								}

								// sailor
								if (matcher.target.indexOf("sailor") === 0 && !(data[matcher.target] === undefined)) {
									if (matcher.regex.test(targetString)) {
										name = matcher.name;
										if (!/sailor$/.test(name)) 
											name = "Sailor: " + name.replace(/ers$/, "ing");
										else name = name.replace(/s$/, "");
										name = name.replace(/iing/, "ying");
										if (name != "Has Sailor Ability sailor")
											htmlToAppend += '<span class="tag sailor">' + name + "</span>";
									}
								}

								// limit
								if (matcher.target.indexOf("limit") === 0 && matcher.regex.test(targetString)) {
									name = matcher.name;
									if (!/limit$/.test(name))
										name = "Limit Break: " + name.replace(/ers$/, "ing");
									else name = name.replace(/s$/, "");
									name = name.replace(/iing/, "ying");
									if (name != "Has Limit Break limit")
										htmlToAppend += '<span class="tag limit">' + name + "</span>";
								}

								// potential
								if (matcher.target.indexOf("potential") === 0 && matcher.regex.test(targetString)) {
									name = matcher.name;
									if (!/potential$/.test(name))
										name = "Potential Ability: " + name.replace(/ers$/, "ing");
									else name = name.replace(/s$/, "");
									name = name.replace(/iing/, "ying");
									htmlToAppend += '<span class="tag potential">' + name + "</span>";
								}

								// support
								if (matcher.target === "support" && matcher.regex.test(targetString)) {
									name = matcher.name;
									if (!/support$/.test(name))
										name = "Support: " + name.replace(/ers$/, "ing");
									else name = name.replace(/s$/, "");
									name = name.replace(/iing/, "ying");
									htmlToAppend += '<span class="tag support">' + name + "</span>";
								}
							}
						}
					}
				}
				element.append(htmlToAppend);
			},
		};
	};

	directives.detailsCard = function ($storage) {
		return {
			restrict: "E",
			transclude: true,
			replace: true,
template: '<div class="details-card" id="card-{{sectionId}}">' +
            '<div class="details-card-header" ng-click="toggle()">' +
            '<i class="material-icons material-icons-chevron-right details-card-chevron" ng-class="{\'details-card-collapsed\': !isOpen}">chevron_right</i>' +
            '<span class="details-card-title">{{title}}</span>' +
            '</div>' +
            '<div class="details-card-content" ng-transclude ng-show="isOpen"></div>' +
            '</div>',
			scope: {
				title: "@",
				sectionId: "@",
				defaultOpen: "@?"
			},
			link: function (scope, element, attrs) {
				element.removeAttr("title");
				var storageKey = "detailsCard_" + scope.sectionId;
				var stored = $storage.get(storageKey, null);
				scope.isOpen = stored !== null ? stored : (scope.defaultOpen !== "false");

				scope.toggle = function () {
					scope.isOpen = !scope.isOpen;
					$storage.set(storageKey, scope.isOpen);
				};
			}
		};
	};

	directives.costSlider = function ($rootScope) {
		return {
			restrict: "A",
			link: function (scope, element, attrs) {
				var slider = element[0];
				var costMinDisplay = document.getElementById('cost-min');
				var costMaxDisplay = document.getElementById('cost-max');
				
				if (!$rootScope.filters) {
					$rootScope.filters = { cost: [1, 99] };
				}
				
				var cost = $rootScope.filters.cost || [1, 99];

				noUiSlider.create(slider, {
					start: [cost[0], cost[1]],
					connect: true,
					range: { min: 1, max: 99 },
					step: 1,
					animate: false
				});

				slider.noUiSlider.on('update', function(values) {
					var minVal = Math.round(values[0]);
					var maxVal = Math.round(values[1]);
					$rootScope.filters.cost[0] = minVal;
					$rootScope.filters.cost[1] = maxVal;
					if (!$rootScope.$$phase) {
						$rootScope.$apply();
					}
					if (costMinDisplay) costMinDisplay.textContent = minVal;
					if (costMaxDisplay) costMaxDisplay.textContent = maxVal;
				});
			},
		};
	};

			directives.rumbleCostSlider = function ($rootScope) {
		return {
			restrict: "A",
			link: function (scope, element, attrs) {
				var slider = element[0];
				var rumbleCostMinDisplay = document.getElementById('rumble-cost-min');
				var rumbleCostMaxDisplay = document.getElementById('rumble-cost-max');
				
				if (!$rootScope.filters) {
					$rootScope.filters = {};
				}
				
				if (!$rootScope.filters.rumbleCost) {
					$rootScope.filters.rumbleCost = [1, 99];
				}

				noUiSlider.create(slider, {
					start: [$rootScope.filters.rumbleCost[0], $rootScope.filters.rumbleCost[1]],
					connect: true,
					range: { min: 1, max: 99 },
					step: 1,
					animate: false
				});

				slider.noUiSlider.on('update', function(values) {
					var minVal = Math.round(values[0]);
					var maxVal = Math.round(values[1]);
					$rootScope.filters.rumbleCost[0] = minVal;
					$rootScope.filters.rumbleCost[1] = maxVal;
					if (!$rootScope.$$phase) {
						$rootScope.$apply();
					}
					if (rumbleCostMinDisplay) rumbleCostMinDisplay.textContent = minVal;
					if (rumbleCostMaxDisplay) rumbleCostMaxDisplay.textContent = maxVal;
				});
			},
		};
	};

	filters.targetToString = function () {
		return function (input) {
			if (!input) return "N/A";
			if (input.criteria == "near") {
				return `Nearby Enemies.`;
			} else {
				return `Enemies with the ${input.comparator} ${input.criteria}.`;
			}
		};
	};

	filters.patternToString = function () {
		return function (input) {
			if (!input) return "N/A";
			if (input.action == "attack") {
				let htmlWrapper = "";
				switch (input.type) {
					case "Normal":
						return `${input.type} Attack`;
					case "Power":
						return `<b><i>${input.type} Attack</i></b>`;
					case "Full":
						return `<b>${input.type} Attack</b>`;
				}
			} else if (input.action == "heal") {
				input.area = input.area[0].toUpperCase() + input.area.slice(1);
				return `<i>Level ${input.level} ${
					input.area == "Self" ? input.area : input.area + " Range"
				} Heal</i>`;
			} else {
				return "UNKNOWN";
			}
		};
	};

	filters.resilienceToString = function () {
		return function (input) {
			if (!input) return "N/A";
			switch (input.type) {
				case "dmgboost":
					return `${conditionToString(input.condition)}${
						input.amount
					}x boost to ${input.attribute} enemies.`;
					break;
				case "healing":
					return `${conditionToString(input.condition)}Heals ${
						input.amount
					} HP every ${input.interval} seconds.`;
					break;
				case "damage":
					return `${conditionToString(input.condition)}${
						input.percentage
					}% reduction to ${input.attribute} damage.`;
					break;
				case "debuff":
					return `${conditionToString(input.condition)}${
						input.chance
					}% to resist ${input.attribute}.`;
					break;
			}
		};
	};

	filters.specialToString = function () {
		return function (input) {
			if (!input) return "N/A";
			return filters.abilityToString()(input);
		};
	};

	filters.superspecialToString = function () {
		return function (input) {
			if (!input) return "N/A";
			return filters.abilityToString()(input).slice(4)
		};
	};

	filters.superspecialconditionToString = function () {
		return function (input) {
			switch (input.type) {
				case "special":
					return `After this character receives enemy's rumble special ${input.count} times`;
				default:
					return `UNKNOWN CONDITION ${JSON.stringify(input)}`;
			}
		};
	};

	filters.gpconditionToString = function () {
		return function (input) {
			switch (input.type) {
				case "time":
					return `${input.comparator == "after" ? "After" : "At Exactly"} ${
						input.count
					} seconds`;
				case "damage":
					return `After dealing damage ${input.count} times`;
				case "action":
					return `After ${input.action}ing ${input.count} times`;
				case "debuff":
					return `After landing ${input.attribute} ${input.count} times`;
				case "attack":
					return `After landing ${input.count} ${input.attack} attacks`;
				case "defeat":
					return `After ${input.count} ${input.team} are defeated`;
				case "special":
					return `After ${input.team} uses ${input.count} Rumble Specials`;
				case "dbfreceived":
					return `After ${input.count} debuffs recieved`;
				case "dmgdealt":
					return `After ${new Intl.NumberFormat().format(
						input.count
					)} damage dealt`;
				case "dmgreceived":
					return `After ${new Intl.NumberFormat().format(
						input.count
					)} damage recieved`;
				case "hitreceived":
					return `After ${input.count} hits recieved`;
				default:
					return `UNKNOWN CONDITION ${JSON.stringify(input)}`;
			}
		};
	};

	filters.abilityToString = function () {
		return function (input) {
			if (!input) return "N/A";
			//let retVal = `<ul style="margin-bottom:3px;">`;
			let retVal = ``;
			for (var effect of input) {
				//let e = `<li>${conditionToString(effect.condition)}`;
				let e = `<br>${conditionToString(effect.condition)}`;
				switch (effect.effect) {
					case "buff":
						e += `Applies Lv.${effect.level} ${arrayToString(
							effect.attributes
						)} up buff`;
						break;
					case "debuff":
						e += `Inflicts Lv.${effect.level} ${arrayToString(
							effect.attributes
						)} down debuff`;
						break;
					case "damage":
						switch (effect.type) {
							case "time":
								e += `Deals Lv.${effect.level} Damage Over Time`;
								break;
							case "atk":
								e += `Deals ${new Intl.NumberFormat().format(effect.amount)}x ${
									effect.leader ? "Leader's " : ""
								}ATK in damage`;
								break;
							case "atkbase":
								e += `Deals ${new Intl.NumberFormat().format(effect.amount)}x ${
									effect.leader ? "Leader's " : ""
								}base ATK in damage`;
								break;
							case "fixed":
								e += `Deals ${new Intl.NumberFormat().format(
									effect.amount
								)} fixed damage`;
								break;
							case "random":
								e += `Randomly deals between ${new Intl.NumberFormat().format(
									effect.amountrange[0]
								)}-${new Intl.NumberFormat().format(
									effect.amountrange[1]
								)} fixed damage`;
								break;
							case "cut":
								e += `${new Intl.NumberFormat().format(
									effect.amount
								)}% health cut`;
								break;
							default:
								e += "TODO:  " + JSON.stringify(effect);
						}
						e += effect.defbypass ? ` that will ignore DEF` : ``;
						break;
					case "recharge":
						switch (effect.type) {
							case "RCV":
								e += `Restores ${new Intl.NumberFormat().format(
									effect.amount
								)}x RCV of HP`;
								break;
							case "percentage":
								e += `Restores ${new Intl.NumberFormat().format(
									effect.amount
								)}% of HP`;
								break;
							case "fixed":
								e += `Restores ${new Intl.NumberFormat().format(
									effect.amount
								)} fixed HP`;
								break;
							case "Special CT":
								e += `Reduces ${new Intl.NumberFormat().format(
									effect.amount
								)}% of ${effect.type}`;
								break;
							default:
								e += "TODO:  " + JSON.stringify(effect);
						}
						if (effect.interval)
							e += ` every ${effect.interval} ${
								effect.interval == 1 ? "second" : "seconds"
							}`;
						break;
					case "hinderance":
						e += effect.amount
							? `Removes ${new Intl.NumberFormat().format(
									effect.amount
							  )}% of ${arrayToString(effect.attributes)}`
							: `${effect.chance}% chance to inflict ${
									effect.level ? "Lv." + effect.level + " " : ""
							  }${arrayToString(effect.attributes)}`;
						break;
					case "boon":
						e += `${effect.chance ? effect.chance + "% chance to " : ""}`;
						let attrStr = arrayToString(effect.attributes);
						switch (attrStr) {
							case "Provoke":
								e += "Provoke enemies";
								break;
							case "Haste":
								e += `${effect.chance ? "g" : "G"}rant Haste`;
								break;
							case "Counter":
								e += `${effect.chance ? "g" : "G"}rant ${
									effect.amount
								}x Counter`;
								break;
							case "Revive":
								e += `${effect.chance ? "r" : "R"}evive to ${
									effect.amount
								}% HP after death`;
								break;
							case "On Death":
								e += `On Death launches rumble special`;
								break;
							default:
								e += `${"Reduce " + attrStr}`;
								break;
						}
						break;
					case "penalty":
						let tmpStr = arrayToString(effect.attributes);
						if (tmpStr == "HP" && effect.amount)
							e += `${new Intl.NumberFormat().format(
								effect.amount
							)}% health cut`;
						else if (effect.level)
							e += `Inflicts Lv.${new Intl.NumberFormat().format(
								effect.level
							)} ${arrayToString(effect.attributes)} down penalty`;
						else
							e += `${effect.chance || 100}% chance to ${arrayToString(
								effect.attributes
							)}`;
						break;
					case "cleanse":
						e += `${effect.chance}% chance to cleanse ${arrayToString(
							effect.attributes
						)} debuffs`;
						break;
					default:
						e = "UNKNOWN EFFECT " + JSON.stringify(effect);
						break;
				}
				retVal +=
					e +
					`${targetToString(effect.targeting)}${rangeToString(effect.range)}${
						effect.duration ? " for " + effect.duration + " seconds" : ""
					}` +
					(effect.repeat
						? ` ${new Intl.NumberFormat().format(effect.repeat)} times`
						: ``) +
					`.</li>`;
			}
			return retVal + "</ul>";
		};
	};

	function arrayToString(array) {
		let tmpStr = new Intl.ListFormat("en").format(array);
		return tmpStr;
	}

	function arrayToStringOr(array) {
		let tmpStr = new Intl.ListFormat("en", { type: "disjunction" }).format(
			array
		);
		return tmpStr;
	}

	function conditionToString(condition, suffix) {
		if (!condition) return "";

		switch (condition.type) {
			case "stat":
				return `When ${condition.stat} is ${condition.comparator} ${condition.count}%, `;
			case "time":
				switch (condition.comparator) {
					case "first":
						return `For the first ${condition.count} seconds, `;
					case "after":
						return `After the first ${condition.count} seconds, `;
					case "remaining":
						return `When there are ${condition.count} seconds or less remaining, `;
					default:
						return `UNKNOWN TIME CONDITION ${JSON.stringify(condition)}`;
				}
			case "crew":
			case "enemies":
				return `When there is ${
					condition.comparator == "exactly"
						? `${condition.comparator} ${condition.count} ${condition.type}`
						: `${condition.count} or ${condition.comparator} ${condition.type}`
				} ${
					condition.targets
						? arrayToString(condition.targets) + " characters"
						: ""
				} ${
					condition.relative
						? condition.type == "crew"
							? " than the enemy team"
							: " than your crew"
						: ""
				} ${condition.composition ? "" : " remaining"}, `;
			case "trigger":
				return `The first ${condition.count} times ${
					condition.stat.includes("defeated")
						? condition.team
							? condition.team +
							  (condition.targets ? arrayToString(condition.targets) : "") +
							  " characters are "
							: ""
						: "this character "
				}${
					condition.stat == "takes damage" ||
					condition.stat.includes("receives") ||
					condition.stat.includes("defeated")
						? condition.stat
						: "lands a " + condition.stat
				}, `;
			case "debuff":
				return `If this character has ${condition.stat}, `;
			case "defeat":
				return `When ${condition.count} characters ${
					condition.team == "enemies"
						? "on the enemy team "
						: condition.team == "crew"
						? "on your crew "
						: ""
				}are defeated, `;
			case "character":
				return `When ${arrayToStringOr(condition.families)} ${
					condition.families.length > 1 ? "are" : "is"
				} ${
					condition.team == "enemies"
						? "on the enemy team"
						: condition.team == "crew"
						? "on your crew"
						: ""
				}, `;
			default:
				return `UNKNOWN CONDITION ${JSON.stringify(condition)}`;
		}
	}

	function rangeToString(range) {
		if (!range) return "";
		return ` in a ${range.size}, ${range.direction} range`;
	}

	function targetToString(target) {
		if (!target) return "";
		let targetStr = arrayToString(target.targets);
		let excludeStr = arrayToString(target.excludes);
		if (targetStr == "crew") targetStr = "crew member(s)";
		if (targetStr == "enemies") {
			if (!target.count) targetStr = "all enemies";
			else if (target.count == 1) targetStr = "enemy";
		}
		let retVal = ` to ${target.count ? target.count + " " : ""}${targetStr}${
			target.families ? " " + arrayToStringOr(target.families) : ""
		}${
			target.targets.includes("self") ||
			target.targets.includes("crew") ||
			target.targets.includes("enemies")
				? ""
				: target.count == 1
				? " character"
				: " characters"
		}`;
		retVal =
			retVal +
			`${target.excludes ? ", excluding " : ""}${
				target.excludes ? excludeStr : ""
			}${
				target.excludes
					? target.excludes.includes("self") ||
					  target.excludes.includes("crew") ||
					  target.excludes.includes("enemies")
						? ""
						: target.count == 1
						? " character"
						: " characters"
					: ""
			}`;
		retVal =
			retVal +
			`${
				target.stat
					? " with " +
					  (target.percentage
							? (target.priority == "above" || target.priority == "below" || target.priority == "exactly" ? target.priority + " " : "a ") +
							  target.percentage +
							  "%"
							: "the " + target.priority) +
					  " " +
					  target.stat
					: ""
			}`;
		return retVal;
	}

	/******************
	 * Initialization *
	 ******************/

	for (var directive in directives)
		app.directive(directive, directives[directive]);

	for (var filter in filters) app.filter(filter, filters[filter]);
})();
