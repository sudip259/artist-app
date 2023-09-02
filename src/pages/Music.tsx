import { Breadcrumb, Button, Divider, Form, message, Space, Tag } from "antd";
import { Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import type { ColumnsType } from "antd/es/table";
import {
  DeleteFilled,
  EditFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import TableView from "../components/Table";
import { useEffect, useState } from "react";
import DeleteConfirmationModal from "../components/DeleteConfirmModal";
import MusicAddUpdate from "../components/MusicAddUpdate";
import { BASE_URL } from "../constant";
import axios from "axios";

const Music: React.FC = () => {
  const [form] = Form.useForm();
  const [id, setId] = useState<any>("");
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
      render: (_, record: any) => (
        <Space size="large">
          <EditFilled
            className={user?.role === "artist" ? "" : "disabledIcon"}
            onClick={() => {
              setAction("edit");
              setId(record?.music_id);
              console.log("genre", record?.genre);
              form.setFieldsValue({
                title: record?.title,
                artist_id: record?.artist?.artist_id,
                album_name: record?.album_name,
                genre: record?.genre,
                // genre:
                //   record?.genre === "R&B"
                //     ? "rnb"
                //     : record?.genre === "Country"
                //     ? "country"
                //     : record?.genre === "Classic"
                //     ? "classic"
                //     : record?.genre === "Rock"
                //     ? "rock"
                //     : "jazz",
              });
              setOpen(true);
            }}
            style={{ color: "blue", fontSize: "18px", cursor: "pointer" }}
          />

          <DeleteFilled
            className={user?.role === "artist" ? "" : "disabledIcon"}
            onClick={() => {
              setDeleteModalVisible(true);
              setId(record?.music_id);
            }}
            style={{ color: "red", fontSize: "18px", cursor: "pointer" }}
          />
        </Space>
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const onCancel = () => {
    setDeleteModalVisible(false);
  };
  const deleteMusic = async (id: string | number) => {
    const getConfig = {
      url: `${BASE_URL}/delete-music/${id}`, // Replace with your API endpoint URL
      method: "delete",
      headers: {
        Authorization: `${localStorage.getItem("authToken")}`, // Replace with your authentication token
        "Content-Type": "application/json",
      },
    };
    return await axios(getConfig);
  };
  const onConfirm = () => {
    deleteMusic(id)
      .then((res) => {
        setRefresh(Math.random());
        message.success("Music deleted successfully");
      })
      .catch((err) => {
        message.error("Something went wrong");
      });
    setDeleteModalVisible(false);
  };

  const getMusic = async () => {
    const getConfig = {
      url: `${BASE_URL}/music/list`, // Replace with your API endpoint URL
      method: "get",
      headers: {
        Authorization: `${localStorage.getItem("authToken")}`, // Replace with your authentication token
        "Content-Type": "application/json",
      },
    };
    return await axios(getConfig);
  };

  const [music, setMusic] = useState([]);
  const [action, setAction] = useState("add");
  const [refresh, setRefresh] = useState(Math.random());
  const [artists, setArtists] = useState([]);
  const getArtist = async () => {
    const getConfig = {
      url: `${BASE_URL}/artist/list`, // Replace with your API endpoint URL
      method: "get",
      headers: {
        Authorization: `${localStorage.getItem("authToken")}`, // Replace with your authentication token
        "Content-Type": "application/json",
      },
    };
    return await axios(getConfig);
  };
  useEffect(() => {
    getArtist()
      .then((res: any) => {
        const sortedData: any = [...res?.data].sort((a, b) => {
          // Parse the date strings into Date objects
          const dateA: any = new Date(a.created_at);
          const dateB: any = new Date(b.created_at);

          // Compare the Date objects for sorting
          return dateB - dateA;
        });
        setArtists(sortedData);
      })
      .catch((err) => {
        setArtists([]);
      });
  }, [refresh]);
  useEffect(() => {
    getMusic()
      .then((res: any) => {
        const sortedData: any = [...res?.data].sort((a, b) => {
          // Parse the date strings into Date objects
          const dateA: any = new Date(a.created_at);
          const dateB: any = new Date(b.created_at);

          // Compare the Date objects for sorting
          return dateB - dateA;
        });
        const newMusic = sortedData?.map((data: any) => {
          return {
            ...data,
            artist_id: data?.artist?.artist_id,
            artist_name: data?.artist?.artist_name,
          };
        });
        setMusic(newMusic);
      })
      .catch((err) => {
        setMusic([]);
      });
  }, [refresh]);
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    // Fetch user data from localStorage or an API
    const users: any = localStorage.getItem("users");
    const parsedUsers = JSON.parse(users);
    setUser(parsedUsers);
  }, [localStorage.getItem("users")]);

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
              disabled={user?.role === "artist" ? false : true}
              onClick={() => {
                form.resetFields();
                setId("");
                setAction("add");
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
          <TableView columns={columns} data={music} />
        </div>
      </>

      <MusicAddUpdate
        open={open}
        setOpen={setOpen}
        artists={artists}
        action={action}
        setRefresh={setRefresh}
        form={form}
        id={id}
      />
      <DeleteConfirmationModal
        visible={deleteModalVisible}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </div>
  );
};

export default Music;
