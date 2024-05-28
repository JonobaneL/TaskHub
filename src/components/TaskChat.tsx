import arrowIcon from "../assets/images/arrow-white.svg";

const TaskChat = () => {
  return (
    <div className="mt-4 p-2 border rounded min-h-48 flex flex-col">
      <div className="h-full flex items-center justify-center flex-1">
        <p className="text-sm text-slate-600 font-main">
          Currently, there are no messages in the chat.
        </p>
      </div>
      <div className="rounded-full border mt-auto h-10 flex justify-between p-1 overflow-hidden">
        <input
          type="text"
          className="bg-transparent text-sm pl-2"
          placeholder="Write a message"
        />
        <button className="bg-primary h-full aspect-square rounded-full flex justify-center p-2 items-center">
          <img src={arrowIcon} alt="arrow" />
        </button>
      </div>
    </div>
  );
};

export default TaskChat;
