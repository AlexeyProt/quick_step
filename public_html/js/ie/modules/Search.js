"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Search = /*#__PURE__*/function () {
  function Search(container) {
    this.container = container;
    this.input = container.querySelector('input');
    this.searchListElem = container.querySelector('#searchList').content.children[0];
    this.searchDataURL;
    this.progressAnimation = new ProgressAnimation(container.querySelector('.progressContainer'));
  }
  /**
  * Заполняет элемент li результатами поиска
  *
  * @param node li
  * @param object searchResult
  *
  * @return node li
  */


  var _proto = Search.prototype;

  _proto.fillInLi = function fillInLi(li, searchResult) {
    li.innerHTML = searchResult.name;
    return li;
  };

  _proto.buildListData = function buildListData(searchData) {
    if (!searchData.length) {
      this.searchListElem.remove();
      return;
    }

    this.container.append(this.searchListElem);
    var ul = this.searchListElem.querySelector('ul');
    var li = document.createElement('li');
    ul.innerHTML = '';

    for (var i = 0; i < searchData.length; i++) {
      li = li.cloneNode(false);
      li = this.fillInLi(li, searchData[i]);
      ul.append(li);
    }
  };

  _proto.showSearchData = /*#__PURE__*/function () {
    var _showSearchData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _this = this;

      var searchData;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (this._timerId) clearTimeout(this._timerId);
              _context.next = 3;
              return new Promise(function (resolve, reject) {
                _this._timerId = setTimeout(function () {
                  return resolve(_this.loadSearchData());
                }, 1000);
              });

            case 3:
              searchData = _context.sent;
              this.buildListData(searchData);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function showSearchData() {
      return _showSearchData.apply(this, arguments);
    }

    return showSearchData;
  }();

  _proto.loadSearchData = /*#__PURE__*/function () {
    var _loadSearchData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var response, results;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this._timerId = null;

              if (this.input.value) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return", []);

            case 3:
              this.progressAnimation.start();
              _context2.prev = 4;
              _context2.next = 7;
              return fetch(this.searchDataURL, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                  searchQuery: this.input.value
                })
              });

            case 7:
              response = _context2.sent;
              _context2.next = 10;
              return response.json();

            case 10:
              results = _context2.sent;
              return _context2.abrupt("return", results);

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](4);
              console.log(_context2.t0);

            case 17:
              _context2.prev = 17;
              this.progressAnimation.stop();
              return _context2.finish(17);

            case 20:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[4, 14, 17, 20]]);
    }));

    function loadSearchData() {
      return _loadSearchData.apply(this, arguments);
    }

    return loadSearchData;
  }();

  _proto.handleClickDeselectContainer = function handleClickDeselectContainer(event) {
    for (var target = event.target; target != document.body; target = target.parentNode) {
      if (!target || target == this.container) return;
    }

    this.deselectContainer();
  };

  _proto.handleKeydownDeselectContainer = function handleKeydownDeselectContainer(event) {
    if (event.key == 'Tab') this.deselectContainer();
  };

  _proto.deselectContainer = function deselectContainer() {
    delete this.container.dataset.searchSelected;
    this.searchListElem.remove();
  };

  _proto.searchQueryResultHandler = function searchQueryResultHandler(queryResultElem) {
    this.input.value = queryResultElem.innerHTML;
    this.deselectContainer();
  };

  _proto.handleSearchQueryResult = function handleSearchQueryResult(event) {
    for (var target = event.target; target != this.container; target = target.parentNode) {
      if (target.tagName != 'LI') continue;
      this.searchQueryResultHandler(target);
      return;
    }
  };

  _proto.start = function start() {
    var _this2 = this;

    this.input.addEventListener('focus', function () {
      return _this2.container.dataset.searchSelected = true;
    });
    document.body.addEventListener('click', function () {
      return _this2.handleClickDeselectContainer(event);
    });
    document.addEventListener('keydown', function () {
      return _this2.handleKeydownDeselectContainer(event);
    });
    this.input.addEventListener('input', function () {
      return _this2.showSearchData();
    });
    this.searchListElem.addEventListener('click', function () {
      return _this2.handleSearchQueryResult(event);
    });
  };

  return Search;
}();