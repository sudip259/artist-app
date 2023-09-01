import { Modal, Button, Space, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

const DeleteConfirmationModal = ({ visible, onConfirm, onCancel }: any) => {
  const modalStyle = {
    maxWidth: "400px",
  };

  const titleStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
  };

  const iconStyle = {
    fontSize: "24px",
    marginRight: "10px",
    color: "#faad14",
  };

  const messageStyle = {
    marginBottom: "20px",
  };

  return (
    <Modal
      centered
      title={
        <div style={titleStyle}>
          <ExclamationCircleOutlined style={iconStyle} />
          <Text strong>Confirm Delete</Text>
        </div>
      }
      visible={visible}
      onCancel={onCancel}
      footer={
        <Space>
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>
          <Button key="delete" type="primary" danger onClick={onConfirm}>
            Delete
          </Button>
        </Space>
      }
      style={modalStyle}
    >
      <div style={messageStyle}>
        <p>This action will permanently remove the item from the system.</p>
        <p style={{ marginTop: "10px", fontSize: "14px", color: "#999" }}>
          Please confirm this action if you are sure.
        </p>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
