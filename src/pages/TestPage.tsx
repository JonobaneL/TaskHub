import ProjectNav from "@/components/ProjectNav";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const TestPage = () => {
  return (
    <div className="border border-primary m-10 p-4">
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="text-background font-main">Open</Button>
          </PopoverTrigger>
          <PopoverContent>
            <h3>This is popover</h3>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default TestPage;
