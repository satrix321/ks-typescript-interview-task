import { IItem } from "../../types";
import { passwords } from "../data";

const items: Array<IItem> = [];

export const updateItem = (item: IItem) => {
  items.push(item);
};

export const getItems = (): Array<IItem> => {
  return passwords.map((passwordItem) => {
    const updatedItem = items.find(({ id }) => id === passwordItem.id);

    return {
      ...(updatedItem || passwordItem),
    };
  });
};
