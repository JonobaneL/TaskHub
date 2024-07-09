import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

type GroupProps = {
  value: string;
  onChange: (value: string) => void;
};

const RoleRadioGroup = ({ value, onChange }: GroupProps) => {
  return (
    <RadioGroup
      className="flex gap-4 mt-3 px-1"
      onValueChange={onChange}
      defaultValue={value}
    >
      <Label className="flex items-center gap-2 font-main">
        <RadioGroupItem value="member" />
        Member
      </Label>
      <Label className="flex items-center gap-2 font-main">
        <RadioGroupItem value="guest" />
        Guest
      </Label>
    </RadioGroup>
  );
};

export default RoleRadioGroup;
