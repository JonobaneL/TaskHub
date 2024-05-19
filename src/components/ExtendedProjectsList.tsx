import { useTypeSelector } from "@/hooks/useReduxHooks";
import ProjectInfo from "./ProjectInfo";
import Loader from "./ui/Loader";

const ExtendedProjectsList = () => {
  const { isLoading, user } = useTypeSelector((state) => state.userReducer);
  if (isLoading) return <Loader type="fade" />;
  return (
    <ul className="divide-y-2">
      {user.projects?.map((item) => (
        <ProjectInfo key={item.id} project={item} />
      ))}
    </ul>
  );
};

export default ExtendedProjectsList;
