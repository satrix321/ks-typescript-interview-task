import List from "./components/List/List";
import useItemsProvider from "./useItemsProvider";
import ErrorBlock from "../ErrorBlock";
import Filter from "./components/Filter/Filter";
import Header from "./components/Header/Header";
import { Route, Switch } from "react-router-dom";
import { Routes } from "~/constants";
import itemHasWeakPassword from "~/utils/itemHasWeakPassword";
import itemHasReusedPassword from "~/utils/itemHasReusedPassword";
import itemHasOldPassword from "~/utils/itemHasOldPassword";
import { useUserContext } from "../UserContext";
import Overlay from "../Overlay/Overlay";
import Loader from "../Loader/Loader";

const PasswordHealth = () => {
  const {
    errorMessage: userProviderErrorMessage,
    isLoading: userDataIsLoading,
    username,
  } = useUserContext();

  const { items, isLoading, errorMessage, reloadData } = useItemsProvider();

  if (userProviderErrorMessage || errorMessage) {
    return <ErrorBlock error={userProviderErrorMessage || errorMessage} />;
  }

  return (
    <>
      {isLoading || userDataIsLoading ? (
        <Overlay>
          <Loader />
        </Overlay>
      ) : null}
      <div className="container">
        <Header items={items} username={username} />
        <Filter items={items} />
        <Switch>
          <Route exact path={Routes.PasswordHealth}>
            <List
              items={items.filter(
                (item) =>
                  itemHasWeakPassword(item) ||
                  itemHasReusedPassword(item, items) ||
                  itemHasOldPassword(item)
              )}
              reloadData={reloadData}
            />
          </Route>
          <Route path={Routes.Weak}>
            <List
              items={items.filter(itemHasWeakPassword)}
              reloadData={reloadData}
            />
          </Route>
          <Route path={Routes.Reused}>
            <List
              items={items.filter((item) => itemHasReusedPassword(item, items))}
              reloadData={reloadData}
            />
          </Route>
          <Route path={Routes.Old}>
            <List
              items={items.filter(itemHasOldPassword)}
              reloadData={reloadData}
            />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default PasswordHealth;
