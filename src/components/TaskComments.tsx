import { useState } from "react";
import { Button } from "./ui/button";
import { fakeMembers } from "@/data/fakeMembers";
import replyIcon from "../assets/images/reply.svg";
import dotsIcon from "../assets/images/dots-grey.svg";
import clockIcon from "../assets/images/clock.svg";
import CommentForm from "./CommentForm";

const TaskUpdates = () => {
  const [update, setUpdate] = useState("");
  return (
    <div className="mt-4">
      <CommentForm />

      <div className="h-4"></div>
      <div>
        <div className="rounded border p-2">
          <div className="flex items-center justify-between mb-5">
            <div className="flex gap-2 items-center p-1 rounded w-fit">
              <img
                className="w-9 h-9 rounded-full"
                src={fakeMembers[0].image}
                alt="avatar"
              />
              <p className="text-sm font-main">{fakeMembers[0].name}</p>
            </div>
            <div className="flex items-center gap-1 cursor-default">
              <div className="flex gap-1 items-center">
                <img src={clockIcon} alt="clock" className="size-4" />
                <p className="text-sm font-main text-slate-500 font-medium">
                  1m
                </p>
              </div>
              <Button variant="ghost" className="p-1 h-fit">
                <img src={dotsIcon} alt="dots" />
              </Button>
            </div>
          </div>

          <div className="my-2 mx-2 pl-5 list-disc [&_li]:list-disc">
            {/* <p className="text-sm">We also need to set up github</p> */}
            <ul className="list-disc">
              <li className="list-disc list-inside">first</li>
              <li>second</li>
              <li>third</li>
            </ul>
          </div>
          <div>
            <Button
              variant="ghost"
              className="p-2 flex gap-2 items-center mr-0 ml-auto"
            >
              <img src={replyIcon} className="size-4" alt="arrow" />
              <p className="text-sm text-primary font-main leading-9">Reply</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskUpdates;
