import taskhub from "../assets/images/header/taskhub.svg";
import notification from "../assets/images/header/notification.svg";
import userIcon from "../assets/images/header/user.svg";
import Projects from "./Projects";
import SearchField from "./ui/searchField";
import { useNavigate } from "react-router-dom";
import { useTypeDispatch, useTypeSelector } from "@/hooks/useReduxHooks";
import { signOutUser } from "@/store/thunks/userThunks";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useTypeSelector((state) => state.userReducer);
  const dispatch = useTypeDispatch();
  const handler = () => {
    dispatch(signOutUser());
  };
  return (
    <header className="flex items-center justify-between h-[3.8rem] bg-t-bg shadow-md px-[2.2rem]">
      <div className="flex items-center gap-1">
        <Projects />
        <img
          onClick={() => navigate("/dashboard")}
          src={taskhub}
          alt="logo"
          className="w-[4.8rem]"
        />
      </div>
      <div className="flex items-center gap-[1rem]">
        <SearchField value="" onChange={(value) => console.log(value)} />
        <img src={notification} alt="notification" />
        {/* <img src={userIcon} onClick={() => navigate("/user-info")} alt="user" /> */}
        <img
          src={user.avatar || ""}
          className="size-9 object-cover object-top rounded-full"
          alt=""
          loading="lazy"
          onClick={handler}
        />
      </div>
    </header>
  );
};

export default Header;
