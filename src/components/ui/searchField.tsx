import { IoIosClose } from "react-icons/io";
import magGlass from "../../assets/images/header/mag-glass.svg";
import { Input } from "./input";

type SearchProps = {
  value: string;
  placeholder?: string;
  autoFocus?: boolean;
  onChange: (value: string) => void;
  setActive?: (value: boolean) => void;
};

const SearchField = ({
  value,
  onChange,
  placeholder = "",
  autoFocus = false,
  setActive = () => {},
}: SearchProps) => {
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
        autoFocus={autoFocus}
        value={value}
        placeholder={placeholder}
        onBlur={() => setActive(false)}
        onChange={(e) => onChange(e.target.value)}
      />
      {activeFilter && (
        <IoIosClose
          onMouseDown={(e) => {
            e.preventDefault();
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
