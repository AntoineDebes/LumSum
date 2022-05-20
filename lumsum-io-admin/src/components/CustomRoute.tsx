import React, { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

interface CustomRouteProps extends RouteProps {
  layout: FC;
  component: FC;
  routeType: "public" | "authenticate" | "unauthenticate";
}

const CustomRoute: FC<CustomRouteProps> = ({
  layout: Layout,
  routeType,
  ...restProps
}) => {
  const { state } = useAuthContext();

  if (routeType === "authenticate" && !state.isLoggedIn)
    return <Redirect to="/login" />;

  if (routeType === "unauthenticate" && state.isLoggedIn)
    return <Redirect to="/dashboard" />;

  return (
    <Layout>
      <Route {...restProps} />
    </Layout>
  );
};

export default CustomRoute;
