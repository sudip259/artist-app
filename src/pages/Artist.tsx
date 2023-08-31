import { Breadcrumb, Button, Divider, Space, Tag } from "antd";
import { Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import type { ColumnsType } from "antd/es/table";
import {
  DeleteFilled,
  EditFilled,
  PlusCircleOutlined,
  ImportOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import TableView from "../components/Table";
import { useState } from "react";
import DeleteConfirmationModal from "../components/DeleteConfirmModal";
import ArtistAddUpdate from "../components/ArtistAddUpdate";

const Artist: React.FC = () => {
  const breadcrumbItems = [
    <Breadcrumb.Item key="dashboard">
      <Link to="/dashboard">Dashboard</Link>
    </Breadcrumb.Item>,
    <Breadcrumb.Item key="artist">Artist</Breadcrumb.Item>,
  ];

  interface DataType {
    user: string;
    name: string;
    dob: string;
    gender: string;
    address: string;
    first_release_year: string;
    number_of_albums_released: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Dob",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Gender",
      key: "gender",
      dataIndex: "gender",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "First Release Year",
      dataIndex: "first_release_year",
      key: "first_release_year",
    },
    {
      title: "Number Of Album Released",
      key: "number_of_albums_released",
      dataIndex: "number_of_albums_released",
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
      user: "string",
      name: "string",
      dob: "number",
      gender: "string",
      address: "string",
      first_release_year: "string",
      number_of_albums_released: "string",
    },
    {
      user: "string",
      name: "string",
      dob: "number",
      gender: "string",
      address: "string",
      first_release_year: "string",
      number_of_albums_released: "string",
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
            <p>This is where you can manage and organize artists.</p>
            <Space>
              <Button
                onClick={() => {
                  // setOpen(true);
                }}
                type="primary"
                size="large"
                icon={<ImportOutlined />}
              >
                Import
              </Button>
              <Button
                onClick={() => {
                  // setOpen(true);
                }}
                type="primary"
                size="large"
                icon={<DownloadOutlined />}
              >
                Export
              </Button>
            </Space>
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
              Add new artist
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

      <ArtistAddUpdate open={open} setOpen={setOpen} />
      <DeleteConfirmationModal
        visible={deleteModalVisible}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </div>
  );
};

export default Artist;
