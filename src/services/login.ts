import { API, TOKEN_KEY } from "~/constants";
import getUrl from "../utils/getUrl";

const GENERIC_ERROR_MESSAGE = "Something went wrong, try again later";

const login = async (username: string, password: string) => {
  const url = getUrl(API.Login);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (response.status === 401) {
    throw new Error("Username/Password don't match!");
  } else if (response.status >= 400) {
    throw new Error(GENERIC_ERROR_MESSAGE);
  }

  try {
    const data = await response.json();
    const { token } = data;

    localStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    throw new Error(GENERIC_ERROR_MESSAGE);
  }
};

export default login;
