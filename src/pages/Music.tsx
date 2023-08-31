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
import DeleteConfirmationModal from "../components/DeleteConfirmModal";
import MusicAddUpdate from "../components/MusicAddUpdate";

const Music: React.FC = () => {
  const breadcrumbItems = [
    <Breadcrumb.Item key="dashboard">
      <Link to="/dashboard">Dashboard</Link>
    </Breadcrumb.Item>,
    <Breadcrumb.Item key="music">Music</Breadcrumb.Item>,
  ];

  interface DataType {
    key: string;
    artist_name: string;
    title: string;
    album_name: string;
    genre: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Artist",
      dataIndex: "artist_name",
      key: "artist",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Album Name",
      dataIndex: "album_name",
      key: "album_name",
    },
    {
      title: "Genre",
      key: "genre",
      dataIndex: "genre",
      render: (text) => (
        <Tag color={"blue"} key={text}>
          {text.toUpperCase()}
        </Tag>
      ),
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
      artist_name: "John Brown",
      title: "Title",
      genre: "Rock",
      album_name: "Album",
    },
    {
      key: "2",
      artist_name: "John Brown1",
      title: "Title1",
      genre: "Jazz",
      album_name: "Album1",
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
            <p>This is where you can manage and organize music.</p>
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
              Add new music
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

      <MusicAddUpdate open={open} setOpen={setOpen} />
      <DeleteConfirmationModal
        visible={deleteModalVisible}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </div>
  );
};

export default Music;
