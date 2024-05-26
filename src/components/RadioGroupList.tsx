import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

type GroupProps = {
  list: string[];
  currentValue: string;
  onChange: (value: string) => void;
  onClose?: () => void;
};

const RadioGroupList = ({
  list,
  currentValue,
  onChange,
  onClose = () => {},
}: GroupProps) => {
  const handler = (value: string) => {
    onChange(value);
    onClose();
  };
  return (
    <RadioGroup
      defaultValue={currentValue}
      className="space-y-1"
      onValueChange={(value) => handler(value)}
    >
      {list.map((item) => (
        <Label key={item} className="flex gap-2 items-center">
          <RadioGroupItem value={item} />
          <p>{item}</p>
        </Label>
      ))}
    </RadioGroup>
  );
};

export default RadioGroupList;
