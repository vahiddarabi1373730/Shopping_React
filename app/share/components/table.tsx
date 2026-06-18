import { ColumnType } from "@rc-component/table";
import { Button, Table } from "antd";
import {
  TableArgs,
  useTableCountQuery,
  useTableQuery,
} from "@/app/api/services/table";
import { IoIosAddCircle, IoMdRefreshCircle } from "react-icons/io";
import { ReactNode, useEffect, useState } from "react";

export interface CustomTableProps<T> {
  columns: ColumnType<T>[];
  url: string;
  openModal?: () => void;
  children?: ReactNode;
}
export const CustomTable = <T extends object>({
  columns,
  url,
  openModal,
  children,
}: CustomTableProps<T>) => {
  const [tableArgs, setTableArgs] = useState<TableArgs>({
    url,
    activePage: 1,
  });

  const refresh = () => {
    refetch();
  };
  const { data, isError, isLoading, isSuccess, refetch } =
    useTableQuery(tableArgs);
  const responseCount = useTableCountQuery(tableArgs);

  useEffect(() => {
    responseCount.refetch();
  }, [tableArgs]);

  if (!isSuccess) {
    return <span>{isError}</span>;
  }
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-end gap-2">
        <Button
          className="btn-md"
          color="primary"
          variant="outlined"
          icon={<IoMdRefreshCircle />}
          onClick={() => refresh()}
        >
          <span className="text-base font-semibold">بازآوری</span>
        </Button>
        {openModal && (
          <Button
            onClick={() => openModal()}
            type="primary"
            className="btn-md flex items-center justify-center"
            icon={<IoIosAddCircle size="16" />}
          >
            <span className="text-base font-semibold">افزودن</span>
          </Button>
        )}
        {children}
      </div>

      <Table<T>
        rowKey={"id"}
        columns={columns}
        dataSource={data.data}
        loading={isLoading}
        scroll={{ y: 395 }}
        pagination={{
          size: "small",
          total: responseCount.data.data,
          onChange: async (activePage) => {
            setTableArgs({ url, activePage });
          },
        }}
        className="
      [&_thead_.ant-table-cell]:!text-[var(--green-500)]
      [&_thead_.ant-table-cell]:!bg-[var(--bg-header-table)]
      [&_thead_.ant-table-cell]:!p-2
      [&_.ant-pagination.ant-table-pagination.ant-table-pagination-end]:!mb-0
      "
      />
    </div>
  );
};
