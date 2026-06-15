import React from "react";

export interface ErrorResponse {
  message: string;
  status: boolean;
}

export default function Error({ message, status }: ErrorResponse) {
  return (
    <>
      <div className="flex mb-2 border border-solid border-red-200 p-2 rounded-md text-sm font-medium text-[var(--red-500)]">
        <div>خطا:</div>
        <span className="!mr-1">{message}</span>
      </div>
    </>
  );
}
