import { Button } from "@/components/ui/button";
import { getAllProjects } from "@/firebase/userAPI";
import { useAsync } from "@/hooks/useAsync";
import { useTypeSelector } from "@/hooks/useReduxHooks";
import { ProjectParams } from "@/models/projectTypes";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isLoading, user } = useTypeSelector((state) => state.userReducer);
  return (
    <div key="check">
      <h2>Dashboard</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae
        voluptatibus voluptatem quisquam nemo sit dignissimos nesciunt
        architecto a harum libero veniam similique quidem, id provident vel
        cumque itaque, neque incidunt?
      </p>
      <>
        {user.projects?.map((item, index) => (
          <Button
            variant="link"
            key={index}
            onClick={() => navigate(`project/${item.id}/tables`)}
          >
            {item.name}
          </Button>
        ))}
      </>
    </div>
  );
};

export default Dashboard;
