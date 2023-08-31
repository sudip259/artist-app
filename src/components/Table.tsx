import { Table } from "antd";

const TableView = ({ columns, data }: any) => {
  return <Table bordered columns={columns} dataSource={data} />;
};

export default TableView;
