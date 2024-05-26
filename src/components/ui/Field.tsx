import { forwardRef } from "react";
import { Input } from "./input";
import { FieldError } from "react-hook-form";

type FieldProps = {
  variant: "standart" | "icon";
  icon?: string;
  errors?: FieldError;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ variant, icon, alt, errors, ...props }, ref) => {
    return (
      <div>
        <div className="w-full relative">
          {icon ? (
            <img
              className="absolute inset-y-1/2 -translate-y-1/2 left-2"
              src={icon}
              alt={props.name}
            />
          ) : null}
          <Input
            ref={ref}
            {...props}
            className={`focus:ring-1 focus-visible:ring-primary h-10 ${
              errors ? "ring-1 ring-red-500" : ""
            } ${variant == "standart" ? "pl-2" : "pl-9"}`}
          />
        </div>
        {errors && (
          <p className="text-red-600 text-xs mt-2 font-main font-medium mx-2">
            {errors.message}
          </p>
        )}
      </div>
    );
  }
);

export default Field;
