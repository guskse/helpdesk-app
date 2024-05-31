import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

//check if user is logged in (authenticated)
const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  //redux get user state
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    //if logged in
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setCheckingStatus(false);
  }, [user]);

  return { loggedIn, checkingStatus };
};

export default useAuthStatus;
