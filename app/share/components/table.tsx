import { ColumnType } from "@rc-component/table";
import { Table } from "antd";
import { TableRequestInterface, useTableQuery } from "@/app/api/services/table";
import { useState } from "react";

export interface CustomTableProps<T> {
  columns: ColumnType<T>[];
  url: string;
}
export const CustomTable = <T extends object>({
  columns,
  url,
}: CustomTableProps<T>) => {
  const tableRequest: TableRequestInterface = {
    url,
  };
  const { data, isError, isLoading, isSuccess } = useTableQuery(tableRequest);

  if (!isSuccess) {
    return <span>{isError}</span>;
  }
  return (
    <Table<T>
      rowKey={"id"}
      columns={columns}
      dataSource={data.data}
      loading={isLoading}
      className="[&_thead_.ant-table-cell]:!text-[var(--green-500)] [&_thead_.ant-table-cell]:!bg-[var(--green-50)]"
    />
  );
};
