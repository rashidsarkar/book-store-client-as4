import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

interface CustomDatePickerProps {
  label: string;
  value: dayjs.Dayjs | null;
  onChange: (date: dayjs.Dayjs | null) => void;
  error?: string;
  picker?: "year" | "date"; // Supports both Year and Date Picker
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  value,
  onChange,
  error,
  picker = "date",
}) => {
  return (
    <div className="w-full">
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <DatePicker
        value={value}
        onChange={onChange}
        picker={picker}
        className="w-full"
        placeholder="Select date"
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CustomDatePicker;
