import { Button } from "./ui/button";
import magGlass from "../assets/images/mag-glass.svg";
import filter from "../assets/images/filter.svg";
import FormsNav from "./FormsNav";
import EditColumns from "./EditColumns";

const TablesNav = () => {
  return (
    <nav className="flex justify-between w-full space-x-2 mt-4 mb-4">
      <FormsNav />
      <div className="w-fit h-10 space-x-1.5">
        <Button
          variant="ghost"
          className="h-8 p-2 rounded-sm font-medium text-text font-main text-[0.8rem]"
        >
          <img src={magGlass} alt="mag-glass" className="mr-1" />
          Search
        </Button>
        <Button
          variant="ghost"
          className="h-8 p-2 rounded-sm font-medium text-text font-main text-[0.8rem]"
        >
          <img src={filter} alt="filter" className="mr-1" />
          Filter
        </Button>
        <EditColumns />
      </div>
    </nav>
  );
};

export default TablesNav;
