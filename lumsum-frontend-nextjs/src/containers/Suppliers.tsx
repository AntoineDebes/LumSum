import React, { SyntheticEvent, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { Empty, Spin, Rate, Button } from "antd";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/react-hooks";
import SUPPLIERS_OF_PRODUCT from "../graphql/suppliers-of-product.query";
import styles from "../styles/suppliers.module.scss";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import gql from "graphql-tag";
import jwt_decode from "jwt-decode";
import styled from "styled-components";

const TOGGLE_FAVORITE = gql`
  mutation toggleFavoriteSupplier($supplierId: ID!) {
    toggleFavoriteSupplier(supplierId: $supplierId) {
      status
      supplier {
        id
      }
    }
  }
`;

const FAVORITE_SUPPLIER = gql`
  query {
    favoriteSupplier {
      id
    }
  }
`;

const Suppliers = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  let user: any = {};
  if (token) {
    user = jwt_decode(token);
  }
  const isLoggedIn = Boolean(Object.keys(user).length);
  const router = useRouter();
  const { category, product, city = "" } = router.query;
  const [favorites, setFavorites] = useState<Array<string>>([]);
  useQuery(FAVORITE_SUPPLIER, {
    onCompleted: (data) => {
      if (data?.favoriteSupplier) {
        setFavorites(data?.favoriteSupplier?.map((d: any) => d.id));
      }
    },
  });
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE);

  const { data, loading, error } = useQuery(SUPPLIERS_OF_PRODUCT, {
    variables: { id: product, city },
  });

  const handleFavorite = (event: SyntheticEvent, supplierId: string) => {
    event.preventDefault();
    toggleFavorite({
      variables: { supplierId },
      update: (_, { data: { toggleFavoriteSupplier } }) => {
        console.log({ toggleFavoriteSupplier });
        if (toggleFavoriteSupplier.status === "ADD") {
          setFavorites((prev) => [...prev, supplierId]);
        }
        if (toggleFavoriteSupplier.status === "REMOVE") {
          setFavorites((prev) => {
            const newPrev = [...prev];
            return newPrev.filter((d) => d !== supplierId);
          });
        }
      },
    });
  };

  if (loading) return <Spin />;

  if (error) return <Empty />;

  return (
    <div className={clsx("container", styles.supplierContainer)}>
      <div className={styles.supplier}>
        {data?.getSuppliersOfProduct?.map((supplier: any, index: number) => (
          <Link key={index} href={`/${category}/${product}/${supplier.id}`}>
            <div
              className={clsx(styles.card, {
                [styles.activeCard]: supplier.featured,
              })}
            >
              {supplier.featured && (
                <>
                  <span className={styles.leftTopSpan}></span>
                  <span className={styles.rightTopSpan}>
                    <span className={styles.featuredSpan} />
                    Featured
                  </span>
                  <span className={styles.leftBottomSpan}></span>
                  <span className={styles.rightBottomSpan}></span>
                </>
              )}
              <div>
                <h1 className={styles.name}>{supplier?.tradeName}</h1>
                <p className={styles.city}>{supplier?.city}</p>
                <div className={styles.rating}>
                  <span className={styles.avgRating}>
                    {supplier?.avgRating?.toFixed(1)}
                  </span>
                  <Rate value={supplier.avgRating} disabled />
                </div>
              </div>
              <div>
                <img
                  className={styles.logo}
                  src={`${process.env.UPLOAD_URL}${supplier.logo}`}
                  alt=""
                />
              </div>

              {/* {isLoggedIn && (
                <Button
                  shape="circle"
                  size="large"
                  type="ghost"
                  icon={
                    favorites.includes(supplier.id) ? (
                      <HeartFilled color="pink" />
                    ) : (
                      <HeartOutlined color="grey" />
                    )
                  }
                  className={styles.favorite}
                  onClick={(e) => handleFavorite(e, supplier.id)}
                />
              )} */}
              <LikesCounts>
                <HeartFilled />
                {supplier.likes}
              </LikesCounts>
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.rightWrapper}></div>
    </div>
  );
};

export default Suppliers;

const LikesCounts = styled.span`
  position: absolute;
  right: 30px;
  bottom: 5px;
  font-size: 14px;
  font-weight: 600;
  color: var(--base-color);
  span {
    margin-right: 5px;
  }
`;
