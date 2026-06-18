import { injectSharedElements, setAuthSession, showToast } from '../../../shared/utils.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Inject nav header/footer templating
  await injectSharedElements();

  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.noValidate = true;
    registerForm.setAttribute('novalidate', 'novalidate');
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleRegister(e);
    });
  }
});

async function handleRegister(e) {
  e.preventDefault();

  const fullNameInput = document.getElementById('full-name-input');
  const emailInput = document.getElementById('email-input');
  const phoneInput = document.getElementById('phone-input');
  const passwordInput = document.getElementById('password-input');
  const confirmPasswordInput = document.getElementById('confirm-password-input');
  const termsCheckbox = document.getElementById('terms-checkbox');
  const submitBtn = document.getElementById('btn-register');

  if (!fullNameInput || !emailInput || !passwordInput || !confirmPasswordInput) return;

  const full_name = fullNameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const password = passwordInput.value;
  const confirm_password = confirmPasswordInput.value;

  // Validation
  if (password.length < 6) {
    showToast('Mật khẩu phải dài ít nhất 6 ký tự.', true);
    return;
  }

  if (password !== confirm_password) {
    showToast('Mật khẩu xác nhận không trùng khớp.', true);
    return;
  }

  if (!termsCheckbox.checked) {
    showToast('Bạn phải đồng ý với Điều khoản dịch vụ.', true);
    return;
  }

  try {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Đang tạo tài khoản...</span>';

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        full_name,
        email,
        phone,
        password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Đăng ký tài khoản thất bại.');
    }

    // Success registration & login
    setAuthSession(data.user, data.token);
    showToast('Đăng ký thành công! Chào mừng thám hiểm gia mới.');

    // Redirect to profile page after delay
    setTimeout(() => {
      window.location.href = '/profile';
    }, 1500);

  } catch (error) {
    console.error('Registration action error:', error);
    showToast(error.message, true);
    
    // Enable button again
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Đăng Ký</span>';
  }
}
