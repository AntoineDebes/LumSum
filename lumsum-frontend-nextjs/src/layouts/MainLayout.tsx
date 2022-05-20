import React, { FC, Fragment } from "react";
import Header from "./Header";
// import Footer from "./Footer";
import AddVisitorCount from "./AddVisitorCount";

const MainLayout: FC = ({ children }) => {
  return (
    <Fragment>
      <AddVisitorCount />
      <Header />
      {children}
    </Fragment>
  );
};

export default MainLayout;
