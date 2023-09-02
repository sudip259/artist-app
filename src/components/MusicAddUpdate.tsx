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

const AddUpdateMusic = ({
  open,
  setOpen,
  id,
  action,
  setRefresh,
  artists,
  form,
}: any) => {
  const musicCreate = async (values: any) => {
    const postConfig = {
      url: `${BASE_URL}/music/create`, // Replace with your API endpoint URL
      method: "post",
      headers: {
        Authorization: `${localStorage.getItem("authToken")}`, // Replace with your authentication token
        "Content-Type": "application/json",
      },
      data: values,
    };
    return await axios(postConfig);
  };
  const musicEdit = async (values: any) => {
    const editConfig = {
      url: `${BASE_URL}/update-music/${id}`, // Replace with your API endpoint URL
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
        title="Create a new music"
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
                      musicCreate(values)
                        .then((response) => {
                          message.success("Music created successfully");
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
                      musicEdit(values)
                        .then((response: any) => {
                          message.success("Music edited successfully");
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
                name="artist_id"
                label="Artist"
                rules={[{ required: true, message: "Please choose gender" }]}
              >
                <Select placeholder="Please choose user" showSearch allowClear>
                  {artists?.map((artist: any) => {
                    return (
                      <Option value={artist?.artist_id}>
                        {artist?.artist_name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please enter title" }]}
              >
                <Input placeholder="Please enter title" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="album_name"
                label="Album Name"
                rules={[{ required: true, message: "Please enter album name" }]}
              >
                <Input placeholder="Please enter album name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="genre"
                label="Genre"
                rules={[{ required: true, message: "Please select an genre" }]}
              >
                <Select
                  placeholder="Please select an owner"
                  showSearch
                  allowClear
                >
                  <Option value="rnb">R&B</Option>
                  <Option value="country">Country</Option>
                  <Option value="classic">Classic</Option>
                  <Option value="rock">Rock</Option>
                  <Option value="jazz">Jazz</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default AddUpdateMusic;
