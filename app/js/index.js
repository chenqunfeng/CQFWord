var _familiarBook, _saying, _unfamiliarBook, familiarBook, saying, unfamiliarBook;

unfamiliarBook = require('../js/common/UnfamiliarBook');

familiarBook = require('../js/common/FamiliarBook');

saying = require('../js/common/SayingCollection');

_unfamiliarBook = new unfamiliarBook('.currentPage', 'unfamiliarBook');

_familiarBook = new familiarBook('.currentPage', 'familiarBook');

_saying = new saying('.saying');

_unfamiliarBook.render();

_familiarBook.render();
