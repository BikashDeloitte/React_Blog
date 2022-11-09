//check user is login or not
export const isLoggedIn = () => {
  //checking in local storage for user data which key is data
  let data = localStorage.getItem("data");
  return data == null ? false : true;
};

//store token to local stroage( when user login)
export const doLoggedIn = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
};

//remove token from local storage (when user logout)
export const doLoggedOut = () => {
  localStorage.removeItem("data");
};

//get current user data
export const currentUser = () => {
  if (isLoggedIn) {
    return JSON.parse(localStorage("data")).userData;
  } else {
    return false;
  }
};
