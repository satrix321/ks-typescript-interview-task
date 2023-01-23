import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { IItem } from "types";
import { Routes } from "~/constants";
import itemHasOldPassword from "~/utils/itemHasOldPassword";
import itemHasReusedPassword from "~/utils/itemHasReusedPassword";
import itemHasWeakPassword from "~/utils/itemHasWeakPassword";
import logout from "~/services/logout";

import "./header.scss";

type HeaderProps = {
  items: Array<IItem>;
  username: string;
};

const Header = ({ items, username }: HeaderProps) => {
  const { push } = useHistory();

  const vulnerableItemsCount = useMemo<number>(() => {
    return items.filter((item) => {
      if (itemHasWeakPassword(item)) return true;
      if (itemHasReusedPassword(item, items)) return true;
      if (itemHasOldPassword(item)) return true;
      return false;
    }).length;
  }, [items]);

  const handleLogout = async () => {
    await logout();
    push(Routes.Login);
  };

  return (
    <div className="header">
      <div className="user-section">
        <button onClick={handleLogout}>{`Logout ${username}`}</button>
      </div>
      <h1>{`${vulnerableItemsCount} Items are vulnerable`}</h1>
      <span>Create new complex passwords to protect your accounts</span>
    </div>
  );
};

export default Header;
