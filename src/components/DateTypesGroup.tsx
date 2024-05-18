import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

type GroupProps = {
  types: string[];
  type: string;
  onChange: (value: string) => void;
  onClose: () => void;
};

const DateTypesGroup = ({ types, type, onChange, onClose }: GroupProps) => {
  const handler = (value: string) => {
    onChange(value);
    onClose();
  };
  return (
    <RadioGroup
      defaultValue={type}
      className="space-y-1"
      onValueChange={(value) => handler(value)}
    >
      {types.map((item) => (
        <Label key={item} className="flex gap-2 items-center">
          <RadioGroupItem value={item} />
          <p>{item}</p>
        </Label>
      ))}
    </RadioGroup>
  );
};

export default DateTypesGroup;
