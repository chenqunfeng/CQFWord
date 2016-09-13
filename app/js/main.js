var _searchResult, _topBanner, close, ipcRenderer, searchResult, topBanner;

ipcRenderer = require('electron').ipcRenderer;

topBanner = require('../js/common/TopBanner');

searchResult = require('../js/common/SearchResult');

close = document.querySelector('.close');

close && close.addEventListener('click', (function(_this) {
  return function() {
    return ipcRenderer.send('close-main-window');
  };
})(this));

_topBanner = new topBanner('.topBanner');

_topBanner.render();

_searchResult = new searchResult('.currentPage');

_topBanner.subscribe('getExplain', (function(_this) {
  return function(publisher, type, data) {
    _searchResult.render();
    _searchResult.setData(data);
    return _searchResult.renderExplain();
  };
})(this));

_searchResult.subscribe('reSearch', (function(_this) {
  return function(publisher, type, data) {
    return _topBanner.getExplain(data);
  };
})(this));
