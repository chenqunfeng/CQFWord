ipcRenderer = require('electron').ipcRenderer;
topBanner = require '../js/common/TopBanner'
searchResult = require '../js/common/SearchResult'

close = document.querySelector('.close')
close and close.addEventListener 'click', () =>
    ipcRenderer.send('close-main-window')

_topBanner = new topBanner '.topBanner'
_topBanner.render()

_searchResult = new searchResult '.currentPage'
_topBanner.subscribe 'getExplain', (publisher, type, data) =>
    _searchResult.render()
    _searchResult.setData data
    _searchResult.renderExplain()

_searchResult.subscribe 'reSearch', (publisher, type, data) =>
    _topBanner.getExplain data
