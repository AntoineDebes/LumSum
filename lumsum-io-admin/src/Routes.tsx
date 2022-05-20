import React, { FC } from "react";
import { Redirect, Switch } from "react-router-dom";
import CustomRoute from "./components/CustomRoute";
// Layouts
import AuthLayout from "./layouts/AuthLayout";
import FeedLayout from "./layouts/FeedLayout";
// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Categories from "./pages/Categoris";
import CategoryDetails from "./pages/CategoryDetails";
import Products from "./pages/Product";
import ProductDetails from "./pages/ProductDetails";
import Suppliers from "./pages/Suppliers";
import UserView from "./pages/UserView";
import Reviews from "./pages/Reviews";
import SupplierView from "./pages/SupplierView";
import Settings from "./pages/Settings";
import Admins from "./pages/admin";
import Blogs from "./pages/blogs";
import LeaderBoard from "./pages/LeaderBoard";

const Routes: FC = () => {
    return (
        <Switch>
            <CustomRoute path="/login" component={Login} layout={AuthLayout} routeType="unauthenticate" />
            <CustomRoute path="/dashboard" component={Dashboard} layout={FeedLayout} routeType="authenticate" />
            <CustomRoute path="/users/:userId" component={UserView} layout={FeedLayout} routeType="authenticate" />
            <CustomRoute path="/users" component={Users} layout={FeedLayout} routeType="authenticate" />
            <CustomRoute path="/suppliers/:supplierId" component={SupplierView} layout={FeedLayout} routeType="authenticate" />
            <CustomRoute path="/suppliers" component={Suppliers} layout={FeedLayout} routeType="authenticate" />
            <CustomRoute path="/categories/:categoryId" component={CategoryDetails} layout={FeedLayout} routeType="authenticate" />
            <CustomRoute path="/categories" component={Categories} layout={FeedLayout} routeType="authenticate" />
            <CustomRoute path="/products/:productId" component={ProductDetails} layout={FeedLayout} routeType="authenticate" />
            <CustomRoute path="/products" component={Products} layout={FeedLayout} routeType="authenticate" />
            <CustomRoute path="/reviews" component={Reviews} layout={FeedLayout} routeType="authenticate" />
            <CustomRoute path="/settings" component={Settings} layout={FeedLayout} routeType="authenticate" />
            {/* Admin */}
            <CustomRoute path="/admins" component={Admins} layout={FeedLayout} routeType="authenticate" />
            {/* Blogs */}
            <CustomRoute path="/blogs" component={Blogs} layout={FeedLayout} routeType="authenticate" />
            <CustomRoute path="/leader-board" component={LeaderBoard} layout={FeedLayout} routeType="authenticate" />
            <Redirect to="/dashboard" />
        </Switch>
    );
};

export default Routes;
