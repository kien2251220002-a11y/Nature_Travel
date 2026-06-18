import { profileRepository } from '../repositories/profileRepository.js';

export const profileService = {
  async getUserProfile(userId) {
    const profile = await profileRepository.getProfile(userId);
    if (!profile) {
      throw new Error('Tài khoản người dùng không tồn tại.');
    }
    return profile;
  },

  async updateUserProfile(userId, { fullName, phone }) {
    if (!fullName || fullName.trim() === '') {
      throw new Error('Tên hiển thị không được để trống.');
    }
    const success = await profileRepository.updateProfile(userId, { fullName, phone });
    if (!success) {
      throw new Error('Cập nhật hồ sơ thất bại.');
    }
    return await profileRepository.getProfile(userId);
  }
};
