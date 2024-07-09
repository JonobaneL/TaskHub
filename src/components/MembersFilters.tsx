import RoleFilters from "./RoleFilters";
import SearchField from "./ui/searchField";
import { ColumnFiltersParams } from "@/models/TableTypes";

type FiltersProps = {
  filters: ColumnFiltersParams;
  onChange: React.Dispatch<React.SetStateAction<ColumnFiltersParams>>;
};

const MemberFilters = ({ filters, onChange }: FiltersProps) => {
  const onSearch = (value: string) => {
    onChange((p) => {
      return { ...p, name: value };
    });
  };
  const onFilter = (role: string) => {
    if (filters.role.includes(role)) {
      onChange((p) => {
        return { ...p, role: p.role.filter((item) => item !== role) }; //check this later
      });
      return;
    }
    onChange((p) => {
      return { ...p, role: [...p.role, role] };
    });
  };
  const clearRole = () => {
    onChange((p) => {
      return { ...p, role: [] };
    });
  };

  return (
    <div className="mb-4 flex items-center gap-2">
      <SearchField
        value={filters.name as string}
        onChange={onSearch}
        placeholder="Search..."
      />
      <RoleFilters
        filters={filters}
        onFilter={onFilter}
        clearRole={clearRole}
      />
    </div>
  );
};

export default MemberFilters;
