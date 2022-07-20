const useToken = () => {
    const getToken = () => {
      const token = localStorage.getItem("token");
      return token;
    };
    const setToken = (token) => {
      localStorage.setItem("token", token);
    };
    const removeToken = () => {
      localStorage.removeItem("token");
    };
    const isAuthenticated = () => {
      return getToken() === "iknowyouwouldratethisasworldmostshittesttoken";
    };
    return {
      isAuthenticated,
      getToken,
      setToken,
      removeToken,
    };
  };
  
  export default useToken;