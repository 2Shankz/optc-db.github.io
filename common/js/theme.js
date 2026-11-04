/**
 * Shared theme handling for every page.
 *
 * The classes added here drive common/css/themes.css (page themes) and the
 * `.modal-*` variants used by the character detail card.
 */
(function () {
  var themeCycle = ['light', 'frappe', 'macchiato', 'dark'];

  var themeIcons = {
    dark: 'dark_mode',
    light: 'light_mode',
    frappe: 'brightness_medium',
    macchiato: 'nightlight_round'
  };

  var themeClasses = ['light-mode', 'dark-mode', 'frappe', 'macchiato'];
  var modalClasses = ['modal-dark', 'modal-light', 'modal-frappe', 'modal-macchiato'];

  function removeClasses(element, classes) {
    for (var i = 0; i < classes.length; ++i) element.classList.remove(classes[i]);
  }

  function apply(theme) {
    var element = document.documentElement;
    removeClasses(element, themeClasses);
    if (theme === 'frappe') element.classList.add('light-mode', 'frappe');
    else if (theme === 'macchiato') element.classList.add('dark-mode', 'macchiato');
    else if (theme === 'light') element.classList.add('light-mode');
    else element.classList.add('dark-mode');
  }

  function applyModal(theme) {
    var element = document.documentElement;
    removeClasses(element, modalClasses);
    element.classList.add('modal-' + (theme || 'light'));
  }

  function next(theme) {
    var index = themeCycle.indexOf(theme);
    return themeCycle[(index + 1) % themeCycle.length];
  }

  function icon(theme, fallback) {
    return themeIcons[theme] || fallback;
  }

  window.Theme = {
    cycle: themeCycle,
    icons: themeIcons,
    apply: apply,
    applyModal: applyModal,
    next: next,
    icon: icon
  };
})();
