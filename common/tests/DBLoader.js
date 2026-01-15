globalThis.window = {}
import '../data/aliases'
import '../data/cooldowns'
import '../data/evolutions'
import '../data/families'
import '../data/festival'
import '../data/flags'
import '../data/units'
import '../js/utils'
import '../data/details'
import '../data/drops'
import '../data/specials'
import PirateRumble from '../data/rumble.json'

Array.prototype.subcontains = function (data) {
  return this.join('!').indexOf(data.join('!')) != -1;
};

Array.prototype.has = function (what) {
  return this.indexOf(what) != -1;
};

Array.prototype.count = function (data) {
  var total = 0;
  for (var i = 0; i < this.length; ++i) {
    if (this[i] == data) ++total;
  }
  return total;
};

String.prototype.has = function (what) {
  return this == what;
};

export const DButils = window.Utils
export const DBevolution = window.evolutions
export const DBdetail = window.details
export const DBcooldown = window.cooldowns
export const DBflag = window.flags
export const DBfamily = window.families
export const DBunit = window.units
export const DBdrop = window.drops
export const DBalias = window.aliases
export const DBSpecial = window.specials
export const DBRumble = PirateRumble
