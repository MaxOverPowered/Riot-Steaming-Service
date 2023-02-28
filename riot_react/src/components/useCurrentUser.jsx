import { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../constants";

export default function useCurrentUser() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return isLoggedIn;
}
