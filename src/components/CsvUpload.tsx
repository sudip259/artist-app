import { Upload, Button, message } from "antd";
import { ImportOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL } from "../constant";

function CsvFileUpload({ role, setRefresh }: any) {
  const uploadCsv = async (formData: any) => {
    const importCsvConfig = {
      url: `${BASE_URL}/artist/import-csv`, // Replace with your API endpoint URL
      method: "post",
      headers: {
        Authorization: `${localStorage.getItem("authToken")}`, // Replace with your authentication token
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };
    return await axios(importCsvConfig);
  };
  const customRequest = async ({ file }: any) => {
    const formData = new FormData();
    formData.append("csv_file", file);

    try {
      uploadCsv(formData)
        .then((res) => {
          message.success(" CSV file successfully imported");
          setRefresh(Math.random());
        })
        .catch((error) => {
          message.error("CSV import failed");
        });
    } catch (error) {
      message.error("CSV import failed");
    }
  };

  return (
    <Upload customRequest={customRequest} showUploadList={false}>
      <Button
        disabled={role === "artist_manager" ? false : true}
        type="primary"
        size="large"
        icon={<ImportOutlined />}
      >
        Import
      </Button>
    </Upload>
  );
}

export default CsvFileUpload;
