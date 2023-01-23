import { IItem } from "types";

const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000;

const itemHasOldPassword = (item: IItem) => {
  const timestampThirtyDaysAgo = new Date().getTime() - THIRTY_DAYS_IN_MS;

  const date = new Date(item.createdAt);

  return timestampThirtyDaysAgo > date.getTime();
};

export default itemHasOldPassword;
