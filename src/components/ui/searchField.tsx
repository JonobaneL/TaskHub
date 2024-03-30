import magGlass from "../../assets/images/header/mag-glass.svg";
import { Input } from "./input";

const SearchField = () => {
  return (
    <div className="relative">
      <img
        src={magGlass}
        alt="search"
        className="absolute inset-y-1/2 left-2 -translate-y-1/2 w-[20px]"
      />
      <Input
        placeholder="Search..."
        className="pl-9 focus-visible:ring-1 focus-visible:ring-primary "
      />
    </div>
  );
};

export default SearchField;
