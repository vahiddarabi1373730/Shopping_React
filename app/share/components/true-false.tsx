import { FaCheck, FaTimesCircle } from "react-icons/fa";
import { LabelValue } from "@/app/api/models/label-value";
export function TrueFalse({ label, value }: LabelValue) {
  return (
    <div className="flex justify-between">
      <span className="text-base font-semibold text-(--gray-400)">{label}</span>
      <span className="text-base font-semibold text-(--gray-400)">
        {value ? <FaCheck color="green" /> : <FaTimesCircle color="red" />}
      </span>
    </div>
  );
}
