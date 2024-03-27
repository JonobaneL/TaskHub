import taskhub from "../assets/images/header/taskhub.svg";
import notification from "../assets/images/header/notification.svg";
import user from "../assets/images/header/user.svg";
import Projects from "./Projects";
import SearchField from "./ui/searchField";

const Header = () => {
  return (
    <header className="flex items-center justify-between h-[3.8rem] bg-t-bg shadow-md px-[2.2rem]">
      <div className="flex items-center gap-1">
        <Projects />
        <img src={taskhub} alt="logo" className="w-[4.8rem]" />
      </div>
      <div className="flex items-center gap-[1rem]">
        <SearchField />
        <img src={notification} alt="notification" />
        <img src={user} alt="user" />
      </div>
    </header>
  );
};

export default Header;
