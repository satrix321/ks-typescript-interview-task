import { render } from "react-dom";
import Modal from "react-modal";

import App from "./App";

Modal.setAppElement("#app");

render(App(), document.getElementById("app"));
