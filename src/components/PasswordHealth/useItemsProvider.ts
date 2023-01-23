import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IItem } from "types";
import { Routes } from "~/constants";
import { AuthError } from "~/error";
import logout from "~/services/logout";
import getUserItems from "../../services/getUserItems";

const userItemsProvider = () => {
  const { push } = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [items, setItems] = useState<Array<IItem>>([]);

  const reloadData = useCallback(() => {
    return (async () => {
      setIsLoading(true);

      try {
        const userItems = await getUserItems();

        setItems(userItems);
      } catch (error) {
        if (error instanceof AuthError) {
          await logout();
          push(Routes.Login);
          return;
        } else {
          setErrorMessage(error.message);
        }
      }

      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    reloadData();
  }, []);

  return {
    isLoading,
    errorMessage,
    items,
    reloadData,
  };
};

export default userItemsProvider;
