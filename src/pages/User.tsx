import { Breadcrumb, Button, Divider, Space, Tag } from "antd";
import { Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import type { ColumnsType } from "antd/es/table";
import {
  DeleteFilled,
  EditFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import TableView from "../components/Table";
import { useState } from "react";
import UserAddUpdate from "../components/UserAddUpdate";
import DeleteConfirmationModal from "../components/DeleteConfirmModal";

const User: React.FC = () => {
  const breadcrumbItems = [
    <Breadcrumb.Item key="dashboard">
      <Link to="/dashboard">Dashboard</Link>
    </Breadcrumb.Item>,
    <Breadcrumb.Item key="user">User</Breadcrumb.Item>,
  ];

  interface DataType {
    key: string;
    first_name: string;
    email: string;
    last_name: string;
    role_type: string;
    phone: string;
    gender: string;
    address: string;
    dob: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role_type",
      key: "role_type",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="large">
          <EditFilled
            onClick={() => setOpen(true)}
            style={{ color: "blue", fontSize: "18px", cursor: "pointer" }}
          />

          <DeleteFilled
            onClick={() => setDeleteModalVisible(true)}
            style={{ color: "red", fontSize: "18px", cursor: "pointer" }}
          />
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      first_name: "admin",
      email: "artists@gmail.com",
      last_name: "admin",
      role_type: "artist",
      phone: "1234560000000009898",
      gender: "m",
      address: "123 Main hello bro sindhupalchowk12",
      dob: "1990-01-01T00:00:00Z",
    },
    {
      key: "2",
      first_name: "admin",
      email: "artists@gmail.com",
      last_name: "admin",
      role_type: "artist",
      phone: "1234560000000009898",
      gender: "m",
      address: "123 Main hello bro sindhupalchowk12",
      dob: "1990-01-01T00:00:00Z",
    },
  ];

  const [open, setOpen] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const onCancel = () => {
    setDeleteModalVisible(false);
  };
  const onConfirm = () => {
    setDeleteModalVisible(false);
  };

  return (
    <div>
      <>
        <BreadCrumb breadcrumbItems={breadcrumbItems} />
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Your homepage content goes here */}
          <div>
            <h2>Welcome to the Artist Management System</h2>
            <p>This is where you can manage and organize users.</p>
          </div>
          <div>
            {" "}
            <Button
              onClick={() => {
                setOpen(true);
              }}
              type="primary"
              size="large"
              icon={<PlusCircleOutlined />}
            >
              Add new user
            </Button>
          </div>
          <Divider />
        </div>
        <div
          style={{
            background: "#fff",
            padding: "0px 20px 20px 20px",
            borderRadius: "5px",
          }}
        >
          <TableView columns={columns} data={data} />
        </div>
      </>

      <UserAddUpdate open={open} setOpen={setOpen} />
      <DeleteConfirmationModal
        visible={deleteModalVisible}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </div>
  );
};

export default User;
