import React, { FC } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import AddAdmin from "./AddAdmin";
import EditAdmin from "./EditAdmin";
import AdminList from "./AdminList";

const Admins: FC = () => {
  const { path, url } = useRouteMatch();
  const {
    state: { user },
  } = useAuthContext();
  if (user.role !== "SUPER_ADMIN") return <Redirect to="/dashboad" />;
  return (
    <Switch>
      <Route path={`${path}/add`} exact component={AddAdmin} />
      <Route path={`${path}/:id/edit`} exact component={EditAdmin} />
      <Route path={`${path}`} exact component={AdminList} />
      <Redirect to={url} />
    </Switch>
  );
};

export default Admins;