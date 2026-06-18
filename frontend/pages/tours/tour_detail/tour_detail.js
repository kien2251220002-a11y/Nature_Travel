import { injectSharedElements, formatVND, showToast } from '../../../shared/utils.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Inject nav header/footer templating
  await injectSharedElements();

  // Extract ID param
  const urlParams = new URLSearchParams(window.location.search);
  const tourId = urlParams.get('id');

  if (!tourId) {
    showToast('Không tìm thấy ID Tour hợp lệ. Đang quay lại trang Tours...', true);
    setTimeout(() => {
      window.location.href = '/tours';
    }, 1500);
    return;
  }

  // Load Tour details from database
  await loadTourDetail(tourId);

  // Setup Accordion Interactions
  setupAccordion();
});

async function loadTourDetail(id) {
  try {
    const response = await fetch(`/api/tours/${id}`);
    if (!response.ok) {
      throw new Error('Không thể kết nối máy chủ dữ liệu Tour.');
    }

    const tour = await response.json();

    // 1. Update text content
    const titleEl = document.getElementById('tour-detail-title');
    const locTextEl = document.getElementById('tour-detail-location-text');
    const durationBadgeEl = document.getElementById('tour-detail-badge-duration');
    const descEl = document.getElementById('tour-detail-desc');
    const priceEl = document.getElementById('tour-detail-price');
    const bannerPanel = document.getElementById('tour-detail-banner-panel');
    const mainGalImg = document.getElementById('main-gal-img');
    const bookBtn = document.getElementById('btn-book-tour');

    if (titleEl) titleEl.textContent = tour.name;
    if (locTextEl) locTextEl.textContent = `📍 ${tour.location}`;
    if (durationBadgeEl) durationBadgeEl.textContent = `⏳ ${tour.duration}`;
    if (descEl) descEl.textContent = tour.description;
    if (priceEl) priceEl.textContent = formatVND(tour.price);
    
    // Update booking CTA routing to pass tour id
    if (bookBtn) {
      bookBtn.setAttribute('href', `/booking?tourId=${tour.id}`);
    }

    // Update banner and galleries image sources
    if (bannerPanel) {
      bannerPanel.style.backgroundImage = `url('${tour.image}')`;
    }
    if (mainGalImg) {
      mainGalImg.setAttribute('src', tour.image);
      mainGalImg.setAttribute('alt', tour.name);
    }

  } catch (error) {
    console.error('Failed to load tour details:', error);
    showToast('Tải chi tiết Tour thất bại. Đang quay lại...', true);
    setTimeout(() => {
      window.location.href = '/tours';
    }, 1500);
  }
}

function setupAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  
  items.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const indicator = item.querySelector('.acc-indicator');

    if (trigger) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        
        // Fold all others first (Accordion behavior)
        items.forEach(otherItem => {
          otherItem.classList.remove('open');
          const otherTrigger = otherItem.querySelector('.accordion-trigger');
          const otherIndicator = otherItem.querySelector('.acc-indicator');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherIndicator) otherIndicator.innerHTML = '&#x2b;'; // plus sign
        });

        if (!isOpen) {
          item.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
          if (indicator) indicator.innerHTML = '&#x2212;'; // minus sign
        } else {
          item.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
          if (indicator) indicator.innerHTML = '&#x2b;'; // plus sign
        }
      });
    }
  });
}
