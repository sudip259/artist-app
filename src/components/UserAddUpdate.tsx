import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
} from "antd";
import axios from "axios";

import { BASE_URL } from "../constant";

const { Option } = Select;

const AddUpdateUser = ({
  open,
  setOpen,
  setRefresh,
  form,
  action,
  id,
}: any) => {
  const userCreate = async (values: any) => {
    const postConfig = {
      url: `${BASE_URL}/user/create`, // Replace with your API endpoint URL
      method: "post",
      headers: {
        Authorization: `${localStorage.getItem("authToken")}`, // Replace with your authentication token
        "Content-Type": "application/json",
      },
      data: values,
    };
    return await axios(postConfig);
  };
  const userEdit = async (values: any) => {
    const editConfig = {
      url: `${BASE_URL}/update-user/${id}`, // Replace with your API endpoint URL
      method: "patch",
      headers: {
        Authorization: `${localStorage.getItem("authToken")}`, // Replace with your authentication token
        "Content-Type": "application/json",
      },
      data: values,
    };
    return await axios(editConfig);
  };

  return (
    <>
      <Drawer
        title="Create a new user"
        width={720}
        onClose={() => setOpen(false)}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                form
                  .validateFields()
                  .then((values: any) => {
                    if (action === "add") {
                      userCreate(values)
                        .then((response) => {
                          message.success("User created successfully");
                          form.resetFields();
                          setOpen(false);
                          setRefresh(Math.random());
                        })
                        .catch((error) => {
                          message.error(
                            error?.response?.data?.message ||
                              "Semething went wrong"
                          );
                        });
                    } else {
                      userEdit(values)
                        .then((response: any) => {
                          message.success("User edited successfully");
                          form.resetFields();
                          setOpen(false);
                          setRefresh(Math.random());
                        })
                        .catch((error: any) => {
                          message.error(
                            error?.response?.data?.message ||
                              "Semething went wrong"
                          );
                        });
                    }
                  })
                  .catch((error: any) => {
                    console.error("Validation failed:", error);
                  });
              }}
              type="primary"
            >
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="first_name"
                label="First Name"
                rules={[{ required: true, message: "Please enter first name" }]}
              >
                <Input placeholder="Please enter first name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="last_name"
                label="Last Name"
                rules={[{ required: true, message: "Please enter last name" }]}
              >
                <Input placeholder="Please enter last name" />
              </Form.Item>
            </Col>
          </Row>
          {action === "add" && (
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please enter an email",
                    },
                  ]}
                >
                  <Input placeholder="Please enter an email" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please enter password!" },
                  ]}
                >
                  <Input.Password placeholder="Please Enter password" />
                </Form.Item>
              </Col>
            </Row>
          )}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: "Please choose gender" }]}
              >
                <Select
                  placeholder="Please choose gender"
                  showSearch
                  allowClear
                >
                  <Option value="m">Male</Option>
                  <Option value="f">Female</Option>
                  <Option value="o">Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dob"
                label="Dob"
                rules={[
                  { required: true, message: "Please choose date of birth" },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  getPopupContainer={(trigger) => trigger.parentElement!}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  {
                    required: true,
                    message: "Please enter phone",
                  },
                ]}
              >
                <Input placeholder="Please enter phone" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "Please enter address",
                  },
                ]}
              >
                <Input placeholder="Please enter address" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="role_type"
                label="Role"
                rules={[{ required: true, message: "Please choose role" }]}
              >
                <Select placeholder="Please choose role" showSearch allowClear>
                  <Option value="super_admin">Super Admin</Option>
                  <Option value="artist">Artist</Option>
                  <Option value="artist_manager">Artist Manager</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default AddUpdateUser;
