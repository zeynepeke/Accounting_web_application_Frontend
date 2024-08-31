import { API_BASE_URL } from './config';

export const fetchUserProfile = async (userID: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Users/${userID}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userID: number, profileData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Users/update-profile/${userID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    const responseText = await response.text(); // Yanıtı metin olarak oku

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Yanıtın JSON formatında olup olmadığını kontrol et
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return JSON.parse(responseText);
    } else {
      console.error("Non-JSON response received:", responseText);
      throw new Error("API did not return JSON.");
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};




// Delete user profile by userID
export const deleteUserProfile = async (userID: number, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Users/delete-profile/${userID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }), // JSON formatının doğru olduğundan emin olun
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response;
  } catch (error) {
    console.error('Error deleting user profile:', error);
    throw error;
  }
};
