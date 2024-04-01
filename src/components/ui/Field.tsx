import { forwardRef } from "react";
import { Input } from "./input";

type FieldProps = {
  variant: "standart" | "icon";
  icon?: string;
  alt?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ variant, icon, alt, ...props }, ref) => {
    return (
      <div className="w-full relative">
        {icon ? (
          <img
            className="absolute inset-y-1/2 -translate-y-1/2 left-2"
            src={icon}
            alt={alt}
          />
        ) : null}
        <Input
          ref={ref}
          {...props}
          style={
            variant == "standart"
              ? { paddingLeft: "0.5rem" }
              : { paddingLeft: "2.25rem" }
          }
          className="focus:ring-1 focus-visible:ring-primary h-10"
        />
      </div>
    );
  }
);

export default Field;
