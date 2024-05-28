import { useState } from "react";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type SelectProps = {
  children: React.ReactNode;
  onChange: (value: string) => void;
  onBlur?: () => void;
  defaultValue?: string | null;
};

const DateSelect = ({
  defaultValue,
  onChange,
  onBlur = () => {},
  children,
}: SelectProps) => {
  const today = new Date(Date.now());
  const [visible, setVisible] = useState(false);
  const date = defaultValue ? new Date(defaultValue) : undefined;
  const selectHandler = (calendar: Date | undefined) => {
    const dateString = calendar?.toDateString() || "";
    onChange(dateString);
    setVisible(false);
  };
  return (
    <Popover open={visible} onOpenChange={setVisible}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent onInteractOutside={onBlur}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={selectHandler}
          fromMonth={today}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateSelect;
