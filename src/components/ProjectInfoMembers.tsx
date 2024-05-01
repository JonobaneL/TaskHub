import { fakeMembers } from "@/data/fakeMembers";
import { Button } from "./ui/button";

const ProjectInfoMembers = () => {
  return (
    <div className="w-1/4 pl-6">
      <ul>
        {fakeMembers.map((item, index) => (
          <li
            key={index}
            className="flex gap-2 items-center hover:bg-secondary/20 px-2 py-1.5 rounded"
          >
            <img
              className="w-9 h-9 rounded-full"
              src={item.image}
              alt="avatar"
            />
            <p className="text-sm font-main">{item.name}</p>
          </li>
        ))}
      </ul>
      <Button variant="link" className="block mr-2 ml-auto">
        See All
      </Button>
    </div>
  );
};

export default ProjectInfoMembers;
