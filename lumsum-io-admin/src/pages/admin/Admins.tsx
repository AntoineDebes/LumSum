import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button } from "antd";
import React, { FC, SyntheticEvent } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";

const ADMINS = gql`
  query {
    admins {
      id
      name
      email
      access
      lastLoggedin
    }
  }
`;

const ACCESS_ADMIN = gql`
  mutation accessAdmin($id: ID!) {
    accessAdmin(id: $id) {
      id
      name
      email
      access
      lastLoggedin
    }
  }
`;

const DELETE_ADMIN = gql`
  mutation removeAdmin($id: ID!) {
    removeAdmin(id: $id)
  }
`;

const Blogs: FC = () => {
  const history = useHistory();
  const { loading, data } = useQuery(ADMINS, {
    fetchPolicy: "cache-and-network",
  });
  const [accessAdmin] = useMutation(ACCESS_ADMIN, {
    refetchQueries: [{ query: ADMINS }],
  });
  const [deleteAdmin] = useMutation(DELETE_ADMIN, {
    refetchQueries: [{ query: ADMINS }],
  });
  const handleAccessAdmin = async (e: SyntheticEvent, id: string) => {
    e.preventDefault();
    await accessAdmin({ variables: { id } });
  };
  const handleDeleteAdmin = async (e: SyntheticEvent, id: string) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure to delete this?",
      showCancelButton: true,
      confirmButtonText: `Yes`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteAdmin({ variables: { id } });
      }
    });
  };
  if (loading) return <div>Loading..</div>;
  return (
    <Container>
      {data?.admins?.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <CenterTh>Access</CenterTh>
              <CenterTh>Actions</CenterTh>
            </tr>
          </thead>
          <tbody>
            {data.admins.map((d: any, k: number) => (
              <tr key={k}>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <CenterTd>
                  <Button
                    shape="round"
                    size="small"
                    danger={d.access === "REVOKE"}
                    onClick={(e) => handleAccessAdmin(e, d.id)}
                  >
                    {d.access}
                  </Button>
                </CenterTd>
                <CenterTd>
                  <Button
                    shape="round"
                    icon={<EditOutlined />}
                    size="small"
                    onClick={() => history.push(`/admins/${d.id}/edit`)}
                  >
                    Edit
                  </Button>
                  <Button
                    shape="round"
                    icon={<DeleteOutlined />}
                    size="small"
                    danger
                    onClick={(e) => handleDeleteAdmin(e, d.id)}
                  >
                    Delete
                  </Button>
                </CenterTd>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>No admins found!</div>
      )}
    </Container>
  );
};

export default Blogs;

const Container = styled.div`
  margin: 15px auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 0 1px rgb(0 0 0 / 75%);
  border-radius: 4px;
  th,
  td {
    /* border: 1px solid rgba(0, 0, 0, 0.75); */
    padding: 8px 4px;
    box-shadow: 0 0 1px rgb(0 0 0 / 50%);
  }
`;

const CenterTh = styled.th`
  text-align: center;
`;

const CenterTd = styled.td`
  text-align: center;
`;
