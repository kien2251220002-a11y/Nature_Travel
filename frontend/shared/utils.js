/**
 * Nature Travel Tour - Common Utilities for Modern Vanilla JS
 */

// Local Storage helpers for Authentication
export function getAuthToken() {
  return localStorage.getItem('token');
}

export function getAuthUser() {
  const userJson = localStorage.getItem('user');
  try {
    return userJson ? JSON.parse(userJson) : null;
  } catch (e) {
    return null;
  }
}

export function setAuthSession(user, token) {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
}

export function clearAuthSession() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}

// Check logged in state on protected routes
export function checkAuthAndRedirect() {
  const token = getAuthToken();
  if (!token) {
    showToast('Vui lòng đăng nhập để truy cập trang này.', true);
    setTimeout(() => {
      window.location.href = '/login';
    }, 1500);
    return false;
  }
  return true;
}

// Universal Toast feedback notification
export function showToast(message, isError = false) {
  let toastEl = document.getElementById('toast-notification');
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.id = 'toast-notification';
    toastEl.className = 'toast';
    document.body.appendChild(toastEl);
  }

  toastEl.textContent = message;
  toastEl.className = 'toast show ' + (isError ? 'error' : 'success');

  setTimeout(() => {
    toastEl.classList.remove('show');
  }, 3500);
}

// Inject Shared Navbar and Footer Templates
export async function injectSharedElements() {
  try {
    // 1. Inject Navbar
    const navbarContainer = document.getElementById('navbar');
    if (navbarContainer) {
      const response = await fetch('/shared/navbar.html');
      if (response.ok) {
        navbarContainer.innerHTML = await response.text();
        setupNavbarInteractivity();
      }
    }

    // 2. Inject Footer
    const footerContainer = document.getElementById('footer');
    if (footerContainer) {
      const response = await fetch('/shared/footer.html');
      if (response.ok) {
        footerContainer.innerHTML = await response.text();
      }
    }
  } catch (error) {
    console.error('Failed to load shared templates:', error);
  }
}

// Setup Hamburger & Logged-In Display states
function setupNavbarInteractivity() {
  // Mobile menu drawers
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.classList.toggle('open');
      navMenu.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // Dynamic login status
  const user = getAuthUser();
  const token = getAuthToken();
  
  const guestGroup = document.getElementById('auth-guest');
  const loggedInGroup = document.getElementById('auth-logged-in');
  const usernameDisplay = document.getElementById('nav-username');
  const logoutBtn = document.getElementById('nav-logout');

  if (token && user) {
    if (guestGroup) guestGroup.classList.add('hidden');
    if (loggedInGroup) {
      loggedInGroup.classList.remove('hidden');
      if (usernameDisplay) usernameDisplay.textContent = user.full_name;
    }
  } else {
    if (guestGroup) guestGroup.classList.remove('hidden');
    if (loggedInGroup) loggedInGroup.classList.add('hidden');
  }

  // Logout handler
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      clearAuthSession();
      showToast('Đăng xuất thành công. Đang chuyển trang...');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    });
  }

  // Set active class based on current window location
  highlightActiveNavLink();
}

function highlightActiveNavLink() {
  const currentPath = window.location.pathname;
  const homeLink = document.getElementById('nav-home');
  const toursLink = document.getElementById('nav-tours');
  const profileLink = document.getElementById('nav-profile');

  // Remove existing actives
  if (homeLink) homeLink.classList.remove('active');
  if (toursLink) toursLink.classList.remove('active');
  if (profileLink) profileLink.classList.remove('active');

  if (currentPath === '/' || currentPath === '/index.html') {
    if (homeLink) homeLink.classList.add('active');
  } else if (currentPath.startsWith('/tours') || currentPath.startsWith('/tour-detail')) {
    if (toursLink) toursLink.classList.add('active');
  } else if (currentPath.startsWith('/profile')) {
    if (profileLink) profileLink.classList.add('active');
  }
}

// Numeric formatting helper
export function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}
