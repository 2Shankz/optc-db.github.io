(function() {

var app = angular.module('optc');
var services = { };

services.$storage = function() {
    return {
        get: function(key, defaultValue) {
            try {
                var value = localStorage.getItem(key);
                if (value === null) return defaultValue;
                var parsed = JSON.parse(value);
                return parsed === undefined ? defaultValue : parsed;
            } catch (e) { return defaultValue; }
        },
        set: function(key, value) {
            try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { }
        },
        remove: function(key) {
            try { localStorage.removeItem(key); } catch (e) { }
        }
    };
};

for (var service in services)
    app.factory(service, services[service]);

})();
