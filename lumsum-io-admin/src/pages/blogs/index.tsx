import React, { FC } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import AddAdmin from "./AddBlog";
import EditAdmin from "./EditBlog";
import AdminDetails from "./BlogDetails";
import AdminList from "./BlogList";

const Admins: FC = () => {
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/add`} exact component={AddAdmin} />
      <Route path={`${path}/:id/edit`} exact component={EditAdmin} />
      <Route path={`${path}/:id`} exact component={AdminDetails} />
      <Route path={`${path}`} exact component={AdminList} />
      <Redirect to={url} />
    </Switch>
  );
};

export default Admins;
