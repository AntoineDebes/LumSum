import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Link from "next/link";
import React, { FC, SyntheticEvent } from "react";
import styles from "../styles/favorite-suppliers.module.scss";

const FAVORITE_SUPPLIER = gql`
  query {
    favoriteSupplier {
      id
      tradeName
      website
      logo
    }
  }
`;

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

const FavoriteSupplier: FC = () => {
  const { data, loading } = useQuery(FAVORITE_SUPPLIER, {
    fetchPolicy: "cache-and-network",
  });
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    refetchQueries: [{ query: FAVORITE_SUPPLIER }],
  });
  const handleFavorite = (event: SyntheticEvent, supplierId: string) => {
    event.preventDefault();
    toggleFavorite({
      variables: { supplierId },
    });
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Favorite Suppliers</h2>
      {data?.favoriteSupplier?.length > 0 ? (
        <div className={styles.favorites}>
          {data?.favoriteSupplier?.map((supplier: any, key: any) => (
            <Link href={`/supplier/${supplier.id}`} key={key}>
              <div key={key}>
                <img
                  src={`${process.env.UPLOAD_URL}${supplier.logo}`}
                  className={styles.supplierLogo}
                />
                <h3 className={styles.tradeName}>{supplier.tradeName}</h3>
                <button
                  className={styles.removeButton}
                  onClick={(e: any) => handleFavorite(e, supplier.id)}
                >
                  Remove <DeleteOutlined />
                </button>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <h3>No favorites supplier found!</h3>
        </div>
      )}
    </div>
  );
};

export default FavoriteSupplier;
