import { Breadcrumb } from "antd";
import React, { ReactNode } from "react";

export default function BreadCrumb({ breadcrumbItems }: any) {
  return (
    <Breadcrumb style={{ marginBottom: "16px" }}>{breadcrumbItems}</Breadcrumb>
  );
}
