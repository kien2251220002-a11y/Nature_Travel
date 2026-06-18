"""
Locator constants for the Tour List page.
Use these constants in Robot keywords or Python page objects.

Format examples for SeleniumLibrary: 'id=search-input-box', 'css:.tour-card', 'xpath=//h1'
"""

SEARCH_INPUT = 'id=search-input-box'
FILTER_LOCATION = 'id=filter-location'
FILTER_PRICE = 'id=filter-price'
FILTER_RATING = 'id=filter-rating'
BTN_APPLY_FILTERS = 'id=btn-apply-filters'
BTN_RESET_FILTERS = 'id=btn-reset-filters'

TOURS_GRID = 'id=tours-grid-container'
RESULTS_COUNT = 'id=results-count-text'
PAGINATION_PREV = 'id=btn-pagination-prev'
PAGINATION_NEXT = 'id=btn-pagination-next'
PAGE_NUMBERS = 'id=page-numbers'

# Generic tour card selectors (dependent on frontend implementation)
TOUR_CARD = 'css:.tour-card'
TOUR_CARD_TITLE = 'css:.tour-card .card-title'
TOUR_CARD_PRICE = 'css:.tour-card .card-price'
TOUR_CARD_BOOK_BTN = 'css:.tour-card .btn-book'
