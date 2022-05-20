import React, { FC, Fragment } from "react";
import Link, { LinkProps } from "next/link";
import styles from "../styles/BreadCrumb.module.scss";
import { RightOutlined } from "@ant-design/icons";

interface CompoundComponentProps {
  Item: FC;
  ItemLink: FC<LinkProps>;
}

interface BreadCrumbsProps {
  title: string;
  children: any;
}

const BreadCrumbs: FC<BreadCrumbsProps> & CompoundComponentProps = ({
  title,
  children,
}) => {
  return (
    <div className={styles.breadcrumb}>
      <h1 className={styles.title}>{title}</h1>
      <ul className={styles.items}>
        {React.Children.toArray(children).map(
          (child: React.ReactElement<any>, key: number) => (
            <Fragment key={key}>
              {child}
              {children.length > 1 && children.length !== key + 1 && (
                <RightArrow />
              )}
            </Fragment>
          )
        )}
      </ul>
    </div>
  );
};

BreadCrumbs.Item = ({ children }) => (
  <li className={styles.item}>
    <span>{children}</span>
  </li>
);

BreadCrumbs.ItemLink = ({ children, ...restProps }) => (
  <li className={styles.item}>
    <Link {...restProps}>{children}</Link>
  </li>
);

const RightArrow = () => (
  <li className={styles.item}>
    <RightOutlined />
  </li>
);

export default BreadCrumbs;
