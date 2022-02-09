import react from "react";
import { Route, Redirect } from "react-router-dom";
import { useUserAuth } from "./context/UserAuthContext";

const ProtectedRoute = ({ children, ...rest }) => {
  let { user } = useUserAuth();

  return (
    <Route
      {...rest}
      render={() => (user ? children : <Redirect to="/" />)}
    ></Route>
  );
};
export default ProtectedRoute;
