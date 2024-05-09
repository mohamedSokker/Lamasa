import axios from "../api/axios";
import { useMainContext } from "../contexts/MainContext";

const useRefreshToken = () => {
  const { setToken, setUsersData } = useMainContext();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setToken(response.data.token);
    setUsersData(response.data.user);
    return response.data.token;
  };
  return refresh;
};

export default useRefreshToken;
