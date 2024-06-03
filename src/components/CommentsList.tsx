import { fakeMembers } from "@/data/fakeMembers";
import { CommentParams } from "@/models/projectTypes";
import replyIcon from "../assets/images/reply.svg";
import dotsIcon from "../assets/images/dots-grey.svg";
import { TbClockHour8 } from "react-icons/tb";
import { Button } from "./ui/button";
type ListProps = {
  comments: CommentParams[] | undefined;
};

const CommentsList = ({ comments }: ListProps) => {
  return (
    <div className="space-y-2">
      {comments?.map((item, index) => (
        <div className="rounded border p-2" key={index}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex gap-2 items-center p-1 rounded w-fit">
              <img
                className="w-9 h-9 rounded-full"
                src={fakeMembers[0].image}
                alt="avatar"
              />
              <p className="text-sm font-main">{fakeMembers[0].name}</p>
            </div>
            <div className="flex items-center gap-0.5 cursor-default">
              <div className="flex gap-1 items-center">
                <TbClockHour8 className="size-4" color="#6B6B6B" />
                <p className="text-sm font-main text-slate-500 font-medium">
                  1m
                </p>
              </div>
              <Button variant="ghost" className="p-1 h-fit">
                <img src={dotsIcon} alt="dots" />
              </Button>
            </div>
          </div>

          <div
            className="my-2 mx-2 pl-5 list-disc [&_ul_li]:list-disc [&_ol_li]:list-decimal text-sm"
            dangerouslySetInnerHTML={{ __html: item.content }}
          ></div>
          <Button
            variant="ghost"
            className="p-2 flex gap-2 items-center mr-0 ml-auto"
          >
            <img src={replyIcon} className="size-4" alt="arrow" />
            <p className="text-sm text-primary font-main leading-9">Reply</p>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
