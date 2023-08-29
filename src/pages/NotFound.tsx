import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary">
          <Link to={"/"}>Back Home</Link>
        </Button>
      }
    />
  </div>
);

export default NotFound;
