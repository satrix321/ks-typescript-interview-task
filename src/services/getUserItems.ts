import { API, TOKEN_KEY } from "~/constants";
import { AuthError } from "~/error";
import getUrl from "~/utils/getUrl";
import { IItem } from "../../types";

const getUserItems = async (): Promise<Array<IItem>> => {
  const url = getUrl(API.Items);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
    },
  });

  if (response.status === 401) {
    throw new AuthError("Something wen't wrong!");
  }

  const data = await response.json();

  return data.items;
};

export default getUserItems;
