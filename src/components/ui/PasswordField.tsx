import { forwardRef, useState } from "react";
import { Input } from "./input";
import passwordIcon from "../../assets/images/password.svg";
import unlockPasswordIcon from "../../assets/images/unlock-password.svg";

type FieldProps = React.InputHTMLAttributes<HTMLInputElement>;

const PasswordField = forwardRef<HTMLInputElement, FieldProps>(
  ({ ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    return (
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
          className="focus:ring-1 focus-visible:ring-primary h-10 pl-9"
        />
      </div>
    );
  }
);

export default PasswordField;
