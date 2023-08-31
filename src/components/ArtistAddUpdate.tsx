import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";

const { Option } = Select;

const AddUpdateArtist = ({ open, setOpen }: any) => {
  const [form] = Form.useForm();

  return (
    <>
      <Drawer
        title="Create a new artist"
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
                  .then((values) => {
                    console.log("Form values:", values);
                  })
                  .catch((error) => {
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
                name="user_id"
                label="User"
                rules={[{ required: true, message: "Please choose user" }]}
              >
                <Select placeholder="Please choose user" showSearch allowClear>
                  <Option value="m">Male</Option>
                  <Option value="f">Female</Option>
                  <Option value="o">Other</Option>
                </Select>{" "}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Input placeholder="Please enter name" />
              </Form.Item>
            </Col>
          </Row>

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
                </Select>{" "}
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
            <Col span={12}>
              <Form.Item
                name="first_release_year"
                label="First Release Year"
                rules={[
                  {
                    required: true,
                    message: "Please enter first release year",
                  },
                ]}
              >
                <Input placeholder="Please enter first release year" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="number_of_albums_released"
                label="Number Of Album Released"
                rules={[
                  {
                    required: true,
                    message: "Please enter number of album released",
                  },
                ]}
              >
                <Input placeholder="Please enter number of album released" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default AddUpdateArtist;
