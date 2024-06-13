import FormsNav from "./FormsNav";
import EditColumns from "./EditColumns";
import ColumnsFilters from "./ColumnsFilters";
import SearchFilters from "./SearchFilters";

const TablesNav = () => {
  return (
    <nav className="flex justify-between w-full space-x-2 mt-4">
      <FormsNav />
      <div className="w-fit h-10 flex gap-1.5 items-center">
        <SearchFilters />
        <ColumnsFilters />
        <EditColumns />
      </div>
    </nav>
  );
};

export default TablesNav;
