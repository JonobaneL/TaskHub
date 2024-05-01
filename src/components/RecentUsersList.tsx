import { fakeMembers } from "@/data/fakeMembers";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const RecentUsersList = () => {
  return (
    <ul>
      {fakeMembers.map((item, index) => (
        <li
          key={index}
          className="flex items-center gap-2 text-second py-1.5 px-2"
        >
          <Avatar className="w-9 h-9">
            <AvatarImage src={item.image} />
            <AvatarFallback className="bg-accent font-medium font-main">
              {item.name.replace(/[a-z]/g, "").replace(/\s/g, "")}
            </AvatarFallback>
          </Avatar>
          <span className="font-second">{item.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default RecentUsersList;
