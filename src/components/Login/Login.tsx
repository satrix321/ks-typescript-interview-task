import classNames from "classnames";
import { SyntheticEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { Routes } from "~/constants";
import login from "~/services/login";
import ErrorBlock from "../ErrorBlock";
import Loader from "../Loader/Loader";
import Overlay from "../Overlay/Overlay";

import "./login.scss";

const Login = () => {
  const { push } = useHistory();
  const [username, setUsername] = useState("");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<
    string | null
  >(null);
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<
    string | null
  >(null);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isSubmitting) {
      setErrorMessage(null);
      setUsernameErrorMessage(null);
      setPasswordErrorMessage(null);
      setIsSubmitting(true);

      if (!username) {
        setErrorMessage("Username is required!");
        setIsSubmitting(false);
        return;
      }

      if (!password) {
        setErrorMessage("Password is required!");
        setIsSubmitting(false);
        return;
      }

      try {
        await login(username, password);
        setIsSubmitting(false);
        push(Routes.PasswordHealth);
      } catch (error) {
        setErrorMessage(error.message);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="text-center">Password Health</h1>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          type="text"
          className={classNames("input mt-52px", {
            error: usernameErrorMessage,
          })}
        />
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          type="password"
          className={classNames("input mt-16px", {
            error: passwordErrorMessage,
          })}
        />
        <ErrorBlock error={errorMessage} />
        <button
          disabled={isSubmitting || !username || !password}
          type="submit"
          className="button mt-16px"
        >
          Login
        </button>
        {isSubmitting ? (
          <Overlay>
            <Loader />
          </Overlay>
        ) : null}
      </form>
    </div>
  );
};

export default Login;
