import { API, TOKEN_KEY } from "~/constants";
import getUrl from "~/utils/getUrl";

const logout = async () => {
  const token = localStorage.getItem(TOKEN_KEY);
  await fetch(getUrl(API.Logout), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  localStorage.removeItem(TOKEN_KEY);
};

export default logout;
