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
import UserAddUpdate from "../components/UserAddUpdate";
import DeleteConfirmationModal from "../components/DeleteConfirmModal";
import { BASE_URL } from "../constant";
import axios from "axios";
import dayjs from "dayjs";

const User: React.FC = () => {
  const [form] = Form.useForm();
  const breadcrumbItems = [
    <Breadcrumb.Item key="dashboard">
      <Link to="/dashboard">Dashboard</Link>
    </Breadcrumb.Item>,
    <Breadcrumb.Item key="user">User</Breadcrumb.Item>,
  ];
  const [id, setId] = useState<string | number>("");

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
      title: "Dob",
      dataIndex: "dob",
      key: "dob",
      render: (text) => <>{text?.slice(0, 10)}</>,
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
      render: (text) => (
        <>{text === "m" ? "Male" : text === "f" ? "Female" : "Other"}</>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record: any) => (
        <Space size="large">
          <EditFilled
            className={user?.role === "super_admin" ? "" : "disabledIcon"}
            onClick={() => {
              setAction("edit");
              setId(record?.id);
              form.setFieldsValue({
                first_name: record?.first_name,
                last_name: record?.last_name,
                email: record?.email,
                phone: record?.phone,
                gender: record?.gender,
                role_type: record?.role_type,
                address: record?.address,
                dob: record?.dob && dayjs(record?.dob),
              });
              setOpen(true);
            }}
            style={{ color: "blue", fontSize: "18px", cursor: "pointer" }}
          />

          <DeleteFilled
            className={user?.role === "super_admin" ? "" : "disabledIcon"}
            onClick={() => {
              setDeleteModalVisible(true);
              setId(record?.id);
            }}
            style={{ color: "red", fontSize: "18px", cursor: "pointer" }}
          />
        </Space>
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const deleteUser = async (id: string | number) => {
    const getConfig = {
      url: `${BASE_URL}/delete-user/${id}`, // Replace with your API endpoint URL
      method: "delete",
      headers: {
        Authorization: `${localStorage.getItem("authToken")}`, // Replace with your authentication token
        "Content-Type": "application/json",
      },
    };
    return await axios(getConfig);
  };

  const onCancel = () => {
    setDeleteModalVisible(false);
  };
  const onConfirm = () => {
    deleteUser(id)
      .then((res) => {
        setRefresh(Math.random());
        message.success("User deleted successfully");
      })
      .catch((err) => {
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
  const [action, setAction] = useState("add");
  const [refresh, setRefresh] = useState(Math.random());
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
            <p>This is where you can manage and organize users.</p>
          </div>
          <div>
            {" "}
            <Button
              disabled={user?.role !== "super_admin"}
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
          <TableView columns={columns} data={users} />
        </div>
      </>

      <UserAddUpdate
        open={open}
        setOpen={setOpen}
        setRefresh={setRefresh}
        form={form}
        action={action}
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

export default User;
