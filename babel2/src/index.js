const regeneratorRuntime = require("regenerator-runtime");
var templatePolyfill = require('template-polyfill');

/* require("@babel/polyfill"); */
/* require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise"); */

window.MyAnimation = require('../modules/MyAnimation');
window.ToolBar = require('../modules/ToolBar');
window.Expectation = require('../modules/Expectation');
window.QuantityVidjet = require('../modules/QuantityVidjet');
window.BaseForm = require('../modules/Form');
window.WindowForm = require('../modules/Window');
window.CartWindow = require('../modules/CartWindow');
window.Cart = require('../modules/Cart');
window.CartCategories = require('../modules/CartCategories');
window.Search = require('../modules/Search');
window.ProgressAnimation = require('../modules/ProgressAnimation');
window.ProductFinder = require('../modules/ProductFinder');
window.Logo = require('../modules/Logo');
window.Menu = require('../modules/Menu');
window.OptimizedResize = require('../events/OptimizedResize');
window.MenuHor = require('../modules/MenuHor');

/* categoriesView */
window.Product = require('../modules/Product');
window.Slider = require('../modules/Slider');
window.IconsCategory = require('../modules/IconsCategory');


/* productsView */
window.Icons = require('../modules/Icons');

/* productView */
window.ImageShow = require('../modules/ImageShow'); // Подключение скрипта просмотра изображений 
window.PacksCalculator = require('../modules/PacksCalculator'); // Подключение скрипта калькулятора упаковок

/* cartView */
window.CartForm = require('../modules/CartForm'); // Подключение класса формы корзины

/* orderView */
window.OrderForm = require('../modules/OrderForm'); // Подключение класса формы заказа





templatePolyfill();

(function () {

  if ( typeof window.CustomEvent === "function" ) return false;

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: null };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  window.CustomEvent = CustomEvent;
})();

(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('append')) {
      return;
    }
    Object.defineProperty(item, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();
        
        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        
        this.appendChild(docFrag);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

(function() {
  var arr = [window.Element, window.CharacterData, window.DocumentType];
  var args = [];

  arr.forEach(function (item) {
    if (item) {
      args.push(item.prototype);
    }
  });

  // from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
  (function (arr) {
    arr.forEach(function (item) {
      if (item.hasOwnProperty('remove')) {
        return;
      }
      Object.defineProperty(item, 'remove', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function remove() {
          this.parentNode.removeChild(this);
        }
      });
    });
  })(args);
})();