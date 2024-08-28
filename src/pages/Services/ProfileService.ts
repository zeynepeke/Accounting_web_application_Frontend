// src/services/profileService.ts
import { API_BASE_URL } from './config';

export const fetchUserProfile = async () => {
  const response = await fetch(`${API_BASE_URL}/user/profile`);
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};

export const updateUserProfile = async (profileData: any) => {
  const response = await fetch(`${API_BASE_URL}/user/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};

export const deleteUserProfile = async (password: string) => {
  const response = await fetch(`${API_BASE_URL}/user/profile/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response;
};
