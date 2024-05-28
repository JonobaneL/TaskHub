import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { fakeMembers } from "@/data/fakeMembers";
import replyIcon from "../assets/images/reply.svg";
import dotsIcon from "../assets/images/dots-grey.svg";
import clockIcon from "../assets/images/clock.svg";

const TaskUpdates = () => {
  const [update, setUpdate] = useState("");
  return (
    <div className="mt-4">
      <Input placeholder="Write an update..." />
      <div className="h-2" />
      <Textarea
        className="min-h-24"
        placeholder="Write an update..."
        value={update}
        onChange={(e) => setUpdate(e.target.value)}
      />
      <Button
        variant="default"
        className="px-2 py-1 text-white font-main mr-0 ml-auto block mt-2 mb-4"
      >
        Update
      </Button>
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

          <div className="my-2 mx-2 pl-5">
            <p className="text-sm">We also need to set up github</p>
          </div>
          <div>
            <Button
              variant="ghost"
              className="p-2 flex gap-2 items-center mr-0 ml-auto"
            >
              <img src={replyIcon} alt="arrow" />
              <p className="text-sm text-primary font-main leading-9">Reply</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskUpdates;
