var _searchResult, searchResult;

searchResult = require('../js/common/SearchResult');

_searchResult = new searchResult('.currentPage');

_topBanner.subscribe('getExplain', (function(_this) {
  return function(publisher, type, data) {
    _searchResult.render();
    _searchResult.setData(data);
    return _searchResult.renderExplain();
  };
})(this));
