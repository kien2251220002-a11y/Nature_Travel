import { injectSharedElements, formatVND, showToast } from '../../shared/utils.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Inject navigation headers & footers dynamically
  await injectSharedElements();

  // Load featured high-rated tours from backend API
  await loadFeaturedTours();
});

async function loadFeaturedTours() {
  const gridEl = document.getElementById('featured-tours-grid');
  if (!gridEl) return;

  try {
    const response = await fetch('/api/tours');
    if (!response.ok) {
      throw new Error('Không thể kết nối danh sách tours du lịch.');
    }

    const tours = await response.ok ? await response.json() : [];
    
    if (tours.length === 0) {
      gridEl.innerHTML = '<p class="text-center text-muted">Hiện tại chưa có tours được cập nhật.</p>';
      return;
    }

    // Filter or sort by top rating, slice first 3
    const featured = tours
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);

    gridEl.innerHTML = ''; // Clear loading placeholder

    featured.forEach(tour => {
      // Build rating stars
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

  } catch (error) {
    console.error('Error loading tours:', error);
    gridEl.innerHTML = '<p class="text-center text-danger">Có lỗi khi kết bối dữ liệu. Vui lòng tải lại trang.</p>';
    showToast('Tải tours thất bại!', true);
  }
}
