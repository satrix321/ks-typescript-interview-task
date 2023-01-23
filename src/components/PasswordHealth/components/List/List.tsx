import { useState } from "react";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import { IItem } from "types";
import ErrorBlock from "~/components/ErrorBlock";
import { Routes } from "~/constants";
import logout from "~/services/logout";
import updateItem from "~/services/updateItem";
import itemHasOldPassword from "~/utils/itemHasOldPassword";
import itemHasReusedPassword from "~/utils/itemHasReusedPassword";
import itemHasWeakPassword from "~/utils/itemHasWeakPassword";
import ItemIcon from "./components/ItemIcon";

import "./list.scss";

type ListProps = {
  items: Array<IItem>;
  reloadData: () => Promise<void>;
};

type UpdateModalProps = {
  item: IItem;
  items: Array<IItem>;
  reloadData: () => Promise<void>;
};

const UpdateModal = ({ item, items, reloadData }: UpdateModalProps) => {
  const { push } = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>(null);

  return (
    <>
      <button className="update button" onClick={() => setShowModal(true)}>
        Update Password
      </button>
      <Modal
        className="modal"
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Example Modal"
      >
        <h1>Update Password</h1>
        <input
          placeholder="new password"
          className="input"
          value={newPass}
          onChange={(event) => setNewPass(event.target.value)}
        />
        <ErrorBlock error={errorMessage} />
        <div className="pt-12px text-center">
          <button
            className="button"
            onClick={async () => {
              setErrorMessage(null);

              const updatedItem = {
                ...item,
                password: newPass,
              };

              if (item.password === newPass) {
                setErrorMessage("New password is the same as the old one!");
                return;
              }
              if (itemHasWeakPassword(updatedItem)) {
                setErrorMessage("New password is too weak!");
                return;
              }
              if (
                itemHasReusedPassword(
                  updatedItem,
                  items.filter((i) => i.id !== updatedItem.id)
                )
              ) {
                setErrorMessage("New password is reused!");
                return;
              }

              const response = await updateItem(updatedItem);

              if (response.status === 401) {
                await logout();
                push(Routes.Login);
                return;
              }

              if (response.status >= 400) {
                setErrorMessage("Oops! Something went wrong!");
                return;
              }

              setShowModal(false);
              reloadData();
            }}
          >
            Change
          </button>
          <button
            className="button ml-12px"
            onClick={() => {
              setNewPass("");
              setShowModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

const List = ({ items, reloadData }: ListProps) => (
  <ul className="list">
    {items.map((item) => (
      <li className="item" key={item.id}>
        <ItemIcon title={item.title} />
        <div>
          <div className="title">{item.title}</div>
          <div className="description">{item.description}</div>
        </div>
        <UpdateModal item={item} items={items} reloadData={reloadData} />
      </li>
    ))}
  </ul>
);

export default List;
