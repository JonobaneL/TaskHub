import Helper from "@/components/ui/Helper";
import LineChart from "@/components/ui/LineChart";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAllProjects } from "@/firebase/userAPI";
import { useAsync } from "@/hooks/useAsync";
import { useTypeSelector } from "@/hooks/useReduxHooks";
import { ProjectParams } from "@/models/projectTypes";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { useNavigate } from "react-router-dom";

const testProjects = [
  {
    id: "project2",
    name: "Second Project",
    color: "#557df6",
    taskTotal: 15, //fetched
    status_lables: [
      { name: "none", color: "#797E93" },
      { name: "in progress", color: "#FDBC64" },
      { name: "done", color: "#33d391" },
      { name: "stuck", color: "#E8697D" },
    ],
    taskStatus: {
      none: { value: 2, color: "#797E93" },
      "in progress": { value: 2, color: "#FDBC64" },
      done: { value: 8, color: "#33d391" },
      stuck: { value: 3, color: "#E8697D" },
    },
    members: [
      // it will present active, last active user or short list of users or all users that involved in this project
      { id: "member1", name: "Jonh Doe" },
      { id: "member2", name: "Billy Buttcher" },
      { id: "member3", name: "Hugh Kambel" },
    ],
  },
  {
    id: "project3",
    color: "#f2b951",
    name: "Third Project",
    status_lables: [
      { name: "none", color: "#797E93" },
      { name: "done", color: "#33d391" },
      { name: "in progress", color: "#FDBC64" },
      { name: "stuck", color: "#E8697D" },
    ],
    taskTotal: 20, //fetched
    taskStatus: {
      none: { value: 1, color: "#797E93" },
      done: { value: 4, color: "#33d391" },
      "in progress": { value: 10, color: "#FDBC64" },
      stuck: { value: 5, color: "#E8697D" },
    },
    members: [
      // it will present active, last active user or short list of users or all users that involved in this project
      { id: "member2", name: "Billy Doe" },
      { id: "member3", name: "Andy Kambel" },
      { id: "member1", name: "Jake Buttcher" },
    ],
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  // const { isLoading, user } = useTypeSelector((state) => state.userReducer);
  const { projects, isLoading } = useTypeSelector(
    (state) => state.projectReducer
  );
  return (
    <div key="check">
      <h1 className="font-main text-primary font-semibold text-3xl mb-2">
        Dashboard
      </h1>
      <p className="font-main font-medium">
        Hello there! Welcome to TaskHub, your all-in-one platform for project
        management and team collaboration. Stay organized, stay productive, and
        let's get to work!
      </p>
      <section className="w-full rounded-sm shadow-md p-4 mt-4">
        <h3 className="font-main font-medium">Projects</h3>
        <div className="space-y-4">
          {testProjects.map((item) => (
            <div key={item.id} className="">
              <div className="w-1/5 flex items-center gap-2">
                <div
                  style={{ background: item.color }}
                  className="w-9 h-9 rounded-sm shadow-sm  font-main text-white font-semibold text-center leading-9"
                >
                  {item.name[0]}
                </div>
                <p className="font-medium text-sm">{item.name}</p>
              </div>
              <div className="chart">
                <ul className=" my-4 flex gap-4">
                  {item.status_lables.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div
                        style={{ background: item.color }}
                        className="w-5 h-5 rounded-[2px] shadow-sm"
                      />
                      <p className="text-sm">- {item.name}</p>
                    </li>
                  ))}
                </ul>
                <div className="w-80 h-4">
                  <LineChart
                    config={{ name: true }}
                    asChild={true}
                    total={item.taskTotal}
                    params={item.taskStatus}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <br />
        <br />
        <br />
      </section>
      <div className="w-1/5 bg-white rounded-md shadow-md mt-4 p-4 space-y-2">
        {isLoading ? (
          <p className="font-bold">Loading...</p>
        ) : (
          projects?.map((item, index) => (
            <div
              className="flex items-center gap-2"
              key={index}
              onClick={() => navigate(`project/${item.id}/tables`)}
            >
              <div className="w-9 h-9 bg-accent-y rounded-sm text-center leading-9 font-main font-semibold cursor-pointer ">
                {item.name && item.name[0]}
              </div>
              <p className="font-main font-medium cursor-pointer">
                {item.name}
              </p>
            </div>
          ))
        )}
        {/* {projects?.map((item, index) => (
          <div
            className="flex items-center gap-2"
            key={index}
            onClick={() => navigate(`project/${item.id}/tables`)}
          >
            <div className="w-9 h-9 bg-accent-y rounded-sm text-center leading-9 font-main font-semibold cursor-pointer ">
              {item.name && item.name[0]}
            </div>
            <p className="font-main font-medium cursor-pointer">{item.name}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Dashboard;
