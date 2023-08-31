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

const AddUpdateUser = ({ open, setOpen }: any) => {
  const [form] = Form.useForm();

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
                name="artist_id"
                label="Artist"
                rules={[{ required: true, message: "Please choose artist" }]}
              >
                <Select
                  placeholder="Please choose artist"
                  showSearch
                  allowClear
                >
                  <Option value="m">Artist1</Option>
                  <Option value="f">Artist2</Option>
                  <Option value="o">Artist3</Option>
                </Select>{" "}
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

export default AddUpdateUser;
