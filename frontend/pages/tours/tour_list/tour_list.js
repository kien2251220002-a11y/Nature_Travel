import { injectSharedElements, formatVND, showToast } from '../../../shared/utils.js';

let allTours = [];
let filteredTours = [];
let currentPage = 1;
const itemsPerPage = 6;

document.addEventListener('DOMContentLoaded', async () => {
  // Inject nav header and footer
  await injectSharedElements();

  // Read URL query parameters passed from Homepage search forms
  parseUrlQueryParams();

  // Load initial list from backend
  await fetchTours();

  // Attach search dynamic filter listeners
  const filterForm = document.getElementById('filter-form');
  if (filterForm) {
    filterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      currentPage = 1; // Reset to page 1 on filter trigger
      applyClientFilters();
    });
  }

  // Reset filter listener
  const resetBtn = document.getElementById('btn-reset-filters');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (filterForm) filterForm.reset();
      currentPage = 1;
      applyClientFilters();
    });
  }

  // Pagination triggers
  const prevBtn = document.getElementById('btn-pagination-prev');
  const nextBtn = document.getElementById('btn-pagination-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderToursGrid();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const maxPage = Math.ceil(filteredTours.length / itemsPerPage);
      if (currentPage < maxPage) {
        currentPage++;
        renderToursGrid();
      }
    });
  }
});

// Take parameters from URL query string if any and fill them into input boxes
function parseUrlQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const search = params.get('search');
  const location = params.get('location');
  const maxPrice = params.get('maxPrice');

  if (search) {
    const searchBox = document.getElementById('search-input-box');
    if (searchBox) searchBox.value = search;
  }
  if (location) {
    const locBox = document.getElementById('filter-location');
    if (locBox) locBox.value = location;
  }
  if (maxPrice) {
    const prBox = document.getElementById('filter-price');
    if (prBox) prBox.value = maxPrice;
  }
}

// Initial pull of tours databases
async function fetchTours() {
  try {
    const response = await fetch('/api/tours');
    if (!response.ok) {
      throw new Error('Nạp danh sách Tour từ máy chủ thất bại.');
    }
    allTours = await response.json();
    
    // Apply filters based on initial inputs
    applyClientFilters();

  } catch (error) {
    console.error('Fetch tours failure:', error);
    showToast(error.message, true);
    const gridEl = document.getElementById('tours-grid-container');
    if (gridEl) {
      gridEl.innerHTML = '<p class="text-center text-danger">Không thể kết nối danh sách. Vui lòng thử lại.</p>';
    }
  }
}

// Client-side filtering logic to maintain instant performance
function applyClientFilters() {
  const searchBox = document.getElementById('search-input-box');
  const locBox = document.getElementById('filter-location');
  const priceBox = document.getElementById('filter-price');
  const ratingBox = document.getElementById('filter-rating');

  const keyword = searchBox ? searchBox.value.trim().toLowerCase() : '';
  const location = locBox ? locBox.value : '';
  const maxPriceVal = priceBox ? priceBox.value : '';
  const minRatingVal = ratingBox ? ratingBox.value : '';

  filteredTours = allTours.filter(tour => {
    // 1. Keyword check (in title, description, or location)
    if (keyword) {
      const titleMatch = tour.name.toLowerCase().includes(keyword);
      const descMatch = tour.description.toLowerCase().includes(keyword);
      const locMatch = tour.location.toLowerCase().includes(keyword);
      if (!titleMatch && !descMatch && !locMatch) return false;
    }

    // 2. Location matches
    if (location && !tour.location.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }

    // 3. Price check
    if (maxPriceVal) {
      const maxPrice = parseFloat(maxPriceVal);
      if (tour.price > maxPrice) return false;
    }

    // 4. Rating check
    if (minRatingVal) {
      const minRating = parseFloat(minRatingVal);
      if (tour.rating < minRating) return false;
    }

    return true;
  });

  // Re-display
  renderToursGrid();
}

// Render paginated results
function renderToursGrid() {
  const gridEl = document.getElementById('tours-grid-container');
  const countEl = document.getElementById('results-count-text');

  if (!gridEl) return;

  // Update counts
  if (countEl) {
    countEl.textContent = `Hiển thị ${filteredTours.length} của tất cả ${allTours.length} Tour du lịch sinh thái`;
  }

  if (filteredTours.length === 0) {
    gridEl.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 4rem 1rem;" class="text-center">
        <span style="font-size: 3rem;">🍂</span>
        <h3 class="mt-2">Không Có Trùng Khớp Nào</h3>
        <p class="text-muted mt-1">Xin vui lòng xả bớt bộ lọc hoặc thay đổi cụm từ khóa tìm kiếm khác.</p>
      </div>
    `;
    updatePaginationUI(0);
    return;
  }

  // Calculate pages slices
  const totalItems = filteredTours.length;
  const maxPages = Math.ceil(totalItems / itemsPerPage);
  
  if (currentPage > maxPages) currentPage = maxPages || 1;

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const pagedList = filteredTours.slice(startIdx, endIdx);

  gridEl.innerHTML = ''; // Clean grid spinner

  pagedList.forEach(tour => {
    const fullStars = Math.floor(tour.rating);
    let starIcons = '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);

    const html = `
      <article class="tour-card card" id="tour-card-${tour.id}">
        <div class="tour-card-header">
          <img src="${tour.image}" alt="${tour.name}" loading="lazy" referrerPolicy="no-referrer">
          <span class="tour-badge">${tour.duration}</span>
        </div>
        <div class="tour-card-body">
          <div class="tour-location-box">
            <span>📍</span> <span>${tour.location}</span>
          </div>
          <h3 class="tour-card-title">${tour.name}</h3>
          <p class="tour-card-desc">${tour.description}</p>
          
          <div class="tour-meta">
            <div class="tour-price-box">
              <span class="label">Giá chỉ từ</span>
              <span class="price">${formatVND(tour.price)}</span>
            </div>
            <div class="text-right">
              <div class="stars mb-4" title="Đánh giá: ${tour.rating} sao" aria-label="${tour.rating} sao">${starIcons}</div>
              <a href="/tour-detail?id=${tour.id}" class="btn btn-secondary btn-sm" id="btn-view-detail-${tour.id}">Chi Tiết</a>
            </div>
          </div>
        </div>
      </article>
    `;
    gridEl.insertAdjacentHTML('beforeend', html);
  });

  // Rebuild navigation numbers
  updatePaginationUI(maxPages);
}

function updatePaginationUI(maxPages) {
  const prevBtn = document.getElementById('btn-pagination-prev');
  const nextBtn = document.getElementById('btn-pagination-next');
  const pNums = document.getElementById('page-numbers');

  if (!pNums) return;

  pNums.innerHTML = '';

  if (maxPages <= 1) {
    if (prevBtn) prevBtn.disabled = true;
    if (nextBtn) nextBtn.disabled = true;
    return;
  }

  // Prev limit
  if (prevBtn) prevBtn.disabled = (currentPage === 1);
  // Next limit
  if (nextBtn) nextBtn.disabled = (currentPage === maxPages);

  // Generate numbers
  for (let i = 1; i <= maxPages; i++) {
    const btn = document.createElement('button');
    btn.className = 'btn btn-sm page-btn ' + (i === currentPage ? 'btn-primary active' : 'btn-outline');
    btn.textContent = i;
    btn.addEventListener('click', () => {
      currentPage = i;
      renderToursGrid();
      window.scrollTo({ top: 300, behavior: 'smooth' });
    });
    pNums.appendChild(btn);
  }
}
