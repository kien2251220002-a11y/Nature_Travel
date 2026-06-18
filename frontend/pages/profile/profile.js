import { injectSharedElements, getAuthUser, getAuthToken, checkAuthAndRedirect, formatVND, showToast } from '../../shared/utils.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Inject nav header/footer templates
  await injectSharedElements();

  // Route guard
  if (!checkAuthAndRedirect()) {
    return;
  }

  // Load User Details
  await loadProfileInformation();

  // Load User Booking Bills list
  await loadBookingList();

  // Handle Profile Update Form
  const editForm = document.getElementById('profile-edit-form');
  if (editForm) {
    editForm.noValidate = true;
    editForm.setAttribute('novalidate', 'novalidate');
    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleProfileUpdate(e);
    });
  }
});

async function loadProfileInformation() {
  const token = getAuthToken();
  const userNameHeader = document.getElementById('profile-name');
  const userEmailHeader = document.getElementById('profile-email');
  const nameInput = document.getElementById('profile-fullname-input');
  const phoneInput = document.getElementById('profile-phone-input');

  try {
    const response = await fetch('/api/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Không thể nạp thông tin hồ sơ của bạn.');
    }

    const user = await response.json();

    // Render details
    if (userNameHeader) userNameHeader.textContent = user.full_name;
    if (userEmailHeader) userEmailHeader.textContent = `${user.email} | Thám viên bản địa`;
    if (nameInput) nameInput.value = user.full_name;
    if (phoneInput) phoneInput.value = user.phone || '';

    // Cache updated profile info in localstorage
    localStorage.setItem('user', JSON.stringify(user));

  } catch (error) {
    console.error('Error loading account profiles:', error);
    showToast(error.message, true);
  }
}

async function loadBookingList() {
  const token = getAuthToken();
  const historyList = document.getElementById('booking-history-table');

  if (!historyList) return;

  try {
    const response = await fetch('/api/profile/bookings', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Nạp nhật ký thám hiểm lỗi.');
    }

    const bookings = await response.json();

    if (bookings.length === 0) {
      historyList.innerHTML = `
        <div class="card text-center" style="padding: 3rem 1.5rem;">
          <span style="font-size: 2.5rem;">🎒</span>
          <h4 class="mt-2 text-primary">Bạn Chưa Có Chuyến Đi Nào</h4>
          <p class="text-muted mt-1">Khám phá bản đồ tour sinh thái lộng lẫy và lưu dấu ấn đầu tiên ngay thôi!</p>
          <a href="/tours" class="btn btn-primary btn-sm mt-4" style="display: inline-flex;">Chọn Tour Hoang Sơ</a>
        </div>
      `;
      return;
    }

    historyList.innerHTML = ''; // Clear loading spinner

    bookings.forEach(invoice => {
      // Build format dates
      const formattedDate = new Date(invoice.booking_date).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const html = `
        <article class="history-ticket-item card" id="invoice-ticket-${invoice.id}">
          <div class="ticket-thumb">
            <img src="${invoice.tour_image}" alt="${invoice.tour_name}" loading="lazy" referrerPolicy="no-referrer">
          </div>
          
          <div class="ticket-details">
            <h3 class="ticket-detail-title">${invoice.tour_name}</h3>
            
            <div class="ticket-meta-grid">
              <div>📍 Vùng miền: <strong>${invoice.tour_location}</strong></div>
              <div>⏳ Thời lượng: <strong>${invoice.tour_duration}</strong></div>
              <div>📅 Ngày đón: <strong>${formattedDate}</strong></div>
              <div>👥 Thành viên: <strong>${invoice.adults} lớn, ${invoice.children} trẻ em</strong></div>
            </div>
            
            ${invoice.note ? `<div class="text-muted text-xs mt-2" style="font-style: italic;">📝 Lời nhắn: "${invoice.note}"</div>` : ''}
          </div>

          <div class="ticket-billing-box">
            <span class="ticket-status">Đã Xác Nhận</span>
            <span class="text-xs text-muted">Hóa đơn trọn gói:</span>
            <span class="ticket-total">${formatVND(invoice.total_price)}</span>
          </div>
        </article>
      `;
      historyList.insertAdjacentHTML('beforeend', html);
    });

  } catch (error) {
    console.error('Error fetching transaction tables:', error);
    historyList.innerHTML = '<p class="text-center text-danger">Không thể nạp dữ liệu hóa đơn giao dịch.</p>';
  }
}

async function handleProfileUpdate(e) {
  e.preventDefault();

  const token = getAuthToken();
  const nameInput = document.getElementById('profile-fullname-input');
  const phoneInput = document.getElementById('profile-phone-input');
  const submitBtn = document.getElementById('profile-update-btn');

  if (!nameInput) return;

  const full_name = nameInput.value.trim();
  const phone = phoneInput ? phoneInput.value.trim() : '';

  if (!full_name) {
    showToast('Tên của bạn không được để trống.', true);
    return;
  }

  try {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Đang lưu thay đổi...</span>';

    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ full_name, phone })
    });

    const updatedUser = await response.json();

    if (!response.ok) {
      throw new Error(updatedUser.error || 'Cập nhật hồ sơ thất bại.');
    }

    showToast('Hồ sơ của bạn đã được cập nhật thành công!');

    // Update headers and inputs
    const userNameHeader = document.getElementById('profile-name');
    if (userNameHeader) userNameHeader.textContent = updatedUser.full_name;

    // Cache in localstorage
    localStorage.setItem('user', JSON.stringify(updatedUser));

  } catch (error) {
    console.error('Profile edit error:', error);
    showToast(error.message, true);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Lưu Thay Đổi Thám Hiểm</span>';
  }
}
