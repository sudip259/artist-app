import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";

const Artist: React.FC = () => {
  const breadcrumbItems = [
    <Breadcrumb.Item key="dashboard">
      <Link to="/dashboard">Dashboard</Link>
    </Breadcrumb.Item>,
    <Breadcrumb.Item key="artist">Artist</Breadcrumb.Item>,
  ];

  return (
    <div>
      <BreadCrumb breadcrumbItems={breadcrumbItems} />
      <div style={{ background: "#fff", padding: "24px", borderRadius: "8px" }}>
        {/* Your homepage content goes here */}
        <h2>Welcome to the Artist Management System Setting!</h2>
        <p>This is where you can manage and organize artists.</p>
      </div>
    </div>
  );
};

export default Artist;
