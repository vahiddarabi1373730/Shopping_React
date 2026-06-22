import { ColumnType } from "@rc-component/table";
import { Button, Spin, Table } from "antd";
import {
  TableArgs,
  useTableCountQuery,
  useTableQuery,
} from "@/app/api/services/table";
import { IoIosAddCircle, IoMdRefreshCircle } from "react-icons/io";
import { ReactNode, useEffect, useState } from "react";
import "../../scss/table.scss";

export interface CustomTableProps<T> {
  columns: ColumnType<T>[];
  url: string;
  openModal?: () => void;
  children?: ReactNode;
  handelShowAddOrder?: (items: any[]) => void;
  hasPagination?: boolean;
}

export const CustomTable = <T extends object>({
  columns,
  url,
  openModal,
  children,
  handelShowAddOrder,
  hasPagination = true,
}: CustomTableProps<T>) => {
  const [tableArgs, setTableArgs] = useState<TableArgs>({
    url,
    activePage: 1,
  });

  const refresh = () => {
    responseData.refetch();
    if (hasPagination) {
      responseCount.refetch();
    }
  };

  let responseCount: any;
  let loading = false;

  if (hasPagination) {
    responseCount = useTableCountQuery(tableArgs);
  }
  const responseData = useTableQuery(tableArgs);

  if (hasPagination) {
    loading = responseData.isFetching || responseCount.isFetching;
  } else {
    loading = responseData.isFetching;
  }

  useEffect(() => {
    if (handelShowAddOrder) {
      handelShowAddOrder(responseData?.data?.data);
    }
  }, [responseData.data]);
  return (
    <>
      {loading && <Spin size="large" className="loading" />}
      {!loading && (
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
            dataSource={responseData?.data.data ?? []}
            loading={loading}
            scroll={{ y: 395 }}
            locale={{ emptyText: "دیتایی برای نمایش وجود ندارد" }}
            pagination={
              hasPagination
                ? {
                    size: "small",
                    total: responseCount.data?.data,
                    onChange: async (activePage) => {
                      setTableArgs({ url, activePage });
                    },
                  }
                : false
            }
            className="
      [&_thead_.ant-table-cell]:!text-[var(--green-500)]
      [&_thead_.ant-table-cell]:!bg-[var(--bg-header-table)]
      [&_thead_.ant-table-cell]:!p-2
      [&_.ant-pagination.ant-table-pagination.ant-table-pagination-end]:!mb-0
      "
          />
        </div>
      )}
    </>
  );
};
