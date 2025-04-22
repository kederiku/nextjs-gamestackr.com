import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent } from "react";

interface Props {
  minYear?: string | null;
  maxYear?: string | null;
  onMinYearChange: (value: string) => void;
  onMaxYearChange: (value: string) => void;
}

export const formatAsYear = (value: string) => {
  const numericValue = value.replace(/[^0-9]/g, "");
  const formattedValue = (numericValue.length < 5 ? numericValue : "") // Change for check is a date

  if (!formattedValue) return "";

  const numberValue = parseInt(formattedValue);
  if (isNaN(numberValue)) return "";

  return numberValue;
}

export const YearFilter = ({
  minYear,
  maxYear,
  onMinYearChange,
  onMaxYearChange,
}: Props) => {

  const handleMinYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Get the raw input value and extract only numeric value
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    onMinYearChange(numericValue)
  };

  const handleMaxYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Get the raw input value and extract only numeric value
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    onMaxYearChange(numericValue)
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base">
          Minimum year
        </Label>
        <Input
          type="text"
          placeholder="1969"
          value={minYear ? formatAsYear(minYear) : ""}
          onChange={handleMinYearChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base">
          Maximun year
        </Label>
        <Input
          type="text"
          placeholder="2025"
          value={maxYear ? formatAsYear(maxYear) : ""}
          onChange={handleMaxYearChange}
        />
      </div>
    </div>
  )
}