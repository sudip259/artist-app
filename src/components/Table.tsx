import { Table } from "antd";

const TableView = ({ columns, data }: any) => {
  const paginationConfig = {
    pageSize: 6, // Number of rows per page
    // You can also specify other pagination options here
  };
  return (
    <Table
      bordered
      columns={columns}
      dataSource={data}
      pagination={paginationConfig}
    />
  );
};

export default TableView;
