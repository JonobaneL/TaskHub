import { forwardRef, useState } from "react";
import { Input } from "./input";
import passwordIcon from "../../assets/images/password.svg";
import unlockPasswordIcon from "../../assets/images/unlock-password.svg";
import { FieldError } from "react-hook-form";

type FieldProps = {
  errors?: FieldError;
} & React.InputHTMLAttributes<HTMLInputElement>;

const PasswordField = forwardRef<HTMLInputElement, FieldProps>(
  ({ errors, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    return (
      <div>
        <div className="relative">
          <img
            src={visible ? unlockPasswordIcon : passwordIcon}
            alt="lock"
            onClick={() => setVisible((p) => !p)}
            className="absolute inset-y-1/2 -translate-y-1/2 left-2 cursor-pointer"
          />
          <Input
            ref={ref}
            {...props}
            type={visible ? "text" : "password"}
            className={`focus:ring-1 focus-visible:ring-primary h-10 pl-9  ${
              errors ? "ring-1 ring-red-500" : ""
            }`}
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

export default PasswordField;
