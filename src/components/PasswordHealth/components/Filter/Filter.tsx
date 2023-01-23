import { useMemo } from "react";
import { IItem } from "types";
import { Routes } from "~/constants";
import itemHasOldPassword from "~/utils/itemHasOldPassword";
import itemHasReusedPassword from "~/utils/itemHasReusedPassword";
import itemHasWeakPassword from "~/utils/itemHasWeakPassword";
import FilterTab from "./components/FilterTab";

import "./filter.scss";

type FilterProps = {
  items: Array<IItem>;
};

const calculateWeakItemsCount = (items: Array<IItem>) =>
  items.reduce(
    (count, item) => (itemHasWeakPassword(item) ? count + 1 : count),
    0
  );

const calculateReusedItemsCount = (items: Array<IItem>) =>
  items.reduce(
    (count, item) => (itemHasReusedPassword(item, items) ? count + 1 : count),
    0
  );

const calculateOldItemsCount = (items: Array<IItem>) =>
  items.reduce(
    (count, item) => (itemHasOldPassword(item) ? count + 1 : count),
    0
  );

const Filter = ({ items }: FilterProps) => {
  const weakItemsCount = useMemo<number>(
    () => calculateWeakItemsCount(items),
    [items]
  );
  const reusedItemsCount = useMemo<number>(
    () => calculateReusedItemsCount(items),
    [items]
  );
  const oldItemsCount = useMemo<number>(
    () => calculateOldItemsCount(items),
    [items]
  );

  return (
    <div className="filter">
      <FilterTab title="Weak" count={weakItemsCount} path={Routes.Weak} />
      <FilterTab title="Reused" count={reusedItemsCount} path={Routes.Reused} />
      <FilterTab title="Old" count={oldItemsCount} path={Routes.Old} />
    </div>
  );
};

export default Filter;
