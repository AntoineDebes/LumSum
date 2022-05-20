import React, { FC, useEffect } from "react";
import styled from "styled-components/macro";
import { useMutation, useQuery } from "@apollo/client";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Space,
  Table,
  Tooltip,
  Typography,
  Image as AntdImage,
  message,
} from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { ElieIsBack, PRODUCTS } from "../graphql/query";
import { DELETE_PRODUCT } from "../graphql/mutation";
import AddNewProduct from "../components/AddNewProduct";
import { deleteS3File } from "../utils";
const Dashboard: FC = () => {
  const history = useHistory();
  const { loading, error, data } = useQuery(PRODUCTS, {
    fetchPolicy: "cache-and-network",
  });

  const { data: dataElie } = useQuery(ElieIsBack, {
    fetchPolicy: "cache-and-network",
  });
  useEffect(() => {
    console.log("DataElie", dataElie);
  }, []);

  const [removeProduct] = useMutation(DELETE_PRODUCT, {
    onCompleted: () => message.success("Product Deleted Successfully"),
    onError: () => message.error("Something Error!"),
    refetchQueries: [{ query: PRODUCTS }],
  });

  const deleteProduct = (id: string, icon: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.value) {
        const res = await removeProduct({
          variables: { id },
          update: (caches: any, { data: updateData }) => {
            const prevData = caches.readQuery({ query: PRODUCTS });
            let products = prevData.products;
            products = products.filter((product: any) => product.id !== id);
            caches.writeQuery({ query: PRODUCTS, data: { products } });
          },
        });
        if (res.data.removeProduct) {
          await deleteS3File(icon);
        }
      }
    });
  };

  const columns = [
    {
      title: "Icon",
      key: "image",
      width: "120px",
      className: "center",
      render: (product: any) => {
        return (
          <Image src={`${process.env.REACT_APP_IMAGE_URL}${product.icon}`} />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Category",
      key: "category",
      ellipsis: true,
      render: (product: any) => {
        return (
          <Link to={`/categories/${product.category.id}`}>
            {product.category.name}
          </Link>
        );
      },
    },
    {
      title: "Actions",
      key: "operation",
      width: "164px",
      className: "center",
      render: (product: any) => (
        <Space size="middle">
          <Tooltip title="View">
            <Button
              onClick={() => history.push(`/products/${product.id}`)}
              type="primary"
              ghost
              shape="circle"
              icon={<EyeOutlined />}
              size="middle"
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              onClick={() => history.push(`/products/${product.id}/edit`)}
              type="primary"
              ghost
              shape="circle"
              icon={<EditOutlined />}
              size="middle"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              onClick={() => deleteProduct(product.id, product.icon)}
              type="primary"
              ghost
              shape="circle"
              icon={<DeleteOutlined />}
              size="middle"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Lumsum | Products</title>
      </Helmet>
      <NewButtonWrapper>
        <Title level={3}>All Products</Title>
        <AddNewProduct />
      </NewButtonWrapper>
      <TableContainer>
        <Table
          rowKey={(product) => product.id}
          loading={loading}
          sticky={true}
          dataSource={data?.products}
          columns={columns}
          bordered
          size="small"
        />
      </TableContainer>
    </div>
  );
};

export default Dashboard;

const TableContainer = styled.div`
  table {
    th.center,
    td.center {
      width: 100px;
      text-align: center;
    }
  }
`;

const Image = styled(AntdImage)`
  img {
    height: 75px;
    width: 75px;
    object-fit: cover;
    object-position: center;
  }
`;

const NewButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px auto;
`;

const Title = styled(Typography.Title)`
  margin: 0 !important;
`;
