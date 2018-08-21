export const loadAuthToken = () => {
  return localStorage.getItem('authToken');
  return localStorage.getItem('userId');
};

export const saveAuthToken = (authToken, userId) => {
  try { 
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('userId', userId);
  } catch (e) {}
};

export const clearAuthToken = () => {
  try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
  } catch (e) {}
};

//remember that's it wrapped in try for Safari 