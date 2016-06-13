(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global $ */

var ViewModel = function () {
  function ViewModel() {
    _classCallCheck(this, ViewModel);

    // DOM reference to mount point
    this.$root = document.querySelector('#contact-slideout .container');
    this.appendHTML();

    // Get references to just created DOM elements
    this.$toggle = document.querySelector('.contact-menu-link i');
    this.$back = document.querySelector('#contact-slideout #back');
    this.$choices = document.querySelectorAll('#contact-slideout h1.choice');

    this.$rows = document.querySelectorAll('#contact-slideout .guide');
    this.$intro = document.querySelector('#contact-slideout #intro');

    // Event listeners
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
      var _this = this;

      var _loop = function _loop(i) {
        var slug = _this.$rows[i].getAttribute('data-slug');
        var hidden = location.hash.slice(1) !== slug;
        if (hidden) {
          $(_this.$rows[i]).velocity({ scaleY: 0, opacity: 0 }, { complete: function complete() {
              return _this.$rows[i].classList.add('hidden');
            } });
        } else {
          $(_this.$rows[i]).velocity({ scaleY: 1, opacity: 1 }, { complete: function complete() {
              return _this.$rows[i].classList.remove('hidden');
            } });
        }
      };

      // Show/hide grids based on their slug's occurence in location.hash
      for (var i = 0; i < this.$rows.length; i++) {
        _loop(i);
      }
      // Show/hide the #intro based on the content of location.hash
      if (location.hash !== '') {
        $(this.$intro).velocity({ opacity: 0, height: 0, marginTop: 0 });
        $(this.$back).velocity({ opacity: 1, height: 'auto' });
      } else {
        $(this.$back).velocity({ opacity: 0, height: 0 });
        $(this.$intro).velocity({ opacity: 1, height: 'auto', marginTop: 100 });
      }

      // Set first choice active based on location.hash
      for (var _i = 0; _i < this.$choices.length; _i++) {
        this.$choices[_i].classList.toggle('active', location.hash.includes(this.$choices[_i].getAttribute('data-slug')));
      } // Change the background color when location.hash includes individueel
      this.$root.parentNode.classList.toggle('alternate-color', location.hash.includes('individueel'));
    }
  }]);

  return ViewModel;
}();

if (!window.$) window.$ = window.jQuery;

window.onload = function () {
  return new ViewModel();
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Vzci9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0lDQ00sUztBQUVKLHVCQUNBO0FBQUE7OztBQUVFLFNBQUssS0FBTCxHQUFhLFNBQVMsYUFBVCxDQUF1Qiw4QkFBdkIsQ0FBYjtBQUNBLFNBQUssVUFBTDs7O0FBR0EsU0FBSyxPQUFMLEdBQWUsU0FBUyxhQUFULENBQXVCLHNCQUF2QixDQUFmO0FBQ0EsU0FBSyxLQUFMLEdBQWEsU0FBUyxhQUFULENBQXVCLHlCQUF2QixDQUFiO0FBQ0EsU0FBSyxRQUFMLEdBQWdCLFNBQVMsZ0JBQVQsQ0FBMEIsNkJBQTFCLENBQWhCOztBQUVBLFNBQUssS0FBTCxHQUFhLFNBQVMsZ0JBQVQsQ0FBMEIsMEJBQTFCLENBQWI7QUFDQSxTQUFLLE1BQUwsR0FBYyxTQUFTLGFBQVQsQ0FBdUIsMEJBQXZCLENBQWQ7OztBQUdBLFdBQU8sZ0JBQVAsQ0FBd0IsWUFBeEIsRUFBc0MsS0FBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLElBQXZCLENBQXRDO0FBQ0EsU0FBSyxPQUFMLENBQWEsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMsS0FBSyxhQUFMLENBQW1CLElBQW5CLENBQXdCLElBQXhCLENBQXZDO0FBQ0EsU0FBSyxLQUFMLENBQVcsZ0JBQVgsQ0FBNEIsT0FBNUIsRUFBcUMsS0FBSyxXQUFMLENBQWlCLElBQWpCLENBQXNCLElBQXRCLENBQXJDO0FBQ0EsU0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEtBQUssUUFBTCxDQUFjLE1BQWxDLEVBQTBDLEdBQTFDO0FBQ0UsV0FBSyxRQUFMLENBQWMsQ0FBZCxFQUFpQixnQkFBakIsQ0FBa0MsT0FBbEMsRUFBMkMsS0FBSyxhQUFMLENBQW1CLElBQW5CLENBQXdCLElBQXhC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RUFBTjtBQUFBLENBQWhCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGdsb2JhbCAkICovXG5jbGFzcyBWaWV3TW9kZWxcbntcbiAgY29uc3RydWN0b3IgKClcbiAge1xuICAgIC8vIERPTSByZWZlcmVuY2UgdG8gbW91bnQgcG9pbnRcbiAgICB0aGlzLiRyb290ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRhY3Qtc2xpZGVvdXQgLmNvbnRhaW5lcicpXG4gICAgdGhpcy5hcHBlbmRIVE1MKClcblxuICAgIC8vIEdldCByZWZlcmVuY2VzIHRvIGp1c3QgY3JlYXRlZCBET00gZWxlbWVudHNcbiAgICB0aGlzLiR0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFjdC1tZW51LWxpbmsgaScpXG4gICAgdGhpcy4kYmFjayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250YWN0LXNsaWRlb3V0ICNiYWNrJylcbiAgICB0aGlzLiRjaG9pY2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2NvbnRhY3Qtc2xpZGVvdXQgaDEuY2hvaWNlJylcblxuICAgIHRoaXMuJHJvd3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjY29udGFjdC1zbGlkZW91dCAuZ3VpZGUnKVxuICAgIHRoaXMuJGludHJvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRhY3Qtc2xpZGVvdXQgI2ludHJvJylcblxuICAgIC8vIEV2ZW50IGxpc3RlbmVyc1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdGhpcy5vbkhhc2hDaGFuZ2UuYmluZCh0aGlzKSlcbiAgICB0aGlzLiR0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uVG9nZ2xlQ2xpY2suYmluZCh0aGlzKSlcbiAgICB0aGlzLiRiYWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkJhY2tDbGljay5iaW5kKHRoaXMpKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy4kY2hvaWNlcy5sZW5ndGg7IGkrKylcbiAgICAgIHRoaXMuJGNob2ljZXNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2hvaWNlQ2xpY2suYmluZCh0aGlzKSlcblxuICAgIC8vIFVwZGF0ZSBmb3IgdGhlIGZpcnN0IHRpbWUgLSBmb3Igd2hlbiBoYXNoICE9PSAnJ1xuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIGFwcGVuZEhUTUwgKClcbiAge1xuICAgIGNvbnN0IGh0bWwgPSAnPGJ1dHRvbiBpZD1cImJhY2tcIj48L2J1dHRvbj4nXG4gICAgdGhpcy4kcm9vdC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBodG1sKVxuICB9XG5cbiAgb25Ub2dnbGVDbGljayAoKVxuICB7XG4gICAgbG9jYXRpb24uaGFzaCA9ICcnXG4gIH1cblxuICBvbkNob2ljZUNsaWNrIChldmVudClcbiAge1xuICAgIGxvY2F0aW9uLmhhc2ggPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXNsdWcnKVxuICB9XG5cbiAgb25CYWNrQ2xpY2sgKClcbiAge1xuICAgIGhpc3RvcnkuYmFjaygpXG4gIH1cblxuICBvbkhhc2hDaGFuZ2UgKClcbiAge1xuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHVwZGF0ZSAoKVxuICB7XG4gICAgLy8gU2hvdy9oaWRlIGdyaWRzIGJhc2VkIG9uIHRoZWlyIHNsdWcncyBvY2N1cmVuY2UgaW4gbG9jYXRpb24uaGFzaFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy4kcm93cy5sZW5ndGg7IGkrKylcbiAgICB7XG4gICAgICBjb25zdCBzbHVnID0gdGhpcy4kcm93c1tpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2x1ZycpXG4gICAgICBjb25zdCBoaWRkZW4gPSBsb2NhdGlvbi5oYXNoLnNsaWNlKDEpICE9PSBzbHVnXG4gICAgICBpZiAoaGlkZGVuKVxuICAgICAge1xuICAgICAgICAkKHRoaXMuJHJvd3NbaV0pLnZlbG9jaXR5KHtzY2FsZVk6IDAsIG9wYWNpdHk6IDB9LCB7Y29tcGxldGU6ICgpID0+XG4gICAgICAgIHRoaXMuJHJvd3NbaV0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyl9KVxuXG4gICAgICB9XG4gICAgICBlbHNlXG4gICAgICB7XG4gICAgICAgICQodGhpcy4kcm93c1tpXSkudmVsb2NpdHkoe3NjYWxlWTogMSwgb3BhY2l0eTogMX0sIHtjb21wbGV0ZTogKCkgPT5cbiAgICAgICAgdGhpcy4kcm93c1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKX0pXG4gICAgICB9XG4gICAgfVxuICAgIC8vIFNob3cvaGlkZSB0aGUgI2ludHJvIGJhc2VkIG9uIHRoZSBjb250ZW50IG9mIGxvY2F0aW9uLmhhc2hcbiAgICBpZiAobG9jYXRpb24uaGFzaCAhPT0gJycpXG4gICAge1xuICAgICAgJCh0aGlzLiRpbnRybykudmVsb2NpdHkoe29wYWNpdHk6IDAsIGhlaWdodDogMCwgbWFyZ2luVG9wOiAwfSlcbiAgICAgICQodGhpcy4kYmFjaykudmVsb2NpdHkoe29wYWNpdHk6IDEsIGhlaWdodDogJ2F1dG8nfSlcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgICQodGhpcy4kYmFjaykudmVsb2NpdHkoe29wYWNpdHk6IDAsIGhlaWdodDogMH0pXG4gICAgICAkKHRoaXMuJGludHJvKS52ZWxvY2l0eSh7b3BhY2l0eTogMSwgaGVpZ2h0OiAnYXV0bycsIG1hcmdpblRvcDogMTAwfSlcbiAgICB9XG5cbiAgICAvLyBTZXQgZmlyc3QgY2hvaWNlIGFjdGl2ZSBiYXNlZCBvbiBsb2NhdGlvbi5oYXNoXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLiRjaG9pY2VzLmxlbmd0aDsgaSsrKVxuICAgICAgdGhpcy4kY2hvaWNlc1tpXS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnLCBsb2NhdGlvbi5oYXNoLmluY2x1ZGVzKHRoaXMuJGNob2ljZXNbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLXNsdWcnKSkpXG5cbiAgICAvLyBDaGFuZ2UgdGhlIGJhY2tncm91bmQgY29sb3Igd2hlbiBsb2NhdGlvbi5oYXNoIGluY2x1ZGVzIGluZGl2aWR1ZWVsXG4gICAgdGhpcy4kcm9vdC5wYXJlbnROb2RlLmNsYXNzTGlzdC50b2dnbGUoJ2FsdGVybmF0ZS1jb2xvcicsIGxvY2F0aW9uLmhhc2guaW5jbHVkZXMoJ2luZGl2aWR1ZWVsJykpXG4gIH1cbn1cblxuaWYgKCF3aW5kb3cuJCkgd2luZG93LiQgPSB3aW5kb3cualF1ZXJ5XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiBuZXcgVmlld01vZGVsKClcbiJdfQ==
