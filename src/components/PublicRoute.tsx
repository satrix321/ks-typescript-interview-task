import { Route, RouteProps, useHistory } from "react-router-dom";
import { Routes, TOKEN_KEY } from "~/constants";

const PublicRoute = ({ path, component }: RouteProps) => {
  const { push } = useHistory();
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    push(Routes.PasswordHealth);
  }

  return <Route path={path} component={component} />;
};

export default PublicRoute;
