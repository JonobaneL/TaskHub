import React from "react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";

type HelperProps = {
  side?: "right" | "top" | "bottom" | "left";
  content: string | string[] | React.ReactNode;
  children: React.ReactNode;
  disableContent?: boolean;
};

const Helper = ({
  side = "top",
  content,
  children,
  disableContent = false,
}: HelperProps) => {
  // const arrowSide = {
  //   right:
  //     "after:top-1/2 after:right-full after:-mt-[6px] after:border-[6px] after:border-r-primary after:border-y-transparent after:border-l-transparent",
  //   top: "after:top-full after:left-1/2 after:-ml-[6px] after:border-[6px] after:border-t-primary after:border-x-transparent after:border-b-transparent",
  //   bottom:
  //     "after:bottom-full after:left-1/2 after:-ml-[6px] after:border-[6px] after:border-b-primary after:border-x-transparent after:border-t-transparent",
  //   left: "after:top-1/2 after:left-full after:-mt-[6px] after:border-[6px] after:border-l-primary after:border-y-transparent after:border-r-transparent",
  // };
  //check arrow distance later
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        {disableContent == false && (
          <TooltipContent
            arrowPadding={-100}
            side={side}
            sideOffset={8}
            className={`overflow-visible w-fit px-3 h-8 bg-primary rounded-md flex items-center justify-center shadow-sm after:content[''] after:z-50 after:fixed `}
          >
            {!React.isValidElement(content) ? (
              <p className="font-main text-xs text-background">
                {Array.isArray(content) ? content.join(" ") : content}
              </p>
            ) : (
              content
            )}
            <TooltipArrow className="fill-primary" width={12} height={6} />
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default Helper;
