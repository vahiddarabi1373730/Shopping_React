import { Button, Upload } from "antd";
import { BASE_URL_Root } from "@/app/api/config";
import { FaCloudUploadAlt } from "react-icons/fa";

export interface UploaderProps {
  onChange: (...event: any[]) => void;
  isEdit: boolean;
  imageName: string;
}
export default function UploaderWrapper({
  onChange,
  isEdit,
  imageName,
}: UploaderProps) {
  return (
    <div className="flex justify-between">
      <Upload
        onChange={(uploadChangeParams) => {
          onChange(uploadChangeParams.fileList);
        }}
        listType="picture"
        maxCount={1}
        className="flex flex-1"
        beforeUpload={() => false}
        defaultFileList={
          isEdit
            ? [
                {
                  url: BASE_URL_Root + imageName,
                  name: imageName.split("_")[1],
                  uid: "-1",
                  status: "done",
                },
              ]
            : []
        }
      >
        <Button>
          انتخاب عکس
          <FaCloudUploadAlt />
        </Button>
      </Upload>
    </div>
  );
}
