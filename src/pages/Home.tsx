import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";

const Home: React.FC = () => {
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/dashboard">Home</Link>
    </Breadcrumb.Item>,
    <Breadcrumb.Item key="dashboard">Dashboard</Breadcrumb.Item>,
  ];

  return (
    <div>
      <BreadCrumb breadcrumbItems={breadcrumbItems} />
      <div style={{ background: "#fff", padding: "24px", borderRadius: "8px" }}>
        {/* Your homepage content goes here */}
        <h2>Welcome to the Artist Management home page!</h2>
        <p>This is where you can manage and organize music artists.</p>
      </div>
      <div
        style={{ background: "#fff", padding: "24px", borderRadius: "8px" }}
      ></div>
    </div>
  );
};

export default Home;
