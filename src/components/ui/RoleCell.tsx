type CellProps = {
  role: string | null;
};

const RoleCell = ({ role }: CellProps) => {
  return (
    <div
      className={`w-fit h-fit ${
        role == "admin" ? "bg-accent-y" : "bg-accent-b text-white"
      } font-main text-sm rounded-sm capitalize px-2 py-1 font-medium mx-auto`}
    >
      {role}
    </div>
  );
};

export default RoleCell;
