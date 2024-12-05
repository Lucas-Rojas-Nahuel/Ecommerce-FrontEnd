export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  export const saveToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  export const clearToken = () => {
    localStorage.removeItem('token');
  };
  