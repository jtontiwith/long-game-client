export const loadAuthToken = () => {
  //return localStorage.getItem('authToken');
  //return localStorage.getItem('userId');
  return {
    authToken: localStorage.getItem('authToken'),
    userId: localStorage.getItem('userId'),
    startDate: localStorage.getItem('startDate'),
    endDate: localStorage.getItem('endDate')
  }
};

export const saveAuthToken = (authToken, userId, startDate, endDate) => {
  try { 
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('userId', userId);
      localStorage.setItem('startDate', startDate);
      localStorage.setItem('endDate', endDate);
  } catch (e) {}
};

export const clearAuthToken = () => {
  try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
  } catch (e) {}
};

//remember that's it wrapped in try for Safari 