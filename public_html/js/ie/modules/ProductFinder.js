"use strict";

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ProductFinder = /*#__PURE__*/function (_Search) {
  _inheritsLoose(ProductFinder, _Search);

  function ProductFinder(args) {
    var _this;

    _this = _Search.call(this, args) || this;
    _this.searchResultURL;
    return _this;
  }

  var _proto = ProductFinder.prototype;

  _proto.searchQueryResultHandler = function searchQueryResultHandler(queryResultElem) {
    this.redirectToSearchResult(queryResultElem.innerHTML);
    this.deselectContainer();
  };

  _proto.redirectToSearchResult = function redirectToSearchResult(queryResult) {
    document.location.href = encodeURI(document.location.origin + this.searchResultURL + '/' + queryResult);
  };

  _proto.handleSubmit = function handleSubmit(event) {
    event.preventDefault();
    this.redirectToSearchResult(this.input.value);
  };

  _proto.start = function start() {
    var _this2 = this;

    _Search.prototype.start.call(this);

    this.container.querySelector('.openButton').addEventListener('click', function () {
      return _this2.redirectToSearchResult(_this2.input.value);
    });
    this.container.querySelector('form').addEventListener('submit', function () {
      return _this2.handleSubmit(event);
    });
  };

  return ProductFinder;
}(Search);