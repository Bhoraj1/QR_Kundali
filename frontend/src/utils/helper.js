import Cookies from "js-cookie";
export const isAuth = () => {
  if (typeof window !== "undefined") { // Ensure window is defined
    const cookieChecked = Cookies.get("token"); // Get the token from cookies
     if (cookieChecked) {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user); // Return the parsed user object from local storage
      } 
       // If no user object, check for an email only (OAuth login)
       const email = localStorage.getItem("email");
       if (email) {
         return { email }; // Return the email as an object
       }
      else {
        return false; // If no user found in localStorage
      }
    }
  }
  return false; // If window is not defined or no cookie/token is present
};
