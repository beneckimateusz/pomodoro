export const saveAuthToken = (token) => {
  localStorage.setItem('token', token);
};

export const getAuthToken = () => localStorage.getItem('token');
