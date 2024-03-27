import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CommandItem, CommandList } from "./ui/command";

const RecentUsersList = () => {
  const users = [
    {
      image: "https://ui.shadcn.com/avatars/01.png",
      name: "Jullia Roberst",
    },
    {
      image: "https://ui.shadcn.com/avatars/04.png",
      name: "Petro Zenuk",
    },
    {
      image: "https://ui.shadcn.com/avatars/02.png",
      name: "Nick Grayson",
    },
    {
      image: "https://ui.shadcn.com/avatars/02.png",
      name: "John Week",
    },
  ];
  return (
    <CommandList>
      {users.map((item, index) => (
        <CommandItem
          key={index}
          className="flex items-center gap-2 text-second"
        >
          <Avatar className="w-9 h-9">
            <AvatarImage src={item.image} />
            <AvatarFallback className="bg-accent font-medium font-main">
              {item.name.replace(/[a-z]/g, "").replace(/\s/g, "")}
            </AvatarFallback>
          </Avatar>
          <span className="font-second">{item.name}</span>
        </CommandItem>
      ))}
    </CommandList>
  );
};

export default RecentUsersList;
