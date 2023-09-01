import React from "react";
import { Layout, Form, Input, Button, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constant";

const { Content } = Layout;

const Login: React.FC = () => {
  const login = async (credentials: { username: string; password: string }) => {
    return await axios.post(`${BASE_URL}/login`, credentials);
  };

  const navigate = useNavigate();
  const onFinish = (values: any) => {
    login(values)
      .then((res) => {
        localStorage.setItem("authToken", "Token " + res?.data?.token);
        navigate("/dashboard");
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Content
          style={{
            padding: "32px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            background: "#fff",
            width: "350px",
            textAlign: "center",
          }}
        >
          <LockOutlined
            style={{ fontSize: "48px", color: "#1890ff", marginBottom: "16px" }}
          />
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            Artist Login
          </h1>
          <p style={{ color: "#888", fontSize: "16px", marginBottom: "24px" }}>
            Please enter your credentials to access the Artist Management
            System.
          </p>
          <Form name="login" onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
              style={{ textAlign: "left" }} // Align validation message to the left
            >
              <Input
                prefix={<LockOutlined style={{ color: "#888" }} />}
                placeholder="Username"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
              style={{ textAlign: "left" }} // Align validation message to the left
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#888" }} />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ width: "100%" }}
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </div>
    </Layout>
  );
};

export default Login;
