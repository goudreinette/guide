'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global $ */

var ViewModel = function () {
  function ViewModel() {
    var _this = this;

    _classCallCheck(this, ViewModel);

    // DOM reference to mount point
    this.$root = document.querySelector('#contact-slideout .container');
    this.appendHTML();

    // Get references to just created DOM elements
    this.$toggle = document.querySelector('.contact-menu-link i');
    this.$back = document.querySelector('#contact-slideout #back');
    this.$choices = document.querySelectorAll('#contact-slideout h1.choice');
    this.$icons = document.querySelector('#contact-slideout .choice-icon');

    this.$rows = document.querySelectorAll('#contact-slideout .guide');
    this.$intro = document.querySelector('#contact-slideout #intro');

    // Event listeners
    window.toggleGuide = function () {
      return _this.$toggle.trigger('click');
    };
    window.addEventListener('hashchange', this.onHashChange.bind(this));
    this.$toggle.addEventListener('click', this.onToggleClick.bind(this));
    this.$back.addEventListener('click', this.onBackClick.bind(this));
    for (var i = 0; i < this.$choices.length; i++) {
      this.$choices[i].addEventListener('click', this.onChoiceClick.bind(this));
    } // Update for the first time - for when hash !== ''
    this.update();
  }

  _createClass(ViewModel, [{
    key: 'appendHTML',
    value: function appendHTML() {
      var html = '<button id="back"></button>';
      this.$root.insertAdjacentHTML('afterbegin', html);
    }
  }, {
    key: 'onToggleClick',
    value: function onToggleClick() {
      location.hash = '';
    }
  }, {
    key: 'onChoiceClick',
    value: function onChoiceClick(event) {
      location.hash = event.target.getAttribute('data-slug');
    }
  }, {
    key: 'onBackClick',
    value: function onBackClick() {
      history.back();
    }
  }, {
    key: 'onHashChange',
    value: function onHashChange() {
      this.update();
    }
  }, {
    key: 'update',
    value: function update() {
      // Show/hide grids based on their slug's occurence in location.hash
      for (var _i = 0; _i < this.$rows.length; _i++) {
        var slug = this.$rows[_i].getAttribute('data-slug');
        var hidden = location.hash.slice(1) !== slug;
        if (hidden) {
          $(this.$rows[_i]).velocity({ scaleY: 0, opacity: 0 });
        } else {
          $(this.$rows[_i]).velocity({ scaleY: 1, opacity: 1 });
        }
      }
      // Show/hide the #intro based on the content of location.hash
      if (location.hash !== '') {
        $(this.$intro).velocity({ opacity: 0, height: 0, marginTop: -230 });
        $(this.$back).velocity({ opacity: 1, height: 'auto' });
      } else {
        $(this.$back).velocity({ opacity: 0, height: 0 });
        $(this.$intro).velocity({ opacity: 1, height: 'auto', marginTop: 100 });
      }

      // Set first choice active based on location.hash
      for (var _i2 = 0; _i2 < this.$choices.length; _i2++) {
        this.$choices[_i2].classList.toggle('active', location.hash.includes(this.$choices[_i2].getAttribute('data-slug')));
      } // Change the background color when location.hash includes individueel
      this.$root.parentNode.classList.toggle('alternate-color', location.hash.includes('individueel'));

      // Hide icons when location.hash !== ''
      for (var i = 0; i < $this.$icons.length; i++) {
        $this.$icons[i].classList.toggle('hidden', location.hash !== '');
      }
    }
  }]);

  return ViewModel;
}();

if (!window.$) window.$ = window.jQuery;

window.onload = function () {
  return new ViewModel();
};
