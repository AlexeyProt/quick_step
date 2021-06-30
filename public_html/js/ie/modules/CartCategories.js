"use strict";

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var CartCategories = /*#__PURE__*/function (_Cart) {
  _inheritsLoose(CartCategories, _Cart);

  function CartCategories(args) {
    return _Cart.call(this, args) || this;
  }
  /**
  * Выполняет запрос для добавления пола в корзину
  *
  * @param node floorContainer
  */


  var _proto = CartCategories.prototype;

  _proto._ajaxAddForFloor = function _ajaxAddForFloor(floorContainer) {
    var quantityEl = floorContainer.querySelector('[data-packs-calculator="quantity"]');
    var quantity = quantityEl ? +quantityEl.innerHTML : 1;
    var formData = new FormData();
    formData.set('id', this._button.dataset.cartId);
    formData.set('quantity', quantity);
    $.ajax({
      url: "/cart/add",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: this._openWindow.bind(this),
      error: function error(jqxhr, status, errorMsg) {
        console.log(errorMsg, jqxhr);
      }
    });
  }
  /**
  * Возвращает ссылку товара
  *
  * @param string
  */
  ;

  _proto._getProductHref = function _getProductHref() {
    for (var target = this._button; target != document.documentElement; target = target.parentNode) {
      if (target.className != 'product') continue;
      return target.querySelector('[href]').href;
    }
  }
  /**
  * Выполняет запрос для добавления пола в корзину или перенаправляет на страницу с товаром
  *
  * @param string categoryName категория пола
  * @return boolean если категория не categoryName, то возавращает false
  */
  ;

  _proto._requestForFloorOrRedirect = function _requestForFloorOrRedirect(categoryName) {
    if (this._button.dataset.cartCategoryName == categoryName) {
      for (var target = this._button; target != document.documentElement; target = target.parentNode) {
        if (target.className != 'floor') continue;

        this._ajaxAddForFloor(target);

        return true;
      }

      document.location.href = this._getProductHref();
      return true;
    }

    return false;
  };

  _proto._ajaxAdd = function _ajaxAdd() {
    if (this._requestForFloorOrRedirect('Ламинат')) return;

    _Cart.prototype._ajaxAdd.call(this);
  };

  _proto._addedProductAjax = function _addedProductAjax() {
    if (this._requestForFloorOrRedirect('Ламинат')) return;

    _Cart.prototype._addedProductAjax.call(this);
  };

  _proto.start = function start() {
    _Cart.prototype.start.call(this);
  };

  return CartCategories;
}(Cart);