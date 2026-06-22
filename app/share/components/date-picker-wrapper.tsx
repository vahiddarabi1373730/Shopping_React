import Icon from "react-multi-date-picker/components/icon";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import React from "react";
import persian_en from "react-date-object/locales/persian_en";

export interface DatePickerProps {
  onChange: (...event: any[]) => void;
  value: any;
}
export default function DatePickerWrapper({
  value,
  onChange,
}: DatePickerProps) {
  return (
    <DatePicker
      calendarPosition="bottom-right"
      onOpenPickNewDate={false}
      render={<Icon />}
      onChange={(date) => {
        onChange(
          date
            ? date.convert(persian, persian_en).format("YYYY/MM/DD")
            : undefined,
        );
      }}
      value={value}
      calendar={persian}
      locale={persian_fa}
      format="YYYY/MM/DD"
    />
  );
}
