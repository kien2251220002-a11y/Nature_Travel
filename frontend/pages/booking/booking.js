import { injectSharedElements, getAuthUser, getAuthToken, checkAuthAndRedirect, formatVND, showToast } from '../../shared/utils.js';

let selectedTour = null;
let tourPrice = 0;

document.addEventListener('DOMContentLoaded', async () => {
  // Inject nav header and footer templates
  await injectSharedElements();

  // Route protection - must be logged in
  if (!checkAuthAndRedirect()) {
    return;
  }

  // Parse check out ID
  const urlParams = new URLSearchParams(window.location.search);
  const tourId = urlParams.get('tourId');

  if (!tourId) {
    showToast('Vui lòng chọn một tour du lịch để đặt vé thám hiểm.', true);
    setTimeout(() => {
      window.location.href = '/tours';
    }, 1500);
    return;
  }

  // Load selected tour meta and start tracking prices
  await fetchTourMeta(tourId);

  // Setup reactive price calculation listeners
  const adultsInput = document.getElementById('adults-input');
  const childrenInput = document.getElementById('children-input');

  if (adultsInput) {
    adultsInput.addEventListener('input', updatePricingSummary);
  }
  if (childrenInput) {
    childrenInput.addEventListener('input', updatePricingSummary);
  }

  // Submit reservation form
  const reserveForm = document.getElementById('booking-reserve-form');
  if (reserveForm) {
    reserveForm.addEventListener('submit', (e) => handleBookingSubmit(e, tourId));
  }
});

async function fetchTourMeta(id) {
  try {
    const response = await fetch(`/api/tours/${id}`);
    if (!response.ok) {
      throw new Error('Không thể tải thông số kỹ thuật của Tour dã ngoại.');
    }

    selectedTour = await response.json();
    tourPrice = selectedTour.price;

    // Display selected details
    const nameEl = document.getElementById('display-tour-name');
    const locEl = document.getElementById('display-tour-location');
    const basePrEl = document.getElementById('summary-base-price');

    if (nameEl) nameEl.textContent = selectedTour.name;
    if (locEl) locEl.textContent = `📍 ${selectedTour.location} (${selectedTour.duration})`;
    if (basePrEl) basePrEl.textContent = formatVND(tourPrice);

    // Refresh receipt calculation
    updatePricingSummary();

  } catch (error) {
    console.error('Failed to grab tour overview:', error);
    showToast('Tải thông tin hành trình thất bại.', true);
  }
}

function updatePricingSummary() {
  if (!selectedTour) return;

  const adultsInput = document.getElementById('adults-input');
  const childrenInput = document.getElementById('children-input');

  const adultsVal = parseInt(adultsInput.value, 10) || 1;
  const childrenVal = parseInt(childrenInput.value, 10) || 0;

  // Compute breakdown line items
  const adultsTotal = tourPrice * adultsVal;
  const childrenTotal = (tourPrice * 0.5) * childrenVal;
  const grandTotal = adultsTotal + childrenTotal;

  // Update UI line labels and totals
  const adLabel = document.getElementById('summary-adults-label');
  const adTot = document.getElementById('summary-adults-total');
  const chLabel = document.getElementById('summary-children-label');
  const chTot = document.getElementById('summary-children-total');
  const grandTot = document.getElementById('summary-grand-total');

  if (adLabel) adLabel.textContent = `Người lớn (x${adultsVal}):`;
  if (adTot) adTot.textContent = formatVND(adultsTotal);

  if (chLabel) chLabel.textContent = `Trẻ em (x${childrenVal}):`;
  if (chTot) chTot.textContent = formatVND(childrenTotal);

  if (grandTot) grandTot.textContent = formatVND(grandTotal);
}

async function handleBookingSubmit(e, tourId) {
  e.preventDefault();

  const token = getAuthToken();
  const dateInput = document.getElementById('booking-date-input');
  const adultsInput = document.getElementById('adults-input');
  const childrenInput = document.getElementById('children-input');
  const noteInput = document.getElementById('booking-note-input');
  const submitBtn = document.getElementById('booking-submit-btn');

  if (!dateInput || !adultsInput || !childrenInput) return;

  const booking_date = dateInput.value;
  const adults = parseInt(adultsInput.value, 10) || 1;
  const children = parseInt(childrenInput.value, 10) || 0;
  const note = noteInput ? noteInput.value.trim() : '';

  // Minimal sanity check
  if (!booking_date) {
    showToast('Vui lòng chọn ngày khởi hành thám hiểm rừng rậm.', true);
    return;
  }

  try {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>⚡ Đang giao dịch bảo mật...</span>';

    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        tour_id: tourId,
        booking_date,
        adults,
        children,
        note
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Đặt chỗ nghỉ dưỡng không thành công.');
    }

    // Success reservation
    showToast('Hóa đơn đặt chỗ của bạn đã được xác thực thành công!');

    // Redirect to profile page's booking log section
    setTimeout(() => {
      window.location.href = '/profile';
    }, 1500);

  } catch (error) {
    console.error('Submit booking error:', error);
    showToast(error.message, true);
    
    // Enable button again
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Xác Nhận & Tiến Hành Thanh Toán</span>';
  }
}
