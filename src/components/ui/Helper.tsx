import React from "react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./tooltip";

type HelperProps = {
  content: string;
  children: React.ReactNode;
};

const Helper = ({ content, children }: HelperProps) => {
  return (
    <div>
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent className="bg-secondary shadow-sm cursor-default rounded-sm">
            <p className="font-main font-medium text-xs text-background">
              {content}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Helper;
