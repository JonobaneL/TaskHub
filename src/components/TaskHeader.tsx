import conIcon from "../assets/images/con-icon.svg";
import conIconActive from "../assets/images/con-icon-active.svg";

type HeaderProps = {
  task: string;
  commnets: string | null;
  setTab: (value: string) => void;
};

const TaskHeader = ({ task, commnets, setTab }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center pl-2 ">
      <div
        className="h-9 leading-9 w-full cursor-pointer pr-4"
        onClick={() => setTab("details")}
      >
        {task}
      </div>
      <div className="size-9 flex flex-cover items-center justify-center border-l">
        {!commnets ? (
          <img
            src={conIcon}
            alt="con-icon"
            className="cursor-pointer"
            onClick={() => setTab("comments")}
          />
        ) : (
          <img
            src={conIconActive}
            alt="con-icon"
            className="cursor-pointer"
            onClick={() => setTab("comments")}
          />
        )}
      </div>
    </div>
  );
};

export default TaskHeader;
