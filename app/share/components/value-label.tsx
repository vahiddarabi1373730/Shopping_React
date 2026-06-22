import React from "react";

export interface ValueLabelProps {
  value?: any;
  label: string;
  children?: React.ReactNode;
}
export function ValueLabel({ value, label, children }: ValueLabelProps) {
  return (
    <div className="flex justify-between">
      <span className="text-base font-semibold text-(--gray-400)">{label}</span>
      <span className="text-base font-semibold text-(--gray-400)">
        {value ? value : children}
      </span>
    </div>
  );
}
