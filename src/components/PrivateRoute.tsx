import { Route, RouteProps, useHistory } from "react-router-dom";
import { Routes, TOKEN_KEY } from "~/constants";

const PrivateRoute = ({ path, component }: RouteProps) => {
  const { push } = useHistory();
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    push(Routes.Login);
  }

  return <Route path={path} component={component} />;
};

export default PrivateRoute;
