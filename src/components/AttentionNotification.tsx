import Helper from "./ui/Helper";
import attentionIcon from "../assets/images/attention.svg";

const AttentionNotification = () => {
  return (
    <div className="absolute left-1">
      <Helper side="top" content="Deadline Passed">
        <img
          src={attentionIcon}
          alt="attention"
          className="w-[1.1rem] h-[1.1rem]"
        />
      </Helper>
    </div>
  );
};

export default AttentionNotification;
