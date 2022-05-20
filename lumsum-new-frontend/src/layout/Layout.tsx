import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import { Layout as AntDLayout } from "antd";
import { ReactNode } from "react";
import Footer from "@/components/Footer/Footer";
const { Content } = AntDLayout;

interface IProps {
  title?: string;
  isMinimal?: boolean;
  footer?: boolean;
  children: ReactNode;
}

const Layout = ({ title, isMinimal, footer, children }: IProps) => {
  return (
    <AntDLayout>
      <Sidebar />
      <AntDLayout>
        <Header isMinimal={isMinimal} title={title} />
        <Content
          style={{ overflow: "initial" }}
          className="site-layout-background"
        >
          {children}
        </Content>
        {footer && <Footer />}
      </AntDLayout>
    </AntDLayout>
  );
};

export default Layout;
