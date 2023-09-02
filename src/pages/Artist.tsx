import { Breadcrumb, Button, Divider, Form, message, Space, Tag } from "antd";
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
import { useEffect, useState } from "react";
import DeleteConfirmationModal from "../components/DeleteConfirmModal";
import ArtistAddUpdate from "../components/ArtistAddUpdate";
import axios from "axios";
import { BASE_URL } from "../constant";
import moment from "moment";

const Artist: React.FC = () => {
  const [form] = Form.useForm();
  const [id, setId] = useState<any>("");
  const [action, setAction] = useState("add");
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
      dataIndex: "artist_name",
      key: "artist_name",
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
      render: (_, record: any) => (
        <Space size="large">
          <EditFilled
            onClick={() => {
              setAction("edit");
              setId(record?.artist_id);

              form.setFieldsValue({
                name: record?.artist_name,
                phone: record?.phone,
                gender:
                  record?.gender === "Male"
                    ? "m"
                    : record?.gener === "Female"
                    ? "f"
                    : "o",
                first_release_year: record?.first_release_year,
                address: record?.address,
                dob: record?.dob && moment(record?.dob),
                user_id: record?.user_id,
                number_of_albums_released: record?.number_of_albums_released,
              });
              setOpen(true);
            }}
            style={{ color: "blue", fontSize: "18px", cursor: "pointer" }}
          />

          <DeleteFilled
            onClick={() => {
              setDeleteModalVisible(true);
              setId(record?.artist_id);
            }}
            style={{ color: "red", fontSize: "18px", cursor: "pointer" }}
          />
        </Space>
      ),
    },
  ];

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

        const newArtists = sortedData?.map((data: any) => {
          return {
            ...data,
            user: data?.user?.first_name,
            user_id: data?.user?.id,
            dob: data?.dob?.slice(0, 10),
            gender:
              data?.gender === "m"
                ? "Male"
                : data?.gender === "f"
                ? "Female"
                : "Other",
          };
        });

        setArtists(newArtists);
      })
      .catch((err) => {
        setArtists([]);
      });
  }, [refresh]);

  const [open, setOpen] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const onCancel = () => {
    setDeleteModalVisible(false);
  };
  const deleteArtist = async (id: string | number) => {
    const getConfig = {
      url: `${BASE_URL}/delete-artist/${id}`, // Replace with your API endpoint URL
      method: "delete",
      headers: {
        Authorization: `${localStorage.getItem("authToken")}`, // Replace with your authentication token
        "Content-Type": "application/json",
      },
    };
    return await axios(getConfig);
  };
  const onConfirm = () => {
    deleteArtist(id)
      .then((res: any) => {
        setRefresh(Math.random());
        message.success("Artist deleted successfully");
      })
      .catch((err: any) => {
        message.error("Something went wrong");
      });
    setDeleteModalVisible(false);
  };

  const getUsers = async () => {
    const getConfig = {
      url: `${BASE_URL}/user/list`, // Replace with your API endpoint URL
      method: "get",
      headers: {
        Authorization: `${localStorage.getItem("authToken")}`, // Replace with your authentication token
        "Content-Type": "application/json",
      },
    };
    return await axios(getConfig);
  };
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers()
      .then((res: any) => {
        const sortedData: any = [...res?.data].sort((a, b) => {
          // Parse the date strings into Date objects
          const dateA: any = new Date(a.created_at);
          const dateB: any = new Date(b.created_at);

          // Compare the Date objects for sorting
          return dateB - dateA;
        });
        setUsers(sortedData);
      })
      .catch((err) => {
        setUsers([]);
      });
  }, []);

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
                form.resetFields();
                setId("");
                setAction("add");
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
          <TableView columns={columns} data={artists} />
        </div>
      </>

      <ArtistAddUpdate
        open={open}
        id={id}
        setOpen={setOpen}
        users={users}
        form={form}
        setRefresh={setRefresh}
        action={action}
      />
      <DeleteConfirmationModal
        visible={deleteModalVisible}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </div>
  );
};

export default Artist;
