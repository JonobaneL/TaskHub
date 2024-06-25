import { IoIosClose } from "react-icons/io";
import magGlass from "../../assets/images/header/mag-glass.svg";
import { Input } from "./input";

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchField = ({ value, onChange }: SearchProps) => {
  const activeFilter = value.length > 0;
  return (
    <div className="relative w-52">
      <img
        src={magGlass}
        alt="search"
        className="absolute w-4 left-2 top-1/2 -translate-y-1/2"
      />
      <Input
        className="pl-8 focus-visible:ring-primary"
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {activeFilter && (
        <IoIosClose
          onClick={(e) => {
            e.stopPropagation();
            onChange("");
          }}
          className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer"
          size="1.2rem"
        />
      )}
    </div>
  );
};

export default SearchField;
