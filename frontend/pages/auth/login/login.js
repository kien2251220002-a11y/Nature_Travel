import { injectSharedElements, setAuthSession, showToast } from '../../../shared/utils.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Inject nav header/footer templating
  await injectSharedElements();

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.noValidate = true;
    loginForm.setAttribute('novalidate', 'novalidate');
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleLogin(e);
    });
  }
});

async function handleLogin(e) {
  e.preventDefault();

  const emailInput = document.getElementById('email-input');
  const passwordInput = document.getElementById('password-input');
  const submitBtn = document.getElementById('btn-login');

  if (!emailInput || !passwordInput) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    showToast('Vui lòng điền đầy đủ email và mật khẩu.', true);
    return;
  }

  try {
    // Disable inputs and show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Đang xác thực...</span>';

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Đăng nhập không thành công.');
    }

    // Success login
    setAuthSession(data.user, data.token);
    showToast('Đăng nhập thành công! Đang chuyển hướng...');

    // Redirect to profile page after delay
    setTimeout(() => {
      window.location.href = '/profile';
    }, 1200);

  } catch (error) {
    console.error('Login action error:', error);
    showToast(error.message, true);
    
    // Enable button again
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Đăng Nhập</span>';
  }
}
