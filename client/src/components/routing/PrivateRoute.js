import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);

  const { isAutheticated, loading } = authContext;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAutheticated && !loading ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

export default PrivateRoute;
